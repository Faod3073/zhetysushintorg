const productsData = [
    { id: 1, name: 'H818', price: 19300, quantity: 4, img: 'H818.png' },
    { id: 2, name: 'I-1', price: 45200, quantity: 4, img: 'I-1.png' }
];

// Function to display products on the page
function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Цена: ${product.price} тг</p>
            <p>Количество: ${product.quantity}</p>
            <button>Добавить в корзину</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}
// Call the function to display products when the page loads
displayProducts(productsData);
// Send a GET request to the server to retrieve product data
fetch('/products')
    .then(response => response.json())
    .then(data => {
        // Update the DOM with the product data
        const productList = document.getElementById('product-list');
        data.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price}`;
            productList.appendChild(li);
        });
    })
    .catch(error => console.error(error));

// Add event listener to the "Add to Cart" button
document.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = event.target.getAttribute('data-id');
        const quantity = 1;

        // Send a POST request to the server to add the product to the cart
        fetch('/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: 1, product_id: productId, quantity: quantity })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Product added to cart:', data);
        })
        .catch(error => console.error(error));
    }
});

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
