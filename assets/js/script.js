// constant variables

const timer = document.getElementById('timer');
const userInput = document.getElementById('user-number');
const activeRandomNumber = document.getElementById('generated-number');
const correctScore = document.getElementById('score');
const incorrectScore = document.getElementById('incorrect-answers');

// wait for DOM content to load before running js

document.addEventListener("DOMContentLoaded", function() {
    
    let difficultyButtons = document.getElementsByClassName('difficulty-button');
    for (let button of difficultyButtons) {
        button.addEventListener('click', function(event) {
            let clickedButton = event.currentTarget;
            runGame(clickedButton.dataset.difficulty);
        })
    }
    
    document.getElementById('submit').addEventListener('click', checkGameRunning);
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkGameRunning();
        }
    })
})

/**
 * Calls resetTimer function and starts the correct game loop.
 * @param {string} difficulty - determines which difficulty loop should be run.
 */
function runGame(difficulty) {
    if (timer.getAttribute('data-game-status') === 'inactive') {
        resetTimer();
        if (difficulty === 'easy') {
            easyLoop();
        } else if (difficulty === 'normal') {
            normalLoop();
        } else if (difficulty === 'hard') {
            hardLoop();
        }
    } else {
        Swal.fire({
            icon: 'error',
            text: "You can't start a new game yet. Finish this one first buddy!",
            confirmButtonColor: '#EE6A05'
        })
    }
}

/**
 * Displays a random 4-digit number and hides it after 1.5 seconds.
 */
function easyLoop() {
    userInput.focus();
    userInput.value = '';

    let currentNumber = generateNumber(4);
    activeRandomNumber.textContent = currentNumber;
    activeRandomNumber.setAttribute('data-difficulty', 'easy')
    window.setTimeout(hideNumber, 1500);
}

/**
 * Displays a random 6-digit number and hides it after 1.5 seconds.
 */
function normalLoop() {
    userInput.focus();
    userInput.value = '';

    let currentNumber = generateNumber(6);
    activeRandomNumber.textContent = currentNumber;
    activeRandomNumber.setAttribute('data-difficulty', 'normal')
    window.setTimeout(hideNumber, 1500);
}

/**
 * Displays a random 8-digit number and hides it after 1.5 seconds.
 */
function hardLoop() {
    userInput.focus();
    userInput.value = '';

    let currentNumber = generateNumber(8);
    activeRandomNumber.textContent = currentNumber;
    activeRandomNumber.setAttribute('data-difficulty', 'hard')
    window.setTimeout(hideNumber, 1500);
}

/**
 * Hides the generated number.
 */
function hideNumber() {
    activeRandomNumber.hidden = true;
}

/**
 * Check if the game is running and if so allows the submit button to function.
 */
function checkGameRunning() {
    let gameRunning = timer.getAttribute('data-game-status');
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
    let correctNumber = activeRandomNumber.textContent;
    let userAnswer = parseInt(userInput.value);
    userInput.value = '';
    activeRandomNumber.hidden = false;
    if (userAnswer === parseInt(correctNumber)) {
        activeRandomNumber.textContent = 'CORRECT';
        addCorrectScore();
    } else {
        activeRandomNumber.textContent = 'WRONG';
        addIncorrectScore();
    }
    if (parseInt(timer.textContent) > 0) {
        window.setTimeout(loopCorrectDifficulty, 1000);
    } else {
        window.setTimeout(function() {
            activeRandomNumber.textContent = 'FINISH';
            endGame();
        }, 1000)
    }
}

/**
 * Increments the score tally by one for every correct answer.
 */
function addCorrectScore() {
    let scoreTally = parseInt(correctScore.textContent);
    scoreTally += 1;
    correctScore.textContent = scoreTally;
}

/**
 * Increments the incorrect score tally by one for every incorrect answer.
 */
function addIncorrectScore() {
    let incorrectTally = parseInt(incorrectScore.textContent);
    incorrectTally += 1;
    incorrectScore.textContent = incorrectTally;
}

/**
 * Decides which function to loop based on the selected difficulty.
 */
function loopCorrectDifficulty() {
    if (activeRandomNumber.getAttribute('data-difficulty') === 'easy') {
        easyLoop();
    } else if (activeRandomNumber.getAttribute('data-difficulty') === 'normal') {
        normalLoop();
    } else if (activeRandomNumber.getAttribute('data-difficulty') === 'hard') {
        hardLoop();
    }
}

/**
 * Sends an alert to the user with their final scores at the end of a game.
 * Also resets the score tallies to 0.
 */
function endGame() {
    timer.setAttribute('data-game-status', 'inactive');
    let finishScore = correctScore.textContent;
    let finishIncorrectScore = incorrectScore.textContent;
    let difficulty = activeRandomNumber.getAttribute('data-difficulty');
    Swal.fire({
        title: 'Great Job!',
        text: `Congrats! You finished ${difficulty} difficulty with ${finishScore} correct answers and ${finishIncorrectScore} incorrect answers. Think you can do better?`,
        confirmButtonText: 'Just One More Game!',
        confirmButtonColor: '#EE6A05'
    })
    correctScore.textContent = '0';
    incorrectScore.textContent = '0';
}

/**
 * Resets timer to 60 and counts down until 0.
 * Also sets the game as active for the timer's duration
 * which prevents another game being started at the same time.
 */
function resetTimer() {
    timer.setAttribute('data-game-status', 'active');
    timer.textContent = "60";
    let timerValue = parseInt(timer.textContent);
    let timerInterval = setInterval(runTimer, 1000);
    
    function runTimer() {
        timerValue--
        timer.textContent = parseInt(timerValue);
        if (timerValue === 0) {
            clearInterval(timerInterval);
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