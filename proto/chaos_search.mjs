import { readFileSync } from 'node:fs';
eval(readFileSync(new URL('../web/vortex.js', import.meta.url), 'utf8'));
const V = globalThis.Vortex;
let seed = 7; const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32;
const results = [];
for (let trial = 0; trial < 40; trial++) {
  const init = []; for (let k = 0; k < 4; k++) init.push([ (rnd() - 0.5) * 9, (rnd() - 0.5) * 7, 60 ]);
  const A = V.makeSystem({ a: 0.5 }), B = V.makeSystem({ a: 0.5 });
  init.forEach(p => { V.add(A, ...p); V.add(B, ...p); }); B.x[0] += 1e-4;
  let t10 = null, ok = true;
  for (let i = 1; i <= 10000; i++) {
    V.step(A, 0.003); V.step(B, 0.003);
    let dmin = 1e9; for (let p = 0; p < 4; p++) for (let q = p + 1; q < 4; q++) dmin = Math.min(dmin, Math.hypot(A.x[p] - A.x[q], A.y[p] - A.y[q]));
    if (dmin < 0.9) { ok = false; break; }                       // avoid near-collisions (cores overlap)
    const sep = Math.hypot(A.x[0] - B.x[0], A.y[0] - B.y[0]);
    if (t10 === null && sep > 1.0) { t10 = i * 0.003; break; }
  }
  if (ok && t10 !== null) results.push({ t10, init });
}
results.sort((a, b) => a.t10 - b.t10);
console.log(`${results.length} chaotic candidates; fastest divergence to 1 cm:`);
for (const r of results.slice(0, 5)) console.log(`  ${r.t10.toFixed(1)} s  init ${JSON.stringify(r.init.map(p => p.map(v => +v.toFixed(2))))}`);
