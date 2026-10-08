# UI Reference — "Будинки та Люди" style

Source: https://budynkytaliudy.com/ (Lviv developer bureau, built on Svit.One).
Values below come from the site's own CSS and computed styles (checked 2026-10-08).

---

## 1. Overall look

- **Warm paper look:** a cream/beige page, near-black ink text, almost no other colors.
- **Big type.** Huge lowercase headings (up to 140px) with tight line-height, set beside small uppercase body copy in a heavy weight.
- **Flat UI.** No shadows and no gradients, except one subtle beige gradient used as an image placeholder. Separation comes from thin hairline borders and pill-shaped dark buttons.
- **Lots of empty space.** Asymmetric, editorial layouts: text on the left, photo on the right, with large vertical gaps.
- **Rounded shapes:** pill buttons and inputs (`border-radius: 36–40px`), and soft cards (16px / 48px).
- **Small animated details:** images zoom on hover, the menu slides in from the right, and a floating mascot button sits at the bottom right.
- **Language and tone:** Ukrainian, lowercase, friendly and personal. Examples: "давайте знайомитися", "Наш менеджер уже летить до вас".

---

## 2. Color palette

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#EFEBDF` | Page background (body), menu panel, cards on darker sections |
| `--ink` | `#201F25` | Primary text, logo, icons, dark buttons, burger button, chevron circles |
| `--ink-soft` | `#413F4C` | Accordion section text |
| `--text-muted` | `#565550` | Secondary text, accordion content, menu link meta |
| `--accent` | `#984535` | Brick/terracotta accent: primary CTA background, active accordion, social icon hover |
| `--sand` | `#DACBB4` | Large "ghost" nav links (default state), section dividers, social icons on mobile, video control text |
| `--sand-dark` | `#AEA488` | Input placeholders, muted labels |
| `--surface-2` | `#E8E1D1` | Darker beige section background, image frames |
| `--surface-3` | `#E6DFCF` | Filled input background (alternative input style) |
| `--hover` | `#EBE7DB` | Menu row hover background |
| `--line` | `#D6D3C9` | Hairline borders (menu rows, accordion) |
| `--line-warm` | `#C0B7B7` | Table-like row borders |
| `--line-input` | `#EBE3D7` | Input border |
| `--card` | `#FFFEF8` | Off-white card (flip cards) |
| `--white` | `#FFFFFF` | Form inputs on the contact section |
| `--icon-light` | `#E8EAED` | Burger icon fill (on dark button) |

**Placeholder gradient** (shown while images load and behind cards):
```css
background-image: linear-gradient(166deg, rgba(240,231,202,1) 0%, rgba(188,183,146,1) 100%);
```

**Text on dark:** the dark pill buttons use `--bg` (`#EFEBDF`) as their text color, not pure white.

```css
:root {
  --bg: #EFEBDF;
  --ink: #201F25;
  --ink-soft: #413F4C;
  --text-muted: #565550;
  --accent: #984535;
  --sand: #DACBB4;
  --sand-dark: #AEA488;
  --surface-2: #E8E1D1;
  --surface-3: #E6DFCF;
  --hover: #EBE7DB;
  --line: #D6D3C9;
  --line-warm: #C0B7B7;
  --line-input: #EBE3D7;
  --card: #FFFEF8;
  --placeholder-gradient: linear-gradient(166deg, #F0E7CA 0%, #BCB792 100%);
}
```

The site has no dark mode.

---

## 3. Typography

### Font

**Work Sans** is the only typeface, in four weights. The site loads each weight as a separate family name:

| Site family name | Weight | Use |
|---|---|---|
| `Work-Sans-Regular` | 400 | Body default, long text |
| `Work-Sans-Medium` | 500 | Small UI text, inputs, uppercase subtitles, buttons (small) |
| `Work-Sans-Bold` | 700 | Display headings, paragraph emphasis, buttons, accordion titles |
| `Work-Sans-Black` | 900 | Nav links, uppercase statement text, footer links, ghost links |

> ⚠️ **Cyrillic:** the site self-hosts a Work Sans v1.000 build with Cyrillic glyphs (by Ivan Tsanko):
> `/site-static/fonts/WorkSans-{Bold,Black,Medium}.ttf`, `/site-static/fonts/Work-Sans-Regular.ttf`.
> The Google Fonts version of Work Sans may not include Cyrillic, so check it before using it. If it doesn't, self-host a Cyrillic build (check the license) or use a close fallback such as **Onest**, **Manrope** or **Golos Text**.

