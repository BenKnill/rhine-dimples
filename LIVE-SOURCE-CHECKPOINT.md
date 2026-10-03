# Rhine live presentation: source recovery checkpoint

Open `docs/live.html` using any local HTTP server. The page reuses the existing `docs/figs.js` and includes six beats, concise narration, pressure and circulation controls, ring/arch geometry, a fixed-depression optical illustration, and a five-minute rehearsal. Keyboard: arrows, 1–6, Space, N, R, F.

## Why this branch exists

Boxer's isolated full checkpoint is `330c237857b307408cd3b54538299aa84033ce87`, branch `codex/oliver-live-oct3`, under `/Users/boxer/Documents/Codex/2026-10-02/task-4/rhine-dimples`. Its Git push did not complete before repeated host disconnects. This source-only branch was reconstructed through the existing GitHub connector from the source authored in this session; it is **not byte-identical to that local commit**. Styles and narration are inlined; missing footage is explicitly identified; the optical panel uses a fixed displacement field to bend the moving reflected pattern. It has not received a fresh browser QA run.

## Missing binary media

Copy these three existing local files into `docs/live-media/`:

- `rhine-open.mp4` (2,104,102 bytes)
- `rhine-close.mp4` (5,016,654 bytes)
- `rhine-poster.jpg` (352,983 bytes)

Exact local source folder: `/Users/boxer/Documents/Codex/2026-10-02/task-4/rhine-dimples/docs/live-media/`.

The MP4s were compressed from Ben's own boat footage on 1 June 2026, at normal 30fps playback, without interpolation. Originals remain in `/Users/boxer/ben-advice/rhine-dimples/assets/film/clip1` (157 frames) and `clip2` (302 frames). Poster source: `clip1hd/040.jpg`. Rebuild using:

```sh
ffmpeg -framerate 30 -i assets/film/clip1/%03d.jpg -vf scale=960:-2 -c:v libx264 -crf 24 -pix_fmt yuv420p -movflags +faststart docs/live-media/rhine-open.mp4
ffmpeg -framerate 30 -i assets/film/clip2/%03d.jpg -vf scale=960:-2 -c:v libx264 -crf 24 -pix_fmt yuv420p -movflags +faststart docs/live-media/rhine-close.mp4
```

When media is absent, the page shows an explicit transfer notice, not synthetic river footage.

## Other durable presentation lanes

- BenKnill/symplectic-camel: `codex/oliver-live-oct3`, checkpoint `ac910de`; entry `docs/index.html?present=1`.
- BenKnill/lattice-echo: `codex/oliver-live-oct3`, checkpoint `2e971c6`; entry `docs/live.html`.

Serve sibling checkouts from their common parent to use the cross-episode relative links.

## Evidence and pending checks

The local full Rhine version's opening was visually inspected via the in-app browser. An automated Chrome run saved `evidence/rhine-{1..6}.png` and `evidence/lattice-{home,scrambled,returned}.png` under Boxer task-4. Reaching the latter screenshot means the harness's 8×8 uniqueness/inverse and 100-step 256×256 exact round-trip assertions passed. The harness had not returned final success: Camel and mobile checks remain unconfirmed. No new formal proof replay occurred. The recovered version here requires separate browser verification.

Preserved editorial boundaries: no low-flow detour; real-footage bookends when transferred; 2023 simulated regional counts separate from 2026 tank coverage by dimples/scars; real 3D downwelling separate from ideal 2D area preservation; models labelled as illustrations, not reconstruction or field measurement. No publishing, deployment, paid external service or message to Oliver occurred.
