document.addEventListener('DOMContentLoaded', function() {
// Arcade Hub logic
const arcadeHub = document.getElementById('arcade-hub');
const container = document.getElementById('arcade-game-container');
// Adjust container height to fit above header and controls, and set flex properties
// Remove or override these lines to allow launchTetrisGame to control centering:
// container.style.height = 'calc(100vh - 250px)';
// container.style.display = 'flex';
// container.style.flexDirection = 'column';
// container.style.alignItems = 'center';
// container.style.justifyContent = 'flex-start'; // <-- REMOVE THIS LINE
// container.style.overflowY = 'auto';
// container.style.marginTop = '20px'; // <-- REMOVE THIS LINE
// container.style.paddingBottom = '0';

const arcadeTitle = arcadeHub.querySelector('h1');
const arcadeMenuRow = arcadeHub.querySelector('div[style*="display:flex;"]');
const closeArcadeBtn = document.getElementById('close-arcade-btn');

// Controls group for bottom of the modal (kept fixed)
const controlsDiv = document.createElement('div');
window.controlsDiv = controlsDiv;
controlsDiv.id = 'arcade-controls';
controlsDiv.style.display = 'none';
controlsDiv.style.width = '100%';
controlsDiv.style.position = 'static'; // Not fixed, so it sits below the game
controlsDiv.style.left = '0';
controlsDiv.style.padding = '0.8rem 0';
controlsDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Subtle dark background
controlsDiv.style.zIndex = '1001';
controlsDiv.style.display = 'flex';
controlsDiv.style.justifyContent = 'center';
controlsDiv.style.gap = '1rem';
// Remove debug border/background
controlsDiv.style.border = 'none';

const backButton = document.createElement('button');
backButton.id = 'back-to-menu-btn';
backButton.textContent = 'Return to Arcade Menu';
backButton.style.padding = '0.4rem 0.8rem';
backButton.style.background = '#4CAF50';
backButton.style.color = 'white';
backButton.style.border = 'none';
backButton.style.borderRadius = '4px';
backButton.style.cursor = 'pointer';
backButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
backButton.style.transition = 'all 0.2s ease';
backButton.style.fontSize = '0.9rem';

const restartButton = document.createElement('button');
restartButton.id = 'restart-btn';
restartButton.textContent = 'Restart';
restartButton.style.padding = '0.4rem 0.8rem';
restartButton.style.background = '#2196F3';
restartButton.style.color = 'white';
restartButton.style.border = 'none';
restartButton.style.borderRadius = '4px';
restartButton.style.cursor = 'pointer';
restartButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
restartButton.style.transition = 'all 0.2s ease';
restartButton.style.fontSize = '0.9rem';

// Add hover effects
backButton.onmouseover = function() {
    this.style.transform = 'translateY(-2px)';
    this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
};
backButton.onmouseout = function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
};

restartButton.onmouseover = function() {
    this.style.transform = 'translateY(-2px)';
    this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
};
restartButton.onmouseout = function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
};

// Add click handlers for the buttons
backButton.onclick = function() {
    // Stop any playing audio
    if (window.snakeAudio) {
        window.snakeAudio.pause();
        window.snakeAudio.currentTime = 0;
        window.snakeAudio.volume = 0;
    }
    if (window.tetrisAudio) {
        window.tetrisAudio.pause();
        window.tetrisAudio.currentTime = 0;
    }
    if (window.blackjackAudio) {
        window.blackjackAudio.pause();
        window.blackjackAudio.currentTime = 0;
        window.blackjackAudio.volume = 0;
    }
    
    // Clear the container and show the menu
    container.innerHTML = '';
    if (arcadeTitle) arcadeTitle.style.display = '';
    const arcadeLogo = document.getElementById('arcade-logo');
    if (arcadeLogo) arcadeLogo.style.display = '';
    if (arcadeMenuRow) arcadeMenuRow.style.display = '';
    if (closeArcadeBtn) closeArcadeBtn.style.display = '';
    hideControls();
};

restartButton.onclick = function() {
    // Stop any playing audio
    if (window.snakeAudio) {
        window.snakeAudio.pause();
        window.snakeAudio.currentTime = 0;
        window.snakeAudio.volume = 0;
    }
    if (window.tetrisAudio) {
        window.tetrisAudio.pause();
        window.tetrisAudio.currentTime = 0;
    }
    if (window.blackjackAudio) {
        window.blackjackAudio.pause();
        window.blackjackAudio.currentTime = 0;
        window.blackjackAudio.volume = 0;
    }
    
    // Check which game is currently running and restart it
    if (container.querySelector('#snake-wrapper')) {
        const color = document.getElementById('snake-color-input')?.value || '#00ff00';
        launchSnakeGame();
        // Wait for the color picker to be created
        setTimeout(() => {
            const startBtn = document.getElementById('start-snake-btn');
            if (startBtn) startBtn.click();
        }, 100);
    } else if (container.querySelector('#tetris-wrapper')) {
        launchTetrisGame();
    } else if (container.querySelector('#blackjack-wrapper')) {
        launchBlackjackGame();
    }
};