Recommended setup (one family, real weights):
```css
@font-face { font-family: "Work Sans"; src: url(/fonts/WorkSans-Regular.ttf); font-weight: 400; }
@font-face { font-family: "Work Sans"; src: url(/fonts/WorkSans-Medium.ttf);  font-weight: 500; }
@font-face { font-family: "Work Sans"; src: url(/fonts/WorkSans-Bold.ttf);    font-weight: 700; }
@font-face { font-family: "Work Sans"; src: url(/fonts/WorkSans-Black.ttf);   font-weight: 900; }
body { font-family: "Work Sans", system-ui, sans-serif; }
```

### Type scale (mobile → ≥768px → ≥992px)

| Role | Weight | Size | Line-height | Case / tracking | Color |
|---|---|---|---|---|---|
| **Display XL** ("хто ми", "давайте знайомитися") | 700 | 46 / 64 → 90–100 → **140px** | 0.84–0.86 | `lowercase` | `--ink` |
| **Ghost link list** ("Курдонери", "люди") | 900 | 40 → 60 → **80px** | 1 | -0.4px, centered | `--sand` → hover `--ink` |
| **Section title (uppercase)** | 500 | 32 → 46 → **64px** | 0.9 | `uppercase`, -2% | `--ink` |
| **Title on dark/image** | 500 | 43 → **88px** | 0.9 | `uppercase`, -2% | `--bg` |
| **Statement text** (uppercase block, e.g. "Наша мрія – аби архітектура…") | 900 | **24px** desktop | normal | `uppercase` | `--ink` |
| **Menu link** | 900 | 18 → **32px** | 24px → 36px | lowercase | `--ink`, hover underline |
| **Accordion title** | 700 | 18–20 → 26 → **32px** | — | — | `--ink` |
| **Card title** | 900 | 20 → **24px** | — | — | `--ink` |
| **Lead paragraph** (`.txt-1`) | 500 → 700 | 16 → **20px** | 20 → 24px | — | `--ink` |
| **Uppercase label** (`.txt-2`) | 500 | — → 20 → **24px** | — | `uppercase` | `--ink` |
| **Body** | 400/500 | 14 → 16 → 18px | 1.3–1.4 | — | `--ink` / `--text-muted` |
| **Small / meta** | 500 | 12 → 14px | 1.2 | — | `--text-muted` |
| **Footer link** | 900 | 18 → 20 → **24px** | 24 → 28px | hover underline | `--ink` |
| **Button text** | 500–700 | 14 → 16 / 24px (large CTA) | — | — | `--bg` |

Rules of thumb:
- Big headings are **lowercase**, small text blocks are often **UPPERCASE in Black (900)**.
- Display headings use negative tracking and very tight line-height (<0.9), so lines nearly touch.
- A heading can be split across two lines, with the second line pushed right ("давайте" at left, "знайомитися" right-aligned under it).

---

## 4. Layout & spacing

### Breakpoints
`480px`, `768px`, `992px` (mobile-first, `min-width`).

### Containers
- Content max-width: **1300px** (`margin: 0 auto`). Header/nav wrapper: 1420px.
- Section side padding: **20px** (mobile) → **70px** (≥480px).
- Section vertical padding: `80px` → `120px` (≥768) → `140px` (≥992) top; bottom sections up to `180px 70px 140px`.
- Header padding: `40px 16px 20px` → `40px 24px` → `40px 34px`.

### Grid
- 4 columns on mobile → **12 columns** at ≥768px, `column-gap: 16px` → `20px`.
- Typical split: text spans `1/8`, image spans `8/13`; accordions sit centered in `4/10`.

### Spacing pattern
Use multiples of 4/8: 4, 8, 12, 16, 20, 24, 32, 40, 56, 64, 80, 100, 120, 140.

---

## 5. Components

### Header (fixed)
- `position: fixed`, full width, transparent background over content.
- Left: **logo**, a black wordmark "будинки / та люди" set in two lines, with a small house-shaped face icon. Height 40px → 48px. Fill `--ink`.
- Right: **burger button**, a dark pill `56×44` → `64×48`, `border-radius: 24px`, bg `--ink`, three-line icon in `#E8EAED`. It becomes a close (×) icon when the menu is open.

