document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the email from localStorage (it was saved during login)
    const currentUserEmail = localStorage.getItem('email');

    if (!currentUserEmail) {
        console.error('No email found in localStorage');
        return;
    }

    // Retrieve the users array from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user based on the stored email
    const currentUser = users.find(user => user.email === currentUserEmail);

    if (currentUser) {
        // Retrieve the first name from localStorage (it was saved during login)
        const firstName = localStorage.getItem('userName');

        // Display the user's first name in the welcome section
        document.getElementById('profile').textContent = `Hi, ${firstName}!`;
    } else { 
        console.error('User not found');
    }

    var logout= document.getElementById("logout");
    logout.addEventListener("click" , ()=>{
        // localStorage.removeItem("email");
        // localStorage.removeItem("firstName");

        // const updatedUsers = users.filter(user => user.email !== currentUserEmail);
        // // console.log(updatedUsers);
        
        // // local storage مبيعرفش يخزن الداتا الا علي شكل string
        // localStorage.setItem('users', JSON.stringify(updatedUsers));

        window.location.href= '../home page/home.html'
    })
});

document.querySelector("#btn").addEventListener("click", function () {
    // Reset exam data to start fresh
    localStorage.removeItem("examCompleted");
    localStorage.removeItem("quizResult");
    localStorage.removeItem("selectedAnswers");
  
    // Redirect to the exam page
    // window.location.href = "../exam/exam.html";
  });
