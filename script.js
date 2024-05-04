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
    // CURRENT BUG: ALWAYS RETURN FALSE???
    const checkValidLocation = (value) => {
        switch (parseInt(value)) {
            case 1:
                if (board[0][0])
                    return true;
                return false;
            case 2:
                if (board[0][1])
                    return true;
                return false;
            case 3:
                if (board[0][2])
                    return true;
                return false;
            case 4:
                if (board[1][0])
                    return true;
                return false;
            case 5:
                if (board[1][1])
                    return true;
                return false;
            case 6:
                if (board[1][2])
                    return true;
                return false;
            case 7:
                if (board[2][0])
                    return true;
                return false;
            case 8:
                if (board[2][1])
                    return true;
                return false;
            case 9:
                if (board[2][2])
                    return true;
                return false;
        };
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
        console.log ('placeSymbol ran correctly');
    };

    return {getBoard, displayBoard, placeSymbol, checkValidLocation};
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

    const playerOne = createPlayer('O', playerOneName);
    const playerTwo = createPlayer('X', playerTwoName);
    

    let activePlayer = playerOne;

    const alternateTurns = () => {
        if (activePlayer === playerOne)
            activePlayer = playerTwo;
        else
            activePlayer = playerOne;
    };
    const getActivePlayer = () => activePlayer;

    const updateBoard = () => {
        board.displayBoard();
        console.log(`${activePlayer.getPlayerName()}'s turn.`);
    };

    const play = () => {
        let location = prompt("Select a position for your token (value '1-9').");
    
        let valid = board.checkValidLocation(location);
        if (valid) {
            board.placeSymbol(parseInt(location), activePlayer.getSymbol());

            alternateTurns();
            updateBoard();
        } else {
            console.log('There is already a token at that location. Please choose another one.');
            updateBoard();
        }
    };

    updateBoard();

    return {play, getActivePlayer};
};

// Runs the game
const game = gameController();