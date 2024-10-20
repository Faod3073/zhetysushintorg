const express = require('express');
const sql = require('mssql');
const fs = require('fs');
const path = require('path');

const app = express();

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

async function getProducts() {
    try {
        // Connect to your database
        let pool = await sql.connect(dbConfig);
        
        // Read the SQL file
        const sqlQuery = fs.readFileSync(path.join(__dirname, 'Table1.sql'), 'utf8');
        
        // Execute the query
        let result = await pool.request().query(sqlQuery);
        
        // Close the connection
        await sql.close();

        return result.recordset;
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
}

// API endpoint to get products
app.get('/api/products', async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// API endpoint to get a single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const products = await getProducts();
        const product = products.find(p => p.id == req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Function for searching products
function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        product.style.display = productName.includes(input) ? 'block' : 'none';
    });
}

// Function to add product to cart
function addToCart(productId) {
    // Fetch the product data from the server
    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            if (!product) {
                console.error('Product not found');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id == productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(`Product ${productId} added to cart`);
            alert('Товар добавлен в корзину');
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
            alert('Ошибка при добавлении товара в корзину');
        });
}

// Function to fetch products from the server
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to display products on the page
function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    if (!productsContainer) {
        console.error('Products container not found');
        return;
    }
    productsContainer.innerHTML = ''; // Clear any existing content

    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products found</p>';
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.setAttribute('data-name', product.name);
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Цена: ${product.price} тг</p>
            <p> Описание: ${product.description}</p>
        `;
        productsContainer.appendChild(productDiv);
    });
}

// Fetch and display products on page load
fetchProducts().then(displayProducts);