/* ─── 1. Navbar scroll + mobile menu ─────────────────────────────────── */
(function () {
  const nav     = document.getElementById('site-nav');
  const toggler = document.getElementById('nav-toggler');
  const mobileMenu = document.getElementById('mobile-nav');
  const iconOpen   = document.getElementById('icon-open');
  const iconClose  = document.getElementById('icon-close');

  // Scroll compact
  const onScroll = () => {
    nav?.classList.toggle('nav-scrolled', window.scrollY > 48);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  toggler?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggler.setAttribute('aria-expanded', String(isOpen));
    iconOpen?.classList.toggle('hidden', isOpen);
    iconClose?.classList.toggle('hidden', !isOpen);
  });

  // Close on link click
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      iconOpen?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
      toggler?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (nav && !nav.contains(e.target)) {
      mobileMenu?.classList.remove('open');
      iconOpen?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
    }
  });
})();

/* ─── 2. Scroll-triggered reveal (IntersectionObserver) ──────────────── */
(function () {
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -56px 0px', threshold: 0.08 }
  );

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
