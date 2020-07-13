/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
// how many squares wide
let WIDTH = 7; 
// how many (playing) squares tall) 
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // loops through starting at Y grid position 0-0,
  for (let y = 0; y < HEIGHT; y++) {
    // 
    board.push(Array.from({length: WIDTH}));
    
	}
}



/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById("board");

  // TODO: add comment for this code
  //create top row TR element
  const top = document.createElement("tr");
  //set id for top column(mouseover event space)
  top.setAttribute("id", "column-top");
  //click event for play selection
  top.addEventListener("click", handleClick);

  //for top of board grid:  ,
  // loop through x values,
  for (let x = 0; x < WIDTH; x++) {
  // create td with id of x iteration in grid
    const headCell = document.createElement("td");
  // sets id grid coordinates attribute
    headCell.setAttribute("id", x);
  
  // adds row of TD's to top of board
    top.append(headCell);

  }
 board.append(top);

  // TODO: add comment for this code
  //for board grid: loop through y values, 
  for (let y = 0; y < HEIGHT; y++) {
  // create TR row for each x value, 
    const row = document.createElement("tr");
    console.log(row)
  // loop through x-values  
    for (let x = 0; x < WIDTH; x++) {
  //create TD 
      const cell = document.createElement("td");
      console.log(cell)
  // add attribute ids of x & y coordinate values,
      cell.setAttribute("id", `${y}-${x}`);
  //add cell TD to row TR 
      row.append(cell);
    }
    // add to board
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // starting in the y column
  for (let y = HEIGHT - 1; y >= 0; y--) {
  // check if the X cell in Y row has null value/is taken
    if (!board[y][x]) {
  // return position
      return y;
    }
  }
  // or return null to that position & render the cell "taken"
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
// TODO: make a div and insert into correct table cell
// create element
  const div = document.createElement('div');
// add piece to class
  div.classList.add('div');
// add player to class
  div.classList.add(`p${currPlayer}`);
  // make spot
div.style.top = -50 * (y + 2);

// marker representation of spot taken
  const spot = document.getElementById(`${y}-${x}`)
  spot.append(div);
}



/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  // y,x coordinates at the current player's selection
  board[y][x] = currPlayer;
  // adds selection to the board as current player
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    // runs end game function w/ message
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // iterate through y axis
  for (let y = 0; y < HEIGHT; y++) {
 // while going through x axis
    for (let x = 0; x < WIDTH; x++) {
      // coordinates for a horizontal win
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // coordinates for a vertical win
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //  coordinates for a diagonal right win
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // coordinates for diagonal left win
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
// if a win in any direction return true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
