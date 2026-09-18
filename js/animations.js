// ─── Intersection Observer: fade-up + fade-in animations ──────────────────
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once
    }
  });
}, observerOptions);

function initAnimations() {
  // Observe individual fade elements
  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    observer.observe(el);
  });

  // For stagger groups, observe each child individually
  document.querySelectorAll('.stagger-children').forEach(parent => {
    parent.querySelectorAll('.fade-up, .fade-in').forEach(child => {
      observer.observe(child);
    });
  });
}

// Counter animation for stats
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent, 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = prefix + Math.floor(current) + suffix;
  }, step);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-counter]').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

function initCounters() {
  document.querySelectorAll('.stats-row').forEach(row => {
    statsObserver.observe(row);
  });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initCounters();
});
