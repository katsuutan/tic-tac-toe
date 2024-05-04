// Store gameboard as an array inside a Gameboard object.
const gameboard = (function () {
    const board = [];

    // Create 2d array to display gameboard in console
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push('');
        }
    }

    const getBoard = () => {
        return board;
    };

    const displayBoard = () => {
        console.log(board);
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

    return {getBoard, displayBoard, placeSymbol};
})();


// Players will be stored in objects
function createPlayer (team, name) {
    const symbol = team; // Sets which player is X and which is O
    const playerName = name;

    const getSymbol = () => symbol;

    const getPlayerName = () => playerName;

    return {getSymbol, getPlayerName};
};

function symbol() {

}


// GameController to control the flow and state of the game's turns, and checks if there is a winner.
function gameController(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    let board = gameboard;

    const playerOne = createPlayer('O', playerOneName);
    const playerTwo = createPlayer('X', playerTwoName);
    

    let activePlayer = playerOne;

    const getActivePlayer = () => activePlayer;

    const alternateTurns = () => {
        if (activePlayer === playerOne)
            activePlayer = playerTwo;
        else
            activePlayer = playerOne;
    };

    const updateBoard = () => {
        board.displayBoard();
    };

    const play = () => {
        let location = prompt("Select a position for your token (value '1-9').");
        
        board.placeSymbol(parseInt(location), activePlayer.getSymbol());

        alternateTurns();
        updateBoard();
    };

    return {play, getActivePlayer};
};

// Runs the game
const game = gameController();