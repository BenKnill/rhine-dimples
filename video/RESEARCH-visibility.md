# Why dimples are hard to notice: lifetime, visibility, supply, and 1 June 2026

These notes were gathered on 2026-09-27. All 89 DOIs listed here were re-resolved on Crossref on 2026-09-27 and their titles match. The viewer's question: dimples are not often seen, so why not, and do we really know so little? This file extends `RESEARCH-boulders.md` and does not repeat it.

How to read it:
- Research agents checked every DOI against Crossref ("CR"). arXiv IDs were checked through the arXiv API.
- "Q" marks a number or phrase quoted from the source.
- "Inf" marks our own inference or order-of-magnitude estimate. Where the literature says nothing, the numbers are ours, and the formulas are given so they can be re-run.

---

## 0. Bottom line (for the narrator)

**Dimples are probably common. Seeing one is what's rare.** Any turbulent river keeps pushing vortices up to its surface. There they can attach and spin as small vertical whirlpools, and they outlast almost everything else in the turbulence. The catch is that the surface dip is tiny: a few hundredths of a millimetre to about a millimetre across a patch a centimetre or two wide. You never see that shape directly. You see what it does to reflected light: it warps the mirror image of the sky or bank by roughly a degree. So a dimple is only readable when four things hold at once:
- the water is a true mirror, with wind below the 1–2 m/s at which the first wind ripples form, and no rough, boiling current;
- there is something sharp to reflect, such as cloud edges, tree silhouettes or a bank line;
- you look at a low angle from close by, where water reflects 30–50% of the light instead of 2%;
- the whirlpools are strong enough, which means circulation of tens of cm²/s squeezed into a core about a centimetre wide.

On most days at least one of these fails. A breeze of 2–3 m/s buries the dimples under ripples of similar slope. A grey overcast or plain blue sky gives the tilt nothing to show. Looking down from a bridge, you mostly see into the water.

**What is well known.** The physics of a single surface-attached vortex is solid.
- A vortex line may end on a free surface (Helmholtz). Once a vortex has "connected" there, it stretches and dissipates far less than vortices in the interior (Shen et al. 1999, below).
- Its dip follows from the balance of pressure and swirl.
- Laboratory tanks and simulations show dimples form at the edges of upwellings ("boils"), are strengthened by downwelling, merge with like-signed neighbours, and are killed mainly by the next upwelling.
- In the one simulation that tracked them (Babiker et al. 2023), true attached vortices lived up to about 6.5 large-eddy times, most less than 1.5.

**What isn't known.** Nobody has published a dimple census for any real river: not how many per square metre, not how long they live, not how they vary with depth, discharge, bed roughness or natural surface films. The lab work is at Reynolds numbers 10–1000× smaller than a river's, in clean water, with no wind. The field work (infrared cameras, image velocimetry) has concentrated on boils and surface velocity, not on centimetre-scale vortices. Dimples have been proposed as a remote sensor, in simulations in 2023 and a lab tank in 2026, but have not yet been used on a river.

**What made 1 June 2026 work** (from data in §4; the interpretation is Inf).
- **Record-low flow.** The Rhine at Neuhausen carried 252 m³/s, below every earlier 1 June on record and about half the usual June flow.
  - Held back by the Schaffhausen power plant, the reach at Büsingen was only slowed, not drained: about 0.6 m/s instead of about 1.1 m/s.
  - Froude number about 0.13, so no standing waves.
  - Turbulence at the surface was about 5× weaker than on a normal June day.
- **The calmest evening in a month.** At the MeteoSwiss Schaffhausen station, the mean wind from 18:40 to 19:50 was 0.8 m/s. That was the lowest of the 32 evenings from 15 May to 15 June 2026; the median was 3.8 m/s.
  - At 17:30 the wind was still 2.0 m/s, which is at the ripple threshold, so only sheltered stretches would have been glassy.
  - From about 18:50 the whole reach could go mirror-flat.
- **Something to reflect.** Full sun from the west at 35° elevation lit the cumulus and poplars.
- **The view from a boat.**
  - A small boat puts your eye about a metre above the water, looking at grazing angles, where water reflects 30–50% of the light.
  - It drifts at the water's speed, so one dimple can be followed for its whole life. From the bank, the same dimple slides past at 0.6 m/s.
- **Time scales.** The large-eddy time was about half a minute, and a centimetre core takes about 1.5 min to diffuse. Both point to dimple lifetimes of tens of seconds to a few minutes.

---

## 1. Lifetime

### What the papers report
- **Babiker et al. 2023** (DNS: a direct numerical simulation of turbulence under a free surface). The time unit is T∞ = L∞/u_rms, the large-eddy time.
  - Read from Fig. 2(a): true attached vortices had tracked lifetimes from about 0 to about 6.5 T∞, most below about 1.5 T∞. Features that weren't vortices mostly died within 1 T∞.
  - Q: the detection threshold was 0.166 T∞. The dimple count lags mean-square surface divergence by 0.8 T∞, with correlation 0.90.
  - These are lower bounds, because a vortex lost for a moment and found again counts twice.
- **Qi, Li & Coletti 2025** (lab tank). Q: the Lagrangian time scales of surface vorticity "are significantly larger and comparable to the integral time scale", while divergence decorrelates in about a Kolmogorov time. Attached vortices "are strengthened during downwellings and diffuse when those dissipate".
- **Babiker et al. 2026** (lab tank, T∞ ≈ 3 s). Q: "the most persistent dimples far outliving the upwelling that spawned them." They did not measure lifetimes.
- **Kjellevold et al. 2026** (arXiv 2606.09205, preprint). Q: a dimple can "outlive the upwelling that caused it and travel a considerable distance."
- **Kumar, Gupta & Banerjee 1998** measured "population densities and the persistence times" in a channel. Q: these "scale with a mix of inner … and outer variables". The numbers are paywalled and not yet read. This is the key paper to get.
- **Aarnes et al. 2025.** Q: "larger vortices tend to have longer lifetimes"; no statistics.
- **Nagaosa & Handler 2003, Pan & Banerjee 1995:** qualitative only.

### Why they live long
- **They can end on the surface.** Bernal & Kwon 1989 describe "vortex lines, beginning and terminating at the free surface."
- **They stop stretching after connection.** Shen et al. 1999: "both dissipation and stretching decrease dramatically after connection. As a result, vortex structures connected to the free surface are persistent and decay slowly relative to non-connected vorticities."
- **They are killed by upwellings.** Banerjee 1994 calls them "remarkably persistent—the main annihilation mechanism being interaction with a subsequent upwelling". Pan & Banerjee 1995 say they "pair, merge, and slowly dissipate".
- **A correction to "weak stretching".** Walker et al. 1996 find surface-normal stretching "attains a maximum at the free surface". A better statement:
  - At a clean flat surface, tilting vanishes, so the stretching rate of ω_z equals −ω_z·β, where β is the surface divergence.
  - β changes sign and decorrelates quickly, so there is no sustained one-way cascade.
  - Downwelling (β < 0) spins a vortex up; upwelling (β > 0) spreads it out. That is the Qi et al. result. The −ω_z·β form is kinematics, not a quote.
