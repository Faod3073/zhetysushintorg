const cartList = document.getElementById('cart-list');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-button');

document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list');
    cartList.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-from-cart')) {
        const productId = e.target.getAttribute('data-id');
        const index = cartData.findIndex((item) => item.id === parseInt(productId));
        if (index !== -1) {
          cartData.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(cartData));
          updateCartUI();
        }
      }
    });
  });
  
let cartData = localStorage.getItem('cart');
if (cartData === null) {
    cartData = [];
} else {
    cartData = JSON.parse(cartData);
}
function updateCartUI() {
    cartList.innerHTML = '';
    cartData.forEach((item) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>Цена: ${item.price} тг.</span>
            <span>Количество: ${item.quantity}</span>
            <button class="remove-from-cart" data-id="${item.id}">Удалить</button>
        `;
        cartList.appendChild(cartItem);
    });
    updateTotalPrice();
}
function updateTotalPrice() {
    let totalPrice = 0;
    cartData.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });
    totalPriceElement.textContent = `Итого: ${totalPrice} тг.`;
}

cartList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart')) {
        const productId = e.target.getAttribute('data-id');
        const index = cartData.findIndex((item) => item.id === parseInt(productId));
        if (index !== -1) {
            cartData.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartData));
            updateCartUI();
        }
    }
});
checkoutButton.addEventListener('click', () => {
    alert('Покупка завершена!');
});
updateCartUI();