/* script.js — Slide deck controls & 16:9 scaling */

(function () {
  const TOTAL = 13;
  let current = 0;

  const slides = document.querySelectorAll('.slide');
  const indicatorsEl = document.getElementById('indicators');
  const counter = document.getElementById('counter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const fsBtn = document.getElementById('fsBtn');
  const deck = document.getElementById('deck');

  /* ─── Build indicators ─── */
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'indicator' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    indicatorsEl.appendChild(dot);
  });

  /* ─── Scale slides to fit viewport maintaining 16:9 ─── */
  function scaleDeck() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const scale = Math.min(W / 1920, H / 1080);
    const sw = 1920 * scale;
    const sh = 1080 * scale;
    slides.forEach(s => {
      s.style.width = '1920px';
      s.style.height = '1080px';
      s.style.left = Math.round((W - sw) / 2) + 'px';
      s.style.top = Math.round((H - sh) / 2) + 'px';
      s.style.transform = `scale(${scale})`;
      s.style.transformOrigin = 'top left';
    });
  }
  scaleDeck();
  window.addEventListener('resize', scaleDeck);

  /* ─── Navigate ─── */
  function goTo(idx) {
    if (idx < 0 || idx >= TOTAL) return;
    slides[current].classList.remove('active');
    indicatorsEl.children[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    indicatorsEl.children[current].classList.add('active');
    counter.textContent = (current + 1) + ' / ' + TOTAL;
  }

  /* ─── Buttons ─── */
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  /* ─── Keyboard ─── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'Home')       { e.preventDefault(); goTo(0); }
    if (e.key === 'End')        { e.preventDefault(); goTo(TOTAL - 1); }
    if (e.key === 'f' || e.key === 'F') toggleFS();
  });

  /* ─── Fullscreen ─── */
  function toggleFS() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(scaleDeck).catch(() => {});
    } else {
      document.exitFullscreen().then(scaleDeck).catch(() => {});
    }
  }
  fsBtn.addEventListener('click', toggleFS);
  document.addEventListener('fullscreenchange', scaleDeck);

})();