- **Surface films.** Shen, Yue & Triantafyllou 2004: "the Marangoni effect decreases the horizontal turbulence intensity and normal vorticity at the surface". Up- and downwelling "effectively vanishes" at moderate Marangoni number. Tsai 1996: contamination diminishes vortex connection. No study measures dimple lifetime against contamination.
  - Inf: a film probably means fewer, weaker dimples. But a film also damps ripples, which makes the water glassier.

### Our estimates
- **Viscous decay (Lamb–Oseen).** The core grows as a² → a₀² + 4νt with Γ fixed, so the dip scales as 1/a² and the slope as 1/a³. With ν = 1.05×10⁻⁶ m²/s (water at about 18 °C):

| core a₀ | a₀²/ν | dip halves | slope halves | slope ÷10 | slope ÷100 |
|---|---|---|---|---|---|
| 0.5 cm | 24 s | 6 s | 3 s | 22 s | 2 min |
| 1 cm | 95 s | 24 s | 14 s | 87 s | 8 min |
| 2 cm | 6.3 min | 95 s | 56 s | 5.8 min | 33 min |
| 3 cm | 14 min | 3.6 min | 2.1 min | 13 min | 73 min |

  - A strong centimetre-core dimple could stay visible for minutes if viscosity alone acted. In practice upwellings and strain end it sooner. Cores under 0.5 cm fade within seconds unless downwelling keeps squeezing them (Burgers balance, §3).
- **Converting the DNS lifetimes to a river** (Inf): T∞ ≈ (H/2)/u′.

| setting | T∞ | 0.17 T∞ | 1.5 T∞ | 6.5 T∞ |
|---|---|---|---|---|
| Büsingen, 1 June 2026 (H ≈ 2.5 m, u′ ≈ 3.5 cm/s; §4) | about 35 s | 6 s | 50 s | 4 min |
| deep, slow pool (H ≈ 4 m, u′ ≈ 2.3 cm/s) | about 90 s | 15 s | 2 min | 9 min |
| free-flowing High Rhine riffle (H ≈ 1.5 m, u′ ≈ 9 cm/s) | about 8 s | 1 s | 13 s | 1 min |
| lab tank of Babiker et al. 2026 (Q) | 3 s | | | |

  - Caveat: river dimples are far smaller than L∞, so their life may instead scale with viscous time (the table above) or with local strain. Either way, a slow reach puts the lifetime at tens of seconds to a few minutes.

---

## 2. Visibility optics

### Shape of a dimple
The dip profile is η(r) = −h·a²/(r² + a²), with h = Γ²/(8π²g·a²). This is the Scully core used in the film.
- For the same Γ and a, a Rankine vortex dips 2h and a Lamb–Oseen vortex dips 2 ln2·h ≈ 1.39h.
- The slope peaks at r = a/√3, with s_max = (3√3/8)·h/a ≈ 0.65 h/a.
- A tilt s turns a reflected ray by 2s in the vertical plane that contains the line of sight.
- For a tilt across the line of sight, the turn shrinks to about 2s·tan e, where e is how far below the horizon you are looking. At e = 11° that is only 0.4s. From a low eye, you mostly see the near and far flanks of the dimple.

| Γ (cm²/s) | a (cm) | depth h | max slope | reflection turned by |
|---|---|---|---|---|
| 10 | 0.5 | 0.05 mm | 0.0067 (0.4°) | 0.8° |
| 10 | 1 | 0.013 mm | 0.0008 | 0.1° |
| 10 | 3 | 1.4 µm | 3×10⁻⁵ | invisible |
| 30 | 1 | 0.12 mm | 0.0075 (0.4°) | 0.9° |
| 60 | 0.6 (film value) | 1.3 mm | 0.14 (8°) | 16° |
| 60 | 1 | 0.46 mm | 0.030 (1.7°) | 3.5° |
| 60 | 2 | 0.12 mm | 0.0038 | 0.4° |
| 100 | 1 | 1.3 mm | 0.084 (4.8°) | 9.6° |
| 100 | 2 | 0.32 mm | 0.010 (0.6°) | 1.2° |
| 200 | 2 | 1.3 mm | 0.042 (2.4°) | 4.8° |
| 200 | 3 | 0.57 mm | 0.012 (0.7°) | 1.4° |
| 200 | 1 | 5 mm | 0.34 | a funnel; outside the small-slope model |

The takeaway (Inf): slope scales as Γ²/a³, so visibility depends very strongly on how tightly the circulation is concentrated. Γ = 30–100 cm²/s in a 1 cm core tilts the surface by 0.5–5°, enough to warp a reflection visibly. The same Γ spread over 3 cm tilts it by less than 0.2°.

### The competition: wind
- **Wrinkles below wave onset.** Paquier, Moisy & Rabaud 2016 (Q): "wrinkles" of "typically 1–10 µm" amplitude, 7–20 cm across. They already break "the perfect mirror reflection … even below the wave onset". Inf: their slopes are 10⁻³ or less, so a centimetre-core dimple of Γ ≳ 30 cm²/s beats them.
- **Onset of real waves.**
  - Q: onset is "typically in the range 1–3 m/s" (Paquier et al. 2016; tunnel air speed).
  - Q: outdoor thresholds collected in their Table I are Roll 0.4, Russell 0.85, Jeffreys 1.0–1.2 and Van Dorn 2 m/s.
  - Q: Kahma & Donelan 1988 saw growth begin at friction velocity u* ≈ 2 cm/s, with initial wavelets "about 10 μm high". Water temperature shifts the wind speed at which waves "become readily visible".
  - Q: Cavaleri et al. 2024 put the first wavelets in the open sea at "close to 1.8 m/s".
  - Q: Russell, quoted by Kelvin, noted that "a very slight wind first destroys the perfect mirror reflection".
- **Once ripples exist.** Q: Cox & Munk 1954 give clean-surface mean-square slope ≈ 0.003 + 5.12×10⁻³W (W in m/s at 12.5 m), measured at 0.72 m/s as σ² ≈ 0.0083 and at 1.83 m/s as 0.0144. That is an rms slope of 0.09–0.12, i.e. 5–7°. The ocean swell sets a floor, so these overstate a river, but capillary ripples (λ ≈ 1.7 cm, like a dimple) with slopes of order 0.1 swamp nearly every dimple in the table.
- **Machine-vision evidence.** Gakhar, Koseff & Ouellette 2020 (Q): a fan breeze of 1.6–2.6 m/s, measured 2 cm above the water, dropped the accuracy of a classifier that reads surface features from about 88% to 33–36% (chance is 25%).
- **Beaufort scale.** Met Office Fact sheet 6: force 0 is 0–0.2 m/s, "Sea like a mirror". Force 1 is 0.3–1.5 m/s, "Ripples with the appearance of scales".