### Side menu (off-canvas)
- Slides in from the right (`right: -100%` → `0`), full height. Full width on mobile, **50%** on ≥768px.
- Panel bg `--bg`, top padding `110px` → `156px`.
- Each link is a row: `min-height: 58px` → `70px`, `border-top: 1px solid --line`, padding `12px 34px 12px 46px` on desktop, `transition: .3s ease-in-out`, hover bg `--hover`.
  - Title: Black 900, 18 → 32px, lowercase.
  - Optional tiny status line under it (12–14px, `--text-muted`), e.g. "продаж помешкань відкрито".
  - Right side: small corner-arrow icon (↳ style), 16 → 24px.
- Bottom of panel: social links (instagram / facebook / whats app / telegram) as text, 13–14px.

### Hero
- Full-bleed video/image, height **667px → 760px → 895px**, `background-size: cover`.
- A small dark pill over the video ("включити звук" / "turn on sound"): Bold 18px, `--sand` text on a dark translucent pill.

### Text + image editorial block
- Big lowercase heading top-left. Below it, uppercase Black 24px statement lines at the bottom of the column. A tall portrait photo on the right (grid `8/13`, `object-fit: cover; object-position: top`), with a people slideshow (keen-slider).
- Zig-zag rows of a photo (≈340×220) plus a short Bold 20px paragraph, alternating left/right with negative margins so blocks overlap vertically.
- **Image hover:** `transition: .2s–.5s ease-in-out; transform: scale(2)` with a set `transform-origin`. Images zoom a lot on hover (desktop only).
- Inline links: underlined, same color as text.

### Ghost link list (big centered nav)
- Centered stack of huge words (Black 80px, `--sand`). On hover the word turns `--ink` and a preview image fades in next to it (`opacity 0 → 1, .3s ease-in-out`), positioned absolutely around the word.

### Buttons
| Variant | Spec |
|---|---|
| **Primary dark pill** (form submit, phone CTA) | bg `--ink`, text `--bg`, Bold, height **56 → 60 → 70px**, `border-radius: 40px`, full width in form. Can end with a small emoji/icon (e.g. 😉) |
| **Phone button** | bg `--ink`, text `--bg`, Black 900, height 48 → 60 → 72px, radius `8px` mobile → `40px` desktop, phone icon on the left (with a "ringing" rotate keyframe) |
| **Accent pill** | bg `--accent` `#984535`, text `--bg`, Medium 14 → 16px, height 48 → 56px, padding `15px 20px` → `18px 20px`, `border-radius: 36px` |
| **Circle icon button** | 48×48, `border-radius: 24px`, bg `--ink` |
| **Chevron circle** (accordion) | 32 → 40 → 48px circle, bg `--ink`, light chevron 11 → 16px; rotates 180° (`rotateX`) when open, `transition: .3s` |

There are no outline or ghost buttons. Every button is a solid dark or accent pill.

### Form inputs
- **Pill input:** bg `#FFFFFF`, `1px solid --line-input`, `border-radius: 30px` → `40px`, height **56px → 74px**, padding `24px 40px`, Bold 16 → 18px, text `--ink`. Placeholder color `--sand-dark` `#AEA488`. Margin-bottom 20px.
- **Textarea:** same style, taller (~150px), `resize: none`.
- **Alt flat input:** bg `--surface-3` `#E6DFCF`, no border, no radius, height 56px, padding 24px, Medium 18px.
- Required fields are marked with `*` in the placeholder ("Ваше ім'я*", "Телефон*", "Email*").
- **Success state:** replaces the form with "Надіслано!" plus a playful subline ("Наш менеджер уже летить до вас"), an animated GIF, and a secondary dark pill button "Заповнити ще разок" (fill it in again).

### Social icons
- Round glyph icons, 32–40px, fill `--ink`, hover `--accent`. Row spacing about 16px.
- Set: Facebook, Instagram, Telegram, WhatsApp, Viber.

### Accordion (FAQ / project points)
- Row: `border-bottom: 1px` (`2px` on ≥768) `solid --sand` or `--line`, padding `20px 0` → `32px 0`.
- Title row: flex, space-between. Title Bold 20 → 32px, with a chevron circle on the right.
- Content: `overflow: hidden; transition: .3s`. Numbered points (number column 23px wide) in Medium 16 → 24px.
- Active row: text color `--accent`.
- Alternate style (`mp-acc`): hover bg `--bg`, title padding `16px 12px` → `24px`.

