// html elements
const htmlBoard = document.querySelector('#board');
const messageContainer = document.querySelector('#winner-message-container');

/**
 * contains all possible colors of our squares
 * @type {{empty: string, red: string, yellow: string}}
 */
const colors = {
  empty: 'empty',
  red: 'red',
  yellow: 'yellow',
};

/**
 * contains the settings of our game
 * columns is the number of columns
 * row is the number of rows
 * @type {{columns: number, rows: number}}
 */
const gameSettings = {
  columns: 7,
  rows: 6,
};

/**
 * The gameState object contains all the information about our game:
 * turn is a colors item, and determines which color can play next
 * winner is a boolean which is true when the game is over and there is a winner
 * winnerColor contains the color of the winner (when there is no winner it should be null)
 * board contains our board which is an array with arrays with squares look at github for more info
 * @type {{turn: null|colors, winner: boolean, winnerColor: null|colors, full: boolean, board: null|board}}
 */
const gameState = {
  turn: null,
  winner: false,
  winnerColor: null,
  full: false,
  board: null,
};

/**
 * creates new squares for our board
 * @param {string} squareColor -> one of the colors from the colors object
 * @param {boolean} squareWinner -> true or false
 * @param {number|string} col -> column index (0 >= col < gameSettings.columns)
 * @param {number|string} row -> row index
 * @returns {{color: string, winner: boolean, colIndex: number, rowIndex: number}}
 */
function makeSquareObject(squareColor, squareWinner, col, row) {
  return {
    color: squareColor,
    winner: squareWinner,
    colIndex: parseInt(col),
    rowIndex: parseInt(row),
  };
}

/**
 * creates a new board with empty squares (with color empty)
 * uses the gameSettings to determine the number of cols and rows
 * @returns {Array} -> board
 */
function initBoard() {
  const colsCount = gameSettings.columns;
  const rowsCount = gameSettings.rows;
  const newBoard = [];

  for (let colIndex = 0; colIndex < colsCount; colIndex++) {
    const newCol = [];
    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      newCol.push(makeSquareObject(colors.empty, false, colIndex, rowIndex));
    }
    newBoard.push(newCol);
  }
  return newBoard;
}

/**
 * Set up initial gameState
 * empty Board
 * yellow always starts
 * no winner
 * no winnerColor
 * not full
 */
function initGameState() {
  gameState.turn = colors.yellow;
  gameState.winner = false;
  gameState.winnerColor = null;
  gameState.full = false;
  gameState.board = initBoard();
}

/**
 * change gameState.turn (if red then yellow and the other way around)
 */
function changeTurn() {
  if (gameState.turn === colors.red) {
    gameState.turn = colors.yellow;
  } else {
    gameState.turn = colors.red;
  }
}

/**
 * loop over all squares in the winner Array and
 * update the corresponding squares on the gameState.board (square.winner = true)
 * @param winnerArray -> array of squares
 */
function addWinnerToBoard(winnerArray) {
  winnerArray.forEach(function (square) {
    gameState.board[square.colIndex][square.rowIndex].winner = true;
  });
}

/**
 * returns the index of the first square that is not empty (square.color !== colors.empty)
 * or false if none are empty
 * @param squareArray
 * @returns {int|boolean}
 */
function indexOfFirstEmptySquare(squareArray) {
  for (let i = 0; i < squareArray.length; i++) {
    if (squareArray[i].color === colors.empty) {
      return i;
    }
  }
  return false;
}

/**
 * uses the gameState.board to change the data attributes in index.html
 * (select corresponding element and change with element.dataSet.color and element.dataSet.winner)
 */
function drawBoard() {
  gameState.board.forEach(function (boardCol, colIndex) {
    const htmlCol = document.querySelector(`.col[data-index="${colIndex}"]`);
    boardCol.forEach(function (square, rowIndex) {
      const htmlSquare = htmlCol.querySelector(`.row[data-index="${rowIndex}"]`);
      htmlSquare.dataset.color = square.color;
      htmlSquare.dataset.winner = square.winner;
    });
  });
}

/**
 * uses gameState.turn to update the data attribute in index.html
 * (htmlBoard is already defined)
 */
function drawTurn() {
  htmlBoard.dataset.turn = gameState.turn;
}

/**
 * Writes messages for the winner of if it's a draw in thw messageContainer
 * If there is no winner and the board is not full empty the messageContainer
 * (messageContainer is already defined)
 */
function drawMessage() {
  if (gameState.winner) {
    messageContainer.textContent = `${gameState.winnerColor} has won!!`;
  } else if (gameState.full) {
    messageContainer.textContent = `It's a draw!! Keep going!!`;
  } else {
    messageContainer.textContent = '';
  }
}

/**
 * resets the gameState and changes index.html correspondingly
 */
function resetGame() {
  initGameState();
  drawBoard();
  drawTurn();
  drawMessage();
}

