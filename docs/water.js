// WebGL2 renderer: sunlit shallow river seen from above, with vortex dimples and dye.
//
// Surface: the vortex dips (Scully profile) plus a spectrum of small ripples.
// Caustics: a fine grid of sunlight rays is refracted through the surface onto the riverbed.
//   A ray entering where the slope is grad(eta) lands k grad(eta) away, k = depth (1 - 1/n).
//   Each grid triangle is drawn where it lands with brightness (area before) / (area after) and
//   the results are added, so where the light folds over itself the bed shows sharp caustic
//   curves. Three passes with slightly different k (red, green, blue refract differently) give
//   faint colour fringes, and a small blur stands in for the size of the sun's disk.
// Dye: a cloud of tracer particles carried by the same velocity field as the vortices. Their
//   density tints the light passing through the water (like rhodamine tracer dye).
(function (root) {
  const COMMON = `
  uniform int uN; uniform vec3 uV[64]; uniform float uA2, uAmp, uRipple, uTime, uU, uWall, uRipSpeed;
  float h1(float n) { return fract(sin(n * 12.9898 + 78.233) * 43758.5453); }
  void surf(vec2 p, out float eta, out vec2 gr) {
    eta = 0.0; gr = vec2(0);
    for (int j = 0; j < 64; j++) { if (j >= uN) break;
      vec3 v = uV[j]; float A = v.z * v.z * uAmp; vec2 d = p - v.xy; float s = dot(d, d) + uA2;
      eta -= A / s; gr += A * 2.0 * d / (s * s); }
    if (uRipple > 0.0) for (int i = 0; i < 24; i++) {           // capillary-gravity ripples from all directions
      float fi = float(i), ang = fi * 2.39996 + 0.5 * h1(fi + 3.0); vec2 dir = vec2(cos(ang), sin(ang));
      float kw = 1.3 + 2.4 * h1(fi + 11.0), w = sqrt(981.0 * kw + 73.0 * kw * kw * kw) * uRipSpeed;
      float amp = uRipple * (0.6 + 0.8 * h1(fi + 17.0)) / (kw * kw);            // similar curvature per wave
      float ph = kw * (dot(dir, p) - dir.x * uU * uTime) - w * uTime + 6.2832 * h1(fi + 5.0);
      eta += amp * sin(ph); gr += amp * kw * cos(ph) * dir; }
  }
  mat2 hess(vec2 p) {                                          // only for the fallback path
    float hxx = 0.0, hxy = 0.0, hyy = 0.0;
    for (int j = 0; j < 64; j++) { if (j >= uN) break;
      vec3 v = uV[j]; float A = v.z * v.z * uAmp; vec2 d = p - v.xy; float s = dot(d, d) + uA2, s2 = s * s, s3 = s2 * s;
      hxx += 2.0 * A / s2 - 8.0 * A * d.x * d.x / s3; hyy += 2.0 * A / s2 - 8.0 * A * d.y * d.y / s3; hxy -= 8.0 * A * d.x * d.y / s3; }
    return mat2(hxx, hxy, hxy, hyy); }`;
  const VEL = `
  vec2 vel(vec2 p) {                                           // same field as vortex.js
    vec2 u = vec2(uU, 0.0);
    for (int j = 0; j < 64; j++) { if (j >= uN) break;
      vec3 v = uV[j]; float g = v.z / 6.28318530718; vec2 d = p - v.xy; float s = dot(d, d) + uA2;
      u += g * vec2(-d.y, d.x) / s;
      if (uWall < 1e8) { vec2 di = p - vec2(v.x, 2.0 * uWall - v.y); float si = dot(di, di) + uA2; u -= g * vec2(-di.y, di.x) / si; } }
    return u; }`;
  const CAUSTIC_VS = `#version 300 es
  precision highp float; in vec2 uv; uniform vec2 uMin, uMax, uShift; uniform float uK; ${COMMON}
  out vec2 vP; out vec2 vQ;
  void main() { vec2 p = uMin - uShift + uv * (uMax - uMin); float e; vec2 g; surf(p, e, g); vec2 q = p + uShift + uK * g;
    vP = p; vQ = q; gl_Position = vec4((q - uMin) / (uMax - uMin) * 2.0 - 1.0, 0.0, 1.0); }`;
  const CAUSTIC_FS = `#version 300 es
  precision highp float; in vec2 vP; in vec2 vQ; uniform vec3 uCol; out vec4 frag;
  float cr(vec2 a, vec2 b) { return abs(a.x * b.y - a.y * b.x); }
  void main() { float a0 = cr(dFdx(vP), dFdy(vP)), a1 = cr(dFdx(vQ), dFdy(vQ));
    frag = vec4(uCol * min(a0 / max(a1, 1e-12), 30.0), 1.0); }`;
  const QUAD_VS = `#version 300 es
  in vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;
  const ADVECT_FS = `#version 300 es
  precision highp float; uniform sampler2D uPos; uniform float uDt; ${COMMON} ${VEL}
  out vec4 frag;
  void main() { vec4 s = texelFetch(uPos, ivec2(gl_FragCoord.xy), 0);
    if (s.w < 0.5) { frag = s; return; }
    vec2 x = s.xy, xm = x + 0.5 * uDt * vel(x); frag = vec4(x + uDt * vel(xm), 0.0, 1.0); }`;
  const SPLAT_VS = `#version 300 es
  precision highp float; uniform sampler2D uPos; uniform vec2 uCenter, uHalf; uniform int uSide;
  void main() { ivec2 t = ivec2(gl_VertexID % uSide, gl_VertexID / uSide); vec4 s = texelFetch(uPos, t, 0);
    gl_PointSize = 1.0; gl_Position = s.w < 0.5 ? vec4(2.0, 2.0, 0.0, 1.0) : vec4((s.xy - uCenter) / uHalf, 0.0, 1.0); }`;
  const SPLAT_FS = `#version 300 es
  precision highp float; uniform float uW; out vec4 frag; void main() { frag = vec4(uW, 0.0, 0.0, 1.0); }`;
  const BLUR_FS = `#version 300 es
  precision highp float; uniform sampler2D uSrc; uniform vec2 uStep; uniform float uSigma; out vec4 frag;
  void main() { vec2 t = gl_FragCoord.xy / vec2(textureSize(uSrc, 0)); vec4 c = texture(uSrc, t); float wsum = 1.0;
    for (int i = 1; i <= 12; i++) { float fi = float(i); if (fi > 2.5 * uSigma + 1.0) break; float w = exp(-0.5 * fi * fi / (uSigma * uSigma));
      c += w * (texture(uSrc, t + fi * uStep) + texture(uSrc, t - fi * uStep)); wsum += 2.0 * w; }
    frag = c / wsum; }`;
  const MAIN_FS = `#version 300 es
  precision highp float;
  uniform vec2 uRes, uCenter, uCMin, uCMax; uniform float uScale, uK, uGlint, uCausticOn, uDyeOn, uDebug, uSlopeVis;
  uniform sampler2D uCaustic, uDens; uniform vec3 uDyeT; ${COMMON}
  out vec4 frag;
  vec2 hash2(vec2 p) { p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return fract(sin(p) * 43758.5453); }
  float hash1(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
  float vnoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash1(i), hash1(i + vec2(1, 0)), f.x), mix(hash1(i + vec2(0, 1)), hash1(i + vec2(1, 1)), f.x), f.y); }
  // riverbed: rounded pebbles of two sizes lying in sand
  vec3 pebbleCol(float h) {
    vec3 c = mix(vec3(0.58, 0.52, 0.42), vec3(0.70, 0.64, 0.52), h);
    c = mix(c, vec3(0.50, 0.50, 0.49), smoothstep(0.55, 0.62, h));
    c = mix(c, vec3(0.60, 0.44, 0.32), smoothstep(0.82, 0.88, h));
    return mix(c, vec3(0.36, 0.36, 0.35), smoothstep(0.94, 0.97, h)); }
  vec4 pebbles(vec2 q, float cell, float density) {
    vec2 c = q / cell, i = floor(c), f = fract(c); vec4 best = vec4(0);
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(x, y), id = i + g, o = 0.2 + 0.6 * hash2(id);
      if (hash1(id + 21.7) > density) continue;
      float h = hash1(id + 7.1), ang = 6.283 * hash1(id + 3.3), r = 0.30 + 0.16 * hash1(id + 9.2);
      vec2 d = g + o - f; float ca = cos(ang), sa = sin(ang);
      vec2 e = vec2(ca * d.x + sa * d.y, -sa * d.x + ca * d.y) / vec2(r * 1.25, r * 0.85);
      float rr = dot(e, e);
      if (rr < 1.0) { float z = sqrt(1.0 - rr); vec3 nrm = normalize(vec3(e * 0.8, z)), L = normalize(vec3(0.3, 0.4, 1.0));
        vec3 col = mix(vec3(0.58, 0.54, 0.45), pebbleCol(h), 0.75) * (0.68 + 0.4 * max(dot(nrm, L), 0.0)) * (0.9 + 0.2 * vnoise(q * 6.0 + h * 10.0));
        float cov = smoothstep(1.0, 0.82, rr); if (cov > best.a) best = vec4(col, cov); } }
    return best; }
  vec3 bed(vec2 q) {
    vec3 sand = vec3(0.60, 0.55, 0.44) * (0.82 + 0.25 * vnoise(q * 7.0) + 0.1 * vnoise(q * 31.0));
    vec4 small = pebbles(q + 13.7, 0.9, 0.45), big = pebbles(q, 2.6, 0.28);
    vec3 col = mix(sand, small.rgb, small.a * 0.9);
    col *= 1.0 - 0.18 * big.a * (1.0 - smoothstep(0.0, 0.5, big.a));
    return mix(col, big.rgb, big.a); }
  vec3 caustic(vec2 q) { return texture(uCaustic, (q - uCMin) / (uCMax - uCMin)).rgb; }
  void main() {
    vec2 p = uCenter + (gl_FragCoord.xy - 0.5 * uRes) * uScale; float eta; vec2 gr; surf(p, eta, gr);
    vec2 q = p + uK * gr; vec3 irr;
    if (uCausticOn > 0.5) irr = caustic(q);
    else { mat2 h = hess(p); float det = (1.0 + uK * h[0][0]) * (1.0 + uK * h[1][1]) - uK * uK * h[0][1] * h[0][1]; irr = vec3(clamp(1.0 / max(abs(det), 0.16), 0.0, 5.0)); }
    if (uDebug > 0.5) { frag = vec4(vec3(irr.g * 0.25), 1.0); return; }
    irr = irr / (1.0 + 0.035 * irr) * 1.035;                                    // soft highlight roll-off
    vec3 tint = vec3(0.70, 0.80, 0.66);
    vec3 under = bed(q) * tint * (0.36 + 0.66 * irr) + vec3(0.03, 0.05, 0.04);
    under = mix(under, vec3(0.20, 0.27, 0.22) * (0.5 + 0.5 * irr), 0.16);      // a little turbidity
    if (uDyeOn > 0.5) {                                                          // dye near the surface absorbs light
      vec2 t = gl_FragCoord.xy / uRes, px = 1.0 / uRes;
      float d = texture(uDens, t).r * 0.36 + (texture(uDens, t + vec2(px.x, 0)).r + texture(uDens, t - vec2(px.x, 0)).r + texture(uDens, t + vec2(0, px.y)).r + texture(uDens, t - vec2(0, px.y)).r) * 0.16;
      d = min(d, 1.6);
      under = under * pow(uDyeT, vec3(d * 1.5)) + vec3(0.30, 0.04, 0.10) * (1.0 - exp(-d * 1.5)) * 0.35;
    }
    vec3 n = normalize(vec3(-gr * uSlopeVis, 1.0)); float fres = 0.02 + 0.98 * pow(1.0 - n.z, 5.0);
    vec3 sky = mix(vec3(0.72, 0.80, 0.88), vec3(0.95, 0.97, 1.0), clamp(n.y * 4.0 + 0.5, 0.0, 1.0));
    vec3 sunDir = normalize(vec3(0.25, 0.35, 1.0)), r = reflect(vec3(0, 0, -1), n);
    float glint = pow(max(dot(r, sunDir), 0.0), 1400.0) * uGlint * 0.35;
    vec3 col = mix(under, sky, fres) + vec3(1.0, 0.97, 0.9) * glint;
    frag = vec4(pow(col, vec3(1.0 / 1.1)), 1.0);
  }`;

  function WaterRenderer(canvas, opts = {}) {
    const gl = canvas.getContext("webgl2", { antialias: false, preserveDrawingBuffer: !!opts.preserve, premultipliedAlpha: false });
    if (!gl) throw new Error("WebGL2 unavailable");
    const floatOK = !!gl.getExtension("EXT_color_buffer_float");
    const sh = (t, src) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const prog = (vs, fs) => { const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)); p.u = {}; return p; };
    const U = (p, n) => p.u[n] ?? (p.u[n] = gl.getUniformLocation(p, n));
    const pMain = prog(QUAD_VS, MAIN_FS), pBlur = prog(QUAD_VS, BLUR_FS);
    const pCaustic = floatOK ? prog(CAUSTIC_VS, CAUSTIC_FS) : null, pAdvect = floatOK ? prog(QUAD_VS, ADVECT_FS) : null, pSplat = floatOK ? prog(SPLAT_VS, SPLAT_FS) : null;
    this.caustics = floatOK; this.dyeSupported = floatOK;

    const quad = gl.createVertexArray(); gl.bindVertexArray(quad);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    for (const p of [pMain, pAdvect, pBlur]) if (p) { gl.bindAttribLocation(p, 0, "p"); gl.linkProgram(p); p.u = {}; }
    const empty = gl.createVertexArray();

    const tex = (w, h, ifmt, fmt, type, filter) => { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, ifmt, w, h, 0, fmt, type, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); return t; };
    const fbo = t => { const f = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0); gl.bindFramebuffer(gl.FRAMEBUFFER, null); return f; };

    // caustic mesh and target
    const GX = opts.gridX || 1100, GY = opts.gridY || 620, CW = opts.causticW || 1600, CH = opts.causticH || 900;
    let mesh = null, nIdx = GX * GY * 6, cTex = null, cFbo = null, bTex = null, bFbo = null;
    if (floatOK) {
      mesh = gl.createVertexArray(); gl.bindVertexArray(mesh);
      const uvs = new Float32Array((GX + 1) * (GY + 1) * 2);
      for (let j = 0; j <= GY; j++) for (let i = 0; i <= GX; i++) { const o = 2 * (j * (GX + 1) + i); uvs[o] = i / GX; uvs[o + 1] = j / GY; }
      const idx = new Uint32Array(nIdx); let q = 0;
      for (let j = 0; j < GY; j++) for (let i = 0; i < GX; i++) { const a = j * (GX + 1) + i, b = a + 1, c = a + GX + 1, d = c + 1; idx[q++] = a; idx[q++] = b; idx[q++] = c; idx[q++] = b; idx[q++] = d; idx[q++] = c; }
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
      const ml = gl.getAttribLocation(pCaustic, "uv"); gl.enableVertexAttribArray(ml); gl.vertexAttribPointer(ml, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
      cTex = tex(CW, CH, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, gl.LINEAR); cFbo = fbo(cTex); bTex = tex(CW, CH, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, gl.LINEAR); bFbo = fbo(bTex);
    }
    gl.bindVertexArray(null);

    // dye particles: positions in a float texture, updated by ping-pong
    const SIDE = opts.dyeSide || 512, NP = SIDE * SIDE;
    let pTex = null, pFbo = null, pCur = 0, dyeOn = false, dyeWeight = 0, dTex = null, dFbo = null, dW = 0, dH = 0;
    if (floatOK) { pTex = [0, 1].map(() => tex(SIDE, SIDE, gl.RGBA32F, gl.RGBA, gl.FLOAT, gl.NEAREST)); pFbo = pTex.map(fbo); }
    const vbuf = new Float32Array(64 * 3);
    const setCommon = (p, o, vs) => {
      gl.uniform1f(U(p, "uA2"), (o.a ?? 0.6) ** 2); gl.uniform1f(U(p, "uAmp"), (o.exaggerate ?? 1) / (8 * Math.PI * Math.PI * 981));
      gl.uniform1f(U(p, "uRipple"), o.ripple ?? 0.004); gl.uniform1f(U(p, "uTime"), o.time ?? 0); gl.uniform1f(U(p, "uRipSpeed"), o.ripSpeed ?? 0.22);
      gl.uniform1f(U(p, "uU"), o.U ?? 0); gl.uniform1f(U(p, "uWall"), o.wall ?? 1e9);
      vs = vs || o.vortices || []; const n = Math.min(64, vs.length);
      for (let i = 0; i < n; i++) { vbuf[3 * i] = vs[i][0]; vbuf[3 * i + 1] = vs[i][1]; vbuf[3 * i + 2] = vs[i][2]; }
      gl.uniform1i(U(p, "uN"), n); gl.uniform3fv(U(p, "uV"), vbuf);
    };

    // dye: xs, ys are particle positions (cm); each particle stands for `area / count` cm^2
    this.setDye = function (xs, ys, area) {
      if (!floatOK) return;
      const n = Math.min(NP, xs.length), data = new Float32Array(NP * 4);
      for (let i = 0; i < n; i++) { data[4 * i] = xs[i]; data[4 * i + 1] = ys[i]; data[4 * i + 3] = 1; }
      for (const t of pTex) { gl.bindTexture(gl.TEXTURE_2D, t); gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, SIDE, SIDE, gl.RGBA, gl.FLOAT, data); }
      dyeOn = n > 0; dyeWeight = area / n;
    };
    this.clearDye = function () { dyeOn = false; };
    this.dyeCapacity = NP;
    // one step of dt for the dye; `mid` = vortex positions [[x, y, G], ...] at the middle of the step
    this.stepDye = function (dt, mid, o) {
      if (!dyeOn) return;
      gl.useProgram(pAdvect); gl.bindVertexArray(quad); setCommon(pAdvect, o, mid); gl.uniform1f(U(pAdvect, "uDt"), dt);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, pTex[pCur]); gl.uniform1i(U(pAdvect, "uPos"), 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, pFbo[1 - pCur]); gl.viewport(0, 0, SIDE, SIDE); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); pCur = 1 - pCur;
    };

    this.render = function (o) {
      const W = canvas.width, H = canvas.height, sc = o.scale, cx = o.cx ?? 0, cy = o.cy ?? 0, k = o.k ?? 6.2;
      const m = 1.0, cmin = [cx - W / 2 * sc - m, cy - H / 2 * sc - m], cmax = [cx + W / 2 * sc + m, cy + H / 2 * sc + m];
      if (floatOK) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, cFbo); gl.viewport(0, 0, CW, CH); gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(pCaustic); gl.bindVertexArray(mesh); setCommon(pCaustic, o);
        gl.uniform2f(U(pCaustic, "uMin"), cmin[0], cmin[1]); gl.uniform2f(U(pCaustic, "uMax"), cmax[0], cmax[1]);
        const sh = o.sunShift || [0, 0]; gl.uniform2f(U(pCaustic, "uShift"), sh[0], sh[1]);
        gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
        const disp = o.dispersion ?? 0, passes = disp ? [[1, 0, 0, 1 - disp], [0, 1, 0, 1], [0, 0, 1, 1 + disp]] : [[1, 1, 1, 1]];
        for (const [r, g, b, f] of passes) {
          gl.uniform3f(U(pCaustic, "uCol"), r, g, b); gl.uniform1f(U(pCaustic, "uK"), k * f); gl.drawElements(gl.TRIANGLES, nIdx, gl.UNSIGNED_INT, 0); }
        gl.disable(gl.BLEND);
        const sig = Math.max(0.6, (o.sunBlur ?? 0.045) / ((cmax[0] - cmin[0]) / CW));      // sun's disk, in texels
        gl.useProgram(pBlur); gl.bindVertexArray(quad); gl.uniform1f(U(pBlur, "uSigma"), sig); gl.uniform1i(U(pBlur, "uSrc"), 0); gl.activeTexture(gl.TEXTURE0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, bFbo); gl.bindTexture(gl.TEXTURE_2D, cTex); gl.uniform2f(U(pBlur, "uStep"), 1 / CW, 0); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.bindFramebuffer(gl.FRAMEBUFFER, cFbo); gl.bindTexture(gl.TEXTURE_2D, bTex); gl.uniform2f(U(pBlur, "uStep"), 0, (cmax[0] - cmin[0]) / CW / (cmax[1] - cmin[1])); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.enable(gl.BLEND);
        if (dyeOn && o.dye !== false) {
          if (dW !== W || dH !== H) { if (dTex) { gl.deleteTexture(dTex); gl.deleteFramebuffer(dFbo); } dTex = tex(W, H, gl.R16F, gl.RED, gl.HALF_FLOAT, gl.LINEAR); dFbo = fbo(dTex); dW = W; dH = H; }
          gl.bindFramebuffer(gl.FRAMEBUFFER, dFbo); gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
          gl.useProgram(pSplat); gl.bindVertexArray(empty);
          gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, pTex[pCur]); gl.uniform1i(U(pSplat, "uPos"), 0);
          gl.uniform2f(U(pSplat, "uCenter"), cx, cy); gl.uniform2f(U(pSplat, "uHalf"), W / 2 * sc, H / 2 * sc); gl.uniform1i(U(pSplat, "uSide"), SIDE);
          gl.uniform1f(U(pSplat, "uW"), dyeWeight / (sc * sc)); gl.drawArrays(gl.POINTS, 0, NP);
        }
        gl.disable(gl.BLEND);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, W, H);
      gl.useProgram(pMain); gl.bindVertexArray(quad); setCommon(pMain, o);
      gl.uniform2f(U(pMain, "uRes"), W, H); gl.uniform2f(U(pMain, "uCenter"), cx, cy); gl.uniform1f(U(pMain, "uScale"), sc); gl.uniform1f(U(pMain, "uK"), k);
      gl.uniform1f(U(pMain, "uGlint"), o.glint ?? 1); gl.uniform1f(U(pMain, "uDebug"), o.debug ? 1 : 0); gl.uniform1f(U(pMain, "uSlopeVis"), o.slopeVis ?? 3); 
      gl.uniform2f(U(pMain, "uCMin"), cmin[0], cmin[1]); gl.uniform2f(U(pMain, "uCMax"), cmax[0], cmax[1]);
      gl.uniform1f(U(pMain, "uCausticOn"), floatOK && o.caustics !== false ? 1 : 0);
      gl.uniform1f(U(pMain, "uDyeOn"), floatOK && dyeOn && o.dye !== false ? 1 : 0);
      const T = o.dyeTransmit || [0.92, 0.16, 0.42]; gl.uniform3f(U(pMain, "uDyeT"), T[0], T[1], T[2]);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, cTex); gl.uniform1i(U(pMain, "uCaustic"), 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, dTex); gl.uniform1i(U(pMain, "uDens"), 1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
  }

  // fill a polygon [[x, y], ...] with about n jittered sample points (for dye)
  WaterRenderer.fillPolygon = function (poly, n, seed = 1) {
    let area = 0, x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    for (let i = 0; i < poly.length; i++) { const [ax, ay] = poly[i], [bx, by] = poly[(i + 1) % poly.length]; area += ax * by - bx * ay;
      x0 = Math.min(x0, ax); x1 = Math.max(x1, ax); y0 = Math.min(y0, ay); y1 = Math.max(y1, ay); }
    area = Math.abs(area) / 2; const h = Math.sqrt(area / n), xs = [], ys = [];
    let s = seed >>> 0; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    for (let y = y0 + h / 2; y < y1; y += h) {
      const cuts = [];
      for (let i = 0; i < poly.length; i++) { const [ax, ay] = poly[i], [bx, by] = poly[(i + 1) % poly.length];
        if ((ay > y) !== (by > y)) cuts.push(ax + (y - ay) / (by - ay) * (bx - ax)); }
      cuts.sort((a, b) => a - b);
      for (let c = 0; c + 1 < cuts.length; c += 2)
        for (let x = Math.ceil((cuts[c] - x0) / h) * h + x0; x < cuts[c + 1]; x += h) { xs.push(x + (rnd() - 0.5) * h); ys.push(y + (rnd() - 0.5) * h); }
    }
    return { xs, ys, area };
  };
  root.WaterRenderer = WaterRenderer;
})(typeof globalThis !== 'undefined' ? globalThis : this);
