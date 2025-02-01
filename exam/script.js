var questionContainer = document.getElementById("question-container");
var countSpan = document.querySelector(".count");
var numberSpan = document.querySelector(".number");
var flagHtmlText = document.querySelector("#flag");
let questionsArr;
let flagsArr = [];
var selectedQuestionIndex = 0;
var flagContainer = document.getElementById("flags-container");

var loadingMessage = document.createElement("p");
loadingMessage.innerText = "Loading questions...";
questionContainer.appendChild(loadingMessage);

class Question {
  constructor(id, title, answers, right_answer) {
    this.id = id;
    this.title = title;
    this.answers = answers;
    this.right_answer = right_answer;
  }
}


function getQuestions() {
  var myRequest = new XMLHttpRequest();
  myRequest.open("GET", "qa.json", true);
  myRequest.send();
  myRequest.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        try {
          let data = JSON.parse(this.responseText);
          questionsArr = data.map(q => new Question(q.id, q.title, q.answers, q.right_answer));
          shuffleQuestions();
          console.log(questionsArr);
          showQuestion(questionsArr[0]);
          countSpan.innerHTML = "Questions: " + questionsArr.length;
        } catch (error) {
          showError("Failed to parse question data");
        }
      } else {
        showError("Failed to load questions");
      }
    }
  };
}

function showError(message) {
  loadingMessage.innerText = message;
  loadingMessage.style.color = "red";
}

function shuffleQuestions() {
  for (let i = questionsArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questionsArr[i], questionsArr[j]] = [questionsArr[j], questionsArr[i]];
  }
}


getQuestions();

function showQuestion(question) {
  numberSpan.innerHTML = `Question Number: ${selectedQuestionIndex + 1}`;

  let answersHTML = "";
  for (let index = 0; index < question.answers.length; index++) {
    const isChecked =
      selectedAnswers[question.id] === question.answers[index] ? "checked" : ""; // Check if this answer is already selected
    answersHTML += `
           <div class="answer">
        <input type="radio" name="question-${question.id}" onchange="answerQuestion('${question.id}'
        ,this.value)" id="answer-${question.id}-${index}" value="${question.answers[index]}" ${isChecked}>
        <label for="answer-${question.id}-${index}">${question.answers[index]}</label>
      </div>
        `;
  }

  questionContainer.innerHTML = `   
        <div class="quiz-area">
            <h2 style="margin-top:20px;">${question.title}</h2>
        </div>
        <div class="answers-area">
            ${answersHTML}
        </div>
    `;

  checkIfAddedToFlag(question);
}


let correctAnswers = 0;
let answeredQuestionsIds = [];

function answerQuestion(quesId, selectedAnswer) {
  console.log(selectedAnswer);
  console.log(quesId);

  // Save the selected answer in the selectedAnswers object
  selectedAnswers[quesId] = selectedAnswer;

  let isQuestionAlreadyAnswered = answeredQuestionsIds.find((el) => el == quesId);
  if (isQuestionAlreadyAnswered) {
    correctAnswers = correctAnswers - 1;
    answeredQuestionsIds = answeredQuestionsIds.filter((el) => el != quesId);
  }

  let selectedQues = questionsArr.find((ques) => ques.id == quesId);
  if (selectedQues.right_answer === selectedAnswer) {
    answeredQuestionsIds.push(quesId);
    correctAnswers = correctAnswers + 1;
  }
}


function goToNextQues() {
  if (selectedQuestionIndex < questionsArr.length - 1) {
    selectedQuestionIndex++;
    showQuestion(questionsArr[selectedQuestionIndex]);
  }
}

function goToPreviousQues() {
  if (selectedQuestionIndex > 0) {
    selectedQuestionIndex--;
    showQuestion(questionsArr[selectedQuestionIndex]);
  }
}

function toggleFlag(e) {
  const question = questionsArr[selectedQuestionIndex];
  const index = flagsArr.findIndex((el) => el.id === question.id);

  if (index !== -1) {
    flagsArr.splice(index, 1);
    e.innerHTML = `<i class="fa-solid fa-flag"></i>`;
  } else {
    flagsArr.push({ questionNumber: selectedQuestionIndex, ...question });
    e.innerHTML = `<i class="fa-solid fa-flag" style="color: black;"></i>`;
  }

  updateFlaggedQuestionsUI();
}

function updateFlaggedQuestionsUI() {
  flagContainer.innerHTML = "";
  if (flagsArr.length === 0) {
    flagContainer.innerHTML = `<p style="text-align:center; font-size:small; margin-top:6px; margin-left:-5px">No flagged questions</p>`;
    return;
  }

  flagsArr.forEach((flaggedQuestion, index) => {
    let flagItem = document.createElement("div");
    // flagItem.classList.add("flagged-question");
    flagItem.innerHTML = `
            <h4 style="margin-top:10px; margin-left:5px; display: inline-block;"> Question ${flaggedQuestion.questionNumber + 1}</h4>
            <button onclick="removeFlag(${flaggedQuestion.id})" style=" color:#9a0052; border-radius: 5px; cursor: pointer; border:none;
            width: 30px; height: 20px;float:right ; margin-top:7px"><i class="fa-solid fa-trash"></i></button>`;
    flagContainer.appendChild(flagItem);
  });
}

function removeFlag(questionId) {
  flagsArr = flagsArr.filter((question) => question.id !== questionId);
  updateFlaggedQuestionsUI();
  checkIfAddedToFlag(questionsArr[selectedQuestionIndex]);
}

function checkIfAddedToFlag(question) {
  const isFlagged = flagsArr.some((el) => el.id === question.id);
  flagHtmlText.innerHTML = isFlagged ? `<i class="fa-solid fa-flag" style="color: black;"></i>` : `<i class="fa-solid fa-flag"></i>`;
}
function unflagAll() {
  flagsArr = [];
  updateFlaggedQuestionsUI();
  checkIfAddedToFlag(questionsArr[selectedQuestionIndex]);
}

var totalTime = 20 * 60;
var timerDisplay = document.querySelector(".countdown");
// var timeoutRedirectURL = "../timeout/timeout.html";

function startTimer() {
  var timerInterval = setInterval(function () {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60; 
    timerDisplay.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} <i class="fa-regular fa-clock"></i>`;
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }

    totalTime--;
  }, 1000);
}
function handleTimeout() {
  localStorage.setItem("quizResult", "0");
  window.location.href = "../timeout/timeout.html";
}
startTimer();

var totalMarks = 20;
var marksPerQuestion = 1;
var userScore = 0;
var selectedAnswers = {};


function submitExam() {
  localStorage.setItem("quizResult", correctAnswers);
  // Mark the exam as completed
  localStorage.setItem("examCompleted", "true");
  window.location.href = "../result/result.html";
}
document.querySelector(".submit-button").addEventListener("click", submitExam);

if (localStorage.getItem("examCompleted") === "true") {
  window.location.href = "../user home/userhome.html"; // Redirect to home page
}