// Append buttons to controlsDiv
controlsDiv.appendChild(backButton);
controlsDiv.appendChild(restartButton);

function showControls() {
  // Ensure buttons are present in the controls bar
  if (!controlsDiv.contains(backButton)) controlsDiv.appendChild(backButton);
  if (!controlsDiv.contains(restartButton)) controlsDiv.appendChild(restartButton);
  // Force display
  backButton.style.display = 'inline-block';
  restartButton.style.display = 'inline-block';
  controlsDiv.style.display = 'flex';
  console.log('showControls: backButton and restartButton should be visible:', backButton, restartButton);
}

function hideControls() {
  controlsDiv.style.display = 'none';
}

if (document.getElementById('open-arcade-btn')) {
  document.getElementById('open-arcade-btn').onclick = function() {
    // Properly show the arcade modal
    arcadeHub.style.display = 'flex';
    arcadeHub.style.visibility = 'visible';
    arcadeHub.style.opacity = '1';
    arcadeHub.style.pointerEvents = 'auto';
    // FORCE FLEX CENTERING ON MODAL
    arcadeHub.style.display = 'flex';
    arcadeHub.style.flexDirection = 'column';
    arcadeHub.style.alignItems = 'center';
    arcadeHub.style.justifyContent = 'center';
  };
}

if (closeArcadeBtn) {
  closeArcadeBtn.onclick = function() {
    // Properly hide the arcade modal
    arcadeHub.style.display = 'none';
    arcadeHub.style.visibility = 'hidden';
    arcadeHub.style.opacity = '0';
    arcadeHub.style.pointerEvents = 'none';
    
    // Reset container
    container.innerHTML = '';
    
    // Show arcade menu elements again
    if (arcadeTitle) arcadeTitle.style.display = '';
    const arcadeLogo = document.getElementById('arcade-logo');
    if (arcadeLogo) arcadeLogo.style.display = '';
    if (arcadeMenuRow) arcadeMenuRow.style.display = '';
    if (closeArcadeBtn) closeArcadeBtn.style.display = '';
    
    // Clean up game-specific elements/listeners on close
    window.removeEventListener('keydown', window.snakeKeyListener);
    if (window.tetrisKeyListener) window.removeEventListener('keydown', window.tetrisKeyListener);
    if (window.tetrisKeyUpListener) window.removeEventListener('keyup', window.tetrisKeyUpListener);
    if (window.tetrisSoftDropTimer) clearInterval(window.tetrisSoftDropTimer);
    if (window.tetrisCleanupFns) {
        window.tetrisCleanupFns.forEach(fn => fn());
        window.tetrisCleanupFns = [];
    }
    
    // Stop and remove audio
    if (window.snakeAudio) {
      window.snakeAudio.pause();
      window.snakeAudio.currentTime = 0;
      window.snakeAudio.volume = 0;
      if (window.snakeAudio.parentNode) { window.snakeAudio.parentNode.removeChild(window.snakeAudio); }
      window.snakeAudio = null;
    }
    if (window.tetrisAudio) {
      window.tetrisAudio.pause();
      window.tetrisAudio.currentTime = 0;
      if (window.tetrisAudio.parentNode) { window.tetrisAudio.parentNode.removeChild(window.tetrisAudio); }
      window.tetrisAudio = null;
    }
    if (window.blackjackAudio) {
      window.blackjackAudio.pause();
      window.blackjackAudio.currentTime = 0;
      window.blackjackAudio.volume = 0;
      if (window.blackjackAudio.parentNode) { window.blackjackAudio.parentNode.removeChild(window.blackjackAudio); }
      window.blackjackAudio = null;
    }

    hideControls();
    
    // Force a repaint to ensure the modal is completely hidden
    setTimeout(() => {
      arcadeHub.style.display = 'none';
    }, 10);
  };
}

