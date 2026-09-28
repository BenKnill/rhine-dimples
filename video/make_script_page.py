"""Write script{TAG}.html: the review page (script by act, sources, and a copy-for-review brief) from acts{TAG}.json and timing{TAG}.json.

Uses script75.html as the page template (styles and page code) and swaps in this draft's acts, sources and brief.
"""
import json, os, re
from pathlib import Path
HERE = Path(__file__).resolve().parent
TAG = os.environ.get('TAG', '4')
acts = json.loads((HERE / f'acts{TAG}.json').read_text())
T = json.loads((HERE / f'timing{TAG}.json').read_text())
for a, (bid, b) in zip(acts, T['beats'].items()):
    a['time'] = f"{int(b['start'] // 60)}:{int(b['start'] % 60):02d}"
dur = T['duration']

SOURCES = [
    "H. von Helmholtz (1858), Über Integrale der hydrodynamischen Gleichungen, welche den Wirbelbewegungen entsprechen, J. reine angew. Math. 55, 25–55 (vortex lines cannot end inside the fluid).",
    "W. Thomson (1867), On vortex atoms, Proc. R. Soc. Edinburgh 6, 94–105 (Tait's smoke-ring box; atoms as knotted vortex rings).",
    "P. G. Tait, On knots I–III, Trans. R. Soc. Edinburgh (1876–1885) (knot tables).",
    "L. P. Bernal and J. T. Kwon (1989), Vortex ring dynamics at a free surface, Phys. Fluids A 1, 449 (a vortex ring reconnecting with a free surface into surface-attached vortices).",
    "S. J. Terrington, K. Hourigan and M. C. Thompson (2022), J. Fluid Mech., doi:10.1017/jfm.2022.529 (vortex rings connecting to a free surface; for an oblique ring the upper edge connects first).",
    "T. Theodorsen (1952), Mechanism of turbulence (hairpin vortex model); S. J. Kline, W. C. Reynolds, F. A. Schraub and P. W. Runstadler (1967), The structure of turbulent boundary layers, J. Fluid Mech. 30, 741.",
    "J. Zhou, R. J. Adrian, S. Balachandar and T. M. Kendall (1999), Mechanisms for generating coherent packets of hairpin vortices in channel flow, J. Fluid Mech. 387, 353–396.",
    "J. R. Aarnes, O. M. Babiker, A. Xuan, L. Shen and S. Å. Ellingsen (2025), Vortex structures under dimples and scars in turbulent free-surface flows, J. Fluid Mech. 1007, A38, doi:10.1017/jfm.2025.72 (Fig. 1: a marked-up photo of the Nidelva in Trondheim, photo by Klervie le Bris; 'the largest dimples are von Kármán vortices shed from a nearby bridge pillar'; article licensed CC BY 4.0, figure shown with credit).",
    "W. Thomson (1867), On vortex atoms (his own account of Tait's smoke rings and the vortex-atom idea); circulation as the line integral of velocity and vortex-tube continuity (Kelvin, Stokes, Helmholtz; any fluid-dynamics text).",
    "D. M. Lloyd and P. K. Stansby (1997), Shallow-water flow around model conical islands of small side slope. II: Submerged, J. Hydraul. Eng. 123(12), 1068–1077, doi:10.1061/(ASCE)0733-9429(1997)123:12(1068) (submerged islands shed vortices only when the water over the top is shallow).",
    "H. Shamloo, N. Rajaratnam and C. Katopodis (2001), Hydraulics of simple habitat structures, J. Hydraul. Res. 39(4), 351–366, doi:10.1080/00221680109499840 (flow regimes behind hemispheres set by depth over obstacle height).",
    "S. M. Hajimirzaie and J. H. J. Buchholz (2013), Flow dynamics in the wakes of low-aspect-ratio wall-mounted obstacles, Exp. Fluids 54, 1616, doi:10.1007/s00348-013-1616-1 (smooth versus sharp-edged obstacles; shedding frequency rising as submergence falls).",
    "S. M. Hajimirzaie (2023), Experimental observations on flow characteristics around a low-aspect-ratio wall-mounted circular cylinder, Fluids 8, 32, doi:10.3390/fluids8010032 (wake regimes depend on geometry; no clear shedding peak for the circular cylinder studied).",
    "M. Muraro, G. Dolcetti, A. Nichols, S. J. Tait and K. V. Horoshenkov (2021), Free-surface behaviour of shallow turbulent flows, J. Hydraul. Res. 59(1), 1–20, doi:10.1080/00221686.2020.1870007 (review; the role of relative submergence is unsettled; no field baseline for dimple counts).",
    "SRF News, 3 June 2026: the western part of Lake Constance at its lowest level ever measured for June, about one metre below the long-term June average; Stein am Rhein to Diessenhofen not navigable.",
    "Y. Qi, Y. Li and F. Coletti (2025), Small-scale dynamics and structure of free-surface turbulence, J. Fluid Mech., doi:10.1017/jfm.2025.139; arXiv:2412.04361 (surface-attached vortices strengthening during downwellings and diffusing afterwards).",
    "O. M. Babiker, I. Bjerkebæk, A. Xuan, L. Shen and S. Å. Ellingsen (2023), Vortex imprints on a free surface as proxy for surface divergence, J. Fluid Mech. 964, R2, doi:10.1017/jfm.2023.370 (simulations: dimple count tracks mean-square surface divergence).",
    "O. M. Babiker, J. R. Aarnes, A. Semati, A. Ferran, Y. H. Tee, R. J. Hearst and S. Å. Ellingsen (2026), Experimental investigation relating free-surface features to subsurface turbulence, Phys. Rev. Fluids 11, 054802, doi:10.1103/bmx7-2z3h (laboratory tank: area covered by dimples and scars).",
    "L. Shen, X. Zhang, D. K. P. Yue and G. S. Triantafyllou (1999), The surface layer for free-surface turbulent flows, J. Fluid Mech. 386, 167–212, doi:10.1017/S0022112099004590 (surface-connected vortices stretch and dissipate far less, so they persist).",
    "M. V. Berry and J. V. Hajnal (1983), The shadows of floating objects and dissipating vortices, Optica Acta 30, 23–40, doi:10.1080/713821046 ('most people have noticed the sun-shadows cast on river beds by … vortices').",
    "FOEN Hydrology Division, station 2288 Rhein – Neuhausen, Flurlingerbrücke: provisional daily mean discharge 2026 (252 m³/s on 1 June) and 1991–2020 statistics for each calendar day (median 511, minimum 265 m³/s for 1 June); 1959–2025 June minimum daily mean 265 m³/s (1 June 2011). hydrodaten.admin.ch.",
    "MeteoSwiss open data, station Schaffhausen (SHA), 10-minute wind, 15 May – 15 June 2026 (evening of 1 June among the calmest of the period).",
    "swisstopo SWISSIMAGE aerial imagery (2025), © swisstopo, free use with attribution (map zoom and the riverbed at the boat's position).",
    "Surface-renewal and surface-divergence models of air–water gas transfer (e.g. McCready, Vassiliadou and Hanratty 1986; Banerjee and colleagues).",
]

