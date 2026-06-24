from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageOps


VARIANTS = (
    (".thumb.webp", 720, 74),
    (".lightbox.webp", 1600, 84),
)
SOURCE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}


def is_generated_variant(path: Path) -> bool:
    return any(str(path).lower().endswith(suffix) for suffix, _, _ in VARIANTS)


def iter_source_images(root: Path) -> list[Path]:
    return sorted(
        path
        for path in root.rglob("*")
        if path.is_file()
        and path.suffix.lower() in SOURCE_EXTENSIONS
        and not is_generated_variant(path)
    )


def needs_regeneration(source: Path, target: Path) -> bool:
    return not target.exists() or target.stat().st_mtime < source.stat().st_mtime


def export_variant(source: Path, suffix: str, max_dimension: int, quality: int) -> None:
    target = source.with_name(f"{source.stem}{suffix}")

    if not needs_regeneration(source, target):
        return

    with Image.open(source) as original_image:
        image = ImageOps.exif_transpose(original_image)
        has_alpha = image.mode in {"RGBA", "LA"} or (
            image.mode == "P" and "transparency" in image.info
        )
        image = image.convert("RGBA" if has_alpha else "RGB")

        if max(image.size) > max_dimension:
            image.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)

        image.save(target, format="WEBP", quality=quality, method=6)


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: optimize_gallery_images.py <image-root>", file=sys.stderr)
        return 1

    root = Path(sys.argv[1]).resolve()

    if not root.exists():
        print(f"Image root not found: {root}", file=sys.stderr)
        return 1

    source_images = iter_source_images(root)

    for source in source_images:
        for suffix, max_dimension, quality in VARIANTS:
            export_variant(source, suffix, max_dimension, quality)

    print(f"Optimized {len(source_images)} source images under {root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
