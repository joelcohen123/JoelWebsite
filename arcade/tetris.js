// Tetris MVP: Ultra-compact, sharp, red/white/blue, monospace text
function startTetrisGame() {
  if (window.tetrisKeyListener) window.removeEventListener('keydown', window.tetrisKeyListener);
  if (window.tetrisKeyUpListener) window.removeEventListener('keyup', window.tetrisKeyUpListener);
  if (window.tetrisDropTimer) clearInterval(window.tetrisDropTimer);
  if (window.tetrisSoftDropTimer) clearInterval(window.tetrisSoftDropTimer);
  if (window.tetrisFlashTimer) clearInterval(window.tetrisFlashTimer);

  const canvas = document.getElementById('tetris-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;

  // 10x20 grid, block size 17px, border 1
  const COLS = 10, ROWS = 20, BLOCK = 17, BORDER = 1;
  canvas.width = (COLS + 2 * BORDER) * BLOCK; // 204
  canvas.height = (ROWS + 2 * BORDER) * BLOCK; // 374

  const scoreDiv = document.getElementById('tetris-score');
  function updateScoreDisplay() {
    if (scoreDiv) scoreDiv.textContent = 'Score: ' + score;
  }

  const colors = ['#e63946', '#f1faee', '#457b9d'];
  const shapes = [
    [[1,1,1,1]], [[1,1],[1,1]], [[0,1,0],[1,1,1]], [[1,1,0],[0,1,1]], [[0,1,1],[1,1,0]], [[1,0,0],[1,1,1]], [[0,0,1],[1,1,1]]
  ];
  let board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  let current, curX, curY, curColor;
  let dropInterval = 500, dropTimer;
  let softDropInterval = 50, softDropTimer = null;
  let gameOver = false, score = 0, flashTimer = null, flashVisible = true;

  function randomPiece() {
    const idx = Math.floor(Math.random() * shapes.length);
    return { shape: shapes[idx], color: colors[idx % 3] };
  }
  function resetPiece() {
    const p = randomPiece();
    current = p.shape.map(row => row.slice());
    curColor = p.color;
    curX = Math.floor(COLS/2) - Math.floor(current[0].length/2);
    curY = 0;
    if (collides(curX, curY, current)) {
      gameOver = true;
      clearInterval(dropTimer);
      if (softDropTimer) clearInterval(softDropTimer);
      if (!flashTimer) {
        flashTimer = setInterval(() => { flashVisible = !flashVisible; draw(); }, 500);
        window.tetrisFlashTimer = flashTimer;
      }
      draw();
    }
  }
  function collides(x, y, shape) {
    for (let r=0; r<shape.length; r++) for (let c=0; c<shape[r].length; c++)
      if (shape[r][c]) {
        let nx = x + c, ny = y + r;
        if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
        if (ny >= 0 && board[ny][nx]) return true;
      }
    return false;
  }
  function merge() {
    for (let r=0; r<current.length; r++) for (let c=0; c<current[r].length; c++)
      if (current[r][c]) board[curY + r][curX + c] = curColor;
  }
  function clearLines() {
    let lines = 0;
    for (let r=ROWS-1; r>=0; r--) {
      if (board[r].every(cell => cell)) {
        board.splice(r,1); board.unshift(Array(COLS).fill(0)); r++; lines++;
      }
    }
    if (lines > 0) score += lines * 100;
  }
  function drawBorder() {
    ctx.save(); ctx.fillStyle = '#222';
    for (let x = 0; x < COLS + 2*BORDER; x++) {
      ctx.fillRect(x*BLOCK, 0, BLOCK, BLOCK);
      ctx.fillRect(x*BLOCK, (ROWS+BORDER)*BLOCK, BLOCK, BLOCK);
    }
    for (let y = 1; y < ROWS+BORDER; y++) {
      ctx.fillRect(0, y*BLOCK, BLOCK, BLOCK);
      ctx.fillRect((COLS+BORDER)*BLOCK, y*BLOCK, BLOCK, BLOCK);
    }
    ctx.restore();
  }
  function drawGrid() {
    ctx.save(); ctx.strokeStyle = '#444'; ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo((x+BORDER)*BLOCK, BORDER*BLOCK);
      ctx.lineTo((x+BORDER)*BLOCK, (ROWS+BORDER)*BLOCK); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(BORDER*BLOCK, (y+BORDER)*BLOCK);
      ctx.lineTo((COLS+BORDER)*BLOCK, (y+BORDER)*BLOCK); ctx.stroke();
    }
    ctx.restore();
  }
  function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect((x+BORDER)*BLOCK, (y+BORDER)*BLOCK, BLOCK, BLOCK);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1;
    ctx.strokeRect((x+BORDER)*BLOCK, (y+BORDER)*BLOCK, BLOCK, BLOCK);
  }
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'black'; ctx.fillRect(0,0,canvas.width,canvas.height);
    drawBorder(); drawGrid();
    for (let r=0; r<ROWS; r++) for (let c=0; c<COLS; c++)
      if (board[r][c]) drawBlock(c, r, board[r][c]);
    if (!gameOver) {
      for (let r=0; r<current.length; r++) for (let c=0; c<current[r].length; c++)
        if (current[r][c]) drawBlock(curX + c, curY + r, curColor);
    } else if (flashVisible) {
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = 'red'; ctx.font = 'bold 17px Consolas, monospace';
      ctx.fillText('GAME OVER!', Math.round(canvas.width / 2), Math.round(canvas.height / 2 - 25));
      ctx.fillStyle = 'white'; ctx.font = '17px Consolas, monospace';
      ctx.fillText('Final Score: ' + score, Math.round(canvas.width / 2), Math.round(canvas.height / 2));
      ctx.font = '15px Consolas, monospace';
      ctx.fillText('Press SPACE to restart', Math.round(canvas.width / 2), Math.round(canvas.height / 2 + 25));
      ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic';
    }
    // Remove score from canvas, now shown above
    updateScoreDisplay();
  }
  function drop() {
    if (!gameOver) {
      if (!collides(curX, curY+1, current)) { curY++; draw(); }
      else { merge(); clearLines(); resetPiece(); }
    }
  }
  function hardDrop() {
    if (gameOver) return;
    while (!collides(curX, curY+1, current)) curY++;
    draw(); merge(); clearLines(); resetPiece();
  }
  function move(dir) {
    if (!gameOver && !collides(curX+dir, curY, current)) { curX += dir; draw(); }
  }
  function rotate() {
    if (gameOver) return;
    const N = current.length, M = current[0].length;
    let rotated = Array.from({length: M}, (_,c) => Array.from({length: N}, (_,r) => current[N-1-r][c]));
    if (!collides(curX, curY, rotated)) { current = rotated; draw(); }
  }
  function keyListener(e) {
    if (gameOver) {
      if (e.key === ' ') {
        if (flashTimer) { clearInterval(flashTimer); window.tetrisFlashTimer = null; }
        if (dropTimer) clearInterval(dropTimer);
        if (softDropTimer) { clearInterval(softDropTimer); window.tetrisSoftDropTimer = null; }
        window.removeEventListener('keydown', keyListener);
        window.removeEventListener('keyup', keyUpListener);
        startTetrisGame();
      }
      return;
    }
    if (e.key === 'ArrowLeft') move(-1);
    else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowDown') {
      if (!softDropTimer) { softDropTimer = setInterval(drop, softDropInterval); window.tetrisSoftDropTimer = softDropTimer; }
    }
    else if (e.key === 'ArrowUp') rotate();
    else if (e.key === ' ') hardDrop();
  }
  function keyUpListener(e) {
    if (e.key === 'ArrowDown' && softDropTimer) { clearInterval(softDropTimer); softDropTimer = null; window.tetrisSoftDropTimer = null; }
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
    if (flashTimer) clearInterval(flashTimer);
  }
  board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  gameOver = false; score = 0; flashTimer = null; flashVisible = true;
  updateScoreDisplay();
  resetPiece();
  if (!gameOver) { draw(); dropTimer = setInterval(drop, dropInterval); }
  if (!window.tetrisCleanupFns) window.tetrisCleanupFns = [];
  window.tetrisCleanupFns.push(cleanup);
  window.tetrisDropTimer = dropTimer;
} 