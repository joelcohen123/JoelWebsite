// Santa vs Alien - Advanced Version with CPU Mode

let fighterGameState = null;
let fighterAudioPunch = null;
let fighterAudioWin = null;
let fighterSantaImg = null;
let fighterAlienImg = null;
let fighterBgImg = null;

function startFighterGame(mode = 'friend', playerChar = 'santa') {
  const canvas = document.getElementById('fighter-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 320;
  canvas.height = 160;
  const width = canvas.width;
  const height = canvas.height;
  const groundY = height - 18;

  // Load or create sound effects
  if (!fighterAudioPunch) {
    fighterAudioPunch = new Audio('arcade/punch.mp3');
    fighterAudioPunch.volume = 0.5;
  }
  if (!fighterAudioWin) {
    fighterAudioWin = new Audio('arcade/win.mp3');
    fighterAudioWin.volume = 0.5;
  }

  // Load images if available
  if (!fighterSantaImg) {
    fighterSantaImg = new window.Image();
    fighterSantaImg.src = 'arcade/santa.png';
  }
  if (!fighterAlienImg) {
    fighterAlienImg = new window.Image();
    fighterAlienImg.src = 'arcade/alien.png';
  }
  if (!fighterBgImg) {
    fighterBgImg = new window.Image();
    fighterBgImg.src = 'arcade/fighter-bg.png';
  }

  // Characters
  let santa, alien, cpuChar, playerCharObj;
  santa = {
    x: 30, y: groundY - 60, w: 32, h: 60, color: '#e63946', health: 100, facing: 1, punch: false, punchTimer: 0, vx: 0, vy: 0, onGround: true, block: false
  };
  alien = {
    x: width - 62, y: groundY - 60, w: 32, h: 60, color: '#39e6a3', health: 100, facing: -1, punch: false, punchTimer: 0, vx: 0, vy: 0, onGround: true, block: false
  };
  let cpu = null;
  let player = null;
  if (mode === 'cpu') {
    if (playerChar === 'santa') {
      player = santa;
      cpu = alien;
    } else {
      player = alien;
      cpu = santa;
    }
  }
  const punchRange = 28;
  const punchDamage = 12;
  const blockFactor = 0.4;
  let winner = null;

  function drawChar(char, isSanta) {
    if (isSanta && fighterSantaImg && fighterSantaImg.complete && fighterSantaImg.naturalWidth > 0) {
      ctx.drawImage(fighterSantaImg, char.x, char.y, char.w, char.h);
    } else if (!isSanta && fighterAlienImg && fighterAlienImg.complete && fighterAlienImg.naturalWidth > 0) {
      ctx.drawImage(fighterAlienImg, char.x, char.y, char.w, char.h);
    } else {
      ctx.fillStyle = char.color;
      ctx.fillRect(char.x, char.y, char.w, char.h);
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isSanta ? '🎅' : '👽', char.x + char.w/2, char.y - 14);
    }
    if (char.punch && char.punchTimer > 0) {
      ctx.save();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(char.x + (char.facing > 0 ? char.w : 0), char.y + char.h/2);
      ctx.lineTo(char.x + (char.facing > 0 ? char.w + 14 + 5 * (8-char.punchTimer) : -14 - 5 * (8-char.punchTimer)), char.y + char.h/2);
      ctx.stroke();
      ctx.restore();
    }
    if (char.block) {
      ctx.save();
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.strokeRect(char.x-2, char.y-2, char.w+4, char.h+4);
      ctx.restore();
    }
  }

  function drawHealth() {
    ctx.fillStyle = '#e63946';
    ctx.fillRect(12, 10, santa.health * 0.9, 8);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(12, 10, 90, 8);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('Santa', 14, 8);
    ctx.fillStyle = '#39e6a3';
    ctx.fillRect(width - 102, 10, alien.health * 0.9, 8);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(width - 102, 10, 90, 8);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('Alien', width - 100, 8);
  }

  function drawBackground() {
    if (fighterBgImg && fighterBgImg.complete && fighterBgImg.naturalWidth > 0) {
      ctx.drawImage(fighterBgImg, 0, 0, width, height);
    } else {
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, width, height);
    }
    ctx.fillStyle = '#444';
    ctx.fillRect(0, groundY, width, height-groundY);
  }

  function draw() {
    drawBackground();
    drawHealth();
    drawChar(santa, true);
    drawChar(alien, false);
    if (winner) {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(winner + ' Wins!', width/2, height/2 - 8);
      ctx.font = '12px monospace';
      ctx.fillText('Press SPACE to restart', width/2, height/2 + 14);
      ctx.textAlign = 'start';
    }
  }

  function checkPunch(attacker, defender) {
    if (!attacker.punch || attacker.punchTimer !== 7) return;
    if (attacker.facing > 0 && attacker.x + attacker.w < defender.x) return;
    if (attacker.facing < 0 && attacker.x > defender.x + defender.w) return;
    const dist = Math.abs((attacker.x + attacker.w/2) - (defender.x + defender.w/2));
    if (dist < punchRange + attacker.w/2) {
      let dmg = punchDamage;
      if (defender.block) dmg = Math.round(dmg * blockFactor);
      defender.health = Math.max(0, defender.health - dmg);
      if (fighterAudioPunch) fighterAudioPunch.currentTime = 0, fighterAudioPunch.play();
    }
  }

  function update() {
    if (winner) return;
    [santa, alien].forEach(char => {
      char.x += char.vx;
      char.x = Math.max(0, Math.min(width - char.w, char.x));
      char.vy += 1.2;
      char.y += char.vy;
      if (char.y + char.h >= groundY) {
        char.y = groundY - char.h;
        char.vy = 0;
        char.onGround = true;
      } else {
        char.onGround = false;
      }
    });
    if (santa.punch) {
      checkPunch(santa, alien);
      santa.punchTimer--;
      if (santa.punchTimer <= 0) santa.punch = false;
    }
    if (alien.punch) {
      checkPunch(alien, santa);
      alien.punchTimer--;
      if (alien.punchTimer <= 0) alien.punch = false;
    }
    // CPU AI
    if (mode === 'cpu' && cpu && player) {
      // Move toward player
      if (cpu.x + cpu.w/2 < player.x + player.w/2 - 10) { cpu.vx = 3; cpu.facing = 1; }
      else if (cpu.x + cpu.w/2 > player.x + player.w/2 + 10) { cpu.vx = -3; cpu.facing = -1; }
      else cpu.vx = 0;
      // Jump if player is above
      if (player.y + player.h < cpu.y && cpu.onGround && Math.random() < 0.04) cpu.vy = -13;
      // Block randomly if player is punching
      if (player.punch && Math.random() < 0.3) cpu.block = true; else cpu.block = false;
      // Punch if close
      const dist = Math.abs((cpu.x + cpu.w/2) - (player.x + player.w/2));
      if (dist < punchRange + cpu.w/2 + 2 && !cpu.punch && Math.random() < 0.2) { cpu.punch = true; cpu.punchTimer = 8; }
    }
    if (santa.health <= 0) { winner = 'Alien'; if (fighterAudioWin) fighterAudioWin.currentTime = 0, fighterAudioWin.play(); }
    if (alien.health <= 0) { winner = 'Santa'; if (fighterAudioWin) fighterAudioWin.currentTime = 0, fighterAudioWin.play(); }
  }

  function keyListener(e) {
    if (winner) {
      if (e.key === ' ') {
        window.removeEventListener('keydown', keyListener);
        window.removeEventListener('keyup', keyUpListener);
        startFighterGame(mode, playerChar);
      }
      return;
    }
    // Santa controls: A/D to move, W to jump, S to punch, Q to block
    if (mode === 'friend' || (mode === 'cpu' && playerChar === 'santa')) {
      if (e.key === 'a' || e.key === 'A') { santa.vx = -5; santa.facing = -1; }
      if (e.key === 'd' || e.key === 'D') { santa.vx = 5; santa.facing = 1; }
      if ((e.key === 'w' || e.key === 'W') && santa.onGround) { santa.vy = -12; }
      if (e.key === 's' || e.key === 'S') { if (!santa.punch) { santa.punch = true; santa.punchTimer = 8; } }
      if (e.key === 'q' || e.key === 'Q') { santa.block = true; }
    }
    // Alien controls: Left/Right to move, Up to jump, Down to punch, Shift to block
    if (mode === 'friend' || (mode === 'cpu' && playerChar === 'alien')) {
      if (e.key === 'ArrowLeft') { alien.vx = -5; alien.facing = -1; }
      if (e.key === 'ArrowRight') { alien.vx = 5; alien.facing = 1; }
      if (e.key === 'ArrowUp' && alien.onGround) { alien.vy = -12; }
      if (e.key === 'ArrowDown') { if (!alien.punch) { alien.punch = true; alien.punchTimer = 8; } }
      if (e.key === 'Shift') { alien.block = true; }
    }
  }
  function keyUpListener(e) {
    if (mode === 'friend' || (mode === 'cpu' && playerChar === 'santa')) {
      if (e.key === 'a' || e.key === 'A' || e.key === 'd' || e.key === 'D') santa.vx = 0;
      if (e.key === 'q' || e.key === 'Q') santa.block = false;
    }
    if (mode === 'friend' || (mode === 'cpu' && playerChar === 'alien')) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') alien.vx = 0;
      if (e.key === 'Shift') alien.block = false;
    }
  }

  window.addEventListener('keydown', keyListener);
  window.addEventListener('keyup', keyUpListener);

  function gameLoop() {
    update();
    draw();
    fighterGameState = requestAnimationFrame(gameLoop);
  }
  if (fighterGameState) cancelAnimationFrame(fighterGameState);
  gameLoop();
}

if (document.getElementById('fighter-canvas')) {
  startFighterGame('friend');
} 