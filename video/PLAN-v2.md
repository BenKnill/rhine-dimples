# Dimples on the Rhine: video v2 plan

Goal: a narrated video under 5 minutes that climbs the same ladder as the page, ending at
Kirchhoff's equations. It should feel more like 3Blue1Brown than v1. The signature device:
**live parameters**. The equation sits on screen; one symbol at a time is turned up or down,
it grows and brightens with an arrow showing which way and by how much, and the animation
responds live.

## The live-parameter device

- **Knob symbol.** The symbol being varied (Γ, a, g, r, d, ν ...) scales with log₂ of its
  ratio to the starting value and gets bolder and glows in its own colour. An arrow beside it
  points up or down, its length ∝ |log₂ ratio|, with a chip like `×2` or `÷6`.
- **Result symbol.** The quantity that responds (dip depth h, swirl v, pair speed V,
  lifetime ...) gets its own arrow on the same log scale, so exponents are visible: when Γ
  doubles, h's arrow is twice as long as Γ's (`×4`), and the exponent 2 in Γ² lights up.
- **Live animation.** The same parameter drives the picture beside the equation, so the
  viewer sees the dip deepen, the pair speed up, the dimple fade faster.
- **Colours.** Γ teal, a amber, g violet, r and d glass-blue, ν pink; results white. Dark
  background, STIX Two for maths, IBM Plex for labels, matching the page.

## Structure and draft script (~600 words, about 4:45)

Knob sweeps get held silences of 1–2 s so the viewer can watch the change.

| # | Beat | Narration (draft) | Picture | Knobs |
|---|---|---|---|---|
| 1 | Open | From a long wooden boat on the Rhine, a friend kept noticing small dimples on the water. Some lasted a surprisingly long time. / Each is the top of a whirlpool, and whirlpools turn out to obey Hamilton's equations: the river's surface is its own phase space. | Boat view, boils surfacing, title | — |
| 2 | The dip | Water going round in a circle needs a push toward the centre, and in water only pressure can push. So the pressure drops toward the middle, and the surface sags. / Its depth: gamma squared over eight pi squared g a squared. / Double the spin, gamma, and the dip gets four times deeper. / Widen the core, and it gets shallower, by the square again. / On the Moon, with a sixth of the gravity, the same whirlpool digs six times deeper. / The dip is a lens: it spreads sunlight in its middle and piles it up at the rim, so the riverbed shows a dark shadow ringed with light. | Cross-section with rays + top-view shadow | Γ×2 → h×4, a×2 → h÷4, g÷6 → h×6 |
| 3 | Circulation | What is gamma? Walk around a loop and add up how hard the water pushes you along. That total is the circulation. / Pull the loop out to twice the radius: the water is half as fast, but the walk is twice as long, and gamma doesn't change. / Turned around, that is the swirl of a whirlpool: v equals gamma over two pi r. | Loop around a swirling core, tracers | r×2 → v÷2, 2πr×2, Γ×1 |
| 4 | Lines | From above, a whirlpool is a point. But water is three-dimensional, and what spins is a line running down into the river; the dimple is where it meets the surface. / And a vortex line can't just stop. Slide a loop past its end: nothing crossed the loop, so its circulation is unchanged, yet it now surrounds still water and shrinks to a point, where the circulation is zero. / So the line must close into a ring, or end on the riverbed or the surface. | 3D tube, slicing plane, the Helmholtz contradiction | — |
| 5 | Pairs | Bend it into an arch with both feet on the surface, and you get two dimples spinning opposite ways. / Kelvin adds a second reason: without friction, circulation around a loop moving with the water never changes. Still water has none, so a paddle must make equal spins both ways. / Each rides the other's swirl, so the pair sails off at gamma over two pi d; bring them closer and they race. / On the Rhine the paddle is the riverbed: the shear under a racing current rolls up into arches that rise and break the surface as pairs. | Arch → pair; paddle stroke with total spin 0; pair in motion; the hairpin | d÷2 → V×2, Γ×2 → V×2 |
| 6 | Why they last | In three dimensions, the spin of a drop grows as the flow stretches it: thinner, faster, until it shatters. / At the surface the flow is flat. There is nothing to stretch, and every drop keeps its spin. / Only friction wears them down, widening the core: a squared grows by four nu t. In water a big dimple lasts minutes; in honey, a blink. | Stretch vs reshape; dimple fading | stretch×3 → ω×3; ν×5000 → lifetime÷5000; a₀×2 → lifetime×4 |
| 7 | Hamilton | Now the payoff. A pendulum's state is a point: angle across, momentum up. Hamilton's rule: the point walks the contours of the energy, across at the slope up, up at minus the slope across. / So energy is conserved, and a patch of states can stretch but never change its area. / Surface water obeys the same rule, with a landscape called the stream function. x is position, y is momentum: the surface is its own phase space. | Pendulum phase portrait → equations morph → whirlpool pair landscape | the two velocity parts as live arrows |
| 8 | Kirchhoff | And the whirlpools? Each rides the others' swirl. Collect the energy and out come Kirchhoff's equations: Hamilton's rule again, with gamma playing the part of mass. / Give one whirlpool more spin and the centre of spin slides toward it, as a centre of mass slides toward the heavier body. / Three whirlpools dance regularly; four can't: nudge one by a micron and in seconds the pattern is different. / Stirred dye stretches into filaments, but keeps exactly its area. | Kirchhoff equation built from the pieces; three-vortex dance; two four-vortex runs; camel dye | Γ₁×3 → centre of spin moves |
| 9 | Close | So a dimple drifting past on smooth water is the end of a vortex line, one half of a pair, keeping its spin because the surface is flat, and moving by Hamilton's rule. | Boat view, pull back, end card | — |

## Production

1. **Prototype the device** (`knobs_proto.html` → `proto_knobs.mp4`): beat 2's dip equation
   with three knob sweeps driving a cross-section and a top-view render. Approve the look first.
2. **Lock the script**; TTS test the tricky words first: gamma, nu, Kirchhoff, Helmholtz,
   pi (v1 issue), and "a" as a symbol (say "ay").
3. **Build `film2.html`**: deterministic `renderAt(t)`, scenes keyed to the narration timing,
   the knob component, reusing `water.js` (boat and top views) and film versions of the page
   figures (tube, hairpin, stretch, Hamilton).
4. **Voice** (VoxCPM2), ASR check, assemble, subtitles; x264 CRF 23 with a 14 Mbps cap.
5. **Review cut**, then YouTube title/description.
