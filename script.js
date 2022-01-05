/* ------------ Constant ---------- */
const sounds = {
    btnsound: "",
    winsound: "",
}
const cells = document.querySelectorAll('td')
const validYes = document.querySelectorAll('.yes')
// Color
const subred = document.querySelector('.subred')
const subblack = document.querySelector('.subblack')
const turnText = document.querySelector('#subturn1')
const infoText = document.querySelector('#info')

/* ------------ Variable, Game state ---------- */

let playerPieces;
let currentPlayer = 'red';
let turn = true;
let move = false;
let pieceEl;
let active = true;
let winner = false;
let remainBlack = 12;
let remainRed = 12;
let pieceProperties = {
    pieceId: -1,
    pieceClass: -1,
    pieceType: '',
    isKing: false,
    upperLeft: true,
    upperRight: true,
    lowerLeft: true,
    lowerRight: true,
};
let upperLeftMove = {
    moveId: -1,
    moveClass: -1,
};
let upperRightMove = {
    moveId: -1,
    moveClass: -1,
};
let lowerLeftMove = {
    moveId: -1,
    moveClass: -1,
};
let lowerRightMove = {
    moveId: -1,
    moveClass: -1,
};
let board = [
    ["red", "red", "red", "red"],
    ["red", "red", "red", "red"],
    ["red", "red", "red", "red"],
    ["emp", "emp", "emp", "emp"],
    ["emp", "emp", "emp", "emp"],
    ["black", "black", "black", "black"],
    ["black", "black", "black", "black"],
    ["black", "black", "black", "black"],
];

/* ------------ Event Listener ---------- */
// checker select: black if true and red if false
// document.querySelector('.game').addEventListener('click', handleClick);
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleClick);
}
// Reset Button
document.querySelector('button').addEventListener('click', reset);


/* ------------ Function ---------- */ 
// Reset Game
function reset() {
    turn = true;
    active = true;
    winner = false;
    remainBlack = 12;
    remainRed = 12;
    validYes.forEach(function(tdyes) {
        tdyes.classList.remove("red", "black", "emp")})
    board = [
        ["red", "red", "red", "red"],
        ["red", "red", "red", "red"],
        ["red", "red", "red", "red"],
        ["emp", "emp", "emp", "emp"],
        ["emp", "emp", "emp", "emp"],
        ["black", "black", "black", "black"],
        ["black", "black", "black", "black"],
        ["black", "black", "black", "black"],
    ];
    render();
    highlightTurn();
}

function render() {
    validYes.forEach(function(tdyes) {
        tdyes.classList.add(board[parseInt(tdyes.parentElement.id)][parseInt(tdyes.classList.item(0))])
        tdyes.style.backgroundImage = "none";
    })
    let validRed = document.querySelectorAll('.red');
    validRed.forEach(function(tdred) {
        tdred.style.backgroundImage = "url(./img/redsmall.png)";
    });
    let validBlack = document.querySelectorAll('.black');
    validBlack.forEach(function(tdblack) {
        tdblack.style.backgroundImage = "url(./img/blacksmall.png)";
    });

}

// Checker Selection, click 2nd time to un-select
function handleClick(evt) {
    // resetPieceProperties();
    if (turn) {
        if (evt.target.classList.item(2) == 'red') {
            pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
            pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
            pieceProperties.pieceType = evt.target.classList.item(2);
            pieceEl = evt.target
            move = true;
            checkForKing(evt.target)
        } else {
            if (pieceProperties.pieceType) {
                board[parseInt(evt.target.parentElement.id)][parseInt(evt.target.classList.item(0))] = pieceProperties.pieceType
                move = false;
                board[pieceProperties.pieceId][pieceProperties.pieceClass] = 'emp'
                pieceEl.classList.remove("red")
                console.log(board)
                resetPieceProperties()
                changePlayer()
                render();
                pieceEl = null;
            }
        }
    } else if (!turn) {
        if (evt.target.classList.item(2) == 'black') {
            pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
            pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
            pieceProperties.pieceType = evt.target.classList.item(2);
            pieceEl = evt.target
            move = true;
            checkForKing(evt.target)
        } else {
            if (pieceProperties.pieceType) {
                board[parseInt(evt.target.parentElement.id)][parseInt(evt.target.classList.item(0))] = pieceProperties.pieceType
                move = false;
                board[pieceProperties.pieceId][pieceProperties.pieceClass] = 'emp'
                pieceEl.classList.remove("black")
                console.log(board)
                resetPieceProperties()
                changePlayer()
                render();
                pieceEl = null;
            }
        }
    }
}


