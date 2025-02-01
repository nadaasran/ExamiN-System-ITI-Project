document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorMsg = document.getElementsByClassName('errorMsg');

        let hasError = false;
        // Validate first name
        
        if (!/^[a-zA-Z]+$/.test(firstName)) {
            errorMsg[0].innerHTML = 'First Name should contain only alphabetical characters.';
            hasError = true;
        } else {
            errorMsg[0].innerHTML = '';
        }

        // Validate last name
        if (!/^[a-zA-Z]+$/.test(lastName)) {
            errorMsg[1].innerHTML = 'Last Name should contain only alphabetical characters.';
            hasError = true;
        } else {
            errorMsg[1].innerHTML = '';
        }

        // Validate email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMsg[2].innerHTML = 'Please enter a valid email address.';
            hasError = true;
        } else {
            errorMsg[2].innerHTML = '';
        }

        // Validate password length
        if (password.length < 8) {
            errorMsg[3].innerHTML = 'Password should be at least 8 characters long.';
            hasError = true;
        } else {
            errorMsg[3].innerHTML = '';
        }

        // Validate password match
        if (password !== confirmPassword) {
            errorMsg[4].innerHTML = 'Passwords do not match.';
            hasError = true;
        } else {
            errorMsg[4].innerHTML = '';
        }

        // If there are errors, do not proceed
        if (hasError) {
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            errorMsg[5].innerHTML='You already have an account.';
            return;
        }else{
            errorMsg[5].innerHTML='';
        }

        // Save user to localStorage
        users.push({ firstName, lastName, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('email', email);
        localStorage.setItem('userName', firstName);
        localStorage.setItem('lastName', lastName);

        // Redirect to login page
        window.location.href = '../login/login.html';
    });
});

