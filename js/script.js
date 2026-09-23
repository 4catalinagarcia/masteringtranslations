(function () {
  "use strict";

  var STORAGE_KEY = "mt_lang";
  var root = document.documentElement;
  var langToggle = document.getElementById("lang-toggle");
  var langToggleLabel = document.getElementById("lang-toggle-label");

  function getInitialLang() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* localStorage unavailable (private browsing, etc.) — fall back below */
    }
    if (saved === "en" || saved === "es") return saved;
    var browserLang = (navigator.language || "en").toLowerCase();
    return browserLang.indexOf("es") === 0 ? "es" : "en";
  }

  function applyTranslations(lang) {
    var dict = translations[lang] || translations.en;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (dict[key] !== undefined) el.setAttribute("alt", dict[key]);
    });

    root.lang = lang;
    if (dict["meta.title"]) document.title = dict["meta.title"];

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict["meta.description"]) metaDesc.setAttribute("content", dict["meta.description"]);

    if (langToggleLabel) langToggleLabel.textContent = lang === "en" ? "EN" : "ES";
    if (langToggle) {
      langToggle.setAttribute("aria-checked", lang === "es" ? "true" : "false");
      langToggle.classList.toggle("is-spanish", lang === "es");
      var otherLangKey = "lang.toggle.aria";
      if (dict[otherLangKey]) langToggle.setAttribute("aria-label", dict[otherLangKey]);
    }
  }

  function setLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore — non-critical persistence */
    }
    applyTranslations(lang);
  }

  var currentLang = getInitialLang();
  applyTranslations(currentLang);

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      currentLang = currentLang === "en" ? "es" : "en";
      setLanguage(currentLang);
    });
  }

  // Mobile nav toggle
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header shadow on scroll
  var header = document.getElementById("site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    });
  }

  // Contact form — client-side only until connected to a form service (see README).
  var form = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");
  if (form && formStatus) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      if (action.indexOf("YOUR_FORM_ID") !== -1) {
        e.preventDefault();
        formStatus.textContent =
          currentLang === "es"
            ? "El formulario aún no está conectado. Vea README.md para activarlo, o llame/envíe un correo directamente."
            : "This form isn't connected yet. See README.md to activate it, or call/email directly for now.";
        formStatus.hidden = false;
      }
    });
  }

  // Footer year
  var yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
