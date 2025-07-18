function startSnakeGame(snakeColor) {
  // Cleanup previous listeners and intervals
  if (window.snakeKeyListener) {
    window.removeEventListener('keydown', window.snakeKeyListener);
  }
  if (window.snakeGameInterval) {
    clearInterval(window.snakeGameInterval);
  }
  if (window.snakeFlashInterval) {
    clearInterval(window.snakeFlashInterval);
  }

  const canvas = document.getElementById('snake-canvas');
  const ctx = canvas.getContext('2d');
  const gridSize = 8; // Reduced from 10 to 8
  const gridWidth = 41; // 25% bigger than 33
  const gridHeight = 41;
  canvas.width = gridWidth * gridSize; // Now 328px
  canvas.height = gridHeight * gridSize; // Now 328px
  // Force canvas to display at true size regardless of parent CSS
  canvas.style.width = '328px';
  canvas.style.height = '328px';
  canvas.style.maxWidth = 'none';
  canvas.style.maxHeight = 'none';
  canvas.style.display = 'block';
  canvas.style.margin = '0 auto';
  // Inject CSS override for #snake-canvas if not present
  if (!document.getElementById('snake-centering-style')) {
    const style = document.createElement('style');
    style.id = 'snake-centering-style';
    style.innerHTML = `
      #snake-canvas { width: 328px !important; height: 328px !important; max-width: none !important; max-height: none !important; display: block; margin: 0 auto; }
    `;
    document.head.appendChild(style);
  }
  const centerX = Math.floor((gridWidth / 2));
  const centerY = Math.floor((gridHeight / 2));
  let snake = [{x: centerX, y: centerY}];
  let direction = {x: 1, y: 0};
  let food = randomFood();
  let gameOver = false;
  let score = 0;
  const color = snakeColor || 'lime';
  const SNAKE_SPEED = 100;
  let gameInterval;
  let flashInterval;
  let flashVisible = true;

  function randomFood() {
    return {
      x: Math.floor(Math.random() * gridWidth),
      y: Math.floor(Math.random() * gridHeight)
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = color;
    snake.forEach(segment => {
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '22px Arial';
    ctx.fillText('Score: ' + score, 5, 26);

    // Draw game over with flashing effect
    if (gameOver && flashVisible) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Game Over text
      ctx.fillStyle = 'red';
      ctx.font = 'bold 40px Arial';
      const gameOverText = 'GAME OVER!';
      ctx.fillText(gameOverText, canvas.width / 2 - ctx.measureText(gameOverText).width / 2, canvas.height / 2 - 36);
      
      // Restart instruction
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      const restartText = 'Press SPACE to restart';
      ctx.fillText(restartText, canvas.width / 2 - ctx.measureText(restartText).width / 2, canvas.height / 2 + 12);
      
      // Final score
      ctx.font = 'bold 28px Arial';
      const scoreText = 'Final Score: ' + score;
      ctx.fillText(scoreText, canvas.width / 2 - ctx.measureText(scoreText).width / 2, canvas.height / 2 + 48);
    }
  }

  function update() {
    if (gameOver) return;

    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    
    if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
      endGame();
      return;
    }

    const snakePositions = new Set(snake.map(part => `${part.x},${part.y}`));
    if (snakePositions.has(`${head.x},${head.y}`)) {
      endGame();
      return;
    }

    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
      score++;
      food = randomFood();
    } else {
      snake.pop();
    }
  }

  function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    
    // Start flashing effect
    flashInterval = setInterval(() => {
      flashVisible = !flashVisible;
      draw();
    }, 500); // Flash every 500ms
    window.snakeFlashInterval = flashInterval;
  }

  function keyListener(e) {
    if (gameOver) {
      if (e.key === ' ') {
        clearInterval(flashInterval);
        window.removeEventListener('keydown', keyListener);
        startSnakeGame(snakeColor);
      }
      return;
    }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    
    if (e.key === 'ArrowUp' && direction.y === 0) direction = {x: 0, y: -1};
    else if (e.key === 'ArrowDown' && direction.y === 0) direction = {x: 0, y: 1};
    else if (e.key === 'ArrowLeft' && direction.x === 0) direction = {x: -1, y: 0};
    else if (e.key === 'ArrowRight' && direction.x === 0) direction = {x: 1, y: 0};
  }

  window.snakeKeyListener = keyListener;
  window.addEventListener('keydown', keyListener);

  function gameLoop() {
    update();
    draw();
  }

  gameInterval = setInterval(gameLoop, SNAKE_SPEED);
  window.snakeGameInterval = gameInterval;
  canvas.style.position = 'relative';
  canvas.style.zIndex = '1002';
}