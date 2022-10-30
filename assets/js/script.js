// wait for DOM content to load before running js

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');
    document.getElementById('submit').addEventListener('click', checkGameRunning);

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

    document.getElementById('user-number').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkGameRunning();
        }
    })
})

/**
 * Calls resetTimer function and starts the correct game loop.
 * @param {*} difficulty - determines which difficulty loop should be run.
 */
function runGame(difficulty) {
    if (document.getElementById('timer').getAttribute('data-game-status') === 'inactive') {
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

/**
 * Displays a random 4-digit number and hides it after 1.5 seconds.
 */
function easyLoop() {
    document.getElementById('user-number').focus();
    document.getElementById('user-number').value = '';

    let currentNumber = generateNumber(4);
    document.getElementById('generated-number').textContent = currentNumber;
    document.getElementById('generated-number').setAttribute('data-difficulty', 'easy')
    window.setTimeout(hideNumber, 1500);
}

/**
 * Displays a random 6-digit number and hides it after 1.5 seconds.
 */
function normalLoop() {
    document.getElementById('user-number').focus();
    document.getElementById('user-number').value = '';

    let currentNumber = generateNumber(6);
    document.getElementById('generated-number').textContent = currentNumber;
    document.getElementById('generated-number').setAttribute('data-difficulty', 'normal')
    window.setTimeout(hideNumber, 1500);
}

/**
 * Displays a random 8-digit number and hides it after 1.5 seconds.
 */
function hardLoop() {
    document.getElementById('user-number').focus();
    document.getElementById('user-number').value = '';

    let currentNumber = generateNumber(8);
    document.getElementById('generated-number').textContent = currentNumber;
    document.getElementById('generated-number').setAttribute('data-difficulty', 'hard')
    window.setTimeout(hideNumber, 1500);
}

/**
 * Hides the generated number.
 */
function hideNumber() {
    document.getElementById('generated-number').hidden = true;
}

/**
 * Check if the game is running and if so allows the submit button to function.
 */
function checkGameRunning() {
    let gameRunning = document.getElementById('timer').getAttribute('data-game-status');
    if (gameRunning === 'active') {
        checkAnswer();
    }
}

/**
 * Check if the user's answer is correct and calls the according score function.
 * Also determines if the current game should keep looping or
 * if the game should be ended.
 */
function checkAnswer() {
    let correctNumber = document.getElementById('generated-number').textContent;
    let userAnswer = parseInt(document.getElementById('user-number').value);
    document.getElementById('user-number').value = '';
    document.getElementById('generated-number').hidden = false;
    if (userAnswer === parseInt(correctNumber)) {
        document.getElementById('generated-number').textContent = 'CORRECT';
        addCorrectScore();
    } else {
        document.getElementById('generated-number').textContent = 'WRONG';
        addIncorrectScore();
    }
    if (parseInt(document.getElementById('timer').textContent) > 0) {
        window.setTimeout(loopCorrectDifficulty, 1000);
    } else {
        window.setTimeout(function() {
            document.getElementById('generated-number').textContent = 'FINISH'
            endGame();
        }, 1000)
    }
}

/**
 * Increments the score tally by one for every correct answer.
 */
function addCorrectScore() {
    let scoreTally = parseInt(document.getElementById('score').textContent);
    scoreTally += 1;
    document.getElementById('score').textContent = scoreTally;
}

/**
 * Increments the incorrect score tally by one for every incorrect answer.
 */
function addIncorrectScore() {
    let incorrectTally = parseInt(document.getElementById('incorrect-answers').textContent);
    incorrectTally += 1;
    document.getElementById('incorrect-answers').textContent = incorrectTally;
}

/**
 * Decides which function to loop based on the selected difficulty.
 */
function loopCorrectDifficulty() {
    let numberDifficulty = document.getElementById('generated-number');
    if (numberDifficulty.getAttribute('data-difficulty') === 'easy') {
        easyLoop();
    } else if (numberDifficulty.getAttribute('data-difficulty') === 'normal') {
        normalLoop();
    } else if (numberDifficulty.getAttribute('data-difficulty') === 'hard') {
        hardLoop();
    }
}

/**
 * Sends an alert to the user with their final scores at the end of a game.
 * Also resets the score tallies to 0.
 */
function endGame() {
    document.getElementById('timer').setAttribute('data-game-status', 'inactive');
    let finishScore = document.getElementById('score').textContent;
    let finishIncorrectScore = document.getElementById('incorrect-answers').textContent;
    let difficulty = document.getElementById('generated-number').getAttribute('data-difficulty');
    alert(`Congratulations! You finished ${difficulty} difficulty with a total of ${finishScore} correct answers and ${finishIncorrectScore} incorrect answers.`)
    document.getElementById('score').textContent = '0';
    document.getElementById('incorrect-answers').textContent = '0';
}

/**
 * Resets timer to 60 and counts down until 0.
 * Also sets the game as active for the timer's duration
 * which prevents another game being started at the same time.
 */
function resetTimer() {
    document.getElementById('timer').setAttribute('data-game-status', 'active');
    document.getElementById('timer').textContent = "60";
    let timerValue = parseInt(document.getElementById('timer').textContent);
    let timer = setInterval(runTimer, 1000);
    
    function runTimer() {
        timerValue--
        document.getElementById('timer').textContent = parseInt(timerValue);
        if (timerValue === 0) {
            clearInterval(timer);
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