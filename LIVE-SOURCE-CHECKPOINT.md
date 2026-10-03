# Rhine live presentation: current offline-kit checkpoint

## Recovered footage and current presentation (3 October 2026)

The coordinator recovered the original Mac-derived `rhine-open.mp4`, `rhine-close.mp4`, and `rhine-poster.jpg` into `/home/bluestar/lanes/presentations/from-mac/live-media/`. All source checksums and the ignored local copies under `docs/live-media/` were verified; both videos passed a complete local ffmpeg decode. [FOOTAGE-MANIFEST.json](FOOTAGE-MANIFEST.json) records the exact source paths, sizes, hashes and provenance. The lane evidence is in `../out/rhine-footage/recovery.json` and `RECOVERY.md`, including the bounded storage/GitHub search's negative findings before the coordinator's recovery. No large source frames or private footage are committed or published.

The live presentation now has compact predict → intervene → reveal → establish text in all six scenes. Conclusions remain hidden until “Reveal the consequence” is pressed. The recovered normal-speed field clips bookend the presentation. “Compare with illustration” switches the opening to a clearly labelled ideal smooth-core model; the model is never narrated as original observation. Missing-media fallback wording retains that distinction.

[docs/live-guide.html](docs/live-guide.html) contains one-page speaker notes. Navigation, numerical/controller fixes, frozen circulation versus Kelvin conservation, the 3D/2D distinction, and the different research observables are preserved. The local controller and model checks are `node proto/live-check.mjs` and `node proto/model-assert.mjs`; their run evidence is in `../out/rhine-footage/`. Actual extracted-kit browser and rehearsal evidence is maintained in the lane's QA report. The historical notes below describe earlier checkpoints; their missing-media and unverified-browser statements are historical, not the current kit's status.

The committed offline-kit builder lives in the sibling `symplectic-camel/presentation-kit/` repo. It includes the locally recovered media in the private output archive while excluding it from public Git history. Rebuilding the media-bearing kit requires those local recovered assets and matching hashes.

---

# Historical source recovery checkpoint

Open `docs/live.html` using any local HTTP server. The page reuses the existing `docs/figs.js` and includes six beats, concise narration, pressure and circulation controls, ring/arch geometry, a fixed-depression optical illustration, and a five-minute rehearsal. Keyboard: arrows, 1–6, Space, N, R, F.

## Why this branch exists

Boxer's isolated full checkpoint is `330c237857b307408cd3b54538299aa84033ce87`, branch `codex/oliver-live-oct3`, under `/Users/boxer/Documents/Codex/2026-10-02/task-4/rhine-dimples`. Its Git push did not complete before repeated host disconnects. This source-only branch was reconstructed through the existing GitHub connector from the source authored in this session; it is **not byte-identical to that local commit**. The initial recovery inlined styles and narration; the cloud review now separates them into `live.css`, `live-story.js`, and `live.js`. Missing footage is explicitly identified; the optical panel uses a fixed displacement field to bend the moving reflected pattern. It has not received a fresh browser QA run.

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

When media is absent, the opening is a prominently labelled rendered illustration using the existing `water.js`/`vortex.js`, with a labelled 2D schematic fallback if WebGL2 is unavailable. It is never labelled as field footage. The opening and closing narration switch to source-only wording. The real clips replace the fallback after successful loading.

## Other durable presentation lanes

- BenKnill/symplectic-camel: `codex/oliver-live-oct3`, checkpoint `ac910de`; entry `docs/index.html?present=1`.
- BenKnill/lattice-echo: `codex/oliver-live-oct3`, checkpoint `2e971c6`; entry `docs/live.html`.

Serve sibling checkouts from their common parent to use the cross-episode relative links.

## Evidence and pending checks

The local full Rhine version's opening was visually inspected via the in-app browser. An automated Chrome run saved `evidence/rhine-{1..6}.png` and `evidence/lattice-{home,scrambled,returned}.png` under Boxer task-4. Reaching the latter screenshot means the harness's 8×8 uniqueness/inverse and 100-step 256×256 exact round-trip assertions passed. The harness had not returned final success: Camel and mobile checks remain unconfirmed. No new formal proof replay occurred. The recovered version here requires separate browser verification.

Preserved editorial boundaries: no low-flow detour; real-footage bookends when transferred; 2023 simulated regional counts separate from 2026 tank coverage by dimples/scars; real 3D downwelling separate from ideal 2D area preservation; models labelled as illustrations, not reconstruction or field measurement. No publishing, deployment, paid external service or message to Oliver occurred.


## Cloud review, 3 October 2026

Exact recovered base: `f82219640c52d1515af13f8c3ccd7b33d4b45418` on `codex/oliver-live-source-oct3`. The original unsent laptop checkpoint remains distinct. This review changes the recovered source; it does not claim recovery of the missing binary media.

Changes:
- Six scene controls, 300-second foreground rehearsal, keyboard navigation after button focus, slider-safe shortcuts, hash navigation, reduced-motion start, recoverable fullscreen failures, and media-error race handling
- Deterministic scene resets, seeded live tracers, correct CSS/HiDPI drag coordinates, pointer-cancellation handling, and keyboard-accessible measuring-loop sliders
- Reuse of the original figure code, with live-only responsive drawing and analytic stretching phases; the original article figure path remains supported
- Explicit frozen-field measurement versus Kelvin conservation, geometric surface-attachment limits, real 3D divergence versus optional area-preserving 2D model, and separate 2023 counts / 2026 combined dimple-and-scar area metrics
- The additional June 2026 nonlocal-divergence result is labelled as a preprint, not attributed to the laboratory experiment
- The linked original article and README now identify the exactly 2D Hamiltonian model as an idealization, not a measured explanation of Rhine vortex lifetime

Verification:
- `node proto/live-check.mjs`: 25 assertion-based checks passed, including live paths at 960 and 390 CSS pixels, original article figure paths at both sizes, deterministic resets, analytic circulation/cancellation, finite canvas commands, keyboard behavior, missing/loaded media switching, exact rehearsal timing, background pause, reduced motion, and fullscreen failures
- `node proto/model-assert.mjs`: 11 assertion-based checks passed for the delivered vortex model, including pair speed, same-sign orbit, invariants, stream-function derivatives, quadratic dip scaling and flat-model tracer area
- `node proto/check.mjs`: original diagnostic run completed; it only prints results and is not itself an assertion suite
- JavaScript syntax and `git diff --check` passed

Limits: the tests use a DOM/canvas command harness, not a browser renderer. Actual WebGL shader execution, audio/video decoding, final browser screenshots and mobile visual layout have **not** been reverified for this recovered revision. The previous laptop screenshots cover a different source revision and are not evidence of this revision’s visual QA. No new formal proof replay was performed. No deployment or paid service was used.
