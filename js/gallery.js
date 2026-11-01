const productListings = [
  ['chimera $1500.jpeg', 'Chimera', 1500],
  ['chimera $1200.jpeg', 'Chimera', 1200],
  ['chimera $1200 1.jpeg', 'Chimera', 1200],
  ['Mosaic $700.jpeg', 'Mosaic', 700],
  ['Mosaic $500.jpeg', 'Mosaic', 500],
  ['mosaic $500 1.jpeg', 'Mosaic', 500],
  ['mosaic $500 3.jpeg', 'Mosaic', 500],
  ['mosaic $150 2.jpeg', 'Mosaic', 150],
  ['GFP $200.jpeg', 'GFP', 200],
  ['GFP $200 2.jpeg', 'GFP', 200],
  ['GFP $150.jpeg', 'GFP', 150],
  ['GFP $150 1.jpeg', 'GFP', 150],
  ['GFP $150 3.jpeg', 'GFP', 150],
  ['GFP melanoid.jpeg', 'GFP Melanoid', null],
  ['Golden $200.jpeg', 'Golden', 200],
  ['Lavender $200.jpeg', 'Lavender', 200],
  ['Levander $200.jpeg', 'Lavender', 200],
  ['albino $100 4.jpeg', 'Albino', 100],
  ['melanoid $200.jpeg', 'Melanoid', 200],
  ['pyrite $200.jpeg', 'Pyrite', 200],
  ['wild copper $200.jpeg', 'Wild Copper', 200],
  ['widcopper3 200$.jpeg', 'Wild Copper', 200],
  ['Stardust mosaic.jpeg', 'Stardust Mosaic', 300],
  ['white albino $150.jpeg', 'White Albino', 150],
  ['Leucistic $100 1.jpeg', 'Leucistic', 100],
  ['Leucistic $100 5.jpeg', 'Leucistic', 100],
  ['Leucistic $100 6.jpeg', 'Leucistic', 100],
  ['Leucistic $100 7.jpeg', 'Leucistic', 100],
  ['Leucistic $100 8.jpeg', 'Leucistic', 100],
  ['Leucitic $100 1.jpeg', 'Leucistic', 100],
  ['Leucitic $101.jpeg', 'Leucistic', 101]
];

const categoryDescriptions = {
  Albino: 'Albino color morph. Contact us to confirm this individual’s availability and details.',
  Chimera: 'Chimera color morph. Contact us to confirm this individual’s availability and details.',
  'GFP Melanoid': 'GFP Melanoid color morph. Contact us for this individual’s price and availability.',
  GFP: 'GFP color morph. Contact us to confirm this individual’s availability and details.',
  Golden: 'Golden color morph. Contact us to confirm this individual’s availability and details.',
  Lavender: 'Lavender color morph. Contact us to confirm this individual’s availability and details.',
  Leucistic: 'Leucistic color morph. Contact us to confirm this individual’s availability and details.',
  Melanoid: 'Melanoid color morph. Contact us to confirm this individual’s availability and details.',
  Mosaic: 'Mosaic color morph. Contact us to confirm this individual’s availability and details.',
  Pyrite: 'Pyrite color morph. Contact us to confirm this individual’s availability and details.',
  'Stardust Mosaic': 'Stardust Mosaic color morph. Contact us to confirm this individual’s availability and details.',
  'White Albino': 'White Albino color morph. Contact us to confirm this individual’s availability and details.',
  'Wild Copper': 'Wild Copper color morph. Contact us to confirm this individual’s availability and details.'
};

const productData = productListings.map(([file, category, price], index) => ({
  id: `axolotl-${index + 1}`,
  name: category,
  category,
  price,
  image: `../image/${encodeURIComponent(file)}`,
  description: categoryDescriptions[category]
}));

const state = {
  filter: 'All',
  sort: 'price-desc',
  page: 1,
  perPage: 8
};