// Add a new button for the fighting game in the arcade modal (home screen menu)
// Only add if not already present
if (arcadeMenuRow && !arcadeMenuRow.querySelector('[data-game="fighter"]')) {
  const fighterOption = document.createElement('div');
  fighterOption.className = 'arcade-game-option';
  fighterOption.style.display = 'flex';
  fighterOption.style.flexDirection = 'column';
  fighterOption.style.alignItems = 'center';
  fighterOption.style.gap = '0.5rem';
  fighterOption.style.cursor = 'pointer';
  // User: Add your logo image to Images/fighter-logo.png for the arcade menu
  fighterOption.innerHTML = `
    <img src="Images/fighter-logo.png" alt="Fighter Game Logo" style="width:64px; height:64px; object-fit:cover; border-radius:8px; background:#222;" />
    <button class="arcade-game-btn" data-game="fighter">Santa vs Alien</button>
  `;
  arcadeMenuRow.appendChild(fighterOption);
}

// Add launch logic for the new game
function launchFighterGame(mode) {
  // If no mode, show mode select screen
  if (!mode) {
    container.innerHTML = `
      <div id="fighter-outer" style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;">
        <h2 style="color:white;">Santa vs Alien <span style='font-size:0.8em;'>(In development)</span></h2>
        <div style="margin: 18px 0;">
          <button id="fighter-friend-btn" style="padding:0.7rem 1.5rem;margin:0 1rem 1rem 0;font-size:1rem;">Fight a Friend</button>
          <button id="fighter-cpu-btn" style="padding:0.7rem 1.5rem;margin:0 0 1rem 1rem;font-size:1rem;">Practice vs CPU</button>
        </div>
      </div>
    `;
    showControlsBelowGame();
    document.getElementById('fighter-friend-btn').onclick = () => launchFighterGame('friend');
    document.getElementById('fighter-cpu-btn').onclick = () => launchFighterGame('cpu-select');
    return;
  }
  // If CPU mode, show character select
  if (mode === 'cpu-select') {
    container.innerHTML = `
      <div id="fighter-outer" style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;">
        <h2 style="color:white;">Choose Your Character</h2>
        <div style="margin: 18px 0;display:flex;gap:2rem;">
          <button id="choose-santa" style="font-size:2rem;padding:1rem;">🎅<br>Santa</button>
          <button id="choose-alien" style="font-size:2rem;padding:1rem;">👽<br>Alien</button>
        </div>
      </div>
    `;
    showControlsBelowGame();
    document.getElementById('choose-santa').onclick = () => launchFighterGame({mode:'cpu', player:'santa'});
    document.getElementById('choose-alien').onclick = () => launchFighterGame({mode:'cpu', player:'alien'});
    return;
  }
  // Game UI
  container.innerHTML = `
    <div id="fighter-outer" style="display:flex;flex-direction:column;align-items:center;justify-content:flex-start;width:100%;height:100%;">
      <div id="fighter-wrapper" style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:auto;">
        <canvas id="fighter-canvas" width="180" height="90" style="background:#222;display:block;margin:auto;border-radius:8px;"></canvas>
      </div>
      <div style="height:40px;"></div>
    </div>
  `;
  showControlsBelowGame();
  // Start the game with the correct mode
  if (typeof mode === 'object' && mode.mode === 'cpu') {
    startFighterGame('cpu', mode.player);
  } else {
    startFighterGame('friend');
  }
}

// Helper to show controls bar below the game container, never inside or overlapping
function showControlsBelowGame() {
  window.controlsDiv.style.position = 'static';
  window.controlsDiv.style.bottom = '';
  window.controlsDiv.style.left = '';
  window.controlsDiv.style.width = '100%';
  window.controlsDiv.style.zIndex = '1003';
  window.controlsDiv.style.display = 'flex';
  window.controlsDiv.style.marginTop = '32px';
  window.controlsDiv.style.marginBottom = '0';
  window.controlsDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  window.controlsDiv.style.justifyContent = 'center';
  window.controlsDiv.style.gap = '1rem';
  if (window.controlsDiv.parentNode) {
    window.controlsDiv.parentNode.removeChild(window.controlsDiv);
  }
  // Place controls bar after the fighter-outer div
  if (container.querySelector('#fighter-outer')) {
    container.querySelector('#fighter-outer').after(window.controlsDiv);
  } else {
    container.appendChild(window.controlsDiv);
  }
  showControls();
}

