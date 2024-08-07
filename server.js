//I declare that this code was written by me.
//I will not coppy or allow others to copy my work.
//I understand that copying code is considered as plagirsm.

//Student Name: Hanan Hakimi
//Student ID: 23015073
//class: C369-3D-W66N-A-GA
//Date/Time last modified: 2021/08/20 11:00
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Simulated user database (replace with your database logic)
const users = {};
let transactions = [];

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Serve digital wallet page
app.get('/digitalwallet', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, 'digitalwallet.html'));
    } else {
        res.redirect('/login');
    }
});

// Serve balance for digital wallet
app.get('/balance', (req, res) => {
    if (req.session.loggedIn) {
        res.json({ balance: req.session.user.balance });
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
});

// Serve solutions page
app.get('/solutions', (req, res) => {
    res.sendFile(path.join(__dirname, 'solutions.html'));
});

// Serve pricing page
app.get('/pricing', (req, res) => {
    res.sendFile(path.join(__dirname, 'pricing.html'));
});

// Serve confirmation page
app.get('/confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, 'confirmation.html'));
});

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Validate user (replace with actual validation logic)
    if (users[email] && users[email].password === password) {
        req.session.loggedIn = true;
        req.session.user = users[email];
        req.session.user.balance = req.session.user.balance || 0; // Initialize balance if not set
        res.redirect('/?loggedIn=true');
    } else {
        res.redirect('/login');
    }
});

// Handle signup
app.post('/signup', (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    // Check if user already exists (replace with actual validation logic)
    if (!users[email]) {
        users[email] = { firstName, lastName, username, password, balance: 0 };
        req.session.loggedIn = true;
        req.session.user = users[email];
        res.redirect('/?signedUp=true');
    } else {
        res.redirect('/signup');
    }
});

// Handle digital wallet form submission
app.post('/digitalwallet', (req, res) => {
    const { amount, paymentMethod } = req.body;
    if (req.session.loggedIn) {
        const user = req.session.user;
        user.balance += parseFloat(amount);
        transactions.push({
            date: new Date().toISOString().split('T')[0],
            amount: parseFloat(amount),
            paymentMethod
        });
        res.redirect('/digitalwallet');
    } else {
        res.redirect('/login');
    }
});

// Handle buy request
app.post('/buy', (req, res) => {
    const { amount } = req.body;
    if (req.session.loggedIn) {
        const user = req.session.user;
        if (user.balance >= amount) {
            user.balance -= amount;
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } else {
        res.status(401).json({ success: false, message: 'Not logged in' });
    }
});

// Handle logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/');
        }
        res.redirect('/logout.html');
    });
});

// Serve logout page
app.get('/logout.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'logout.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
