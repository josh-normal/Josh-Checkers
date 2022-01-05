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
let validRed = document.querySelectorAll('.red');
let validBlack = document.querySelectorAll('.black');
let playerPieces;
let currentPlayer = 'red';
let turn = true;
let active = true;
let winner = false;
let remainBlack = 12;
let remainRed = 12;
let valid = false;
let pieceProperties = {
    pieceId: -1,
    pieceClass: -1,
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


/* ------------ Event Listener ---------- */
// checker select: black if true and red if false
// document.querySelector('.game').addEventListener('click', handleClick);
function giveEventListeners() {
    if (turn) {
        for (let i = 0; i < validRed.length; i++) {
            validRed[i].addEventListener("click", handleClick);
        }
    } else {
        for (let i = 0; i < validBlack.length; i++) {
            validBlack[i].addEventListener("click", handleClick);
        }
    }}
// Reset Button
document.querySelector('button').addEventListener('click', render);


/* ------------ Function ---------- */ 
// Reset Game
function render() {
    turn = true;
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
    highlightTurn();
    giveEventListeners()
}

// Checker Selection, click 2nd time to un-select
function handleClick(evt) {
    resetPieceProperties();
    pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
    pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
    console.log(pieceProperties.pieceId);
    console.log(pieceProperties.pieceClass);
    checkForKing(evt);
}

function resetPieceProperties() {
    pieceProperties.pieceId = -1;
    pieceProperties.pieceClass = -1;
    pieceProperties.isKing = false;
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

function checkForKing(evt) {
    if (evt.target.classList.contains("king")) {
        pieceProperties.isKing = true;
    } else {
        pieceProperties.isKing = false;
    }
    checkPossibleMove();
}


// Check Possible Move
function checkPossibleMove() {
    if (turn && !pieceProperties.isKing) {
        pieceProperties.upperLeft = false;
        pieceProperties.upperRight = false;
    } else if (!turn && !pieceProperties.isKing) {
        pieceProperties.lowerLeft = false;
        pieceProperties.lowerRight = false;
    }
    
    if (pieceProperties.pieceId == 0) {
        pieceProperties.upperLeft = false;
        pieceProperties.upperRight = false;
    } else if (pieceProperties.pieceId == 7) {
        pieceProperties.lowerLeft = false;
        pieceProperties.lowerRight = false;
    }

    if (pieceProperties.pieceClass == 0) {
        pieceProperties.upperLeft = false;
        pieceProperties.lowerLeft = false;
    } else if (pieceProperties.pieceClass == 7) {
        pieceProperties.upperRight = false;
        pieceProperties.lowerRight = false;
    }

    console.log(pieceProperties)

    if (pieceProperties.upperLeft) {
        upperLeftMove.moveId = pieceProperties.pieceId - 1;
        upperLeftMove.moveClass = pieceProperties.pieceClass - 1;
        
        // if (turn) {
        //     validRed.forEach(function(tdred) {
        //         if (tdred.parentElement.id == upperLeftMove.moveId && tdred.classList.item(0) == upperLeftMove.moveClass) {
        //             pieceProperties.upperLeft = false;
        //             exit();
        //         }
        //     });
        //     validBlack.forEach(function(tdblack) {
        //         if (tdblack.parentElement.id == upperLeftMove.moveId && tdblack.classList.item(0) == upperLeftMove.moveClass) {
        //             pieceProperties.upperLeft = false;
        //             exit();
        //         }
        //     });
        // } else {
        //     validBlack.forEach(function(tdblack) {
        //         if (tdblack.parentElement.id == this.moveid) {
        //             if (tdblack.classList.item(0) == this.moveclass) {
        //                 this.prop = false;
        //             }
        //         }
        //     });
        // }
    };
    if (pieceProperties.upperRight) {
        upperRightMove.moveId = pieceProperties.pieceId - 1;
        upperRightMove.moveClass = pieceProperties.pieceClass + 1;
        
    };
    if (pieceProperties.lowerLeft) {
        lowerLeftMove.moveId = pieceProperties.pieceId + 1;
        lowerLeftMove.moveClass = pieceProperties.pieceClass - 1;
        
    };
    if (pieceProperties.lowerRight) {
        lowerRightMove.moveId = pieceProperties.pieceId + 1;
        lowerRightMove.moveClass = pieceProperties.pieceClass + 1;
        
    };

    console.log(pieceProperties)
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
    } else if (remainRed === 0) {
        subred.style.borderWidth = "0px";
        subblack.style.borderWidth = "10px";
        turnText.style.color = "black";
        turnText.textContent = "Win";
        infoText.style.color = "black";
        infoText.textContent = "Black Win";
    }
    changePlayer();
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
    giveEventListeners();
}


// render();
// giveEventListeners();