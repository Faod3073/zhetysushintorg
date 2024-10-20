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

    // Set up a route to create a new user account
    app.post('/register', async (req, res) => {
        const { username, email, password } = req.body;

        try {
            // Check if the user already exists
            const userCheck = await pool.request()
                .input('email', sql.NVarChar, email)
                .query('SELECT * FROM users WHERE email = @email');

            if (userCheck.recordset.length > 0) {
                res.status(400).send({ message: 'User already exists' });
            } else {
                // Insert the new user into the database
                await pool.request()
                    .input('username', sql.NVarChar, username)
                    .input('email', sql.NVarChar, email)
                    .input('password', sql.NVarChar, password)
                    .query('INSERT INTO users (username, email, password) VALUES (@username, @email, @password)');

                res.send({ message: 'User registered successfully' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error registering user' });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const formResponse = document.getElementById('formResponse');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (username && email && password) {
            // Send a POST request to the server to register the user
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, email: email, password: password })
            })
            .then(response => response.json())
            .then(data => {
                formResponse.textContent = `Регистрация прошла успешно, ${username}!`;
                registerForm.reset();
            })
            .catch(error => {
                console.error(error);
                formResponse.textContent = 'Произошла ошибка при регистрации. Попробуйте еще раз.';
            });
        } else {
            formResponse.textContent = 'Заполните все поля.';
        }
    });
}).catch(err => {
    console.error(err);
    console.log('Error connecting to MSSQL');
});