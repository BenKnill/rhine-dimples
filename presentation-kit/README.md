# Three live explanations

An offline launcher and short cue sheet for the three existing browser presentations. Nothing here deploys a website.

Keep `symplectic-camel`, `lattice-echo` and `rhine-dimples` as sibling source checkouts. Use the reviewed branches recorded in the delivered source manifest.

From any directory:

```sh
python3 /path/to/rhine-dimples/presentation-kit/assemble.py \
  --sources /path/to/sibling-repositories \
  --output /path/to/new/oliver-live-kit
```

Optionally add `--revision REPO=FULL_COMMIT_SHA` once for each verified source revision. The output must be new: prior builds are not overwritten. The command creates the directory and a ZIP beside it, copies the actual presentation source and test files, removes optional web-font requests in the copy, and includes a SHA-256 manifest. It needs no network and leaves the repositories unchanged.

Open the generated `index.html`. If the browser restricts local files, serve the generated directory on that same computer with `python3 -m http.server 8000 --directory /path/to/oliver-live-kit` and open `http://localhost:8000/`.

Three.js r128 and its MIT notice are included in the Camel source. The source-safe Rhine edition deliberately labels a rendered illustration because the field-footage files are not in the recovered branch. External research references still require internet.

The individual repositories contain focused numerical and controller regressions. A minimal DOM test is not a browser rendering check. Review the accompanying QA report for exactly what was checked.

## Local-file compatibility

The generated pages use classic scripts, embedded image data and generated GPU textures. No ES modules, application fetch/XHR, workers, server API or CDN is needed. All internal navigation names an HTML file explicitly; cross-episode links stay inside the kit. Hash-history bookkeeping is optional in restrictive local-file viewers.

Run `python3 check-offline.py` from the extracted kit for a repeatable static dependency/link audit. This does not prove actual file-origin behavior in a browser. File opening, final WebGL rendering and media playback still need a browser pass; START-HERE.txt gives a same-computer server alternative if local-file policy prevents loading.
