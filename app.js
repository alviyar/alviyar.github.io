// ── Project filter ───────────────────────────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const tags = card.dataset.tags || '';
      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Active nav link on scroll ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// ── Subtle fade-in on scroll ─────────────────────────────
const fadeEls = document.querySelectorAll('.project-card, .skill-group, .exp-item');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  fadeObserver.observe(el);
});
