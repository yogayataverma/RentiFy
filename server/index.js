const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'rentify'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('MySQL connected...');
});

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/data/login', (req, res) => {
    const sql = 'SELECT * FROM login';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

app.post('/api/data', (req, res) => {
    const { firstName, lastName, email, phone, password, role } = req.body;
    const sql = 'INSERT INTO login (firstname, lastname, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, email, phone, password, role], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Data inserted successfully', id: results.insertId });
    });
});

app.post('/api/data/login1', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM login WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.json({ message: 'Login successful', user: results[0] });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

app.post('/api/property', (req, res) => {
    const { name, description, beds, baths, placesNearby, location, sellerId } = req.body;
    const sql = 'INSERT INTO property (name, desci, beds, baths, places, location, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, description, beds, baths, placesNearby, location, sellerId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Data inserted successfully', id: results.insertId });
    });
});

app.get('/api/properties', (req, res) => {
    const sql = 'SELECT * FROM property';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

app.get('/api/sellers/:propertyId', (req, res) => {
    const { propertyId } = req.params;
    const sql = 'SELECT * FROM login WHERE id = ?'; // Assuming you have a table 'seller' with 'property_id'
    db.query(sql, [propertyId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        
        if (results.length > 0) {
            res.json(results[0]); // Assuming there is only one seller per property
        } else {
            res.status(404).json({ error: 'Seller details not found' });
        }
    });
});

// Example backend route to handle DELETE request
app.delete('/api/properties/:id', async (req, res) => {
    try {
        const propertyId = req.params.id;
        // Logic to delete property from database
        await Property.deleteOne({ _id: propertyId }); // Example using MongoDB with Mongoose

        res.status(204).send(); // Send a success response with no content
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ error: 'Error deleting property' });
    }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
