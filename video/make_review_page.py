"""Write review{TAG}.html: the script and a shot-by-shot storyboard in words, with one copy-for-review button.

Shots come from the film's scene cues (beat, first line) in film{TAG}.html; descriptions are in STORY below.
The physics checklist and sources are taken from make_script_page.py so the two pages never disagree.
"""
import ast, html, json, os, re
from pathlib import Path
HERE = Path(__file__).resolve().parent
TAG = os.environ.get('TAG', '6')
script = json.loads((HERE / f'script{TAG}.json').read_text())
T = json.loads((HERE / f'timing{TAG}.json').read_text())
film = (HERE / f'film{TAG}.html').read_text()
cues = sorted(((b, int(l), i) for b, l, i in re.findall(r'scene\("([a-z]+)", (\d+), \{ id: "([a-z0-9-]+)"', film)),
              key=lambda c: (list(T['beats']).index(c[0]), c[1]))
tree = ast.parse((HERE / 'make_script_page.py').read_text())
consts = {n.targets[0].id: ast.literal_eval(n.value) for n in tree.body if isinstance(n, ast.Assign) and isinstance(n.targets[0], ast.Name) and n.targets[0].id in ('SOURCES', 'BRIEF')}
PHYSICS = consts['BRIEF'].split('PHYSICS THAT MUST STAY RIGHT (flag rather than silently change)\n')[1].split('\nWHAT TO RETURN')[0].strip()

