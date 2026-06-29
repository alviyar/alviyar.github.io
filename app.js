// Custom cursor — star shape with text inversion
const cursor = document.getElementById('cursor');

if (cursor) {
  // Track mouse position
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Hover state on interactive elements (enlarge + pink)
  document.querySelectorAll('[data-cursor]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursor.classList.remove('on-text');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // Text-inversion state — activates when star is over readable text nodes
  const TEXT_SELECTORS = 'p, h1, h2, h3, h4, h5, h6, li, span, label, a, blockquote, .hero-name, .report-title, .section-title';

  document.querySelectorAll(TEXT_SELECTORS).forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (!cursor.classList.contains('hover')) {
        cursor.classList.add('on-text');
      }
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('on-text');
    });
  });
}

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const reportCards = document.querySelectorAll('.report-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    reportCards.forEach((card) => {
      const tags = card.dataset.tags || '';
      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
