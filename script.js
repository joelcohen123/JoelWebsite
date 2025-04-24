window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
  
    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
  
    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
  }
  
  
  
  
  
  
  
  // Smooth scrolling helper function
  
  // Rocket (shooting star) animation
  
  // Get the canvas and its context
  const canvas = document.getElementById('rocketCanvas');
  const ctx = canvas.getContext('2d');
  
  const turtleImage = new Image(); 
  turtleImage.src = "turtle2.png"; 
  // Ensure the canvas always matches the window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Define a soft color palette
  const colors = [
    '#ffb3b3', // soft red
    '#ffd9b3', // soft orange
    '#ffffb3', // soft yellow
    '#b3ffb3', // soft green
    '#b3ffff', // soft cyan
    '#b3b3ff', // soft blue
    '#ffb3ff'  // soft magenta
  ];
  
  // Set a modest number of streaks for a subtle effect
  const STREAK_COUNT = 40;
  
  class Streak {
    constructor() {
      // For the initial spawn, use a longer delay so that rockets start entering gradually.
      this.initial = true;
      this.delay = Math.floor(Math.random() * 400); // initial delay: 30-90 frames
      // Do not call reset() immediately, so initial properties remain unset until delay elapses
    }
  
    reset() {
      // Randomly choose a spawn side: off the right edge or off the top edge
      if (Math.random() < 0.5) {
        // Spawn off the right edge: x is greater than canvas.width, y is anywhere on the canvas
        this.x = canvas.width + Math.floor(Math.random() * 100) + 20; // at least 20px off-screen
        this.y = Math.random() * canvas.height / 2;
      } else {
        // Spawn off the top edge: y is less than 0, x is anywhere on the canvas
        this.x = Math.random() * canvas.width + (canvas.width / 2);
        this.y = -Math.floor(Math.random() * 100) - 20; // at least 20px off-screen above
      }
      // Set speed for a subtle diagonal movement (left and down)
      // Set speed for diagonal movement with a constant slope
      const factor = 2 + (Math.random() * 4);
      const slope = 0.5; // constant ratio of vertical to horizontal speed
      this.speedX = -factor;
      this.speedY = factor * slope;
  
      // Choose a random color from the palette
      this.color = colors[Math.floor(Math.random() * colors.length)];
      // Set a random transparency between 0.3 and 0.6
      this.alpha = 0.3 + Math.random() * 0.3;
  
      // Set a short tail length and thin line width
      this.length = 5 + Math.random() * 5;    // 5 to 10 pixels
      this.thickness = 1 + Math.random() * 1;   // 1 to 2 pixels
    }
  
    update() {
      // If a delay is active, decrement it and, when it reaches 0, reset the rocket.
      if (this.delay > 0) {
        this.delay--;
        if (this.delay === 0) {
          this.reset();
        }
        return;
      }
    
      // Normal movement update.
      this.x += this.speedX;
      this.y += this.speedY;
    
      // When the rocket moves off-screen (bottom-left), set a short delay.
      if (this.x < -200 || this.y > canvas.height + 200) {
        // Set a delay between 0 and 9 frames before respawning.
        this.delay = Math.floor(Math.random() * 10);
      }
    }
    
    draw() {
      // Skip drawing while waiting for the delay.
      if (this.delay > 0) return;
  
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.thickness;
      
      // Calculate the tail's endpoint.
      const tailX = this.x - this.speedX * this.length;
      const tailY = this.y - this.speedY * this.length;
      
      // Draw the tail line.
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
      
      // Draw a thicker dot at the end of the tail.
      ctx.beginPath();
      // Set the radius to be larger than the line width; adjust as desired.
      const dotRadius = this.thickness * 1;
      ctx.arc(tailX, tailY, dotRadius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      
      ctx.restore();
  
  
  
  
  
  
        
      
      // COULD DO COLORED TURTLES 
      // const angle = Math.atan2(this.speedY, this.speedX) + Math.PI;
      
      // ctx.translate(this.x, this.y);
      
      // ctx.rotate(angle);
  
  
      // const width = 20; // adjust as needed
      // const height = 20; // adjust as needed
  
      // ctx.drawImage(turtleImage, this.x, this.y, width, height);
    
  
      // ctx.restore();
    }
  }
  
  // Create an array of streaks
  const streaks = [];
  for (let i = 0; i < STREAK_COUNT; i++) {
    streaks.push(new Streak());
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const streak of streaks) {
      streak.update();
      streak.draw();
    }
    requestAnimationFrame(animate);
  }
  
  animate();
  
  
  // Typing animation for the header
  document.addEventListener('DOMContentLoaded', function() {
    const headerElement = document.querySelector('.header-element h1');
    const text = "Hi, I'm Jacob Fishman!";
    let index = 0;
    headerElement.textContent = "";
    
    function typeCharacter() {
      if (index < text.length) {
        headerElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeCharacter, 110); // adjust typing speed here
      }
    }
    
    typeCharacter();
  });
  
  // // Animate typing for additional content headers when they come into view
  // document.addEventListener('DOMContentLoaded', function() {
  //   const contentHeaders = document.querySelectorAll('.content-header');
    
  //   const headerObserver = new IntersectionObserver((entries, observer) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         // Only animate if not already typed
  //         if (!entry.target.dataset.typed) {
  //           const fullText = entry.target.textContent;
  //           entry.target.textContent = "";
  //           let index = 0;
  //           function typeCharacter() {
  //             if (index < fullText.length) {
  //               entry.target.textContent += fullText.charAt(index);
  //               index++;
  //               setTimeout(typeCharacter, 100); // adjust typing speed if needed
  //             } else {
  //               entry.target.dataset.typed = "true";
  //               observer.unobserve(entry.target);
  //             }
  //           }
  //           typeCharacter();
  //         }
  //       }
  //     });
  //   }, { threshold: 0.5 });
    
  //   contentHeaders.forEach(header => headerObserver.observe(header));
  // });
  // Add spin on mouse enter and reverse spin on mouse leave for skills images
  
  
  
  
  
  
  
  
  
  
  // document.addEventListener('DOMContentLoaded', function() {
  //   const skillImages = document.querySelectorAll("#skills img");
  //   skillImages.forEach(img => {
  //     img.addEventListener("mouseenter", function() {
  //       img.style.transition = "transform 1s linear";
  //       img.style.transform = "rotate(360deg)";
  //     });
  //     img.addEventListener("mouseleave", function() {
  //       img.style.transition = "transform 1s linear";
  //       img.style.transform = "rotate(-360deg)";
  //       // Reset the rotation to 0 after the reverse animation
  //       setTimeout(() => {
  //         img.style.transform = "rotate(0deg)";
  //       }, 1000);
  //     });
  //   });
  // });