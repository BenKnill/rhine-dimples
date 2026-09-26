// WebGL2 renderer: shallow river water seen from above, with vortex dimples.
//
// The surface height is the sum of the vortex dips (Scully profile) plus a few gentle ripples.
// Sunlight refracts through the surface onto the riverbed: a ray entering where the slope is
// grad(eta) lands k * grad(eta) away, k = depth * (1 - 1/n). The brightness on the bed is
// 1 / |det(I + k Hess(eta))|: a dimple spreads light (dark core) and the rim focuses it
// (bright ring); where the determinant crosses zero the ring is a caustic.
(function (root) {
  const VS = `#version 300 es
  in vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;
  const FS = `#version 300 es
  precision highp float;
  uniform vec2 uRes, uCenter; uniform float uScale, uTime, uA2, uAmp, uK, uRipple, uGlint;
  uniform int uN; uniform vec3 uV[64];
  out vec4 frag;
  vec2 hash2(vec2 p) { p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return fract(sin(p) * 43758.5453); }
  float hash1(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
  float vnoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash1(i), hash1(i + vec2(1, 0)), f.x), mix(hash1(i + vec2(0, 1)), hash1(i + vec2(1, 1)), f.x), f.y); }
  // riverbed: rounded pebbles of two sizes lying in sand
  vec3 pebbleCol(float h) {
    vec3 c = mix(vec3(0.58, 0.52, 0.42), vec3(0.70, 0.64, 0.52), h);           // tan to cream
    c = mix(c, vec3(0.50, 0.50, 0.49), smoothstep(0.55, 0.62, h));            // grey
    c = mix(c, vec3(0.60, 0.44, 0.32), smoothstep(0.82, 0.88, h));            // rust
    c = mix(c, vec3(0.36, 0.36, 0.35), smoothstep(0.94, 0.97, h));            // dark basalt
    return c;
  }
  vec4 pebbles(vec2 q, float cell, float density) {          // rgb, coverage
    vec2 c = q / cell, i = floor(c), f = fract(c); vec4 best = vec4(0);
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(x, y), id = i + g, o = 0.2 + 0.6 * hash2(id);
      if (hash1(id + 21.7) > density) continue;
      float h = hash1(id + 7.1), ang = 6.283 * hash1(id + 3.3), r = 0.30 + 0.16 * hash1(id + 9.2);
      vec2 d = g + o - f; float ca = cos(ang), sa = sin(ang);
      vec2 e = vec2(ca * d.x + sa * d.y, -sa * d.x + ca * d.y) / vec2(r * 1.25, r * 0.85);
      float rr = dot(e, e);
      if (rr < 1.0) {
        float z = sqrt(1.0 - rr);                                              // dome height
        vec3 nrm = normalize(vec3(e * 0.8, z)), L = normalize(vec3(0.3, 0.4, 1.0));
        vec3 col = mix(vec3(0.58, 0.54, 0.45), pebbleCol(h), 0.75) * (0.68 + 0.4 * max(dot(nrm, L), 0.0)) * (0.9 + 0.2 * vnoise(q * 6.0 + h * 10.0));
        float cov = smoothstep(1.0, 0.82, rr);
        if (cov > best.a) best = vec4(col, cov);
      }
    }
    return best;
  }
  vec3 bed(vec2 q) {
    vec3 sand = vec3(0.60, 0.55, 0.44) * (0.82 + 0.25 * vnoise(q * 7.0) + 0.1 * vnoise(q * 31.0));
    vec4 small = pebbles(q + 13.7, 0.9, 0.45), big = pebbles(q, 2.6, 0.28);
    vec3 col = mix(sand, small.rgb, small.a * 0.9);
    col *= 1.0 - 0.18 * big.a * (1.0 - smoothstep(0.0, 0.5, big.a));          // contact shadow
    return mix(col, big.rgb, big.a);
  }
  void main() {
    vec2 p = uCenter + (gl_FragCoord.xy - 0.5 * uRes) * uScale;
    float eta = 0.0; vec2 gr = vec2(0); float hxx = 0.0, hxy = 0.0, hyy = 0.0;
    for (int j = 0; j < 64; j++) {
      if (j >= uN) break;
      vec3 v = uV[j]; float A = v.z * v.z * uAmp; vec2 d = p - v.xy; float s = dot(d, d) + uA2;
      float s2 = s * s, s3 = s2 * s;
      eta -= A / s; gr += A * 2.0 * d / s2;
      hxx += 2.0 * A / s2 - 8.0 * A * d.x * d.x / s3; hyy += 2.0 * A / s2 - 8.0 * A * d.y * d.y / s3; hxy -= 8.0 * A * d.x * d.y / s3;
    }
    // gentle ripples (analytic, so they also make a faint caustic net)
    for (int i = 0; i < 5; i++) {
      float fi = float(i); vec2 dir = vec2(cos(1.3 + fi * 2.1), sin(1.3 + fi * 2.1)); float kw = 0.7 + 0.35 * fi, w = sqrt(981.0 * kw) * 0.12;
      float ph = kw * dot(dir, p) - w * uTime + fi * 1.7, amp = uRipple / (1.0 + fi);
      eta += amp * sin(ph); gr += amp * kw * cos(ph) * dir;
      float c2 = -amp * kw * kw * sin(ph); hxx += c2 * dir.x * dir.x; hyy += c2 * dir.y * dir.y; hxy += c2 * dir.x * dir.y;
    }
    float det = (1.0 + uK * hxx) * (1.0 + uK * hyy) - uK * uK * hxy * hxy;
    float light = clamp(1.0 / max(abs(det), 0.16), 0.0, 5.0);
    light = light / (1.0 + 0.18 * light) * 1.18;                    // soft tone curve
    vec3 floorCol = bed(p + uK * gr);
    vec3 tint = vec3(0.70, 0.80, 0.66);
    vec3 under = floorCol * tint * (0.34 + 0.70 * light) + vec3(0.03, 0.05, 0.04);
    vec3 n = normalize(vec3(-gr * 18.0, 1.0));
    float fres = 0.02 + 0.98 * pow(1.0 - n.z, 5.0);
    vec3 sky = mix(vec3(0.72, 0.80, 0.88), vec3(0.95, 0.97, 1.0), clamp(n.y * 4.0 + 0.5, 0.0, 1.0));
    vec3 sunDir = normalize(vec3(0.25, 0.35, 1.0));
    vec3 r = reflect(vec3(0, 0, -1), n); float glint = pow(max(dot(r, sunDir), 0.0), 1400.0) * uGlint * 0.35;
    vec3 col = mix(under, sky, fres) + vec3(1.0, 0.97, 0.9) * glint;
    frag = vec4(pow(col, vec3(1.0 / 1.1)), 1.0);
  }`;
  function WaterRenderer(canvas, opts = {}) {
    const gl = canvas.getContext("webgl2", { antialias: false, preserveDrawingBuffer: !!opts.preserve, premultipliedAlpha: false });
    if (!gl) throw new Error("WebGL2 unavailable");
    const sh = (t, src) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(pr, n), vbuf = new Float32Array(64 * 3);
    this.render = function (o) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U("uRes"), canvas.width, canvas.height); gl.uniform2f(U("uCenter"), o.cx ?? 0, o.cy ?? 0);
      gl.uniform1f(U("uScale"), o.scale); gl.uniform1f(U("uTime"), o.time ?? 0); gl.uniform1f(U("uA2"), (o.a ?? 0.6) ** 2);
      gl.uniform1f(U("uAmp"), (o.exaggerate ?? 1) / (8 * Math.PI * Math.PI * 981)); gl.uniform1f(U("uK"), o.k ?? 6.2);
      gl.uniform1f(U("uRipple"), o.ripple ?? 0.004); gl.uniform1f(U("uGlint"), o.glint ?? 1);
      const vs = o.vortices || []; const n = Math.min(64, vs.length);
      for (let i = 0; i < n; i++) { vbuf[3 * i] = vs[i][0]; vbuf[3 * i + 1] = vs[i][1]; vbuf[3 * i + 2] = vs[i][2]; }
      gl.uniform1i(U("uN"), n); gl.uniform3fv(U("uV"), vbuf);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
  }
  root.WaterRenderer = WaterRenderer;
})(typeof globalThis !== 'undefined' ? globalThis : this);
