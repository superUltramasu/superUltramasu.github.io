import json
import re
from html import unescape
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SOURCE_DIR = Path(r"D:\prefquiz-txt\svgtags")
OUTPUT_JS = ROOT / "prefecture-map-overrides.js"

PATH_RE = re.compile(r"<path\b([^>]*)>", re.IGNORECASE)
ATTR_RE = re.compile(r"([\w:-]+)\s*=\s*(['\"])(.*?)\2", re.DOTALL)


def attrs_from_tag(tag_attrs):
    return {name.lower(): unescape(value) for name, _, value in ATTR_RE.findall(tag_attrs)}


def path_item(tag_attrs):
    attrs = attrs_from_tag(tag_attrs)
    raw_id = attrs.get("id", "")
    match = re.fullmatch(r"M(\d{5})", raw_id)
    path = attrs.get("d", "").strip()
    if not match or not path:
        return None
    item = {"code": match.group(1), "path": path}
    fill_rule = attrs.get("fill-rule")
    if fill_rule:
        item["fillRule"] = fill_rule
    return item


def read_prefecture_file(path):
    text = path.read_text(encoding="utf-8")
    items = []
    for match in PATH_RE.finditer(text):
        item = path_item(match.group(1))
        if item:
            items.append(item)
    return items


def main():
    if not SOURCE_DIR.exists():
        raise SystemExit(f"source directory not found: {SOURCE_DIR}")

    overrides = {}
    for path in sorted(SOURCE_DIR.glob("*.txt")):
        prefecture = path.stem
        items = read_prefecture_file(path)
        if not items:
            print(f"skip {prefecture}: no map paths")
            continue
        overrides[prefecture] = {
            "items": items,
            "svg": path.read_text(encoding="utf-8").strip(),
            "keepTogether": True,
            "source": "jetpunk"
        }
        print(f"{prefecture}: {len(items)} paths")

    payload = json.dumps(overrides, ensure_ascii=False, separators=(",", ":"))
    OUTPUT_JS.write_text(f"window.prefectureMapPathOverrides = {payload};\n", encoding="utf-8")
    print(f"wrote {OUTPUT_JS.name}: {sum(len(value['items']) for value in overrides.values())} paths")


if __name__ == "__main__":
    main()
