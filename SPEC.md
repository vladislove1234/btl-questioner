# SPEC — Рієлторський тест «Будинки та люди»

A quiz for realtors that runs on iPads at events. A participant takes a short multiple-choice test, sees their score, leaves contact details, and is invited to join the realtor community by QR code. Contact details go to a Google Sheet.

Visual design follows [DESIGN.md](DESIGN.md). This spec defines behavior, copy and data. Where it gives a layout, that layout overrides DESIGN.md.

---

## 1. Platform and constraints

- **Device:** iPad only, mounted in **landscape**. Design for 1180×820 pt (11" iPad) first.
- **Responsive:** the layout still adapts to any viewport, including portrait: two-column screens stack vertically and nothing breaks. There's no "rotate your device" message. Orientation is locked on the device, not in the app.
- **Language:** all UI text is Ukrainian (§5). Big display headings are **UPPERCASE**, matching the supplied Intro mockup. Buttons, labels and body text keep the casing given in §5.
- **Colours:** DESIGN.md tokens, except the page background is **`#EEECE4`** (the colour used in the supplied artwork). The badge blue `#4B759D` appears only in the badge.
- **Runs as:** a PWA added to the iPad Home Screen, with Guided Access turned on. It must work fully **offline** once loaded (§6.2).
- **No extra info for participants:** nothing technical is shown on screen (sync status, device names, debug badges). The only staff tool is hidden (§6.4).
- **Kiosk behavior:** no text selection, no pull-to-refresh, no pinch zoom, and no "Назад" button anywhere.

## 2. Assets

The user supplies these files. Code references these exact paths.

| File | Content |
|---|---|
| `public/fonts/WorkSans-Regular.(woff2\|ttf)` | Work Sans 400, Cyrillic build |
| `public/fonts/WorkSans-Medium.*` | 500 |
| `public/fonts/WorkSans-Bold.*` | 700 |
| `public/fonts/WorkSans-Black.*` | 900 |
| `public/images/logo.svg` | Stacked logo from `design/logo-stacked-source.svg` (background removed, cropped), used top-left on every screen after the Intro |
| `public/images/logo-stacked.svg` | Stacked logo, extracted from the Intro mockup |
| `public/images/badge-star.svg`, `badge-text.svg` | "100% ~~комісії~~ виграш" badge, extracted from the Intro mockup as two layers with one shared viewBox (the star rotates, the lettering stays still) |
| `public/images/qr.png` | QR code → `https://t.me/+GtcbVmhgpMk4ZjJi` (permanent invite link), transparent background |
| `design/intro-mockup.svg` | The supplied Intro design. Reference only, not published |
| `design/logo-*-source.svg` | Original supplied logo files (stacked, horizontal). Not published |
| `design/*.pdf` | Original supplied files. Not published |

Fonts are self-hosted with one `font-family: "Work Sans"` and real weights (DESIGN.md §3). They're the Ivan Tsanko Cyrillic build (OFL): Medium supplied by the user, the other weights taken from budynkytaliudy.com, where the Medium file is byte-identical. Google Fonts' Work Sans has no Cyrillic, so it isn't used. The fonts lack "№", so question text must avoid it (a test enforces this). All assets are precached by the service worker.

## 3. Flow

```
Intro ──tap──▶ Question 1 … N ──▶ Result + Form ──submit──▶ Thanks ──▶ Intro
  ▲                 │                   │                    │
  └──── 90 s idle ──┴──── 90 s idle ────┘     60 s or button ┘
```

- The Intro is the resting state and is always on screen between participants.
- **Idle reset:** on Question and Result + Form screens, 90 s without a touch returns to the Intro and discards the session. Nothing is submitted. On Thanks it's 60 s, or immediately with the button. The 90 s value comes from `VITE_IDLE_RESET_SECONDS`.
- No back navigation. Answers are final.

## 4. Screens

### 4.1 Intro

- **Recreated in code from `design/intro-mockup.svg`**: real text plus the extracted logo and badge SVGs, positioned with the mockup's own coordinates in container units so the composition scales as one piece in any orientation.
- Content: **«РІЄЛТОРСЬКИЙ / ТЕСТ»** (Work Sans Bold, uppercase), small **«від»**, the stacked logo, the badge overlapping the logo's bottom-right (its star slowly rotates, one turn per 20 s, while the lettering stays upright), and the small line **«натисніть, щоб почати»** (Medium) below. There's no pill button. The badge is decoration only, with no prize logic.
- **A tap anywhere on the screen** starts the test.
- Exception: **pressing and holding the badge for 5 s** opens the staff check (§6.4) and does *not* start the test.

### 4.2 Question (one screen per question)

- Shows a progress line **«Питання 3 з 8»** and a thin progress bar, then the question text, then the options.
- The stacked logo (64px tall) sits top-left on this and every following screen.
- Landscape: progress and question text on the left, options stacked vertically on the right. Portrait: everything in one column.
- Options are large tap targets (pill shape, min height 70px, white bg, `--line-input` border, Bold text). Exactly one option is correct.
- **After a tap:**
  1. All options lock.
  2. If the answer is correct, the chosen option turns **`--ink` bg, `--bg` text, ✓**, and the line **«Так!»** appears.
  3. If it's wrong, the chosen option turns **`--accent` bg, `--bg` text, ✗**, the correct option turns **`--ink` with ✓**, and **«Не правильно»** appears (two words, as requested).
  4. The other options dim.
  5. The **«Далі»** pill appears and moves to the next question, or to Result + Form after the last one. There's no auto-advance.
- There's no explanation text.
- Questions and options appear in a fixed order with no shuffling. The expected size is 5–10 questions with 3–4 options each.

### 4.3 Result + Form (one screen)

- Landscape: the score is on the left and the form on the right. Portrait: the score is on top and the form below.
- Score: large display **«7 з 8»** with **«правильних відповідей»** under it. Every score gets the same text, with no tiers.
- Form fields, each with its text as a label above a pill input (DESIGN.md §5 Form inputs):

| Label | Rule |
|---|---|
| **Ваше імʼя та прізвище** | required, trimmed, not empty |
| **Ваш номер телефону** | required; `+380` always shown in black as a fixed prefix; the field takes the 9 national digits (`XX XXX XX XX`, numeric keypad); a leading `0` is accepted and dropped, and a pasted `+380…` number works; stored as `+380 XX XXX XX XX` |
| **В якій компанії працюєте?** | required, trimmed, not empty |

- Submit button: **«Надіслати 😉»** (primary dark pill). It's disabled until all three fields are valid.
- Under the button, a small muted line: **«Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних»**. There is no checkbox.
- Submitting never waits for the network. The entry is queued locally (§6.2) and the Thanks screen opens immediately.

### 4.4 Thanks

- Display heading **«ДЯКУЄМО, ЩО ПОЗНАЙОМИЛИСЯ З НАМИ ЩЕ КРАЩЕ!»**
- Text **«Залишився останній крок: долучайтеся до нашої спільноти рієлторів»**
- The **QR image** (`public/images/qr.png`), up to 420px, on the right in landscape and below the text in portrait.
- Text **«Тут ми будемо ділитися найновішою інформацією й анонсувати нові проєкти 🫶🏼»**, in the same style as the text above it
- Pill button **«На початок»**, which goes back to the Intro. The screen also returns there by itself after 60 s.

## 5. Copy (all user-facing strings)

| Where | Text |
|---|---|
| Intro heading | РІЄЛТОРСЬКИЙ ТЕСТ від |
| Intro hint | натисніть, щоб почати |
| Progress | Питання {n} з {total} |
| Correct | Так! |
| Wrong | Не правильно |
| Next | Далі |
| Score | {correct} з {total} |
| Score caption | правильних відповідей |
| Field 1 | Ваше імʼя та прізвище |
| Field 2 | Ваш номер телефону |
| Field 3 | В якій компанії працюєте? |
| Submit | Надіслати 😉 |
| Consent | Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних |
| Thanks heading | ДЯКУЄМО, ЩО ПОЗНАЙОМИЛИСЯ З НАМИ ЩЕ КРАЩЕ! |
| Thanks text 1 | Залишився останній крок: долучайтеся до нашої спільноти рієлторів |
| Thanks text 2 | Тут ми будемо ділитися найновішою інформацією й анонсувати нові проєкти 🫶🏼 |
| Thanks button | На початок |
| Staff check | у черзі: {n} |
| Staff close | Закрити |

The question content (questions, options, correct answers) is supplied by the user and kept in `src/quiz/questions.ts`. Any change requires a redeploy.

## 6. Data

### 6.1 Google Sheet

Each submission adds one row to sheet `Submissions`:

| Час | Імʼя та прізвище | Телефон | Компанія | Результат | id |
|---|---|---|---|---|---|
| 2026-10-08 14:32 | Олена Петренко | +380 67 123 45 67 | АН «Дім» | 7 з 8 | 3f2a… |

- **Час** is the moment of submission on the iPad, formatted `yyyy-MM-dd HH:mm` in `Europe/Kyiv`. It is not the time the row arrived.
- **Результат** is the text `"{correct} з {total}"`.
- **id** is a client-generated UUID, used only to drop duplicate retries. The column is hidden in the Sheet.
- Nothing else is stored: no per-question answers, no device name, no quiz version.
- The receiver is `apps-script/Code.gs`. It checks the token, escapes values starting with `= + - @`, and dedups on `id` under a script lock.

### 6.2 Offline queue

- On submit, the entry is written to a localStorage queue first. It's removed only after the receiver replies `{ok: true}`.
- Sync runs on app start, on the `online` event, after each submit, and every 60 s. Entries are sent oldest-first, and a run stops at the first failure.
- Requests are a POST with a JSON string body and **no Content-Type header**, so they go out as text/plain and the browser doesn't send a CORS preflight, which Apps Script can't handle.

### 6.3 Configuration

`.env` / build-time variables: `VITE_SUBMIT_URL` (Apps Script `/exec` URL), `VITE_SUBMIT_TOKEN` (must match the script property `SUBMIT_TOKEN`; it keeps out casual spam and isn't a real secret), `VITE_IDLE_RESET_SECONDS` (default 90).

### 6.4 Staff check (hidden)

Pressing and holding the Intro badge for 5 s opens a small overlay showing **«у черзі: {n}»**, the number of unsent entries on this iPad, and a close control. Participants never see it otherwise.

## 7. Deployment — GitHub Pages

- Public repo **`vladislove1234/btl-questioner`**. The site is served at **`https://vladislove1234.github.io/btl-questioner/`**.
- Vite `base: '/btl-questioner/'`. The PWA manifest `start_url` and `scope` match that base.
- **Current method:** `npm run deploy` (tests → build with local `.env` → push `dist/` to the `gh-pages` branch via the `gh-pages` package). Pages source: branch `gh-pages`, `/`.
- **Why not Actions:** the account is locked for billing, so Actions jobs don't start. `.github/workflows/deploy.yml` (build + `actions/deploy-pages`, with `VITE_SUBMIT_URL`/`VITE_SUBMIT_TOKEN` from repo secrets) is kept as manual-only. Once billing is fixed, re-enable it on push to `main` and switch the Pages source to "GitHub Actions".
- **iPad setup** (README): open the URL in Safari → Share → Add to Home Screen → open from Home Screen once while online → lock rotation → turn on Guided Access.

## 8. Out of scope

Admin UI, editing questions without a deploy, explanations, randomization, score tiers, multiple languages, analytics, an email field, and per-question data in the Sheet.

## 9. Waiting on the user

- Google Sheet with `Code.gs` deployed; its `/exec` URL and the token in `.env` (`VITE_SUBMIT_URL` / `VITE_SUBMIT_TOKEN`), then `npm run deploy`
- Optional: fix the GitHub billing lock to get automatic deploys back
