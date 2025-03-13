'use strict'

var gBoard = []
var gCoveredMines = 0 

var gLevel = {
    SIZE: 4,
    MINES: 3
}

function onInit() {
    gCoveredMines = gLevel.MINES 
    gBoard = buildBoard()
    console.log('gBoard :', gBoard)
    renderBoard()
    updateMinesCounter() 
}

function buildBoard() {
    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isCovered: true,
                isMine: false,
                isMarked: false
            }
        }
    }

    var minePush = []
    while (minePush.length < gLevel.MINES) {
        var randRow = getRandomInt(0, gLevel.SIZE - 1)
        var randCol = getRandomInt(0, gLevel.SIZE - 1)
        var minePoint = `${randRow},${randCol}`

        if (!minePush.includes(minePoint)) {
            minePush.push(minePoint)
            board[randRow][randCol].isMine = true
        }
    }

    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (!board[i][j].isMine) {
                board[i][j].minesAroundCount = countMinesAround(board, i, j)
            }
        }
    }

    return board
}

function countMinesAround(board, row, col) {
    let minesCount = 0
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i < 0 || j < 0 || i >= gLevel.SIZE || j >= gLevel.SIZE) continue
            if (board[i][j].isMine) minesCount++
        }
    }
    return minesCount
}

function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gBoard[i].length; j++) {
            var className = 'isCovered'
            strHTML += `<td class="${className}"
                        " id="${i},${j}" 
                        onclick="onCellClicked(this)">
                        </td>`
        }
        strHTML += '</tr>'
    }
    document.querySelector('.center tbody').innerHTML = strHTML
}

function onCellClicked(elCell) {

    let [row, col] = elCell.id.split(',')
    row = +row
    col = +col
    const cell = gBoard[row][col]

    if (cell.isCovered) {
        cell.isCovered = false
        elCell.classList.replace('isCovered', 'isUncovered')

        if (cell.isMine) {
            elCell.innerHTML = `<img src="img/mine.png" alt="mine">`
            gCoveredMines--; 
            updateMinesCounter()
            gameOver()
        } else {
            elCell.innerText = cell.minesAroundCount > 0 ? cell.minesAroundCount : ''
        }
        revealNeighbors(row, col)
    }
}

function revealNeighbors(row, col) {
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i < 0 || j < 0 || i >= gLevel.SIZE || j >= gLevel.SIZE || (i === row && j === col)) continue

            const neighborCell = gBoard[i][j]
            const elNeighbor = document.getElementById(`${i},${j}`)

            if (neighborCell.isCovered) {
                neighborCell.isCovered = false
                elNeighbor.classList.replace('isCovered', 'isUncovered')
                if (neighborCell.isMine) {
                    elNeighbor.innerHTML = `<img src="img/mine.png" alt="mine">`
                    gCoveredMines--; // אם נחשף מוקש בשכנים, גם הוא נחשב
                    updateMinesCounter()
                } else {
                    elNeighbor.innerText = neighborCell.minesAroundCount > 0 ? neighborCell.minesAroundCount : ''
                }
            }
        }
    }
}

function updateMinesCounter() {
    const minesCountElement = document.querySelector('.mines-count');
    if (minesCountElement) {
        minesCountElement.innerText = `Coverd mines: ${gCoveredMines}`;
    } else {
        console.log("null");
    }
}
function revealBoard() {
    for (let i = 0; i < gLevel.SIZE; i++) {
        for (let j = 0; j < gLevel.SIZE; j++) {
            const cell = gBoard[i][j]
            const elCell = document.getElementById(`${i},${j}`)
            if (cell.isMine) {
                elCell.innerHTML = `<img src="img/mine.png" alt="mine">`
            } else {
                elCell.innerText = cell.minesAroundCount > 0 ? cell.minesAroundCount : ''
            }
            elCell.classList.replace('isCovered', 'isUncovered')
        }
    }
}

function gameOver() {
    revealBoard()
    setTimeout(() => {
        alert('Game Over')
        onInit() 
    }, 500)
}
