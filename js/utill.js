'use strict'


function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

// function startInterval(callback, intervalTime) {
//     return setInterval(callback, intervalTime);
// }

// function getRandom(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }