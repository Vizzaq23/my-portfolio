/* Art-driven motion study. Cropped image warps approximate cloth/foliage;
   these are not separated production sprites or a fluid simulation. */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d', { alpha: false });
const art = new Image();
const W = canvas.width, H = canvas.height;
const base = document.createElement('canvas');
base.width = W; base.height = H;
const b = base.getContext('2d');
const media = matchMedia('(prefers-reduced-motion: reduce)');
const pause = document.querySelector('#pause');
const gust = document.querySelector('#gust');
const slider = document.querySelector('#wind');
let paused = media.matches, loaded = false, time = 0, last = 0, burst = 0;
let bend = 0, velocity = 0;
function controls() {
  pause.textContent = paused ? 'Play motion' : 'Pause motion';
  pause.setAttribute('aria-pressed', String(paused));
  gust.disabled = paused;
}
pause.onclick = () => { paused = !paused; controls(); };
gust.onclick = () => { burst = 2.2; };
media.addEventListener('change', () => { paused = media.matches; controls(); });
controls();
// Source coordinates below use the original 1672 × 941 art canvas.
function warp(x, y, w, h, strength, phase = 0) {
  x /= 2; y /= 2; w /= 2; h /= 2;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  for (let row = 0; row < h; row++) {
    const weight = Math.sin(Math.PI * row / h);
    const offset = Math.round(Math.sin(time * 1.8 + row * .05 + phase) * strength * weight);
    ctx.drawImage(base, x - 4, y + row, w + 8, 1, x - 4 + offset, y + row, w + 8, 1);
  }
  ctx.restore();
}
function draw() {
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(base, 0, 0);
  const wind = Number(slider.value) / 100;
  // Wind is shared; the damped spring adds lag to the cloth and leaves.
  warp(0, 0, 530, 160, bend * 2.4);
  warp(1215, 0, 455, 135, bend * 2.1, 1);
  warp(7, 506, 96, 139, bend * 2.6, -.5);
  warp(249, 304, 137, 84, bend * 1.8, .5);
  warp(0, 770, 1672, 32, bend * .85);
  // Narrow water-only bands avoid the player, blocks, pipe and land.
  for (const [x,y,w,h] of [[510,610,125,157],[757,666,487,105],[775,610,158,54]]) {
    warp(x,y,w,h,.65 + wind * .6, 2);
  }
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
  const reach = Math.sin(time * .36) * 164;
  const beam = ctx.createLinearGradient(lx, ly, lx + reach, ly - 12);
  beam.addColorStop(0, '#ffe2a13d'); beam.addColorStop(1, '#ffe2a100');
  ctx.fillStyle = beam; ctx.beginPath(); ctx.moveTo(lx,ly);
  ctx.lineTo(lx + reach, ly - 19); ctx.lineTo(lx + reach, ly + 2); ctx.fill();
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
    time += dt; burst = Math.max(0, burst - dt * .65);
    const target = Number(slider.value) / 100 * (.65 + .35 * Math.sin(time * .55)) + burst;
    velocity += ((target - bend) * 9 - velocity * 4) * dt;
    bend += velocity * dt;
    draw();
  }
  requestAnimationFrame(tick);
}
art.onload = () => {
  b.imageSmoothingEnabled = false; b.drawImage(art, 0, 0, W, H);
  loaded = true; draw(); canvas.dataset.ready = 'true';
};
art.onerror = () => {
  const error = document.querySelector('#error'); error.hidden = false;
  error.textContent = 'The scene could not load. Refresh to retry, or use the Portfolio link.';
};
art.src = 'night.png';
requestAnimationFrame(tick);
