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
 return{
   color:squareColor,
   winner:squareWinner,
   colIndex:parseInt(col),
   rowIndex:parseInt(row)
 }
}

/**
 * creates a new board with empty squares (with color empty)
 * uses the gameSettings to determine the number of cols and rows
 * @returns {Array} -> board
 */
function initBoard() {
  //dubbele lus
  const rowCount= gameSettings.rows;
  const colCount=gameSettings.columns;
  const board=[];

  for(let i=0;i<colCount;i++){
    rowArray=[]
      for(let j=0;j<rowCount;j++){
        rowArray.push(makeSquareObject(colors.empty, false, i, j));
      }
    board.push(rowArray);
  }
  //console.log(board);
  return board;
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
  gameState.turn="yellow";
  gameState.winner=false;
  gameState.winnerColor=null;
  gameState.full=false;
  gameState.board=initBoard();
}

/**
 * change gameState.turn (if red then yellow and the other way around)
 */
function changeTurn() {
  if (gameState.turn==colors.yellow)
  {
    gameState.turn=colors.red;
  }
    else
    {
      gameState.turn=colors.yellow;
    }
}

/**
 * loop over all squares in the winner Array and
 * update the corresponding squares on the gameState.board (square.winner = true)
 * @param winnerArray -> array of squares
 */
function addWinnerToBoard(winnerArray) {
}

/**
 * returns the index of the first square that is not empty (square.color !== colors.empty)
 * or false if none are empty
 * @param squareArray
 * @returns {int|boolean}
 */
function indexOfFirstEmptySquare(squareArray) {
}

/**
 * uses the gameState.board to change the data attributes in index.html
 * (select corresponding element and change with element.dataSet.color and element.dataSet.winner)
 */
function drawBoard() {
  //let array=[];
  let rijen = document.querySelectorAll("div .col");
  let minrow = gameSettings.rows-1;

  for(let i=0;i<gameSettings.columns;i++){
    //console.log(rijen[i]);
    let velden = rijen[i].querySelectorAll("div .row");
    
      for(let j=0;j<gameSettings.rows;j++){
        //console.log(velden[minrow-j]);
        velden[minrow-j].dataset.color=gameState.board[i][j].color;  
        velden[minrow-j].dataset.winner=gameState.board[i][j].winner;
      }
  }
  //console.log(document.querySelector("div .col [data-index='"+1+"']"));
}

/**
 * uses gameState.turn to update the data attribute in index.html
 * (htmlBoard is already defined)
 */
function drawTurn() {
  let turn = document.querySelector("#board");
  turn.dataset.turn=gameState.turn;
  //console.log(turn.dataset.turn);
  //console.log(gameState.turn);
   
}

/**
 * Writes messages for the winner of if it's a draw in thw messageContainer
 * If there is no winner and the board is not full empty the messageContainer
 * (messageContainer is already defined)
 */
function drawMessage() {
  let messageContainer=document.querySelector("#message-container");
  let aantalEmpty =0;
  array =gameState.board;

  array=array.map(
    (value,index,array)=>
    {
      return array[index].map((value,index,array)=>
    {
     if(value.color=='empty')
     {
       return 1;
     }
        else
        {
        return 0;
        }
    }).reduce((a, b) =>a + b);});

    if(gameState.winner==true)
    {
      messageContainer.textContent="de winnaar is "+gameState.winnerColor;
    }
      else if(array=0)
      {
        messageContainer.textContent="draw ";
      }
        else
        {
          messageContainer.textContent="";
        } 
  }
/**
 * resets the gameState and changes index.html correspondingly
 */
function resetGame() {
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

  let arrayRed=[];
  let arrayYellow=[];
  let arrayEmpty=[];

  for(let i =0;i<array.length;i++){
    if(array[i]=="yellow"){

      arrayYellow.push=array[i];
      array.slice(array[i],1);

    } 
      else if (array[i]=="red")
      {
        arrayRed.push=array[i];
        array.slice(array[i],1);
      }
        else 
        {
          arrayEmpty.push=array[i];
          array.slice(array[i],1);  
        }
  }

  array=[arrayYellow,arrayRed,arrayEmpty];
  return array;
}

/**
 * Input is an array with arrays containing rows, columns and diagonals of the board
 * This function splits all these arrays into groups (splitArrayInGroups)
 * And then filters these groups for length >= 4 && square.empty !== colors.empty
 * @param squareArrays
 * @returns {*[]}
 */
function getWinners(squareArrays) {
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
}

/**
 * This function uses makeSearchArrays() to split the board up
 * into arrays containing all rows, cols, and diagonals
 * then uses getWinners() to filter these for winning combinations
 * @returns {*[]}
 */
function searchForWinners() {
}

/**
 * This function searches for winners (searchForWinners())
 * If there are winners then change the gameState (gameState.winnerColor, gameState.winner)
 * Then adds the winners to the board (addWinnerToBoard())
 */
function winnerCheck() {
}

/**
 * Checks if the board is full (no square has color === colors.empty)
 */
function fullCheck() {
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
}


initGameState();
drawBoard();
htmlBoard.addEventListener('click', dropStone);
