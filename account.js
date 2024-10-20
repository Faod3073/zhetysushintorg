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

    // Set up a route to retrieve account information
    app.get('/account', async (req, res) => {
        const user_id = req.query.user_id;
        try {
            const result = await pool.request()
                .input('userId', sql.Int, user_i )
                .query('SELECT * FROM users WHERE id = @userId');
            res.json(result.recordset);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error getting account information' });
        }
    });

    // Start the server
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}).catch(err => {
    console.error(err);
    console.log('Error connecting to MSSQL');
});

document.addEventListener('DOMContentLoaded', () => {
    const accountInfoElement = document.getElementById('account-info');

    // Send a GET request to the server to retrieve account information
    fetch('/account', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const accountInfo = `
            <p>Имя: ${data.username}</p>
            <p>Email: ${data.email}</p>
        `;
        accountInfoElement.innerHTML = accountInfo;
    })
    .catch(error => console.error(error));
}).catch(err => {
    console.error(err);
    console.log('Error connecting to MSSQL');
});