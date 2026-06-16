/* =====================================================================
   NJORD — V2 "Aurora Nórdica"
   main.js — navbar, botões, tilt magnético, smooth scroll
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initButtons();
  initTilt();
  initSmoothScroll();
});

/* ---------- NAVBAR: estado ao rolar ---------- */
function initNavbar() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- BOTÕES CTA ---------- */
function initButtons() {
  document.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.getAttribute('data-action');
      if (action === 'cta-primary') {
        alert('Bem-vindo ao Njord! O cadastro estará disponível em breve. 🚀');
      } else if (action === 'cta-secondary') {
        alert('Obrigado pelo interesse! Em breve você poderá falar com nosso time. 💬');
      }
    });
  });
}

/* ---------- TILT MAGNÉTICO (parallax 3D nos cards) ---------- */
function initTilt() {
  
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(hover: none)').matches;
  if (reduced || touch) return;

  const MAX = 7; // graus máximos de inclinação

  document.querySelectorAll('[data-tilt]').forEach((el) => {
    el.style.transformStyle = 'preserve-3d';

    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        `perspective(900px) rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg) translateY(-6px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ---------- SMOOTH SCROLL para âncoras ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || !href) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
