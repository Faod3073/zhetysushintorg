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
