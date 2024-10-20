const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Connect to the database
const db = new sqlite3.Database('./database.db');

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Set up a route to retrieve product data
app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error retrieving products' });
        } else {
            res.json(rows);
        }
    });
});

// Set up a route to create a new user account
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  db.get(`SELECT * FROM users WHERE email = ?`, email, (err, row) => {
      if (err) {
          console.error(err);
          res.status(500).send({ message: 'Error registering user' });
      } else if (row) {
          res.status(400).send({ message: 'User  already exists' });
      } else {
          // Insert the new user into the database
          db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, username, email, password, (err) => {
              if (err) {
                  console.error(err);
                  res.status(500).send({ message: 'Error registering user' });
              } else {
                  res.send({ message: 'User  registered successfully' });
              }
          });
      }
  });
});

// Set up a route to update the cart
app.get('/cart', (req, res) => {
  db.all('SELECT * FROM cart', (err, rows) => {
      if (err) {
          console.error(err);
          res.status(500).send({ message: 'Error getting cart data' });
      } else {
          res.json(rows);
      }
  });
});

// Set up a route to remove a product from the cart
app.delete('/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  db.run(`DELETE FROM cart WHERE id = ?`, productId, (err) => {
      if (err) {
          console.error(err);
          res.status(500).send({ message: 'Error removing product from cart' });
      } else {
          res.json({ message: 'Product removed from cart' });
      }
  });
});

// Set up a route to checkout the cart
app.post('/checkout', (req, res) => {
  db.run(`DELETE FROM cart`, (err) => {
      if (err) {
          console.error(err);
          res.status(500).send({ message: 'Error checking out cart' });
      } else {
          res.json({ message: 'Cart checked out successfully' });
      }
  });
});

// Set up a route to retrieve account information
app.get('/account', (req, res) => {
  const user_id = req.query.user_id;
  const query = `SELECT * FROM users WHERE id = ?`;
  db.get(query, user_id, (err, row) => {
      if (err) {
          console.error(err);
          res.status(500).send({ message: 'Error retrieving account information' });
      } else {
          res.json(row);
      }
  });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});