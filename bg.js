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

let offset = 0;
const period = 2 * Math.PI / 0.05;

function drawBackground() {
  ctx.clearRect(0, 0, width, height);
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
  ctx.strokeStyle = isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(200, 200, 200, 0.1)';
  ctx.lineWidth = 1;

  const spacing = 50;
  const effectiveOffset = offset % period;

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

  offset += 0.2;
  requestAnimationFrame(drawBackground);
}
drawBackground();

// Fade-out effect when navigating away
document.getElementById('backLink').addEventListener('click', function(event) {
  event.preventDefault();
  document.body.style.animation = 'fadeOut 0.5s ease-in-out forwards';
  setTimeout(() => {
    window.location.href = this.href;
  }, 500);
});