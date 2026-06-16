/* =====================================================================
   NJORD — V2 "Aurora Nórdica"
   scroll-animations.js — reveals ao scroll + barras de progresso
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initReveals();
  initProgressBars();
});

/* ---------- REVEALS (fade + slide ao entrar na viewport) ---------- */
function initReveals() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  // Aplica o delay de stagger declarado no HTML (data-reveal-delay)
  items.forEach((el) => {
    const delay = el.getAttribute('data-reveal-delay');
    if (delay) el.style.setProperty('--reveal-delay', delay);
  });

  // Fallback: sem IntersectionObserver, mostra tudo
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  items.forEach((el) => observer.observe(el));
}

/* ---------- BARRAS DE PROGRESSO (preenchem ao entrar na tela) ---------- */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress__fill');
  if (!bars.length) return;

  if (!('IntersectionObserver' in window)) {
    bars.forEach((b) => b.classList.add('is-filled'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Pequeno atraso para a animação ser percebida
        setTimeout(() => entry.target.classList.add('is-filled'), 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach((b) => observer.observe(b));
}
