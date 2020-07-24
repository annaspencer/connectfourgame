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


function makeBoard() {
 
  // loops through starting at Y grid position 0-0,pushing to the board array each coordinate for x at y, 6X7
  for (let y = 0; y < HEIGHT; y++) {
   board.push(Array.from({length: WIDTH}));
    }
}





function makeHtmlBoard() {
  //gets "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById("board");

  
  //creates top row TR element
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
  
  // adds row of TD's to top of 6x7 board
    top.append(headCell);

  }
 board.append(top);

  
  //for HTML board grid: loop through y values, 
  for (let y = 0; y < HEIGHT; y++) {
  // create TR row for each y value, 
    const row = document.createElement("tr");
   
  // loop through x-values  
    for (let x = 0; x < WIDTH; x++) {
  //create TD 
      const cell = document.createElement("td");
  
  // add attribute ids of x & y coordinate values,
      cell.setAttribute("id", `${y}-${x}`);
  //adds TD to row TR 
      row.append(cell);
    }
    // add to board
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  
  // starting in the y row
  for (let y = HEIGHT - 1; y >= 0; y--) {
  // check if the X cell in Y row has null value/is taken
    if (!board[y][x]) {
  // return position
      return y;
    }
  }
  // or return null to that position & the cell is "taken"
  return null;
}


/** updates DOM to place piece into HTML table of board */

function placeInTable(y, x) {
// makes a div and insert into correct table cell
// create element
  const div = document.createElement('div');
// adds token div to class element div
  div.classList.add('div');
// tracks which player the token belongs to
  div.classList.add(`p${currPlayer}`);
  //styles that token in css
div.style.top = -50 * (y + 2);

// creates a variable for the div by it's xy coordinates. 
  const spot = document.getElementById(`${y}-${x}`)
  spot.append(div);
}



/** announce game end */

function endGame(msg) {
  alert(msg)
  
}

/** handles click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // adds line to update in-memory board
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
  // checks if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  // switch players
  // switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;

}

/** checks board cell-by-cell for "does a win start here?" */

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

  // 
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
