'use strict'


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
    minesAroundCount: 0,
    isCovered: true,
    isMine: false,
    isMarked: false
}



function onInit() { // Called when page loads
    gBoard = buildBoard()
    console.log('gBoard :', gBoard)
    // console.table(gBoard);
    renderBoard(gBoard)
}



function buildBoard() {  // Builds the board   Set some mines Call setMinesNegsCount()Return the created board

    // setMinesNegsCount()

    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            // console.log('index:', i, j);
            board[i][j] = {
                minesAroundCount: 0,
                isCovered: true,
                isMine: false,
                isMarked: false
            }


        }
    }

    board[2][2].isMine = true;
    board[2][3].isMine = true;

    // console.table(board);
    return board

}

function renderBoard(gBoard) {
    var strHTML = ''

    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]

            var cellImg = "img/mine.png";
            var className = 'isCovered'

            const row = `${i}`
            const col = `${j}`

            //  console.log('tdid:' ,tdId)
            strHTML += `<td class="${className}"
                             id="${row},${col}" 
                             onclick="onCellClicked(this,${row},${col})"${cell}>
                            <img src="${cellImg}" alt="">
                        </td>`
        }
        strHTML += '</tr>'
    }
    // console.log('strHTML:', cell)
    const elMat = document.querySelector('.center')
    elMat.innerHTML = strHTML
}



function onCellClicked(elCell, row, col) {  //Called when a cell is clicked
    gBoard[row][col].isMarked = true;
    gBoard[row][col].isCovered = false;

    const cell = gBoard[row][col]

if (cell.isMarked) { 
    elCell.classList.replace('isCovered', 'isMarked');
} else elCell.classList.replace('isMarked', 'isCovered');

   
    console.log('id:', elCell.id, ' i:', row, ' j:', col)
    
    console.log('marked :', elCell.classList.isMarked)

    console.log('gBoard :', gBoard)
}


