import { readFileSync } from 'node:fs';
eval(readFileSync(new URL('../web/vortex.js', import.meta.url), 'utf8'));
const V = globalThis.Vortex, G = 60, d = 6;
// 1. counter-rotating pair
let s = V.makeSystem({ a: 0.6 }); V.add(s, 0, d / 2, G); V.add(s, 0, -d / 2, -G);
for (let i = 0; i < 1000; i++) V.step(s, 0.001);
const aeff = Math.sqrt(d * d + 0.36);
console.log(`pair speed: simulated ${s.x[0].toFixed(3)} cm/s, point-vortex G/(2 pi d) = ${(G / (2 * Math.PI * d)).toFixed(3)}, smooth-core G d/(2 pi (d^2+a^2)) = ${(G * d / (2 * Math.PI * (d * d + 0.36))).toFixed(3)}`);
// 2. same-sign orbit
s = V.makeSystem({ a: 0.6 }); V.add(s, d / 2, 0, G); V.add(s, -d / 2, 0, G);
for (let i = 0; i < 1000; i++) V.step(s, 0.001);
const ang = Math.atan2(s.y[0], s.x[0]);
console.log(`orbit angle after 1 s: ${ang.toFixed(4)} rad, predicted G d^2/(pi d^2 (d^2+a^2)) = ${(G / (Math.PI * (d * d + 0.36))).toFixed(4)}`);
// 3. invariants for 4 vortices over a long run
s = V.makeSystem({ a: 0.6 }); [[3, 1, 50], [-2, 2, 40], [-1, -3, 45], [4, -2, -30]].forEach(p => V.add(s, ...p));
const i0 = V.invariants(s); for (let i = 0; i < 20000; i++) V.step(s, 0.002); const i1 = V.invariants(s);
for (const k of ['H', 'Px', 'Py', 'Lz']) console.log(`${k}: ${i0[k].toFixed(9)} -> ${i1[k].toFixed(9)}  (rel change ${Math.abs((i1[k] - i0[k]) / (Math.abs(i0[k]) || 1)).toExponential(1)})`);
// 4. stream function gradient equals velocity
s = V.makeSystem({ a: 0.6, U: 3, wall: -8 }); [[3, 1, 50], [-2, 2, -40]].forEach(p => V.add(s, ...p));
const [px, py, h] = [1.3, -0.7, 1e-5];
const [u, v] = V.velAt(s, s.x, s.y, px, py, -1);
const dpy = (V.psi(s, px, py + h) - V.psi(s, px, py - h)) / (2 * h), dpx = (V.psi(s, px + h, py) - V.psi(s, px - h, py)) / (2 * h);
console.log(`dpsi/dy = ${dpy.toFixed(6)} vs u = ${u.toFixed(6)};  -dpsi/dx = ${(-dpx).toFixed(6)} vs v = ${v.toFixed(6)}`);
// 5. dye area among three vortices
s = V.makeSystem({ a: 0.6 }); [[4, 0, 60], [-2, 3.5, 60], [-2, -3.5, 60]].forEach(p => V.add(s, ...p));
const circ = []; for (let k = 0; k < 200; k++) { const t = 2 * Math.PI * k / 200; circ.push([0.8 + 1.2 * Math.cos(t), 0.6 + 1.2 * Math.sin(t)]); }
const dye = V.makeContour(circ), A0 = V.area(dye);
for (let i = 0; i < 4000; i++) V.step(s, 0.002, [dye]);
console.log(`dye: area ${A0.toFixed(5)} -> ${V.area(dye).toFixed(5)} (rel ${((V.area(dye) - A0) / A0).toExponential(1)}), boundary points 200 -> ${dye.x.length}`);
console.log(`dip depth for G=60, a=0.6: ${(V.dipDepth(60, 0.6) * 10).toFixed(2)} mm`);
