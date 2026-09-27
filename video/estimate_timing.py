"""Estimate timing{TAG}.json/js for a script whose new lines have no voice clips yet (an animatic timeline).

Lines already recorded keep their measured clip lengths (looked up by their `say` text in an earlier timing file);
new lines get words / 2.5 per second + 0.35 s. Gaps and pads follow assemble.py exactly.
"""
import json, os
from pathlib import Path
HERE = Path(__file__).resolve().parent
SCRIPT = os.environ.get('SCRIPT', 'script5.json'); TAG = os.environ.get('TAG', '5'); FROM = os.environ.get('FROM', 'timing4.json')
script = json.loads((HERE / SCRIPT).read_text())
known = {l['say']: l['end'] + 0.1 - (l['start'] - 0.06) for l in json.loads((HERE / FROM).read_text())['lines']}
GAP = {'clause': 0.2, 'sentence': 0.55, 'paragraph': 0.8}
t, idx, beats, lines, new = 0.0, 0, {}, [], 0
for b in script['beats']:
    t += b.get('pad_before', 0.3); bstart = t - b.get('pad_before', 0.3); blines = []
    for k, l in enumerate(b['lines']):
        d = known.get(l['say'])
        if d is None: d = len(l['say'].split()) / 2.5 + 0.35; new += 1
        rec = dict(index=idx, beat=b['id'], show=l['show'], say=l['say'], start=round(t + 0.06, 3), end=round(t + d - 0.1, 3), estimated=l['say'] not in known)
        t += d; blines.append(rec); lines.append(rec); idx += 1
        if k < len(b['lines']) - 1: t += GAP[l['b']] + l.get('hold', 0)
    t += b.get('pad_after', 0.8)
    beats[b['id']] = dict(start=round(bstart, 3), end=round(t, 3), lines=blines)
timing = dict(duration=round(t, 3), beats=beats, lines=lines, estimated=True)
(HERE / f'timing{TAG}.json').write_text(json.dumps(timing, indent=1, ensure_ascii=False))
(HERE / f'timing{TAG}.js').write_text('window.TIMING = ' + json.dumps(timing, ensure_ascii=False) + ';\n')
print(f'timing{TAG}: {t:.1f}s ({int(t // 60)}:{t % 60:04.1f}), {idx} lines, {new} without audio')
