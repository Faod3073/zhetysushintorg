const productsData = [
    { id: 1, name: "H818", price: 19300, quantity: 4, img:"C:\Users\User\Downloads\Рисунок1.png"},
    { id: 2, name: "I-1", price: 45200, quantity: 4, img:"C:\Users\User\Downloads\Рисунок2.png" },
];
const productsContainer = document.querySelector('.products-container');
console.log('productsContainer:', productsContainer);

productsContainer.addEventListener('click', (event) => {
    // ...
});
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products-container');
    productsContainer.addEventListener('click', (event) => {
      // ...
    });
  });
productsData.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-item';
    productCard.dataset.name = product.name;

    const productCardContent = `
        <img src="${product.name}.png" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Цена: ${product.price} тг.</p>
        <p>Количество: ${product.quantity}</p>
        <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
    `;

    productCard.innerHTML = productCardContent;
    productsContainer.appendChild(productCard);
});

productsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = event.target.getAttribute('data-id');
        const product = productsData.find((product) => product.id === parseInt(productId));

        if (product) {
            addProductToCart(product);
            window.location.href = 'cart.html'; 
        }
    }
});

function addProductToCart(product) {
    let cartData = localStorage.getItem('cart');

    if (cartData === null) {
        cartData = []; 
    } else {
        cartData = JSON.parse(cartData); 
    }

    const existingProductIndex = cartData.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
        cartData[existingProductIndex].quantity++;
    } else {
        cartData.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartData)); 
}

// Функция для поиска продуктов
document.getElementById('searchInput').addEventListener('input', searchProducts);

function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(input)) {
            product.style.display = 'block'; 
         } else {
            product.style.display = 'none';  
        }
    });
};
