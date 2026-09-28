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
    'footage': "Our own boat footage (17:29) at normal speed, labelled 'our footage · normal speed': glassy water mirroring cumulus, poplars and the Büsingen houses. Several dimples drift past low in the frame; the viewer gets a chance to spot them before anything is pointed out. The clip continues into our 17:32 footage.",
    'replay': "Labelled replay, slowed 4×: the same moment, zooming onto the strip of water beside the boat. Real dimples are ringed as they drift past: 'a dimple', then 'and a pair'. Subtitles move to the top for this shot.",
    'place': "Back to normal speed on our 17:32 footage. A small inset shows an aerial zoom (swisstopo) from the reach down to the boat's position at Büsingen, and a date card reads '1 June 2026 · about 17:30 · the High Rhine at Büsingen, from our boat'.",
    'closeup': "Match cut to the rendered model, labelled 'rendered model': a low, close follow-shot of one dimple, a glassy dip with its shadow on the bed.",
    'funnel': "Side cross-section diagram: a column of spinning water with pressure arrows at one depth (higher outside, lower toward the centre); a shallow dip in the surface above the core.",
    'restless': "Rendered boat view, wide, drifting: many dimples sheared and stirred by the current. The title 'Dimples on the Rhine' fades in over the last line.",
    'dive': "The rendered close-up dives through the waterline: a wipe to an underwater view looking up at the underside of the surface and the dimple's dent, with a narrow tube of spinning water running down.",
    'tube-axis': "3D diagram: a translucent tube of spinning particles with amber rotation rings; a white axis line appears along its middle ('vortex line: how we draw the spin'). The finite tube stays visible.",
    'helmholtz': "3D figure: a tube that stops in mid-water, with a red '?' at its loose end. Name card: Hermann von Helmholtz, 1858.",
    'circulation': "Top view of a whirlpool's flow streaks with a dashed loop, divided into unequal pieces. As an amber arc walks round, each piece lights up with an arrow for the speed along it, labelled 'speed along each piece × its length, added up'. A running total in cm²/s leads to Γ = ∮u·dl; then the loop wanders and the total stays the same.",
    'frozen-proof': "The loose-end figure with chips 'flow frozen: only our measuring loop moves' and 'hypothetical: suppose the tube ended here'. The loop slides past the end ('past the end: no spin (the water may still move)'), keeping Γ = 60 cm²/s, then shrinks to a point: red 'Γ = 0 ?!', held for a silent beat.",
    'close-or-end': "A closed ring ('a closed ring: no loose end'), then a curved tube whose two feet meet the surface ('a tube can also connect to the surface'); an inset from above shows two opposite spins.",
    'ring-hello': "A particle smoke ring rolls toward the camera out of the dark.",
    'tait-box': "Tait's box as a simple 3D diagram firing a train of rings. Name cards: Peter Guthrie Tait (Edinburgh, 1867) and William Thomson, later Lord Kelvin.",
    'bounce': "Two rings travel side by side, wobbling and bouncing without falling apart.",
    'leapfrog': "Two rings take turns passing through each other, one readable cycle; labelled 'schematic: a cross-section model, not a 3D ring simulation'.",
    'knot': "A trefoil knot turns in 3D. 'Atoms as knotted vortex rings?' appears, then is struck through on 'Kelvin was wrong about atoms'.",
    'knot-table': "A table of six knots turning, labelled 'Tait's tables of knots → knot theory'.",
    'reconnect': "Underwater 3D, labelled 'idealized example': a tilted ring rises toward the surface. A glow marks where its upper edge reconnects; over a second or two the top thins and opens, and the ring becomes a curved tube with two ends at the surface. Name card: Bernal & Kwon 1989 · Terrington, Hourigan & Thompson 2022.",
    'reveal': "One continuous camera move with no interruptions: from straight above (two dimples, opposite spins) down through the surface to below, revealing the single connected U-shaped tube; a held pause.",
    'spin-dirs': "3D arch figure: one tube with two feet on the surface; the inset shows the two ends turning opposite ways.",
    'no-boxes': "Rendered boat view from higher up, slow push-in over the river.",
    'hairpin': "Diagram: a current profile over the bed, faster above, with a paddle wheel turning on the bed, then one illustrative arch rising. Name card: hairpin vortices (Theodorsen 1952 · Kline and colleagues 1967 · Zhou and colleagues 1999).",
    'factory': "Side diagram labelled 'illustration: one possible pathway, not measured numbers': a few arches rise from the bed, some stretch and scatter, and one reaches the surface and leaves a pair of dimples with opposite spins.",
    'pair-speed': "Top view of the rendered river with an ideal pair and no current ('ideal pair, strengths fixed, no current: the pair moves itself'); the equation V = Γ/2πd with live dials: the separation d halves and V doubles.",
    'rock-boat': "High oblique render over clear, shallow water, labelled 'schematic example: not every rock sheds like this': a boulder on the bed and a train of alternating dimple shadows trailing downstream; rings mark the alternating spins.",
    'pier': "The actual photograph from Aarnes et al. (2025, Figure 1, CC BY 4.0): the Nidelva in Trondheim with the paper's own colour marks. A slow push toward the green-marked dimples shed by a bridge pillar. Credit: photo Klervie le Bris · Aarnes et al., J. Fluid Mech. 1007, A38 (2025). Name card: Aarnes, Babiker, Xuan, Shen & Ellingsen.",
    'rock-depth': "3D cutaway labelled 'illustrative wake regimes': with deeper water over a rock, arches peel off and fade on the way up; the water level drops, and upright whirlpools run from bed to surface in two staggered rows. No numbers on screen. Name card: Shamloo, Rajaratnam & Katopodis 2001 · Lloyd & Stansby 1997.",
    'spread': "Side diagram: a whirlpool's core widens under friction, and its dip gets shallower.",
    'stretch-up': "Side diagram, in order: surface water converges (teal arrows), then sinks (a downward arrow), then the core stretches thinner and spins faster, with a deeper dip; the surrounding surface stays nearly level. Name card: Qi, Li & Coletti 2025.",
    'ripples': "Rendered boat view: ripples rise and hide the dimples, while rings show the whirlpools are still there ('hidden, not gone'); then the ripples fade.",
    'reflect': "The moving-reflection experiment (rendered model): one whirlpool held fixed, with a realistic gentle slope, under a plain sky; it is barely visible. Then a crisp cloud edge's reflection sweeps across it: as the edge passes under the whirlpool the dip shows as a small lens, blue bent into white and white into blue, and a ring marks it on 'Now the dimple shows'. An inset shows the same view without the whirlpool.",
    'dials': "A quick three-dial recap on the rendered river (smooth water, distinct reflections, low viewing angle): each briefly turns the wrong way (breeze, overcast, bridge height) and the dimples fade, then comes back.",
    'day': "Our 17:32 footage again: glassy water along the wooded bank.",
    'count': "Overhead schematic of a region of water surface with dimples and scars flickering in and out; chip 'counting dimples in a region (simulations, 2023)'. Name card: Omer Babiker, Simen Ellingsen and colleagues, NTNU, Trondheim.",
    'traces': "Schematic chart after Babiker et al. 2023, labelled SCHEMATIC: two traces, surface spreading/converging and regional dimple count, tracking each other with a lag. No correlation numbers on screen.",
    'area': "The overhead schematic again, highlighting the area covered by dimples and elongated scars; chip 'the area covered by dimples and scars (lab tank, 2026)'. Name card: Babiker and colleagues, Phys. Rev. Fluids 2026.",
    'gas': "Diagram of the air–water surface with oxygen and carbon dioxide dots crossing in both directions ('crossing both ways').",
    'bridge': "Rendered top view from a bridge (railing in the foreground) over clear, shallow water. First a chip 'published counts on a real river: none found'; then 'from a bridge: sunlight bent onto the bed', and an arrow to one whirlpool's 'dark patch, bright rim'. No rock, no diagnostic train.",
    'end': "Our own footage again at normal speed: the 17:29 clip, where one dimple is ringed briefly and the ring disappears, continuing into the 17:32 clip. The end card fades in over the real river: 'Dimples on the Rhine', 'interactive page: benknill.github.io/rhine-dimples', 'next: soap films'.",
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

