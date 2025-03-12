'use strict'


const isMine = '*'

// gGame = { 
//     isOn: false, 
//     revealedCount: 0, 
//     markedCount: 0, 
//     secsPassed: 0 
// } 

var gLevel = { 
    SIZE: 4, 
    MINES: 2 
}

var gBoard = { 
    minesAroundCount: 4, 
    isCovered: true, 
    isMine: false, 
    isMarked: false 
} 



function onInit()  { // Called when page loads
    buildBoard()
    renderBoard(gBoard)
}

 

function buildBoard() {  // Builds the board   Set some mines Call setMinesNegsCount()Return the created board
 
    // setMinesNegsCount()

    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []

        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 4, 
                isCovered: true, 
                isMine: false, 
                isMarked: false 
            }
            
            
        }
    }

    board[2][2].isMine = true ;    
    board[2][3].isMine = true ;    

    console.table(board)
    console.log(board);
    
    return board

}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        const row = board[i]
        strHTML += '<tr>'
        for (var j = 0; j < row.length; j++) {
            const cell = row[j]
            var className = ((i + j) % 2 === 0) ? 'white' : 'black'
            const tdId = `cell-${i}-${j}`

            strHTML += `<td id="${tdId}" 
                            onclick="onCellClicked(this)" 
                            class="${className}">
                            ${cell}
                        </td>`
        }
        strHTML += '</tr>'
    }
    const elMat = document.querySelector('.game-board')
    elMat.innerHTML = strHTML
}

//  function setMinesNegsCount(board) Count mines around each cell minesAroundCount


// renderBoard(board)  //Render the board as a <table> to the page


// onCellClicked(elCell, i, j) Called when a cell is clicked


// onCellMarked(elCell) Called when a cell is right- clicked See how you can hide the context menu on right click
 

// checkGameOver() The game ends when all mines are marked, and all the other cells are revealed

// expandReveal(board, elCell,  i, j) When the user clicks a cell with no mines around, reveal not only that cell, but also its neighbors.  
// NOTE: start with a basic implementation that only reveals the non-mine 1st degree neighbors BONUS: Do it like the real 
// algorithm (see description at the Bonuses section below)








   
 



// function onCellClicked(elCell) {
//     // console.log('elCell:', elCell)

//     // TODO: if the target is marked - move the piece!
//     if (elCell.classList.contains('mark')) {
//         // console.log('move piece')
//         movePiece(gSelectedElCell, elCell)
//         cleanBoard()
//         return
//     }

//     cleanBoard()

//     elCell.classList.add('selected')

//     // Saving in a global variable
//     gSelectedElCell = elCell
//     // console.log('elCell.id:', elCell.id)
//     const cellCoord = getCellCoord(elCell.id)
//     // console.log('cellCoord:', cellCoord)

//     const piece = gBoard[cellCoord.i][cellCoord.j]
//     // console.log('piece:', piece)

//     // Another way
//     // const piece = elCell.innerText

//     var possibleCoords = []
//     switch (piece) {
//         case ROOK_BLACK:
//         case ROOK_WHITE:
//             possibleCoords = getAllPossibleCoordsRook(cellCoord)
//             break
//         case BISHOP_BLACK:
//         case BISHOP_WHITE:
//             possibleCoords = getAllPossibleCoordsBishop(cellCoord)
//             break
//         case KNIGHT_BLACK:
//         case KNIGHT_WHITE:
//             possibleCoords = getAllPossibleCoordsKnight(cellCoord)
//             break
//         case PAWN_BLACK:
//         case PAWN_WHITE:
//             possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE)
//             break

//     }
//     markCells(possibleCoords)
// }

// function movePiece(elFromCell, elToCell) {
//     // console.log('elFromCell:', elFromCell)
//     // console.log('elToCell:', elToCell)

//     const fromCoord = getCellCoord(elFromCell.id)
//     // console.log('fromCoord:', fromCoord)
//     const toCoord = getCellCoord(elToCell.id)
//     // console.log('toCoord:', toCoord)

//     // update the MODEl
//     const piece = gBoard[fromCoord.i][fromCoord.j]
//     gBoard[fromCoord.i][fromCoord.j] = ''
//     gBoard[toCoord.i][toCoord.j] = piece

//     // update the DOM
//     elFromCell.innerText = ''
//     elToCell.innerText = piece


// }

// function markCells(coords) {
//     for (var i = 0; i < coords.length; i++) {
//         var coord = coords[i]
//         var selector = getSelector(coord)
//         var elCell = document.querySelector(selector)
//         elCell.classList.add('mark')
//     }
// }

// // Gets a string such as: 'cell-2-7' and returns {i:2, j:7}
// function getCellCoord(strCellId) {
//     const coord = {}
//     const parts = strCellId.split('-') // ['cell','2','7']
//     coord.i = +parts[1]
//     coord.j = +parts[2]
//     return coord
// }

// function cleanBoard() {
//     const elTds = document.querySelectorAll('.mark, .selected')
//     for (var i = 0; i < elTds.length; i++) {
//         elTds[i].classList.remove('mark', 'selected')
//     }
// }

// function getSelector(coord) {
//     return `#cell-${coord.i}-${coord.j}`
// }

// function isEmptyCell(coord) {
//     return gBoard[coord.i][coord.j] === ''
// }

// function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
//     // console.log('pieceCoord:', pieceCoord)
//     // console.log('isWhite:', isWhite)

//     var res = []
//     var diff = (isWhite) ? -1 : 1
//     var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }

//     if (isEmptyCell(nextCoord)) res.push(nextCoord)
//     else return res

//     if (pieceCoord.i === 1 && !isWhite || pieceCoord.i === 6 && isWhite) {
//         diff *= 2
//         nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
//         if (isEmptyCell(nextCoord)) res.push(nextCoord)
//     }
//     // console.log('res:', res)
//     return res
// }

// function getAllPossibleCoordsRook(pieceCoord) {
//     var res = []

//     return res
// }

// function getAllPossibleCoordsBishop(pieceCoord) {
//     var res = []

//     return res
// }

// function getAllPossibleCoordsKnight(pieceCoord) {
//     var res = []

//     return res
// }
