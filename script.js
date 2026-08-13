const lookupForm = document.getElementById('lookup-form');
const resultsContainer = document.getElementById('lookup-results');
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');
const consultationForm = document.getElementById('consultation-form');
const statusBox = document.getElementById('form-status');
const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const purchaseModal = document.getElementById('purchase-modal');
const closeModalButton = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const selectedProductLabel = document.getElementById('selected-product-label');
const checkoutForm = document.getElementById('checkout-form');
const checkoutStatus = document.getElementById('checkout-status');
const modalWhatsapp = document.getElementById('modal-whatsapp');
const modalEmail = document.getElementById('modal-email');

const posterSlides = [
  {
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
    eyebrow: 'AURA ESSENCE',
    title: 'Luxury botanical storytelling',
    copy: 'Editorial-inspired visuals designed to feel calm, polished, and trusted.'
  },
  {
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=900&q=80',
    eyebrow: 'CLINICAL TRUST',
    title: 'Evidence-led beauty',
    copy: 'Modern wellness presented with the clarity of a premium certification suite.'
  },
  {
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    eyebrow: 'TRACEABLE CARE',
    title: 'Every batch told clearly',
    copy: 'Beautiful design meets practical assurance through every visible detail.'
  }
];

const certificates = {};

const initialProducts = [];

let products = JSON.parse(localStorage.getItem('aura-products')) || initialProducts;

const preferredTheme = localStorage.getItem('aura-theme') || 'dark';
document.body.setAttribute('data-theme', preferredTheme);

if (themeToggle) {
  themeToggle.textContent = preferredTheme === 'light' ? 'Dark mode' : 'Light mode';
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('aura-theme', nextTheme);
    themeToggle.textContent = nextTheme === 'light' ? 'Dark mode' : 'Light mode';
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('mobile-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (lookupForm && resultsContainer) {
  lookupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('batch-number');
    const batch = input.value.trim().toUpperCase();

    const record = certificates[batch];

    if (!record) {
      resultsContainer.innerHTML = `
        <article class="result-card highlighted">
          <p class="eyebrow">${batch || 'BATCH NUMBER REQUIRED'}</p>
          <h4>No verified public record found</h4>
          <p>Check the number or contact AuraTrace. An unknown batch must never be treated as cleared or certified.</p>
        </article>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <article class="result-card highlighted">
        <p class="eyebrow">${batch || 'BATCH'}</p>
        <h4>Verified passport record</h4>
        <p>${record.heavy}</p>
      </article>
      <article class="result-card">
        <p class="eyebrow">${batch || 'BATCH'}</p>
        <h4>Testing record</h4>
        <p>${record.microbial}</p>
      </article>
    `;
  });
}

if (consultationForm && statusBox) {
  consultationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    statusBox.textContent = 'Thank you. A consultant will contact you shortly with next steps.';
    consultationForm.reset();
  });
}

function renderProducts() {
  if (!productList) {
    return;
  }

  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = `
      <article class="product-card">
        <p class="eyebrow">NO PRODUCTS YET</p>
        <h4>Your catalogue is empty</h4>
        <p>Add your first product using the form below to start building your storefront.</p>
      </article>
    `;
    return;
  }

  products.forEach((product) => {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.innerHTML = `
      <p class="eyebrow">${product.category}</p>
      <h4>${product.name}</h4>
      <p>${product.description}</p>
      <p class="price">£${product.price.toFixed(2)}</p>
      <div class="tags">
        <span>Traceable</span>
        <span>Premium</span>
      </div>
      <button class="btn btn-primary" type="button" data-product-id="${product.id}">Buy now</button>
    `;

    productList.appendChild(article);
  });
}