/**
 * This is part of my solution for searching for winners (4 squares with the same color side by side)
 * you pass an array with squares to this function and this function splits that array into groups
 * each group contains squares with the same colour that are side by side
 * [yellow, yellow, red, empty, empty, empty] should return
 * [[yellow, yellow], [red], [empty, empty, empty]]
 * @param array
 * @returns {Array}
 */
function splitArrayInGroups(array) {
  const groups = [];
  array.forEach(function (square) {
    const currentGroup = groups[groups.length - 1];
    if (currentGroup && currentGroup[currentGroup.length - 1].color === square.color) {
      currentGroup.push(square);
    } else {
      groups.push([square]);
    }
  });

  return groups;
}

/**
 * Input is an array with arrays containing rows, columns and diagonals of the board
 * This function splits all these arrays into groups (splitArrayInGroups)
 * And then filters these groups for length >= 4 && square.empty !== colors.empty
 * @param squareArrays
 * @returns {*[]}
 */
function getWinners(squareArrays) {
  let groups = [];

  squareArrays.forEach(function (squareArray) {
    groups = groups.concat(splitArrayInGroups(squareArray));
  });

  return groups.filter(function (group) {
    return group.length >= 4 && group[0].color !== colors.empty;
  });
}

/**
 * This function is a helper function I use to make arrays from the rows and diagonals of the board
 * For example if you want an array of the first row you would run it with following params
 * makeSearchArray(0,0,1,0);
 * Think about it!!!
 * @param startColIndex
 * @param startRowIndex
 * @param colIncrement
 * @param rowIncrement
 * @returns {Array}
 */
function makeSearchArrays(startColIndex, startRowIndex, colIncrement, rowIncrement) {
  const newSearchArray = [];
  let colIndex = startColIndex;
  let rowIndex = startRowIndex;
  while (colIndex < gameSettings.columns
  && rowIndex < gameSettings.rows
  && colIndex >= 0 && rowIndex >= 0) {
    newSearchArray.push(gameState.board[colIndex][rowIndex]);
    colIndex += colIncrement;
    rowIndex += rowIncrement;
  }
  return newSearchArray;
}

/**
 * This function uses makeSearchArrays() to split the board up
 * into arrays containing all rows, cols, and diagonals
 * then uses getWinners() to filter these for winning combinations
 * @returns {*[]}
 */
function searchForWinners() {
  const searchArrays = [].concat(gameState.board);

  for (let rowIndex = 0; rowIndex < gameSettings.rows; rowIndex++) {
    searchArrays.push(makeSearchArrays(0, rowIndex, 1, 0));
    searchArrays.push(makeSearchArrays(0, rowIndex, 1, 1));
    searchArrays.push(makeSearchArrays(0, rowIndex, 1, -1));
    searchArrays.push(makeSearchArrays(gameSettings.columns - 1, rowIndex, -1, 1));
    searchArrays.push(makeSearchArrays(gameSettings.columns - 1, rowIndex, -1, -1));
  }
  return getWinners(searchArrays);
}

/**
 * This function searches for winners (searchForWinners())
 * If there are winners then change the gameState (gameState.winnerColor, gameState.winner)
 * Then adds the winners to the board (addWinnerToBoard())
 */
function winnerCheck() {
  const winners = searchForWinners();
  if (winners.length > 0) {
    gameState.winnerColor = winners[0][0].color;
    gameState.winner = true;
    winners.forEach(addWinnerToBoard);
  }
}

/**
 * Checks if the board is full (no square has color === colors.empty)
 */
function fullCheck() {
  gameState.full = gameState.board.reduce(function (fullBoard, col) {
    return col.reduce(function (fullCol, square) {
      if (fullCol) {
        return square.color !== colors.empty;
      }
      return fullCol;
    }, fullBoard);
  }, true);
}

/**
 * This function runs when a user clicks the board
 * =>
 * If gamesState.winner or gameState.full then resetGame()
 * Otherwise change the correct square
 * Then check for winners (winnerCheck())
 * Then check for a full board (fullCheck())
 * Then draw the changes to the board and if necessary also a message
 * (drawBoard() and drawMessage())
 * Change the turn (changeTurn())
 * Draw the turn (drawTurn())
 * @param event
 */
function dropStone(event) {
  if (gameState.winner || gameState.full) {
    resetGame();
  } else if (event.target.matches('.row,.col')) {
    const clickedHtmlCol = event.target.closest('.col');
    const colIndex = parseInt(clickedHtmlCol.dataset.index);
    const rowIndex = indexOfFirstEmptySquare(gameState.board[colIndex]);
    if (rowIndex !== false) {
      gameState.board[colIndex][rowIndex].color = gameState.turn;
      winnerCheck();
      fullCheck();
      drawBoard();
      if (gameState.winner || gameState.full) {
        drawMessage();
      } else {
        changeTurn();
        drawTurn();
      }
    }
  }
}


initGameState();
drawBoard();
htmlBoard.addEventListener('click', dropStone);
