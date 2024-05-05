// Store gameboard as an array inside a Gameboard object.
const gameboard = (function () {
    const board = [];

    // Create 2d array to display gameboard in console
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(null);
        }
    }

    const getBoard = () => {
        return board;
    };

    const displayBoard = () => {
        console.log(board);
    };

    // Checks if location is a valid location first before placing symbol.
    const checkValidLocation = (value) => {
        switch (parseInt(value)) {
            case 1:
                if (board[0][0] === null)
                    return true;
                return false;
            case 2:
                if (board[0][1] === null)
                    return true;
                return false;
            case 3:
                if (board[0][2] === null)
                    return true;
                return false;
            case 4:
                if (board[1][0] === null)
                    return true;
                return false;
            case 5:
                if (board[1][1] === null)
                    return true;
                return false;
            case 6:
                if (board[1][2] === null)
                    return true;
                return false;
            case 7:
                if (board[2][0] === null)
                    return true;
                return false;
            case 8:
                if (board[2][1] === null)
                    return true;
                return false;
            case 9:
                if (board[2][2] === null)
                    return true;
                return false;
        }
    };

    const placeSymbol = (location, symbol) => {
        switch (location) {
            case 1:
                board[0][0] = symbol;
                break;
            case 2:
                board[0][1] = symbol;
                break;
            case 3:
                board[0][2] = symbol;
                break;
            case 4:
                board[1][0] = symbol;
                break;
            case 5:
                board[1][1] = symbol;
                break;
            case 6:
                board[1][2] = symbol;
                break;
            case 7:
                board[2][0] = symbol;
                break;
            case 8:
                board[2][1] = symbol;
                break;
            case 9:
                board[2][2] = symbol;
        }
    };

    // Should run after placeSymbol is ran to check the current board for a winner.
    const checkWinner = () => {
        // Check the 3 columns for winner
        for (let i = 0; i < 3; i++) {
            if (board[0][i] != null) {
                if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                    return board[0][i];
                }
            }
        }

        // Check the 3 rows for winner
        for (let j = 0; j < 3; j++) {
            if (board[j][0] != null) {
                if (board[j][0] === board[j][1] && board[j][0] === board[j][2]) {
                    return board[j][0];
                }
            }
        }
        
        // Checks the diagonal for winner
        if (board[0][0] === board[1][1] && board[0][0] === board[2][2])
            return board[0][0]
        if (board[0][2] === board[1][1] && board[0][2] === board[2][0])
            return board[0][2];

        return null; // Returns null (a falsy value) if no winners yet.
    };

    return {getBoard, displayBoard, placeSymbol, checkValidLocation, checkWinner};
})();


// Players will be stored in objects
function createPlayer (token, name) {
    const symbol = token; // Sets which player is X and which is O
    const playerName = name;

    const getSymbol = () => symbol;
    const getPlayerName = () => playerName;

    return {getSymbol, getPlayerName};
};


// GameController to control the flow and state of the game's turns, and checks if there is a winner.
function gameController(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    let board = gameboard;
    let turnCount = 0;

    const playerOne = createPlayer('O', playerOneName);
    const playerTwo = createPlayer('X', playerTwoName);
    

    let activePlayer = playerOne; // Default sets to player one as one will always go first.

    // Used to swap the the active player to alternate turns.
    const alternateTurns = () => {
        if (activePlayer === playerOne)
            activePlayer = playerTwo;
        else
            activePlayer = playerOne;
    };
    const getActivePlayer = () => activePlayer;

    // Displays current board and current player's turn.
    const updateBoard = () => {
        board.displayBoard();
        console.log(`${activePlayer.getPlayerName()}'s turn.`);
    };

    // Runs every round
    const play = () => {
        let location = prompt(`${activePlayer.getPlayerName}: Select a position for your token (value '1-9').`);

        let valid = board.checkValidLocation(location);
        // If valid = true (empty cell)
        if (valid) {
            board.placeSymbol(parseInt(location), activePlayer.getSymbol());

            // Checks for winner after token placement
            if (board.checkWinner()) {
                console.log(`${activePlayer.getPlayerName()} wins!`);
                return 0; // Ends the play function call
            }

            alternateTurns();
            updateBoard();
            turnCount++;
        } else {
            console.log('There is already a token at that location. Please choose another one.');
        }

        // Checks for tie scenario
        if (turnCount >= 9)
            console.log("It's a tie!");
    };

    updateBoard(); // Initial board display

    return {play, getActivePlayer};
};

// Runs the game
const game = gameController();