STORY = {
    'where': "Aerial zoom on swisstopo imagery (2025). Starts on the whole reach, from the Rhine Falls to Diessenhofen, with Lake Constance off to the east. It comes down to the boat's GPS point at Büsingen: a pulsing marker with an arrow pointing upstream. A card reads '1 June 2026 · 17:30 · the High Rhine at Büsingen, from our boat'.",
    'footage': "Our own boat footage (17:29): glassy water mirroring cumulus, poplars and the Büsingen houses. It slows to 4× and zooms onto the strip of water beside the boat, where real dimples drift past, ringed 'a dimple' and 'and a pair'. Subtitles move to the top for this shot.",
    'closeup': "Match cut to the rendered river: a low, close follow-shot of one dimple. It shows as a glassy funnel with a dark shadow on the bed.",
    'funnel': "Side cross-section diagram: a column of spinning water, with pressure arrows at one depth (higher outside, lower toward the centre). The surface dips above the core.",
    'restless': "Rendered boat view, wide, drifting slowly: many dimples sheared and stirred by the current. The title 'Dimples on the Rhine' fades in over the last line.",
    'dive': "The rendered close-up dives through the waterline. A wipe reveals an underwater view looking up at the bright underside of the surface and the dimple's dent, with a narrow tube of spinning water running down.",
    'tube-axis': "3D diagram: a translucent tube of spinning particles with amber rotation rings. A white axis line appears along its middle, labelled 'vortex line: how we draw the spin'.",
    'line-point': "3D figure from the interactive page: a vortex line standing from bed to surface in a slab of water. An inset from above shows one dimple where the line meets the surface.",
    'helmholtz': "The same figure with a line that stops in mid-water and a red '?' at its loose end. Name card: Hermann von Helmholtz, 1858.",
    'circulation': "Top view of a whirlpool's flow streaks with a dashed loop. An amber arc walks around the loop while a counter adds up the flow. Then the equation Γ = ∮u·dl appears with the total. The loop wanders and the total stays the same.",
    'frozen-proof': "The loose-end figure again, with a chip reading 'flow frozen: only our measuring loop moves'. The loop slides down the tube and past its end, keeping Γ = 60. Then it shrinks to nothing: red 'Γ = 0 ?!'.",
    'close-or-end': "The tube closes into a ring, then switches to a line standing on the bed, labelled '…or end on the riverbed or the surface'.",
    'ring-hello': "A particle smoke ring rolls toward the camera out of the dark.",
    'tait-box': "Tait's box as a simple 3D diagram firing a train of rings. Name cards: Peter Guthrie Tait (Edinburgh, 1867) and William Thomson, later Lord Kelvin.",
    'bounce': "Two rings travel side by side, wobbling and bouncing without falling apart.",
    'leapfrog': "Two coaxial rings, driven by the point-vortex model, take turns passing through each other (labelled as a sketch).",
    'knot': "A trefoil knot turns in 3D. 'Atoms as knotted vortex rings?' appears, then is struck through on 'Kelvin was wrong about atoms'.",
    'knot-table': "A table of six knots turning, labelled 'Tait's tables of knots → knot theory'.",
    'reconnect': "Underwater 3D: a tilted ring rises toward the surface. A glow marks where its upper edge reconnects, and it becomes a curved tube with two ends. Name card: Bernal & Kwon 1989 · Terrington, Hourigan & Thompson 2022.",
    'reveal': "One continuous camera move. It starts straight above (two dimples with opposite spins), then goes down through the surface to below, revealing the single connected U-shaped tube.",
    'spin-dirs': "3D arch figure from the interactive page: one tube with two feet on the surface. The inset shows the two dimples turning opposite ways.",
    'no-boxes': "Rendered boat view from higher up, with a slow push-in over the river.",
    'hairpin': "Diagram: a current profile over the bed, a paddle wheel turning on the bed, and arches (hairpins) peeling off. Name card: hairpin vortices (Theodorsen 1952 · Kline and colleagues 1967 · Zhou and colleagues 1999).",
    'factory': "Side diagram: arches keep rising from the bed and shredding on the way up ('most arches never make it'). One lucky arch reaches the surface and leaves a pair of dimples with opposite spins.",
    'pair-speed': "Top view of the rendered river with an ideal pair, and the equation V = Γ/2πd with live dials. The separation d halves and V doubles. Chip: 'ideal pair, strengths fixed'.",
    'rock-boat': "High oblique render over clear, shallow water: a boulder is visible on the bed, and a steady, alternating train of dimple shadows trails downstream. Rings mark the alternating spins on 'first from one side, then the other'.",
    'pier': "Top-view SCHEMATIC after the marked-up Nidelva photo (Aarnes et al. 2025, Fig. 1): a bridge pillar sheds a street of large dimples, ringed green, with smaller ones elsewhere ringed blue. Name card: Aarnes, Babiker, Xuan, Shen & Ellingsen.",
    'rock-depth': "3D cutaway with a depth dial, h/k. In deep water (h/k 4.2), arches peel off a rock and die on the way up. The water drops (h ÷2.3), and upright whirlpools run from bed to surface in two staggered rows, with alternating spins at the top. Name card: Shamloo, Rajaratnam & Katopodis 2001 · Lloyd & Stansby 1997.",
    'gauge': "Data chart: daily discharge of the Rhine at Neuhausen in 2026, drawn in amber over the 1991–2020 range for each calendar day (band) and the median (dashed). A marker at 1 June reads 252 m³/s, against 511 for the date. Credit: FOEN, 2026 values provisional.",
    'calm': "Our second boat clip (17:32): glassy water along the wooded bank.",
    'bed': "swisstopo 10 cm aerial image at the boat's position, with the riverbed visible through clear water. The boat track is dashed. 'Gravel shallows' is labelled along one bank, and 'dark streaks along the flow: weed beds?' is ringed. Then a chip: 'published counts of dimples on the Rhine: none found'.",
    'spread': "Side diagram: a whirlpool's core widens under friction, and its dip gets shallower.",
    'stretch-up': "Side diagram: surface water converges (teal arrows) and sinks, stretching the core thinner. It spins faster and the dip deepens, while the surface far away stays level. Name card: Qi, Li & Coletti 2025.",
    'both': "Two panels side by side, 'wearing down' (friction) and 'keeping it going' (sinking water), breathing in opposite phase.",
    'ripples': "Rendered boat view: ripples rise and hide the dimples, while rings show the whirlpools are still there ('hidden, not gone'). Then the ripples fade.",
    'dials': "Rendered June evening with three dials at the top: wind, sky and eye height. A true-scale inset shows how shallow a dip is: half a millimetre over 2 cm, and again ×200 in depth. Then each dial moves in turn. A breeze buries the dimples in ripples. An overcast sky leaves nothing crisp to bend. A bridge-height view fades the reflection. All three return, and a chip reads '1 June 2026: calm, cumulus and poplars, and a low boat'. Labelled as an illustration; the rendered dimples are steeper than real ones.",
    'count': "Overhead SCHEMATIC of a water surface with dimples (spin marks) and scars flickering in and out. Chip: 'dimples counted: N (simulations, 2023)'. Name card: Omer Babiker, Simen Ellingsen and colleagues, NTNU, Trondheim.",
    'traces': "SCHEMATIC chart after Babiker et al. 2023: two traces, surface spreading/converging and number of dimples, tracking each other with a lag.",
    'area': "The overhead schematic again, now highlighting the area covered by dimples and elongated scars. Chip: 'area covered … (lab tank, 2026)'. Name card: Babiker and colleagues, Phys. Rev. Fluids 2026.",
    'gas': "Diagram of the air–water surface: oxygen dots going down, carbon dioxide dots coming up.",
    'bridge': "Rendered top view from a bridge (railing in the foreground) over clear, shallow water. A rock on the bed pulses each time it sheds, and a steady train of dimple shadows (dark discs with bright rims) trails downstream. Rings mark the alternating spins.",
    'end': "Rendered boat view pulling back and up over the river. End card: 'Dimples on the Rhine', 'interactive page: benknill.github.io/rhine-dimples', 'next: soap films'.",
}
missing = [i for _, _, i in cues if i not in STORY]; assert not missing, missing
mmss = lambda t: f"{int(t // 60)}:{int(t % 60):02d}"
beats = {b['id']: b for b in script['beats']}
dur = T['duration'] + 6
words = sum(len(l['show'].split()) for b in script['beats'] for l in b['lines'])
new_lines = sum(1 for l in T['lines'] if l.get('estimated'))