const siteConfig = {
  whatsappNumber: '14242409780',
  email: 'summerhome671@gmail.com'
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

function formatListingPrice(value) {
  return value === null ? 'Contact for price' : formatPrice(value);
}

function getOrderMessage(quantity, product) {
  const priceDetails = product.price === null
    ? ' Please let me know the price and availability.'
    : ` for ${formatPrice(product.price)} each.`;
  return `Hello, I want to inquire about ${quantity} ${product.name}${priceDetails}`;
}

function getFilteredProducts() {
  const filtered = state.filter === 'All'
    ? [...productData]
    : productData.filter((product) => product.category === state.filter);

  const sorted = [...filtered];
  sorted.sort((a, b) => {
    if (a.price === null) return b.price === null ? 0 : 1;
    if (b.price === null) return -1;
    if (state.sort === 'price-asc') return a.price - b.price;
    if (state.sort === 'price-desc') return b.price - a.price;
    return 0;
  });

  return sorted;
}

function openDetailModal(productId) {
  if (!detailModal || !detailContent) return;

  const product = productData.find((item) => item.id === productId);
  if (!product) return;

  const selectedProduct = product;
  const galleryImages = selectedProduct.gallery || [selectedProduct.image, selectedProduct.image, selectedProduct.image, selectedProduct.image];
  const detailText = [
    { title: 'Species', value: selectedProduct.category },
    { title: 'Listed Price', value: formatListingPrice(selectedProduct.price) },
    { title: 'Photo', value: 'The image shows the individual in this listing.' },
    { title: 'Availability', value: 'Contact us to confirm current availability.' }
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
          <span class="detail-price">${formatListingPrice(selectedProduct.price)}</span>
          <span class="stock-badge">● In Stock</span>
        </div>

        <p class="detail-summary">${selectedProduct.description}</p>

        <div class="detail-specs">
          <div class="detail-spec">
            <span class="spec-icon">◌</span>
            <div><strong>Species</strong><small>${selectedProduct.category}</small></div>
          </div>
          <div class="detail-spec">
            <span class="spec-icon">❤</span>
            <div><strong>Price</strong><small>${formatListingPrice(selectedProduct.price)}</small></div>
          </div>
          <div class="detail-spec">
            <span class="spec-icon">◫</span>
            <div><strong>Listing</strong><small>Individual shown</small></div>
          </div>
          <div class="detail-spec">
            <span class="spec-icon">✦</span>
            <div><strong>Availability</strong><small>Confirm with us</small></div>
          </div>
        </div>

        <div class="detail-qty-row">
          <div class="qty-box" aria-label="Quantity selector">
            <button class="qty-btn" type="button" data-qty="decrease">−</button>
            <span class="qty-value">1</span>
            <button class="qty-btn" type="button" data-qty="increase">+</button>
          </div>
          <div class="detail-contact-actions">
            <a class="detail-order-btn whatsapp-order-btn" href="https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(getOrderMessage(1, selectedProduct))}" target="_blank" rel="noreferrer">Order on WhatsApp</a>
            <a class="detail-order-btn email-order-btn" href="mailto:${siteConfig.email}?subject=${encodeURIComponent(`Order inquiry: ${selectedProduct.name}`)}&body=${encodeURIComponent(getOrderMessage(1, selectedProduct))}">Order by Email</a>
          </div>
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
  const updateOrderLinks = () => {
    const quantity = Number(qtyValue.textContent) || 1;
    const message = getOrderMessage(quantity, selectedProduct);
    const whatsappLink = detailContent.querySelector('.whatsapp-order-btn');
    const emailLink = detailContent.querySelector('.email-order-btn');

    whatsappLink.href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    emailLink.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Order inquiry: ${selectedProduct.name}`)}&body=${encodeURIComponent(message)}`;
  };
  updateOrderLinks();
  detailContent.querySelector('[data-qty="decrease"]')?.addEventListener('click', () => {
    const current = Number(qtyValue.textContent) || 1;
    qtyValue.textContent = String(Math.max(1, current - 1));
    updateOrderLinks();
  });
  detailContent.querySelector('[data-qty="increase"]')?.addEventListener('click', () => {
    const current = Number(qtyValue.textContent) || 1;
    qtyValue.textContent = String(current + 1);
    updateOrderLinks();
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
      </div>
      <h3>${product.name}</h3>
      <div class="price">${formatListingPrice(product.price)}</div>
      <p>${product.description}</p>
      <ul class="meta-list">
        <li><span>Species:</span> ${product.category}</li>
        <li><span>Listing:</span> Individual axolotl shown</li>
      </ul>
      <button class="details-btn" type="button" data-detail-product="${product.id}">View details <span>→</span></button>
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
