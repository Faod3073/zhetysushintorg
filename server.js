const express = require('express');
const sql = require('mssql');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files from 'public' directory
app.use(express.static('public'));

// Database connection configuration
const dbConfig = {
    user: '',  // fill in your database username
    password: '',  // fill in your database password
    server: 'localhost',
    database: 'master',
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
    }
};

async function getProducts() {
    try {
        // Connect to your database
        let pool = await sql.connect(dbConfig);
        
        // Read the SQL file
        const sqlQuery = fs.readFileSync(path.join(__dirname, 'shiny.sql'), 'utf8');
        
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
        console.error('Error fetching products:', error);
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
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Error fetching product' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));