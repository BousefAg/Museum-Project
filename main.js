/* ── NAV ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('on', window.scrollY > 80);
}, { passive: true });

/* ── FEATHER PARTICLES ── */
(function () {
  const cont = document.getElementById('particles');
  const cols = [
    'rgba(255,105,180,.55)', 'rgba(255,182,193,.62)',
    'rgba(194,24,91,.44)',   'rgba(255,240,245,.5)'
  ];
  const ns = 'http://www.w3.org/2000/svg';

  for (let i = 0; i < 22; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'feath';
    const sz  = Math.random() * 28 + 11;
    const col = cols[Math.floor(Math.random() * cols.length)];

    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 32 64');
    svg.setAttribute('width', sz);
    svg.setAttribute('height', sz * 2);
    svg.innerHTML = `
      <path d="M16 2C9 14 7 32 10 50c1.5 6 4 11 6 13 2-2 4.5-7 6-13C25 32 23 14 16 2Z" fill="${col}"/>
      <line x1="16" y1="2" x2="16" y2="63" stroke="rgba(255,255,255,.28)" stroke-width=".7"/>
      <path d="M16 16c-4 5-6 14-4 24" stroke="rgba(255,255,255,.2)" stroke-width=".6" fill="none"/>
      <path d="M16 16c4 5 6 14 4 24"  stroke="rgba(255,255,255,.2)" stroke-width=".6" fill="none"/>`;

    wrap.style.cssText = `left:${Math.random()*100}%;animation-duration:${Math.random()*14+9}s;animation-delay:${Math.random()*20}s`;
    wrap.appendChild(svg);
    cont.appendChild(wrap);
  }
})();

/* ── SLIDESHOW ── */
(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots   = Array.from(document.querySelectorAll('.dot'));
  let cur = 0, timer;

  function go(n) {
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = ((n % slides.length) + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur].classList.add('active');
  }
  function auto() { clearInterval(timer); timer = setInterval(() => go(cur + 1), 5500); }

  document.getElementById('s-prev').addEventListener('click', () => { go(cur - 1); auto(); });
  document.getElementById('s-next').addEventListener('click', () => { go(cur + 1); auto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); auto(); }));
  auto();
})();

/* ── DRAAISCHIJF ── */
(function () {
  const btn   = document.getElementById('ds-btn');
  const dicon = document.getElementById('dicon');
  const lbl   = document.getElementById('ds-lbl');
  let busy = false;

  btn.addEventListener('click', () => {
    if (busy) return;
    busy = true;
    btn.classList.add('busy');
    lbl.textContent = 'Jurk draait…';
    dicon.classList.add('spin');

    const media = document.querySelector('.slide.active > *');
    media.classList.remove('rotating');
    void media.offsetWidth; // force reflow
    media.classList.add('rotating');

    function done() {
      media.classList.remove('rotating');
      dicon.classList.remove('spin');
      btn.classList.remove('busy');
      lbl.textContent = 'Activeer Draaischijf';
      busy = false;
    }

    media.addEventListener('animationend', done, { once: true });
    setTimeout(() => { if (busy) done(); }, 3600); // fallback
  });
})();

/* ── SCROLL REVEAL ── */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.rev').forEach(el => io.observe(el));
})();

/* ── DIAGRAM TOOLTIPS ── */
(function () {
  const tip     = document.getElementById('diag-tip');
  const wrapper = document.querySelector('.diag-wrap');

  const fallback = {
    hoedier:     'Hoedier — Klein verenhoedstuk bovenop de paspop. Verlengt het silhouet en voegt theatrale hoogte toe.',
    jurk:        'Jurk — De zijden korsetjurk met strak corsette en uitwaaierende struisvogelveren.',
    licht:       'Licht — Studio spotlight met roze kleurfilter voor dramatische zij-verlichting.',
    filter:      'Filter — Roze theatergel die wit licht omzet in een warme roze gloed.',
    kap:         'Kap — Behuizing van de spotlight. Stuurt en concentreert de lichtbundel.',
    jup:         'Jup — De buitenste laag struisvogelveren die uitwaaiert voor explosief volume.',
    draaischijf: 'Draaischijf — Motorisch draaiplateau, 360°. Laat bezoekers de jurk van alle kanten zien.',
    podium:      'Podium — Verhoogd circulair platform. Geeft de presentatie autoriteit en zichtbaarheid.',
  };

  document.querySelectorAll('.hs').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const key = el.getAttribute('data-tip');
      tip.textContent = el.getAttribute('data-desc') || fallback[key] || key;
      tip.classList.add('show');
    });
    el.addEventListener('mousemove', e => {
      const r  = wrapper.getBoundingClientRect();
      let x = e.clientX - r.left + 14;
      let y = e.clientY - r.top  - 12;
      if (x + 240 > r.width) x = e.clientX - r.left - 252;
      if (y < 4)             y = 8;
      tip.style.left = x + 'px';
      tip.style.top  = y + 'px';
    });
    el.addEventListener('mouseleave', () => tip.classList.remove('show'));
  });
})();

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
