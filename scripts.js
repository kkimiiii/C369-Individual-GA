document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const loggedIn = urlParams.get('loggedIn') === 'true';
    const signedUp = urlParams.get('signedUp') === 'true';
    const loggedOut = urlParams.get('loggedOut') === 'true'; // Handle logout
    const authButton = document.getElementById('auth-button');

    if (loggedIn || signedUp) {
        alert(loggedIn ? 'Logged in!' : 'Signed up successfully!');
        authButton.textContent = 'Log Out';
        authButton.onclick = function() {
            window.location.href = '/logout';
        };
    } else if (loggedOut) {
        alert('Successfully logged out!');
        authButton.textContent = 'Sign Up';
        authButton.onclick = function() {
            window.location.href = '/signup';
        };
    } else {
        authButton.textContent = 'Sign Up';
        authButton.onclick = function() {
            window.location.href = '/signup';
        };
    }
});