### Cards
- **Flip card:** height 194 → 240px, `border-radius: 16px`, front shows a photo, back is `--card` `#FFFEF8` with centered text (title Black 20–24px, body Medium 14–18px), padding `20px 40px`.
- **Feature card ("zruch"):** bg `--bg` on a `--surface-2` section, `border-radius: 48px`, size 320×416 → 400×520, padding `64px 48px` → `80px 46px`. It holds a centered line illustration (height 134–168px), a Black uppercase title (20–24px, -0.4px), and a centered Bold text line. Used in horizontal scroll rows (`margin-right: 28px`).
- **Image card with tilt:** an image frame on `--surface-2` with `transform: rotate(1deg)`.

### Info rows (key–value list)
- Flex, space-between, height 60 → 88px, `border-bottom: 1px solid --line-warm`, Black 900, 20px on desktop, max-width 590px.

### Sliders
- keen-slider. Full-width image slides: 373 → 420 → 508px tall (projects) and 460 → 520 → 696px (people). No visible chrome; arrows (if any) are dark circles.

### Floating mascot / phone button
- Fixed `bottom: 20–30px; right: 10–50px; z-index: 5`. A glossy black 3D "face" mascot with a phone icon. The phone icon wiggles with a rotate keyframe (`0 → -30deg`, repeated 3 times over 0.7s).

### Footer
- A thin top hairline (`1px solid --ink`), padding `20px`.
- "ⓒ Всі права захищено, 2025" in Medium 16px. That's the whole footer: no columns, no big link list.

---

## 6. Motion

| Thing | Spec |
|---|---|
| Menu row hover | `background-color .3s ease-in-out` |
| Image hover zoom | `transform: scale(2)`, `.2s`–`.5s ease-in-out`, `transform-origin` set per image (top center / bottom left / center right) |
| Ghost-link preview image | `opacity .3s ease-in-out` |
| Accordion | `.3s` height + chevron `rotateX(180deg)` |
| Generic | `.transition-1 { transition: .5s ease }` |
| Phone icon | `@keyframes phone-toggle` rotating 0 / -30deg, 0.7s |
| Place cards (desktop) | Text fades from transparent to `--ink` on hover, `.6s ease-in-out` |

Motion is short and eased. The site has no parallax and no scroll-jacking.

---

## 7. Imagery & iconography

- **Photography:** warm, natural light, real people (team portraits, interviews), architectural models, and building details. Photos are rectangular with **no rounded corners** in editorial blocks; only cards are rounded.
- `object-fit: cover`, portraits use `object-position: top`.
- Icons are simple, solid, monochrome (`--ink`). Arrows are thin corner arrows (↳).
- Illustrations (in cards) are single-color line drawings filled with `--ink`.

---

## 8. Copy & voice

- Ukrainian, lowercase headings, warm and conversational. Examples:
  - "хто ми" (who we are)
  - "давайте знайомитися" (let's get acquainted)
  - "Звʼяжіться зі мною 😉" (contact me)
  - "Надіслано! Наш менеджер уже летить до вас" (Sent! Our manager is already flying to you)
  - "Заповнити ще разок" (fill it in again)
- Status lines are short: "продаж помешкань відкрито" (apartment sales open).
- Uppercase is used for manifesto-like statements, not for headings.

---

## 9. Quick checklist for recreating it

1. Body `background: #EFEBDF; color: #201F25; font-family: Work Sans`.
2. Fixed transparent header: black logo on the left, dark pill burger on the right.
3. Off-canvas right menu (50% width) with bordered rows and large Black lowercase links.
4. Huge lowercase Bold display headings (up to 140px, line-height about 0.85).
5. Small uppercase Black statement text for emphasis.
6. Dark pill buttons (`#201F25`, radius 40px, tall: 56 to 70px), and a terracotta `#984535` pill for the accent CTA.
7. White pill inputs with sand placeholders (`#AEA488`).
8. Hairline beige borders (`#D6D3C9`) instead of shadows.
9. Asymmetric 12-column layout, max-width 1300px, side padding 20 to 70px, vertical rhythm 80 to 140px.
10. Subtle hover motion: image zoom, color fades, 0.3s eases.
