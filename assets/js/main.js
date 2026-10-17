(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile navigation ---------- */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");

  if (burger && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    burger.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        burger.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1020) setOpen(false);
    });
  }

  /* ---------- products disclosure ---------- */
  var menu = document.querySelector(".menu");
  if (menu) {
    document.addEventListener("click", function (e) {
      if (menu.open && !menu.contains(e.target)) menu.open = false;
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.open) {
        menu.open = false;
        var summary = menu.querySelector("summary");
        if (summary) summary.focus();
      }
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) menu.open = false;
    });
  }

  /* ---------- active nav item ---------- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  Array.prototype.forEach.call(document.querySelectorAll(".nav a[href]"), function (a) {
    var target = (a.getAttribute("href") || "").split("/").pop().split("#")[0];
    if (target && target === path) a.setAttribute("aria-current", "page");
  });
  var menuSummary = document.querySelector(".menu > summary");
  if (menuSummary && document.querySelector(".menu__item[aria-current]")) {
    menuSummary.setAttribute("data-active", "true");
  }

  /* ---------- scroll reveal (below the fold only) ---------- */
  var revealSel = [
    ".feature", ".product", ".machine", ".usecase", ".proofbox",
    ".doclinks li", ".tier", ".svc", ".anchor", ".juris", ".verify",
    ".tool", ".pain", ".ben > div", ".flow > li", ".flow > .step",
    ".after__c", ".stat", ".io__b", ".finding", ".plain li",
    "#faq details", ".links > div", ".band", ".spec"
  ].join(",");

  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });

    var vh = window.innerHeight || doc.clientHeight;
    Array.prototype.forEach.call(document.querySelectorAll(revealSel), function (el) {
      /* never hide content that is already in view */
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      el.setAttribute("data-reveal", "");
      io.observe(el);
    });
  }

  /* ---------- copy buttons on code panels ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".panel__bar"), function (bar) {
    var panel = bar.closest(".hero__panel, .panel");
    if (!panel) return;
    var code = panel.querySelector(".panel__body");
    if (!code) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy";
    btn.textContent = "Copy";

    btn.addEventListener("click", function () {
      var text = code.innerText;
      var done = function () {
        btn.textContent = "Copied";
        btn.classList.add("is-done");
        window.setTimeout(function () {
          btn.textContent = "Copy";
          btn.classList.remove("is-done");
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });

    bar.appendChild(btn);
  });

  /* ---------- year ---------- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
