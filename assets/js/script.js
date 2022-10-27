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

}

function runHardGame() {

}