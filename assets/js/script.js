// wait for DOM content to load before running js

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('id') === "submit") {
                checkAnswer();
            } else if (this.getAttribute('id') === "easy-button") {
                runEasyGame();
            } else if (this.getAttribute('id') === "normal-button") {
                runNormalGame();
            } else if (this.getAttribute('id') === "hard-button") {
                runHardGame();
            } else {
                throw `Button clicked (${this.getAttribute('id')}) is not recognised`;
            }
        })
    }
})

function checkAnswer() {

}

function runEasyGame() {

}

function runNormalGame() {
    if (document.getElementById('timer').className === 'inactive') {
        resetTimer();
        let currentNumber = generateNumber(6);
        document.getElementById('generated-number').textContent = currentNumber;
        window.setTimeout(hideNumber, 1500);
        function hideNumber() {
            document.getElementById('generated-number').textContent = '?';
        }
    } else {
        alert("You cannot start a new game whilst an old game is still running!");
    }
}

function runHardGame() {

}

/**
 * Resets timer to 60 and counts down until 0.
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

    return randomNumber;
}