// Update arcade menu click logic to handle the new game
if (arcadeMenuRow) {
  arcadeMenuRow.onclick = function(e) {
    // Find the closest game option div
    const gameOption = e.target.closest('.arcade-game-option');
    if (!gameOption) return;
    const gameBtn = gameOption.querySelector('.arcade-game-btn');
    if (!gameBtn) return;
    const game = gameBtn.getAttribute('data-game');
    container.innerHTML = '';
    hideControls();
    if (arcadeTitle) arcadeTitle.style.display = 'none';
    if (arcadeMenuRow) arcadeMenuRow.style.display = 'none';
    if (closeArcadeBtn) closeArcadeBtn.style.display = 'none';
    if (game === 'snake') {
      launchSnakeGame();
      console.log('Snake color picker shown');
    } else if (game === 'tetris') {
      launchTetrisGame();
      console.log('Tetris launched');
    } else if (game === 'blackjack') {
      launchBlackjackGame();
      console.log('Blackjack launched');
    } else if (game === 'fighter') {
      launchFighterGame();
      console.log('Fighter launched');
    }
  };
}

// The startSnakeGame and startTetrisGame functions will be defined in their respective files

function launchSnakeGame() {
  // Stop and remove any previous audio element using the global reference
  if (window.snakeAudio) {
    window.snakeAudio.pause();
    window.snakeAudio.currentTime = 0;
    window.snakeAudio.volume = 0; // Ensure muted before removal
    if (window.snakeAudio.parentNode) {
      window.snakeAudio.parentNode.removeChild(window.snakeAudio);
    }
  }
  window.snakeAudio = null; // Clear global reference

  // Create and append the audio element to arcadeHub for persistence
  const snakeAudio = document.createElement('audio');
  snakeAudio.id = 'snake-audio';
  snakeAudio.src = 'raindrops.mp3';
  snakeAudio.loop = true; // Ensure it loops throughout the game
  snakeAudio.volume = 0.5; // Set initial volume
  arcadeHub.appendChild(snakeAudio);
  window.snakeAudio = snakeAudio; // Store globally

  // Set up the color picker UI
  container.innerHTML = `<div id='snake-color-picker-wrapper' style='display:flex;flex-direction:column;align-items:center;gap:1rem; flex-grow: 1; width: 100%;'>
    <label style='color:white;font-size:1.1rem;'>Choose your snake color:</label>
    <input type='color' id='snake-color-input' value='#00ff00' style='width:60px;height:40px;border:none;background:none;'>
    <button id='start-snake-btn'>Start</button>
  </div>`;

  // Add click handler for the start button
  document.getElementById('start-snake-btn').onclick = function() {
    const color = document.getElementById('snake-color-input').value;
    // Hide the arcade menu elements
    if (arcadeTitle) arcadeTitle.style.display = 'none';
    if (arcadeMenuRow) arcadeMenuRow.style.display = 'none';
    if (closeArcadeBtn) closeArcadeBtn.style.display = 'none';
    // Set the game UI
    container.innerHTML = `
      <div class='snake-center-outer'>
        <div id='snake-wrapper' style='display:flex;flex-direction:column;align-items:center;position:relative; margin:auto; box-sizing: border-box; flex-grow: 1; width: 100%; z-index: 1002;'>
          <canvas id='snake-canvas' width='242' height='242' style='background:black;display:block;margin:auto;'></canvas>
          <p style='color:white; margin-top: 10px;'>Use arrow keys to play. Eat the squares!</p>
          <div id='snake-countdown-overlay' style='position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;color:white;background:rgba(0,0,0,0.7);z-index:2;'></div>
        </div>
      </div>
    `;
    // Reset controls bar style before appending
    window.controlsDiv.style.position = 'static';
    window.controlsDiv.style.bottom = '';
    window.controlsDiv.style.left = '';
    window.controlsDiv.style.width = '100%';
    window.controlsDiv.style.zIndex = '';
    window.controlsDiv.style.display = 'flex';
    window.controlsDiv.style.marginTop = '24px';
    window.controlsDiv.style.marginBottom = '0';
    window.controlsDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    if (window.controlsDiv.parentNode) {
      window.controlsDiv.parentNode.removeChild(window.controlsDiv);
    }
    // Append controls bar above the game, below the arcade logo/title
    if (window.controlsDiv.parentNode) {
      window.controlsDiv.parentNode.removeChild(window.controlsDiv);
    }
    showControls();
    // Set only the game markup
    container.innerHTML = `
      <div class='snake-center-outer'>
        <div id='snake-wrapper' style='display:flex;flex-direction:column;align-items:center;position:relative; margin:auto; box-sizing: border-box; flex-grow: 1; width: 100%; z-index: 1002;'>
          <canvas id='snake-canvas' width='242' height='242' style='background:black;display:block;margin:auto;'></canvas>
          <p style='color:white; margin-top: 10px;'>Use arrow keys to play. Eat the squares!</p>
          <div id='snake-countdown-overlay' style='position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;color:white;background:rgba(0,0,0,0.7);z-index:2;'></div>
        </div>
      </div>
    `;
    // Insert controls bar above the game
    container.insertBefore(window.controlsDiv, container.firstChild);
    showControls(); // Show controls immediately after appending
    hideControls(); // Hide controls during countdown
    let count = 3;
    const overlay = document.getElementById('snake-countdown-overlay');
    function nextCount() {
      if (count > 0) {
        overlay.textContent = count;
        count--;
        setTimeout(nextCount, 800);
      } else {
        overlay.textContent = 'Go!';
        setTimeout(() => {
          overlay.style.display = 'none';
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
          showControls(); // Show controls once the game starts
          if (window.snakeAudio) {
            window.snakeAudio.play().catch(e => console.error('Failed to play audio:', e));
          }
          startSnakeGame(color);
        }, 800);
      }
    }
    nextCount();
  };
}

