/* =====================================================================
   NJORD — V2 "Aurora Nórdica"
   counters.js — contadores animados (moeda BRL + porcentagem)
   ===================================================================== */

document.addEventListener('DOMContentLoaded', initCounters);

function initCounters() {
  const els = document.querySelectorAll('[data-number]');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(setFinalValue);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach((el) => observer.observe(el));
}

/* ---------- Detecta formato a partir do texto inicial ---------- */
function formatOf(el) {
  const txt = el.textContent || '';
  if (txt.includes('%')) return 'percent';
  if (txt.includes('R$')) return 'currency';
  return 'plain';
}

function render(el, value, format) {
  if (format === 'percent') {
    el.textContent = Math.round(value) + '%';
  } else if (format === 'currency') {
    el.textContent = new Intl.NumberFormat('pt-BR', {
      style: 'currency', currency: 'BRL',
      minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(value);
  } else {
    el.textContent = Math.round(value).toString();
  }
}

function setFinalValue(el) {
  render(el, parseFloat(el.getAttribute('data-number')) || 0, formatOf(el));
}

/* ---------- Anima de 0 até o alvo com easing ---------- */
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-number')) || 0;
  const format = formatOf(el);
  const duration = 1600;
  let startTime = null;

  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const t = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    render(el, target * eased, format);
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      render(el, target, format);
    }
  }
  requestAnimationFrame(step);
}
