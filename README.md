# Рієлторський тест — «Будинки та люди»

A quiz for realtors that runs on iPads at events. Participants answer 8 questions, see their score, leave their contacts, and get a QR code to the realtor community on Telegram. Each submission becomes a row in a Google Sheet. The app works offline: submissions wait on the iPad and are sent once the connection is back.

- What it does, all copy, and the data format: [SPEC.md](SPEC.md)
- Visual style: [DESIGN.md](DESIGN.md)

## Development

```bash
npm install
cp .env.example .env   # Sheet URL + token; used by dev and by npm run deploy
npm run dev            # http://localhost:5173/btl-questioner/
npm test
```

Questions live in [src/quiz/questions.ts](src/quiz/questions.ts).

## Publishing

```bash
npm run deploy   # tests, builds with your local .env, pushes dist/ to the gh-pages branch
```

The site is at https://vladislove1234.github.io/btl-questioner/ and updates about a minute after a deploy. The iPads pick up the new version the next time they open the app while online.

GitHub Actions can't run while the account has a billing lock, so the workflow in `.github/workflows/deploy.yml` is manual-only. Once billing is fixed it can go back to deploying on every push (see the comment in that file).

## Google Sheet setup (once)

1. Create a Google Sheet → **Extensions → Apps Script** → paste [apps-script/Code.gs](apps-script/Code.gs).
2. **Project Settings → Script Properties** → add `SUBMIT_TOKEN` with any random string.
3. **Deploy → New deployment → Web app**. Set Execute as: *Me* and Who has access: *Anyone*. Copy the `/exec` URL.
4. Put both values into `.env` (copy `.env.example`):
   - `VITE_SUBMIT_URL`: the `/exec` URL
   - `VITE_SUBMIT_TOKEN`: the same string as `SUBMIT_TOKEN`
5. Run `npm run deploy`.

The sheet `Submissions` is created on the first submission, with the columns Час, Імʼя та прізвище, Телефон, Компанія, Результат and a hidden `id`.

## iPad setup

1. While online, open the site in Safari, then **Share → Add to Home Screen**.
2. Launch it from the Home Screen once while online, so it's saved for offline use.
3. Lock the rotation in landscape.
4. Turn on **Settings → Accessibility → Guided Access**. Start it in the app with a triple-click, which blocks leaving the app.

**Staff check:** on the Intro, press and hold the blue badge for 5 seconds to see how many submissions on this iPad haven't been sent yet.