function launchTetrisGame() {
  // Stop and remove any previous audio element using the global reference
  if (window.tetrisAudio) {
    window.tetrisAudio.pause();
    window.tetrisAudio.currentTime = 0;
    if (window.tetrisAudio.parentNode) {
      window.tetrisAudio.parentNode.removeChild(window.tetrisAudio);
    }
  }
  window.tetrisAudio = null;

  // Force #arcade-hub to be flex-centered and full height
  arcadeHub.style.display = 'flex';
  arcadeHub.style.flexDirection = 'column';
  arcadeHub.style.alignItems = 'center';
  arcadeHub.style.justifyContent = 'center';
  arcadeHub.style.height = '100vh';
  arcadeHub.style.width = '100vw';

  // Hide only the menu title and menu row, but keep the logo visible
  if (arcadeTitle) arcadeTitle.style.display = 'none';
  if (arcadeMenuRow) arcadeMenuRow.style.display = 'none';
  if (closeArcadeBtn) closeArcadeBtn.style.display = 'none';
  // DO NOT hide the arcade logo

  // Remove forced centering on container
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.height = '100%';
  container.style.width = '100%';
  container.style.minHeight = '0';
  container.style.minWidth = '0';
  container.style.margin = '0';
  container.style.padding = '0';

  // Create and append the audio element to arcadeHub for persistence
  const tetrisAudio = document.createElement('audio');
  tetrisAudio.id = 'tetris-audio';
  tetrisAudio.src = 'party-in-the-usa.mp3';
  tetrisAudio.loop = true;
  tetrisAudio.volume = 0.5;
  arcadeHub.appendChild(tetrisAudio);
  window.tetrisAudio = tetrisAudio;

  // Set up the game UI in a centered flexbox container, with buttons at the top and game area centered below
  container.innerHTML = `
    <div id='tetris-outer' style='display:flex;flex-direction:column;align-items:center;justify-content:flex-start;height:100vh;'>
      <div id="tetris-buttons-row" style="display:flex;gap:1rem;justify-content:center;margin-top:40px;margin-bottom:24px;width:100%;">
        <button id="tetris-back-btn" style="padding:0.4rem 0.8rem;background:#4CAF50;color:white;border:none;border-radius:4px;cursor:pointer;box-shadow:0 2px 4px rgba(0,0,0,0.2);font-size:0.9rem;">Return to Arcade Menu</button>
        <button id="tetris-restart-btn" style="padding:0.4rem 0.8rem;background:#2196F3;color:white;border:none;border-radius:4px;cursor:pointer;box-shadow:0 2px 4px rgba(0,0,0,0.2);font-size:0.9rem;">Restart</button>
      </div>
      <div id='tetris-game-area' style='margin: 0 auto; display: flex; flex-direction: column; align-items: center;'>
        <div class="tetris-title-controls" style="margin-bottom:8px;display:flex;flex-direction:column;align-items:center;">
          <h2 class="tetris-title" style="margin-bottom: 8px;">Party in the USA Tetris</h2>
          <p class="tetris-instructions">Use arrow keys to move/rotate. Space to hard drop.</p>
          <div id="tetris-score"></div>
        </div>
      </div>
      <div class='tetris-center-outer' style='margin-bottom:16px;'>
        <canvas id='tetris-canvas' width='204' height='374'></canvas>
      </div>
    </div>
  `;

  // Inject CSS to force centering
  if (!document.getElementById('tetris-centering-style')) {
    const style = document.createElement('style');
    style.id = 'tetris-centering-style';
    style.innerHTML = `
      #tetris-game-area { display: flex !important; flex-direction: column; align-items: center !important; margin: 0 auto !important; }
      #tetris-canvas { display: block !important; margin: 0 auto !important; }
    `;
    document.head.appendChild(style);
  }

  // Attach event handlers to the new buttons
  document.getElementById('tetris-back-btn').onclick = backButton.onclick;
  document.getElementById('tetris-restart-btn').onclick = restartButton.onclick;

  // Play music immediately
  tetrisAudio.play().catch(()=>{});
  startTetrisGame();
}

