import json
import math
import re
import xml.etree.ElementTree as ET
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SOURCE_XML = ROOT / "W09-05_GML" / "W09-05-g.xml"
OUTPUT_JS = ROOT / "lake-data.js"

NS = {
    "gml": "http://www.opengis.net/gml/3.2",
    "ksj": "http://nlftp.mlit.go.jp/ksj/schemas/ksj-app",
    "xlink": "http://www.w3.org/1999/xlink",
}

GML_ID = f"{{{NS['gml']}}}id"
XLINK_HREF = f"{{{NS['xlink']}}}href"

PREFECTURES = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
    "岐阜県", "静岡県", "愛知県", "三重県",
    "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
    "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県",
    "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
]

MAJOR_LAKES = {
    "霞ヶ浦", "北浦", "涸沼", "琵琶湖", "浜名湖", "中海", "宍道湖",
    "猪苗代湖", "中禅寺湖", "十和田湖", "小川原湖", "諏訪湖",
    "河口湖", "山中湖", "本栖湖", "西湖", "精進湖", "サロマ湖",
    "網走湖", "屈斜路湖", "摩周湖", "支笏湖", "洞爺湖", "池田湖",
}


def ref_id(value):
    value = (value or "").lstrip("#")
    return value[1:] if value.startswith("_") else value


def prefecture_name(code):
    if not code or len(code) < 2 or not code[:2].isdigit():
        return None
    index = int(code[:2]) - 1
    if index < 0 or index >= len(PREFECTURES):
        return None
    return PREFECTURES[index]


def parse_pos_list(pos_list):
    values = [float(value) for value in pos_list.split()]
    return [(values[index + 1], values[index]) for index in range(0, len(values) - 1, 2)]


def parse_gml():
    tree = ET.parse(SOURCE_XML)
    root = tree.getroot()

    curves = {}
    for curve in root.findall(".//gml:Curve", NS):
        curve_id = curve.get(GML_ID)
        pos_list = curve.find(".//gml:posList", NS)
        if curve_id and pos_list is not None and pos_list.text:
            curves[curve_id] = parse_pos_list(pos_list.text)

    surfaces = {}
    for surface in root.findall(".//gml:Surface", NS):
        surface_id = surface.get(GML_ID)
        if not surface_id:
            continue
        rings = []
        for exterior in surface.findall(".//gml:exterior", NS):
            curve_ids = [
                ref_id(member.get(XLINK_HREF))
                for member in exterior.findall(".//gml:curveMember", NS)
                if member.get(XLINK_HREF)
            ]
            ring = []
            for curve_id in curve_ids:
                points = curves.get(curve_id, [])
                if not points:
                    continue
                if ring and points and ring[-1] == points[0]:
                    ring.extend(points[1:])
                else:
                    ring.extend(points)
            if len(ring) >= 3:
                rings.append(ring)
        surfaces[surface_id] = rings

    lakes = []
    for lake in root.findall(".//ksj:Lake", NS):
        name_el = lake.find("ksj:lakeName", NS)
        code_el = lake.find("ksj:administrativeAreaCode", NS)
        bounds_el = lake.find("ksj:bounds", NS)
        if name_el is None or code_el is None or bounds_el is None:
            continue
        name = (name_el.text or "").strip()
        pref = prefecture_name((code_el.text or "").strip())
        surface_id = ref_id(bounds_el.get(XLINK_HREF))
        rings = surfaces.get(surface_id, [])
        if name and pref and rings:
            lakes.append({"name": name, "prefecture": pref, "rings": rings})
    return lakes


def project(lon, lat):
    # Matches the jpn-atlas projection used to build map-quiz-data.js, then
    # shifts the generated coordinates into this app's SVG coordinate space.
    lambda_rad = math.radians(lon)
    phi = math.radians(lat)
    lambda_rad += math.radians(-138.5)
    delta = math.radians(-35.7)

    x = math.cos(lambda_rad) * math.cos(phi)
    y = math.sin(lambda_rad) * math.cos(phi)
    z = math.sin(phi)
    rotated_lambda = math.atan2(y, x * math.cos(delta) - z * math.sin(delta))
    rotated_phi = math.asin(z * math.cos(delta) + x * math.sin(delta))

    denominator = 1 + math.cos(rotated_lambda) * math.cos(rotated_phi)
    if denominator <= 0:
        return None
    k = math.sqrt(2 / denominator)
    raw_x = k * math.cos(rotated_phi) * math.sin(rotated_lambda)
    raw_y = k * math.sin(rotated_phi)

    return (1700 * raw_x + 2500 - 2068, -1930 - 1700 * raw_y + 2236)


