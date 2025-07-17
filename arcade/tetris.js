function startTetrisGame() {
  // Cleanup previous listeners and intervals
  if (window.tetrisKeyListener) {
    window.removeEventListener('keydown', window.tetrisKeyListener);
  }
  if (window.tetrisKeyUpListener) {
    window.removeEventListener('keyup', window.tetrisKeyUpListener);
  }
  if (window.tetrisDropTimer) {
    clearInterval(window.tetrisDropTimer);
  }
  if (window.tetrisSoftDropTimer) {
    clearInterval(window.tetrisSoftDropTimer);
  }
  if (window.tetrisFlashTimer) {
    clearInterval(window.tetrisFlashTimer);
  }

  // Only get the canvas and run the game logic. UI and controls are handled by arcade.js
  const canvas = document.getElementById('tetris-canvas');
  if (!canvas) return; // If canvas is not present, do nothing
  const ctx = canvas.getContext('2d');

  // Improve text rendering quality
  ctx.imageSmoothingEnabled = true;
  ctx.webkitImageSmoothingEnabled = true; // For Safari
  ctx.mozImageSmoothingEnabled = true; // For Firefox

  const COLS = 10, ROWS = 20;
  const BLOCK = 16; // Adjusted block size
  const BORDER = 1; // 1 block border
  const colors = ['#ff0000', '#ffffff', '#0000ff']; // red, white, blue
  const shapes = [
    [[1,1,1,1]], // I
    [[1,1],[1,1]], // O
    [[0,1,0],[1,1,1]], // T
    [[1,1,0],[0,1,1]], // S
    [[0,1,1],[1,1,0]], // Z
    [[1,0,0],[1,1,1]], // J
    [[0,0,1],[1,1,1]]  // L
  ];
  let board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  let current, curX, curY, curColor, curShapeIdx;
  let dropInterval = 500, dropTimer;
  let softDropInterval = 50, softDropTimer = null;
  let gameOver = false;
  let score = 0;
  let flashTimer = null; // Timer for flashing text
  let flashColorIndex = 0; // Index for flashing colors (red, white, blue)
  let flashVisible = true; // For text flashing
  let isFirstPiece = true;

  function randomPiece() {
    const idx = Math.floor(Math.random() * shapes.length);
    return {
      shape: shapes[idx],
      color: colors[Math.floor(Math.random() * colors.length)],
      shapeIdx: idx
    };
  }

  function resetPiece() {
    let p, tryCount = 0;
    do {
      p = randomPiece();
      current = p.shape.map(row => row.slice()); // deep copy
      curColor = p.color;
      curShapeIdx = p.shapeIdx;
      curX = Math.floor(COLS/2) - Math.floor(current[0].length/2);
      curY = 0;
      // If it's the first piece, never allow S (3) or Z (4)
      if (isFirstPiece && (curShapeIdx === 3 || curShapeIdx === 4)) {
        tryCount++;
        if (tryCount > 10) break; // Avoid infinite loop
        continue;
      }
      // If it's the first piece and blocked, reroll (for any piece)
      if (isFirstPiece && collides(curX, curY, current)) {
        tryCount++;
        if (tryCount > 10) break;
        continue;
      }
      break;
    } while (true);
    isFirstPiece = false;
    // Check for game over when the new piece is generated at the top
    if (collides(curX, curY, current)) {
      gameOver = true;
      clearInterval(dropTimer); // Stop the drop timer
      if (softDropTimer) clearInterval(softDropTimer); // Stop soft drop timer
      // Start flashing only once
      if (!flashTimer) {
        flashTimer = setInterval(() => {
          flashVisible = !flashVisible;
          draw(); // Redraw to show next color
        }, 500); // Flash every 500ms
        window.tetrisFlashTimer = flashTimer;
      }
      draw(); // Draw final game over state
    }
  }

  function collides(x, y, shape) {
    for (let r=0; r<shape.length; r++) {
      for (let c=0; c<shape[r].length; c++) {
        if (shape[r][c]) {
          let nx = x + c, ny = y + r;
          if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
          if (ny >= 0 && board[ny][nx]) return true;
        }
      }
    }
    return false;
  }

  function merge() {
    for (let r=0; r<current.length; r++) {
      for (let c=0; c<current[r].length; c++) {
        if (current[r][c]) {
          board[curY + r][curX + c] = curColor;
        }
      }
    }
  }

  function clearLines() {
    let lines = 0;
    for (let r=ROWS-1; r>=0; r--) {
      if (board[r].every(cell => cell)) {
        board.splice(r,1);
        board.unshift(Array(COLS).fill(0));
        r++;
        lines++;
      }
    }
    if (lines > 0) score += lines * 100;
  }

  function drawBorder() {
    ctx.save();
    ctx.fillStyle = '#888';
    // Top and bottom
    for (let x = 0; x < COLS + 2*BORDER; x++) {
      ctx.fillRect(x*BLOCK, 0, BLOCK, BLOCK);
      ctx.fillRect(x*BLOCK, (ROWS+BORDER)*BLOCK, BLOCK, BLOCK);
    }
    // Left and right
    for (let y = 1; y < ROWS+BORDER; y++) {
      ctx.fillRect(0, y*BLOCK, BLOCK, BLOCK);
      ctx.fillRect((COLS+BORDER)*BLOCK, y*BLOCK, BLOCK, BLOCK);
    }
    ctx.restore();
  }

  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo((x+BORDER)*BLOCK, BORDER*BLOCK);
      ctx.lineTo((x+BORDER)*BLOCK, (ROWS+BORDER)*BLOCK);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(BORDER*BLOCK, (y+BORDER)*BLOCK);
      ctx.lineTo((COLS+BORDER)*BLOCK, (y+BORDER)*BLOCK);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect((x+BORDER)*BLOCK, (y+BORDER)*BLOCK, BLOCK, BLOCK);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect((x+BORDER)*BLOCK, (y+BORDER)*BLOCK, BLOCK, BLOCK);
  }

  function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawBorder();
    drawGrid();
    for (let r=0; r<ROWS; r++) {
      for (let c=0; c<COLS; c++) {
        if (board[r][c]) drawBlock(c, r, board[r][c]);
      }
    }
    if (!gameOver) {
      for (let r=0; r<current.length; r++) {
        for (let c=0; c<current[r].length; c++) {
          if (current[r][c]) drawBlock(curX + c, curY + r, curColor);
        }
      }
    } else {
      // Draw semi-transparent overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flashing Game Over text
      if (flashVisible) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Game Over text
        ctx.fillStyle = 'red';
        ctx.font = 'bold 24px Arial';
        const gameOverText = 'GAME OVER!';
        ctx.fillText(gameOverText, canvas.width / 2, canvas.height / 2 - 40);

        // Final Score
        ctx.fillStyle = 'white';
        ctx.font = '18px Arial';
        const scoreText = 'Final Score: ' + score;
        ctx.fillText(scoreText, canvas.width / 2, canvas.height / 2);

        // Restart instruction
        ctx.font = '16px Arial';
        const restartText = 'Press SPACE to restart';
        ctx.fillText(restartText, canvas.width / 2, canvas.height / 2 + 40);

        ctx.textAlign = 'start';
        ctx.textBaseline = 'alphabetic';
      }
    }
    // Draw current score in top-right corner
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('Score: ' + score, canvas.width - 10, 10);
    ctx.textAlign = 'start';
  }

  function drop() {
    if (!gameOver) {
      if (!collides(curX, curY+1, current)) {
        curY++;
        draw(); // Redraw after moving down
      } else {
        merge();
        clearLines();
        resetPiece(); // Generate and check the next piece (game over check is now in resetPiece)
        // draw() is called by resetPiece if game over, or will be called by the next drop
      }
    }
    // If game is over, the drop function does nothing, flashing is handled by flashTimer
  }

  function move(dir) {
    if (!gameOver && !collides(curX+dir, curY, current)) {
      curX += dir;
      draw();
    }
  }

  function rotate() {
    if (gameOver) return;
    // Standard Tetris rotation: transpose + reverse rows for 90deg clockwise
    const N = current.length, M = current[0].length;
    let rotated = Array.from({length: M}, (_,c) => Array.from({length: N}, (_,r) => current[N-1-r][c]));
    if (!collides(curX, curY, rotated)) {
      current = rotated;
      draw();
    }
  }

  function keyListener(e) {
    if (gameOver) {
      if (e.key === ' ') {
        if (flashTimer) {
          clearInterval(flashTimer);
          window.tetrisFlashTimer = null;
        }
        if (dropTimer) clearInterval(dropTimer);
        if (softDropTimer) {
          clearInterval(softDropTimer);
          window.tetrisSoftDropTimer = null;
        }
        window.removeEventListener('keydown', keyListener);
        window.removeEventListener('keyup', keyUpListener);
        startTetrisGame();
      }
      return;
    }

    if (e.key === 'ArrowLeft') move(-1);
    else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowDown') {
      if (!softDropTimer) {
        softDropTimer = setInterval(drop, softDropInterval);
        window.tetrisSoftDropTimer = softDropTimer;
      }
    }
    else if (e.key === 'ArrowUp') rotate();
  }

  function keyUpListener(e) {
    if (e.key === 'ArrowDown' && softDropTimer) {
      clearInterval(softDropTimer);
      softDropTimer = null;
      window.tetrisSoftDropTimer = null;
    }
  }

  window.tetrisKeyListener = keyListener;
  window.tetrisKeyUpListener = keyUpListener;
  window.addEventListener('keydown', keyListener);
  window.addEventListener('keyup', keyUpListener);

  function cleanup() {
    window.removeEventListener('keydown', keyListener);
    window.removeEventListener('keyup', keyUpListener);
    clearInterval(dropTimer);
    if (softDropTimer) clearInterval(softDropTimer);
    if (flashTimer) clearInterval(flashTimer); // Clear flashing timer on cleanup
  }

  // Start game
  board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  gameOver = false;
  score = 0;
  flashColorIndex = 0; // Reset flash index
  if (flashTimer) clearInterval(flashTimer); // Clear any existing timer
  canvas.width = (COLS + 2 * BORDER) * BLOCK;
  canvas.height = (ROWS + 2 * BORDER) * BLOCK;
  
  resetPiece(); // Generate the first piece and check for immediate game over

  if (!gameOver) {
      draw(); // Draw initial state with the first piece
      dropTimer = setInterval(drop, dropInterval); // Start the game loop
  }

  // Clean up on restart or exit
  if (!window.tetrisCleanupFns) window.tetrisCleanupFns = [];
  window.tetrisCleanupFns.push(cleanup);

  dropTimer = setInterval(drop, dropInterval); // Start the game loop
  window.tetrisDropTimer = dropTimer;
} 