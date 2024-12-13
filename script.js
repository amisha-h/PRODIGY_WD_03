const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restart');
const startGameButton = document.getElementById('startGame');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = false;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

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
    if (!gameActive) return;
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '') return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            highlightWinningCells(a, b, c);
            break;
        }
    }

    if (roundWon) {
        messageDisplay.textContent = `${getPlayerName(currentPlayer)} wins! 🎉`;
        updateScore(currentPlayer);
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        messageDisplay.textContent = 'It\'s a draw! 😢';
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

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXDisplay.textContent = `Player X: ${scoreX}`;
    } else {
        scoreO++;
        scoreODisplay.textContent = `Player O: ${scoreO}`;
    }
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

function startGame() {
    if (!playerXInput.value || !playerOInput.value) {
        alert('Please enter names for both players');
        return;
    }
    gameActive = true;
   
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
startGameButton.addEventListener('click', startGame);