def perpendicular_distance(point, start, end):
    px, py = point
    sx, sy = start
    ex, ey = end
    dx = ex - sx
    dy = ey - sy
    if dx == 0 and dy == 0:
        return math.hypot(px - sx, py - sy)
    return abs(dy * px - dx * py + ex * sy - ey * sx) / math.hypot(dx, dy)


def simplify_open(points, tolerance):
    if len(points) <= 2:
        return points
    start = points[0]
    end = points[-1]
    max_distance = -1
    max_index = 0
    for index in range(1, len(points) - 1):
        distance = perpendicular_distance(points[index], start, end)
        if distance > max_distance:
            max_distance = distance
            max_index = index
    if max_distance <= tolerance:
        return [start, end]
    return simplify_open(points[: max_index + 1], tolerance)[:-1] + simplify_open(points[max_index:], tolerance)


def simplify_ring(points, tolerance=0.18):
    deduped = []
    for point in points:
        if not deduped or math.hypot(point[0] - deduped[-1][0], point[1] - deduped[-1][1]) >= 0.08:
            deduped.append(point)
    if len(deduped) > 1 and math.hypot(deduped[0][0] - deduped[-1][0], deduped[0][1] - deduped[-1][1]) < 0.08:
        deduped.pop()
    if len(deduped) < 4:
        return deduped
    simplified = simplify_open(deduped + [deduped[0]], tolerance)[:-1]
    return simplified if len(simplified) >= 3 else deduped


def bbox(points):
    xs = [point[0] for point in points]
    ys = [point[1] for point in points]
    return min(xs), min(ys), max(xs), max(ys)


def should_keep(name, points):
    min_x, min_y, max_x, max_y = bbox(points)
    width = max_x - min_x
    height = max_y - min_y
    area = width * height
    return name in MAJOR_LAKES or width >= 1.1 or height >= 1.1 or area >= 1.2


def path_from_points(points):
    parts = []
    for index, (x, y) in enumerate(points):
        command = "M" if index == 0 else "L"
        parts.append(f"{command}{x:.2f} {y:.2f}")
    return " ".join(parts) + " Z"


def make_records(lakes):
    records = {}
    for lake in lakes:
        for ring in lake["rings"]:
            projected = [project(lon, lat) for lon, lat in ring]
            projected = [point for point in projected if point is not None]
            if len(projected) < 3:
                continue
            projected = simplify_ring(projected)
            if len(projected) < 3 or not should_keep(lake["name"], projected):
                continue
            path = path_from_points(projected)
            key_name = re.sub(r"\s+", "", lake["name"])
            record = records.setdefault((key_name, path), {"name": lake["name"], "prefectures": set(), "path": path})
            record["prefectures"].add(lake["prefecture"])

    output = []
    for record in records.values():
        output.append({
            "name": record["name"],
            "prefectures": sorted(record["prefectures"], key=PREFECTURES.index),
            "paths": [record["path"]],
        })
    output.sort(key=lambda item: (PREFECTURES.index(item["prefectures"][0]), item["name"]))
    return output


def main():
    if not SOURCE_XML.exists():
        raise SystemExit(f"source not found: {SOURCE_XML}")
    records = make_records(parse_gml())
    payload = json.dumps(records, ensure_ascii=False, separators=(",", ":"))
    OUTPUT_JS.write_text(f"window.mapLakeData = {payload};\n", encoding="utf-8")
    total_paths = sum(len(record["paths"]) for record in records)
    print(f"wrote {OUTPUT_JS.name}: {len(records)} lakes, {total_paths} paths")


if __name__ == "__main__":
    main()
