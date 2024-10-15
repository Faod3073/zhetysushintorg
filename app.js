const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'zhetysushintorg'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Create user
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const query = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send('User registered!');
  });
});

// Get products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add order
app.post('/order', (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const query = `INSERT INTO orders (user_id, product_id, quantity, status) VALUES (${user_id}, ${product_id}, ${quantity}, 'pending')`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send('Order placed!');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
