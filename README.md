# Dimples on the Rhine

Small dimples on a river are the tops of whirlpools. Each one casts a shadow on the
riverbed, a dark spot inside a bright caustic ring. This project renders them and explains
why their motion is Hamiltonian: in the point-vortex model, the river surface is its own
phase space.

- Interactive page: https://benknill.github.io/rhine-dimples/
- Episode 1: [the symplectic camel](https://benknill.github.io/symplectic-camel/) · Episode 2: [running chaos backwards](https://benknill.github.io/lattice-echo/)

## The model

- **Vortices.** Point vortices with a smooth (Scully) core: swirl speed Γr / 2π(r² + a²).
  Kirchhoff's equations Γₖ dxₖ/dt = ∂H/∂yₖ, Γₖ dyₖ/dt = −∂H/∂xₖ, with
  H = −(1/4π) Σ ΓⱼΓₖ log(|zⱼ − zₖ|² + a²). A background current and a riverbank (mirror images)
  are optional.
- **Integrator.** Implicit midpoint, which is symplectic and keeps the linear and angular
  impulse exactly.
- **Surface.** Cyclostrophic balance gives the dip η(r) = −Γ² / 8π²g(r² + a²), about 1.3 mm
  deep for Γ = 60 cm²/s and a = 0.6 cm.
- **Light.** Sunlight refracts through the surface; brightness on the bed is
  1 / |det(I + k·Hess η)| with k = depth · (1 − 1/n). The dimple spreads light (dark core) and
  its rim focuses it (bright ring); where the determinant crosses zero the ring is a caustic.
- **Dye.** A closed contour advected by the flow, with points inserted where it stretches;
  its area is measured with the shoelace formula.

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
- `docs/`: the published interactive page
- `video/`: narration script, voice and render pipeline, film page
- `proto/`: checks and prototypes

Built with Claude (Anthropic's Claude Opus 5.5) in Claude Code.