### The mirror needs something to reflect (Inf, with Fresnel and a standard sky model)
- **Fresnel reflectance of water** (n = 1.333, unpolarised; our calculation, which matches Cox & Munk's table):

| looking down at | 90° (overhead) | 39° (bridge 8 m up, 10 m out) | 22° | 11° (eye 1.2 m, 6 m out) | 6° (12 m out) |
|---|---|---|---|---|---|
| reflectance | 2.0% | 3.6% | 11% | 31% | 54% |

  From a boat you see mainly the reflected sky and bank. From a bridge you see mainly light from inside the water, which a dimple barely changes.
- **Uniform overcast** (CIE overcast sky, L ∝ 1 + 2 sin(elevation)). At a view 11° below the horizon, a tilt of 1° changes the Fresnel term by about −10% and the reflected-sky term by about +5%, and the two partly cancel. Net: a slope of 0.01 makes a spot only about 3% brighter or darker. A slope of 0.003 makes about 1%, too faint to see. Plain blue sky away from the sun behaves about the same.
- **Textured scene** (cumulus limbs, poplar silhouettes, the bank line). A dimple maps a patch of sky 2s high into a footprint of a few arcminutes. If a sharp edge lies within that patch, the spot takes on the full edge contrast, often 50% or more: a bright blob in a dark tree reflection, or a dark notch in a bright cloud. For s = 0.003, 2s = 21 arcmin, and cloud edges and foliage have structure on that scale. So texture lowers the slope needed to see a dimple from about 0.01–0.02 to about 0.003–0.005, which is 2× less circulation (because s ∝ Γ²). Visible dimples should flicker as they drift across reflected edges. This could be tested in the footage.
- **Angular size.** A 2 cm dimple seen from an eye 1.2 m above the water, 6 m away, subtends 11 × 2 arcmin. From a bridge 8 m up and 20 m away it subtends 3 × 1 arcmin. Either is resolvable, but only the boat view is also at high reflectance.
- **Why reflection imaging is hard to quantify.** Jähne, Klinke & Waas 1994 (Q): reflection methods are "useful only for deriving wave-slope statistics". Stereo has a "correspondence problem". Refraction is the reliable route. This is why labs image dimples with refraction or projection instead:
  - synthetic Schlieren: Moisy, Rabaud & Salsac 2009; Wildeman 2018; Ruth & Coletti 2026 preprint;
  - fringes projected onto fluorescein-dyed water, "avoiding specular reflections": Babiker et al. 2026, who note the dimples were "clearly visible by eye".

### Shadows on the bed
- Berry & Hajnal 1983 (Q): "Most people have noticed the sun-shadows cast on river beds by … vortices which dissipate whilst drifting". They derive the dark disk with a cusped caustic ring and note "the shadow disappears abruptly as the cusped ring passes the bottom". Berry thought the shadows were a common sight, in clear, shallow, sunny water.
- **How deep the shadow works** (Inf). A tilt s moves a sunbeam at depth d by (1 − 1/n)·s·d ≈ 0.25·s·d. The sun's disk (0.53°, 0.40° in water) blurs the shadow by 0.7 cm per metre of depth.
  - s = 0.03 at d = 0.5 m moves the beam 0.4 cm, with 0.35 cm blur: crisp.
  - At d = 4 m the blur is 2.8 cm, larger than the dimple.
  - So crisp dimple shadows need water under about 1–1.5 m that is clear enough to see the bed. On a deep backwater you see only the reflection.

---

## 3. Supply

What the literature says, and how it maps onto a gentle, deep, gravel-bed backwater:

- **Bed turbulence, then boils, then attached vortices at the boil edges.** Pan & Banerjee 1995; Banerjee 1994; Kumar et al. 1998; Shen et al. 1999; Nagaosa & Handler 2003. Bursts from the bed rise as upwellings; attached vortices form where the spreading upwelling meets a downwelling. The rate scales with u* and depth (outer variables: Jackson 1976).
  - Inf for Büsingen on 1 June 2026 (§4: U ≈ 0.63 m/s, mean depth H ≈ 2.5 m, gravel with fines, k_s ≈ 5–10 cm):
    - u* ≈ 4–4.6 cm/s and near-surface u′ ≈ 3.5–3.9 cm/s (Nezu & Nakagawa: u′/u* ≈ 2.3e^(−z/H) ≈ 0.85 at the surface);
    - near-surface dissipation ε ≈ 0.5u*³/H ≈ 1.3–1.9×10⁻⁵ m²/s³;
    - Kolmogorov scale 0.5 mm, time 0.25 s;
    - H/u* ≈ 55–60 s, and one upwelling per depth-sized patch every roughly 6–30 s.
  - At a typical June flow (about 510 m³/s, U ≈ 1.1 m/s, H ≈ 3 m), ε is about 5× larger, 6×10⁻⁵ m²/s³.
  - A free-flowing riffle (U ≈ 1.2 m/s, H ≈ 1.5 m) is about 20–30× larger still, 4×10⁻⁴ m²/s³.
  - Scaling ε ∝ U³/H, impounding and low flow together cut surface turbulence by 1–2 orders of magnitude.
  - Guseva et al. 2021 found near-surface ε of 10⁻¹⁰ to 10⁻⁵ m²/s³ in a regulated Finnish river, where wind and heat flux mattered as often as the bed.
- **Where a centimetre whirlpool gets its circulation** (Inf). An inertial-range loop of size ℓ carries Γ ~ ε^(1/3)ℓ^(4/3). At Büsingen on 1 June that is about 30 cm²/s for ℓ = 20 cm, 100 cm²/s for 50 cm, and 240 cm²/s for 1 m.
  - A visible dimple (Γ ≈ 30–100 cm²/s) therefore has to gather the circulation of a patch about 0.2–0.5 m across into a 1 cm core.
  - A downwelling does exactly this. By Kelvin's theorem, a converging surface patch keeps its circulation while its area shrinks.
  - The core settles where convergence balances diffusion (a Burgers vortex): a = √(4ν/β). That gives a ≈ 2 cm for β = 0.01 s⁻¹, 0.9 cm for 0.05 s⁻¹, and 0.46 cm for 0.2 s⁻¹. Centimetre cores are what modest, persistent convergence produces. This fits Qi et al. 2025 and Babiker's dimple-count/divergence link.
  - The circulation budget scales as ε^(1/3), and the slope as Γ²/a³. So a slow river makes fewer strong dimples, but its surface is far quieter:
    - turbulent surface bumps of order u′²/g ≈ 0.12 mm at Büsingen on 1 June, against 0.4 mm at a typical June flow and 0.8 mm in a riffle;
    - Froude number 0.13, so no standing waves.
  - This trade-off is the heart of the answer. Fast rivers make more dimples but hide them. Still water hides nothing but makes none. A gently flowing, glassy reach sits in between.
- **Lateral shear layers** at banks, groyne fields, weed edges and confluences. These make vertical-axis eddies spanning the depth.
  - Uijttewaal & Tukker 1998 (Q): eddies "extend from one tenth of the water depth up to the free surface".
  - White & Nepf 2007: at a vegetation edge, vortices are about 2δ wide with a wavelength of about 10δ. The surface flow spirals outward from the core, i.e. it upwells.
  - Constantinescu et al. 2011: at confluences, the eddies alternate sign in wake mode and co-rotate in Kelvin–Helmholtz mode.
  - Uijttewaal 2011: a shear layer caused only by a change in bed roughness made no large eddies.
  - These eddies are metres across and weak. Inf: centimetre dimples are more likely the intense small vortices embedded at their edges.
  - Relevance: the Büsingen banks have jetties, moored boats, reed and tree margins, and bridge piers upstream (Diessenhofen) and downstream (Schaffhausen). These are likely local factories. Pier-shed dimples are proven in the Nidelva photo (`RESEARCH-boulders.md`).
- **Bed prominences.** See `RESEARCH-boulders.md`. Correction for an impounded reach: the power plant holds its pool at 390.80 m at Feuerthalen, and on 1 June Diessenhofen was only about 0.3 m below its mean level (§4). So at Büsingen the low flow made the reach slower, not much shallower (Inf: roughly 0.1–0.3 m lower). The "low water brings the bed closer" argument is weak here.
  - The Masterplan notes that former rock outcrops on the High Rhine are now submerged and that the armoured gravel in the impoundments is widely covered with fines. That suggests fewer sharp bed obstacles than on a free-flowing reach (Inf).
- **The boat itself.**
  - Q: Shen, Zhang & Yue 2002 found "persistent surface-normal vorticity" in the wakes of towed hulls.
  - Olivieri et al. 2007: breaking bow and shoulder waves shed vortices along the hull.
  - Grift et al. 2021: an oar blade leaves vortex pairs.
  - The key physics (Kelvin, Helmholtz): in the boat's frame the water ahead of the bow is irrotational. A boat can only put vorticity into water it has touched, so its dimples appear beside and behind it, never ahead.
  - Dimples seen ahead of the bow, or while drifting with the motor off, came with the river. The film's "not behind" point stands: behind the motor, the wake's turbulence and ripples hide everything.

---

## 4. The Büsingen reach on 1 June 2026

### 4a. The reach
Confidence: H = high, M = medium, L = low.

**The power plant**
- Kraftwerk Schaffhausen was built 1961–67 (first power 1963) to replace the Moserdamm.
- 26 MW, gross head 7.8 m, two Kaplan turbines. H. Source: BFE hydropower statistics (WASTA), geo.admin layer `ch.bfe.statistik-wasserkraftanlagen`, entry 106200.
- Pool level 390.80 m a.s.l. at the Feuerthalen bridge. M (Wikipedia). This agrees with Masterplan Bild 6.3.
- The concession runs 13.6 km, from the Flurlingerbrücke to the "Bleiche" at Diessenhofen. The Rhine flows freely only from Lake Constance to Diessenhofen. H.
  - Source: *Masterplan Massnahmen zur Reaktivierung des Geschiebehaushalts im Hochrhein* (BFE / RP Freiburg, 2013), p. 20, https://pubdb.bfe.admin.ch/de/publication/download/6967

**Channel**
- **Width:** mean channel width 160 m from Stein am Rhein to Altparadies. H. Source: Kanton Thurgau / Hunziker Zarn & Partner, *Ufersanierung Hochrhein*, report A-885, 2018.
  - Our transects across the swissALTI3D terrain model give 145–200 m at Büsingen. M.
- **Velocity at mean flow** (367 m³/s, from the Masterplan's 1D model, Bild 6.25; M):
  - Diessenhofen: 1.0–1.2 m/s
  - **Büsingen (Rhine km 38.5–41): 0.8–0.95 m/s**
  - last 3 km: 0.6–0.9 m/s
- **Depth:** 4–7 m in the deepest channel near Büsingen at mean flow (Bild 6.3, read from the chart; M). The implied mean depth is about 2.6 m. No public bathymetry exists.
- **Bed** (Masterplan pp. 37–49; H):
  - There is almost no gravel supply upstream of the Thur.
  - In the impoundments the coarse, armoured bed is widely covered with fines.
  - Former rock outcrops are submerged.
  - The historic rapids at the Moserdamm are drowned.
- **Shore structures** (L, from search snippets): the Schaarenwiese shore opposite Büsingen was given stumps, logs, boulders and stone groynes. These are likely local vortex sources.
- **Colour only:** canoe guides mention a current of 3–4 km/h and "many piles in the current". A 2019 swim account describes the water as about 18 °C and "nicely clear". No source names particular eddies in this reach.

**Flow and levels around 1 June 2026** (BAFU hydrodaten; 2026 values provisional; H)
- **Neuhausen (station 2288), daily mean discharge on 1 June: 251.6 m³/s.**
  - The earlier minimum for 1 June was 265.0 m³/s; the median is 511.
  - The long-term June mean is 559 m³/s (1959–2025); June 2026 averaged 277.
  - We re-read the 251.6 and 265.0 values in the downloaded BAFU plot data.
- **Untersee at Berlingen (station 2043): 394.88 m.** The date median is 395.86 m (−0.98 m) and the earlier date minimum 395.09 m.
- **Diessenhofen** (Kanton Thurgau gauge, raw data): about 391.70 m against a mean of 391.98 m, about 270 m³/s. M.
- **Boats:** the URh boat operator ran low-water service (Schaffhausen–Diessenhofen round trips) until 18 June, and closed the stretch again from 27 June (URh press releases).
- **Water temperature:** 18.4 °C daily mean at Neuhausen on 1 June (June mean 18.1 °C). The outflow from Lake Constance carries essentially no suspended sediment (Masterplan p. 49). No Secchi depth was found.

**Our derived numbers for Büsingen on 1 June** (M; the depth is the main uncertainty)
- Q = 252 m³/s, W = 160 m, H ≈ 2.5 m.
- U = Q/(W·H) ≈ 0.63 m/s (range 0.5–0.75). Scaling the Masterplan velocity by discharge gives the same.
- Fr = U/√(gH) ≈ 0.13.
- Re = UH/ν ≈ 1.5×10⁶.
- The deepest channel (5–6 m) runs at perhaps 0.7–0.8 m/s.

"Gentle" is right for how it looked. For comparison, the same reach carries about 1.1 m/s at a normal June flow.

### Weather at the time: measured
Source: MeteoSwiss open data, station Schaffhausen (SHA, 8.620 E / 47.690 N, about 5 km west of Büsingen, on higher ground). File `ogd-smn_sha_t_recent.csv`, 10-minute values; times converted from UTC to local summer time.

| local time | 10-min mean wind (10 m) | gust | sunshine | air temperature |
|---|---|---|---|---|
| 17:00 | 1.6 m/s | 4.3 | 10/10 min | 24.1 °C |
| 17:30 | 2.0 m/s | 3.9 | 10/10 | 23.6 °C |
| 18:00 | 2.8 m/s | 4.7 | 10/10 | 24.0 °C |
| 18:30 | 2.0 m/s | 3.9 | 10/10 | 23.7 °C |
| 18:50 | 0.8 m/s | 1.9 | 10/10 | 23.6 °C |
| 19:00 | 0.6 m/s | 1.4 | 10/10 | 23.4 °C |
| 19:30 | 0.4 m/s | 1.1 | 10/10 | 23.0 °C |
| 19:50 | 0.3 m/s | 0.9 | 0/10 | 21.9 °C |

- The wind was from the southwest to west until about 19:40, then turned east.
- It stayed at 0.3–0.9 m/s until about 21:10, then picked up to about 2 m/s from the northeast.
- Timestamps are UTC in the file. This was checked against the day's radiation: sunset at about 21:20 and sunrise at about 05:30 local, as expected.
- The ERA5 reanalysis (Open-Meteo archive) agrees: 1.5 m/s at 17:00, 1.2 at 19:00, 0.4 at 20:00.
- **How unusual this was.** Over the 32 evenings from 15 May to 15 June 2026:
  - At 17:30 local, the wind averaged 4.5 m/s (median 3.6), and only 1 evening in 32 was under 1 m/s.
  - Averaged over 18:40–19:50 local, 1 June was the calmest of the 32, at 0.8 m/s. The next calmest was 1.6 m/s, and the median 3.8 m/s.
  - So in that month, an evening calm on the river was the exception, not the rule.
- Inf: at 17:30 the open-exposure wind was right at the ripple threshold. Stretches of river sheltered by trees and banks would have been glassy. From about 18:50 the whole reach should have been close to a mirror.
- The station saw continuous sun until about 19:40, which fits sunlit cumulus.

### Sun
Our calculation, at 47.696 N, 8.690 E:
- 17:30: altitude 35°, azimuth 265° (due west)
- 18:30: 25°, azimuth 276°
- 19:50: 12°, azimuth 290°

The river runs roughly east–west here, so the evening sun stood downstream. Looking upstream or across, the reflected sky held front-lit cumulus and sunlit trees: bright, high-contrast edges.

---

## 5. Turning "watch from a bridge" into a measurement

**State of the art.** Image velocimetry already uses natural surface texture.
- STIV (Fujita, Watanabe & Tsubaki 2007). Q: the brightness variation "is mainly caused by surface ripples generated by the confliction of boil vortices against the water surface". The same paper warns that float timing fails "when a float is trapped by a locally generated vortex".
- SSIV (Leitão et al. 2018; Photrack, Zurich): tracks "moving surface structures" with no seeding.
- LSPIV (Fujita, Muste & Kruger 1998; Muste et al. 2008); the benchmark set of Perks et al. 2020; RIVeR; KLT-IV; drones (Tauro et al. 2016).
- Legleiter & Kinzel 2020 track "boil vortices".
- Trieu et al. 2024 use natural floaters.

**Infrared.** Chickadel et al. 2011; Talke et al. 2013; Branch et al. 2021 (bed drag from surface turbulence); Johnson & Cowen 2016–17 (bed stress and bathymetry from surface dissipation, in flumes).

**Surface waves.** Dolcetti et al. 2016, 2022: discharge from turbulence-generated surface waves.

**Dimples as a proxy.** Babiker et al. 2023 (DNS): dimple count tracks mean-square surface divergence (r = 0.90), which controls gas transfer. It is confirmed in a lab tank (Babiker et al. 2026). Ferran et al. 2026 (preprint, open channel) found only a weak global correlation. **No field campaign has counted dimples on a real river.**

**Citizen science.**
- CrowdWater (University of Zurich; Seibert et al. 2019) uses virtual staff gauges, for example on a bridge pillar.
- Davids et al. 2019: citizen float timings had 63% mean absolute error, against 41% for experts.
- Phone-video guidance (Jolley et al. 2021):
  - a steady frame rate above 5 Hz;
  - a view as near to overhead as possible;
  - at least 4 ground control points at water level;
  - Eltner et al. 2020 add: tilt no more than 10° from vertical on moving platforms.

**What a bridge observer could do** (Inf).
- **Surface speed by timing dimples.** Dimples are natural floats that live long enough (tens of seconds) to be timed over 10–20 m. Multiply by about 0.8 for depth-mean velocity (Hauet et al. 2018). Stay away from piers, since their own shed vortices are biased.
- **A dimple-rate index.** Dimples per m² per minute, logged with wind, sky type and discharge, would be the first field baseline. The optics above mean every count must record wind (keep only < 1 m/s), sky texture and viewing angle, or the counts measure the weather instead of the river.
- **Lifetimes.** Follow single dimples from a drifting boat, or with a camera that pans with the flow. That gives the first field lifetime distribution, to compare with Babiker's 0.2–6.5 T∞.
- **The awkward fact.** The ideal camera for velocimetry looks straight down, and that is where dimples are least visible by reflection (2% reflectance). A dimple survey wants a low, oblique camera and a textured backdrop, or polarisation filtering. Or it can use clear shallow water with sun, where Berry's bed shadows do the work.

---

## 6. Order-of-magnitude summary

| quantity | value | source |
|---|---|---|
| Dimple dip, Γ = 30–100 cm²/s, a = 1 cm | 0.1–1.3 mm | Inf, h = Γ²/8π²ga² |
| Peak slope, same | 0.008–0.08 (0.4–5°) | Inf, 0.65 h/a |
| Reflection turned by | 2 × slope: about 1–10° | geometry |
| Wind wrinkles below onset | 1–10 µm, slope ≲ 10⁻³ | Paquier et al. 2016 |
| Wind speed for first ripples | lab 1–3 m/s; field about 0.4–2 m/s | Paquier et al. 2016; Cavaleri et al. 2024 |
| Ripple rms slope at 1–2 m/s | about 0.09–0.12 | Cox & Munk 1954 (ocean, upper bound) |
| Reflectance: bridge view vs boat view | 2–4% vs 30–50% | Fresnel |
| Contrast of a slope 0.01 under plain overcast | about 3% | Inf, Fresnel + CIE sky |
| Slope needed with textured vs plain reflection | about 0.003 vs about 0.01–0.02 | Inf |
| Viscous time a²/ν, a = 0.5 / 1 / 2 cm | 24 s / 95 s / 6 min | ν = 1.05 mm²/s |
| DNS lifetime of attached vortices | up to about 6.5 T∞, most < 1.5 T∞ | Babiker et al. 2023 |
| Discharge at Neuhausen, 1 June 2026 | 252 m³/s; earlier 1 June minimum 265, median 511 | BAFU |
| Büsingen on 1 June: U, H, Fr, Re | about 0.63 m/s, 2.5 m, 0.13, 1.5×10⁶ | Inf, from BAFU + Masterplan |
| u*, near-surface u′ | about 4–4.6 cm/s, 3.5–3.9 cm/s | Inf, log law + Nezu & Nakagawa |
| T∞ ≈ (H/2)/u′ | about 35 s, so lifetimes of about 5 s to 4 min | Inf + Babiker et al. 2023 |
| Near-surface ε: 1 June / typical June / riffle | 1.5×10⁻⁵ / 6×10⁻⁵ / 4×10⁻⁴ m²/s³ | Inf |
| Circulation of a 0.2 / 0.5 / 1 m loop (1 June) | 30 / 100 / 240 cm²/s | Inf, ε^(1/3)ℓ^(4/3) |
| Burgers core for convergence 0.01–0.2 s⁻¹ | 2 cm to 0.5 cm | Inf, √(4ν/β) |
| Depth limit for crisp bed shadows | about 1–1.5 m | Inf, sun-disk blur 0.7 cm/m |
| Wind at Schaffhausen, 17:30 → 19:30 | 2.0 → 0.4 m/s; calmest evening of 32 | MeteoSwiss SHA |
| Sun at 17:30 / 19:50 | altitude 35° / 12°, due west | calculation |

---

## 7. Citations

Every entry was checked on Crossref unless marked otherwise; items from `RESEARCH-boulders.md` are not repeated.

### Lifetime and dynamics
- Shen, L., Zhang, X., Yue, D.K.P. & Triantafyllou, G.S. (1999). The surface layer for free-surface turbulent flows. *J. Fluid Mech.* 386:167–212. doi:10.1017/S0022112099004590
- Shen, L., Triantafyllou, G.S. & Yue, D.K.P. (2000). Turbulent diffusion near a free surface. *J. Fluid Mech.* 407:145–166. doi:10.1017/S0022112099007466
- Shen, L., Yue, D.K.P. & Triantafyllou, G.S. (2004). Effect of surfactants on free-surface turbulent flows. *J. Fluid Mech.* 506:79–115. doi:10.1017/S0022112004008481
- Pan, Y. & Banerjee, S. (1995). A numerical study of free-surface turbulence in channel flow. *Phys. Fluids* 7:1649–1664. doi:10.1063/1.868483
- Kumar, S., Gupta, R. & Banerjee, S. (1998). An experimental investigation of the characteristics of free-surface turbulence in channel flow. *Phys. Fluids* 10:437–456. doi:10.1063/1.869573
- Banerjee, S. (1994). Upwellings, downdrafts, and whirlpools: dominant structures in free surface turbulence. *Appl. Mech. Rev.* 47(6S):S166–S172. doi:10.1115/1.3124398
- Nagaosa, R. (1999). Direct numerical simulation of vortex structures and turbulent scalar transfer across a free surface in a fully developed turbulence. *Phys. Fluids* 11:1581–1595. doi:10.1063/1.870020
- Nagaosa, R. & Handler, R.A. (2003). Statistical analysis of coherent vortices near a free surface in a fully developed turbulence. *Phys. Fluids* 15:375–394. doi:10.1063/1.1533071
- Rashidi, M. & Banerjee, S. (1988). Turbulence structure in free-surface channel flows. *Phys. Fluids* 31:2491–2503. doi:10.1063/1.866603
- Perot, B. & Moin, P. (1995). Shear-free turbulent boundary layers. Part 1. *J. Fluid Mech.* 295:199–227. doi:10.1017/S0022112095001935
- Walker, D.T., Leighton, R.I. & Garza-Rios, L.O. (1996). Shear-free turbulence near a flat free surface. *J. Fluid Mech.* 320:19–51. doi:10.1017/S0022112096007446
- Guo, X. & Shen, L. (2010). Interaction of a deformable free surface with statistically steady homogeneous turbulence. *J. Fluid Mech.* 658:33–62. doi:10.1017/S0022112010001539
- Babiker, O.M., Bjerkebæk, I., Xuan, A., Shen, L. & Ellingsen, S.Å. (2023). Vortex imprints on a free surface as proxy for surface divergence. *J. Fluid Mech.* 964:R2. doi:10.1017/jfm.2023.370
- Aarnes, J.R., Babiker, O.M., Xuan, A., Shen, L. & Ellingsen, S.Å. (2025). Vortex structures under dimples and scars in turbulent free-surface flows. *J. Fluid Mech.* 1007:A38. doi:10.1017/jfm.2025.72
- Qi, Y., Li, Y. & Coletti, F. (2025). Small-scale dynamics and structure of free-surface turbulence. *J. Fluid Mech.* 1007:A3. doi:10.1017/jfm.2025.139
- Babiker, O.M., Aarnes, J.R., Semati, A. et al. (2026). Experimental investigation relating free-surface features to subsurface turbulence. *Phys. Rev. Fluids* 11:054802. doi:10.1103/bmx7-2z3h (arXiv 2510.03732)
- Kjellevold, D.R., Aarnes, J.R., Babiker, O.M., Ellingsen, S.Å. & Steinsland, I. (2026). On the spatial statistics of free-surface turbulence and the complementarity of 'dimples' and 'scars'. arXiv:2606.09205 (preprint; arXiv only).
- Ferran, A., Semati, A., Rouaud, A., Hearst, R.J. & Ellingsen, S.Å. (2026). Sub-surface turbulence and free-surface features. arXiv:2605.26746 (preprint; arXiv only).
- Ruth, D.J. & Coletti, F. (2026). Free-surface curvature and its relation to subsurface turbulence. arXiv:2608.04687 (preprint; arXiv only).
- Bernal, L.P. & Kwon, J.T. (1989). Vortex ring dynamics at a free surface. *Phys. Fluids A* 1:449–451. doi:10.1063/1.857468
- Bernal, L.P., Hirsa, A., Kwon, J.T. & Willmarth, W.W. (1989). On the interaction of vortex rings and pairs with a free surface for varying amounts of surface active agent. *Phys. Fluids A* 1:2001–2004. doi:10.1063/1.857472
- Gharib, M. & Weigand, A. (1996). Experimental studies of vortex disconnection and connection at a free surface. *J. Fluid Mech.* 321:59–86. doi:10.1017/S0022112096007641
- Hirsa, A. & Willmarth, W.W. (1994). Measurements of vortex pair interaction with a clean or contaminated free surface. *J. Fluid Mech.* 259:25–45. doi:10.1017/S0022112094000029
- Zhang, C., Shen, L. & Yue, D.K.P. (1999). The mechanism of vortex connection at a free surface. *J. Fluid Mech.* 384:207–241. doi:10.1017/S0022112099004243
- Tsai, W.-T. (1996). Impact of a surfactant on a turbulent shear layer under the air–sea interface. *J. Geophys. Res.* 101:28557–28568. doi:10.1029/96JC02802
- Tsai, W.-T. (1998). Vortex dynamics beneath a surfactant-contaminated ocean surface. *J. Geophys. Res.* 103:27919–27930. doi:10.1029/98JC02548
- Savelsberg, R. & van de Water, W. (2009). Experiments on free-surface turbulence. *J. Fluid Mech.* 619:95–125. doi:10.1017/S0022112008004369
- Burgers, J.M. (1948). A mathematical model illustrating the theory of turbulence. *Adv. Appl. Mech.* 1:171–199. doi:10.1016/S0065-2156(08)70100-5

### Optics and wind
- Kahma, K.K. & Donelan, M.A. (1988). A laboratory study of the minimum wind speed for wind wave generation. *J. Fluid Mech.* 192:339–364. doi:10.1017/S0022112088001892
- Donelan, M.A. & Plant, W.J. (2009). A threshold for wind-wave growth. *J. Geophys. Res.* 114:C07012. doi:10.1029/2008JC005238
- Paquier, A., Moisy, F. & Rabaud, M. (2015). Surface deformations and wave generation by wind blowing over a viscous liquid. *Phys. Fluids* 27:122103. doi:10.1063/1.4936395
- Paquier, A., Moisy, F. & Rabaud, M. (2016). Viscosity effects in wind wave generation. *Phys. Rev. Fluids* 1:083901. doi:10.1103/PhysRevFluids.1.083901
- Perrard, S., Lozano-Durán, A., Rabaud, M., Benzaquen, M. & Moisy, F. (2019). Turbulent windprint on a liquid surface. *J. Fluid Mech.* 873:1020–1054. doi:10.1017/jfm.2019.318
- Nové-Josserand, C. et al. (2020). Effect of a weak current on wind-generated waves in the wrinkle regime. *Phys. Rev. Fluids* 5:124801. doi:10.1103/PhysRevFluids.5.124801
- Cavaleri, L., Langodan, S., Pezzutto, P. & Benetazzo, A. (2024). The earliest stages of wind wave generation in the open sea. *J. Phys. Oceanogr.* 54:755–766. doi:10.1175/JPO-D-23-0217.1
- Cox, C. & Munk, W. (1954). Measurement of the roughness of the sea surface from photographs of the sun's glitter. *J. Opt. Soc. Am.* 44:838–850. doi:10.1364/JOSA.44.000838
- Alpers, W. & Hühnerfuss, H. (1989). The damping of ocean waves by surface films: a new look at an old problem. *J. Geophys. Res.* 94:6251–6265. doi:10.1029/JC094iC05p06251
- Jähne, B., Klinke, J. & Waas, S. (1994). Imaging of short ocean wind waves: a critical theoretical review. *J. Opt. Soc. Am. A* 11:2197–2209. doi:10.1364/JOSAA.11.002197
- Zhang, X. & Cox, C.S. (1994). Measuring the two-dimensional structure of a wavy water surface optically: a surface gradient detector. *Exp. Fluids* 17:225–237. doi:10.1007/BF00203041
- Moisy, F., Rabaud, M. & Salsac, K. (2009). A synthetic Schlieren method for the measurement of the topography of a liquid interface. *Exp. Fluids* 46:1021–1036. doi:10.1007/s00348-008-0608-z
- Wildeman, S. (2018). Real-time quantitative Schlieren imaging by fast Fourier demodulation of a checkered backdrop. *Exp. Fluids* 59:97. doi:10.1007/s00348-018-2553-9
- Stilwell, D. (1969). Directional energy spectra of the sea from photographs. *J. Geophys. Res.* 74:1974–1986. doi:10.1029/JB074i008p01974
- Berry, M.V. & Hajnal, J.V. (1983). The shadows of floating objects and dissipating vortices. *Optica Acta* 30:23–40. doi:10.1080/713821046
- Gakhar, S., Koseff, J.R. & Ouellette, N.T. (2020). On the surface expression of bottom features in free-surface flow. *J. Fluid Mech.* 900:A41. doi:10.1017/jfm.2020.548
- Gakhar, S., Koseff, J.R. & Ouellette, N.T. (2022). *Exp. Fluids* 63:138. doi:10.1007/s00348-022-03491-w
- Minnaert, M. (1993). *Light and Color in the Outdoors*. Springer. doi:10.1007/978-1-4612-2722-9 (colour only)
- Met Office, National Meteorological Library Fact sheet 6: The Beaufort scale (no DOI).
- CIE S 011/E:2003, Spatial distribution of daylight: CIE standard general sky (standard overcast sky model; no DOI).

### Supply, shear layers, boats
- Uijttewaal, W.S.J. & Tukker, J. (1998). Development of quasi two-dimensional structures in a shallow free-surface mixing layer. *Exp. Fluids* 24:192–200. doi:10.1007/s003480050166
- Uijttewaal, W.S.J. & Booij, R. (2000). Effects of shallowness on the development of free-surface mixing layers. *Phys. Fluids* 12:392–402. doi:10.1063/1.870317
- Uijttewaal, W.S.J., Lehmann, D. & van Mazijk, A. (2001). Exchange processes between a river and its groyne fields: model experiments. *J. Hydraul. Eng.* 127(11):928–936. doi:10.1061/(ASCE)0733-9429(2001)127:11(928)
- Uijttewaal, W.S.J. (2005). Effects of groyne layout on the flow in groyne fields: laboratory experiments. *J. Hydraul. Eng.* 131(9):782–791. doi:10.1061/(ASCE)0733-9429(2005)131:9(782)
- Uijttewaal, W.S.J. (2011). Horizontal mixing in shallow flows. Proc. 34th IAHR World Congress, Brisbane, 3808–3814 (not in Crossref; TU Delft repository).
- Sukhodolov, A., Uijttewaal, W.S.J. & Engelhardt, C. (2002). On the correspondence between morphological and hydrodynamical patterns of groyne fields. *Earth Surf. Process. Landf.* 27:289–305. doi:10.1002/esp.319
- Sukhodolov, A.N. & Rhoads, B.L. (2001). Field investigation of three-dimensional flow structure at stream confluences: 2. Turbulence. *Water Resour. Res.* 37:2411–2424. doi:10.1029/2001WR000317
- Rhoads, B.L. & Sukhodolov, A.N. (2004). *Water Resour. Res.* 40:W06304. doi:10.1029/2003WR002811
- Constantinescu, G. et al. (2011). *Water Resour. Res.* 47:W05507. doi:10.1029/2010WR010018
- Constantinescu, G. et al. (2012). *J. Geophys. Res. Earth Surf.* 117:F04028. doi:10.1029/2012JF002452
- Jirka, G.H. (2001). Large scale flow structures and mixing processes in shallow flows. *J. Hydraul. Res.* 39:567–573. doi:10.1080/00221686.2001.9628285
- Chen, D. & Jirka, G.H. (1998). Linear stability analysis of turbulent mixing layers and jets in shallow water layers. *J. Hydraul. Res.* 36:815–830. doi:10.1080/00221689809498605
- White, B.L. & Nepf, H.M. (2007). Shear instability and coherent structures in shallow flow adjacent to a porous layer. *J. Fluid Mech.* 593:1–32. doi:10.1017/S0022112007008415
- Horoshenkov, K.V. et al. (2013). *J. Geophys. Res. Earth Surf.* 118:1864–1876. doi:10.1002/jgrf.20117
- Dolcetti, G., Horoshenkov, K.V., Krynkin, A. & Tait, S.J. (2016). Frequency-wavenumber spectrum of the free surface of shallow turbulent flows over a rough boundary. *Phys. Fluids* 28:105105. doi:10.1063/1.4964926
- Nezu, I. (2005). Open-channel flow turbulence and its research prospect in the 21st century. *J. Hydraul. Eng.* 131:229–246. doi:10.1061/(ASCE)0733-9429(2005)131:4(229)
- Nezu, I. & Nakagawa, H. (1993/2017). *Turbulence in Open-Channel Flows*. doi:10.1201/9780203734902
- Cameron, S.M., Nikora, V.I. & Stewart, M.T. (2017). Very-large-scale motions in rough-bed open-channel flow. *J. Fluid Mech.* 814:416–429. doi:10.1017/jfm.2017.24
- Guseva, S. et al. (2021). Variable physical drivers of near-surface turbulence in a regulated river. *Water Resour. Res.* 57:e2020WR027939. doi:10.1029/2020WR027939
- Jackson, R.G. (1976). Sedimentological and fluid-dynamic implications of the turbulent bursting phenomenon in geophysical flows. *J. Fluid Mech.* 77:531–560. doi:10.1017/S0022112076002243
- Reed, A.M. & Milgram, J.H. (2002). Ship wakes and their radar images. *Annu. Rev. Fluid Mech.* 34:469–502. doi:10.1146/annurev.fluid.34.090101.190252
- Shen, L., Zhang, C. & Yue, D.K.P. (2002). Free-surface turbulent wake behind towed ship models: experimental measurements, stability analyses and direct numerical simulations. *J. Fluid Mech.* 469:89–120. doi:10.1017/S0022112002001684
- Olivieri, A. et al. (2007). Scars and vortices induced by ship bow and shoulder wave breaking. *J. Fluids Eng.* 129:1445–1459. doi:10.1115/1.2786490
- Grift, E.J., Tummers, M.J. & Westerweel, J. (2021). Hydrodynamics of rowing propulsion. *J. Fluid Mech.* 918:A29. doi:10.1017/jfm.2021.318
- Duguay, J., Biron, P.M. & Buffin-Bélanger, T. (2022). *Earth Surf. Process. Landf.* 47:345–363. doi:10.1002/esp.5251

### Measurement and citizen science
- Fujita, I., Muste, M. & Kruger, A. (1998). Large-scale particle image velocimetry for flow analysis in hydraulic engineering applications. *J. Hydraul. Res.* 36:397–414. doi:10.1080/00221689809498626
- Muste, M., Fujita, I. & Hauet, A. (2008). Large-scale particle image velocimetry for measurements in riverine environments. *Water Resour. Res.* 44:W00D19. doi:10.1029/2008WR006950
- Fujita, I., Watanabe, H. & Tsubaki, R. (2007). Development of a non-intrusive and efficient flow monitoring technique: the space-time image velocimetry (STIV). *Int. J. River Basin Manag.* 5:105–114. doi:10.1080/15715124.2007.9635310
- Leitão, J.P., Peña-Haro, S., Lüthi, B., Scheidegger, A. & Moy de Vitry, M. (2018). Urban overland runoff velocity measurement with consumer-grade surveillance cameras and surface structure image velocimetry. *J. Hydrol.* 565:791–804. doi:10.1016/j.jhydrol.2018.09.001
- Perks, M.T. et al. (2020). Towards harmonisation of image velocimetry techniques for river surface velocity observations. *Earth Syst. Sci. Data* 12:1545–1559. doi:10.5194/essd-12-1545-2020
- Patalano, A., García, C.M. & Rodríguez, A. (2017). Rectification of Image Velocity Results (RIVeR). *Comput. Geosci.* 109:323–330. doi:10.1016/j.cageo.2017.07.009
- Perks, M.T. (2020). KLT-IV v1.0. *Geosci. Model Dev.* 13:6111–6130. doi:10.5194/gmd-13-6111-2020
- Tauro, F., Porfiri, M. & Grimaldi, S. (2016). Surface flow measurements from drones. *J. Hydrol.* 540:240–245. doi:10.1016/j.jhydrol.2016.06.012
- Legleiter, C.J. & Kinzel, P.J. (2020). *Remote Sens.* 12:1282. doi:10.3390/rs12081282
- Trieu, H. et al. (2024). Natural surface floaters in image-based river surface velocimetry. *Flow Meas. Instrum.* 96:102557. doi:10.1016/j.flowmeasinst.2024.102557
- Chickadel, C.C., Talke, S.A., Horner-Devine, A.R. & Jessup, A.T. (2011). Infrared-based measurements of velocity, turbulent kinetic energy, and dissipation at the water surface in a tidal river. *IEEE Geosci. Remote Sens. Lett.* 8:849–853. doi:10.1109/LGRS.2011.2125942
- Talke, S.A. et al. (2013). Turbulent kinetic energy and coherent structures in a tidal river. *J. Geophys. Res. Oceans* 118:6965–6981. doi:10.1002/2012JC008103
- Branch, R.A. et al. (2021). Surface turbulence reveals riverbed drag coefficient. *Geophys. Res. Lett.* 48:e2020GL092326. doi:10.1029/2020GL092326
- Johnson, E.D. & Cowen, E.A. (2016). *Water Resour. Res.* 52:2178–2193. doi:10.1002/2015WR017736
- Johnson, E.D. & Cowen, E.A. (2017). Estimating bed shear stress from remotely measured surface turbulent dissipation fields in open channel flows. *Water Resour. Res.* 53:1982–1996. doi:10.1002/2016WR018898
- Dolcetti, G. et al. (2022). Using noncontact measurement of water surface dynamics to estimate river discharge. *Water Resour. Res.* 58:e2022WR032829. doi:10.1029/2022WR032829
- Mandel, T.L. et al. (2017). *Exp. Fluids* 58:153. doi:10.1007/s00348-017-2435-6
- Seibert, J. et al. (2019). Virtual staff gauges for crowd-based stream level observations. *Front. Earth Sci.* 7:70. doi:10.3389/feart.2019.00070
- Davids, J.C. et al. (2019). *Hydrol. Earth Syst. Sci.* 23:1045–1065. doi:10.5194/hess-23-1045-2019
- Jolley, M.J. et al. (2021). *Front. Water* 3:709269. doi:10.3389/frwa.2021.709269
- Eltner, A. et al. (2020). *Hydrol. Earth Syst. Sci.* 24:1429–1445. doi:10.5194/hess-24-1429-2020
- Hauet, A. et al. (2018). *E3S Web Conf.* 40:06015. doi:10.1051/e3sconf/20184006015

### Data and site sources
- BAFU/FOEN hydrodaten, station 2288 Rhein – Neuhausen, Flurlingerbrücke (annual plot data, provisional 2026 values): https://www.hydrodaten.admin.ch/de/seen-und-fluesse/stationen-und-daten/2288 ; station 2043 Untersee – Berlingen.
- Kanton Thurgau hydrodaten, Diessenhofen gauge: https://www.hydrodaten.tg.ch
- BFE / Regierungspräsidium Freiburg (2013), Masterplan Massnahmen zur Reaktivierung des Geschiebehaushalts im Hochrhein: https://pubdb.bfe.admin.ch/de/publication/download/6967
- Kanton Thurgau / Hunziker Zarn & Partner (2018), Ufersanierung Hochrhein, report A-885: https://umwelt.tg.ch/public/upload/assets/74281/A-885_Bericht_Ufersanierung_Hochrhein_TG.pdf
- BFE hydropower statistics (WASTA), geo.admin layer ch.bfe.statistik-wasserkraftanlagen, Kraftwerk Schaffhausen.
- URh (Schweizerische Schifffahrtsgesellschaft Untersee und Rhein) press releases, May–June 2026: https://www.urh.ch/medien
- MeteoSwiss open data, SwissMetNet station SHA (Schaffhausen), 10-minute values, `https://data.geo.admin.ch/ch.meteoschweiz.ogd-smn/sha/ogd-smn_sha_t_recent.csv` (retrieved 2026-09-27).
- Open-Meteo historical archive (ERA5), 47.696 N 8.690 E, 1 June 2026 (retrieved 2026-09-27).
