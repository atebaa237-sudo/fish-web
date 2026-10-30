const galleryFiles = [
  'WhatsApp Image 2026-10-26 at 15.56.32.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.35.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.37.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.38.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.39 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.39.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.40 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.40.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.41 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.41.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.42.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.43.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.44.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.45.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.46.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.47 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.47.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.48.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.49 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.49 (2).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.49.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.50.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.51.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.53 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.53.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.54 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.54 (2).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.54.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.55 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.55 (2).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.55.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.56 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.56 (2).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.56.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.57 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.57.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.58 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.58 (2).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.58.jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.59 (1).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.59 (2).jpeg',
  'WhatsApp Image 2026-10-26 at 15.56.59.jpeg'
];

const categoryDescriptions = {
  Leucistic: 'Pale pink skin, feathery gills, and a soft, calm appearance that makes this axolotl look gentle and easy to admire.',
  'Wild Type': 'Deep natural tones with subtle patterns, showing the classic dark axolotl look seen in the wild.',
  'Golden Albino': 'Warm golden tones with bright eyes and a glowing color that stands out beautifully in the aquarium.',
  Melanoid: 'Rich, dark pigmentation with a smooth silhouette and a striking dramatic contrast across the body.',
  Leopard: 'Light base tones interrupted by bold dark spots, creating a distinct and eye-catching pattern.',
  Pink: 'Soft rose coloration with smooth skin and a friendly, approachable appearance that suits a peaceful tank.',
  Marbled: 'A blended mix of colors and markings, giving each animal a one-of-a-kind and collectible look.',
  Blue: 'Cool blue-gray hues with a rare, elegant finish that makes the axolotl feel unique and highly prized.'
};

const categoryOrder = ['Leucistic', 'Wild Type', 'Golden Albino', 'Melanoid', 'Leopard', 'Pink', 'Marbled', 'Blue'];

const productData = galleryFiles.map((file, index) => {
  const category = categoryOrder[index % categoryOrder.length];
  const basePrice = [45, 50, 55, 60, 60, 65, 70, 75][index % 8];

  return {
    name: `${category} Axolotl ${index + 1}`,
    category,
    price: basePrice,
    image: `../image/${file}`,
    description: categoryDescriptions[category],
    dimensions: '20–30 cm',
    lifespan: '10–15 years'
  };
});

const state = {
  filter: 'All',
  sort: 'price-asc',
  page: 1,
  perPage: 8
};

const siteConfig = {
  whatsappNumber: '14242409780'
};

const cardGrid = document.getElementById('card-grid');
const chips = [...document.querySelectorAll('.chip')];
const sortButton = document.querySelector('.sort-btn');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageNumbers = document.getElementById('page-numbers');
const detailModal = document.getElementById('detail-modal');
const detailContent = document.getElementById('detail-content');

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function getFilteredProducts() {
  const filtered = state.filter === 'All'
    ? [...productData]
    : productData.filter((product) => product.category === state.filter);

  const sorted = [...filtered];
  sorted.sort((a, b) => {
    if (state.sort === 'price-asc') return a.price - b.price;
    if (state.sort === 'price-desc') return b.price - a.price;
    return 0;
  });

  return sorted;
}

