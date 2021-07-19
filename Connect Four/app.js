// Constant variables
const gameScreen = document.getElementById('gameScreen');
const currentPlayer = document.getElementById('currentPlayer');
// Non-constant variables
let player1Turn = true;
let counter = 0;
let once = true;

window.onload = () => {
  // Cells spawn system
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-id', `id-${7 * i + j}`);
      gameScreen.appendChild(cell);
    }
  }

  // Cell constant variables
  const cells = Array.from(document.querySelectorAll('.cell'));
  const containsRed = cell.classList.contains('red');
  const containsYellow = cell.classList.contains('yellow');

  // Cell filling system
  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      switch (player1Turn) {
        case true:
          if (!containsRed && !containsYellow) {
            let upperCell = cells.indexOf(e.target) + 7;
            // console.log(upperCell);
            if (upperCell > 41) {
              e.target.classList.add('red');
              e.target.classList.add('occupied');
              currentPlayer.innerText = 'YELLOW';
              currentPlayer.style.color = 'yellow';
              player1Turn = false;
            } else if (
              cells[upperCell].classList.contains('red') ||
              cells[upperCell].classList.contains('yellow')
            ) {
              e.target.classList.add('red');
              e.target.classList.add('occupied');
              currentPlayer.innerText = 'YELLOW';
              currentPlayer.style.color = 'yellow';
              player1Turn = false;
            }
            counter = 0;
            matchCheck(e.target, 'red');
          }
          break;
        case false:
          if (!containsRed && !containsYellow) {
            let upperCell = cells.indexOf(e.target) + 7;
            // console.log(upperCell);
            if (upperCell > 41) {
              e.target.classList.add('yellow');
              e.target.classList.add('occupied');
              currentPlayer.innerText = 'RED';
              currentPlayer.style.color = 'red';
              player1Turn = true;
            } else if (
              cells[upperCell].classList.contains('red') ||
              cells[upperCell].classList.contains('yellow')
            ) {
              e.target.classList.add('yellow');
              e.target.classList.add('occupied');
              currentPlayer.innerText = 'RED';
              currentPlayer.style.color = 'red';
              player1Turn = true;
            }
            counter = 0;
            matchCheck(e.target, 'yellow');
          }
          break;
      }
      // Matches checking system
      // Dodelaj svojo metodo, preveri od e.target če je celica enake barve sicer prekine operacijo in preveri v drugo smer.
      function matchCheck(target, turn) {
        let color = turn;
        let currentIndex = cells.indexOf(target);
        let Xchain = 0;
        let Ychain = 0;
        let D1chain = 0;
        let D2chain = 0;
        // Setting row and column of the placed token
        let row = Math.floor(currentIndex / 7); // Actually index of row
        let column = currentIndex % 7; // Actually index of column
        console.log(currentIndex);
        console.log('Current row: ' + row);
        console.log('Current column: ' + column);
        // Check rows
        for (let x = 0; x < 6; x++) {
          if (cells[7 * row + x].classList.contains(color)) {
            Xchain++;
            MatchCondition(Xchain, Ychain);
          } else {
            Xchain = 0;
          }
        }
        console.log('Xchain: ' + Xchain);
        // Check columns
        for (let y = 0; y < 6; y++) {
          if (cells[column + y * 7].classList.contains(color)) {
            Ychain++;
            MatchCondition(Xchain, Ychain);
          } else {
            Ychain = 0;
          }
        }
        console.log('Ychain: ' + Ychain);
        // Check n + 8 diagonal
        // Check n + 6 diagonal
      }
    });
  });
  function MatchCondition(x, y) {
    if (x > 3 || y > 3) {
      if (once === true) {
        alert('GAME OVER');
        once = false;
      }
    }
  }
};
