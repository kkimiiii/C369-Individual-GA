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

// Serve pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});
app.get('/digital-wallet', (req, res) => {
    res.sendFile(path.join(__dirname, 'digital-wallet.html'));
});
app.get('/solutions', (req, res) => {
    res.sendFile(path.join(__dirname, 'solutions.html'));
});
app.get('/pricing', (req, res) => {
    res.sendFile(path.join(__dirname, 'pricing.html'));
});

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (users[email] && users[email].password === password) {
        req.session.loggedIn = true;
        req.session.user = users[email];
        res.redirect('/?loggedIn=true');
    } else {
        res.redirect('/login?error=invalid');
    }
});

// Handle signup
app.post('/signup', (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    if (!users[email]) {
        users[email] = { firstName, lastName, username, password };
        req.session.loggedIn = true;
        req.session.user = users[email];
        res.redirect('/?signedUp=true');
    } else {
        res.redirect('/signup?error=email_exists');
    }
});

// Handle logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/');
        }
        res.redirect('/logout.html'); // Redirect to logout.html
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