BRIEF = f"""You are reviewing both the narration script and the shot-by-shot storyboard for an educational YouTube video, "Dimples on the Rhine". It is in the spirit of Veritasium: story-driven, grounded in a real day, with people, history and a few simple "change one quantity and watch" visuals rendered from simulation. The ceiling is about 7.5 minutes; the current estimate is {mmss(dur)} ({words} words). Do not pad it to reach the ceiling.

PREMISE
On 1 June 2026, around 17:30, on a motorboat heading upstream on the High Rhine at Büsingen, we kept seeing small whirlpool dimples on glassy water. They appeared beside and ahead of the boat, not behind it, and some lasted a long time.
- The reach is the backwater of the Schaffhausen power plant, whose pool is held at 390.8 m.
- The flow that day was unusually low (a provisional 252 cubic metres per second at the federal gauge in Neuhausen, against a median of 511 for the date). This draft no longer uses that in the film, because it cannot establish why we saw dimples that day.
- Our own boat footage from 17:29 shows several real dimples, about 5 cm across, including a pair.

WHAT IS ON SCREEN
The storyboard below lists every shot with the narration lines it covers.
- The picture mixes our own footage, open data (swisstopo aerial imagery and terrain; FOEN gauge data), simulation renders and labelled schematics.
- Diagrams get a slow push-in or pull-out. Subtitles are burned in.
- Lines marked [new line, not yet recorded] have no voice yet; their timing is estimated.

PLEASE DO
1. Fact-check every name, date, number and claim, in both the narration and the on-screen text (cards, chips, labels). Give corrections with sources.
2. Judge the story and the pace. Where does it drag or rush? Name specific lines or shots to cut or expand, and say what is gained or lost.
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
3. A short list of structural changes, with reasons.
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
