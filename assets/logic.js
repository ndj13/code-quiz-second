var startBtn = document.getElementById("startGame");
var startDiv = document.getElementById("start");
var gameDiv = document.getElementById("game");
var quesPosition = document.getElementById("quesPosition");
var finalStats = document.getElementById("final");
var playAgainBtn = document.getElementById("pa");

var currentQuestion;
var currentQuestionIndex = 0;
var correctAnswers;
var numOfQuestions = questions.length;
var counter;

startBtn.addEventListener("click", function (e) {
    e.preventDefault();
    beginGame();
});

var sec = 60;
function startTimer(){
    console.log('timer suppose to go')
    var timer = setInterval(function(){
        counter--;
        document.getElementById('timerDisplay').innerHTML='00:'+counter;
        if (counter < 0) {
            clearInterval(timer);
            alert("Time is up!")
        }
    }, 1000);
}
// document.getElementById('incorrect').addEventListener('click', function() {
//     sec -= 5;
//     document.getElementById('timerDisplay').innerHTML='00:'+sec;
// });

function beginGame() {
    startDiv.style.display = "none";
    gameDiv.style.display = "block";
    quesPosition.style.display = "block";
    finalStats.style.display = "none";
    playAgainBtn.style.display = "none";
    counter = 60;
    startTimer();
    correctAnswers = 0;
    displayQuestion();
}

function emptyDiv() {
    gameDiv.innerHTML ="";
}

function displayQuestion() {
    emptyDiv();
    currentQuestion = questions[currentQuestionIndex];
    var pos = currentQuestionIndex + 1;
    quesPosition.textContent = "Question: " + pos + "/" + numOfQuestions;
    var question = document.createElement("h2");
    question.textContent = currentQuestion.ques;
    gameDiv.appendChild(question);
    displayQuestionChoices();
}

function displayQuestionChoices() {
    for (let i = 0; i <currentQuestion.choices.length; i++) {
        var choice = document.createElement("h4");
        choice.setAttribute("class", "choiceBG");
        choice.setAttribute("data-value", currentQuestion.choices[i]);
        choice.textContent = currentQuestion.choices[i];
        gameDiv.appendChild(choice);
    }
}

gameDiv.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.matches("h4")) {
        var chosenAnswer = e.target.getAttribute("data-value");
        compareAnswers(chosenAnswer);
    }
});

function compareAnswers(chosenAnswer) {
    if (chosenAnswer === currentQuestion.answer) {
        correctAnswers++;
        currentQuestionIndex++;
        playOrEnd();
    } else {
        currentQuestionIndex++;
        counter-= 5;
        console.log(counter)
        playOrEnd();
    }
}

function playOrEnd() {
    if (currentQuestionIndex === numOfQuestions) {
        showStats();
    } else {
        displayQuestion();
    }
}

function showStats() {
    gameDiv.style.display = "none";
    quesPosition.style.display = "none";
    finalStats.style.display = "block";
    playAgainBtn.style.display = "block";
    finalStats.innerHTML = "";
    var h2 = document.createElement(h2);
    h2.textContent = "You Got " + correctAnswers + " out of " + numOfQuestions;
    finalStats.appendChild(h2);
}

playAgainBtn.addEventListener("click", function (e) {
    e.preventDefault();
    currentQuestionIndex = 0;
    beginGame();
});