acts_txt, acts_html = [], []
for b in script['beats']:
    tb = T['beats'][b['id']]; mine = [c for c in cues if c[0] == b['id']]
    wc = sum(len(l['show'].split()) for l in b['lines'])
    head = f"{b['title']} (starts {mmss(tb['start'])}; {wc} words)"
    txt, htm = [head], [f"<section class='act'><h3><span>{html.escape(b['title'])} <span class='t'>· {mmss(tb['start'])}</span></span><span class='wc'>{wc} words</span></h3>"]
    for k, (_, line, sid) in enumerate(mine):
        last = mine[k + 1][1] if k + 1 < len(mine) else len(b['lines'])
        t0 = tb['start'] if line == 0 else tb['lines'][line]['start'] - 0.35
        t1 = (tb['lines'][last]['start'] - 0.35) if last < len(b['lines']) else tb['end']
        txt.append(f"  SHOT {sid} ({mmss(t0)}–{mmss(t1)}): {STORY[sid]}")
        htm.append(f"<div class='shot'><div class='sh'><b>{sid}</b> <span class='t'>{mmss(t0)}–{mmss(t1)}</span></div><p class='pic'>{html.escape(STORY[sid])}</p><ol start='{line + 1}'>")
        for j in range(line, last):
            l = tb['lines'][j]; flag = ' [new line, not yet recorded]' if l.get('estimated') else ''
            txt.append(f"    - {l['show']}{flag}")
            htm.append(f"<li>{html.escape(l['show'])}{' <span class=new>new</span>' if flag else ''}</li>")
        htm.append("</ol></div>")
    acts_txt.append('\n'.join(txt)); acts_html.append(''.join(htm) + "</section>")

