from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".heic"}
VIDEO_EXTENSIONS = {".mp4", ".mov", ".webm"}
CATEGORY = "grecia-turchia"


def slugify(value: str) -> str:
    allowed = []
    for char in value.lower():
        if char.isalnum():
            allowed.append(char)
        else:
            allowed.append("-")

    slug = "".join(allowed).strip("-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug


def orientation_for_size(width: int, height: int) -> str:
    if width == height:
        return "square"
    return "landscape" if width > height else "portrait"


def parse_label(stem: str, kind: str) -> str:
    if len(stem) >= 15 and stem[0:8].isdigit() and stem[9:15].isdigit():
        year = stem[0:4]
        month = stem[4:6]
        day = stem[6:8]
        hour = stem[9:11]
        minute = stem[11:13]
        noun = "Foto" if kind == "photo" else "Video"
        return f"{noun} Grecia | Turchia del {day}/{month}/{year} alle {hour}:{minute}"

    noun = "Foto" if kind == "photo" else "Video"
    return f"{noun} Grecia | Turchia - {stem}"


def convert_heic(source: Path, target: Path, converter: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [str(converter), "-q", "92", str(source), str(target)],
        check=True,
        capture_output=True,
        text=True,
    )


def copy_source_media(source_dir: Path, project_root: Path, converter: Path) -> None:
    target_image_dir = project_root / "public" / "assets" / "images" / CATEGORY
    target_video_dir = project_root / "public" / "assets" / "videos" / CATEGORY

    target_image_dir.mkdir(parents=True, exist_ok=True)
    target_video_dir.mkdir(parents=True, exist_ok=True)

    for source in sorted(source_dir.iterdir()):
        if not source.is_file():
            continue

        extension = source.suffix.lower()

        if extension in IMAGE_EXTENSIONS:
            if extension == ".heic":
                target = target_image_dir / f"{source.stem}.jpg"
                if not target.exists() or target.stat().st_mtime < source.stat().st_mtime:
                    convert_heic(source, target, converter)
            else:
                target = target_image_dir / source.name
                if not target.exists() or target.stat().st_mtime < source.stat().st_mtime:
                    shutil.copy2(source, target)

        if extension in VIDEO_EXTENSIONS:
            target = target_video_dir / source.name
            if not target.exists() or target.stat().st_mtime < source.stat().st_mtime:
                shutil.copy2(source, target)


def build_photo_entries(project_root: Path) -> list[str]:
    image_dir = project_root / "public" / "assets" / "images" / CATEGORY
    entries: list[str] = []

    for image_path in sorted(image_dir.iterdir()):
        if not image_path.is_file():
            continue

        if image_path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp", ".avif"}:
            continue

        if image_path.name.endswith(".thumb.webp") or image_path.name.endswith(".lightbox.webp"):
            continue

        with Image.open(image_path) as image:
            normalized = ImageOps.exif_transpose(image)
            width, height = normalized.size

        relative_path = image_path.relative_to(project_root / "public").as_posix()
        alt = parse_label(image_path.stem, "photo")
        orientation = orientation_for_size(width, height)
        identifier = f"{CATEGORY}-{slugify(image_path.stem)}"

        entries.append(
            "\n".join(
                [
                    f'  createPhotoItem("{relative_path}", {{',
                    f'    alt: "{alt}",',
                    '    category: "grecia-turchia",',
                    f'    id: "{identifier}",',
                    f'    orientation: "{orientation}",',
                    "  }),",
                ]
            )
        )

    return entries


def build_video_entries(project_root: Path) -> list[str]:
    video_dir = project_root / "public" / "assets" / "videos" / CATEGORY
    entries: list[str] = []

    for video_path in sorted(video_dir.iterdir()):
        if not video_path.is_file() or video_path.suffix.lower() not in VIDEO_EXTENSIONS:
            continue

        relative_path = video_path.relative_to(project_root / "public").as_posix()
        alt = parse_label(video_path.stem, "video")
        identifier = f"{CATEGORY}-{slugify(video_path.stem)}"

        entries.append(
            "\n".join(
                [
                    "  {",
                    f'    alt: "{alt}",',
                    '    category: "grecia-turchia",',
                    f'    id: "{identifier}",',
                    '    kind: "video",',
                    '    orientation: "portrait",',
                    f'    src: asset("{relative_path}"),',
                    "  },",
                ]
            )
        )

    return entries


def write_generated_module(project_root: Path) -> None:
    output_path = project_root / "src" / "data" / "generated" / "greciaTurchiaMedia.ts"
    photo_entries = build_photo_entries(project_root)
    video_entries = build_video_entries(project_root)
    entry_lines = [*photo_entries, *video_entries]
    body = "\n".join(entry_lines)

    if body:
        body = f"\n{body}\n"

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        "\n".join(
            [
                'import { asset, optimizedGalleryImageAssets } from "../../lib/asset";',
                'import type { JournalMediaItem } from "../../types/content";',
                "",
                "function createPhotoItem(",
                "  path: string,",
                '  item: Omit<JournalMediaItem, "kind" | "src" | "thumbnailSrc" | "lightboxSrc">,',
                "): JournalMediaItem {",
                "  const optimizedAssets = optimizedGalleryImageAssets(path);",
                "",
                "  return {",
                "    ...item,",
                '    kind: "photo",',
                "    lightboxSrc: optimizedAssets.lightboxSrc,",
                "    src: asset(path),",
                "    thumbnailSrc: optimizedAssets.thumbnailSrc,",
                "  };",
                "}",
                "",
                "export const greciaTurchiaMedia: readonly JournalMediaItem[] = [",
                body.rstrip(),
                "];",
                "",
            ]
        ),
        encoding="utf-8",
    )


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: import_grecia_turchia_media.py <source-dir>", file=sys.stderr)
        return 1

    source_dir = Path(sys.argv[1]).resolve()

    if not source_dir.exists():
        print(f"Source dir not found: {source_dir}", file=sys.stderr)
        return 1

    project_root = Path(__file__).resolve().parent.parent
    converter = (
        Path.home()
        / ".cache"
        / "codex-runtimes"
        / "codex-primary-runtime"
        / "dependencies"
        / "bin"
        / ("heif-convert.cmd" if sys.platform == "win32" else "heif-convert")
    )

    if not converter.exists():
        print(f"HEIC converter not found: {converter}", file=sys.stderr)
        return 1

    copy_source_media(source_dir, project_root, converter)
    write_generated_module(project_root)
    print(f"Imported media from {source_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
