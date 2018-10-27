// html elements
const htmlBoard = document.querySelector('#board');
const winnerMessageContainer = document.querySelector('#winner-message-container');

// colors object
const colors = {
  empty: 'empty',
  red: 'red',
  yellow: 'yellow',
};

// gameSettings object
const gameSettings = {
  columns: 7,
  rows: 6,
};

// gameState object
const gameState = {
  turn: null,
  winner: null,
  winnerColor: null,
  board: null,
};

// function related to gameState
function makeSquareObject(squareColor, squareWinner, col, row) {
  return {
    color: squareColor,
    winner: squareWinner,
    colIndex: parseInt(col),
    rowIndex: parseInt(row),
  };
}

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

function initGameState() {
  gameState.turn = colors.yellow;
  gameState.winner = false;
  gameState.winnerColor = null;
  gameState.board = initBoard();
}

function changeTurn() {
  if (gameState.turn === colors.red) {
    gameState.turn = colors.yellow;
  } else {
    gameState.turn = colors.red;
  }
}

function addWinnerToBoard(winnerArray) {
  winnerArray.forEach(function (square) {
    gameState.board[square.colIndex][square.rowIndex].winner = true;
  });
}

function indexOfFirstEmptySquare(squareArray) {
  for (let i = 0; i < squareArray.length; i++) {
    if (squareArray[i].color === colors.empty) {
      return i;
    }
  }
  return false;
}

// functions related to changing HTML
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

function drawTurn() {
  htmlBoard.dataset.turn = gameState.turn;
}

function drawWinnerMessage() {
  if (gameState.winner) {
    winnerMessageContainer.textContent = `${gameState.winnerColor} has won!!`;
  } else {
    winnerMessageContainer.textContent = '';
  }
}

function resetGame() {
  initGameState();
  drawBoard();
  drawTurn();
  drawWinnerMessage();
}

// functions related to finding winner

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

function getWinners(squareArrays) {
  let groups = [];

  squareArrays.forEach(function (squareArray) {
    groups = groups.concat(splitArrayInGroups(squareArray));
  });

  return groups.filter(function (group) {
    return group.length >= 4 && group[0].color !== colors.empty;
  });
}

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

function winnerCheck() {
  const winners = searchForWinners();
  if (winners.length > 0) {
    gameState.winnerColor = winners[0][0].color;
    gameState.winner = true;
    winners.forEach(addWinnerToBoard);
  }
}

function dropStone(event) {
  if (gameState.winner) {
    resetGame();
  } else if (event.target.matches('.row,.col')) {
    const clickedHtmlCol = event.target.closest('.col');
    const colIndex = parseInt(clickedHtmlCol.dataset.index);
    const rowIndex = indexOfFirstEmptySquare(gameState.board[colIndex]);
    if (rowIndex !== false) {
      gameState.board[colIndex][rowIndex].color = gameState.turn;
      winnerCheck();
      drawBoard();
      if (gameState.winner) {
        drawWinnerMessage(gameState);
      } else {
        changeTurn();
        drawTurn(gameState);
      }
    }
  }
}

initGameState();
drawBoard();
htmlBoard.addEventListener('click', dropStone);
