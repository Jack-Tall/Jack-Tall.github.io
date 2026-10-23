/* Bladerbaar boek. Gebruik: Flipbook(element, { pages: [urls], w, h, title })
   Dubbele pagina's op brede schermen, één pagina op smalle. Klik, swipe, pijltjestoetsen. */
(function () {
  "use strict";

  function Flipbook(root, o) {
    var pages = o.pages, n = pages.length, ratio = o.w / o.h;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var DUR = reduce ? 0 : 750;
    var single = false, s = 0, busy = false, inView = false;

    root.classList.add("flipbook");
    root.setAttribute("tabindex", "0");
    root.setAttribute("aria-roledescription", "boek");
    root.setAttribute("aria-label", (o.title || "Boek") + ", " + n + " pagina's. Gebruik de pijltjestoetsen om te bladeren.");
    root.innerHTML =
      '<div class="fb-stage"><div class="fb-book">' +
        '<div class="fb-page fb-l"><img alt=""></div>' +
        '<div class="fb-page fb-r"><img alt=""></div>' +
        '<div class="fb-spine" aria-hidden="true"></div>' +
      '</div></div>' +
      '<div class="fb-bar">' +
        '<button type="button" class="fb-prev" aria-label="Vorige pagina">←</button>' +
        '<span class="fb-count" aria-live="polite"></span>' +
        '<button type="button" class="fb-next" aria-label="Volgende pagina">→</button>' +
        '<span class="fb-cap"></span>' +
        '<button type="button" class="fb-full">Volledig scherm</button>' +
      '</div>';

    var stage = root.querySelector(".fb-stage"), book = root.querySelector(".fb-book");
    var L = root.querySelector(".fb-l"), R = root.querySelector(".fb-r");
    var Li = L.querySelector("img"), Ri = R.querySelector("img");
    var count = root.querySelector(".fb-count");
    root.querySelector(".fb-cap").textContent = o.cap || "";
    var fullBtn = root.querySelector(".fb-full");
    if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) fullBtn.hidden = true;

    /* ---- model ---- */
    function lastSpread() { return single ? n - 1 : Math.floor(n / 2); }
    function leftIdx(k) { return single ? -1 : 2 * k - 1; }
    function rightIdx(k) { return single ? k : 2 * k; }
    function url(i) { return i >= 0 && i < n ? pages[i] : null; }
    function setImg(el, img, i) {
      var u = url(i);
      if (u) { img.src = u; img.alt = "Pagina " + (i + 1); el.classList.remove("empty"); }
      else { img.removeAttribute("src"); img.alt = ""; el.classList.add("empty"); }
    }
    function shift(k) {
      if (single) return 0;
      if (k === 0) return -25;
      if (!url(rightIdx(k))) return 25;
      return 0;
    }
    function label() {
      if (single) return "p. " + (s + 1) + " / " + n;
      if (s === 0) return "Omslag · " + n + " p.";
      var a = leftIdx(s) + 1, b = rightIdx(s) + 1;
      return (b > n ? "p. " + a : "p. " + a + "–" + b) + " / " + n;
    }
    function paint() {
      setImg(L, Li, leftIdx(s)); setImg(R, Ri, rightIdx(s));
      book.style.transform = "translateX(" + shift(s) + "%)";
      count.textContent = label();
      root.querySelector(".fb-prev").disabled = s === 0;
      root.querySelector(".fb-next").disabled = s === lastSpread();
      for (var i = 1; i <= 4; i++) { var u = url(rightIdx(s) + i); if (u) { var im = new Image(); im.src = u; } }
    }

    /* ---- maat ---- */
    function size() {
      var full = root.classList.contains("is-full");
      var avail = stage.clientWidth || root.clientWidth;
      single = !full && avail < 620;
      root.classList.toggle("is-single", single);
      var maxH = full ? window.innerHeight - 90 : Math.min(window.innerHeight * 0.82, 900);
      var pw = Math.min(single ? avail : avail / 2, maxH * ratio);
      var ph = pw / ratio;
      book.style.width = (single ? pw : pw * 2) + "px";
      book.style.height = ph + "px";
      stage.style.height = ph + "px";
      if (s > lastSpread()) s = lastSpread();
      paint();
    }

    /* ---- bladeren ---- */
    function leaf(front, back, side) {
      var el = document.createElement("div");
      el.className = "fb-leaf fb-leaf-" + side;
      el.innerHTML = '<div class="fb-face fb-front"><img alt=""></div><div class="fb-face fb-back"><img alt=""></div><div class="fb-shade"></div>';
      var f = el.querySelector(".fb-front img"), b = el.querySelector(".fb-back img");
      if (front) f.src = front; else el.querySelector(".fb-front").classList.add("empty");
      if (back) b.src = back; else el.querySelector(".fb-back").classList.add("empty");
      book.appendChild(el);
      return el;
    }
    function go(dir) {
      var to = s + dir;
      if (busy || to < 0 || to > lastSpread()) return;
      if (DUR === 0) { s = to; paint(); return; }
      busy = true;
      var el;
      if (dir > 0) {
        el = leaf(url(rightIdx(s)), single ? null : url(leftIdx(to)), single ? "single" : "right");
        setImg(R, Ri, rightIdx(to));
      } else if (single) {
        el = leaf(url(rightIdx(to)), null, "single");
        el.classList.add("from-left");
      } else {
        el = leaf(url(leftIdx(s)), url(rightIdx(to)), "left");
        setImg(L, Li, leftIdx(to));
      }
      book.style.transform = "translateX(" + shift(to) + "%)";
      el.getBoundingClientRect();
      requestAnimationFrame(function () { el.classList.add("go"); });
      setTimeout(function () { s = to; paint(); el.remove(); busy = false; }, DUR + 30);
    }

    /* ---- invoer ---- */
    root.querySelector(".fb-prev").addEventListener("click", function () { go(-1); });
    root.querySelector(".fb-next").addEventListener("click", function () { go(1); });
    var sx = null, sy = null;
    stage.addEventListener("pointerdown", function (e) { sx = e.clientX; sy = e.clientY; });
    stage.addEventListener("pointerup", function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { go(dx < 0 ? 1 : -1); return; }
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
        var r = book.getBoundingClientRect();
        go(e.clientX > r.left + r.width / 2 || (single && e.clientX > r.left + r.width * 0.33) ? 1 : -1);
      }
    });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { go(1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { go(-1); e.preventDefault(); }
    });
    document.addEventListener("keydown", function (e) {
      if (!inView || root.contains(document.activeElement)) return;
      var lb = document.querySelector(".lightbox");
      if (lb && !lb.hidden) return;
      if (/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || "")) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { inView = es[0].intersectionRatio > 0.5; }, { threshold: [0, 0.5, 1] }).observe(stage);
    }
    fullBtn.addEventListener("click", function () {
      var fe = document.fullscreenElement || document.webkitFullscreenElement;
      if (fe) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else (root.requestFullscreen || root.webkitRequestFullscreen).call(root);
    });
    function onFs() {
      var on = (document.fullscreenElement || document.webkitFullscreenElement) === root;
      root.classList.toggle("is-full", on);
      fullBtn.textContent = on ? "Sluiten" : "Volledig scherm";
      size();
      if (on) root.focus();
    }
    document.addEventListener("fullscreenchange", onFs);
    document.addEventListener("webkitfullscreenchange", onFs);
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(size, 120); });
    size();
  }
  window.Flipbook = Flipbook;
})();
