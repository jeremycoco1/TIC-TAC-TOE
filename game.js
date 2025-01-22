// // Handle player move



const text = "Four in a Row !";

const titleContenair= document.getElementById("titleContenair");

let colorfulText = ""; 
for (let i = 0; i < text.length; i++) {
    if (i % 2 === 0 ) {
        colorfulText += `<span style="color: red;">${text[i]}</span>`;
    } else {
        colorfulText += `<span style="color: yellow;">${text[i]}</span>`;
    }
}

titleContenair.innerHTML = colorfulText;

const ROWS = 6;
const COLS = 7;
let currentPlayer = 1;
let playersScores = {
    1: 0,
    2: 0
};

const grid = Array.from({
    length: ROWS
}, () => Array(COLS).fill(null));
console.log(grid)

function start() {

}

function createGridPannel() {
    const gridContenair = document.getElementById('grid');
    gridContenair.style.display = 'grid';
    gridContenair.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
    gridContenair.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => gameHandler(col));
            gridContenair.appendChild(cell);

        }
    }
}
createGridPannel()

function gameHandler(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (grid[row][col] === null) {
            grid[row][col] = currentPlayer;
            updatePannelDisplay(row, col);
            if (checkWinner(row, col, currentPlayer)) {
                console.log(currentPlayer)
                setTimeout(() => {
                    alert(`${currentPlayer} wins!`);
                }, 1000);
                updatePlayersScore(currentPlayer)
             
            }
            currentPlayer = (currentPlayer === 1) ? 2 : 1;

            return
        }
    }
}
function updatePlayersScore(currentPlayer){
    if (currentPlayer === 1) {
        playersScores[1] += 1;
    } else {
        playersScores[2] += 1;
    }
    console.log(playersScores)
}
function updatePannelDisplay(row, col) {
    const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
    if (cell) {
        cell.classList.add(`player${currentPlayer}`)
    }

}

function checkSuccessionColums(row, col, currentPlayer) {

    for (let i = 1; i < 4; i++) {
        if (row > 2) return false
        if (grid[row + i][col] !== currentPlayer) return false
    }
    return true
}

function checkSuccessionRows(row, col, currentPlayer) {
    let counter = 1;


    for (let i = 1; i < 4; i++) {
        if (col + i >= grid[0].length) break;
        if (grid[row][col + i] === currentPlayer) {
            counter++;
        } else {
            break;
        }
    }


    for (let i = 1; i < 4; i++) {
        if (col - i < 0) break;
        if (grid[row][col - i] === currentPlayer) {
            counter++;
        } else {
            break;
        }
    }


    return counter >= 4;
}

function checkSuccDiagLeft(row, col, currentPlayer) {
    const rows = grid.length; // Nombre de lignes
    const cols = grid[0].length; // Nombre de colonnes

    // Vérification pour la diagonale descendante (\)
    let counter = 1; // Compte le jeton actuel

    // Diagonale descendante vers le bas-droite
    for (let i = 1; i < 4; i++) {
        if (row + i >= grid.length || col + i >= grid[0].length) break;
        if (grid[row + i][col + i] === currentPlayer) {
            counter++;
        } else {
            break;
        }
    }

    // Diagonale descendante vers le haut-gauche
    for (let i = 1; i < 4; i++) {
        if (row - i < 0 || col - i < 0) break;
        if (grid[row - i][col - i] === currentPlayer) {
            counter++;
        } else {
            break;
        }
    }

    // Retour si 4 jetons sont alignés dans cette diagonale
    if (counter >= 4) return true;
}

function checkSuccDiagRight(row, col, currentPlayer) {
    counter = 1;

    // Diagonale montante vers le bas-gauche
    for (let i = 1; i < 4; i++) {
        if (row + i >= grid.length || col - i < 0) break;
        if (grid[row + i][col - i] === currentPlayer) {
            counter++;
        } else {
            break;
        }
    }

    // Diagonale montante vers le haut-droite
    for (let i = 1; i < 4; i++) {
        if (row - i < 0 || col + i >= grid[0].length) break;
        if (grid[row - i][col + i] === currentPlayer) {
            counter++;
        } else {
            break;
        }
    }

    // Retour si 4 jetons sont alignés dans cette diagonale
    return counter >= 4;
}

function checkWinner(row, col, currentPlayer) {
    if (checkSuccessionColums(row, col, currentPlayer) ||
        checkSuccessionRows(row, col, currentPlayer) || checkSuccDiagLeft(row, col, currentPlayer) || checkSuccDiagRight(row, col, currentPlayer)) {
        return true
    }
    return false;
}

function updateScoreDisplay() {}

function reset() {

}