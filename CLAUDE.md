# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Product spec: [SPEC.md](SPEC.md)** (flow, copy, data, deploy). **Visual design: [DESIGN.md](DESIGN.md).** Read both before changing UI or data.

## Commands

- `npm run dev`: Vite dev server
- `npm run build`: `tsc -b` + Vite build (also generates the service worker)
- `npm test`: Vitest single run. For one file: `npx vitest run src/submissions/sync.test.ts`. For one test by name: `npx vitest run -t "keeps unsent"`
- `npm run lint` / `npm run typecheck`
- `npm run deploy`: test + build + push `dist/` to the `gh-pages` branch (the live site). Uses local `.env` for `VITE_SUBMIT_*`

## Node version constraint

The machine runs Node 20.10. The toolchain is pinned to versions that support it: Vite 6, `jsdom@25`, `@testing-library/jest-dom@6`. Newer create-vite, Vite 7+, jsdom 26+ and jest-dom 7 need Node ≥20.19 or 22. Don't bump these unless Node is upgraded first.

## Architecture

A kiosk-style static SPA (React 19 + TS + Tailwind v4) for iPads, served from GitHub Pages under `base: '/btl-questioner/'`. There's no backend in the repo apart from the Apps Script receiver.

- **Flow**: `src/App.tsx` is a `useReducer` state machine: intro → question × N (pick → feedback → «Далі») → result + form → thanks. `useIdleReset` returns to the intro after `VITE_IDLE_RESET_SECONDS` (60 s on thanks).
- **Public assets**: always reference files in `public/` through `asset()` (`src/lib/asset.ts`) so the base path is applied. CSS `url(/fonts/…)` and `index.html` links get the base from Vite automatically.
- **Intro** (`IntroScreen.tsx`) recreates `design/intro-mockup.svg` with absolute positions in `cqw` derived from the mockup's coordinates; see the comment there before nudging anything. `logo-stacked.svg` and `badge-star.svg`/`badge-text.svg` were extracted from that mockup (the two badge layers share a viewBox; only the star spins). Holding the badge for 5 s opens the hidden `StaffOverlay` (unsent count).
- **Theme**: DESIGN.md tokens live in `@theme` in `src/index.css` (`bg-bg`, `text-ink`, `bg-accent`, …). Big headings are uppercase. `landscape:`/`portrait:` variants switch the two-column `Split` layout.
- **Quiz content**: `src/quiz/questions.ts`. Don't use "№" (the font has no glyph; a test checks).
- **Submission pipeline** (`src/submissions/`): every submission is written to the localStorage queue (`queue.ts`) first, then `flushQueue` (`sync.ts`) sends items oldest-first and removes each one only after the server returns `{ok: true}`. It stops at the first failure. `startSync` retries on load, on the `online` event and every 60s. The client generates submission ids and the Apps Script dedups on them, so retries are safe.
- **Receiver**: `apps-script/Code.gs` is deployed manually to Google Apps Script and is not part of the build. The client POSTs a JSON string *without* setting Content-Type, so the request goes out as text/plain. That avoids a CORS preflight, which Apps Script can't handle. Keep it that way. Changing columns requires updating `HEADERS`, `ID_COLUMN` and `appendRow`, and the script has to be redeployed as a new version.
- **Offline**: `vite-plugin-pwa` (generateSW, autoUpdate) precaches the build, including fonts and images. The service worker is registered in `src/main.tsx`.
- **Deploy**: currently `npm run deploy` → `gh-pages` branch. The GitHub account is billing-locked, so Actions don't run and `.github/workflows/deploy.yml` is manual-only (see its header for how to restore it).

`VITE_SUBMIT_TOKEN` ends up in the client bundle. It only keeps out casual spam and is not a secret.
