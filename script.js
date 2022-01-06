/* ------------ Constant ---------- */
const btnsound = new Audio("./sound/button_sound.wav");
const winsound = new Audio("./sound/win_sound.mp3");
const table = document.querySelector('table')
const cells = document.querySelectorAll('td')
const validYes = document.querySelectorAll('.yes')
const subred = document.querySelector('.subred')
const subblack = document.querySelector('.subblack')
const turnText = document.querySelector('#subturn1')
const infoText = document.querySelector('#info')

/* ------------ Variable, Game state ---------- */
let turn = true;
let eat = false;
let winner = false;
let pieceProperties = {
    id: null,
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
// All DOM Click Events
if (!winner) {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", handleClick);
    }
} else {

}
// All DOM Click Sound
table.addEventListener("click", playSound);
// Reset Button
document.querySelector('button').addEventListener('click', reset);


/* ------------ Function ---------- */ 
// Handle reset button to reset Game
function reset() {
    turn = true;
    winner = false;
    subred.querySelector('h1').textContent = 12
    subblack.querySelector('h1').textContent = 12
    validYes.forEach(function(tdyes) {
        tdyes.classList.remove('emp', 'red', 'black', 'blue', 'eat', 'toEat', 'king')})
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

// Handle redering all Checkers on the Board
function render() {
    validYes.forEach(function(tdyes) {
        tdyes.classList.remove('emp', 'red', 'black', 'blue', 'eat', 'toEat')
        tdyes.classList.add(board[parseInt(tdyes.parentElement.id)][parseInt(tdyes.classList.item(0))])
        tdyes.style.backgroundImage = "none";
        tdyes.style.backgroundColor = "white";
        if (tdyes.classList.contains('emp')) {
            tdyes.classList.remove('king')
        }
    })
    let validRed = document.querySelectorAll('.red');
    validRed.forEach(function(tdred) {
        tdred.style.backgroundImage = "url(./img/redsmall.png)";
    });
    let validBlack = document.querySelectorAll('.black');
    validBlack.forEach(function(tdblack) {
        tdblack.style.backgroundImage = "url(./img/blacksmall.png)";
    });
    let validKing = document.querySelectorAll('.king');
    validKing.forEach(function(tdking) {
        if (tdking.classList.contains('red')) {
            tdking.style.backgroundImage = "url(./img/redCrownsmall.png)";
        } else if (tdking.classList.contains('black')) {
            tdking.style.backgroundImage = "url(./img/blackCrownsmall.png)";
        }
    });
}

// Handle All Click Event on the DOM
function handleClick(evt) {
    // resetPieceProperties();
    if (turn) {
        if (evt.target.classList.contains('red') && evt.target.classList.contains('king')) {
            if (evt.target.id != pieceProperties.id && pieceProperties.id != null) {
                resetPieceProperties();
                render();
                pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
                pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
                pieceProperties.pieceType = evt.target.classList.item(3);
                pieceProperties.isKing = true
                pieceProperties.id = evt.target.id;
                checkPossibleMove(evt.target)
            } else if (evt.target.id == pieceProperties.id) {
                resetPieceProperties();
                render();
            } else if (pieceProperties.id == null) {
                pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
                pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
                pieceProperties.pieceType = evt.target.classList.item(3);
                pieceProperties.isKing = true
                pieceProperties.id = evt.target.id;
                checkPossibleMove(evt.target)
            }
        } else if (evt.target.classList.contains('red') && !evt.target.classList.contains('king')) {
            if (evt.target.id != pieceProperties.id && pieceProperties.id != null) {
                resetPieceProperties();
                render();
                pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
                pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
                pieceProperties.pieceType = evt.target.classList.item(2);
                pieceProperties.id = evt.target.id;
                checkPossibleMove(evt.target)
            } else if (evt.target.id == pieceProperties.id) {
                resetPieceProperties();
                render();
            } else if (pieceProperties.id == null) {
                pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
                pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
                pieceProperties.pieceType = evt.target.classList.item(2);
                pieceProperties.id = evt.target.id;
                checkPossibleMove(evt.target)
            }
        } else if (evt.target.classList.contains('blue')) {
            if (evt.target.classList.contains('toEat')) {
                validYes.forEach(function(tdyes) {
                    if (tdyes.classList.contains('eat')) {
                        board[parseInt(tdyes.parentElement.id)][parseInt(tdyes.classList.item(0))] = 'emp'
                        tdyes.classList.remove('black', 'king')
                        let counter = parseInt(subblack.querySelector('h1').textContent) - 1;
                        subblack.querySelector('h1').textContent = counter
                    }
                }) 
            }
            if (pieceProperties.isKing) {
                board[parseInt(evt.target.parentElement.id)][parseInt(evt.target.classList.item(0))] = pieceProperties.pieceType
                board[pieceProperties.pieceId][pieceProperties.pieceClass] = 'emp'
                evt.target.classList.add('king')
                evt.target.classList.remove('emp')
            } else {
                board[parseInt(evt.target.parentElement.id)][parseInt(evt.target.classList.item(0))] = pieceProperties.pieceType
                board[pieceProperties.pieceId][pieceProperties.pieceClass] = 'emp'
            }
            if (evt.target.parentElement.id == 7) {
                evt.target.classList.add('king')
                evt.target.classList.remove('emp')
            }
            resetPieceProperties()
            render()
            checkForWin()
        } else {
            resetPieceProperties();
            render();
        }
    } else if (!turn) {
        if (evt.target.classList.contains('black') && evt.target.classList.contains('king')) {
            if (evt.target.id != pieceProperties.id && pieceProperties.id != null) {
                resetPieceProperties();
                render();
                pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
                pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
                pieceProperties.pieceType = evt.target.classList.item(3);
                pieceProperties.isKing = true
                pieceProperties.id = evt.target.id;
                checkPossibleMove(evt.target)
            } else if (evt.target.id == pieceProperties.id) {
                resetPieceProperties();
                render();
            } else if (pieceProperties.id == null) {
                pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
                pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
                pieceProperties.pieceType = evt.target.classList.item(3);
                pieceProperties.isKing = true
                pieceProperties.id = evt.target.id;
                checkPossibleMove(evt.target)
            }
        } else if (evt.target.classList.contains('black') && !evt.target.classList.contains('king')) {
            if (evt.target.id != pieceProperties.id && pieceProperties.id != null) {
                resetPieceProperties();
                render();
                pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
                pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
                pieceProperties.pieceType = evt.target.classList.item(2);
                pieceProperties.id = evt.target.id;
                checkPossibleMove(evt.target)
            } else if (evt.target.id == pieceProperties.id) {
                resetPieceProperties();
                render();
            } else if (pieceProperties.id == null) {
                pieceProperties.pieceId = parseInt(evt.target.parentElement.id);
                pieceProperties.pieceClass = parseInt(evt.target.classList.item(0));
                pieceProperties.pieceType = evt.target.classList.item(2);
                pieceProperties.id = evt.target.id;
                checkPossibleMove(evt.target)
            }
        } else if (evt.target.classList.contains('blue')) {
            // if (pieceProperties.pieceType) {}
            if (evt.target.classList.contains('toEat')) {
                validYes.forEach(function(tdyes) {
                    if (tdyes.classList.contains('eat')) {
                        board[parseInt(tdyes.parentElement.id)][parseInt(tdyes.classList.item(0))] = 'emp'
                        tdyes.classList.remove('red', 'king')
                        let counter = parseInt(subred.querySelector('h1').textContent) - 1;
                        subred.querySelector('h1').textContent = counter
                    }
                })
            }
            if (pieceProperties.isKing) {
                board[parseInt(evt.target.parentElement.id)][parseInt(evt.target.classList.item(0))] = pieceProperties.pieceType
                board[pieceProperties.pieceId][pieceProperties.pieceClass] = 'emp'
                evt.target.classList.add('king')
                evt.target.classList.remove('emp')
            } else {
                board[parseInt(evt.target.parentElement.id)][parseInt(evt.target.classList.item(0))] = pieceProperties.pieceType
                board[pieceProperties.pieceId][pieceProperties.pieceClass] = 'emp'
            }
            if (evt.target.parentElement.id == 0) {
                evt.target.classList.add('king')
                evt.target.classList.remove('emp')
            }
            resetPieceProperties()
            render()
            checkForWin()
        } else {
            resetPieceProperties()
            render()
        }
    }
}

// Reset piece property object
function resetPieceProperties() {
    pieceProperties.id = null;
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


// Check Possible Move
function checkPossibleMove(event) {
    if (event.classList.contains("king")) {
        pieceProperties.isKing = true;
    } else {
        pieceProperties.isKing = false;
    }

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
    
    // adhfadfha
    if (pieceProperties.upperLeft) {
        upperLeftMove.moveId = pieceProperties.pieceId - 1;
        if (pieceProperties.pieceClass == 0) {
            upperLeftMove.moveClass = 0
        } else if (pieceProperties.pieceClass >= 1 && (pieceProperties.pieceId % 2 === 0)) {
            upperLeftMove.moveClass = pieceProperties.pieceClass - 1
        } else if (pieceProperties.pieceClass >= 1 && (pieceProperties.pieceId % 2 !== 0)) {
            upperLeftMove.moveClass = pieceProperties.pieceClass
        }
    }

    if (pieceProperties.upperRight) {
        upperRightMove.moveId = pieceProperties.pieceId - 1;
        if (pieceProperties.pieceClass == 3) {
            upperRightMove.moveClass = 3
        } else if (pieceProperties.pieceClass <= 2 && (pieceProperties.pieceId % 2 === 0)) {
            upperRightMove.moveClass = pieceProperties.pieceClass
        } else if (pieceProperties.pieceClass <= 2 && (pieceProperties.pieceId % 2 !== 0)) {
            upperRightMove.moveClass = pieceProperties.pieceClass + 1
        }
    }

    if (pieceProperties.lowerLeft) {
        lowerLeftMove.moveId = pieceProperties.pieceId + 1;
        if (pieceProperties.pieceClass == 0) {
            lowerLeftMove.moveClass = 0
        } else if (pieceProperties.pieceClass >= 1 && (pieceProperties.pieceId % 2 === 0)) {
            lowerLeftMove.moveClass = pieceProperties.pieceClass - 1
        } else if (pieceProperties.pieceClass >= 1 && (pieceProperties.pieceId % 2 !== 0)) {
            lowerLeftMove.moveClass = pieceProperties.pieceClass
        }
    }

    if (pieceProperties.lowerRight) {
        lowerRightMove.moveId = pieceProperties.pieceId + 1;
        if (pieceProperties.pieceClass == 3) {
            lowerRightMove.moveClass = 3
        } else if (pieceProperties.pieceClass <= 2 && (pieceProperties.pieceId % 2 === 0)) {
            lowerRightMove.moveClass = pieceProperties.pieceClass
        } else if (pieceProperties.pieceClass <= 2 && (pieceProperties.pieceId % 2 !== 0)) {
            lowerRightMove.moveClass = pieceProperties.pieceClass + 1
        }
    }

    if (turn) {
        validYes.forEach(function(tdyes) {
            if (tdyes.parentElement.id == upperLeftMove.moveId && tdyes.classList.item(0) == upperLeftMove.moveClass) {
                if (!tdyes.classList.contains('red') && !tdyes.classList.contains('black')) {
                    tdyes.classList.add('blue')
                } else if (tdyes.classList.contains('black')) {
                    // tdyes.classList.remove('blue')
                    validYes.forEach(function(elm) {
                        if (elm.parentElement.id == (upperLeftMove.moveId - 1) && (upperLeftMove.moveId % 2 == 0) && elm.classList.item(0) == (upperLeftMove.moveClass - 1) && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        } else if (elm.parentElement.id == (upperLeftMove.moveId - 1) && (upperLeftMove.moveId % 2 != 0) && elm.classList.item(0) == upperLeftMove.moveClass && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        }
                    })
                    if (eat) {
                        tdyes.classList.add('eat')
                        eat = false
                    }
                    
                }
            } else if (tdyes.parentElement.id == upperRightMove.moveId && tdyes.classList.item(0) == upperRightMove.moveClass) {
                if (!tdyes.classList.contains('red') && !tdyes.classList.contains('black')) {
                    tdyes.classList.add('blue')
                } else if (tdyes.classList.contains('black')) {
                    validYes.forEach(function(elm) {
                        if (elm.parentElement.id == (upperRightMove.moveId - 1) && (upperRightMove.moveId % 2 == 0) && elm.classList.item(0) == upperRightMove.moveClass && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        } else if (elm.parentElement.id == (upperRightMove.moveId - 1) && (upperRightMove.moveId % 2 != 0) && elm.classList.item(0) == (upperRightMove.moveClass + 1) && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        }
                    })
                    if (eat) {
                        tdyes.classList.add('eat')
                        eat = false
                    }
                }
            } else if (tdyes.parentElement.id == lowerLeftMove.moveId && tdyes.classList.item(0) == lowerLeftMove.moveClass) {
                if (!tdyes.classList.contains('red') && !tdyes.classList.contains('black')) {
                    tdyes.classList.add('blue')
                } else if (tdyes.classList.contains('black')) {
                    validYes.forEach(function(elm) {
                        if ((elm.parentElement.id == lowerLeftMove.moveId + 1) && (lowerLeftMove.moveId % 2 == 0) && (elm.classList.item(0) == lowerLeftMove.moveClass - 1) && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        } else if ((elm.parentElement.id == lowerLeftMove.moveId + 1) && (lowerLeftMove.moveId % 2 == 0) && (elm.classList.item(0) == lowerLeftMove.moveClass) && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        }
                    })
                    if (eat) {
                        tdyes.classList.add('eat')
                        eat = false
                    }
                }
            } else if (tdyes.parentElement.id == lowerRightMove.moveId && tdyes.classList.item(0) == lowerRightMove.moveClass) {
                if (!tdyes.classList.contains('red') && !tdyes.classList.contains('black')) {
                    tdyes.classList.add('blue')
                } else if (tdyes.classList.contains('black')) {
                    validYes.forEach(function(elm) {
                        if (elm.parentElement.id == (lowerRightMove.moveId + 1) && (lowerRightMove.moveId % 2 == 0) && elm.classList.item(0) == lowerRightMove.moveClass && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        } else if (elm.parentElement.id == (lowerRightMove.moveId + 1) && (lowerRightMove.moveId % 2 != 0) && elm.classList.item(0) == lowerRightMove.moveClass + 1 && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        }
                    })
                    if (eat) {
                        tdyes.classList.add('eat')
                        eat = false
                    }
                }
            }
        })
    } else {
        validYes.forEach(function(tdyes) {
            if (tdyes.parentElement.id == upperLeftMove.moveId && tdyes.classList.item(0) == upperLeftMove.moveClass) {
                if (!tdyes.classList.contains('black') && !tdyes.classList.contains('red')) {
                    tdyes.classList.add('blue')
                } else if (tdyes.classList.contains('red')) {
                    validYes.forEach(function(elm) {
                        if (elm.parentElement.id == (upperLeftMove.moveId - 1) && (upperLeftMove.moveId % 2 == 0) && elm.classList.item(0) == (upperLeftMove.moveClass - 1) && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        } else if (elm.parentElement.id == (upperLeftMove.moveId - 1) && (upperLeftMove.moveId % 2 != 0) && elm.classList.item(0) == upperLeftMove.moveClass && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        }
                    })
                    if (eat) {
                        tdyes.classList.add('eat')
                        eat = false
                    }
                }
            } else if (tdyes.parentElement.id == upperRightMove.moveId && tdyes.classList.item(0) == upperRightMove.moveClass) {
                if (!tdyes.classList.contains('black') && !tdyes.classList.contains('red')) {
                    tdyes.classList.add('blue')
                } else if (tdyes.classList.contains('red')) {
                    validYes.forEach(function(elm) {
                        if (elm.parentElement.id == (upperRightMove.moveId - 1) && (upperRightMove.moveId % 2 == 0) && elm.classList.item(0) == upperRightMove.moveClass && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        } else if (elm.parentElement.id == (upperRightMove.moveId - 1) && (upperRightMove.moveId % 2 != 0) && elm.classList.item(0) == (upperRightMove.moveClass + 1) && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        }
                    })
                    if (eat) {
                        tdyes.classList.add('eat')
                        eat = false
                    }
                }
            } else if (tdyes.parentElement.id == lowerLeftMove.moveId && tdyes.classList.item(0) == lowerLeftMove.moveClass) {
                if (!tdyes.classList.contains('black') && !tdyes.classList.contains('red')) {
                    tdyes.classList.add('blue')
                } else if (tdyes.classList.contains('red')) {
                    validYes.forEach(function(elm) {
                        if (elm.parentElement.id == (lowerLeftMove.moveId + 1) && (lowerLeftMove.moveId % 2 == 0) && elm.classList.item(0) == (lowerLeftMove.moveClass - 1) && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        } else if (elm.parentElement.id == (lowerLeftMove.moveId + 1) && (lowerLeftMove.moveId % 2 != 0) && elm.classList.item(0) == lowerLeftMove.moveClass && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        }
                    })
                    if (eat) {
                        tdyes.classList.add('eat')
                        eat = false
                    }
                }
            } else if (tdyes.parentElement.id == lowerRightMove.moveId && tdyes.classList.item(0) == lowerRightMove.moveClass) {
                if (!tdyes.classList.contains('black') && !tdyes.classList.contains('red')) {
                    tdyes.classList.add('blue')
                } else if (tdyes.classList.contains('red')) {
                    validYes.forEach(function(elm) {
                        if (elm.parentElement.id == (lowerRightMove.moveId + 1) && (lowerRightMove.moveId % 2 == 0) && elm.classList.item(0) == lowerRightMove.moveClass && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        } else if (elm.parentElement.id == (lowerRightMove.moveId + 1) && (lowerRightMove.moveId % 2 != 0) && elm.classList.item(0) == (lowerRightMove.moveClass + 1) && !elm.classList.contains('red') && !elm.classList.contains('black')) {
                            elm.classList.add('blue', 'toEat')
                            eat = true;
                        }
                    })
                    if (eat) {
                        tdyes.classList.add('eat')
                        eat = false
                    }
                }
            }
        })
    }
    highlightMove()
}

// Highlight Possible Move
function highlightMove() {
    validYes.forEach(function(tdyes) {
        if (tdyes.classList.contains('blue')) {
            tdyes.style.backgroundColor = 'lightblue'
        }
    })
}

// Checks winner
function checkForWin() {
    if (subblack.querySelector('h1').textContent == 0) {
        subred.style.borderWidth = "10px";
        subblack.style.borderWidth = "0px";
        turnText.style.color = "red";
        turnText.textContent = "Win";
        infoText.style.color = "red";
        infoText.textContent = "Red Win";
        winner = true;
    } else if (subred.querySelector('h1').textContent == 0) {
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
    } else {
        winsound.play()
        setTimeout(function() {
            reset()
        }, 10000)
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

// Play click sound
function playSound() {
    btnsound.play()
}

// Auto render when load Page
render();