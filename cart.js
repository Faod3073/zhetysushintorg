const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Database connection configuration
const dbConfig = {
    user: '',  // leave empty for Windows Authentication
    password: '',  // leave empty for Windows Authentication
    server: 'localhost',
    database: 'master',
    options: {
        trustServerCertificate: true,  
    }
};

// Connect to the database
sql.connect(config).then(pool => {
    console.log('Connected to MSSQL');

    // Set up a route to retrieve cart data
    app.get('/cart', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM cart');
            res.json(result.recordset);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error getting cart data' });
        }
    });

    // Set up a route to remove a product from the cart
    app.delete('/cart/:productId', async (req, res) => {
        const productId = req.params.productId;
        try {
            await pool.request()
                .input('productId', sql.Int, productId)
                .query('DELETE FROM cart WHERE id = @productId');
            res.json({ message: 'Product removed from cart' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error removing product from cart' });
        }
    });

    // Set up a route to checkout the cart
    app.post('/checkout', async (req, res) => {
        try {
            await pool.request().query('DELETE FROM cart');
            res.json({ message: 'Cart checked out successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error checking out cart' });
        }
    });
});

let cartData = [];

document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');

    // Load the cart data from the server
    fetch('/cart')
        .then(response => response.json())
        .then(data => {
            cartData = data;
            updateCartUI();
        })
        .catch(error => console.error(error));

    cartList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const productId = e.target.getAttribute('data-id');
            // Send a DELETE request to the server to remove the product from the cart
            fetch(`/cart/${productId}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    cartData = data;
                    updateCartUI();
                })
                .catch(error => console.error(error));
        }
    });

    checkoutButton.addEventListener('click', () => {
        // Send a POST request to the server to checkout the cart
        fetch('/checkout', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                alert('Покупка завершена!');
                cartData = [];
                updateCartUI();
            })
            .catch(error => console.error(error));
    });
});

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
updateCartUI()
.catch(err => {
    console.error(err);
    console.log('Error connecting to MSSQL');
});