document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form submission to allow validation

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg=document.getElementsByClassName('errorMsg');

    // Validate input
    // if (!email || !password) {
    //     errorMsg[0].innerHTML="Both fields are required.";
    //     return;
    // }else{
    //     errorMsg[0].innerHTML="";
    // }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        window.location.href = '../user home/userhome.html';
        localStorage.setItem('email', email);
        localStorage.setItem('userName', firstName);
    } else {
        errorMsg[0].innerHTML="Invalid email or password.";
    }

});
