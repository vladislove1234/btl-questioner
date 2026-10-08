# Рієлторський тест — «Будинки та люди»

A quiz for realtors that runs on iPads at events. Participants answer 8 questions, see their score, leave their contacts, and get a QR code to the realtor community on Telegram. Each submission becomes a row in a Google Sheet. The app works offline: submissions wait on the iPad and are sent once the connection is back.

- What it does, all copy, and the data format: [SPEC.md](SPEC.md)
- Visual style: [DESIGN.md](DESIGN.md)

## Development

```bash
npm install
cp .env.example .env   # optional locally; production values are GitHub secrets
npm run dev            # http://localhost:5173/btl-questioner/
npm test
```

Questions live in [src/quiz/questions.ts](src/quiz/questions.ts). Push to `main` to publish.

## Google Sheet setup (once)

1. Create a Google Sheet → **Extensions → Apps Script** → paste [apps-script/Code.gs](apps-script/Code.gs).
2. **Project Settings → Script Properties** → add `SUBMIT_TOKEN` with any random string.
3. **Deploy → New deployment → Web app**. Set Execute as: *Me* and Who has access: *Anyone*. Copy the `/exec` URL.
4. In the GitHub repo, go to **Settings → Secrets and variables → Actions** and add:
   - `VITE_SUBMIT_URL`: the `/exec` URL
   - `VITE_SUBMIT_TOKEN`: the same string as `SUBMIT_TOKEN`
5. **Actions → Deploy to GitHub Pages → Run workflow** to rebuild with the secrets.

The sheet `Submissions` is created on the first submission, with the columns Час, Імʼя та прізвище, Телефон, Компанія, Результат and a hidden `id`.

## iPad setup

1. While online, open the site in Safari, then **Share → Add to Home Screen**.
2. Launch it from the Home Screen once while online, so it's saved for offline use.
3. Lock the rotation in landscape.
4. Turn on **Settings → Accessibility → Guided Access**. Start it in the app with a triple-click, which blocks leaving the app.

**Staff check:** on the Intro, press and hold the blue badge for 5 seconds to see how many submissions on this iPad haven't been sent yet.
