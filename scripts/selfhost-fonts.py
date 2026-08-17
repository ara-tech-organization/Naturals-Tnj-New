"""Self-host the webfonts the site uses.

Parses the Google Fonts CSS, keeps only the latin + latin-ext subsets, pulls
every .woff2 into src/assets/fonts/, and emits src/styles/fonts.css.

Two things this handles that a naive download does not:

1. Non-latin subsets (devanagari / cyrillic / vietnamese) are dropped. This
   site's copy never renders them and they double the file count.
2. Files are de-duplicated by content hash. Google serves one identical file
   for several weights of a variable font, so a naive per-weight download can
   ship the same bytes repeatedly; identical faces are collapsed into a single
   @font-face with a `font-weight: 400 600` style range.
"""

import hashlib
import pathlib
import re
import urllib.request

SCRATCH = pathlib.Path(__file__).parent
ROOT = pathlib.Path(__file__).resolve().parent.parent
# Under src/, not public/, so Vite processes the url()s in fonts.css as
# assets — fingerprinted and copied into dist/assets/ with paths rewritten
# to match wherever the build is actually deployed, base path included.
FONT_DIR = ROOT / "src" / "assets" / "fonts"

KEEP_SUBSETS = {"latin", "latin-ext"}
SOURCES = [
    ("gf-poppins.css", "Poppins", "poppins"),
]
BLOCK = re.compile(r"/\*\s*([a-z-]+)\s*\*/\s*@font-face\s*\{(.*?)\}", re.S)


def field(block, name):
    m = re.search(name + r"\s*:\s*([^;]+);", block)
    return m.group(1).strip() if m else None


# ---- 1. fetch every wanted face into memory ------------------------------

raw = []
for css_name, family, slug in SOURCES:
    css = (SCRATCH / css_name).read_text(encoding="utf-8")
    for subset, block in BLOCK.findall(css):
        if subset not in KEEP_SUBSETS:
            continue
        m = re.search(r"url\((https://[^)]+\.woff2)\)", block)
        if not m:
            continue
        req = urllib.request.Request(m.group(1), headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        raw.append(
            {
                "family": family,
                "slug": slug,
                "subset": subset,
                "style": field(block, "font-style") or "normal",
                "weight": int(field(block, "font-weight") or 400),
                "range": field(block, "unicode-range") or "",
                "data": data,
                "hash": hashlib.sha256(data).hexdigest(),
            }
        )

# ---- 2. group identical files, collapse their weights into a range -------

groups = {}
for f in raw:
    groups.setdefault(f["hash"], []).append(f)

# clear out any previous run so removed files don't linger
if FONT_DIR.exists():
    for old in FONT_DIR.glob("*.woff2"):
        old.unlink()
FONT_DIR.mkdir(parents=True, exist_ok=True)

faces = []
total = 0
for members in groups.values():
    first = members[0]
    weights = sorted({m["weight"] for m in members})
    lo, hi = weights[0], weights[-1]
    label = str(lo) if lo == hi else f"{lo}-{hi}"

    fname = f'{first["slug"]}-{label}-{first["style"]}-{first["subset"]}.woff2'
    (FONT_DIR / fname).write_bytes(first["data"])
    total += len(first["data"])

    faces.append(
        {
            "family": first["family"],
            "style": first["style"],
            # CSS weight-range syntax is space separated, not hyphenated
            "weight": str(lo) if lo == hi else f"{lo} {hi}",
            "file": fname,
            "range": first["range"],
            "subset": first["subset"],
            "shared": len(members),
        }
    )
    if len(members) > 1:
        print(f'  {fname:<46} {len(first["data"]):>7,} B  (shared by weights {weights})')
    else:
        print(f'  {fname:<46} {len(first["data"]):>7,} B')

# stable, readable order
faces.sort(key=lambda f: (f["family"], f["style"], f["weight"], f["subset"]))

# ---- 3. emit fonts.css ---------------------------------------------------

head = """/* ==========================================================================
   FONTS — self-hosted

   Poppins, and only Poppins: it is the single family naturalsthanjavur.com
   declares (`font-family: Poppins, sans-serif`, weights 300-700), so the
   redesign matches the corporate site exactly.

   Self-hosted from src/assets/fonts rather than fonts.gstatic.com: that
   removes two DNS lookups and a render-blocking third-party stylesheet from
   the critical path, and the type keeps working where that CDN is slow or
   blocked.

   Only latin and latin-ext ship; the devanagari subset is never rendered by
   this site's copy. Italic 400/500 are included for <em> and inline notes.

   GENERATED FILE — rerun scripts/selfhost-fonts.py, don't hand-edit.
   ========================================================================== */

"""

lines = [head]
for f in faces:
    lines.append("@font-face {")
    lines.append(f'  font-family: "{f["family"]}";')
    lines.append(f'  font-style: {f["style"]};')
    lines.append(f'  font-weight: {f["weight"]};')
    lines.append("  font-display: swap;")
    lines.append(f'  src: url("../assets/fonts/{f["file"]}") format("woff2");')
    if f["range"]:
        lines.append(f'  unicode-range: {f["range"]};')
    lines.append("}")
    lines.append("")

(ROOT / "src" / "styles" / "fonts.css").write_text("\n".join(lines), encoding="utf-8")

print(f"\n{len(raw)} faces fetched -> {len(faces)} unique files")
print(f"total {total / 1024:.0f} KB in src/assets/fonts/")
print("wrote src/styles/fonts.css")
