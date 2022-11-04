# Unforgettable Testing
## Automated Testing  
- All of the HTML written for this site passes through the [W3C HTML Validator](https://validator.w3.org/) with no errors.
- All of the CSS written for this site passes through the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) with no errors. 
- All of the JavaScript written for this site passes through [JSHint](https://jshint.com/) with only one warning: 'Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (runGame)'. I believe that in the context of the code surrounding the function of note, the semantics are clear and as such I'm happy to leave the code as it is.  

Lighthouse results:  
![The lighthouse scores for the unforgettable website](assets/images/unforgettable-lighthouse.png)  

## Manual Testing 
### Functionality:
| Test Label | Test Action | Expected Outcome | Test Outcome |
|------------|-------------|------------------|--------------|
| External links function correctly. | Click all social media links in the footer. | All links should navigate where expected and open in a new tab. | PASS |
| Difficulty buttons function correctly. | Click all difficulty buttons upon reloading the site. | Each button should start a game of the correct difficulty and not allow a new game to begin whilst one is still in progress. | PASS |
| Submit button should not alter score whilst a game is not running. | Attempt to click the submit button whilst no game is active. | Neither score tally should increment and nothing should happen anywhere else on the site also. | PASS |
| Submit button functions correctly whilst a game is active. | Click the submit button whilst a game is active and attempt to submit multiple times rapidly. | The user's guess should be checked and the correct score tally should be incremented, the submit button should not be clickable in rapid succession. | PASS |
| Timer should function correctly. | Start a game and watch to ensure the timer starts at 60 and stops creating new numbers after it reaches 0. | The timer should reset to 60s when a new game is started and stop at 0. | PASS* |
| End-Game message should function correctly | Play through a full game and see what happens when the game ends. | The game should stop looping and a custom alert should appear congratulating the user and displaying their final score. | PASS |

*side note regarding the timer functionality: You may notice that the game does not finish immediately once the timer reaches 0 but instead finishes after the last submission once the timer has already reached 0. This is intentional because I believe it makes for better UX to allow the user to finish their last question instead of cutting them off.

### Browser Compatibility:
This website works as intended on the following browsers:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox  

### Responsiveness:
320px Screen Responsiveness:  
![Demonstration of the unforgettable website on a simulated 320px screen](assets/images/unforgettable-320px.png)

4k Screen Responsivenss:  
![Demonstration of the unforgettable website on a simulated 4k screen](assets/images/unforgettable-4k.png)  

## Bugs
### Solved Bugs:
- When I first implemented the checkAnswer function, the site would function correctly for the first answer but for every following answer it would run the new checkAnswer as well as all of the previous checkAnswer functions again. This meant the score tallies would increment multiple times for every one answer submission. Another side effect of this bug was that the website would slow immensely and completely crash after 5-6 submissions because the amount of functions that were being called would increase exponentially every time an answer was checked. There was ultimately no one cause of this bug, fixing it came down to refactoring and repositioning large chunks of javascript. That being said, the main fix was probably moving the click event listener for the submit button outside of the checkAnswer function.
- The other large bug that appeared during development was caused by a user submitting multiple answers in rapid succession. Initially, the only limit on when the user could submit their answer was when the game was active. Because the game requires numbers to display on screen for a certain length of time, the game would become bugged if a user either: submitted an answer whilst the display area was 'busy' (displaying something), or if a user submitted multiple times before one number had chance to appear and disappear. To fix this bug, I created a new disableInput function which deactivates the submission event listeners once one submission is made and reactivates them once the display area is no longer 'busy'.

### Known Bugs:
- I have tested the site extensively and there are no major bugs as far as I am currently aware. Whilst it isn't a bug, it is worth mentioning that because of the aforementioned disableInput function, a very speedy user on the easy difficulty might attempt to enter an answer just before the number has disappeared and their answer won't submit. This isn't a 'bug' because the code works exactly as intended when the user attempts to submit whilst the display is busy, however it is a little jarring if you are not aware that it happens. In practical terms, it is very unlikely that this exact sequence should occur for the average user and because it isn't an error or game-breaking in any way I am leaving it like this for now.

Return to [README](README.md)