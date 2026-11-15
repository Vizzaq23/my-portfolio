// Same-origin bridge for the existing room's TV lifecycle.
const parameters = new URLSearchParams(location.search);
export const embedded = parameters.has('tv');
if (embedded || parameters.has('screen')) document.body.classList.add('tv-mode');
let started = false, interactive = false, reduced = false, elapsed = 0;
let overlay, context, stage, replay, skip;
if (embedded) {
  document.body.classList.add('tv-mode');
  stage = document.querySelector('.stage');
  stage.inert = true;
  document.querySelectorAll('a[href="/#top"]').forEach(link => link.target = '_top');
  overlay = document.createElement('canvas');
  overlay.id = 'tv-reveal'; overlay.width = 836; overlay.height = 471;
  overlay.setAttribute('aria-hidden', 'true'); stage.append(overlay);
  context = overlay.getContext('2d');
  replay = document.createElement('button'); replay.id = 'room-replay';
  replay.textContent = 'Replay room intro'; replay.hidden = true;
  replay.onclick = () => parent.postMessage({type:'replay-room'}, location.origin);
  skip = document.createElement('button'); skip.id = 'skip-reveal';
  skip.textContent = 'Skip startup'; skip.hidden = true;
  skip.onclick = () => { elapsed = 3; };
  document.body.append(replay, skip);
  addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== parent) return;
    if (event.data?.type === 'tv-start') {
      started = true; elapsed = 0; reduced = Boolean(event.data.reduced);
      overlay.hidden = false;
    }
    if (event.data?.type === 'tv-reset') {
      started = false; interactive = false; elapsed = 0; stage.inert = true;
      overlay.hidden = false; replay.hidden = true; skip.hidden = true;
      paintStartup(0);
    }
    if (event.data?.type === 'tv-interactive') {
      interactive = true; stage.inert = false; replay.hidden = Boolean(event.data.externalControls);
      skip.hidden = elapsed >= 2.9;
      document.querySelector('.start').focus({preventScroll:true});
    }
  });
  paintStartup(0);
}
export function titleReady() {
  if (embedded) parent.postMessage({type:'tv-ready'}, location.origin);
}
export function ambienceAllowed() { return !embedded || started; }
export function paintStartup(dt) {
  if (!embedded) return;
  const w = overlay.width, h = overlay.height;
  const gentle = reduced || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = gentle ? .25 : 2.9;
  if (started) elapsed = Math.min(3, elapsed + dt);
  overlay.dataset.progress = String(Math.min(1, elapsed / duration));
  context.clearRect(0, 0, w, h);
  context.fillStyle = '#060a15';
  if (!started) { context.fillRect(0, 0, w, h); return; }
  if (elapsed >= duration) { overlay.hidden = true; skip.hidden = true; return; }
  if (gentle) {
    context.globalAlpha = 1 - elapsed / duration;
    context.fillRect(0, 0, w, h); context.globalAlpha = 1; return;
  }
  if (elapsed < .65) {
    context.fillRect(0, 0, w, h);
    const width = Math.round(w * .78 * (1 - (1 - Math.min(1, elapsed / .45)) ** 3));
    context.fillStyle = '#9ec7bc';
    context.fillRect(Math.round((w-width)/2), Math.floor(h/2), width, elapsed > .45 ? 4 : 2);
    return;
  }
  const progress = (elapsed - .65) / 2.25;
  for (let y=0;y<h;y+=8) for (let x=0;x<w;x+=8) {
    const hash = ((x*73+y*151+x*y*3)%997)/997;
    const distance = Math.hypot((x-w/2)/(w/2),(y-h/2)/(h/2))/Math.SQRT2;
    if (progress < distance*.78+hash*.18) context.fillRect(x,y,8,8);
  }
  skip.hidden = !interactive;
}
