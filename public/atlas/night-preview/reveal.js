/* Comparison treatments, all composited over the same live scene. */
const revealNames = ['CRT opening', 'Center-out pixels', 'World, title, Start', 'World wakes', 'CRT → center pixels'];
let revealMode = 1, revealClock = 0, revealDuration = 2.4;
const revealButtons = [...document.querySelectorAll('[data-reveal]')];
const revealStatus = document.querySelector('#reveal-status');
const skipReveal = document.querySelector('#skip-reveal');
const reducedReveal = matchMedia('(prefers-reduced-motion: reduce)');
function selectReveal(mode) {
  revealMode = mode; revealClock = 0;
  revealDuration = reducedReveal.matches ? .25 : [2.2, 2.4, 2.8, 2.6, 2.9][mode];
  revealButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === mode)));
  revealStatus.textContent = `${mode + 1}. ${revealNames[mode]}${reducedReveal.matches ? ' — reduced-motion fade' : ''}`;
  skipReveal.disabled = false;
}
revealButtons.forEach((button, i) => { button.onclick = () => selectReveal(i); });
document.querySelector('#replay').onclick = () => selectReveal(revealMode);
skipReveal.onclick = () => { revealClock = revealDuration; skipReveal.disabled = true; };
reducedReveal.addEventListener('change', () => {
  if (reducedReveal.matches) { revealClock = revealDuration; skipReveal.disabled = true; }
});
function revealMotionScale() {
  return revealMode === 3 ? Math.min(1, revealClock / revealDuration) ** 2 : 1;
}
function paintReveal(context, width, height, dt) {
  revealClock = Math.min(revealDuration, revealClock + dt);
  let p = revealClock / revealDuration;
  context.canvas.dataset.reveal = String(revealMode);
  context.canvas.dataset.revealProgress = p.toFixed(3);
  if (p >= 1) { skipReveal.disabled = true; return; }
  context.save(); context.fillStyle = '#060a15';
  if (revealMode === 4 && !reducedReveal.matches) {
    // The phosphor line opens for 650ms; tiles then grow from its center.
    if (revealClock < .65) {
      context.fillRect(0, 0, width, height);
      const opening = Math.min(1, revealClock / .45);
      const lineWidth = Math.round(width * .78 * (1 - (1 - opening) ** 3));
      const lineHeight = revealClock > .45 ? 4 : 2;
      context.fillStyle = '#9ec7bc';
      context.fillRect(Math.round((width - lineWidth) / 2), Math.floor(height / 2), lineWidth, lineHeight);
      context.restore(); return;
    }
    p = (revealClock - .65) / (revealDuration - .65);
  }
  if (reducedReveal.matches || revealMode === 3) {
    // A restrained exposure fade; ambient motion ramps up with it.
    context.globalAlpha = (1 - p) ** 1.6;
    context.fillRect(0, 0, width, height);
  } else if (revealMode === 0) {
    const horizontal = Math.min(1, p / .32);
    const vertical = Math.max(0, (p - .22) / .78) ** 1.5;
    const w = Math.round(width * horizontal / 2) * 2;
    const h = Math.max(2, Math.round(height * vertical / 2) * 2);
    const left = (width - w) / 2, top = (height - h) / 2;
    context.fillRect(0, 0, width, top);
    context.fillRect(0, top + h, width, height);
    context.fillRect(0, top, left, h);
    context.fillRect(left + w, top, width, h);
    context.fillStyle = `rgba(168,210,197,${Math.max(0, .65 - p)})`;
    context.fillRect(left, top, w, 1);
    context.fillRect(left, top + h - 1, w, 1);
  } else {
    const size = revealMode === 1 || revealMode === 4 ? 8 : 6;
    for (let y = 0; y < height; y += size) {
      for (let x = 0; x < width; x += size) {
        const hash = ((x * 73 + y * 151 + x * y * 3) % 997) / 997;
        let threshold;
        if (revealMode === 1 || revealMode === 4) {
          const distance = Math.hypot((x - width / 2) / (width / 2), (y - height / 2) / (height / 2)) / Math.SQRT2;
          threshold = distance * .78 + hash * .18;
        } else {
          const inTitle = x > width * .31 && x < width * .72 && y > height * .12 && y < height * .3;
          const inMenu = x > width * .41 && x < width * .6 && y > height * .31 && y < height * .43;
          threshold = inMenu ? .82 + hash * .16 : inTitle ? .6 + hash * .19 : (1 - y / height) * .4 + hash * .17;
        }
        if (p < threshold) context.fillRect(x, y, size, size);
        else if (p - threshold < .025) {
          context.fillStyle = '#96b9b533'; context.fillRect(x, y, size, size); context.fillStyle = '#060a15';
        }
      }
    }
  }
  if (revealMode === 4 && !reducedReveal.matches && revealClock < .95) {
    // Retain a fading line beneath the growing pixel field, avoiding a hard cut.
    context.fillStyle = `rgba(158,199,188,${(.95 - revealClock) / .3 * .7})`;
    context.fillRect(Math.round(width * .11), Math.floor(height / 2), Math.round(width * .78), 2);
  }
  context.restore();
}
selectReveal(4);