// Helper to show Tetris controls bar below the game container, never inside or overlapping
function showTetrisControlsBelowGame() {
  window.controlsDiv.style.position = 'static';
  window.controlsDiv.style.bottom = '';
  window.controlsDiv.style.left = '';
  window.controlsDiv.style.width = '100%';
  window.controlsDiv.style.zIndex = '1003';
  window.controlsDiv.style.display = 'flex';
  window.controlsDiv.style.marginTop = '32px';
  window.controlsDiv.style.marginBottom = '0';
  window.controlsDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Subtle dark background
  window.controlsDiv.style.border = 'none';
  window.controlsDiv.style.justifyContent = 'center';
  window.controlsDiv.style.gap = '1rem';
  // Remove all children before appending buttons
  while (window.controlsDiv.firstChild) {
    window.controlsDiv.removeChild(window.controlsDiv.firstChild);
  }
  // Append the two buttons
  backButton.style.display = 'inline-block';
  restartButton.style.display = 'inline-block';
  window.controlsDiv.appendChild(backButton);
  window.controlsDiv.appendChild(restartButton);
  window.controlsDiv.style.display = 'flex';
  // Place controls bar after the tetris-outer div
  const tetrisOuter = container.querySelector('#tetris-outer');
  if (tetrisOuter) {
    tetrisOuter.after(window.controlsDiv);
  } else {
    container.appendChild(window.controlsDiv);
  }
  showControls(); // Ensure controls are visible
  // Debug: print children
  console.log('controlsDiv children:', window.controlsDiv.children);
}

// New function to show Tetris countdown
function showTetrisCountdown() {
  // Hide the start button and rules/title initially
  const tetrisWrapper = document.getElementById('tetris-wrapper');
  const startButton = document.getElementById('start-tetris-btn');
  const rules = tetrisWrapper.querySelector('#tetris-rules');
  const title = tetrisWrapper.querySelector('h2');

  if (startButton) startButton.style.display = 'none';
  if (rules) rules.style.display = 'none';
  if (title) title.style.display = 'none';

  // Create and append countdown overlay
  const overlay = document.createElement('div');
  overlay.id = 'tetris-countdown-overlay';
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.fontSize = '3rem';
  overlay.style.color = 'white';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
  overlay.style.zIndex = '2';

  const canvas = document.getElementById('tetris-canvas');
  if (canvas && canvas.parentNode) {
      // Append overlay to the tetris-wrapper, which is the positioned ancestor
      tetrisWrapper.appendChild(overlay);
  }

  // Start the audio after the countdown begins
  const audio = document.getElementById('tetris-audio');
  if (audio) {
    window.tetrisAudio = audio; // Ensure global reference is set
    audio.volume = 0.5; // Set initial volume
    audio.play().catch(e => console.error('Tetris initial audio play failed:', e));
  }

  let count = 3;
  function nextCount() {
    if (count > 0) {
      overlay.textContent = count;
      count--;
      setTimeout(nextCount, 800);
    } else {
      overlay.textContent = 'Go!';
      setTimeout(() => {
        overlay.style.display = 'none';
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
        showControls(); // Show controls once the game starts
        // Now start the actual Tetris game logic
        startTetrisGame(); // This calls the function from tetris.js
      }, 700);
    }
  }
  nextCount();
  console.log('Tetris countdown started.');
}

