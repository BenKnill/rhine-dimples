import { readFileSync } from 'node:fs';
eval(readFileSync(new URL('../web/vortex.js', import.meta.url), 'utf8'));
const V = globalThis.Vortex, camel = JSON.parse(readFileSync(new URL('../web/camel_outline.json', import.meta.url)));
for (const dt of [0.004, 0.002]) {
  const s = V.makeSystem({ a: 0.5 }); [[5, 0, 70], [-3, 4, 55], [-2, -5, 60]].forEach(p => V.add(s, ...p));
  const dye = V.makeContour(camel.map(([x, y]) => [x * 0.55 + 0.5, y * 0.55 + 0.3]), 0.2);
  const A0 = V.area(dye), rows = [], n = Math.round(25 / dt);
  const t0 = Date.now();
  for (let i = 1; i <= n; i++) { V.step(s, dt, [dye]); if (i % Math.round(5 / dt) === 0) rows.push(`${(i * dt).toFixed(0)}s: ${dye.x.length} pts, area ${(100 * V.area(dye) / A0).toFixed(3)}%`); }
  console.log(`dt=${dt}: ${rows.join(' | ')}  (${((Date.now() - t0) / 1000).toFixed(0)} s wall)`);
}
