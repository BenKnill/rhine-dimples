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
    "Y. Qi, Y. Li and F. Coletti (2025), Small-scale dynamics and structure of free-surface turbulence, J. Fluid Mech., doi:10.1017/jfm.2025.139; arXiv:2412.04361 (surface-attached vortices strengthening during downwellings and diffusing afterwards).",
    "O. M. Babiker, I. Bjerkebæk, A. Xuan, L. Shen and S. Å. Ellingsen (2023), Vortex imprints on a free surface as proxy for surface divergence, J. Fluid Mech. 964, R2, doi:10.1017/jfm.2023.370 (simulations: dimple count tracks mean-square surface divergence).",
    "O. M. Babiker, J. R. Aarnes, A. Semati, A. Ferran, Y. H. Tee, R. J. Hearst and S. Å. Ellingsen (2026), Experimental investigation relating free-surface features to subsurface turbulence, Phys. Rev. Fluids 11, 054802, doi:10.1103/bmx7-2z3h (laboratory tank: area covered by dimples and scars).",
    "Surface-renewal and surface-divergence models of air–water gas transfer (e.g. McCready, Vassiliadou and Hanratty 1986; Banerjee and colleagues).",
]

BRIEF = r"""You are reviewing the narration script for an educational video of about 7 minutes, in the spirit of Veritasium: story-driven, with people, history and real-world surprises, plus a few simple "change one quantity and watch" visuals rendered from simulation.

PREMISE
We, on a boat on the Rhine, noticed small dimples on the water. There were few boats and few paddlers (our own boat had an engine); the dimples appeared beside and ahead of the boat, rarely behind, were most visible on smooth water, and some lasted a long time. The question: in a restless, turbulent river, what keeps one tiny whirlpool going?

THE STORY, AS IT NOW STANDS
Dimples -> the vortex tube under each one (Helmholtz: a tube of spin can't end inside the water, shown with circulation and a frozen-flow loop argument) -> smoke rings (Tait and Kelvin, vortex atoms, knot theory; a tilted ring reconnecting to the surface gives two dimples above and one connected tube below) -> the river's own mechanisms (hairpin arches from the bed, most shredded; the pair's self-propulsion; friction spreading a core versus sinking surface water strengthening it; ripples hiding dimples) -> what researchers read from the surface (dimple counts in simulations, dimple-and-scar area in a laboratory tank, gas exchange). The earlier "why flat is special" act (2D turbulence, Jupiter, Hamiltonian phase space) has been cut from this video on purpose.

PLEASE DO
1. Fact-check every name, date, number and claim. Flag anything wrong, misattributed, oversimplified or contested, with a correction and a source where you can.
2. Judge the story and pace: where does it drag, where is it too fast, which lines could be punchier? Every beat should stay close to the dimples.
3. Suggest shots or cuts only where a line and its picture don't yet support each other.
4. Improve the writing for the ear: warm, curious, precise, conversational; short sentences; no hype words. Narration says "we"; add no trip details beyond the premise.
5. Keep it speakable by a text-to-speech voice: spell symbols as words, avoid abbreviations and bare single letters.

PHYSICS THAT MUST STAY RIGHT (flag rather than silently change)
- Pressure supplies the inward (centripetal) force for the swirl: higher outside, lower toward the axis at a given depth, so the free surface dips above the core. Dip depth scales as Gamma^2 / (g a^2) for circulation Gamma and core radius a.
- The vortex line is the axis we draw; the water rotates around it. Circulation is the loop integral of velocity, and equals the vorticity flux through the loop.
- Helmholtz / div omega = 0: vortex tubes cannot end inside the fluid; they close, or end on a boundary (bed or surface). The proof sketch holds the flow fixed at one instant and moves only the measuring loop.
- Kelvin: in an ideal fluid, circulation around a material loop is constant. Tait's rings, Kelvin's vortex-atom theory (1867), and the link to knot theory are history, told as such.
- A ring approaching the surface obliquely reconnects first at its upper edge; the result can be a U-shaped tube with two surface-attached ends of opposite sense, i.e. two counter-rotating dimples.
- Hairpin (arch) vortices form in the shear near the bed; most are destroyed or diffused before reaching the surface; this is the video's answer to "why aren't they everywhere": an instability threshold plus heavy attrition, not an energy barrier.
- An ideal counter-rotating pair moves at Gamma / (2 pi d): halve d, double the speed (strengths held fixed; labelled as an ideal model).
- Viscosity spreads a core (its size grows roughly as the square root of viscosity times time) and the dip gets shallower. Downwelling (convergent, sinking surface flow) stretches a surface-attached vortex and intensifies it (Qi, Li and Coletti, J. Fluid Mech. 2025). A surface can look level while water beneath moves up and down: low surface slope does not mean purely horizontal flow.
- Babiker et al., J. Fluid Mech. 2023 (simulations): the number of dimples in a region correlates with regional mean-square surface divergence. Babiker et al., Phys. Rev. Fluids 2026 (laboratory): the measured quantity is the area covered by dimples and scars, chosen because counting scars is not robust.
- Surface divergence (surface renewal) is linked to air-water gas transfer; the video says it "helps set" the rate, not that it alone determines it.

WHAT TO RETURN
1. The revised script in the same format, with a word count (target 700 to 800 words).
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
     f'<p class="muted">Episode 3, draft {TAG}: narration measured at {int(dur // 60)}:{dur % 60:04.1f} with pauses. The story runs dimples → vortex tubes → smoke rings → the river\'s own mechanisms → what the surface tells us. "Why flat is special" is cut on purpose.</p>')
swap(r'const ACTS = \[.*?\];\nconst SOURCES', 'const ACTS = ' + json.dumps(acts, indent=1, ensure_ascii=False) + ';\nconst SOURCES')
swap(r'const SOURCES = \[.*?\];\nconst words', 'const SOURCES = ' + json.dumps(SOURCES, indent=1, ensure_ascii=False) + ';\nconst words')
swap(r'const BRIEF = `.*?THE SCRIPT\n`;', 'const BRIEF = `' + BRIEF.replace('\\', '\\\\').replace('`', "'").replace('${', '$ {') + '`;')
swap(r'document\.getElementById\("total"\)\.textContent = `.*?`;',
     f'document.getElementById("total").textContent = `${{total}} words · narration measured at {int(dur // 60)}:{dur % 60:04.1f} including pauses`;')
(HERE / f'script{TAG}.html').write_text(page)
print(f'script{TAG}.html', sum(len(l.split()) for a in acts for l in a['lines']), 'words')
