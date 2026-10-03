#!/usr/bin/env python3
"""Assemble an offline rehearsal kit from three sibling source checkouts.
No network calls, deployments, or modification of the source checkouts.
"""
import argparse, hashlib, json, re, shutil, zipfile
from pathlib import Path

REPOS = ('symplectic-camel', 'lattice-echo', 'rhine-dimples')
HERE = Path(__file__).resolve().parent
p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--sources', type=Path, default=HERE.parents[1], help='Directory containing the three sibling repositories')
p.add_argument('--output', type=Path, required=True, help='New output directory; must not already exist')
p.add_argument('--revision', action='append', default=[], metavar='REPO=SHA', help='Verified reviewed source revision, repeat per repository')
a = p.parse_args(); out = a.output.resolve(); sources = a.sources.resolve()
if out.exists(): p.error('Output already exists; choose a fresh directory to preserve prior builds')
for name in REPOS:
    if not (sources/name/'docs').is_dir(): p.error(f'Missing source docs: {sources/name/"docs"}')
if not (sources/'symplectic-camel/docs/vendor/three-r128.min.js').is_file(): p.error('Pinned Three.js is missing; this would not be an offline kit')
revisions={}
for arg in a.revision:
    name,sep,sha=arg.partition('=')
    if not sep or name not in REPOS or not re.fullmatch(r'[0-9a-f]{40}',sha): p.error(f'Invalid revision: {arg}')
    revisions[name]=sha
out.mkdir(parents=True)
for name in REPOS:
    target=out/name
    shutil.copytree(sources/name/'docs', target/'docs')
    for name_file in ('README.md','LIVE-SOURCE-CHECKPOINT.md'):
        if (sources/name/name_file).is_file(): shutil.copy2(sources/name/name_file,target/name_file)
    for dirname in ('tests',):
        if (sources/name/dirname).is_dir(): shutil.copytree(sources/name/dirname,target/dirname)
    if name == 'rhine-dimples':
        (target/'proto').mkdir(exist_ok=True)
        for script in ('live-check.mjs','model-assert.mjs'):
            if (sources/name/'proto'/script).is_file(): shutil.copy2(sources/name/'proto'/script,target/'proto'/script)
    for f in (target/'docs').rglob('*.html'):
        html=f.read_text()
        # System font fallbacks keep the kit offline. Research links are preserved.
        html=re.sub(r'<link\b[^>]*https://fonts\.(?:googleapis|gstatic)\.com[^>]*>\s*','',html,flags=re.I)
        f.write_text(html)
for name in ('index.html','cue-sheet.html'): shutil.copy2(HERE/name,out/name)
if (HERE/'QA-REPORT.txt').is_file(): shutil.copy2(HERE/'QA-REPORT.txt',out/'QA-REPORT.txt')
media_present=all((sources/'rhine-dimples/docs/live-media'/f).is_file() for f in ('rhine-open.mp4','rhine-close.mp4','rhine-poster.jpg'))
if media_present:
    launcher=out/'index.html';launcher.write_text(launcher.read_text().replace('The Rhine edition labels its rendered illustration; local field footage is not included.','The Rhine edition includes the transferred field footage; its rendered illustrations remain labelled.'))
(out/'START-HERE.txt').write_text('Open index.html in a modern browser. If local-file restrictions affect your browser, run:\n\n  python3 -m http.server 8000 --directory .\n\nfrom this folder, then open http://localhost:8000/ in that same computer.\n\nThe kit needs no CDN. External research links require internet. Rhine field-footage availability is recorded in source-manifest.json. Source-manifest.json records source revisions and hashes.\n')
manifest={'title':'Three live explanations','source_revisions':revisions,'upstream_bases':{'symplectic-camel':'ac910deafd1a4c3da58ea961c78323f1126b7ea3','lattice-echo':'2e971c6b9051007285adaed4db9818f122a50564','rhine-dimples':'f82219640c52d1515af13f8c3ccd7b33d4b45418'},'field_footage_included':media_present,'limits':['No new HOL proof replay or native-kernel comparison is claimed',*(['Rhine field footage is not included'] if not media_present else []),'Browser verification status is recorded in the accompanying QA report'],'files':{str(f.relative_to(out)):hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(out.rglob('*')) if f.is_file()}}
(out/'source-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
archive=out.with_suffix('.zip')
if archive.exists(): p.error('Archive path already exists; directory is preserved but ZIP was not overwritten')
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
    for f in sorted(out.rglob('*')):
        if f.is_file():z.write(f,Path(out.name)/f.relative_to(out))
print(json.dumps({'directory':str(out),'archive':str(archive),'files':len(manifest['files'])+1,'bytes':archive.stat().st_size},indent=2))