BRIEF = r"""You are reviewing the narration script for an educational video of about 7 minutes, in the spirit of Veritasium: story-driven, with people, history and real-world surprises, plus a few simple "change one quantity and watch" visuals rendered from simulation.

PREMISE
We, on a boat on the Rhine, noticed small dimples on the water. There were few boats and few paddlers (our own boat had an engine); the dimples appeared beside and ahead of the boat, rarely behind, were most visible on smooth water, and some lasted a long time. The question: in a restless, turbulent river, what keeps one tiny whirlpool going?

THE STORY, AS IT NOW STANDS
Dimples -> the vortex tube under each one (Helmholtz: a tube of spin can't end inside the water, shown with circulation and a frozen-flow loop argument) -> smoke rings (Tait and Kelvin, vortex atoms, knot theory; a tilted ring reconnecting to the surface gives two dimples above and one connected tube below) -> the river's own mechanisms (hairpin arches from the bed, most shredded; the pair's self-propulsion; bed obstacles such as boulders and piers shedding a steady, alternating train of whirlpools, more of which reach the surface when the water over the obstacle is shallow; a record-low Lake Constance that spring; the honest admission that nobody has counted dimples on the Rhine; then friction spreading a core versus sinking surface water strengthening it; ripples hiding dimples) -> what researchers read from the surface (dimple counts in simulations, dimple-and-scar area in a laboratory tank, gas exchange), ending with an invitation to watch for a steady beat of whirlpools from one spot below a bridge.
(Our outing was on the High Rhine at Büsingen, in the backwater of the Schaffhausen power plant, on 1 June 2026 around 17:30, in gentle flow on glassy water. Two dimples are visible in our own boat footage from 17:29.) The earlier "why flat is special" act (2D turbulence, Jupiter, Hamiltonian phase space) has been cut from this video on purpose.

PLEASE DO
1. Fact-check every name, date, number and claim. Flag anything wrong, misattributed, oversimplified or contested, with a correction and a source where you can.
2. Judge the story and pace: where does it drag, where is it too fast, which lines could be punchier? Every beat should stay close to the dimples.
3. Suggest shots or cuts only where a line and its picture don't yet support each other.
4. Improve the writing for the ear: warm, curious, precise, conversational; short sentences; no hype words. Narration says "we"; add no trip details beyond the premise.
5. Keep it speakable by a text-to-speech voice: spell symbols as words, avoid abbreviations and bare single letters.

PHYSICS THAT MUST STAY RIGHT (flag rather than silently change)
- Pressure supplies the inward (centripetal) force for the swirl: higher outside, lower toward the axis at a given depth, so the free surface dips above the core. Dip depth scales as Gamma^2 / (g a^2) for circulation Gamma and core radius a. Pictures show a shallow depression, not a drain.
- The vortex line is the axis we draw; the water rotates around it. Circulation is the loop integral of the velocity component along the loop times each element's length (u · dl); it equals the vorticity flux through the loop.
- Helmholtz / div omega = 0: an isolated vortex tube cannot simply end inside the fluid. A closed ring has no end; a tube can also connect to a boundary such as the free surface. The proof sketch freezes the velocity field at one instant and moves only the measuring loop; the loose end is hypothetical, and the zero is the contradiction. Past the end there is no local spin, which is not the same as no motion.
- Kelvin: in an ideal fluid, circulation around a material loop is constant. Tait's rings and Thomson's vortex-atom idea (1867, in his own account) and the link to knot theory are history, told as such ("a possible answer").
- A ring approaching the surface obliquely can reconnect, first at its upper edge, over a finite time; the result can be a U-shaped tube with two surface-attached ends of opposite sense. Shown as an idealized example, not a reconstruction of our footage.
- Hairpin (arch) vortices form in the shear near the bed; they can be stretched and dispersed, and some can reach the surface and connect. How many do so in a given river has not been measured; the film shows one possible pathway, not a production line.
- An ideal counter-rotating pair moves at Gamma / (2 pi d): halve d, double the speed (strengths fixed, no current; labelled as an ideal model).
- Viscosity spreads a core and the dip gets shallower. Downwelling (convergent, sinking surface flow) stretches a surface-attached vortex and intensifies it (Qi, Li and Coletti, J. Fluid Mech. 2025). The surrounding surface can stay nearly level while water beneath moves up and down.
- Obstacles: under suitable conditions an obstacle sheds alternating vortices; the depth over an obstacle changes its wake regime (Shamloo et al. 2001; Lloyd and Stansby 1997; one low circular cylinder showed no clear shedding peak, Hajimirzaie 2023). Not a rule that shallower always means more dimples. Real-river evidence: the Nidelva photograph (Aarnes et al. 2025, CC BY 4.0), shown with credit.
- Visibility: a dimple is seen by the reflection it bends. Smooth water, distinct reflections (cloud edges, trees) and a low viewing angle help; they are not strict prerequisites. Depth and slope numbers are example-model estimates, not measurements of our dimples. In clear, shallow, sunny water a dimple can also bend sunlight into a dark patch with a bright rim on the bed (Berry and Hajnal 1983).
- Babiker et al., J. Fluid Mech. 2023 (simulations): regional dimple counts correlate with regional mean-square surface divergence. Babiker et al., Phys. Rev. Fluids 2026 (laboratory): the area covered by dimples and scars, chosen because counting scars is not robust. Relationships are regional, not point by point.
- We found no published count of dimples on any real river (a search result, not proof of absence).
- Surface divergence (surface renewal) is linked to air-water gas transfer in both directions; the video says it "helps set" the rate.
- Our footage: several dimples about 5 cm across (estimated from viewing geometry, plus or minus 20 to 30 percent), including a pair; spin directions and lifetimes cannot be read from the clips.
WHAT TO RETURN
1. The revised script in the same format, with a word count (target 800 to 900 words).
2. A fact-check table: claim, verdict, correction, source.
3. A short list of changes and why, including any line whose picture would need to change.

THE SCRIPT
"""

