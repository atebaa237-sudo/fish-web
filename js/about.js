const yearEl = document.getElementById('year');
const testimonialItems = document.querySelectorAll('.testimonial');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const faqItems = document.querySelectorAll('.faq-item');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (testimonialItems.length) {
  let activeIndex = 0;

  const showTestimonial = (index) => {
    testimonialItems.forEach((item, itemIndex) => {
      item.classList.toggle('active', itemIndex === index);
    });
  };

  const nextTestimonial = () => {
    activeIndex = (activeIndex + 1) % testimonialItems.length;
    showTestimonial(activeIndex);
  };

  const prevTestimonial = () => {
    activeIndex = (activeIndex - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(activeIndex);
  };

  nextButton?.addEventListener('click', nextTestimonial);
  prevButton?.addEventListener('click', prevTestimonial);
  setInterval(nextTestimonial, 5000);
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
