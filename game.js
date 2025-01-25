let gameRound = 1;
updateGameRound(gameRound);

function updateGameRound(roundNum) {
    gameRound++;
    const round = document.getElementById('round');
    round.textContent = `Round ${roundNum}`;
}

// create a headline
const text = "Four in a Row !";
const titleContenair = document.getElementById("titleContenair");
changTextStyle(text, titleContenair);

function changTextStyle(text, element) {
    let color = "red";
    let colorfulText = "";
    for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
            colorfulText += `<span style="color: ${color}"> </span>`;
        } else {
            colorfulText += `<span style="color: ${color}">${text[i]}</span>`;
            if (color === "red") {
                color = "yellow";
            } else {
                color = "red";
            }
        }
    }
    element.innerHTML = colorfulText;
    element.style.fontWeight = 'bold';
}

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

let flag = true;

function gameHandler(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (grid[row][col] === null) {
            grid[row][col] = currentPlayer;
            updatePannelDisplay(row, col);

            if (checkWinner(row, col, currentPlayer)) {

                updateGameRound(gameRound);
                // console.log(currentPlayer);
                updatePlayersScore(currentPlayer);
                checkFinalWinner();

                if (flag) {
                    const victoryAnimation = displayVictoryAnimation();
                    const grid = document.getElementById("grid");
                    grid.appendChild(victoryAnimation);
                    setTimeout(() => {
                        resetPannel();
                        // alert(`${currentPlayer} wins!`);
                    }, 800);
                }

            }
            currentPlayer = (currentPlayer === 1) ? 2 : 1;

            return
        }
    }
}



function updatePlayersScore(currentPlayer) {
    if (currentPlayer === 1) {
        playersScores[1] += 1;
        if (playersScores[1] === 1) {
            updateScoresDisplay(1, 0);
        } else {
            updateScoresDisplay(0, 0);
        }
    } else {
        playersScores[2] += 1;
        if (playersScores[2] === 1) {
            updateScoresDisplay(1, 1);
        } else {
            updateScoresDisplay(0, 1);
        }
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
    if (checkSuccessionColums(row, col, currentPlayer) || checkSuccessionRows(row, col, currentPlayer) ||
        checkSuccDiagLeft(row, col, currentPlayer) || checkSuccDiagRight(row, col, currentPlayer)) {
        return true
    }
    return false;
}
let index = 0;

function typeText(text, textElement, index = 0) {
    if (index < text.length) {
        textElement.textContent += text[index];
        setTimeout(() => typeText(text, textElement, index + 1), 100);
    }
}

function displayInstructions() {
    const instructions = document.getElementById('instructions');
    const instructionsText = `The young player is the starter.
    Each player takes turns inserting one disc into the board.
    The player must try to create a sequence of four discs in a row, column, or diagonal.
    The winner: The first player to create a sequence of 4 discs of the same color,
    twice out of three games.`;
    typeText(instructionsText, instructions);
}
displayInstructions();


function checkFinalWinner() {
    Object.entries(playersScores).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
        if (value === 2) {
            finalGame();
        }
    });
}

function finalGame() {
    const round = document.getElementById('round');
    round.style.display = 'none';
    const confettiContainer = createConfettiAnimation();
    const grid = document.getElementById("grid");
    grid.appendChild(confettiContainer);
    flag = false;
}

function resetPannel() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
            cell.classList.remove("player1");
            cell.classList.remove("player2");
            grid[row][col] = null;
        }
    }
}

function createConfettiAnimation() {

    const container = document.createElement('div');
    container.style.width = '620px';
    container.style.height = '460px';
    container.style.position = 'absolute';
    container.style.overflow = 'hidden';

    const messageContainer = document.createElement('div');
    const message1 = document.createElement('p');
    const message2 = document.createElement('p');
    changTextStyle(`player${currentPlayer}`, message1);
    changTextStyle(`is the winner!`, message2);
    message1.classList.add('messege');
    message2.classList.add('messege');
    messageContainer.classList.add('messageContainer');
    messageContainer.appendChild(message1);
    messageContainer.appendChild(message2);
    container.appendChild(messageContainer);

    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = Math.floor(Math.random() * 10 + 5) + 'px';
        confetti.style.height = Math.floor(Math.random() * 10 + 5) + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.floor(Math.random() * 620) + 'px';
        confetti.style.top = Math.floor(Math.random() * -460) + 'px';
        confetti.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
        confetti.style.animation = 'fall ' + (Math.random() * 3 + 3) + 's linear infinite';
        container.appendChild(confetti);
    }

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fall {
        0% { top: -10%; }
        100% { top: 110%; }
      }
    `;
    document.head.appendChild(style);

    return container;
}

function createGridScores() {
    const gridContenair = document.getElementById('scoresGrid');
    gridContenair.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
    gridContenair.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.style.display = 'none';
            gridContenair.appendChild(cell);
        }
    }
}
createGridScores();


function updateScoresDisplay(row, col) {
    const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
    if (cell) {
        cell.classList.add(`player${currentPlayer}`);
        cell.style.display = 'block';
    }
    checkFinalWinner();
}


function displayVictoryAnimation() {
    const container = document.createElement('div');
    container.style.width = '620px';
    container.style.height = '460px';
    container.style.position = 'absolute';
    container.style.overflow = 'hidden';
    container.style.backgroundColor = '#7b1fa2bf';

    const circleDelay = 200;
    for (let i = 0; i < 4; i++) {
        const circle = document.createElement('div');
        circle.style.width = '60px';
        circle.style.height = '60px';
        if (currentPlayer === 1) {
            circle.style.backgroundColor = 'red';
        } else {
            circle.style.backgroundColor = 'yellow';
        }
        circle.style.borderRadius = '50%';
        circle.style.position = 'absolute';
        circle.style.top = '-80px';
        circle.style.left = `${170 + i * 70}px`;

        circle.style.animation = `fall${i} 1s ${i * circleDelay}ms ease-in-out forwards, bounce${i} 0.5s ${(i * circleDelay) + 1000}ms ease-in-out forwards`;
        container.appendChild(circle);

        const fallAnimation = document.createElement('style');
        fallAnimation.innerHTML = `
        @keyframes fall${i} {
          0% { top: -80px; }
          100% { top: 350px; }
        }
      `;
        document.head.appendChild(fallAnimation);

        const bounceAnimation = document.createElement('style');
        bounceAnimation.innerHTML = `
          @keyframes bounce${i} {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
        `;
        document.head.appendChild(bounceAnimation);
    }

    const victoryContainer = document.createElement('div');
    victoryContainer.classList.add('messageContainer');

    const victoryMessage = document.createElement('h1');
    changTextStyle('Victory!', victoryMessage);
    victoryMessage.classList.add('messege');
    victoryMessage.style.textAlign = 'center';

    victoryContainer.appendChild(victoryMessage);

    const continueButton = document.createElement('button');
    continueButton.classList.add('message');
    continueButton.textContent = 'Next round';
    continueButton.style.backgroundColor = '#7b1fa2bf';
    continueButton.style.color = 'white';
    continueButton.style.border = '1px solid white';
    continueButton.style.padding = '5px 10px';
    continueButton.style.borderRadius = '8px';
    continueButton.style.cursor = 'pointer';
    continueButton.addEventListener('click', () => {
        container.style.display = 'none';
    });
    victoryContainer.appendChild(continueButton);

    container.appendChild(victoryContainer);

    return container;
}