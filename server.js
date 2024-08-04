const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the root directory
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

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
app.get('/digital-wallet', (req, res) => {
    res.sendFile(path.join(__dirname, 'digital-wallet.html'));
});

// Serve solutions page
app.get('/solutions', (req, res) => {
    res.sendFile(path.join(__dirname, 'solutions.html'));
});

// Serve pricing page
app.get('/pricing', (req, res) => {
    res.sendFile(path.join(__dirname, 'pricing.html'));
});

// Serve logout page
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/');
        }
        res.sendFile(path.join(__dirname, 'logout.html'));
    });
});

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Validate user (replace with actual validation logic)
    if (users[email] && users[email].password === password) {
        req.session.loggedIn = true;
        req.session.user = users[email];
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
        users[email] = { firstName, lastName, username, password };
        req.session.loggedIn = true;
        req.session.user = users[email];
        res.redirect('/?signedUp=true');
    } else {
        res.redirect('/signup');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
