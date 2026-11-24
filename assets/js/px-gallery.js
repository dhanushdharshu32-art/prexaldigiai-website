/* Prexal DigiAI — renders Portfolio, AI Creative Works, Customer Reviews and
   the founder message from the data files. No editing needed here: change
   portfolio-data.js, creative-data.js, reviews-data.js or company-data.js. */
(function () {
  var CO = window.PX_COMPANY || {}, PF = window.PX_PORTFOLIO || [], CR = window.PX_CREATIVE || [], RV = window.PX_REVIEWS || [];
  var PF_CATS = ["Meta Ads", "Website", "E-Commerce", "Software", "AI Videos", "AI Posters", "Video Editing", "Google Ads", "LinkedIn Ads", "Social Media", "Digital Marketing", "Logo / Creative", "Advertising", "PPT"];
  var CR_CATS = ["AI Videos", "AI Posters", "PPT", "Promotional Creatives"];
  var showEmpty = !!CO.showEmptyFilters;

  function arr(x) { return Array.isArray(x) ? x : (x ? [x] : []); }
  function ext(f) { return String(f || "").split("?")[0].split(".").pop().toLowerCase(); }
  function kind(it) {
    var e = ext(it.file);
    if (!it.file) return "none";
    if (/^(mp4|webm|mov|m4v)$/.test(e)) return "video";
    if (/^(jpe?g|png|webp|gif|avif|svg)$/.test(e)) return "image";
    if (e === "pdf") return "pdf";
    if (/^(pptx?|ppsx?|key)$/.test(e)) return "ppt";
    return "file";
  }
  function el(tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; }
  function initials(t) { return String(t).replace(/[^A-Za-z0-9 ]/g, " ").split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase(); }
  var BADGE = { video: "Video", image: "Poster", pdf: "PDF", ppt: "PPT", file: "File" };

  /* ---------- modal (video / image) ---------- */
  var dlg, stage, capT, capS, lastFocus;
  function buildModal() {
    if (dlg) return;
    dlg = el("dialog", "pf-modal"); dlg.setAttribute("aria-label", "Media viewer");
    var x = el("button", "pf-x"); x.type = "button"; x.setAttribute("aria-label", "Close"); x.innerHTML = "&times;";
    stage = el("div", "pf-stage"); var cap = el("div", "pf-cap"); capT = el("b"); capS = el("span");
    cap.appendChild(capT); cap.appendChild(capS); dlg.appendChild(x); dlg.appendChild(stage); dlg.appendChild(cap);
    document.body.appendChild(dlg);
    x.onclick = close;
    dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
    dlg.addEventListener("close", cleanup);
  }
  function open(it, k) {
    if (typeof HTMLDialogElement === "undefined") { window.open(it.file, "_blank", "noopener"); return; }
    buildModal(); cleanup(); lastFocus = document.activeElement;
    var label = it.title + (it.description ? " — " + it.description : "");
    if (k === "video") {
      var v = el("video"); v.controls = true; v.playsInline = true; v.preload = "auto"; v.src = it.file;
      if (it.thumbnail) v.poster = it.thumbnail; v.setAttribute("aria-label", label); stage.appendChild(v);
    } else { var im = el("img"); im.src = it.file; im.alt = label; stage.appendChild(im); }
    capT.textContent = it.title; capS.textContent = [it.description || it.business, arr(it.category).join(" · ")].filter(Boolean).join("  |  ");
    document.documentElement.classList.add("pf-lock"); dlg.showModal();
    if (k === "video") { var p = stage.querySelector("video").play(); if (p && p.catch) p.catch(function () {}); }
  }
  function close() { if (dlg && dlg.open) dlg.close(); }
  function cleanup() {
    if (!stage) return; var v = stage.querySelector("video");
    if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    stage.innerHTML = ""; document.documentElement.classList.remove("pf-lock");
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} lastFocus = null; }
  }

  /* ---------- card ---------- */
  function card(it, i, opt) {
    var k = kind(it), cats = arr(it.category), c = el("article", "pf-card");
    c.style.setProperty("--i", i % 12);
    var playable = k === "video" || k === "image", media;
    if (playable) {
      media = el("button", "pf-media"); media.type = "button";
      media.setAttribute("aria-label", (k === "video" ? "Watch video: " : "View poster: ") + it.title + (it.description ? " — " + it.description : ""));
      media.onclick = function () { open(it, k); };
    } else if (k === "pdf") {
      media = el("a", "pf-media"); media.href = it.file; media.target = "_blank"; media.rel = "noopener";
      media.setAttribute("aria-label", "View presentation: " + it.title);
    } else media = el("div", "pf-media");
    var thumb = it.thumbnail || (k === "image" ? it.file : "");
    if (thumb) {
      var im = el("img"); im.src = thumb; im.alt = it.title + (it.description ? " — " + it.description : ""); im.loading = "lazy"; im.decoding = "async"; media.appendChild(im);
    } else if (k === "video") {
      var vv = el("video"); vv.muted = true; vv.preload = "metadata"; vv.src = it.file + "#t=1"; vv.setAttribute("aria-hidden", "true"); media.appendChild(vv);
    } else {
      media.classList.add("pf-mono");
      media.appendChild(el("b", null, initials(it.client || it.title) || "PX"));
      media.appendChild(el("small", null, opt.badge || cats[0] || "Project"));
    }
    if (k !== "none") media.appendChild(el("span", "pf-badge", BADGE[k]));
    if (k === "video") media.appendChild(el("span", "pf-play"));
    c.appendChild(media);

    var b = el("div", "pf-body");
    var sub = it.client || it.business; if (sub) b.appendChild(el("span", "pf-client", sub));
    b.appendChild(el("h3", null, it.title));
    if (cats.length || opt.badge) {
      var ul = el("ul", "pf-tags"); (cats.length ? cats : [opt.badge]).forEach(function (t) { ul.appendChild(el("li", null, t)); }); b.appendChild(ul);
    }
    if (it.description || it.review) b.appendChild(el("p", null, it.description || it.review));
    if (it.date) b.appendChild(el("span", "pf-date", it.date));
    var acts = el("div", "pf-acts");
    function btn(txt, fn) { var x = el("button", null, txt); x.type = "button"; x.onclick = fn; acts.appendChild(x); }
    function lnk(txt, href, dl) { var a = el("a", null, txt); a.href = href; if (dl) a.setAttribute("download", ""); else { a.target = "_blank"; a.rel = "noopener"; } acts.appendChild(a); }
    if (k === "video") btn("▶ Watch Video", function () { open(it, k); });
    if (k === "image") btn(cats.indexOf("Meta Ads") > -1 ? "View Ad Creative" : "View Poster", function () { open(it, k); });
    if (k === "pdf") { lnk("View Presentation", it.file); lnk("Download", it.file, true); }
    if (k === "ppt") lnk("Download Presentation", it.file, true);
    if (k === "file") lnk("Download", it.file, true);
    if (it.link) lnk((cats.indexOf("Software") > -1 ? "View Demo" : "View Website") + " ↗", it.link);
    if (acts.children.length) b.appendChild(acts);
    c.appendChild(b);
    return c;
  }

  /* ---------- filterable gallery ---------- */
  function gallery(name, items, cats, size) {
    var bar = document.querySelector('[data-pf-filters="' + name + '"]'), grid = document.querySelector('[data-pf-grid="' + name + '"]'), more = document.querySelector('[data-pf-more="' + name + '"]');
    if (!grid) return;
    /* only real content: items without a media file are not shown */
    items = items.filter(function (it) { return !!it.file; });
    /* own projects first (with media first), then creative-data items */
    /* "pin" items come first and "last" items go to the end (Portfolio only) */
    var ord = name === "portfolio";
    items = items.map(function (it, n) { return { it: it, n: n, r: ord ? (it.pin ? 0 : it.last ? 2 : 1) : 1, o: ord ? (it.pin || it.last || 0) : 0, g: it._cr ? 1 : 0, m: it.file ? 0 : 1 }; })
      .sort(function (a, b) { return a.r - b.r || a.o - b.o || a.g - b.g || a.m - b.m || a.n - b.n; }).map(function (o) { return o.it; });
    /* AI Creative Works: mix the AI videos so the same brand is not side by side */
    if (name === "creative") {
      var vids = items.filter(function (it) { return arr(it.category).indexOf("AI Videos") > -1; }), rest = items.filter(function (it) { return vids.indexOf(it) < 0; }), groups = [], keys = [];
      vids.forEach(function (it) { var k = keys.indexOf(it.title); if (k < 0) { keys.push(it.title); groups.push([]); k = keys.length - 1; } groups[k].push(it); });
      var mixed = [], any = true;
      for (var r = 0; any; r++) { any = false; groups.forEach(function (g) { if (g[r]) { mixed.push(g[r]); any = true; } }); }
      items = mixed.concat(rest);
    }
    var cur = "All", shown = size;
    function list() { return cur === "All" ? items : items.filter(function (it) { return arr(it.category).indexOf(cur) > -1; }); }
    function render() {
      var l = list(); grid.innerHTML = "";
      l.slice(0, shown).forEach(function (it, i) { grid.appendChild(card(it, i, {})); });
      if (more) {
        more.innerHTML = "";
        if (l.length > shown) {
          var m = el("button", "btn ghost", "Show more (" + (l.length - shown) + ")"); m.type = "button";
          m.onclick = function () { var first = shown; shown += size; render(); var f = grid.children[first]; if (f) { var b = f.querySelector("button,a"); if (b) b.focus({ preventScroll: true }); } };
          more.appendChild(m);
        }
      }
    }
    if (bar) {
      ["All"].concat(cats).forEach(function (cname) {
        var n = cname === "All" ? items.length : items.filter(function (it) { return arr(it.category).indexOf(cname) > -1; }).length;
        if (!n && !showEmpty) return;
        var bt = el("button"); bt.type = "button"; bt.textContent = cname; bt.appendChild(el("span", "pf-n", String(n)));
        bt.setAttribute("aria-pressed", cname === cur ? "true" : "false");
        bt.onclick = function () { cur = cname; shown = size; [].forEach.call(bar.children, function (x) { x.setAttribute("aria-pressed", x === bt ? "true" : "false"); }); render(); };
        bar.appendChild(bt);
      });
    }
    render();
  }

  var creativeAsPortfolio = CR.map(function (it) {
    var o = { _cr: 1 }; for (var k in it) o[k] = it[k];
    o.category = arr(it.category).map(function (c) { return c === "Promotional Creatives" ? "Advertising" : c; })
      .filter(function (c, i, a) { return a.indexOf(c) === i; });
    return o;
  });
  gallery("portfolio", PF.concat(creativeAsPortfolio), PF_CATS, 12);
  gallery("creative", CR, CR_CATS, 8);

  /* ---------- reviews ---------- */
  var rg = document.querySelector("[data-pf-reviews]");
  if (rg) {
    if (!RV.length) rg.hidden = true;
    RV.forEach(function (r, i) {
      var it = { title: r.customer || r.title || "Client review", business: r.business, review: r.review, date: r.date, file: r.file, thumbnail: r.thumbnail };
      rg.appendChild(card(it, i, { badge: "Customer Review" }));
    });
  }

  /* ---------- founder ---------- */
  var f = CO.founder;
  if (f) {
    var q = function (s) { return document.querySelector(s); };
    if (f.message && q("#pxFounderMsg")) q("#pxFounderMsg").textContent = f.message;
    if (f.name && q("#pxFounderName")) q("#pxFounderName").textContent = f.name;
    if (f.title && q("#pxFounderTitle")) q("#pxFounderTitle").textContent = f.title + ", Prexal DigiAI";
    if (f.photo && q("#pxFounderPhoto")) q("#pxFounderPhoto").src = f.photo;
  }
})();
