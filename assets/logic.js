var startBtn = document.getElementById("startGame");
var startDiv = document.getElementById("start");
var gameDiv = document.getElementById("game");
var quesPosition = document.getElementById("quesPosition");
var finalStats = document.getElementById("final");
var playAgainBtn = document.getElementById("pa");

var currentQuestion;
var correctAnswers;
var numOfQuestions = questions.length;
var counter;

startBtn.addEventListener("click", function (e) {
    e.preventDefault();
    beginGame();
});

function beginGame() {
    startDiv.style.display = "none";
    gameDiv.style.display = "block";
    quesPosition.style.display = "block";
    finalStats.style.display = "none";
    playAgainBtn.style.display = "none";
    counter = 0;
    correctAnswers = 0;
    displayQuestion();
}

function emptyDiv() {
    gameDiv.innerHTML ="";
}

function displayQuestion() {
    emptyDiv();
    currentQuestion = questions[counter];
    var pos = counter + 1;
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
        counter++;
        playOrEnd();
    } else {
        counter++;
        playOrEnd();
    }
}

function playOrEnd() {
    if (counter === numOfQuestions) {
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
    beginGame();
});