BRIEF = f"""You are reviewing both the narration script and the shot-by-shot storyboard for an educational YouTube video, "Dimples on the Rhine". It is in the spirit of Veritasium: story-driven, grounded in a real day, with people, history and a few simple "change one quantity and watch" visuals rendered from simulation. The target length is about 7.5 minutes; the current estimate is {mmss(dur)} ({words} words), so about 40 seconds need to go.

PREMISE
On 1 June 2026, around 17:30, on a motorboat heading upstream on the High Rhine at Büsingen, we kept seeing small whirlpool dimples on glassy water. They appeared beside and ahead of the boat, not behind it, and some lasted a long time.
- The reach is the backwater of the Schaffhausen power plant, whose pool is held at 390.8 m.
- The flow that day was a record low for June: 252 cubic metres per second at the federal gauge in Neuhausen, against a median of 511 for the date. The 2026 figures are provisional.
- The evening was one of the calmest of the month.
- Our own boat footage from 17:29 shows several real dimples, about 5 cm across, including a pair.

WHAT IS ON SCREEN
The storyboard below lists every shot with the narration lines it covers.
- The picture mixes our own footage, open data (swisstopo aerial imagery and terrain; FOEN gauge data), simulation renders and labelled schematics.
- Diagrams get a slow push-in or pull-out. Subtitles are burned in.
- Lines marked [new line, not yet recorded] have no voice yet; their timing is estimated.

PLEASE DO
1. Fact-check every name, date, number and claim, in both the narration and the on-screen text (cards, chips, labels). Give corrections with sources.
2. Judge the story and the pace, and propose specific cuts to reach about 7.5 minutes. Name the lines and shots to cut, and say what is lost.
3. Check script–picture fit shot by shot:
   - Does the picture support the line at that moment?
   - Where would a different shot, camera move, match cut or reveal land the point better?
   - Flag any shot that overclaims, such as a schematic or illustration that could be mistaken for measured data, or a render that suggests more certainty than the science has.
4. Improve the writing for the ear: warm, curious and precise, with short sentences and no hype words. Narration says "we".
5. Keep it speakable by a text-to-speech voice: spell out symbols as words, and avoid abbreviations and bare single letters.

PHYSICS THAT MUST STAY RIGHT (flag rather than silently change)
{PHYSICS}

WHAT TO RETURN
1. The revised script and storyboard in the same format: act headers, then SHOT lines with their narration. Keep the existing shot ids, and give new shots descriptive ids.
2. A fact-check table: claim, verdict, correction, source.
3. A cut list to reach about 7.5 minutes.
4. The five picture improvements that would help most in the final rendering push, ranked.

THE SCRIPT AND STORYBOARD
"""
text = BRIEF + '\n' + '\n\n'.join(acts_txt) + "\n\nSOURCES\n" + '\n'.join(f"{i + 1}. {s}" for i, s in enumerate(consts['SOURCES']))
page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dimples on the Rhine: script and storyboard, draft {TAG}</title>
<style>
:root{{color-scheme:dark;--bg:#0A0D14;--panel:#10151F;--line:#1F2736;--text:#DCE2EC;--muted:#8A95AA;--faint:#5A6479;--cool:#4FD1C5;--amber:#FFB547}}
body{{margin:0;background:var(--bg);color:var(--text);font:15px/1.55 system-ui,sans-serif;padding-inline:16px}}.wrap{{max-width:940px;margin:0 auto;padding-block:28px 60px}}
h1{{font-family:Georgia,serif;font-size:32px;margin:0 0 4px}}h2{{font-family:Georgia,serif;font-size:22px;margin:30px 0 8px}}p{{color:#C8D0DC}}.m{{color:var(--muted)}}
.act{{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:14px 16px;margin:14px 0}}.act h3{{margin:0 0 8px;font-size:18px;display:flex;justify-content:space-between;gap:12px}}
.wc,.t{{color:var(--faint);font:13px ui-monospace,monospace;white-space:nowrap}}.shot{{border-top:1px solid var(--line);padding:10px 0 4px}}.sh b{{color:var(--cool);font:600 14px ui-monospace,monospace}}
.pic{{margin:4px 0 6px;font-size:14px;color:var(--muted)}}ol{{margin:0 0 6px 22px;padding:0;font-family:Georgia,serif;font-size:17px}}li{{margin:3px 0}}.new{{font:600 11px system-ui;color:#0A0D14;background:var(--amber);border-radius:4px;padding:1px 5px;margin-left:6px}}
textarea{{width:100%;box-sizing:border-box;height:320px;background:#0C1119;color:var(--text);border:1px solid var(--line);border-radius:8px;padding:12px;font:13px/1.5 ui-monospace,monospace}}
button{{font:inherit;color:var(--text);background:#141A26;border:1px solid #2C3649;border-radius:6px;padding:9px 18px;cursor:pointer}}button:hover{{border-color:var(--faint)}}.row{{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:12px 0}}#ok{{color:var(--cool);font-size:13px}}
</style></head><body><div class="wrap">
<h1>Dimples on the Rhine</h1>
<p class="m">Script and storyboard, draft {TAG}. {len(cues)} shots, {words} words, estimated {mmss(dur)} (target about 7:30). {new_lines} lines are new and not yet recorded. Rough-cut preview: <a href="preview{TAG}.html" style="color:#6FA8FF">preview{TAG}.html</a></p>
<div class="row"><button id="copy">Copy review brief + script + storyboard</button><span id="ok"></span></div>
{''.join(acts_html)}
<h2>What gets copied</h2><textarea id="brief" readonly></textarea>
</div><script>
const TEXT = {json.dumps(text, ensure_ascii=False)};
const ta = document.getElementById("brief"); ta.value = TEXT;
document.getElementById("copy").onclick = async () => {{ try {{ await navigator.clipboard.writeText(TEXT); }} catch (e) {{ ta.select(); document.execCommand("copy"); }}
  const ok = document.getElementById("ok"); ok.textContent = "Copied " + TEXT.length.toLocaleString() + " characters."; setTimeout(() => ok.textContent = "", 3000); }};
</script></body></html>"""
(HERE / f'review{TAG}.html').write_text(page)
print(f'review{TAG}.html: {len(cues)} shots, {words} words, {len(text)} chars to copy, est {mmss(dur)}')
