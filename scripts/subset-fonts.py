"""Сабсеты шрифтов сайта → src/shared/assets/fonts/.

Один файл на начертание: латиница + кириллица + пунктуация + ₽. Вариативные
оси сужены до начертаний из вёрстки. Запускать при смене гарнитур или если в
текстах появились символы вне UNICODES:

    pip install fonttools brotli
    python scripts/subset-fonts.py <InterTight[wght].ttf> <PlayfairDisplay[wght].ttf> \
        <PlayfairDisplay-Italic[wght].ttf> src/shared/assets/fonts

Исходники — github.com/google/fonts (ofl/intertight, ofl/playfairdisplay), OFL.
"""
import io
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

# Google "latin" + "cyrillic" + ₽ (U+20BD, у Google он в latin-ext) + № (U+2116).
UNICODES = (
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0301,U+0304,"
    "U+0308,U+0329,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2000-206F,U+20AC,U+20BD,"
    "U+2116,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD"
)

FEATURES = ["kern", "liga", "clig", "calt", "lnum", "pnum", "tnum", "onum", "locl", "ccmp", "mark", "mkmk"]

EXTENSIONS = {"woff2": "woff2", "woff": "woff"}


def build(src: str, axes: dict, name: str, flavors: tuple[str, ...], out: Path) -> None:
    instance = io.BytesIO()
    instancer.instantiateVariableFont(TTFont(src), axes).save(instance)

    for flavor in flavors:
        options = subset.Options()
        options.flavor = flavor
        options.layout_features = FEATURES
        options.name_IDs = ["*"]
        options.notdef_outline = True
        options.hinting = False
        options.desubroutinize = True

        subsetter = subset.Subsetter(options)
        subsetter.populate(unicodes=subset.parse_unicodes(UNICODES))

        # Subsetter мутирует шрифт — каждый формат из свежей копии инстанса
        instance.seek(0)
        font = TTFont(instance)
        subsetter.subset(font)
        font.flavor = flavor

        path = out / f"{name}.{EXTENSIONS[flavor]}"
        font.save(path)
        print(f"{path.name}: {path.stat().st_size} bytes")


def main() -> None:
    inter_src, playfair_src, playfair_italic_src, out_dir = sys.argv[1:5]
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)

    # Inter Tight: 400 (текст) и 500 (eyebrow, кнопки) — ось сужена до 400..500.
    build(inter_src, {"wght": (400, 500)}, "inter-tight-400-500", ("woff2",), out)
    # Playfair Display: только 400 — статичный инстанс вместо оси 400..900.
    # WOFF — для OG-картинки и apple-icon: satori (next/og) не читает WOFF2.
    build(playfair_src, {"wght": 400}, "playfair-display-400", ("woff2", "woff"), out)
    build(playfair_italic_src, {"wght": 400}, "playfair-display-400-italic", ("woff2", "woff"), out)


if __name__ == "__main__":
    main()
