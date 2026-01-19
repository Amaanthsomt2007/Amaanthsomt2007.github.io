document.addEventListener('DOMContentLoaded', () => {
  const summaryItems = document.getElementById('summaryItems');
  const summaryTotal = document.getElementById('summaryTotal');
  const placeOrderBtn = document.getElementById('placeOrderBtn');

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    summaryItems.innerHTML = '<p>Your cart is empty.</p>';
    placeOrderBtn.disabled = true;
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const price = parseFloat(item.price.replace('$', ''));
    total += price * item.quantity;

    const div = document.createElement('div');
    div.innerHTML = `${item.title} × ${item.quantity}`;
    summaryItems.appendChild(div);
  });

  summaryTotal.innerText = `$${total.toFixed(2)}`;

  placeOrderBtn.addEventListener('click', () => {
    alert('✅ Order placed successfully! (Fake checkout)');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  });
});