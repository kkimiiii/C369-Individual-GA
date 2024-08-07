//I declare that this code was written by me.
//I will not coppy or allow others to copy my work.
//I understand that copying code is considered as plagirsm.

//Student Name: Hanan Hakimi
//Student ID: 23015073
//class: C369-3D-W66N-A-GA
//Date/Time last modified: 2021/08/20 11:00
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const loggedIn = urlParams.get('loggedIn') === 'true';
    const signedUp = urlParams.get('signedUp') === 'true';
    const authButton = document.getElementById('auth-button');

    if (loggedIn || signedUp) {
        alert(loggedIn ? 'Logged in!' : 'Signed up successfully!');
        authButton.textContent = 'Log Out';
        authButton.onclick = function() {
            window.location.href = '/logout';
        };
    } else {
        authButton.textContent = 'Sign Up';
        authButton.onclick = function() {
            window.location.href = '/signup';
        };
    }
});