function resetPieceProperties() {
    pieceProperties.pieceId = -1;
    pieceProperties.pieceClass = -1;
    pieceProperties.isKing = false;
    pieceProperties.pieceType = '';
    pieceProperties.upperLeft = true;
    pieceProperties.upperRight = true;
    pieceProperties.lowerLeft = true;
    pieceProperties.lowerRight = true;

    upperLeftMove.moveId = -1;
    upperLeftMove.moveClass = -1;
    upperRightMove.moveId = -1;
    upperRightMove.moveClass = -1;
    lowerLeftMove.moveId = -1;
    lowerLeftMove.moveClass = -1;
    lowerRightMove.moveId = -1;
    lowerRightMove.moveClass = -1;
}


function checkForKing(event) {
    if (event.classList.contains("king")) {
        pieceProperties.isKing = true;
    } else {
        pieceProperties.isKing = false;
    }
    checkPossibleMove(event);
}


// Check Possible Move
function checkPossibleMove(event) {
    if (pieceProperties.pieceId == 0) {
        pieceProperties.upperLeft = false
        pieceProperties.upperRight = false
    } else if (pieceProperties.pieceId == 7) {
        pieceProperties.lowerLeft = false
        pieceProperties.lowerRight = false
    }

    if (pieceProperties.pieceClass == 0 && (pieceProperties.pieceId % 2 === 0)) {
        pieceProperties.upperLeft = false
        pieceProperties.lowerLeft = false
    } else if (pieceProperties.pieceClass == 3 && (pieceProperties.pieceId % 2 !== 0)) {
        pieceProperties.upperRight = false
        pieceProperties.lowerRight = false
    }

    if (turn) {
        if (!pieceProperties.isKing) {
            pieceProperties.upperLeft = false
            pieceProperties.upperRight = false
        }
    } else {
        if (!pieceProperties.isKing) {
            pieceProperties.lowerLeft = false
            pieceProperties.lowerRight = false
        }
    }

    if (turn) {
        
    }


    validatePossibleMove();
}

// let upperLeftMove = {
//     moveId: -1,
//     moveClass: -1,
// };
// let upperRightMove = {
//     moveId: -1,
//     moveClass: -1,
// };
// let lowerLeftMove = {
//     moveId: -1,
//     moveClass: -1,
// };
// let lowerRightMove = {
//     moveId: -1,
//     moveClass: -1,
// };


function validatePossibleMove() {
    



    highlightMove();
}

// Highlight Possible Move
function highlightMove() {

}


// Checks winner
function checkForWin() {
    if (remainBlack === 0) {
        subred.style.borderWidth = "10px";
        subblack.style.borderWidth = "0px";
        turnText.style.color = "red";
        turnText.textContent = "Win";
        infoText.style.color = "red";
        infoText.textContent = "Red Win";
        winner = true;
    } else if (remainRed === 0) {
        subred.style.borderWidth = "0px";
        subblack.style.borderWidth = "10px";
        turnText.style.color = "black";
        turnText.textContent = "Win";
        infoText.style.color = "black";
        infoText.textContent = "Black Win";
        winner = true;
    }
    if (!winner) {
        changePlayer();
    }
}


// Highlight Player's Turn
function highlightTurn() {
    if (turn) {
        subred.style.borderWidth = "10px";
        subblack.style.borderWidth = "0px";
        turnText.style.color = "red";
        infoText.style.color = "red";
        infoText.textContent = "Red's Turn";
    } else {
        subred.style.borderWidth = "0px";
        subblack.style.borderWidth = "10px";
        turnText.style.color = "black";
        infoText.style.color = "black";
        infoText.textContent = "Black's Turn";
    }
}

// Change players 
function changePlayer() {
    if (turn) {
        turn = false;
    } else {
        turn = true;
    }
    highlightTurn();
}


render();
