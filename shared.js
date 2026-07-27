(function initSharedPage() {
  const config = window.auraSiteConfig || {};

  const preferredTheme = localStorage.getItem('aura-theme') || 'light';
  document.body.setAttribute('data-theme', preferredTheme);

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = preferredTheme === 'light' ? 'Dark mode' : 'Light mode';
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', nextTheme);
      localStorage.setItem('aura-theme', nextTheme);
      themeToggle.textContent = nextTheme === 'light' ? 'Dark mode' : 'Light mode';
    });
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.getElementById('site-nav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('mobile-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }

  const consultationForm = document.getElementById('consultation-form');
  const formStatus = document.getElementById('form-status');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(consultationForm);
      const name = String(formData.get('customerName') || '').trim();
      const email = String(formData.get('customerEmail') || '').trim();
      const concern = String(formData.get('primaryConcern') || '').trim();
      const notes = String(formData.get('notes') || '').trim();

      if (!name || !email) {
        if (formStatus) {
          formStatus.textContent = 'Please enter your name and email address.';
        }
        return;
      }

      const message = [
        'Hello AuraTrace, I would like to request a telehealth consultation.',
        `Name: ${name}`,
        `Email: ${email}`,
        `Primary concern: ${concern}`,
        notes ? `Notes: ${notes}` : ''
      ].filter(Boolean).join('\n');

      const whatsappUrl = `https://wa.me/${config.whatsappNumber || '447575630141'}?text=${encodeURIComponent(message)}`;
      const emailUrl = `mailto:${config.contactEmail || 'hello@auratrace.co.uk'}?subject=${encodeURIComponent('AuraTrace consultation request')}&body=${encodeURIComponent(message)}`;

      if (formStatus) {
        formStatus.innerHTML = `Request ready. <a href="${whatsappUrl}" target="_blank" rel="noreferrer">Send on WhatsApp</a> or <a href="${emailUrl}">email our team</a>.`;
      }

      consultationForm.reset();
    });
  }

  const batchForm = document.getElementById('batch-lookup-form');
  const batchResult = document.getElementById('batch-result');
  if (batchForm && batchResult) {
    const batches = {
      'AUR-204': {
        product: 'AuraTrace Ashwagandha Tablets',
        harvested: '14 July 2026',
        location: 'Sussex, UK',
        status: 'Cleared for release',
        tests: ['Heavy metal screen complete', 'Microbial review complete', 'Certificate issued 24 July 2026']
      },
      'AT-ASH-1014': {
        product: 'AuraTrace Ashwagandha Tablets',
        harvested: '14 July 2026',
        location: 'Sussex, UK',
        status: 'Cleared for release',
        tests: ['Batch matched to SKU AT-ASH-1014', 'Chain-of-custody intact', 'Storage temperature logged']
      }
    };

    batchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const code = String(new FormData(batchForm).get('batchCode') || '').trim().toUpperCase();
      const match = batches[code];

      if (!match) {
        batchResult.className = 'batch-result empty';
        batchResult.textContent = `No live record found for "${code}". Try AUR-204 or contact support on WhatsApp.`;
        return;
      }

      batchResult.className = 'batch-result';
      batchResult.innerHTML = `
        <strong>${match.product}</strong><br />
        Batch: ${code}<br />
        Harvested: ${match.harvested}<br />
        Location: ${match.location}<br />
        Status: ${match.status}<br />
        ${match.tests.map((item) => `• ${item}`).join('<br />')}
      `;
    });
  }
})();
