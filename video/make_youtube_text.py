"""Write youtube{TAG}.txt: title options, description with chapters from timing{TAG}.json, credits and sources."""
import json, os
from pathlib import Path
HERE = Path(__file__).resolve().parent
TAG = os.environ.get('TAG', '7')
T = json.loads((HERE / f'timing{TAG}.json').read_text())
S = json.loads((HERE / f'script{TAG}.json').read_text())
mmss = lambda t: f"{int(t // 60)}:{int(t % 60):02d}"
names = {'open': 'Dimples on the Rhine', 'under': 'Under the dimple', 'rings': 'Smoke rings', 'river': "The river's own smoke rings", 'keep': 'What keeps one going', 'reading': 'Reading the river'}
chapters = [f"{'0:00' if i == 0 else mmss(b['start'])} {names[k]}" for i, (k, b) in enumerate(T['beats'].items())]
text = f"""TITLE OPTIONS
- Dimples on the Rhine
- The tiny whirlpools we saw on the Rhine
- Why tiny whirlpools dimple a calm river

DESCRIPTION
On a calm afternoon on the High Rhine at Büsingen, we kept seeing small dimples drifting beside the boat. Each one marks a whirlpool. Where do they come from, what keeps them going in a restless river, and why do you so rarely notice them? A story that runs from Helmholtz's rule about vortex tubes, through Tait's smoke rings and Kelvin's vortex atoms, to what researchers are now learning to read from a river's surface.

Try the interactive version: https://benknill.github.io/rhine-dimples

CHAPTERS
{chr(10).join(chapters)}

CREDITS
- Boat footage: our own, 1 June 2026, High Rhine at Büsingen.
- Aerial imagery: © swisstopo (SWISSIMAGE).
- Nidelva photograph: Klervie le Bris, from J. R. Aarnes, O. M. Babiker, A. Xuan, L. Shen & S. Å. Ellingsen, "Vortex structures under dimples and scars in turbulent free-surface flows", J. Fluid Mech. 1007, A38 (2025), doi:10.1017/jfm.2025.72, CC BY 4.0.
- Simulations, renders and diagrams: made for this video (point-vortex model and a WebGL water renderer; code in the interactive page's repository).
- Music: original, synthesized for this video.
- Narration: a synthetic voice reading our script.

SOURCES
- H. von Helmholtz (1858), J. reine angew. Math. 55, 25–55.
- W. Thomson (1867), On vortex atoms, Proc. R. Soc. Edinburgh 6, 94–105.
- L. P. Bernal & J. T. Kwon (1989), Phys. Fluids A 1, 449; S. J. Terrington, K. Hourigan & M. C. Thompson (2022), J. Fluid Mech., doi:10.1017/jfm.2022.529.
- T. Theodorsen (1952); S. J. Kline et al. (1967), J. Fluid Mech. 30, 741; J. Zhou et al. (1999), J. Fluid Mech. 387, 353.
- H. Shamloo, N. Rajaratnam & C. Katopodis (2001), J. Hydraul. Res. 39, 351; D. M. Lloyd & P. K. Stansby (1997), J. Hydraul. Eng. 123, 1068; S. M. Hajimirzaie (2023), Fluids 8, 32.
- Y. Qi, Y. Li & F. Coletti (2025), J. Fluid Mech., doi:10.1017/jfm.2025.139.
- O. M. Babiker et al. (2023), J. Fluid Mech. 964, R2, doi:10.1017/jfm.2023.370; O. M. Babiker et al. (2026), Phys. Rev. Fluids 11, 054802, doi:10.1103/bmx7-2z3h.
- L. Shen et al. (1999), J. Fluid Mech. 386, 167; M. V. Berry & J. V. Hajnal (1983), Optica Acta 30, 23.

UPLOAD NOTES
- Upload dimples-on-the-rhine{TAG}.srt as English captions (the picture has no burned-in subtitles).
- Altered or synthetic content: the narration is a synthetic voice, and the renders are simulations labelled on screen. Neither depicts a real person or a real event falsely.
"""
(HERE / f'youtube{TAG}.txt').write_text(text)
print(text[:600])
