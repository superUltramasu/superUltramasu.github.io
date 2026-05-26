import argparse
import json
import re
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parent
MANIFEST_FILE = ROOT / "local-place-map-data.js"
DATA_DIR = ROOT / "local-place-data"
MUNICIPALITY_CODE_FILE = ROOT / "map-quiz-data.js"

SOURCE = {
    "name": "国勢調査町丁・字等別境界データセット（CODH作成）「令和2年国勢調査町丁・字等別境界データ」（e-Stat）を加工",
    "url": "https://geoshape.ex.nii.ac.jp/ka/",
    "license": "CC BY 4.0 / e-Stat terms of use",
}


def extract_assignment(path, variable):
    text = path.read_text(encoding="utf-8")
    match = re.search(rf"window\.{re.escape(variable)}\s*=\s*(.*?);\s*(?:\r?\n|$)", text, re.S)
    if not match:
        raise ValueError(f"{path.name} から window.{variable} を読み取れません。")
    return json.loads(match.group(1))


def load_municipality_codes():
    return extract_assignment(MUNICIPALITY_CODE_FILE, "municipalityCodeData")


def load_existing_manifest():
    if not MANIFEST_FILE.exists():
        return {"source": SOURCE, "municipalities": []}
    return extract_assignment(MANIFEST_FILE, "localPlaceMapData")


def load_existing_local_place_data(code):
    path = DATA_DIR / f"{code}.js"
    if not path.exists():
        return None
    text = path.read_text(encoding="utf-8")
    match = re.search(rf"window\.localPlaceDataFiles\[['\"]{re.escape(code)}['\"]\]\s*=\s*(.*?);\s*$", text, re.S)
    if not match:
        return None
    return json.loads(match.group(1))


def topojson_url(prefecture_code, municipality_code):
    return f"https://geoshape.ex.nii.ac.jp/ka/topojson/2020/{prefecture_code}/r2ka{municipality_code}.topojson"


def fetch_topology(prefecture_code, municipality_code):
    url = topojson_url(prefecture_code, municipality_code)
    with urlopen(url, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def geometry_code(geometry):
    props = geometry.get("properties") or {}
    return str(props.get("KEY_CODE") or props.get("code") or geometry.get("id") or "")


def geometry_name(geometry):
    props = geometry.get("properties") or {}
    return str(props.get("S_NAME") or props.get("name") or props.get("MOJI") or "")


def normalize_topology(topology):
    objects = topology.get("objects") or {}
    source_object = objects.get("town") or objects.get("places") or next(iter(objects.values()), None)
    if not source_object:
        raise ValueError("TopoJSON に町丁目オブジェクトがありません。")

    geometries = source_object.get("geometries") or []
    places = []
    normalized_geometries = []
    for geometry in geometries:
        code = geometry_code(geometry)
        name = geometry_name(geometry)
        if not code or not name:
            continue
        normalized_geometry = dict(geometry)
        properties = dict(normalized_geometry.get("properties") or {})
        properties["code"] = code
        properties["name"] = name
        normalized_geometry["id"] = code
        normalized_geometry["properties"] = properties
        normalized_geometries.append(normalized_geometry)
        places.append({"code": code, "name": name, "reading": ""})

    return places, {
        "type": topology.get("type", "Topology"),
        "transform": topology.get("transform"),
        "arcs": topology.get("arcs", []),
        "objects": {
            "places": {
                "type": source_object.get("type", "GeometryCollection"),
                "geometries": normalized_geometries,
            }
        },
    }


def preserve_readings(places, existing):
    readings = {
        place["code"]: place.get("reading", "")
        for place in (existing or {}).get("places", [])
    }
    name_readings = {
        place["name"]: place.get("reading", "")
        for place in (existing or {}).get("places", [])
    }
    for place in places:
        place["reading"] = readings.get(place["code"]) or name_readings.get(place["name"], "")
    return places


def local_place_base_name(name):
    return re.sub(r"[一二三四五六七八九十百〇零壱弐参１２３４５６７８９０0-9]+丁目$", "", name) or name


def aggregate_place_count(places):
    return len({local_place_base_name(place["name"]) for place in places})


def write_local_place_file(item, places, topology):
    DATA_DIR.mkdir(exist_ok=True)
    payload = {
        "prefecture": item["prefecture"],
        "code": item["code"],
        "name": item["name"],
        "places": places,
        "topology": topology,
    }
    out = DATA_DIR / f"{item['code']}.js"
    out.write_text(
        "window.localPlaceDataFiles = window.localPlaceDataFiles || {};\n"
        f"window.localPlaceDataFiles[{item['code']!r}] = "
        f"{json.dumps(payload, ensure_ascii=False, separators=(',', ':'))};\n",
        encoding="utf-8",
    )
    return out


def write_manifest(records):
    manifest = {
        "source": SOURCE,
        "municipalities": sorted(records, key=lambda item: item["code"]),
    }
    MANIFEST_FILE.write_text(
        "window.localPlaceMapData = "
        f"{json.dumps(manifest, ensure_ascii=False, separators=(',', ':'))};\n"
        "window.localPlaceDataFiles = window.localPlaceDataFiles || {};\n",
        encoding="utf-8",
    )


def selected_items(args):
    items = load_municipality_codes()
    if args.code:
        codes = set(args.code)
        return [item for item in items if item["code"] in codes]
    if args.prefecture:
        prefs = set(args.prefecture)
        return [item for item in items if item["prefecture"] in prefs]
    if args.all:
        return items
    raise SystemExit("--code、--prefecture、--all のいずれかを指定してください。")


def main():
    parser = argparse.ArgumentParser(description="町丁目地図クイズ用の分割データを生成します。")
    parser.add_argument("--code", action="append", help="市区町村コード。複数指定できます。")
    parser.add_argument("--prefecture", action="append", help="都道府県名。複数指定できます。")
    parser.add_argument("--all", action="store_true", help="全市区町村を対象にします。")
    parser.add_argument("--skip-existing", action="store_true", help="既存の分割データがある市区町村をスキップします。")
    args = parser.parse_args()

    manifest = load_existing_manifest()
    records_by_code = {item["code"]: item for item in manifest.get("municipalities", [])}

    for item in selected_items(args):
        code = item["code"]
        if args.skip_existing and (DATA_DIR / f"{code}.js").exists():
            continue

        pref_code = code[:2]
        existing = load_existing_local_place_data(code)
        try:
            topology = fetch_topology(pref_code, code)
            places, normalized_topology = normalize_topology(topology)
        except (HTTPError, URLError, TimeoutError, ValueError) as error:
            print(f"skip {code} {item['name']}: {error}", file=sys.stderr)
            continue

        places = preserve_readings(places, existing)
        out = write_local_place_file(item, places, normalized_topology)
        records_by_code[code] = {
            "prefecture": item["prefecture"],
            "code": code,
            "name": item["name"],
            "placeCount": aggregate_place_count(places),
            "dataPath": f"./local-place-data/{code}.js",
            "available": True,
        }
        print(f"wrote {out.relative_to(ROOT)} ({len(places)} places)")

    write_manifest(records_by_code.values())


if __name__ == "__main__":
    main()
