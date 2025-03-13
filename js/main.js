'use strict'

var gBoard = []
var gLevel = {
    SIZE: 8,
    MINES: 3  
}

function onInit() {
    gBoard = buildBoard()
    console.log('gBoard :', gBoard)
    renderBoard()

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

    // bora[0][3].isMine = true
    // bora[1][2].isMine = true
    // bora[3][0].isMine = true
    

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
            strHTML += `<td class="${className}" id="${i},${j}" onclick="onCellClicked(this)"></td>`
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
            const neighborEl = document.getElementById(`${i},${j}`)

            if (neighborCell.isCovered) {
                neighborCell.isCovered = false
                neighborEl.classList.replace('isCovered', 'isUncovered')
                if (neighborCell.isMine) {
                    neighborEl.innerHTML = `<img src="img/mine.png" alt="mine">`
                } else {
                    neighborEl.innerText = neighborCell.minesAroundCount > 0 ? neighborCell.minesAroundCount : ''
                }
            }
        }
    }
}

function gameOver() {
    onInit() 
    alert('Game Over!')
   
}