function launchBlackjackGame() {
  // Stop any previous audio from other games
  if (window.snakeAudio) {
    window.snakeAudio.pause();
    window.snakeAudio.currentTime = 0;
    window.snakeAudio.volume = 0;
    if (window.snakeAudio.parentNode) window.snakeAudio.parentNode.removeChild(window.snakeAudio);
    window.snakeAudio = null;
  }
  if (window.tetrisAudio) {
    window.tetrisAudio.pause();
    window.tetrisAudio.currentTime = 0;
    if (window.tetrisAudio.parentNode) window.tetrisAudio.parentNode.removeChild(window.tetrisAudio);
    window.tetrisAudio = null;
  }

  // Create and append the audio element for Blackjack
  const blackjackAudio = document.createElement('audio');
  blackjackAudio.id = 'blackjack-audio';
  blackjackAudio.src = 'Skyfall.mp3';
  blackjackAudio.loop = true;
  blackjackAudio.volume = 0.5;
  arcadeHub.appendChild(blackjackAudio);
  window.blackjackAudio = blackjackAudio;

  // Start playing the audio
  blackjackAudio.play().catch(e => console.error('Failed to play Blackjack audio:', e));

  // Set up the initial Blackjack game UI with improved styling
  container.innerHTML = `<style>
    @keyframes blink-gold {
      0%, 100% { background-color: gold; color: black; }
      50% { background-color: #fffbe0; color: #bfa100; }
    }
    #place-bet-btn.blink-gold {
      animation: blink-gold 1s infinite;
      background: gold !important;
      color: black !important;
      border: 2px solid #bfa100 !important;
    }
    #player-hands {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 0.2rem;
      flex-wrap: wrap;
    }
    .player-hand {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 160px;
    }
    .player-hand-label {
      font-size: 0.85rem;
      color: #aaa;
      margin-bottom: 0.2rem;
    }
  </style>
  <div id='blackjack-wrapper' style='display:flex;flex-direction:column;align-items:center;position:relative;margin-top:12px; color:white; font-family: Arial, sans-serif; margin:auto; border: 2px solid grey; padding: 8px; background: rgba(50, 50, 50, 0.5); box-sizing: border-box; max-width: 800px; height: calc(100vh - 20px); margin-bottom: 40px; overflow-y: auto;'>
      <h2 style='color:white;margin-bottom:0.3rem;font-size:1.1rem;'>Blackjack</h2>
      <div style='font-size:0.72rem;color:#ccc;margin-bottom:0.3rem;'>Scroll to see chips and place bet</div>
      <div id='bj-count-toggle-row' style='display:flex;align-items:center;gap:1.2rem;margin-bottom:0.2rem;'>
        <button id='toggle-count-btn' style='font-size:0.8rem;padding:0.2rem 0.7rem;background:#222;color:#FFD700;border:1px solid #FFD700;border-radius:4px;cursor:pointer;'>Show Count</button>
        <span id='bj-count-stats' style='font-size:0.85rem;color:#FFD700;display:none;'></span>
      </div>
      <div id='dealer-area' style='margin-bottom:0.7rem;text-align:center;'>
        <h3 style='color:white;margin-bottom:0.3rem;font-size:1rem;'>Dealer</h3>
        <div id='dealer-cards' style='display:flex;gap:0.5rem;justify-content:center;min-height:90px;'></div>
        <p id='dealer-value' style='color:white;margin-top:0.3rem;font-size:0.95rem;'></p>
      </div>
      <div id='bj-active-count-row' style='font-size:0.95rem;color:#FFD700;text-align:center;margin-bottom:0.2rem;'></div>
      <div id='player-area' style='margin-bottom:0.2rem;text-align:center;'>
        <h3 style='color:white;margin-bottom:0.3rem;font-size:1rem;'>Player</h3>
        <div id='player-hands'>
          <div class='player-hand' id='player-hand-1'>
            <div class='player-hand-label' id='player-hand-1-label' style='display:none;'>Hand 1</div>
            <div id='player-cards' style='display:flex;gap:0.5rem;justify-content:center;min-height:90px;'></div>
            <p id='player-value' style='color:white;margin-top:0.3rem;font-size:0.95rem;'></p>
          </div>
          <div class='player-hand' id='player-hand-2' style='display:none;'>
            <div class='player-hand-label' id='player-hand-2-label'>Hand 2</div>
            <div id='player-cards-2' style='display:flex;gap:0.5rem;justify-content:center;min-height:90px;'></div>
            <p id='player-value-2' style='color:white;margin-top:0.3rem;font-size:0.95rem;'></p>
          </div>
        </div>
        <div id='game-messages' style='color:yellow;margin:0.3rem 0 0.3rem 0;font-size:1.05rem;text-align:center;min-height:1.2rem;'></div>
        <div id='betting-area' style='margin-bottom:0.2rem;text-align:center;'>
          <p style='color:white;margin-bottom:0.2rem;font-size:0.97rem;'>Chips: <span id='player-chips' style='color:gold;'>1000</span></p>
          <p style='color:white;margin-bottom:0.2rem;font-size:0.97rem;'>Current Bet: <span id='current-bet' style='color:gold;'>0</span></p>
          <div id='chip-buttons' style='display:flex;gap:0.3rem;justify-content:center;margin-bottom:0.3rem;'></div>
          <button id='place-bet-btn' disabled class='blink-gold' style='display:block;margin:0.3rem auto 0 auto;padding:0.35rem 0.7rem;background:gold;color:black;border:2px solid #bfa100;border-radius:4px;cursor:pointer;opacity:0.5;font-size:0.97rem;'>Place Bet</button>
        </div>
        <div id='player-actions' style='display:flex;gap:0.5rem;justify-content:center;margin-top:0.1rem;'>
          <button id='hit-btn' disabled style='padding:0.35rem 0.7rem;background:#2196F3;color:white;border:none;border-radius:4px;cursor:pointer;opacity:0.5;font-size:0.97rem;'>Hit</button>
          <button id='stand-btn' disabled style='padding:0.35rem 0.7rem;background:#FF9800;color:white;border:none;border-radius:4px;cursor:pointer;opacity:0.5;font-size:0.97rem;'>Stand</button>
          <button id='double-btn' disabled style='padding:0.35rem 0.7rem;background:#9C27B0;color:white;border:none;border-radius:4px;cursor:pointer;opacity:0.5;font-size:0.97rem;'>Double</button>
          <button id='split-btn' disabled style='display:none;padding:0.35rem 0.7rem;background:#FFD700;color:black;border:2px solid #bfa100;border-radius:4px;cursor:pointer;opacity:0.5;font-size:0.97rem;'>Split</button>
        </div>
      </div>
    </div>`;
  
  // Place the arcade controls below the game, not inside it
  window.controlsDiv.style.position = 'static';
  window.controlsDiv.style.bottom = '';
  window.controlsDiv.style.left = '';
  window.controlsDiv.style.width = '100%';
  window.controlsDiv.style.zIndex = '';
  window.controlsDiv.style.marginTop = '24px';
  window.controlsDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  if (window.controlsDiv.parentNode) {
    window.controlsDiv.parentNode.removeChild(window.controlsDiv);
  }
  // Append controls after the blackjack-wrapper
  container.appendChild(window.controlsDiv);
  showControls();
  
  // Get element references after setting innerHTML
  const chipsDisplay = document.getElementById('player-chips');
  const betDisplay = document.getElementById('current-bet');
  const dealerCardsArea = document.getElementById('dealer-cards');
  const playerCardsArea = document.getElementById('player-cards');
  const gameMessagesDisplay = document.getElementById('game-messages');
  const chipButtonsArea = document.getElementById('chip-buttons');
  const placeBetButton = document.getElementById('place-bet-btn');
  const hitButton = document.getElementById('hit-btn');
  const standButton = document.getElementById('stand-btn');
  const doubleButton = document.getElementById('double-btn');
  const playerValueDisplay = document.getElementById('player-value');
  const dealerValueDisplay = document.getElementById('dealer-value');
  const bjCountStats = document.getElementById('bj-count-stats');
  const toggleCountBtn = document.getElementById('toggle-count-btn');
  let countVisible = false;
  toggleCountBtn.onclick = function() {
    countVisible = !countVisible;
    bjCountStats.style.display = countVisible ? '' : 'none';
    toggleCountBtn.textContent = countVisible ? 'Hide Count' : 'Show Count';
  };
  
  // Start the Blackjack game logic, passing element references
  const bjActiveCountRow = document.getElementById('bj-active-count-row');
  startBlackjackGame({
    chipsDisplay,
    betDisplay,
    dealerCardsArea,
    playerCardsArea,
    gameMessagesDisplay,
    chipButtonsArea,
    placeBetButton,
    hitButton,
    standButton,
    doubleButton,
    playerValueDisplay,
    dealerValueDisplay,
    bjCountStats,
    bjActiveCountRow
  });
  console.log('launchBlackjackGame: Called startBlackjackGame with element references.');
  console.log('launchBlackjackGame: hitButton element:', hitButton);
  console.log('launchBlackjackGame: standButton element:', standButton);
  console.log('launchBlackjackGame: doubleButton element:', doubleButton);

  // Ensure the Place Bet button blinks only when enabled
  setTimeout(() => {
    const placeBetBtn = document.getElementById('place-bet-btn');
    if (placeBetBtn) {
      const observer = new MutationObserver(() => {
        if (!placeBetBtn.disabled) {
          placeBetBtn.classList.add('blink-gold');
          placeBetBtn.style.opacity = '1';
        } else {
          placeBetBtn.classList.remove('blink-gold');
          placeBetBtn.style.opacity = '0.5';
        }
      });
      observer.observe(placeBetBtn, { attributes: true, attributeFilter: ['disabled'] });
    }
  }, 0);
}
}); 