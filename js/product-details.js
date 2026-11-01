const productDetail = document.getElementById('product-detail');
const selectedProductId = new URLSearchParams(window.location.search).get('id');
const selectedProduct = window.galleryProducts.find((product) => product.id === selectedProductId);

function formatProductPrice(value) {
  return value === null
    ? 'Contact for price'
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function getOrderMessage(quantity) {
  const priceDetails = selectedProduct.price === null
    ? ' Please let me know the price and availability.'
    : ` for ${formatProductPrice(selectedProduct.price)} each.`;
  return `Hello, I want to inquire about ${quantity} ${selectedProduct.name}${priceDetails}`;
}

function renderProductDetails() {
  if (!selectedProduct) {
    document.title = 'Listing Not Found | Summer Axolotl Home';
    productDetail.innerHTML = `
      <div class="product-detail-message">
        <h1>We couldn't find that listing.</h1>
        <p>Please return to the gallery to browse our available axolotls.</p>
        <a class="details-btn" href="gallery.html">Back to Gallery <span>→</span></a>
      </div>
    `;
    return;
  }

  document.title = `${selectedProduct.name} Axolotl | Summer Axolotl Home`;
  const price = formatProductPrice(selectedProduct.price);
  const orderMessage = getOrderMessage(1);

  productDetail.innerHTML = `
    <div class="detail-grid">
      <div class="detail-gallery-panel">
        <div class="detail-topbar">
          <a class="back-link" href="gallery.html">← Back to Gallery</a>
          <span class="detail-pill">${selectedProduct.category}</span>
        </div>
        <figure class="detail-main-image-wrap">
          <img class="detail-main-image" src="${selectedProduct.image}" alt="${selectedProduct.name} axolotl" />
        </figure>
      </div>

      <section class="detail-copy-panel" aria-labelledby="detail-title">
        <h1 id="detail-title">${selectedProduct.name}</h1>
        <div class="detail-price-row">
          <span class="detail-price">${price}</span>
          <span class="stock-badge">Availability confirmed by message</span>
        </div>
        <p class="detail-summary">${selectedProduct.description}</p>

        <div class="detail-specs">
          <div class="detail-spec">
            <span class="spec-icon" aria-hidden="true">◌</span>
            <div><strong>Species</strong><small>${selectedProduct.category}</small></div>
          </div>
          <div class="detail-spec">
            <span class="spec-icon" aria-hidden="true">$</span>
            <div><strong>Listed price</strong><small>${price}</small></div>
          </div>
          <div class="detail-spec">
            <span class="spec-icon" aria-hidden="true">◫</span>
            <div><strong>Listing</strong><small>Individual shown</small></div>
          </div>
          <div class="detail-spec">
            <span class="spec-icon" aria-hidden="true">✦</span>
            <div><strong>Availability</strong><small>Please confirm with us</small></div>
          </div>
        </div>

        <div class="detail-qty-row">
          <div class="qty-box" aria-label="Quantity selector">
            <button class="qty-btn" type="button" data-qty="decrease" aria-label="Decrease quantity">−</button>
            <span class="qty-value" aria-live="polite">1</span>
            <button class="qty-btn" type="button" data-qty="increase" aria-label="Increase quantity">+</button>
          </div>
          <div class="detail-contact-actions">
            <a class="detail-order-btn whatsapp-order-btn" href="https://wa.me/14242409780?text=${encodeURIComponent(orderMessage)}" target="_blank" rel="noreferrer">Order on WhatsApp</a>
            <a class="detail-order-btn email-order-btn" href="mailto:summerhome671@gmail.com?subject=${encodeURIComponent(`Order inquiry: ${selectedProduct.name}`)}&body=${encodeURIComponent(orderMessage)}">Order by Email</a>
          </div>
        </div>
      </section>
    </div>

    <section class="detail-info-band" aria-labelledby="detail-info-title">
      <h2 class="detail-info-header" id="detail-info-title">About this axolotl</h2>
      <div class="detail-info-grid">
        <article class="detail-info-item">
          <span class="mini-icon" aria-hidden="true">✦</span>
          <div><h3>Individual listing</h3><p>The photograph shows the individual in this listing.</p></div>
        </article>
        <article class="detail-info-item">
          <span class="mini-icon" aria-hidden="true">✦</span>
          <div><h3>Availability</h3><p>Contact us to confirm current availability before ordering.</p></div>
        </article>
      </div>
    </section>
  `;

  const quantityValue = productDetail.querySelector('.qty-value');
  const updateOrderLinks = () => {
    const message = getOrderMessage(Number(quantityValue.textContent) || 1);
    productDetail.querySelector('.whatsapp-order-btn').href =
      `https://wa.me/14242409780?text=${encodeURIComponent(message)}`;
    productDetail.querySelector('.email-order-btn').href =
      `mailto:summerhome671@gmail.com?subject=${encodeURIComponent(`Order inquiry: ${selectedProduct.name}`)}&body=${encodeURIComponent(message)}`;
  };

  productDetail.querySelector('[data-qty="decrease"]').addEventListener('click', () => {
    quantityValue.textContent = String(Math.max(1, Number(quantityValue.textContent) - 1));
    updateOrderLinks();
  });
  productDetail.querySelector('[data-qty="increase"]').addEventListener('click', () => {
    quantityValue.textContent = String(Number(quantityValue.textContent) + 1);
    updateOrderLinks();
  });
}

renderProductDetails();
