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
      card.classList.toggle('hidden', filter !== 'all' && !tags.includes(filter));
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
          ? 'var(--text)' : '';
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

/* ==========================================================
   ABSTRACT FLOWING GRADIENT BACKGROUND
   Luxury pink palette: deep rose, blush, dusty mauve, soft
   magenta. Multiple overlapping sine-path blobs create a
   silk-like fluid motion. Canvas opacity 0.5 for readability.
========================================================== */
(() => {
  const canvas = document.getElementById('gradient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  // Each blob follows a Lissajous-style path for organic flow
  const blobs = [
    { cx: 0.25, cy: 0.30, ax: 0.30, ay: 0.25, fx: 0.00031, fy: 0.00019, px: 0.0,  py: 1.2,  r: 0.58, color: [220, 80, 120]  },  // deep rose
    { cx: 0.70, cy: 0.25, ax: 0.22, ay: 0.30, fx: 0.00024, fy: 0.00028, px: 2.0,  py: 0.5,  r: 0.60, color: [245, 150, 185] },  // blush
    { cx: 0.50, cy: 0.70, ax: 0.28, ay: 0.22, fx: 0.00027, fy: 0.00022, px: 1.0,  py: 2.8,  r: 0.55, color: [190, 80, 130]  },  // dusty mauve
    { cx: 0.18, cy: 0.72, ax: 0.20, ay: 0.18, fx: 0.00035, fy: 0.00016, px: 3.5,  py: 0.8,  r: 0.44, color: [255, 120, 160] },  // soft magenta
    { cx: 0.82, cy: 0.60, ax: 0.18, ay: 0.24, fx: 0.00020, fy: 0.00033, px: 0.6,  py: 3.1,  r: 0.46, color: [210, 100, 145] },  // rose
    { cx: 0.55, cy: 0.15, ax: 0.25, ay: 0.16, fx: 0.00029, fy: 0.00025, px: 4.2,  py: 1.6,  r: 0.40, color: [240, 170, 200] },  // pale pink
  ];

  let t = 0;

  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);

    blobs.forEach(b => {
      // Lissajous-style position
      const x = (b.cx + b.ax * Math.sin(t * b.fx + b.px)) * W;
      const y = (b.cy + b.ay * Math.cos(t * b.fy + b.py)) * H;
      const radius = b.r * Math.max(W, H);

      const [r, g, bl] = b.color;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0,    `rgba(${r},${g},${bl},0.72)`);
      grad.addColorStop(0.45, `rgba(${r},${g},${bl},0.35)`);
      grad.addColorStop(0.75, `rgba(${r},${g},${bl},0.08)`);
      grad.addColorStop(1,    `rgba(${r},${g},${bl},0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ==========================================================
   STAR CURSOR — 20px, continuously spins
========================================================== */
(() => {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !window.matchMedia('(pointer: fine)').matches
  ) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let x = 0, y = 0, tx = 0, ty = 0, angle = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

  function tick() {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    angle += 1.4;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`;
    requestAnimationFrame(tick);
  }
  tick();

  document.querySelectorAll('[data-cursor], a, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
})();

// ── Micro click feedback ─────────────────────────────────
document.addEventListener('click', e => {
  const t = e.target.closest('a, .filter-btn');
  if (!t) return;
  t.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(0.95)' }, { transform: 'scale(1)' }],
    { duration: 160, easing: 'ease-out' }
  );
});
