/* Jack Tallieu — portfolio. Alle inhoud staat in data/projects.js.
   Alles gebeurt op index.html: een project opent onder het startscherm (index.html?p=slug). */
(function () {
  "use strict";

  /* ---- instellingen ---- */
  var WORD_MS = 55;        /* opstarten: milliseconden per woord */
  var THINK_MS = 1400;     /* opstarten: zo lang "denkt" de site na je naam (de drie puntjes) */

  var S = window.SITE || { years: [], projects: [] };
  var P = S.projects;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var src = function (p, f, thumb) { return "img/" + p.slug + "/" + (thumb ? "t/" : "") + f; };
  var cover = function (p) {
    if (p.thumb) return p.thumb;
    var m = p.media && p.media[p.cover || 0];
    return m ? (m.poster || m.f) : null;
  };
  var href = function (p, k) { return "?p=" + encodeURIComponent(p.slug) + (k != null ? "#b" + (k + 1) : ""); };
  var yearOf = function (y) { return S.years.filter(function (x) { return x.id === y; })[0] || { id: y, name: "Jaar " + y, period: "" }; };
  var indexOf = function (slug) { for (var i = 0; i < P.length; i++) if (P[i].slug === slug) return i; return -1; };
  var shuffle = function (a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* adresbalk bijwerken; lukt niet als je index.html los opent (file://), dan gewoon overslaan */
  var hist = function (fn, st, url) { try { history[fn](st, "", url); } catch (e) {} };
  var wide = window.matchMedia("(min-width: 800px)");

  P.forEach(function (p, i) { p.n = i + 1; });
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";   /* na herladen altijd bovenaan */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  var scrollToEl = function (el, instant) {
    var y = !el || el.id === "top" ? 0 : el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: instant || reduce ? "auto" : "smooth" });
  };

  /* ---------------- video onderaan ---------------- */
  $$(".outro video").forEach(function (v) {
    if (reduce) { v.removeAttribute("autoplay"); v.pause(); v.controls = true; return; }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause();
      }).observe(v);
    }
  });

  /* ---------------- opstarten zoals TDR: woord per woord, het nieuwste woord even wit,
                      na je naam een pauze met drie puntjes ---------------- */
  var typeIn = function (root) {
    if (!root || reduce) return;
    var texts = [], words = [], walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    while ((n = walk.nextNode())) texts.push(n);
    texts.forEach(function (t) {
      var frag = document.createDocumentFragment();
      t.nodeValue.replace(/\s+/g, " ").split(/( )/).forEach(function (part) {
        if (!part) return;
        if (part === " ") { frag.appendChild(document.createTextNode(" ")); return; }
        var w = document.createElement("span");
        w.className = "tw"; w.textContent = part;
        frag.appendChild(w); words.push(w);
      });
      t.parentNode.replaceChild(frag, t);
    });
    if (!words.length) return;
    var nameEl = $(".home-name", root), pauseAt = -1;
    words.forEach(function (w, k) { if (nameEl && nameEl.contains(w)) pauseAt = k; });
    var i = 0, timer = null, dotTimer = null, dots = null, stopped = false;
    root.classList.add("typing");
    var finish = function () {
      if (stopped) return;
      stopped = true;
      clearTimeout(timer); clearInterval(dotTimer);
      if (dots) dots.remove();
      words.forEach(function (w) { w.classList.add("on"); w.classList.remove("now"); });
      root.classList.remove("typing");
      document.removeEventListener("keydown", finish);
    };
    var think = function () {
      dots = document.createElement("span");
      dots.className = "dots"; dots.setAttribute("aria-hidden", "true");
      nameEl.parentNode.insertBefore(dots, nameEl.nextSibling);
      var c = 0;
      dotTimer = setInterval(function () { c = (c + 1) % 4; dots.textContent = ".".repeat(c); }, 280);
      timer = setTimeout(function () {
        clearInterval(dotTimer); dots.remove(); dots = null;
        words[pauseAt].classList.remove("now");
        next();
      }, THINK_MS);
    };
    var next = function () {
      if (stopped) return;
      if (i >= words.length) { finish(); return; }
      if (i > 0) words[i - 1].classList.remove("now");
      words[i].classList.add("on", "now");
      if (i++ === pauseAt) { think(); return; }
      timer = setTimeout(next, WORD_MS);
    };
    document.addEventListener("keydown", finish);
    timer = setTimeout(next, 200);
  };

  /* ---------------- startscherm: alle projecten, bij elke refresh in een andere volgorde,
                      met af en toe een woord uit data/woorden.js ertussen ---------------- */
  var homeIndex = $(".home-index");
  if (homeIndex) {
    var W = window.WOORDEN || { aantal: 0, woorden: [] };
    var parts = shuffle(P).map(function (p) { return '<a href="' + href(p) + '">' + esc(p.title) + "</a>"; });
    shuffle(W.woorden || []).slice(0, W.aantal || 0).forEach(function (w) {
      var at = 1 + Math.floor(Math.random() * parts.length);   /* nooit helemaal vooraan */
      parts.splice(at, 0, '<span class="w">' + esc(w) + "</span>");
    });
    homeIndex.innerHTML = parts.join(" ") + ".";
    typeIn($(".home-text"));
  }

  /* ---------------- werkoverzicht ---------------- */
  var setYear = null;
  var work = $("#work");
  if (work) {
    var featured = P.filter(function (p) { return p.featured; });
    var fromHash = (location.hash.match(/^#(alles|jaar-\d)$/) || [])[1];
    var state = {
      year: fromHash ? (fromHash === "alles" ? "all" : fromHash.slice(5)) : (featured.length ? "sel" : "all"),
      view: store.get("view") === "list" ? "list" : "grid"
    };

    var filters = $(".filters");
    var opts = (featured.length ? [{ id: "sel", name: "Selectie", count: featured.length }] : [])
      .concat([{ id: "all", name: "Alles", count: P.length }])
      .concat(S.years.map(function (y) {
        return { id: String(y.id), name: y.name, count: P.filter(function (p) { return p.year === y.id; }).length };
      }).filter(function (o) { return o.count > 0; }));
    filters.innerHTML = opts.map(function (o) {
      return '<button type="button" data-filter="' + o.id + '">' + esc(o.name) + "<sup>" + o.count + "</sup></button>";
    }).join(" ") + ".";

    var thumb = function (p) {
      var c = cover(p);
      if (!c) return '<div class="thumb"></div>';
      var img = '<img loading="lazy" src="' + esc(src(p, c, true)) + '" alt="' + esc(p.title) + '">';
      return p.book ? '<div class="thumb is-book"><span class="bk">' + img + "</span></div>" : '<div class="thumb">' + img + "</div>";
    };
    var cap = function (p) {
      return '<p class="cap"><span class="t">' + esc(p.title) + '</span> <span class="m">' + esc(p.type) +
        (p.book ? ", bladerbaar" : "") + ".</span></p>";
    };
    var card = function (p) {
      var strip = (p.media || []).map(function (m, k) { return { m: m, k: k }; }).filter(function (x) { return !x.m.nohome; });
      if (p.home === "all" && strip.length > 1) {
        return '<div class="card wide"><div class="strip" style="--k:' + strip.length + '">' + strip.map(function (x) {
          var m = x.m;
          return '<a class="thumb" href="' + href(p, x.k) + '" title="' + esc(m.cap || p.title) + '"><img loading="lazy" src="' + esc(src(p, m.poster || m.f, true)) + '" alt="' + esc(p.title + (m.cap ? ": " + m.cap : "")) + '"></a>';
        }).join("") + '</div><a class="capl" href="' + href(p) + '">' + cap(p) + "</a></div>";
      }
      return '<a class="card' + (p.size === "large" ? " large" : "") + '" href="' + href(p) + '">' + thumb(p) + cap(p) + "</a>";
    };
    /* lijst: alle titels als doorlopende tekst, met het soort werk in grijs */
    var rows = function (list) {
      return '<p class="runlist">' + list.map(function (p) {
        return '<a href="' + href(p) + '"><span class="t">' + esc(p.title) + '</span> <span class="ty">' + esc(p.type) + "</span></a>";
      }).join(" ") + ".</p>";
    };
    var section = function (id, name, meta, list, note) {
      var head = '<header class="year-head"><h2>' + esc(name) + ".</h2> <p>" + esc(meta) + ".</p></header>";
      var body = !list.length ? '<p class="empty">' + esc(note || "Binnenkort.") + "</p>"
        : state.view === "grid" ? '<div class="cards grid">' + list.map(card).join("") + "</div>" : rows(list);
      return '<section class="year' + (list.length ? "" : " is-empty") + '" id="' + id + '">' + head + body + "</section>";
    };

    var render = function () {
      $$("button", filters).forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.filter === state.year ? "true" : "false"); });
      $$(".views button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.view === state.view ? "true" : "false"); });
      if (state.year === "sel") {
        work.innerHTML = section("selectie", "Selectie", featured.length + " projecten uit jaar 1 en 2", featured) +
          '<p class="more"><button type="button" data-filter="all">Bekijk alle ' + P.length + " projecten →</button></p>";
        return;
      }
      var years = S.years.filter(function (y) { return state.year === "all" || String(y.id) === state.year; });
      work.innerHTML = years.map(function (y) {
        var list = P.filter(function (p) { return p.year === y.id; });
        var meta = y.period + (list.length ? ", " + list.length + (list.length === 1 ? " project" : " projecten") : "");
        return section("jaar-" + y.id, y.name, meta, list, y.note);
      }).join("");
    };
    setYear = function (y) {
      state.year = y;
      if (!new URLSearchParams(location.search).get("p")) {
        hist("replaceState", history.state, y === "sel" ? location.pathname : y === "all" ? "#alles" : "#jaar-" + y);
      }
      render();
    };

    $(".werk").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]");
      if (b) { setYear(b.dataset.filter); if (b.closest("#work")) scrollToEl($("#werk")); return; }
      var v = e.target.closest(".views button");
      if (v) { state.view = v.dataset.view; store.set("view", state.view); render(); }
    });
    render();
  }

  /* ---------------- project: opent onder het startscherm ---------------- */
  var proj = $("#project");
  var lbImgs = [], lbProject = null;

  var renderProject = function (i) {
    var p = P[i], y = yearOf(p.year), media = p.media || [];
    lbProject = p;
    document.title = p.title + " — Jack Tallieu";

    var facts = [["Vak", p.course], ["Opdracht", p.assignment], ["Formaat", p.format], ["Met", p.team]]
      .filter(function (f) { return f[1]; })
      .map(function (f) { return '<span class="t-label">' + f[0] + ":</span> " + esc(f[1]) + "."; }).join(" ");

    var figs = media.map(function (m, k) {
      var c = m.cap ? esc(m.cap) : pad(k + 1) + "/" + pad(media.length);
      var wh = m.w ? ' width="' + m.w + '" height="' + m.h + '"' : "";
      var inner;
      if (m.video && m.loop && !reduce) {
        inner = '<video class="loop" muted loop playsinline autoplay preload="metadata"' + wh +
          (m.poster ? ' poster="' + esc(src(p, m.poster)) + '"' : "") + ' src="' + esc(src(p, m.video)) + '"></video>';
      } else if (m.video) {
        inner = '<video controls playsinline preload="none"' + wh +
          (m.poster ? ' poster="' + esc(src(p, m.poster)) + '"' : "") + ' src="' + esc(src(p, m.video)) + '"></video>';
      } else {
        inner = '<img loading="' + (k < 3 || !m.w ? "eager" : "lazy") + '" src="' + esc(src(p, m.f)) + '"' + wh +
          ' alt="' + esc(p.title + (m.cap ? ", " + m.cap : ", beeld " + (k + 1))) + '">';
      }
      return '<figure id="b' + (k + 1) + '"><div class="frame"' + (m.video ? "" : ' data-k="' + k + '"') + ">" + inner +
        "</div><figcaption>" + c + "</figcaption></figure>";
    });

    var prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    proj.innerHTML =
      '<p class="p-head">' +
        '<a class="p-mark" href="index.html" data-go="reload" aria-label="Naar de startpagina"><img src="media/logo.svg" alt=""></a> ' +
        '<a href="#werk" data-go="werk">Werk</a> ' +
        '<a href="#jaar-' + p.year + '" data-go="werk" data-filter="' + p.year + '">' + esc(y.name) + "</a> " +
        '<span class="p-title">' + esc(p.title) + "</span> " +
        '<span class="p-type">' + esc(p.type) + "</span> " +
        (media.length > 1 ? '<span class="p-num">(<span class="p-count">1</span> / ' + media.length + ")</span> " : "") +
        '<button type="button" class="p-close">Sluiten.</button>' +
      "</p>" +
      '<div class="p-info">' +
        (facts ? '<p class="p-facts">' + facts + "</p>" : "") +
        (p.text || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
        ((p.links || []).length ? '<p class="p-links">' + p.links.map(function (l) {
          return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label || "Bekijk") + " ↗</a>";
        }).join(" ") + "</p>" : "") +
      "</div>" +
      (p.book ? '<div class="p-book"><div class="book-slot"></div></div>' : "") +
      (figs.length ? '<div class="p-strip"><div class="p-pin"><div class="p-track">' + figs.join("") + "</div></div></div>" : "") +
      '<p class="pager">' +
        '<a href="' + href(prev) + '">← ' + esc(prev.title) + "</a> " +
        '<a href="' + href(next) + '">' + esc(next.title) + " →</a> " +
        '<button type="button" class="p-close">Sluiten.</button>' +
      "</p>";

    if (p.book && window.Flipbook) {
      window.Flipbook($(".book-slot", proj), {
        pages: p.book.pages.map(function (f) { return "img/" + p.slug + "/book/" + f; }),
        w: p.book.w, h: p.book.h, title: p.title, cap: p.book.cap
      });
    }
    $$("video.loop", proj).forEach(function (v) {
      if (!("IntersectionObserver" in window)) return;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause();
      }).observe(v);
    });
    $$(".p-track img, .p-track video", proj).forEach(function (el) {
      el.addEventListener(el.tagName === "IMG" ? "load" : "loadedmetadata", relayout);
    });
    lbImgs = media.map(function (m, k) { return { m: m, k: k }; }).filter(function (x) { return !x.m.video; });
  };

  /* horizontale beeldstrook: verticaal scrollen schuift de beelden opzij (vanaf 800 px breed) */
  var headH = function () { var h = $(".p-head", proj); return h ? h.offsetHeight : 0; };
  var stripMove = function () {
    var strip = $(".p-strip", proj);
    if (!strip || proj.hidden) return;
    var track = $(".p-track", proj), figs = track.children, x = 0, k = 0;
    if (wide.matches && strip._extra) {
      x = Math.min(strip._extra, Math.max(0, headH() - strip.getBoundingClientRect().top));
      track.style.transform = "translate3d(" + (-x) + "px,0,0)";
      var ref = x + track.clientWidth * (x / strip._extra), best = 1e9;
      for (var j = 0; j < figs.length; j++) {
        var d = Math.abs(figs[j].offsetLeft + figs[j].offsetWidth / 2 - ref);
        if (d < best) { best = d; k = j; }
      }
    } else {
      for (var q = 0; q < figs.length; q++) if (figs[q].getBoundingClientRect().top < window.innerHeight * 0.45) k = q;
    }
    var cnt = $(".p-count", proj);
    if (cnt) cnt.textContent = k + 1;
  };
  var layoutStrip = function () {
    if (!proj || proj.hidden) return;
    proj.style.setProperty("--head-h", headH() + "px");
    var strip = $(".p-strip", proj);
    if (!strip) return;
    var track = $(".p-track", proj);
    if (!wide.matches) { strip.style.height = ""; track.style.transform = ""; strip._extra = 0; stripMove(); return; }
    var last = track.lastElementChild;
    var padR = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    var extra = last ? Math.max(0, last.offsetLeft + last.offsetWidth + padR - track.clientWidth) : 0;
    strip._extra = extra;
    strip.style.height = (window.innerHeight - headH() + extra) + "px";
    stripMove();
  };
  var lt; function relayout() { clearTimeout(lt); lt = setTimeout(layoutStrip, 60); }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; stripMove(); });
  }, { passive: true });
  window.addEventListener("resize", relayout);

  /* scrollpositie van beeld k (voor links naar één beeld) */
  var imageY = function (k) {
    var fig = document.getElementById("b" + k), strip = $(".p-strip", proj);
    if (!fig) return null;
    if (wide.matches && strip && strip._extra) {
      var top = strip.getBoundingClientRect().top + window.pageYOffset - headH();
      var padL = parseFloat(getComputedStyle($(".p-track", proj)).paddingLeft) || 0;
      return top + Math.min(strip._extra, Math.max(0, fig.offsetLeft - padL));
    }
    return fig.getBoundingClientRect().top + window.pageYOffset - headH() - 12;
  };

  var openProject = function (slug, o) {
    o = o || {};
    var i = indexOf(slug);
    if (i < 0 || !proj) return;
    if (o.push) hist("pushState", { p: slug }, href(P[i], o.img ? o.img - 1 : null));
    proj.hidden = false;   /* eerst zichtbaar maken: het boek meet zijn breedte bij het opbouwen */
    renderProject(i);
    layoutStrip();
    requestAnimationFrame(function () {
      var y = o.img ? imageY(o.img) : null;
      if (y == null) { scrollToEl(proj, o.instant); return; }
      window.scrollTo({ top: y, behavior: o.instant || reduce ? "auto" : "smooth" });
    });
  };
  var closeProject = function (push) {
    if (!proj || proj.hidden) return;
    proj.hidden = true; proj.innerHTML = ""; lbProject = null;
    document.title = "Jack Tallieu — Grafisch ontwerp";
    if (push) hist("pushState", {}, location.pathname);
    scrollToEl(null);
  };

  /* ---------------- eigen cursor: O, en X boven alles wat je kan aanklikken ---------------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var cursorEl = document.createElement("div"), cursorTxt = document.createElement("span");
    cursorEl.className = "cursor"; cursorEl.setAttribute("aria-hidden", "true");
    cursorTxt.textContent = "O"; cursorEl.appendChild(cursorTxt); document.body.appendChild(cursorEl);
    document.documentElement.classList.add("has-cursor");
    var CLICK = "a, button, .frame[data-k], .fb-stage";
    document.addEventListener("mousemove", function (e) {
      cursorEl.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
      cursorEl.classList.add("on");
    }, { passive: true });
    document.addEventListener("mouseover", function (e) {
      var t = e.target;
      cursorTxt.textContent = t.closest && t.closest(CLICK) ? "X" : "O";
      cursorEl.classList.toggle("inv", !!(t.closest && t.closest("img, video, .lightbox")));
    });
    document.addEventListener("mouseout", function (e) { if (!e.relatedTarget) cursorEl.classList.remove("on"); });
  }

  /* ---------------- klikken: scroll naar beneden en open ---------------- */
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var btn = e.target.closest("#project button");
    if (btn) {
      if (btn.classList.contains("p-close")) { closeProject(true); return; }
      return;
    }
    var a = e.target.closest("a");
    if (!a) return;
    var go = a.getAttribute("data-go");
    if (go === "reload") { e.preventDefault(); location.assign(location.pathname); return; }
    if (go) {
      e.preventDefault();
      if (a.dataset.filter && setYear) setYear(a.dataset.filter);
      scrollToEl(document.getElementById(go));
      return;
    }
    var m = (a.getAttribute("href") || "").match(/^\?p=([^#]+)(?:#b(\d+))?$/);
    if (m) {
      e.preventDefault();
      openProject(decodeURIComponent(m[1]), { push: true, img: m[2] ? +m[2] : null });
    }
  });

  window.addEventListener("popstate", function () {
    var s = new URLSearchParams(location.search).get("p");
    if (s) openProject(s, {}); else closeProject(false);
  });

  /* ---------------- lightbox ---------------- */
  var lb = $(".lightbox");
  if (lb && proj) {
    var lbImg = lb.querySelector("img"), lbCap = lb.querySelector("figcaption"), cur = 0, last = null;
    var show = function (n) {
      if (!lbImgs.length) return;
      cur = (n + lbImgs.length) % lbImgs.length;
      var x = lbImgs[cur], total = (lbProject.media || []).length;
      lbImg.src = src(lbProject, x.m.f); lbImg.alt = lbProject.title + ", beeld " + (x.k + 1);
      lbCap.textContent = (x.m.cap ? x.m.cap + ", " : "") + pad(x.k + 1) + "/" + pad(total);
    };
    var openLb = function (k) {
      last = document.activeElement;
      lbImgs.forEach(function (x, n) { if (x.k === k) cur = n; });
      show(cur); lb.hidden = false; document.body.style.overflow = "hidden"; lb.querySelector(".lb-close").focus();
    };
    var closeLb = function () { lb.hidden = true; document.body.style.overflow = ""; if (last) last.focus(); };
    proj.addEventListener("click", function (e) {
      var f = e.target.closest(".frame[data-k]"); if (f) openLb(+f.dataset.k);
    });
    lb.querySelector(".lb-close").addEventListener("click", closeLb);
    lb.querySelector(".lb-prev").addEventListener("click", function () { show(cur - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { show(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-stage")) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  /* ---------------- direct naar een project (gedeelde link of project.html) ---------------- */
  var startSlug = new URLSearchParams(location.search).get("p");
  if (startSlug) {
    var startImg = (location.hash.match(/^#b(\d+)$/) || [])[1];
    window.addEventListener("load", function () { openProject(startSlug, { instant: true, img: startImg ? +startImg : null }); });
  }
})();
