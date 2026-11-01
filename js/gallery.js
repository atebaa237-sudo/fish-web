const state = {
  filter: 'All',
  sort: 'price-desc',
  page: 1,
  perPage: 8
};

const cardGrid = document.getElementById('card-grid');
const chips = [...document.querySelectorAll('.chip')];
const sortButton = document.querySelector('.sort-btn');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageNumbers = document.getElementById('page-numbers');
const productData = window.galleryProducts;

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function formatListingPrice(value) {
  return value === null ? 'Contact for price' : formatPrice(value);
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
      <a class="details-btn" href="product.html?id=${encodeURIComponent(product.id)}">View details <span>→</span></a>
    </article>
  `).join('');

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

}

if (cardGrid && pageNumbers && prevPageBtn && nextPageBtn && sortButton) {
  attachEvents();
  setSortLabel();
  renderCards();
}
