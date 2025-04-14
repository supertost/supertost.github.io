
// Resolution of the grid lines would look bad, so this fixes that issue for high dpi screens 
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  const dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.resetTransform();
  ctx.scale(dpr, dpr);
}
window.addEventListener('resize', resize);
resize();


//Animated Wavy Grid Background with Fade Towards Menu
let offset = 0;
const period = 2 * Math.PI / 0.05;

function drawBackground() {
  ctx.clearRect(0, 0, width, height);
  // Set stroke color based on light/dark mode.
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
  ctx.strokeStyle = isLightMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(200, 200, 200, 0.3)';
  ctx.lineWidth = 1;

  const spacing = 50;
  const effectiveOffset = offset % period;

  // Draw vertical wavy lines.
  for (let x = 0; x <= width; x += spacing) {
    ctx.beginPath();
    for (let y = 0; y <= height; y += 10) {
      const wave = Math.sin((y + effectiveOffset) * 0.05 + x * 0.1) * 5;
      if (y === 0) {
        ctx.moveTo(x + wave, y);
      } else {
        ctx.lineTo(x + wave, y);
      }
    }
    ctx.stroke();
  }

  // Draw horizontal wavy lines.
  for (let y = 0; y <= height; y += spacing) {
    ctx.beginPath();
    for (let x = 0; x <= width; x += 10) {
      const wave = Math.sin((x + effectiveOffset) * 0.05 + y * 0.1) * 5;
      if (x === 0) {
        ctx.moveTo(x, y + wave);
      } else {
        ctx.lineTo(x, y + wave);
      }
    }
    ctx.stroke();
  }

  // Fade the grid only in the top-left (menu) area.
  // Use a radial gradient centered at (0,0) so that the grid fades out under the menu.
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  const fadeRadius = 500;
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, fadeRadius);
  grad.addColorStop(0, 'rgba(0,0,0,1)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, fadeRadius, fadeRadius);
  ctx.restore();

  offset += 0.2;
  requestAnimationFrame(drawBackground);
}
drawBackground();

// Menu toggle for mobile
const menu = document.getElementById('menu');
menu.addEventListener('click', function () {
  this.classList.toggle('active');
});


$(document).ready(function() {
$('.hover').on('touchstart touchend', function(e) {
    e.preventDefault();
    $(this).toggle('hover_effect');
});
});

// Fade Transition between pages
const links = document.querySelectorAll('a.menu-item');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.style.transition = 'opacity 0.5s';
    document.body.style.opacity = 0;
    setTimeout(() => {
      window.location.href = this.href;
    }, 500);
  });
});