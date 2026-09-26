"""Write roughcut.html: the playable rough cut, its measured runtime, and the current script (from script2.json)."""
import json, subprocess, html
from pathlib import Path
HERE = Path(__file__).resolve().parent
video = HERE / 'dimples-roughcut.mp4'
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(video)], capture_output=True, text=True).stdout)
size = video.stat().st_size / 1e6
T = json.loads((HERE / 'timing2.json').read_text())
script = json.loads((HERE / 'script2.json').read_text())
speech = sum(l['end'] - l['start'] for l in T['lines'])
words = sum(len(l['show'].split()) for b in script['beats'] for l in b['lines'])
rows = []
for b in script['beats']:
    tb = T['beats'][b['id']]
    rows.append(f"<h3>{html.escape(b['title'])} <span class='t'>{int(tb['start'] // 60)}:{int(tb['start'] % 60):02d}</span></h3><p>" +
                " ".join(html.escape(l['show']) for l in b['lines']) + "</p>")
page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Dimples on the Rhine: rough cut</title>
<style>body{{margin:0;background:#0A0D14;color:#DCE2EC;font:15px/1.55 system-ui,sans-serif;padding-inline:16px}}.w{{max-width:980px;margin:0 auto;padding-block:24px 60px}}
h1{{font-family:Georgia,serif;font-size:32px;margin:0 0 6px}}h3{{font-family:Georgia,serif;margin:22px 0 4px}}.t{{color:#5A6479;font:13px monospace}}p{{color:#C8D0DC}}.m{{color:#8A95AA}}
video{{width:100%;border:1px solid #1F2736;border-radius:8px;background:#000}}a{{color:#6FA8FF}}</style></head><body><div class="w">
<h1>Dimples on the Rhine: rough cut</h1>
<p class="m">Measured runtime <b>{int(dur // 60)}:{dur % 60:04.1f}</b> ({dur:.1f} s) · narration speech {speech / 60:.1f} min of it · {words} words · 1280×720, 30 fps · {size:.0f} MB.
Low-resolution rough cut: several shots are plain diagrams or labelled illustrations; subtitles are burned in.</p>
<video src="dimples-roughcut.mp4" controls playsinline></video>
<p class="m">Script with picture and knob notes, sources, and the copy-for-review button: <a href="script15.html">script15.html</a> · subtitles: <a href="dimples-on-the-rhine2.srt">dimples-on-the-rhine2.srt</a></p>
<h2 style="font-family:Georgia,serif">Narration as recorded</h2>{''.join(rows)}
</div></body></html>"""
(HERE / 'roughcut.html').write_text(page)
print(f'runtime {dur:.1f}s ({int(dur // 60)}:{dur % 60:04.1f}), speech {speech:.1f}s, {words} words, {size:.0f} MB')
