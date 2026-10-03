// Assertion companion to the original diagnostic check.mjs. Uses delivered docs model.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
vm.runInThisContext(readFileSync(new URL('../docs/vortex.js', import.meta.url), 'utf8'));
const V = globalThis.Vortex;
let passed = 0;
function close(actual, expected, tol, label) { assert.ok(Math.abs(actual - expected) <= tol, `${label}: ${actual} versus ${expected}`); passed++; }
let s = V.makeSystem({ a: .6 }); V.add(s, 0, 3, 60); V.add(s, 0, -3, -60);
for (let i = 0; i < 1000; i++) V.step(s, .001);
close(s.x[0], 60 * 6 / (2 * Math.PI * (36 + .36)), 1e-9, 'counter-rotating smooth-core pair speed');
close(s.x[0], s.x[1], 1e-12, 'pair translation symmetry');
s = V.makeSystem({ a: .6 }); V.add(s, 3, 0, 60); V.add(s, -3, 0, 60);
for (let i = 0; i < 1000; i++) V.step(s, .001);
close(Math.atan2(s.y[0], s.x[0]), 60 / (Math.PI * (36 + .36)), 1e-7, 'same-sign pair orbital angle');
s = V.makeSystem({ a: .6 }); [[3,1,50],[-2,2,40],[-1,-3,45],[4,-2,-30]].forEach(p => V.add(s, ...p));
const before = V.invariants(s); for (let i = 0; i < 20000; i++) V.step(s, .002); const after = V.invariants(s);
for (const key of ['H','Px','Py','Lz']) close((after[key] - before[key]) / Math.max(1, Math.abs(before[key])), 0, key === 'H' ? 1e-7 : 1e-10, `${key} relative drift over 40 s`);
s = V.makeSystem({ a: .6, U: 3, wall: -8 }); [[3,1,50],[-2,2,-40]].forEach(p => V.add(s, ...p));
const h=1e-5, [x,y]=[1.3,-.7], [u,v]=V.velAt(s,s.x,s.y,x,y,-1);
close((V.psi(s,x,y+h)-V.psi(s,x,y-h))/(2*h),u,1e-8,'stream-function y derivative');
close(-(V.psi(s,x+h,y)-V.psi(s,x-h,y))/(2*h),v,1e-8,'negative stream-function x derivative');
close(V.dipDepth(60,.6)/V.dipDepth(30,.6),4,1e-12,'quadratic pressure-dip scaling');
s = V.makeSystem({ a: .6 }); [[4,0,60],[-2,3.5,60],[-2,-3.5,60]].forEach(p=>V.add(s,...p));
const contour = V.makeContour(Array.from({length:200},(_,i)=>[.8+1.2*Math.cos(2*Math.PI*i/200),.6+1.2*Math.sin(2*Math.PI*i/200)]));
const area=V.area(contour);for(let i=0;i<4000;i++)V.step(s,.002,[contour]);close(V.area(contour)/area,1,2e-4,'flat-model tracer area over 8 s');
console.log(`${passed} assertion-based vortex/model checks passed. These ideal-model checks do not establish real-river area preservation.`);