page = (HERE / 'script75.html').read_text()
def swap(pat, new):
    global page
    page, n = re.subn(pat, lambda m: new, page, count=1, flags=re.S)
    assert n == 1, pat
swap(r'<title>.*?</title>', f'<title>Dimples on the Rhine: script, draft {TAG}</title>')
swap(r'<p class="muted">Episode 3, tight cut.*?</p>',
     f'<p class="muted">Episode 3, draft {TAG}: narration {"estimated" if T.get("estimated") else "measured"} at {int(dur // 60)}:{dur % 60:04.1f} with pauses. The story runs dimples → vortex tubes → smoke rings → the river\'s own mechanisms → what the surface tells us. "Why flat is special" is cut on purpose.</p>')
swap(r'const ACTS = \[.*?\];\nconst SOURCES', 'const ACTS = ' + json.dumps(acts, indent=1, ensure_ascii=False) + ';\nconst SOURCES')
swap(r'const SOURCES = \[.*?\];\nconst words', 'const SOURCES = ' + json.dumps(SOURCES, indent=1, ensure_ascii=False) + ';\nconst words')
swap(r'const BRIEF = `.*?THE SCRIPT\n`;', 'const BRIEF = `' + BRIEF.replace('\\', '\\\\').replace('`', "'").replace('${', '$ {') + '`;')
swap(r'document\.getElementById\("total"\)\.textContent = `.*?`;',
     f'document.getElementById("total").textContent = `${{total}} words · narration {"estimated" if T.get("estimated") else "measured"} at {int(dur // 60)}:{dur % 60:04.1f} including pauses`;')
(HERE / f'script{TAG}.html').write_text(page)
print(f'script{TAG}.html', sum(len(l.split()) for a in acts for l in a['lines']), 'words')
