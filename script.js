/* ------------ Constant ---------- */
const sounds = {
    btnsound: "",
    winsound: "",
}
const validRed = document.querySelectorAll('.red')
const validBlack = document.querySelectorAll('.black')
const validYes = document.querySelectorAll('.yes')


/* ------------ Variable, Game state ---------- */
let currentPlayer = 'black';
let active = true;
let winner = false;
let move1, move2, move3, move4;
let remainBlack = 12;
let remainRed = 12;
let valid = false;


/* ------------ Event Listener ---------- */
// checker select
document.querySelector('.game').addEventListener('click', handleClick);
// Reset Button
document.querySelector('button').addEventListener('click', render);

/* ------------ Function ---------- */ 
// Reset Game
function render() {
    active = true;
    winner = false;
    remainBlack = 12;
    remainRed = 12;
    validRed.forEach(function(tdred) {
        tdred.style.backgroundImage = "url(./img/redsmall.png)";
    });
    validBlack.forEach(function(tdblack) {
        tdblack.style.backgroundImage = "url(./img/blacksmall.png)";
    });
}

// Checker Selection, click 2nd time to un-select
function handleClick(evt) {
    const square = evt.target;
    validate()
}

// Validate player's checker
function validate() {
    if (square.firstChild && currentPlayer == square.className ) {
        valid = true;
        console.log(valid)
    } else {
        valid = false;
        console.log(valid)
    }
}

// Check Possible Move
function possibleMove() {

}

// Highlight Possible Move
function highlightMove() {

}

// Highlight Player's Turn
function highlightTurn () {

}
