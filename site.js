(() => {
  'use strict';
  const c = window.PIXELOZOR_LEGAL || {};
  const valid = c.configured === true && typeof c.supportEmail === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.supportEmail) && c.operator;
  document.querySelectorAll('a[href$=".html"]').forEach(el => { if (!el.dataset.pageLink) el.dataset.pageLink = el.getAttribute('href'); });
  const requested = new URLSearchParams(location.search).get('lang');
  let lang = requested === 'fr' || requested === 'en' ? requested : navigator.language.startsWith('fr') ? 'fr' : 'en';
  function show(value) {
    lang = value;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(el => { el.hidden = el.dataset.lang !== lang; });
    document.querySelectorAll('[data-set-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.setLang === lang)));
    document.querySelectorAll('[data-page-link]').forEach(el => el.href = `${el.dataset.pageLink}?lang=${lang}`);
  }
  document.querySelectorAll('[data-set-lang]').forEach(el => el.addEventListener('click', () => {
    show(el.dataset.setLang);
    const url = new URL(location.href);url.searchParams.set('lang', lang);history.replaceState(null, '', url);
  }));
  document.querySelectorAll('[data-operator]').forEach(el => { el.textContent = c.operator || 'Legal identity required / Identité légale requise'; });
  document.querySelectorAll('[data-address]').forEach(el => { el.textContent = c.address || ''; el.hidden = !c.address; });
  document.querySelectorAll('[data-draft]').forEach(el => { el.hidden = Boolean(valid); });
  document.querySelectorAll('[data-support]').forEach(el => {
    if (valid) {
      el.href = `mailto:${c.supportEmail}?subject=${encodeURIComponent(el.dataset.subject || 'Pixelozor — Privacy / Confidentialité')}`;
      el.textContent = c.supportEmail;
    } else { el.removeAttribute('href'); el.setAttribute('aria-disabled', 'true'); }
  });
  show(lang);
})();
