// Get the user's score from localStorage
const quizResult = parseInt(localStorage.getItem("quizResult")) || 0;
// const totalMarks= localStorage.getItem("totalMarks" , totalMarks);
const firstName = localStorage.getItem('userName');
const lastName= localStorage.getItem("lastName");

// Update the score display
document.getElementById("name").innerText = firstName + " " + lastName;
document.getElementById("final-score").innerText = `${quizResult}` ;

// Check if the score is less than 9 and display the appropriate image
if (quizResult < 10) {
  const img = document.getElementById("img");
  img.src = "Feeling sorry.gif";
}

if (quizResult >= 10 ) {
    const img = document.getElementById("img");
    img.src = "Ok.gif";
  }



  