function openDetailModal(productId) {
  if (!detailModal || !detailContent) return;

  const product = productData.find((item) => item.name === productId || item.category === productId);
  const selectedProduct = product || productData[0];
  const galleryImages = selectedProduct.gallery || [selectedProduct.image, selectedProduct.image, selectedProduct.image, selectedProduct.image];
  const detailText = [
    {
      title: 'Physical Appearance',
      value: 'Soft pink body, smooth skin, and gentle dark eyes with an unmistakably calm expression.'
    },
    {
      title: 'Personality & Behavior',
      value: 'Calm, friendly, and active at night with a curious, gentle temperament.'
    },
    {
      title: 'Unique Characteristics',
      value: 'Known for its gentle nature, remarkable adaptability, and beautifully soft color contrast.'
    },
    {
      title: 'Color Patterns',
      value: 'Pale pink tones with darker eyes and a clear contrast that gives the animal a classic appeal.'
    }
  ];

  detailContent.innerHTML = `
    <div class="detail-grid">
      <div class="detail-gallery-panel">
        <div class="detail-topbar">
          <button class="back-link" type="button" data-close="true">← Back to Gallery</button>
          <span class="detail-pill">${selectedProduct.category}</span>
        </div>

        <div class="detail-main-image-wrap">
          <button class="carousel-arrow left" type="button" aria-label="Previous image">←</button>
          <img class="detail-main-image" src="${galleryImages[0]}" alt="${selectedProduct.name}" />
          <button class="carousel-arrow right" type="button" aria-label="Next image">→</button>
        </div>

        <div class="detail-thumbs">
          ${galleryImages.slice(0, 4).map((image, idx) => `
            <button class="thumb ${idx === 0 ? 'active' : ''}" type="button" data-thumb="${idx}">
              <img src="${image}" alt="${selectedProduct.name} thumbnail ${idx + 1}" />
            </button>
          `).join('')}
        </div>
      </div>

      <div class="detail-copy-panel">
        <h2 id="detail-title">${selectedProduct.name}</h2>
        <div class="detail-price-row">
          <span class="detail-price">${formatPrice(selectedProduct.price)}</span>
          <span class="stock-badge">● In Stock</span>
        </div>

        <p class="detail-summary">${selectedProduct.description}</p>

        <div class="detail-specs">
          <div class="detail-spec">
            <span class="spec-icon">◌</span>
            <div><strong>Size</strong><small>${selectedProduct.dimensions}</small></div>
          </div>
          <div class="detail-spec">
            <span class="spec-icon">❤</span>
            <div><strong>Lifespan</strong><small>${selectedProduct.lifespan}</small></div>
          </div>
          <div class="detail-spec">
            <span class="spec-icon">◫</span>
            <div><strong>Age</strong><small>Juvenile</small></div>
          </div>
          <div class="detail-spec">
            <span class="spec-icon">✦</span>
            <div><strong>Care</strong><small>Easy</small></div>
          </div>
        </div>

        <div class="detail-qty-row">
          <div class="qty-box" aria-label="Quantity selector">
            <button class="qty-btn" type="button" data-qty="decrease">−</button>
            <span class="qty-value">1</span>
            <button class="qty-btn" type="button" data-qty="increase">+</button>
          </div>
          <a class="detail-order-btn" href="https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello, I want to order the ${selectedProduct.name} for ${formatPrice(selectedProduct.price)}.`)}" target="_blank" rel="noreferrer">Order on WhatsApp</a>
        </div>
      </div>
    </div>

    <div class="detail-info-band">
      <div class="detail-info-header">About this axolotl</div>
      <div class="detail-info-grid">
        ${detailText.map(item => `
          <div class="detail-info-item">
            <div class="mini-icon">✦</div>
            <div>
              <h3>${item.title}</h3>
              <p>${item.value}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const modalThumbs = detailContent.querySelectorAll('.thumb');
  modalThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const index = Number(thumb.dataset.thumb);
      const mainImage = detailContent.querySelector('.detail-main-image');
      mainImage.src = galleryImages[index];
      modalThumbs.forEach((item) => item.classList.toggle('active', item === thumb));
    });
  });

  const qtyValue = detailContent.querySelector('.qty-value');
  detailContent.querySelector('[data-qty="decrease"]')?.addEventListener('click', () => {
    const current = Number(qtyValue.textContent) || 1;
    qtyValue.textContent = String(Math.max(1, current - 1));
  });
  detailContent.querySelector('[data-qty="increase"]')?.addEventListener('click', () => {
    const current = Number(qtyValue.textContent) || 1;
    qtyValue.textContent = String(current + 1);
  });

  detailContent.querySelectorAll('[data-close="true"]').forEach((button) => {
    button.addEventListener('click', closeDetailModal);
  });

  detailModal.classList.add('open');
  detailModal.setAttribute('aria-hidden', 'false');
}

function closeDetailModal() {
  if (!detailModal) return;
  detailModal.classList.remove('open');
  detailModal.setAttribute('aria-hidden', 'true');
}

function renderCards() {
  const filteredProducts = getFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / state.perPage));
  state.page = Math.min(state.page, totalPages);

  const start = (state.page - 1) * state.perPage;
  const visibleProducts = filteredProducts.slice(start, start + state.perPage);

  cardGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="card-image">
        <img src="${product.image}" alt="${product.name}" />
        <span class="tag">${product.category}</span>
        <button class="wish-btn" type="button" aria-label="Save item">♡</button>
      </div>
      <h3>${product.name}</h3>
      <div class="price">${formatPrice(product.price)}</div>
      <p>${product.description}</p>
      <ul class="meta-list">
        <li><span>Size:</span> ${product.dimensions}</li>
        <li><span>Lifespan:</span> ${product.lifespan}</li>
      </ul>
      <button class="details-btn" type="button" data-detail-product="${product.name}">View details <span>→</span></button>
    </article>
  `).join('');

  cardGrid.querySelectorAll('.details-btn').forEach((button) => {
    button.addEventListener('click', () => openDetailModal(button.dataset.detailProduct));
  });

  renderPagination(filteredProducts.length, totalPages);
}

function renderPagination(totalItems, totalPages) {
  const numbers = [];

  for (let page = 1; page <= totalPages; page += 1) {
    numbers.push(`
      <button class="page-number ${page === state.page ? 'active' : ''}" type="button" data-page="${page}">${page}</button>
    `);
  }

  pageNumbers.innerHTML = numbers.join('');

  pageNumbers.querySelectorAll('.page-number').forEach((button) => {
    button.addEventListener('click', () => {
      state.page = Number(button.dataset.page);
      renderCards();
    });
  });

  prevPageBtn.disabled = state.page === 1;
  nextPageBtn.disabled = state.page === totalPages || totalItems === 0;

  if (totalItems === 0) {
    cardGrid.innerHTML = '<div class="empty-state">No axolotls match this filter.</div>';
  }
}

function setSortLabel() {
  if (state.sort === 'price-asc') {
    sortButton.innerHTML = 'Sort by: Price (Low to High) <span>⌄</span>';
    sortButton.dataset.sort = 'price-asc';
  } else {
    sortButton.innerHTML = 'Sort by: Price (High to Low) <span>⌄</span>';
    sortButton.dataset.sort = 'price-desc';
  }
}

function attachEvents() {
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      state.filter = chip.dataset.filter;
      state.page = 1;

      chips.forEach((item) => item.classList.toggle('active', item === chip));
      renderCards();
    });
  });

  sortButton.addEventListener('click', () => {
    state.sort = state.sort === 'price-asc' ? 'price-desc' : 'price-asc';
    state.page = 1;
    setSortLabel();
    renderCards();
  });

  prevPageBtn.addEventListener('click', () => {
    state.page = Math.max(1, state.page - 1);
    renderCards();
  });

  nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(getFilteredProducts().length / state.perPage);
    state.page = Math.min(totalPages, state.page + 1);
    renderCards();
  });

  detailModal?.addEventListener('click', (event) => {
    if (event.target.dataset.close === 'true') closeDetailModal();
  });

  document.querySelector('.modal-close')?.addEventListener('click', closeDetailModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && detailModal?.classList.contains('open')) closeDetailModal();
  });
}

attachEvents();
setSortLabel();
renderCards();
