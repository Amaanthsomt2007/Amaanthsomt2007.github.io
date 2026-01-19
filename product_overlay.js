document.addEventListener('DOMContentLoaded', () => {

  const links = document.querySelectorAll('.product-link');
  const modal = document.getElementById('productModal');

  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const closeBtn = document.getElementById('closeModal');
  const addToCartBtn = document.getElementById('addToCart');

  links.forEach(link => {
    link.addEventListener('click', e => {

      // 📱 Touch devices → normal navigation
     // 📱 Small screens → normal navigation
if (window.innerWidth < 1024) {
  return; // let <a href="bag_description.html"> work
} 
  
      // 💻 Desktop → modal
      e.preventDefault();

      const card = link.querySelector('.product-card');

      modalImg.src = card.querySelector('img').src;
      modalTitle.innerText = card.querySelector('h3').innerText;
      modalPrice.innerText = card.querySelector('p').innerText;

      modal.classList.add('active');
    });
  });

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  const badge = document.getElementById('cart-count');
  if (badge) badge.innerText = totalQty;
}

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  addToCartBtn?.addEventListener('click', () => {
    e.preventDefault();
   e.stopPropagation(); // 👈 THIS is the missing piece
   e.stopImmediatePropagation(); // 👈 very important
   
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({
      title: modalTitle.innerText,
      price: modalPrice.innerText,
      image: modalImg.src,
      quantity: 1
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    modal.classList.remove('active');
    setTimeout(() => {
    window.location.assign('cart.html');
  }, 0);
    /* window.location.href = 'cart.html'; */
  });

});
