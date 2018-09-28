/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting
  

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



// v1
// given n, spin up matrices where each has '1' in a different slot

// - check for rooks conflict
// - check if solution found
// - if neither conditions met, recurse

// for each matrix, figure out all ways we can add an extra '1' in all the remaining slots


// v2
// given n, spin up nxn boards, each with only 1 piece in different positions
// use helper function to combine 2 boards (explore all cells)
// check combined board (with no overlapping pieces) for conflict
// - if no conflict & no pieces left, return board
// - if no conflict but pieces left, combine current board with the 1-piece boards





window.findNRooksSolution = function(n) {
  if (n === 1) {
    return [[1]];
  };
  
  var solution = undefined; //fixme
  
  // combined two boards
  var com = function(a, b) {
    var newBoard = new Board({n: n});
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (!(a.rows()[r][c] === 0 && b.rows()[r][c] === 0)) {
          newBoard.togglePiece(r, c);
        }
      }
    }
    return newBoard;
  };

  var p = n - 1;
  var solutions = [];
  
  var onePieceBoards = [];
  for (var i = 0; i < n * n; i++) {
    onePieceBoards.push(new Board({n: n}));
  }
  
  var position = 0;
  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
      onePieceBoards[position].togglePiece(r, c);
      position++;
    }
  }
  
  var currentBoards = onePieceBoards;
  while (p > 0) {
    var tempBoards = [];
    var newArrStringified = [];
    
    for (b1 of onePieceBoards) {
      for (bc of currentBoards) {
        newBoard = com(b1, bc);
        
        var numPieces = 0;
        for (var r = 0; r < n; r++) {
          for (var c = 0; c < n; c++) {
            if (newBoard.rows()[r][c] === 1) {
              numPieces++;
            }
          }
        }
        
        if (!(newBoard.hasAnyRooksConflicts()) &&
            // there can be overlapping pieces when combining 2 boards
            numPieces === n - (p - 1)) {
          if (p === 0) {
            solutions.push(newBoard.rows());
          } else {
            var stringified = JSON.stringify(newBoard.rows());
            if (!(newArrStringified.includes(stringified))) {
              tempBoards.push(newBoard);
            }
          }
        }
      }
    }
    
    p--;
    currentBoards = tempBoards;
  }
  
  solution = solutions[0];
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
