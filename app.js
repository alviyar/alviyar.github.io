// ── Project filter ───────────────────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
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

const sectionObserver = new IntersectionObserver(entries => {
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

sections.forEach(s => sectionObserver.observe(s));

// ── Scroll fade-in ───────────────────────────────────────
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

/* =========================================================
   CUSTOM CURSOR (FOLLOW + INVERT)
   ========================================================= */

(() => {
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  // Disable on reduced motion or coarse pointers
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !window.matchMedia("(pointer: fine)").matches
  ) {
    cursor.style.display = "none";
    document.body.style.cursor = "auto";
    return;
  }

  let x = 0, y = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener("mousemove", e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animate() {
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
  }

  animate();

  /* -----------------------------------------
     Cursor interaction states
     ----------------------------------------- */

  document.querySelectorAll("[data-cursor], a, .project, .flagship-toggle")
    .forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
      });
    });
})();

// ── Micro click feedback ─────────────────────────────────
(() => {
  document.addEventListener('click', e => {
    const target = e.target.closest('a, .filter-btn');
    if (!target) return;
    target.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(0.96)' }, { transform: 'scale(1)' }],
      { duration: 160, easing: 'ease-out' }
    );
  });
})();
