const squares = document.querySelectorAll('.square');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-btn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Check for a winner
const checkWinner = () => {
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameStatus.textContent = `${currentPlayer} wins!`;
            isGameActive = false;
            return;
        }
    }

    // Check for a draw
    if (!gameBoard.includes('')) {
        gameStatus.textContent = "It's a draw!";
        isGameActive = false;
    }
};

// Handle a square click
const handleSquareClick = (index) => {
    if (gameBoard[index] === '' && isGameActive) {
        gameBoard[index] = currentPlayer;
        squares[index].textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `${currentPlayer}'s turn`;
    }
};

// Restart the game
const restartGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    gameStatus.textContent = "Player X's turn";
    squares.forEach(square => square.textContent = '');
};

// Add event listeners to each square
squares.forEach((square, index) => {
    square.addEventListener('click', () => handleSquareClick(index));
});

// Restart the game when the button is clicked
restartButton.addEventListener('click', restartGame);
