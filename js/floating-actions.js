(() => {
  const whatsappNumber = '14242409780';
  const actions = document.createElement('div');
  actions.className = 'floating-actions';
  actions.setAttribute('aria-label', 'Quick actions');

  const whatsappLink = document.createElement('a');
  whatsappLink.className = 'floating-whatsapp';
  whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Summer Axolotl Home')}`;
  whatsappLink.target = '_blank';
  whatsappLink.rel = 'noreferrer';
  whatsappLink.setAttribute('aria-label', 'Chat with us on WhatsApp');
  whatsappLink.title = 'Chat with us on WhatsApp';
  whatsappLink.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.52 3.48A11.83 11.83 0 0 0 12.08 0C5.53 0 .19 5.53.19 12.08c0 2.13.56 4.12 1.53 5.85L.25 24l6.22-1.63a11.98 11.98 0 0 0 5.61 1.43h.01c6.55 0 11.89-5.33 11.9-11.89a11.8 11.8 0 0 0-3.47-8.43zM12.09 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.69.97.98-3.6-.23-.37a9.86 9.86 0 0 1-1.51-5.23c0-5.45 4.43-9.88 9.88-9.88a9.82 9.82 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.45-4.43 9.88-9.88 9.88zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.51-1.78-1.69-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
    </svg>
  `;

  const scrollButton = document.createElement('button');
  scrollButton.className = 'floating-scroll-top';
  scrollButton.type = 'button';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  scrollButton.title = 'Scroll to top';
  scrollButton.hidden = true;
  scrollButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 14 6-6 6 6"/>
    </svg>
  `;

  const updateScrollButton = () => {
    scrollButton.hidden = window.scrollY < 320;
  };

  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
    });
  });

  window.addEventListener('scroll', updateScrollButton, { passive: true });
  window.addEventListener('pageshow', updateScrollButton);
  actions.append(whatsappLink, scrollButton);
  document.body.append(actions);
  updateScrollButton();
})();
