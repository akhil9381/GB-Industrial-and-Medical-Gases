// ─── Navbar: scroll compact + mobile menu ─────────────────────────────────
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu    = document.getElementById('mobile-menu');
const menuIconOpen  = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

// Scroll → compact navbar
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run once on load

// Mobile hamburger toggle
mobileMenuBtn?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuIconOpen?.classList.toggle('hidden', isOpen);
  menuIconClose?.classList.toggle('hidden', !isOpen);
  mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuIconOpen?.classList.remove('hidden');
    menuIconClose?.classList.add('hidden');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (navbar && !navbar.contains(e.target)) {
    mobileMenu?.classList.remove('open');
    menuIconOpen?.classList.remove('hidden');
    menuIconClose?.classList.add('hidden');
  }
});

// Active nav link highlight based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id') || '';
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-nav');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
