const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restart');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            highlightWinningCells(a, b, c);
            break;
        }
    }

    if (roundWon) {
        messageDisplay.textContent = `${getPlayerName(currentPlayer)} wins! 🎉`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        messageDisplay.textContent = 'Oops! Nobody won. It\'s a draw! 😢';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function highlightWinningCells(a, b, c) {
    cells[a].classList.add('winning');
    cells[b].classList.add('winning');
    cells[c].classList.add('winning');
}

function getPlayerName(player) {
    return player === 'X' ? playerXInput.value || 'Player X' : playerOInput.value || 'Player O';
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    messageDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winning');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
