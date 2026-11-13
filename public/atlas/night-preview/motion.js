/* Independent transparent foliage sprites and articulated, top-pinned paper.
   Spring integration runs at a fixed timestep, independent of display FPS. */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d', { alpha: false });
const art = new Image();
const original = new Image();
const foliage = new Image();
const W = canvas.width, H = canvas.height;
const base = document.createElement('canvas');
base.width = W; base.height = H;
const b = base.getContext('2d');
const media = matchMedia('(prefers-reduced-motion: reduce)');
const pause = document.querySelector('#pause');
const gust = document.querySelector('#gust');
const slider = document.querySelector('#wind');
let paused = media.matches, loaded = false, time = 0, last = 0, burst = 0;
const branches = Array.from({length: 10}, (_, i) => ({
  x: i < 6 ? -12 + i * 47 : 696 + (i - 6) * 49,
  y: -48 - (i * 13 % 20),
  angle: 0, speed: 0, phase: i * 1.73,
  size: 82 + i * 17 % 24,
  rest: (i < 6 ? -.48 : .48) + Math.sin(i * 3) * .28,
}));
const paper = Array.from({length: 12}, () => ({angle:0, speed:0}));
let accumulator = 0;
function spring(body, target, stiffness, damping, dt) {
  body.speed += ((target - body.angle) * stiffness - body.speed * damping) * dt;
  body.angle += body.speed * dt;
}
function breeze(x, phase = 0) {
  const strength = Number(slider.value) / 100;
  return strength * (.45 + .28 * Math.sin(time * .71 - x * .003)
    + .18 * Math.sin(time * 1.39 + phase)) + burst * Math.max(0, 1 - x / 1400);
}
function simulate(dt) {
  time += dt; burst = Math.max(0, burst - dt * .65);
  for (const branch of branches) {
    const target = breeze(branch.x, branch.phase) * .16
      + Number(slider.value) / 100 * Math.sin(time * 2.2 + branch.phase) * .025;
    spring(branch, target, 9 + branch.size * .08, 3.2, dt);
  }
  paper.forEach((part, i) => {
    // Top attachment stays still; flexible lower segments catch more air.
    const target = i === 0 ? 0 : breeze(30, i * .18) * .045
      + Number(slider.value) / 100 * Math.sin(time * 2.6 - i * .45) * .025;
    spring(part, target, 24 - i, 3.8, dt);
  });
}
function controls() {
  pause.textContent = paused ? 'Play motion' : 'Pause motion';
  pause.setAttribute('aria-pressed', String(paused));
  gust.disabled = paused;
}
pause.onclick = () => { paused = !paused; controls(); };
gust.onclick = () => { burst = 2.2; };
media.addEventListener('change', () => { paused = media.matches; controls(); });
controls();
function drawPaper(shadow = false) {
  ctx.save(); ctx.translate(3, 252);
  if (shadow) { ctx.translate(2, 2); ctx.globalAlpha = .24; }
  const segment = 75 / paper.length;
  for (let i = 0; i < paper.length; i++) {
    ctx.rotate(-paper[i].angle);
    if (shadow) { ctx.fillStyle = '#080e20'; ctx.fillRect(0, 0, 50, segment + .2); }
    else ctx.drawImage(original, 6, 504 + i * 150 / paper.length,
      100, 150 / paper.length, 0, 0, 50, segment + .2);
    ctx.translate(0, segment);
  }
  ctx.restore();
  if (!shadow) { ctx.fillStyle = '#263447'; ctx.fillRect(5, 252, 2, 2); ctx.fillRect(49, 252, 2, 2); }
}
function drawCanopy() {
  for (const branch of branches) {
    ctx.save(); ctx.translate(branch.x, branch.y);
    ctx.rotate(branch.rest + branch.angle);
    const w = branch.size, h = w * 1.4;
    ctx.drawImage(foliage, -w * .47, -h * .025, w, h);
    ctx.restore();
  }
}
function draw() {
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(base, 0, 0);
  drawPaper(true); drawPaper(); drawCanopy();
  ctx.save(); ctx.globalCompositeOperation = 'screen';
  // Crisp reflection fragments, with a stable deterministic distribution.
  for (let i = 0; i < 58; i++) {
    const y = 335 + (i * 13 % 49);
    const x = 386 + (i * 37 % 224);
    const glow = Math.max(0, Math.sin(time * 1.4 + i * 2.3));
    ctx.fillStyle = `rgba(132,224,211,${glow * .25})`;
    ctx.fillRect(Math.round(x + Math.sin(time + i) * 2), y, 2 + i % 7, 1);
  }
  // A lighthouse fan narrows as it turns away from the viewer.
  const lx = 574, ly = 229;
  const rotation = time * Math.PI * 2 / 12 - .9;
  const reach = Math.sin(rotation) * 258;
  const facing = Math.max(0, Math.cos(rotation));
  const intensity = .12 + .32 * facing;
  const beam = ctx.createLinearGradient(lx, ly, lx + reach, ly + 9);
  beam.addColorStop(0, `rgba(255,225,156,${intensity})`);
  beam.addColorStop(.5, `rgba(255,225,156,${intensity * .38})`);
  beam.addColorStop(1, '#ffe2a100');
  ctx.fillStyle = beam; ctx.beginPath(); ctx.moveTo(lx,ly);
  ctx.lineTo(lx + reach, ly - 27); ctx.lineTo(lx + reach, ly + 35); ctx.fill();
  // The rotating lens brightens gently when its beam faces the viewer.
  const flare = Math.pow(facing, 12);
  const halo = ctx.createRadialGradient(lx, ly, 1, lx, ly, 9 + flare * 9);
  halo.addColorStop(0, `rgba(255,239,187,${.3 + flare * .45})`);
  halo.addColorStop(1, '#ffe6a100');
  ctx.fillStyle = halo; ctx.fillRect(lx - 18, ly - 18, 36, 36);
  ctx.fillStyle = `rgba(255,246,206,${.35 + flare * .6})`;
  ctx.fillRect(lx - 2 + Math.round(Math.sin(rotation)), ly - 2, 3, 3);
  // Pixel glints on open water follow the same rotation, avoiding foreground props.
  for (let i = 0; i < 14; i++) {
    const y = 340 + i * 3;
    const x = 504 + Math.sin(rotation) * (26 + i * 3);
    ctx.fillStyle = `rgba(255,223,153,${facing * .22 * (1 - i / 18)})`;
    ctx.fillRect(Math.round(x), y, 3 + i % 4, 1);
  }
  for (const [x,y,r] of [[73,169,35],[108,242,50]]) {
    const light = ctx.createRadialGradient(x,y,0,x,y,r);
    const pulse = .075 + Math.sin(time * 2.1) * .012 + Math.sin(time * 5.3) * .008;
    light.addColorStop(0, `rgba(255,165,57,${pulse})`); light.addColorStop(1,'#ffad3900');
    ctx.fillStyle = light; ctx.fillRect(x-r,y-r,r*2,r*2);
  }
  ctx.restore();
  canvas.dataset.time = time.toFixed(2);
}
function tick(now) {
  const dt = Math.min((now - last) / 1000 || 0, .04); last = now;
  if (loaded && !paused && !document.hidden) {
    accumulator += dt;
    while (accumulator >= 1 / 120) { simulate(1 / 120); accumulator -= 1 / 120; }
    draw();
  }
  requestAnimationFrame(tick);
}
Promise.all([art, original, foliage].map(image => new Promise((resolve, reject) => {
  image.onload = resolve; image.onerror = reject;
}))).then(() => {
  b.imageSmoothingEnabled = false; b.drawImage(art, 0, 0, W, H);
  loaded = true; draw(); canvas.dataset.ready = 'true';
}).catch(() => {
  const error = document.querySelector('#error'); error.hidden = false;
  error.textContent = 'The scene could not load. Refresh to retry, or use the Portfolio link.';
});
art.src = 'background.png';
original.src = 'night.png';
foliage.src = 'foliage.png';
requestAnimationFrame(tick);
