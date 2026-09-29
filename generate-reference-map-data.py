import json
import re
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SOURCE = Path(r"C:\Users\cheet.YAKUMO\.codex\attachments\040c278f-9bc3-4dad-843d-d554272a2ae6\pasted-text.txt")
OUTPUT = ROOT / "reference-map-data.js"


class PathParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "path":
            return
        attr = dict(attrs)
        path_id = attr.get("id", "")
        if not re.fullmatch(r"M\d{5}", path_id):
            return
        item = {
            "code": path_id[1:],
            "path": absolute_line_path(attr.get("d", ""))
        }
        if attr.get("fill-rule"):
            item["fillRule"] = attr["fill-rule"]
        self.paths.append(item)


def absolute_line_path(path_data):
    tokens = re.findall(r"[MmLlHhVvZz]|-?\d*\.?\d+(?:e[-+]?\d+)?", path_data)
    index = 0
    command = None
    x = y = 0.0
    start_x = start_y = 0.0
    parts = []

    def is_command(value):
        return re.fullmatch(r"[MmLlHhVvZz]", value) is not None

    def number():
        nonlocal index
        value = float(tokens[index])
        index += 1
        return value

    while index < len(tokens):
        if is_command(tokens[index]):
            command = tokens[index]
            index += 1
        if command is None:
            break

        if command in "Zz":
            parts.append("Z")
            x, y = start_x, start_y
            command = None
            continue

        if command in "Mm":
            first_pair = True
            while index < len(tokens) and not is_command(tokens[index]):
                nx = number()
                ny = number()
                if command == "m":
                    nx += x
                    ny += y
                x, y = nx, ny
                if first_pair:
                    parts.append(f"M{x:.2f},{y:.2f}")
                    start_x, start_y = x, y
                    first_pair = False
                else:
                    parts.append(f"L{x:.2f},{y:.2f}")
            command = "l" if command == "m" else "L"
            continue

        if command in "Ll":
            while index < len(tokens) and not is_command(tokens[index]):
                nx = number()
                ny = number()
                if command == "l":
                    nx += x
                    ny += y
                x, y = nx, ny
                parts.append(f"L{x:.2f},{y:.2f}")
            continue

        if command in "Hh":
            while index < len(tokens) and not is_command(tokens[index]):
                nx = number()
                if command == "h":
                    nx += x
                x = nx
                parts.append(f"L{x:.2f},{y:.2f}")
            continue

        if command in "Vv":
            while index < len(tokens) and not is_command(tokens[index]):
                ny = number()
                if command == "v":
                    ny += y
                y = ny
                parts.append(f"L{x:.2f},{y:.2f}")
            continue

        raise ValueError(f"unsupported path command: {command}")

    return " ".join(parts)


def main():
    parser = PathParser()
    parser.feed(SOURCE.read_text(encoding="utf-8"))
    paths = [item for item in parser.paths if item["path"]]
    payload = {
        "茨城県": paths
    }
    OUTPUT.write_text(
        "window.prefectureMapPathOverrides = "
        + json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8"
    )
    print(f"wrote {OUTPUT.name}: {len(paths)} paths")


if __name__ == "__main__":
    main()
