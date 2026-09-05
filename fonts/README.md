# /fonts

Every face this site uses is served from this domain. No page contacts a font
network — not Google Fonts, not anyone — which is what lets `privacy.html` say
what it says, and what lets these pages set correctly with the cable pulled.

## What is here

| File | Face | Cut | Used by |
| --- | --- | --- | --- |
| `alexandria-latin.woff2` | Alexandria, variable 100–900 | Latin only | `xperience-concept/brochure.html` |
| `notokufiarabic-arabic.woff2` | Noto Kufi Arabic, variable 100–900 | Arabic, subset (below) | `xperience-concept/brochure.html` |
| `inter.woff2` | Inter, variable 100–900 | Latin | `index.html`, `spine.html`, others |
| `fraunces.woff2`, `fraunces-italic.woff2` | Fraunces, variable | Latin | `index.html` |
| `plexmono-400.woff2`, `plexmono-500.woff2` | IBM Plex Mono | Latin | most pages |
| `plexmono-a*.woff2`, `spacegrotesk-a*.woff2` | per-page subsets | Latin | concept pages |

## Why Alexandria and Noto Kufi specifically

They are not a taste call. The **UAE Government Design System** names Alexandria
for Latin and Noto Kufi Arabic for Arabic. The brochure is addressed to that
context, so it uses that context's own faces rather than a lookalike.

Before they were added, the brochure's Arabic — a little under half its text —
had **no specified face at all**: the stack opened `Inter, Segoe UI`, neither of
which contains a single Arabic glyph, so every Arabic run fell through to
whatever the reader's operating system supplied.

## The Noto Kufi subset

Google's Arabic cut is 124 KB. The file here is 75 KB and was produced from it:

```bash
uvx --from "fonttools[woff]" pyftsubset kufi-full.woff2 \
  --output-file=notokufiarabic-arabic.woff2 --flavor=woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0600-06FF,U+0750-077F,U+0870-088E,U+08A0-08FF,U+200B-200F,U+2010-2015,U+2018-201D,U+2026,U+202A-202E,U+2039-203A,U+2066-2069,U+FD3E-FD3F,U+FEFF" \
  --layout-features='*' --notdef-outline --name-IDs='*' --name-legacy
```

`--layout-features='*'` is the flag that matters. Arabic joining lives in the
font's GSUB table (`init` / `medi` / `fina` / `isol` / `rlig`), and a subsetter
will happily throw it away — leaving a font whose letters no longer connect.

**What is NOT in the file:** the legacy Presentation Forms `U+FB50–FDFF`, and the
maths and symbol blocks. Ordinary Arabic text never uses those codepoints; the
shaping engine composes joined forms from the base letters. Some copy-paste
sources do emit them, so if Arabic ever appears here as tofu boxes, that is the
first thing to check.

### It was verified, not assumed

The first attempt at this subset was **wrong**: it kept the Arabic ranges and
forgot `U+0020`, so the font had no space glyph and 39 of the page's 43 Arabic
strings silently rendered at a different width. It looked fine at a glance.

The harness that caught it renders every Arabic string on the page in both the
full font and the subset and compares measured widths. It only reports a result
if three controls pass first:

1. **both fonts actually loaded** — otherwise both measure the same fallback and
   the comparison can only ever say "identical";
2. **a control font that contains no Arabic measures differently** — otherwise
   the probe cannot tell fonts apart at all;
3. **a joining test is non-flat** — the same word rendered normally and with
   `U+200C` between every letter must differ, or shaping is not being exercised
   and a stripped GSUB would pass unnoticed.

Current result: `maxDelta: 0` across all 43 strings, all three controls green.
Re-run it after any change to the subset ranges.

## Licences

Alexandria and Noto Kufi Arabic are both **SIL Open Font License 1.1**, and the
licence text is bundled beside them as the OFL requires:

- `alexandria-OFL.txt` — Copyright 2022 The Alexandria Project Authors
- `notokufiarabic-OFL.txt` — Copyright 2022 The Noto Project Authors

**Open item, for whoever picks it up:** Inter, Fraunces, IBM Plex Mono and Space
Grotesk are all OFL 1.1 too, and their licence text is *not* bundled here. That
predates this note. Closing it means fetching four `OFL.txt` files from
`github.com/google/fonts` (or `rsms/inter`) into this directory — no code change,
no page change.
