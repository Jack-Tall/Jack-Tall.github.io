/* Puntwolk achter het startscherm: eigen LiDAR-scan(s), getekend met WebGL (geen bibliotheken).
   De scans (data/scan-1.js … scan-3.js) vloeien in elkaar over. Draait traag, reageert op scrollen en slepen.
   Elke refresh start de boom vanuit een andere hoek en draait hij in een willekeurige richting. */
(function () {
  "use strict";
  var wrap = document.querySelector(".home");
  var SCANS = window.SCANS || [];
  if (!wrap || !SCANS.length) return;
  var canvas = wrap.querySelector(".home-bg canvas");
  var nameEl = wrap.querySelector(".hero-name");
  var nextBtn = wrap.querySelector(".hero-next");
  var gl = canvas.getContext("webgl", { antialias: true, alpha: false });
  if (!gl) { wrap.classList.add("no-webgl"); return; }
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TOTAL = 1, HOLD = 9000, MORPH = 2600;
  var WIT = 0.82;                                  /* 0 = echte kleuren uit de scan, 1 = helemaal wit */
  var START = Math.random() * Math.PI * 2;         /* andere hoek bij elke refresh */
  var RICHTING = Math.random() < 0.5 ? -1 : 1;     /* draairichting */
  var bg = (getComputedStyle(document.documentElement).getPropertyValue("--home-bg").trim() || "#ff3300").replace("#", "");
  if (bg.length === 3) bg = bg.replace(/./g, "$&$&");
  var BG = [0, 2, 4].map(function (k) { return parseInt(bg.substr(k, 2), 16) / 255; });

  function b64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function decode(S) {
    if (!S._pos) { S._pos = new Int16Array(b64(S.pos).buffer); S._rgb = b64(S.rgb); }
    return S;
  }

  var vs =
    "attribute vec3 pa; attribute vec3 pb; attribute vec3 ca; attribute vec3 cb;" +
    "uniform mat4 m; uniform float s; uniform float t; uniform float w; varying vec3 vc;" +
    "float h(vec3 p){ return fract(sin(dot(p.xy + p.z, vec2(12.9898, 78.233))) * 43758.5453); }" +
    "void main(){" +
    "  vec3 a = pa / 32767.0, b = pb / 32767.0; float r = h(a);" +
    "  float e = clamp(t * 1.7 - r * 0.7, 0.0, 1.0); e = e * e * (3.0 - 2.0 * e);" +
    "  vec3 p = mix(a, b, e); p.y += sin(e * 3.14159) * (0.12 + 0.25 * h(b));" +
    "  vec4 q = m * vec4(p, 1.0); gl_Position = q; gl_PointSize = s / q.w;" +
    "  vec3 c = mix(ca, cb, e) / 255.0;" +
    "  vc = mix(clamp((c - 0.5) * 1.12 + 0.46, 0.0, 1.0), vec3(1.0), w);" +
    "}";
  var fs =
    "precision mediump float; varying vec3 vc;" +
    "void main(){ vec2 d = gl_PointCoord - 0.5; if (dot(d, d) > 0.25) discard; gl_FragColor = vec4(vc, 1.0); }";
  function sh(ty, src) { var o = gl.createShader(ty); gl.shaderSource(o, src); gl.compileShader(o); return o; }
  var pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { wrap.classList.add("no-webgl"); return; }
  gl.useProgram(pr);

  function attr(name, size, type) {
    var buf = gl.createBuffer(), loc = gl.getAttribLocation(pr, name);
    gl.enableVertexAttribArray(loc);
    return { set: function (data) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.vertexAttribPointer(loc, size, type, false, 0, 0);
    } };
  }
  var PA = attr("pa", 3, gl.SHORT), PB = attr("pb", 3, gl.SHORT), CA = attr("ca", 3, gl.UNSIGNED_BYTE), CB = attr("cb", 3, gl.UNSIGNED_BYTE);
  var um = gl.getUniformLocation(pr, "m"), us = gl.getUniformLocation(pr, "s"), ut = gl.getUniformLocation(pr, "t");
  gl.uniform1f(gl.getUniformLocation(pr, "w"), WIT);
  gl.enable(gl.DEPTH_TEST); gl.clearColor(BG[0], BG[1], BG[2], 1);

  var cur = 0, nxt = 0, n = 0, morphStart = -1, lastSwitch = performance.now();
  function show(i, j) {
    var A = decode(SCANS[i]), B = decode(SCANS[j]);
    n = Math.min(A.n, B.n);
    PA.set(A._pos); CA.set(A._rgb); PB.set(B._pos); CB.set(B._rgb);
  }
  function label() {
    if (nameEl) nameEl.textContent = SCANS[cur].name + (TOTAL > 1 ? " · " + (cur + 1) + "/" + Math.max(SCANS.length, TOTAL) : "");
  }
  show(0, 0); label();

  function startMorph() {
    if (SCANS.length < 2 || morphStart >= 0) return;
    nxt = (cur + 1) % SCANS.length;
    show(cur, nxt);
    morphStart = performance.now();
    if (reduce) finishMorph();
  }
  function finishMorph() {
    cur = nxt; morphStart = -1; lastSwitch = performance.now();
    show(cur, cur); label();
  }
  if (nextBtn) {
    nextBtn.hidden = true;
    nextBtn.addEventListener("click", function () { startMorph(); if (reduce) frame(); });
  }

  /* overige scans pas laden als de eerste in beeld staat */
  function loadRest() {
    for (var k = 2; k <= TOTAL; k++) {
      var sc = document.createElement("script"); sc.src = "data/scan-" + k + ".js"; sc.async = false;
      sc.onload = function () { if (nextBtn) nextBtn.hidden = SCANS.length < 2; label(); };
      document.body.appendChild(sc);
    }
  }
  setTimeout(loadRest, 1500);

  /* matrices */
  function persp(f, a, nr, fr) { var t = 1 / Math.tan(f / 2), d = 1 / (nr - fr); return [t / a, 0, 0, 0, 0, t, 0, 0, 0, 0, (fr + nr) * d, -1, 0, 0, 2 * fr * nr * d, 0]; }
  function mul(a, b) { var o = new Array(16); for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) o[j * 4 + i] = a[i] * b[j * 4] + a[4 + i] * b[j * 4 + 1] + a[8 + i] * b[j * 4 + 2] + a[12 + i] * b[j * 4 + 3]; return o; }
  function look(e, c) {
    var z = [e[0] - c[0], e[1] - c[1], e[2] - c[2]], zl = Math.hypot(z[0], z[1], z[2]); z = z.map(function (x) { return x / zl; });
    var x = [z[2], 0, -z[0]], xl = Math.hypot(x[0], x[1], x[2]) || 1; x = x.map(function (q) { return q / xl; });
    var y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0,
      -(x[0] * e[0] + x[1] * e[1] + x[2] * e[2]), -(y[0] * e[0] + y[1] * e[1] + y[2] * e[2]), -(z[0] * e[0] + z[1] * e[1] + z[2] * e[2]), 1];
  }

  /* interactie */
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, drag = 0, dragV = 0, down = null, visible = true, t0 = performance.now();
  function resize() {
    var r = canvas.getBoundingClientRect(); W = Math.round(r.width * dpr); H = Math.round(r.height * dpr);
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
    gl.viewport(0, 0, W, H);
  }
  function scrollProgress() { var r = wrap.getBoundingClientRect(); return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height))); }
  canvas.addEventListener("pointerdown", function (e) { down = e.clientX; canvas.setPointerCapture(e.pointerId); wrap.classList.add("grab"); });
  canvas.addEventListener("pointermove", function (e) {
    if (down === null) return; var dx = e.clientX - down; down = e.clientX; drag += dx * 0.008; dragV = dx * 0.008; if (reduce) frame();
  });
  function up() { down = null; wrap.classList.remove("grab"); }
  canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up);

  function frame(now) {
    now = now || performance.now();
    resize();
    if (!reduce && morphStart < 0 && now - lastSwitch > HOLD) startMorph();
    var t = 0;
    if (morphStart >= 0) { t = Math.min(1, (now - morphStart) / MORPH); if (t >= 1) { finishMorph(); t = 0; } }
    var p = reduce ? 0 : scrollProgress(), tt = reduce ? 0 : (now - t0) / 1000;
    if (down === null) { drag += dragV; dragV *= 0.94; }
    var th = START + RICHTING * (tt * 0.06 + p * 1.6) + drag;
    var ph = 0.1 + p * 0.38;
    var d = 2.0 - p * 0.75;
    var eye = [Math.sin(th) * Math.cos(ph) * d, Math.sin(ph) * d, Math.cos(th) * Math.cos(ph) * d];
    var m = mul(persp(0.75, W / Math.max(1, H), 0.05, 20), look(eye, [0, 0.02, 0]));
    gl.uniformMatrix4fv(um, false, new Float32Array(m));
    gl.uniform1f(us, 2.7 * dpr * Math.max(0.9, Math.min(1.6, W / (900 * dpr))));
    gl.uniform1f(ut, t);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, n);
  }
  function loop(now) {
    if (visible && !document.hidden) frame(now); else lastSwitch = now;   /* niet wisselen als niemand kijkt */
    if (!reduce) requestAnimationFrame(loop);
  }
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(wrap);
  window.addEventListener("resize", function () { if (reduce) frame(); });
  wrap.classList.add("ready");
  if (reduce) frame(); else requestAnimationFrame(loop);
})();
