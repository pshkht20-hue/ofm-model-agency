"""Assemble Google Ads Business Operations verification files (local use only)."""
from __future__ import annotations

import shutil
from datetime import date
from pathlib import Path

import img2pdf
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "docs" / "google-ads-verification"
ASSETS = Path(
    r"C:\Users\User\.cursor\projects\c-Users-User-ofm-agency-ofm-model-agency\assets"
)

SOURCE_FILES = {
    "passport": ASSETS
    / "c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images______________IMG1780004786343-879c57cf-13e7-4986-b02b-ef5e4b2a746f.png",
    "01-homepage.png": ASSETS
    / "c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_________________2026-06-13___15.45.47-ab6746b4-37c7-4414-acff-df6e78fda5f7.png",
    "02-services.png": ASSETS
    / "c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_________________2026-06-13___15.46.22-e4f0f676-fbba-499f-8860-d37955e6c0c9.png",
    "03-pricing.png": ASSETS
    / "c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_________________2026-06-13___15.46.30-4338768c-86fb-4848-844b-344d0c0d47b5.png",
    "04-contact.png": ASSETS
    / "c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_________________2026-06-13___15.46.45-816746c4-46e5-4145-8574-c1e6f6a7d08b.png",
}

MAX_WIDTH = 1600
JPEG_QUALITY = 88


def compress_image(src: Path, dest: Path) -> Path:
    with Image.open(src) as img:
        img = img.convert("RGB")
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.Resampling.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        img.save(dest, "JPEG", quality=JPEG_QUALITY, optimize=True)
    return dest


def make_cover_jpeg(path: Path) -> None:
    width, height = 1240, 1754
    img = Image.new("RGB", (width, height), "#ffffff")
    draw = ImageDraw.Draw(img)
    try:
        title_font = ImageFont.truetype("arial.ttf", 48)
        sub_font = ImageFont.truetype("arial.ttf", 26)
        small_font = ImageFont.truetype("arial.ttf", 20)
    except OSError:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()
        small_font = ImageFont.load_default()

    draw.text((80, 120), "HypeZone Studio", fill="#111111", font=title_font)
    lines = [
        "Google Ads Business Operations Verification",
        "Payer: Myron Kozlov",
        "Brand: HypeZone Studio",
        "Website: https://hypezone-studio.com",
        "",
        "Included:",
        "1. Identity document (passport)",
        "2. Website screenshots (services, pricing, contact)",
    ]
    y = 210
    for line in lines:
        draw.text((80, y), line, fill="#333333", font=sub_font)
        y += 38
    draw.text((80, height - 120), date.today().isoformat(), fill="#666666", font=small_font)
    img.save(path, "JPEG", quality=JPEG_QUALITY, optimize=True)


def build_pdf_from_jpegs(jpegs: list[Path], pdf_path: Path) -> Path:
    with open(pdf_path, "wb") as f:
        f.write(img2pdf.convert([str(p) for p in jpegs]))
    return pdf_path


def build_all() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    prepared: dict[str, Path] = {}

    for key, src in SOURCE_FILES.items():
        if not src.exists():
            raise FileNotFoundError(f"Missing source image: {src}")
        if key == "passport":
            out_name = "00-passport.jpg"
        else:
            out_name = key.replace(".png", ".jpg")
        prepared[key] = compress_image(src, OUT_DIR / out_name)

    cover = OUT_DIR / "_cover.jpg"
    make_cover_jpeg(cover)

    ordered = [
        cover,
        prepared["passport"],
        prepared["01-homepage.png"],
        prepared["02-services.png"],
        prepared["03-pricing.png"],
        prepared["04-contact.png"],
    ]

    outputs = {
        "verification-upload.pdf": ordered,
        "passport-upload.pdf": [prepared["passport"]],
        "website-upload.pdf": ordered[2:],
    }

    for name, pages in outputs.items():
        build_pdf_from_jpegs(pages, OUT_DIR / name)

    shutil.copy2(OUT_DIR / "verification-upload.pdf", OUT_DIR / "hypezone-google-ads-verification.pdf")
    cover.unlink(missing_ok=True)

    for path in sorted(OUT_DIR.glob("*.pdf")) + sorted(OUT_DIR.glob("*.jpg")):
        if path.name.startswith("_"):
            continue
        print(f"{path.name}: {path.stat().st_size / 1024:.1f} KB")

    print(f"Folder: {OUT_DIR}")


if __name__ == "__main__":
    build_all()
