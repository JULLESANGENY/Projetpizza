let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
}

function removeFromCart(name) {
  cart = cart
    .map(item => {
      if (item.name === name && item.qty > 1) {
        return { ...item, qty: item.qty - 1 };
      } else if (item.name === name && item.qty === 1) {
        return null;
      }
      return item;
    })
    .filter(item => item !== null);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('cart-total');

  if (!cartItems || !totalDisplay) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} x${item.qty} - ${(item.price * item.qty).toFixed(2)}€ 
      <button class="remove-btn" onclick="removeFromCart('${item.name}')">Retirer</button>`;
    cartItems.appendChild(li);
  });

  totalDisplay.textContent = `${total.toFixed(2)}€`;
}

function validerCommande() {
  sessionStorage.setItem('panier', JSON.stringify(cart));
  window.location.href = 'recapitulatif.html';
}
