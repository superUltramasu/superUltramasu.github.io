import json
import math
import sys
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "n03-data"
OUTPUT_JS = ROOT / "prefecture-map-overrides.js"

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


def project(lon, lat):
    lambda_rad = math.radians(lon) + math.radians(-138.5)
    phi = math.radians(lat)
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


def simplify_ring(points, tolerance=0.045):
    deduped = []
    for point in points:
        if point is None:
            continue
        if not deduped or math.hypot(point[0] - deduped[-1][0], point[1] - deduped[-1][1]) >= 0.025:
            deduped.append(point)
    if len(deduped) > 1 and math.hypot(deduped[0][0] - deduped[-1][0], deduped[0][1] - deduped[-1][1]) < 0.025:
        deduped.pop()
    if len(deduped) < 4:
        return deduped
    simplified = simplify_open(deduped + [deduped[0]], tolerance)[:-1]
    return simplified if len(simplified) >= 3 else deduped


def ring_path(ring):
    parts = []
    for index, (x, y) in enumerate(ring):
        command = "M" if index == 0 else "L"
        parts.append(f"{command}{x:.2f} {y:.2f}")
    return " ".join(parts) + " Z"


def polygon_path(polygon):
    rings = []
    for ring in polygon:
        projected = simplify_ring([project(lon, lat) for lon, lat in ring])
        if len(projected) >= 3:
            rings.append(ring_path(projected))
    return " ".join(rings), len(rings) > 1


def zip_path(pref_code):
    candidates = [
        DATA_DIR / f"N03-20250101_{pref_code:02d}_GML.zip",
        ROOT / f"N03-20250101_{pref_code:02d}_GML.zip",
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    return candidates[0]


def read_geojson(pref_code):
    archive_path = zip_path(pref_code)
    if not archive_path.exists():
        raise FileNotFoundError(archive_path)
    with zipfile.ZipFile(archive_path) as archive:
        name = next((item for item in archive.namelist() if item.endswith(".geojson")), None)
        if not name:
            raise FileNotFoundError(f"geojson not found in {archive_path}")
        return json.loads(archive.read(name).decode("utf-8"))


def feature_paths(feature):
    code = feature["properties"].get("N03_007")
    if not code:
        return []
    geometry = feature.get("geometry") or {}
    geometry_type = geometry.get("type")
    coordinates = geometry.get("coordinates") or []
    polygons = coordinates if geometry_type == "MultiPolygon" else [coordinates]
    output = []
    for polygon in polygons:
        path, has_holes = polygon_path(polygon)
        if path:
            item = {"code": code, "path": path}
            if has_holes:
                item["fillRule"] = "evenodd"
            output.append(item)
    return output


def build(pref_codes):
    overrides = {}
    for pref_code in pref_codes:
        pref_name = PREFECTURES[pref_code - 1]
        geojson = read_geojson(pref_code)
        items = []
        for feature in geojson.get("features", []):
            items.extend(feature_paths(feature))
        overrides[pref_name] = items
        print(f"{pref_code:02d} {pref_name}: {len(items)} paths")
    return overrides


def main():
    if len(sys.argv) > 1:
        pref_codes = [int(value) for value in sys.argv[1:]]
    else:
        pref_codes = list(range(1, 48))
    overrides = build(pref_codes)
    payload = json.dumps(overrides, ensure_ascii=False, separators=(",", ":"))
    OUTPUT_JS.write_text(f"window.prefectureMapPathOverrides = {payload};\n", encoding="utf-8")
    print(f"wrote {OUTPUT_JS.name}: {sum(len(items) for items in overrides.values())} paths")


if __name__ == "__main__":
    main()
