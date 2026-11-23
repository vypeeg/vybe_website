(function () {
  "use strict";

  var src = window.VYBE_CATALOG || { settings: { prices: {} }, categories: [], posters: [] };
  var state = JSON.parse(JSON.stringify(src));

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function uid() { return "poster-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7); }
  function num(v, fallback) { var n = Number(v); return Number.isFinite(n) && n >= 0 ? n : fallback; }

  function normalize() {
    state.settings = state.settings || {};
    state.settings.whatsapp = String(state.settings.whatsapp || "").replace(/\D/g, "");
    state.settings.display = String(state.settings.display || "");
    state.settings.tiktok = String(state.settings.tiktok || "").replace(/^@/, "").trim();
    state.settings.instagram = String(state.settings.instagram || "").replace(/^@/, "").trim();
    state.settings.prices = state.settings.prices || {};
    state.settings.prices["20x30"] = num(state.settings.prices["20x30"], 200);
    state.settings.prices["30x40"] = num(state.settings.prices["30x40"], 330);
    state.settings.prices["40x50"] = num(state.settings.prices["40x50"], 490);
    if (!Array.isArray(state.categories)) state.categories = [];
    if (!Array.isArray(state.posters)) state.posters = [];
    state.categories = state.categories.map(function (c, i) {
      return { id: String(c.id || "cat-" + (i + 1)).trim(), ar: String(c.ar || ""), en: String(c.en || "") };
    });
    state.posters = state.posters.map(function (p) {
      var o = {
        id: String(p.id || uid()).trim(),
        cat: String(p.cat || (state.categories[0] ? state.categories[0].id : "")),
        ar: String(p.ar || ""),
        en: String(p.en || ""),
        tagAr: String(p.tagAr || ""),
        tagEn: String(p.tagEn || ""),
        img: String(p.img || ""),
        w: Math.max(1, Math.round(num(p.w, 700))),
        h: Math.max(1, Math.round(num(p.h, 933)))
      };
      if (p.featured) o.featured = true;
      return o;
    });
  }

  function loadSettings() {
    $("setWhatsapp").value = state.settings.whatsapp || "";
    $("setDisplay").value = state.settings.display || "";
    $("setTiktok").value = state.settings.tiktok || "";
    $("setInstagram").value = state.settings.instagram || "";
    $("price20x30").value = state.settings.prices["20x30"];
    $("price30x40").value = state.settings.prices["30x40"];
    $("price40x50").value = state.settings.prices["40x50"];
  }

  function readSettings() {
    state.settings.whatsapp = $("setWhatsapp").value.replace(/\D/g, "").trim();
    state.settings.display = $("setDisplay").value.trim();
    state.settings.tiktok = $("setTiktok").value.replace(/^@/, "").trim();
    state.settings.instagram = $("setInstagram").value.replace(/^@/, "").trim();
    state.settings.prices["20x30"] = num($("price20x30").value, 0);
    state.settings.prices["30x40"] = num($("price30x40").value, 0);
    state.settings.prices["40x50"] = num($("price40x50").value, 0);
  }

  function renderCats() {
    var tbody = $("catsTable").querySelector("tbody");
    tbody.innerHTML = state.categories.map(function (c, i) {
      return '<tr>' +
        '<td><input data-cat="' + i + '" data-k="id" value="' + esc(c.id) + '" dir="ltr"></td>' +
        '<td><input data-cat="' + i + '" data-k="ar" value="' + esc(c.ar) + '"></td>' +
        '<td><input data-cat="' + i + '" data-k="en" value="' + esc(c.en) + '" dir="ltr"></td>' +
        '<td><button class="btn btn--danger btn--sm" type="button" data-del-cat="' + i + '">حذف</button></td>' +
        '</tr>';
    }).join("");
  }

  function catOptions(selected) {
    return state.categories.map(function (c) {
      return '<option value="' + esc(c.id) + '"' + (c.id === selected ? " selected" : "") + '>' + esc(c.ar || c.id) + ' (' + esc(c.id) + ')</option>';
    }).join("");
  }

  function renderPosters() {
    var box = $("posters");
    box.innerHTML = "";
    state.posters.forEach(function (p, i) {
      var tpl = $("posterTpl").content.cloneNode(true);
      tpl.querySelector(".poster-title").textContent = (p.ar || p.id || "منتج") + " — " + (p.id || "");
      tpl.querySelectorAll("[data-k]").forEach(function (el) {
        var k = el.getAttribute("data-k");
        if (k === "cat") { el.innerHTML = catOptions(p.cat); el.value = p.cat; }
        else if (k === "featured") { el.value = p.featured ? "true" : ""; }
        else { el.value = p[k] == null ? "" : p[k]; }
        el.setAttribute("data-i", i);
      });
      tpl.querySelector('[data-act="del"]').setAttribute("data-i", i);
      tpl.querySelector('[data-act="dup"]').setAttribute("data-i", i);
      box.appendChild(tpl);
    });
  }

  function render() { loadSettings(); renderCats(); renderPosters(); }

  function download() {
    readSettings();
    normalize();
    var header = "/*\n  VYBE catalogue\n  --------------\n  تم تحديث هذا الملف من صفحة admin.html المحلية.\n  عدّل منه الأسعار/الأقسام/المنتجات أو استخدم admin.html مرة أخرى.\n*/\n";
    var body = "window.VYBE_CATALOG = " + JSON.stringify(state, null, 2) + ";\n";
    var blob = new Blob([header + body], { type: "application/javascript;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "catalog.js";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.hasAttribute("data-cat")) {
      var ci = Number(t.getAttribute("data-cat"));
      var ck = t.getAttribute("data-k");
      if (state.categories[ci]) { state.categories[ci][ck] = t.value; if (ck === "id" || ck === "ar") renderPosters(); }
      return;
    }
    if (t.hasAttribute("data-i") && t.hasAttribute("data-k")) {
      var i = Number(t.getAttribute("data-i"));
      var k = t.getAttribute("data-k");
      if (!state.posters[i]) return;
      if (k === "w" || k === "h") state.posters[i][k] = Math.max(1, Math.round(num(t.value, state.posters[i][k] || 1)));
      else state.posters[i][k] = t.value;
      if (k === "ar" || k === "id") t.closest(".poster-card").querySelector(".poster-title").textContent = (state.posters[i].ar || state.posters[i].id || "منتج") + " — " + (state.posters[i].id || "");
    }
  });

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.hasAttribute("data-i") && t.getAttribute("data-k") === "featured") {
      var i = Number(t.getAttribute("data-i"));
      if (!state.posters[i]) return;
      if (t.value === "true") state.posters[i].featured = true;
      else delete state.posters[i].featured;
    }
    if (t.hasAttribute("data-i") && t.getAttribute("data-k") === "cat") {
      var j = Number(t.getAttribute("data-i"));
      if (state.posters[j]) state.posters[j].cat = t.value;
    }
  });

  document.addEventListener("click", function (e) {
    var delCat = e.target.getAttribute("data-del-cat");
    if (delCat != null) {
      var idx = Number(delCat);
      var cat = state.categories[idx];
      if (!cat) return;
      var used = state.posters.some(function (p) { return p.cat === cat.id; });
      if (used) { alert("القسم مستخدم في منتجات. غيّر قسم المنتجات أولاً."); return; }
      if (!confirm("حذف القسم؟")) return;
      state.categories.splice(idx, 1);
      render(); return;
    }
    var act = e.target.getAttribute("data-act");
    if (!act) return;
    var i = Number(e.target.getAttribute("data-i"));
    if (act === "del") {
      if (!confirm("حذف المنتج؟")) return;
      state.posters.splice(i, 1); render();
    }
    if (act === "dup") {
      var copy = JSON.parse(JSON.stringify(state.posters[i]));
      copy.id = copy.id + "-copy";
      delete copy.featured;
      state.posters.splice(i + 1, 0, copy); render();
    }
  });

  $("addCatBtn").addEventListener("click", function () {
    state.categories.push({ id: "new-cat-" + (state.categories.length + 1), ar: "قسم جديد", en: "New category" });
    render();
  });

  $("addPosterBtn").addEventListener("click", function () {
    state.posters.unshift({ id: uid(), cat: state.categories[0] ? state.categories[0].id : "", ar: "منتج جديد", en: "New poster", tagAr: "", tagEn: "", img: "images/", w: 700, h: 933 });
    render();
  });

  /* ---------- GitHub publishing ---------- */
  var GH_KEY = "vybe_admin_gh";
  var ghFields = { owner: "ghOwner", repo: "ghRepo", branch: "ghBranch", base: "ghBase", token: "ghToken" };

  function ghLoad() {
    try {
      var s = JSON.parse(localStorage.getItem(GH_KEY) || "{}");
      Object.keys(ghFields).forEach(function (k) { $(ghFields[k]).value = s[k] || (k === "branch" ? "main" : ""); });
    } catch (e) { $("ghBranch").value = "main"; }
  }
  function ghRead() {
    var s = {};
    Object.keys(ghFields).forEach(function (k) { s[k] = $(ghFields[k]).value.trim(); });
    s.base = s.base.replace(/^\/+|\/+$/g, "");
    s.branch = s.branch || "main";
    return s;
  }
  function ghSave() {
    try { localStorage.setItem(GH_KEY, JSON.stringify(ghRead())); status("تم حفظ إعدادات جيت هاب في المتصفح.", "ok"); }
    catch (e) { status("المتصفح منع حفظ الإعدادات. هتحتاج تكتبها كل مرة.", "err"); }
  }
  function status(msg, kind) {
    var el = $("status");
    el.hidden = !msg;
    el.textContent = msg || "";
    el.className = "status" + (kind ? " status--" + kind : "");
  }
  function b64Text(str) { return btoa(unescape(encodeURIComponent(str))); }
  function ghPath(s, p) { return (s.base ? s.base + "/" : "") + p; }

  function ghRequest(s, method, path, body) {
    var url = "https://api.github.com/repos/" + encodeURIComponent(s.owner) + "/" + encodeURIComponent(s.repo) + "/contents/" + path.split("/").map(encodeURIComponent).join("/") +
      (method === "GET" ? "?ref=" + encodeURIComponent(s.branch) : "");
    return fetch(url, {
      method: method,
      headers: { "Authorization": "Bearer " + s.token, "Accept": "application/vnd.github+json", "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) { var err = new Error(j.message || ("HTTP " + r.status)); err.status = r.status; throw err; }
        return j;
      });
    });
  }

  function ghPut(s, path, contentB64, message) {
    return ghRequest(s, "GET", path).then(function (j) { return j.sha; }, function (e) {
      if (e.status === 404) return undefined; throw e;
    }).then(function (sha) {
      var body = { message: message, content: contentB64, branch: s.branch };
      if (sha) body.sha = sha;
      return ghRequest(s, "PUT", path, body);
    });
  }

  function ghCheck(s) {
    if (!s.owner || !s.repo || !s.token) { status("املا اسم الحساب واسم الريبو والتوكن الأول.", "err"); return false; }
    return true;
  }
  function ghError(e) {
    var m = e.message || "";
    if (e.status === 401) m = "التوكن غلط أو منتهي.";
    else if (e.status === 403 || e.status === 404) m = "مفيش صلاحية أو الريبو/الـ branch/المسار غلط. اتأكد من الأسماء ومن صلاحية Contents: Read and write.";
    status("فشل: " + m, "err");
  }

  function buildCatalogText() {
    readSettings();
    normalize();
    var header = "/*\n  VYBE catalogue\n  --------------\n  تم تحديث هذا الملف من صفحة admin.html.\n*/\n";
    return header + "window.VYBE_CATALOG = " + JSON.stringify(state, null, 2) + ";\n";
  }

  function publish() {
    var s = ghRead();
    if (!ghCheck(s)) return;
    ghSave();
    var btn = $("publishBtn");
    btn.disabled = true; status("جاري النشر...");
    ghPut(s, ghPath(s, "data/catalog.js"), b64Text(buildCatalogText()), "Update catalog from admin")
      .then(function () { status("تم الحفظ على جيت هاب. الموقع هيتحدّث خلال دقيقة أو اتنين (اعمل Ctrl+Shift+R).", "ok"); })
      .catch(ghError)
      .then(function () { btn.disabled = false; });
  }

  function uploadImage(file, idx) {
    var s = ghRead();
    if (!ghCheck(s)) return;
    var safe = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
    var reader = new FileReader();
    status("جاري رفع الصورة...");
    reader.onload = function () {
      var dataUrl = String(reader.result);
      var img = new Image();
      img.onload = function () {
        ghPut(s, ghPath(s, "images/" + safe), dataUrl.split(",")[1], "Add image " + safe)
          .then(function () {
            var p = state.posters[idx];
            if (p) { p.img = "images/" + safe; p.w = img.naturalWidth; p.h = img.naturalHeight; }
            renderPosters();
            status("تم رفع الصورة وكتابة مسارها. لا تنسى تضغط \"حفظ ونشر على الموقع\".", "ok");
          }).catch(ghError);
      };
      img.onerror = function () { status("الملف مش صورة صالحة.", "err"); };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (!t.hasAttribute || !t.hasAttribute("data-upload") || !t.files[0]) return;
    var card = t.closest(".poster-card");
    var idx = Array.prototype.indexOf.call($("posters").children, card);
    if (idx >= 0) uploadImage(t.files[0], idx);
    t.value = "";
  });

  $("publishBtn").addEventListener("click", publish);
  $("ghSaveBtn").addEventListener("click", ghSave);
  ghLoad();

  $("downloadBtn").addEventListener("click", download);
  $("resetBtn").addEventListener("click", function () {
    if (!confirm("إلغاء التعديلات وإعادة تحميل البيانات الأصلية من الملف؟")) return;
    state = JSON.parse(JSON.stringify(window.VYBE_CATALOG || state));
    normalize(); render();
  });

  ["setWhatsapp","setDisplay","setTiktok","setInstagram","price20x30","price30x40","price40x50"].forEach(function (id) {
    $(id).addEventListener("change", readSettings);
  });

  normalize();
  render();
})();