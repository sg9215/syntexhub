/* ═══════════════════════════════════════════════════════════
   SYNTEXHUB — The Private AI Atelier
   Interactions: nav state, mobile menu, scroll reveals
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Nav: solidify on scroll ── */
  var nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ── */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  Array.prototype.forEach.call(menu.querySelectorAll('a'), function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ── Scroll reveals ── */
  var reveals = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveals, function (el) {
      el.classList.add('in');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -8% 0px'
  });

  Array.prototype.forEach.call(reveals, function (el) {
    observer.observe(el);
  });
})();
