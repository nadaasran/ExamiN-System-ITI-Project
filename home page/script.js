document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#sign');

    loginButton.addEventListener('click', function() {
        window.location.href = '../login/login.html';
    });

    signupButton.addEventListener('click', function() {
        window.location.href = '../signin/signin.html';
    });
});