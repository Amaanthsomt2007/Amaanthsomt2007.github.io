document.addEventListener('DOMContentLoaded', () => {
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  
  //Guard: exit if we're not on cart page
  if (!cartItemsEl || !cartTotalEl) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    cartItemsEl.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalEl.innerText = '$0';
      return;
    }

    cart.forEach((item, index) => {
      const price = parseFloat(item.price.replace('$', ''));
      total += price * item.quantity;

      const div = document.createElement('div');
      div.className = 'cart-item';

      div.innerHTML = `
        <img src="${item.image}">
        <div class="cart-info">
          <h4>${item.title}</h4>
          <p>Price: ${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <div class="cart-actions">
          <button onclick="increaseQty(${index})">+</button>
          <button onclick="decreaseQty(${index})">−</button>
          <button onclick="removeItem(${index})">🗑</button>
        </div>
      `;

      cartItemsEl.appendChild(div);
    });

    cartTotalEl.innerText = `$${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  window.increaseQty = index => {
    cart[index].quantity += 1;
    renderCart();
  };

  window.decreaseQty = index => {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    }
    renderCart();
  };

  window.removeItem = index => {
    cart.splice(index, 1);
    renderCart();
  };

  renderCart();
});