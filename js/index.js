const yearEl = document.getElementById('year');
const faqItems = document.querySelectorAll('.faq-item');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (!question || !answer) return;

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove('active');
      const faqAnswer = faqItem.querySelector('.faq-answer');
      if (faqAnswer) faqAnswer.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

const setInitialFaqHeights = () => {
  faqItems.forEach((item) => {
    const answer = item.querySelector('.faq-answer');
    if (item.classList.contains('active') && answer) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
};

setInitialFaqHeights();