function openPurchaseModal(productName = 'your selected product', type = 'reserve') {
  if (!purchaseModal) {
    return;
  }

  const actionText = type === 'bank'
    ? 'We will share private bank transfer details for this order.'
    : type === 'whatsapp'
      ? 'A concierge specialist can guide you through the purchase in real time.'
      : 'We will confirm availability and next steps for your reservation.';

  if (modalTitle) {
    modalTitle.textContent = 'Purchase options';
  }
  if (modalMessage) {
    modalMessage.textContent = `${productName}: ${actionText}`;
  }
  if (selectedProductLabel) {
    selectedProductLabel.textContent = `Selected item: ${productName}`;
  }
  if (checkoutStatus) {
    checkoutStatus.textContent = '';
  }
  modalWhatsapp.href = `https://wa.me/447733341867?text=Hello%20I%20would%20like%20to%20buy%20${encodeURIComponent(productName)}`;
  modalEmail.href = `mailto:hello@auratrace.co.uk?subject=${encodeURIComponent('Order enquiry for ' + productName)}`;
  purchaseModal.classList.add('open');
  purchaseModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  if (!purchaseModal) {
    return;
  }

  purchaseModal.classList.remove('open');
  purchaseModal.setAttribute('aria-hidden', 'true');
}

if (productList) {
  renderProducts();

  productList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-product-id]');
    if (!button) {
      return;
    }

    const product = products.find((item) => String(item.id) === button.getAttribute('data-product-id'));
    if (product) {
      openPurchaseModal(product.name, 'reserve');
    }
  });
}

if (productForm) {
  productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(productForm);
    const newProduct = {
      id: Date.now(),
      name: String(formData.get('name') || '').trim(),
      price: Number(formData.get('price')) || 0,
      category: String(formData.get('category') || '').trim(),
      description: String(formData.get('description') || '').trim()
    };

    if (!newProduct.name || !newProduct.category || !newProduct.description) {
      return;
    }

    products = [newProduct, ...products];
    localStorage.setItem('aura-products', JSON.stringify(products));
    renderProducts();
    productForm.reset();
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(checkoutForm);
    const customerName = String(formData.get('customerName') || '').trim();

    if (checkoutStatus) {
      checkoutStatus.textContent = `Thank you, ${customerName || 'friend'} — our concierge team will contact you shortly with your order details.`;
    }
    checkoutForm.reset();
  });
}

if (closeModalButton) {
  closeModalButton.addEventListener('click', closeModal);
}

if (purchaseModal) {
  purchaseModal.addEventListener('click', (event) => {
    if (event.target === purchaseModal) {
      closeModal();
    }
  });
}

document.querySelectorAll('[data-purchase-option]').forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-purchase-option');
    openPurchaseModal('AuraTrace order', type);
  });
});

function renderPosterSlide(index) {
  const image = document.getElementById('carousel-image');
  const eyebrow = document.getElementById('carousel-eyebrow');
  const title = document.getElementById('carousel-title');
  const copy = document.getElementById('carousel-copy');

  if (!image || !eyebrow || !title || !copy) {
    return;
  }

  const slide = posterSlides[index] || posterSlides[0];
  image.src = slide.image;
  image.alt = `${slide.title} poster`;
  eyebrow.textContent = slide.eyebrow;
  title.textContent = slide.title;
  copy.textContent = slide.copy;

  document.querySelectorAll('.thumb').forEach((thumb, thumbIndex) => {
    thumb.classList.toggle('active', thumbIndex === index);
  });
}

function showPoster(direction = 1) {
  const currentIndex = Number(document.querySelector('.thumb.active')?.getAttribute('data-index') || 0);
  const nextIndex = (currentIndex + direction + posterSlides.length) % posterSlides.length;
  renderPosterSlide(nextIndex);
}

function startPosterCarousel() {
  if (!document.querySelector('[data-carousel]')) {
    return;
  }

  renderPosterSlide(0);

  const prevButton = document.querySelector('.carousel-control.prev');
  const nextButton = document.querySelector('.carousel-control.next');

  prevButton?.addEventListener('click', () => showPoster(-1));
  nextButton?.addEventListener('click', () => showPoster(1));

  document.querySelectorAll('.thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const index = Number(thumb.getAttribute('data-index') || 0);
      renderPosterSlide(index);
    });
  });

  setInterval(() => {
    showPoster(1);
  }, 5000);
}

startPosterCarousel();

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
