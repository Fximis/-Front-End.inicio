// Controla o modal de preview dos exercícios.
// Cada botão "Ver aqui" deve ter: data-preview="url.html" e data-title="Nome".
(function () {
  const modal = document.getElementById('preview-modal');
  const frame = document.getElementById('modal-frame');
  const titleEl = document.getElementById('modal-title');
  const closeBtn = document.getElementById('modal-close');
  if (!modal || !frame || !titleEl || !closeBtn) return;

  function openPreview(url, title) {
    titleEl.textContent = title || 'Pré-visualização';
    frame.src = url;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closePreview() {
    modal.hidden = true;
    frame.src = 'about:blank'; // descarrega o conteúdo
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-preview]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openPreview(btn.getAttribute('data-preview'), btn.getAttribute('data-title'));
    });
  });

  closeBtn.addEventListener('click', closePreview);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closePreview(); // clicar fora fecha
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closePreview();
  });
})();
