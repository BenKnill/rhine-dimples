# Dimples on the Rhine

Small dimples on a river are the tops of whirlpools. Each one casts a shadow on the
riverbed, a dark disk with a bright caustic rim. The page builds up, with small illustrations,
why vortex lines can't end in the water (Helmholtz), why whirlpools come in pairs (Kelvin),
where a river's own dimples come from (hairpin vortices from the bed), why flat flow lets them
live so long, and why their motion is Hamiltonian: the river surface is its own phase space.

- Interactive page: https://benknill.github.io/rhine-dimples/
- Episode 1: [the symplectic camel](https://benknill.github.io/symplectic-camel/) · Episode 2: [running chaos backwards](https://benknill.github.io/lattice-echo/)

## The model

- **Vortices.** Point vortices with a smooth (Scully) core: swirl speed Γr / 2π(r² + a²).
  Kirchhoff's equations Γₖ dxₖ/dt = ∂H/∂yₖ, Γₖ dyₖ/dt = −∂H/∂xₖ, with
  H = −(1/4π) Σ ΓⱼΓₖ log(|zⱼ − zₖ|² + a²), plus an optional background current.
- **Integrator.** Implicit midpoint, which is symplectic and keeps the linear and angular
  impulse exactly.
- **Surface.** Cyclostrophic balance gives the dip η(r) = −Γ² / 8π²g(r² + a²), about 1.3 mm
  deep for Γ = 60 cm²/s and a = 0.6 cm, plus a spectrum of small capillary-gravity ripples.
- **Views.** From the boat (perspective): each pixel's ray meets the water, the reflected ray
  picks up sky, clouds and a wooded far bank, the refracted ray goes down into greenish water,
  and Fresnel's law mixes the two, so dimples show by how they bend the reflections. From above:
  clear shallows, where the shadows and caustics on the bed are the main thing.
- **Light.** A fine grid of sunrays is refracted through the surface onto the bed (a ray lands
  k·∇η away, k = depth · (1 − 1/n), plus an offset for the sun's angle). Each grid triangle is
  drawn where it lands with brightness (area before) / (area after), and the results are added,
  so folds in the light give sharp caustics; a small blur stands in for the sun's disk.
- **Dye.** About 250,000 tracer particles carried on the GPU by the same velocity field; their
  density tints the water. The area is measured separately, from a closed outline advected by
  the flow with points inserted where it stretches (shoelace formula).
- **Interaction.** A paddle stroke makes a pair of opposite spins (total spin stays zero), a tap
  brings up a pair, and Boils lets the river bring up pairs on its own. Single whirlpools are a
  separate tool, standing for whirlpools whose other end is on the bed.

## Checks (`node proto/check.mjs`)

| Check | Simulated | Theory |
|---|---|---|
| Counter-rotating pair speed (Γ = 60, d = 6 cm) | 1.576 cm/s | 1.576 (smooth core) |
| Same-sign pair orbit angle after 1 s | 0.5253 rad | 0.5253 |
| Four vortices, 40 s: energy / impulses | change 4×10⁻⁹ / 10⁻¹⁴ | conserved |
| Stream-function gradient vs velocity | equal to 6 digits | equal |
| Camel dye area after 25 s of stretching | within 0.08% | conserved |

## Layout

- `web/`: the model (`vortex.js`), the WebGL water renderer (`water.js`), the camel outline
- `docs/`: the published page (`index.html`, illustrations in `figs.js`)
- `video/`: narration script, voice and render pipeline, film page
- `proto/`: checks and prototypes

Built with Claude (Anthropic's Claude Opus 5.5) in Claude Code.
