// ===== TYSONS CITY BOXING — SHARED SCRIPTS =====
// Logo image, mobile menu, scroll reveal.

const LOGO_HTML = `<img src="images/logo.png" alt="Tysons City Boxing" />`;

document.querySelectorAll('.logo-mark').forEach(el => { el.innerHTML = LOGO_HTML; });

// mobile menu
const _menuBtn = document.getElementById('menuBtn');
const _navLinks = document.getElementById('navLinks');
if (_menuBtn && _navLinks) {
  _menuBtn.addEventListener('click', () => _navLinks.classList.toggle('open'));
  _navLinks.addEventListener('click', e => { if (e.target.tagName === 'A') _navLinks.classList.remove('open'); });
}

// scroll reveal
const _io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      _io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.section, .testimonials, .stats, .how, .final-cta, .page-hero').forEach(el => {
  el.classList.add('reveal');
  _io.observe(el);
});

// Duplicate testimonial cards so the marquee loops seamlessly
(function(){
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  const originals = [...track.children];
  originals.forEach(card => track.appendChild(card.cloneNode(true)));
})();

// Kickstart hero video on mobile — iOS Safari sometimes refuses to autoplay
// without an explicit .play() call, and falls back to the poster otherwise.
(function(){
  const v = document.querySelector('.hero-video');
  if (!v) return;
  const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  tryPlay();
  // Retry on first user interaction (covers Low Power Mode / strict autoplay)
  const onFirst = () => { tryPlay(); window.removeEventListener('touchstart', onFirst); window.removeEventListener('click', onFirst); };
  window.addEventListener('touchstart', onFirst, { once: true, passive: true });
  window.addEventListener('click', onFirst, { once: true });
  // Re-kick when tab regains focus
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tryPlay(); });
})();
