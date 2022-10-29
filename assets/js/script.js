// wait for DOM content to load before running js

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('id') === "easy-button") {
                runGame('easy');
            } else if (this.getAttribute('id') === "normal-button") {
                runGame('normal');
            } else if (this.getAttribute('id') === "hard-button") {
                runGame('hard');
            }
        })
    }
})

function checkAnswer(difficulty, correctNumber) {;
    console.log(correctNumber);
    let userAnswer = parseInt(document.getElementById('user-number').value);
    if (userAnswer === parseInt(correctNumber)) {
        console.log("correct");
    } else {
        console.log("incorrect");
    }
    if (parseInt(document.getElementById('timer').textContent) > 0) {
        difficulty();
    } else {
        console.log("finished");
    }
}

function addCorrectScore() {

}

function addIncorrectScore() {

}


/**
 * Calls resetTimer function and starts the correct game loop.
 * @param {*} difficulty - determines which difficulty loop should be run.
 */
function runGame(difficulty) {
    if (document.getElementById('timer').className === 'inactive') {
        resetTimer();
        if (difficulty === 'easy') {
            easyLoop();
        } else if (difficulty === 'normal') {
            normalLoop();
        } else if (difficulty === 'hard') {
            hardLoop();
        }
    } else {
        alert("You cannot start a new game whilst an old game is still running!");
    }
}

function easyLoop() {

}

function normalLoop() {
    let currentNumber = generateNumber(6);
    document.getElementById('generated-number').textContent = currentNumber;
    window.setTimeout(hideNumber, 1500);
    function hideNumber() {
        document.getElementById('generated-number').textContent = '?';
    }
    document.getElementById('submit').addEventListener('click', function () {checkAnswer(normalLoop, currentNumber)});
}

function hardLoop() {

}

/**
 * Resets timer to 60 and counts down until 0.
 * Also sets the game as active for the timer's duration
 * which prevents another game being started at the same time.
 */
function resetTimer() {
    document.getElementById('timer').className = "active";
    document.getElementById('timer').textContent = "60";
    let timerValue = parseInt(document.getElementById('timer').textContent);
    let timer = setInterval(runTimer, 1000);
    
    function runTimer() {
        timerValue--
        document.getElementById('timer').textContent = parseInt(timerValue);
        if (timerValue === 0) {
            clearInterval(timer);
            document.getElementById('timer').className = "inactive";
        }
    }
}

/**
 * Generates a random number based on the difficulty selected by the player and returns it to be displayed.
 * @param {*} digits - determines the length of the random generated number (based on game difficulty).
 * @returns the string randomNumber which contains the newly created number to be outputted to the screen.
 */
function generateNumber(digits) {
    let randomNumber = '';
    let i = 0;

    while (i < digits) {
        let randomDigit = Math.floor(Math.random() * 10);
        randomNumber += randomDigit;
        i++;
    }
    console.log(randomNumber);
    return randomNumber;
}