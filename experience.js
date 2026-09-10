'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motion = () => reducedMotion.matches ? 'instant' : 'smooth';
const productCards = [...document.querySelectorAll('.package-card')];
const categoryTabs = [...document.querySelectorAll('.tab-btn')];
const moreButton = document.getElementById('showMoreProducts');
let selectedCategory = 'all';
let productLimit = 6;

function renderProducts() {
  const matching = productCards.filter(card => selectedCategory === 'all' || card.dataset.category === selectedCategory);
  productCards.forEach(card => { card.hidden = true; });
  matching.slice(0, productLimit).forEach(card => { card.hidden = false; });
  document.getElementById('catalogCount').textContent = `عرض ${Math.min(productLimit, matching.length)} من ${matching.length} منتجًا وباقة`;
  moreButton.hidden = productLimit >= matching.length;
}

function filterProducts(category, element) {
  selectedCategory = category;
  productLimit = 6;
  categoryTabs.forEach(tab => {
    const active = tab === element;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
  renderProducts();
}

categoryTabs.forEach(tab => {
  const category = tab.getAttribute('onclick').match(/'([^']+)'/)[1];
  tab.dataset.category = category;
  tab.setAttribute('aria-controls', 'productGrid');
  tab.setAttribute('aria-pressed', String(tab.classList.contains('active')));
  const count = category === 'all' ? productCards.length : productCards.filter(card => card.dataset.category === category).length;
  const badge = document.createElement('span');
  badge.className = 'tab-count';
  badge.textContent = count;
  tab.appendChild(badge);
});
moreButton.addEventListener('click', () => {
  const before = productCards.filter(card => !card.hidden);
  productLimit += 6;
  renderProducts();
  productCards.find(card => !card.hidden && !before.includes(card))?.focus({preventScroll: true});
});
document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => {
  const category = link.dataset.categoryLink;
  filterProducts(category, categoryTabs.find(tab => tab.dataset.category === category));
}));
productCards.forEach(card => {
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', 'عرض تفاصيل ' + card.querySelector('h3').textContent);
  card.addEventListener('keydown', e => {
    if (e.target === card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); card.click(); }
  });
});
renderProducts();

const menuButton = document.getElementById('menuToggle');
const menu = document.getElementById('navMenu');
function setMenu(open) {
  menu.classList.toggle('active', open);
  menuButton.setAttribute('aria-expanded', String(open));
}
menuButton.addEventListener('click', () => setMenu(!menu.classList.contains('active')));
document.addEventListener('click', e => { if (!e.target.closest('.navbar')) setMenu(false); });
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', e => {
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  e.preventDefault();
  setMenu(false);
  target.scrollIntoView({behavior: motion(), block: 'start'});
  history.replaceState(null, '', link.hash);
  if (link.classList.contains('skip-link')) categoryTabs[0].focus({preventScroll:true});
}));
let scrollQueued = false;
function updateScroll() {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 24);
  const height = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scrollProgress').style.width = (height > 0 ? window.scrollY / height * 100 : 0) + '%';
  scrollQueued = false;
}
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }, {passive:true});
updateScroll();

document.querySelectorAll('.faq-question').forEach((button, index) => {
  const answer = button.nextElementSibling;
  answer.id = 'faq-answer-' + index;
  answer.hidden = true;
  button.setAttribute('aria-controls', answer.id);
  button.setAttribute('aria-expanded', 'false');
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const opening = !item.classList.contains('active');
    item.closest('.faq-category').querySelectorAll('.faq-item').forEach(other => {
      other.classList.remove('active');
      other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      other.querySelector('.faq-answer').hidden = true;
    });
    item.classList.toggle('active', opening);
    button.setAttribute('aria-expanded', String(opening));
    answer.hidden = !opening;
  });
});

const gallery = document.getElementById('projectGallery');
document.getElementById('galleryNext').addEventListener('click', () => gallery.scrollBy({left:-gallery.clientWidth * .8, behavior:motion()}));
document.getElementById('galleryPrev').addEventListener('click', () => gallery.scrollBy({left:gallery.clientWidth * .8, behavior:motion()}));
const viewer = document.getElementById('imageViewer');
document.querySelectorAll('.portfolio-item,.service-card-img,.column-showcase-img,.section-hero-banner').forEach(item => {
  const img = item.querySelector('img');
  if (!img) return;
  item.tabIndex = 0;
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', 'تكبير صورة: ' + img.alt);
  const open = () => {
    document.getElementById('viewerImage').src = img.src;
    document.getElementById('viewerImage').alt = img.alt;
    document.getElementById('viewerCaption').textContent = img.alt;
    viewer.showModal();
    document.body.style.overflow = 'hidden';
  };
  item.addEventListener('click', open);
  item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
});
viewer.querySelector('button').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => { document.body.style.overflow = ''; });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('active')) { setMenu(false); menuButton.focus(); }
  if (e.key !== 'Tab' || !document.getElementById('modalOverlay').classList.contains('active')) return;
  const dialog = document.getElementById('modalContent');
  const items = [...dialog.querySelectorAll('a[href],button,[tabindex="0"]')].filter(el => el.getClientRects().length);
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
