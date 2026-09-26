import { readFileSync } from 'node:fs';
eval(readFileSync(new URL('../web/vortex.js', import.meta.url), 'utf8'));
const V = globalThis.Vortex, camel = JSON.parse(readFileSync(new URL('../web/camel_outline.json', import.meta.url)));
// leapfrog: two pairs moving +x, rear pair narrower
for (const [w1, w2, gap] of [[2.2, 1.6, 2.5], [2.4, 1.4, 3], [2.0, 1.2, 2.5], [2.6, 1.8, 3.5]]) {
  const s = V.makeSystem({ a: 0.5 }); V.add(s, 0, w1, -60); V.add(s, 0, -w1, 60); V.add(s, -gap, w2, -60); V.add(s, -gap, -w2, 60);
  let swaps = 0, lead = 0, minSep = 1e9;
  for (let i = 0; i < 12000; i++) { V.step(s, 0.002); const a = (s.x[0] + s.x[1]) / 2, b = (s.x[2] + s.x[3]) / 2, l = a > b ? 0 : 1; if (i && l !== lead) swaps++; lead = l;
    minSep = Math.min(minSep, Math.hypot(s.x[0] - s.x[2], s.y[0] - s.y[2])); }
  console.log(`leapfrog w1=${w1} w2=${w2} gap=${gap}: ${swaps} lead changes in 24 s, travelled ${((s.x[0] + s.x[2]) / 2).toFixed(1)} cm, closest approach ${minSep.toFixed(2)} cm`);
}
// four-vortex chaos: two runs differing by 1e-4 cm in one vortex
{
  const init = [[3, 1, 60], [-2.5, 2, 50], [-1, -3, 55], [3.5, -2.5, 45]];
  const A = V.makeSystem({ a: 0.5 }), B = V.makeSystem({ a: 0.5 });
  init.forEach(p => { V.add(A, ...p); V.add(B, ...p); }); B.x[0] += 1e-4;
  const report = [];
  for (let i = 1; i <= 15000; i++) { V.step(A, 0.002); V.step(B, 0.002); if (i % 1500 === 0) report.push(`${(i * 0.002).toFixed(0)}s:${Math.hypot(A.x[0] - B.x[0], A.y[0] - B.y[0]).toExponential(0)}`); }
  console.log('4 vortices, separation of vortex 1 in two runs:', report.join(' '));
  const C = V.makeSystem({ a: 0.5 }), D = V.makeSystem({ a: 0.5 });
  init.slice(0, 3).forEach(p => { V.add(C, ...p); V.add(D, ...p); }); D.x[0] += 1e-4; const r3 = [];
  for (let i = 1; i <= 15000; i++) { V.step(C, 0.002); V.step(D, 0.002); if (i % 1500 === 0) r3.push(`${(i * 0.002).toFixed(0)}s:${Math.hypot(C.x[0] - D.x[0], C.y[0] - D.y[0]).toExponential(0)}`); }
  console.log('3 vortices, same test:                    ', r3.join(' '));
}
// dye among three vortices
{
  const s = V.makeSystem({ a: 0.5 }); [[5, 0, 70], [-3, 4, 55], [-2, -5, 60]].forEach(p => V.add(s, ...p));
  const dye = V.makeContour(camel.map(([x, y]) => [x * 0.55 + 0.5, y * 0.55 + 0.3])); dye.maxSeg = 0.2;
  const A0 = V.area(dye), rows = [];
  for (let i = 1; i <= 12500; i++) { V.step(s, 0.002, [dye]); if (i % 2500 === 0) rows.push(`${(i * 0.002).toFixed(0)}s: ${dye.x.length} pts, area ${(100 * V.area(dye) / A0).toFixed(3)}%`); }
  console.log('camel dye (area', A0.toFixed(2), 'cm^2):', rows.join(' | '));
}
