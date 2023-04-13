var gameStart = document.getElementById("start");
var timerEl = document.getElementById("time");
var viewScores = document.getElementById("view-highscore");
var questionHolder = document.querySelector("#quiz-container");
var onScreenQuestion = 0;
var currentScore = 0;
var countDown = 60;
var timeLeft;
var userInitials; 

var questions = [{
    quest: "Javascript is an _______ language?",
    answerChoices:["Object-Based", "Object-Oriented", "Procedural", "None Of The Above"],
    correct: "Object-Oriented"
},
{
    quest: "Commonly used data types DO NOT include:",
    answerChoices:["Strings", "Numbers", "Boolean", "Alerts"],
    correct: "Alerts"
},
{
    quest: "What is the correct syntax for referring to an external script called 'script.js'?",
    answerChoices:["<a>scr='script.js<a>'", "<link src = 'script.js'>", "<script src='code.js'>", "<script scr='code.js'>"],
    correct: "<script src='code.js'>",
},
{
    quest: "Which of the following methods is used to access HTML elements using Javascript?",
    answerChoices:["getElementbyId()", "getElementsbyClassName()", "Just A", "Both A & B"],
    correct: "Both A & B"
},
{
    quest: "String values must be encosed within ____ when being assigned to variables.",
    answerChoices:["Curly Brackets", "Parentheses", "Square Brackets", "Quotation Marks"],
    correct: "Quotation Marks",
},
{
    quest: "When an operator’s value is NULL, the typeof returned by the unary operator is:",
    answerChoices:["Boolean", "Undefined", "Object", "Integer"],
    correct: "Object"
},
{
    quest: "Arrays in JavaScript can be used to store ____.",
    answerChoices:["Arrays", "Numbers/Strings", "Booleans", "All Of The Above"],
    correct: "All Of The Above",
},
{
    quest: "How to stop an interval timer in Javascript?",
    answerChoices:["clearInterval", "clearTimer", "intervalOver", "reset"],
    correct: "clearInterval"
},
{
    quest: "The condition in an if/else statement is enclosed with ____.",
    answerChoices:["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    correct: "Parentheses",
},
{ 
    quest: "How do we write a comment in javascript?",
    answerChoices:["/* */", "//", "#", "$$"],
    correct: "//"
},
{
    quest: "Which function is used to serialize an object into a JSON string in Javascript?",
    answerChoices:["Stringify()", "Parse()", "Convert()", "function()"],
    correct: "Stringify()"
},
{
    quest: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answerChoices:["Terminal", "Git-Bash", "Print", "Console.log"],
    correct: "Console.log",
}];

function timer() {
    timerEl.textContent = "Time remaining: " + countDown + "s";
    timeLeft = setInterval(function () {
        if (countDown > 0) {
            adjustTime(-1);
        } else {
            endQuiz();
        }
    }, 1000);
}
function adjustTime(amount) {
    countDown += amount;
    if (countDown < 0) {
        countDown = 0;
    }
    timerEl.textContent = "Time remaining: " + countDown + "s";
}

gameStart.onclick = timer;
var createQuestion = function (question) {
    questionHolder.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.quest;

    var answerA = document.createElement("button");
    answerA.textContent = question.answerChoices[0];
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.answerChoices[1];
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.answerChoices[2];
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.answerChoices[3];
    answerD.addEventListener("click", answerClick);

    questionHolder.appendChild(questionHeader);
    questionHolder.appendChild(answerA);
    questionHolder.appendChild(answerB);
    questionHolder.appendChild(answerC);
    questionHolder.appendChild(answerD);
}


var correctAnswer = questions[onScreenQuestion].correct;

var answerClick = function(event) {
    event.preventDefault();
    var UserChoice = event.target.textContent;
    correctAnswer = questions[onScreenQuestion].correct;
    // determine if answer is wrong or right
    var checkAnswer = document.querySelector("#answer-determination");
    if (UserChoice !== correctAnswer) {
        adjustTime(-15);
        checkAnswer.textContent = "Wrong!";
        onScreenQuestion++;
        if (onScreenQuestion >= questions.length) {
            endQuiz();
        } else {createQuestion(questions[onScreenQuestion])};

    }
    else if (UserChoice === correctAnswer) {
        onScreenQuestion++;
        checkAnswer.textContent = "Correct!";
        currentScore++;
        if (onScreenQuestion >= questions.length) {
            endQuiz();
        } else {createQuestion(questions[onScreenQuestion])};
    }
};

var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    createQuestion(questions[onScreenQuestion]);
};

function resetDisplay() {
    questionHolder.innerHTML="";
    document.querySelector("#reset-page").style.display = "none";
}
function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    questionHolder.innerHTML = "";
    questionHolder.innerHTML = name + " " + score;
}
viewScores.addEventListener("click", () => {
    highScores();
})


function endQuiz() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(timeLeft);
    var endScreen = document.createElement("h2");
    questionHolder.appendChild(endScreen);

    let leaderBoard = document.querySelector("#answer-determination");
    leaderBoard.innerHTML = "";

    endScreen.innerHTML = "Your final score is " + currentScore + ". Enter your initials to save your Highscore";

    var initialBox = document.createElement("input");
    leaderBoard.appendChild(initialBox);

    var scoreSubmitBtn = document.createElement("button");
    scoreSubmitBtn.textContent = "Submit";
    leaderBoard.appendChild(scoreSubmitBtn);

    scoreSubmitBtn.addEventListener("click", () => {
        // rest variable
        if (initialBox.value.length === 0) return false;

        let storeuserInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)
        }
        storeuserInitials(initialBox.value, currentScore);
    });
    
    var playAgainBtn = document.createElement("button");
        playAgainBtn.textContent= "Play Again?";
        leaderBoard.appendChild(playAgainBtn);
        playAgainBtn.addEventListener("click", () => {
            location.reload();
        })

    document.querySelector("input").value = "";

    initialBox.addEventListener("submit", endQuiz);
    
};
function renderuserInitials() {
    scoreSubmitBtn.addEventListener('click', function(event) {
        event.preventDefault;
}
)};

gameStart.addEventListener('click', quiz);