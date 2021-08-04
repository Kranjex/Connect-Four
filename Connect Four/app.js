// Constant variables
const gameScreen = document.getElementById('gameScreen');
const currentPlayer = document.getElementById('currentPlayer');
const soundEffect = document.getElementById('audio');
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

  // Cell set up
  for (let i = 41; i >= 35; i--) {
    cells[i].classList.add('available');
  }

  // Cell filling system
  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      switch (player1Turn) {
        case true:
          if (cell.classList.contains('available')) {
            let lowerCell = cells.indexOf(e.target) + 7;
            if (lowerCell > 41) {
              soundEffect.cloneNode(true).play();
              e.target.classList.add('red');
              e.target.classList.add('occupied');
              e.target.classList.add('spawnAnimation');
              currentPlayer.innerText = 'YELLOW';
              currentPlayer.style.color = 'yellow';
              player1Turn = false;
            } else if (
              cells[lowerCell].classList.contains('red') ||
              cells[lowerCell].classList.contains('yellow')
            ) {
              soundEffect.cloneNode(true).play();
              e.target.classList.add('red');
              e.target.classList.add('occupied');
              e.target.classList.add('spawnAnimation');
              currentPlayer.innerText = 'YELLOW';
              currentPlayer.style.color = 'yellow';
              player1Turn = false;
            }
            counter = 0;
            matchCheck(e.target, 'red');
          }
          cellAvailability(cells);
          break;
        case false:
          if (cell.classList.contains('available')) {
            let upperCell = cells.indexOf(e.target) + 7;
            if (upperCell > 41) {
              soundEffect.cloneNode(true).play();
              e.target.classList.add('yellow');
              e.target.classList.add('occupied');
              e.target.classList.add('spawnAimation');
              currentPlayer.innerText = 'RED';
              currentPlayer.style.color = 'red';
              player1Turn = true;
            } else if (
              cells[upperCell].classList.contains('red') ||
              cells[upperCell].classList.contains('yellow')
            ) {
              soundEffect.cloneNode(true).play();
              e.target.classList.add('yellow');
              e.target.classList.add('occupied');
              e.target.classList.add('spawnAnimation');
              currentPlayer.innerText = 'RED';
              currentPlayer.style.color = 'red';
              player1Turn = true;
            }
            counter = 0;
            matchCheck(e.target, 'yellow');
          }
          cellAvailability(cells);
          break;
      }

      // Matches checking system
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
        for (let x = 0; x < 7; x++) {
          if (cells[7 * row + x].classList.contains(color)) {
            Xchain++;
            MatchCondition(Xchain, Ychain, D1chain, D2chain, color);
          } else {
            Xchain = 0;
          }
        }
        console.log('Xchain: ' + Xchain);
        // Check columns
        for (let y = 0; y < 6; y++) {
          if (cells[column + y * 7].classList.contains(color)) {
            Ychain++;
            MatchCondition(Xchain, Ychain, D1chain, D2chain, color);
          } else {
            Ychain = 0;
          }
        }
        console.log('Ychain: ' + Ychain);
        // Check n + 8 diagonal
        for (let z = 0; z < 4; z++) {
          if (
            cells[currentIndex - z * 8] >= 0 &&
            cells[currentIndex - z * 8].classList.contains(color)
          ) {
            D1chain++;
            MatchCondition(Xchain, Ychain, D1chain, D2chain, color);
          } else if (
            cells[currentIndex + z * 8] <= 41 &&
            cells[currentIndex + z * 8].classList.contains(color)
          ) {
            D1chain++;
            MatchCondition(Xchain, Ychain, D1chain, D2chain, color);
          } else {
            // D1chain = 0;
          }
        }
        console.log('D1chain: ' + D1chain);
        // Check n + 6 diagonal
        for (let z = 0; z < 4; z++) {
          if (
            cells[currentIndex - z * 6] >= 0 &&
            cells[currentIndex - z * 6].classList.contains(color)
          ) {
            D2chain++;
            MatchCondition(Xchain, Ychain, D1chain, D2chain, color);
            console.log(D2chain);
          } else if (
            cells[currentIndex + z * 6] <= 41 &&
            cells[currentIndex + z * 6].classList.contains(color)
          ) {
            D2chain++;
            MatchCondition(Xchain, Ychain, D1chain, D2chain, color);
          } else {
            // D2chain = 0;
          }
        }
        console.log('D2chain: ' + D2chain);
      }
    });
  });

  // Cell availability
  function cellAvailability(array) {
    let available = [];
    for (let i = 41; i >= 0; i--) {
      if (
        array[i].classList.contains('red') ||
        array[i].classList.contains('yellow')
      ) {
        available.push(array[i - 7]);
      }
      available.forEach((cell) => {
        cell.classList.add('available');
        cell.classList.add('unrevealAnimation');
      });
    }
  }

  function MatchCondition(x, y, d1, d2, color) {
    if (x > 3 || y > 3 || d1 > 3 || d2 > 3) {
      if (once === true) {
        alert(
          `GAME OVER! ${color} wins! \n The page will self-reload after you click OK button.`
        );
        once = false;
        location.reload();
      }
    }
  }
};
