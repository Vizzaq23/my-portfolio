import {plugPose,releasePose} from './plug-motion.js';
import * as T from './vendor/three.module.js';
import {buildRoom} from './room.js';
import {loadHeroAssets} from './hero-assets.js';
import {RoomAudio} from './audio.js';


const $=id=>document.getElementById(id), scene=new T.Scene();
scene.background=new T.Color('#070b13');scene.fog=new T.Fog('#101823',6,13);
const camera=new T.PerspectiveCamera(62,innerWidth/innerHeight,.015,30);
let renderer;
try {renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});}catch{ $('phase').textContent='3D is unavailable. You can still view the portfolio.';throw new Error('WebGL unavailable'); }
renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.setPixelRatio(1);$('view').append(renderer.domElement);
renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
function resize(){const scale=Math.min(devicePixelRatio||1,1.5,Math.sqrt(2304000/(innerWidth*innerHeight)));renderer.setSize(Math.round(innerWidth*scale),Math.round(innerHeight*scale),false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}resize();addEventListener('resize',resize);
let seed=91;function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
const room=buildRoom(scene);
const {box,ball,cream,black,skin,navy,led}=room;
// Window bounce reveals the hero props without switching on the dark CRT.
const windowBounce=new T.SpotLight('#a7c6ea',5,5,1,.85,2);
windowBounce.position.set(-1.7,2.05,-.75);windowBounce.target.position.set(.2,.85,-2);
scene.add(windowBounce,windowBounce.target);
const warmBounce=new T.PointLight('#ffc58b',0,3,2);warmBounce.position.set(.15,1.3,-1.45);scene.add(warmBounce);
// Small cartridge label and molded console vents become readable on approach.
const labelMat=new T.MeshStandardMaterial({color:'#b89f76',roughness:.85});
box(.105,.065,.002,-.57,.79,-2.005,labelMat);
for(let i=0;i<5;i++)box(.003,.018,.002,-.65+i*.012,.68,-1.848,black);
const audio=new RoomAudio();let gripRig;
$('sound').onclick=async()=>{if(audio.enabled){audio.disable();}else{try{await audio.enable();}catch{$('sound').textContent='Sound unavailable';return;}}$('sound').setAttribute('aria-pressed',String(audio.enabled));$('sound').textContent=audio.enabled?'Sound on':'Sound off';};
// Outlet on back wall left of cabinet. Plug is loose until interaction.
const outlet=new T.Vector3(-1.12,.38,-2.39);box(.11,.17,.025,...outlet.toArray(),cream);for(const x of [-1.145,-1.105])box(.009,.035,.008,x,.4,-2.37,black);
const plug=new T.Group();scene.add(plug);box(.065,.055,.08,0,0,0,black,plug);for(const x of [-.018,.018])box(.009,.025,.025,x,0,-.05,cream,plug);
const loose=new T.Vector3(-1.08,.07,-2.0),inserted=new T.Vector3(-1.12,.4,-2.31);plug.position.copy(loose);
// Close-up hardware: recessed plate screws and a ribbed rubber strain relief.
const metal=new T.MeshStandardMaterial({color:'#8b9398',metalness:.65,roughness:.38});
for(const y of [.32,.44]){const screw=ball(.006,-1.12,y,-2.373,metal);screw.scale.z=.3;box(.007,.0015,.002,-1.12,y,-2.37,black);}
for(let i=0;i<5;i++)box(.038-i*.003,.033-i*.002,.006,0,0,.047+i*.008,black,plug);
const hand=new T.Group();scene.add(hand);box(.085,.045,.11,0,0,.07,skin,hand);box(.075,.065,.24,.015,-.015,.23,navy,hand);for(let i=0;i<4;i++)box(.017,.026,.06,-.03+i*.02,-.017,.005,skin,hand);box(.025,.04,.06,.05,-.01,.055,skin,hand);hand.visible=false;
let cable;function updateCable(){if(cable){scene.remove(cable);cable.geometry.dispose();}const p=plug.position;const curve=new T.CatmullRomCurve3([new T.Vector3(-.34,.66,-2.12),new T.Vector3(-.87,.06,-1.96),new T.Vector3(p.x+.12,.035,p.z+.16),new T.Vector3(p.x,p.y,p.z+.05)]);cable=new T.Mesh(new T.TubeGeometry(curve,24,.009,5,false),black);scene.add(cable);}updateCable();
// Pixel screen is drawn as an emissive texture on a genuine 3D TV surface.
const screenCanvas=document.createElement('canvas');screenCanvas.width=256;screenCanvas.height=180;const ctx=screenCanvas.getContext('2d'),screenTex=new T.CanvasTexture(screenCanvas);screenTex.magFilter=T.NearestFilter;screenTex.minFilter=T.NearestFilter;screenTex.colorSpace=T.SRGBColorSpace;
const screenMat=new T.MeshBasicMaterial({map:screenTex});box(.51,.36,.005,.04,.98,-1.705,screenMat);

// The approved animated title is projected onto the CRT; the homepage remains untouched.
// It stays inert during the room sequence, then becomes the interactive title without reloading.
const homepage=document.createElement('iframe');
homepage.src='/atlas/coast-world/index.html?tv=1&title=cartridge';homepage.title='Quintin game title screen';
homepage.tabIndex=-1;homepage.inert=true;homepage.setAttribute('aria-hidden','true');
homepage.style.cssText='position:fixed;left:0;top:0;width:1280px;height:720px;border:0;pointer-events:none;transform-origin:0 0;display:none;background:#60a9dc;z-index:1';
document.body.append(homepage);
let tvReady=false,tvBooted=false;
const surfaceHeight=()=>1280*innerHeight/innerWidth;
function sizeSurface(){homepage.style.width='1280px';homepage.style.height=surfaceHeight()+'px';}sizeSurface();
function titleBounds(){return [{x:0,y:0},{x:innerWidth,y:0},{x:innerWidth,y:innerHeight},{x:0,y:innerHeight}];}
function fitTitle(){const [a,b]=titleBounds();homepage.style.transform=`translate(${a.x}px,${a.y}px) scale(${(b.x-a.x)/1280})`;}
addEventListener('resize',()=>{sizeSurface();if(state==='title')fitTitle();});
addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==homepage.contentWindow)return;if(event.data?.type==='tv-ready'){tvReady=true;if(parent!==window)parent.postMessage({type:'scene-ready'},location.origin);}if(event.data?.type==='replay-room'){reset();setState('walk');}});
function projectHomepage(visible){
 if(state==='title')return;
 homepage.style.display=visible?'block':'none';if(!visible)return;
 let corners=[[-.215,1.16,-1.701],[.295,1.16,-1.701],[.295,.8,-1.701],[-.215,.8,-1.701]].map(a=>{const p=new T.Vector3(...a).project(camera);return {x:(p.x+1)*innerWidth/2,y:(1-p.y)*innerHeight/2};});
 if(state==='enter'){
   const progress=reduced.checked?1:ease(clamp((elapsed/durations.enter-.7)/.3));
   const destination=titleBounds();
   corners=corners.map((point,i)=>({x:point.x+(destination[i].x-point.x)*progress,y:point.y+(destination[i].y-point.y)*progress}));
 }
 const [a,b,c,d]=corners,dx=b.x-c.x,dy=b.y-c.y,ex=d.x-c.x,ey=d.y-c.y,sx=a.x-b.x+c.x-d.x,sy=a.y-b.y+c.y-d.y,det=dx*ey-ex*dy;
 const g=(sx*ey-ex*sy)/det,h=(dx*sy-sx*dy)/det;
 const w=1280,hh=surfaceHeight();
 homepage.style.transform=`matrix3d(${(b.x-a.x+g*b.x)/w},${(b.y-a.y+g*b.y)/w},0,${g/w},${(d.x-a.x+h*d.x)/hh},${(d.y-a.y+h*d.y)/hh},0,${h/hh},0,0,1,0,${a.x},${a.y},0,1)`;
}

const glow=new T.PointLight('#ffce88',0,4,2);glow.position.set(.05,1.04,-1.35);scene.add(glow);
function drawScreen(mode,t){ctx.fillStyle=mode==='world'?'#348dc9':'#090e17';ctx.fillRect(0,0,screenCanvas.width,screenCanvas.height);if(mode==='static'){for(let y=0;y<screenCanvas.height;y+=4)for(let x=0;x<screenCanvas.width;x+=4){let v=40+Math.floor(random()*90);ctx.fillStyle=`rgb(${v},${v},${v})`;ctx.fillRect(x,y,4,4);}}screenTex.needsUpdate=true;}
const initial=[0,1.68,3.6],near=[-.45,1.68,-.65],low=[-.9,.82,-1.35],front=[.04,1.4,-.7],final=[.04,.98,-1.62];
const tv=[.04,1,-2],socket=[-1.08,.25,-2.1];const v=a=>new T.Vector3(...a),mix=(a,b,t)=>v(a).lerp(v(b),t),ease=t=>t*t*(3-2*t),clamp=t=>Math.max(0,Math.min(1,t));
let previewLight=false;
$('lighting').onclick=()=>{previewLight=!previewLight;$('lighting').setAttribute('aria-pressed',String(previewLight));};
let state='doorway',elapsed=0,total=0,last=performance.now(),paused=false;const durations={walk:3.5,notice:1.2,plug:3.2,rise:1,wake:3.6,enter:2.5};
const reduced=$('motion');reduced.checked=matchMedia('(prefers-reduced-motion: reduce)').matches;
$('start-motion').checked=reduced.checked;
function syncStartMotion(){reduced.checked=$('start-motion').checked;document.body.classList.toggle('motion-reduced',reduced.checked);}
$('start-motion').onchange=syncStartMotion;syncStartMotion();
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event=>{$('start-motion').checked=event.matches;syncStartMotion();});
$('start').onclick=()=>{
 $('start').disabled=true;document.body.classList.remove('starting');
 const begin=()=>{$('start-screen').hidden=true;$('room-ui').inert=false;setState('walk');$('skip').focus({preventScroll:true});};
 if(reduced.checked){begin();return;}
 $('start-screen').classList.add('leaving');setTimeout(begin,750);
};

function setState(s){if(s==='walk')audio.sound('walk');if(s==='notice')audio.endWalk();if(s==='rise')audio.sound('click');if(s==='wake')audio.sound('static');if(s==='enter')audio.sound('chime');if(s==='doorway'||s==='done')audio.stop();state=s;elapsed=0;if(s==='done'){location.assign('/#top');return;}if(s==='title'){audio.stop();document.body.dataset.phase='title';document.getElementById("room-ui").hidden=true;homepage.style.cssText='position:fixed;left:0;top:0;width:1280px;height:720px;transform-origin:0 0;border:0;z-index:3;background:#060a15';sizeSurface();fitTitle();$('view').style.visibility='hidden';homepage.inert=false;homepage.removeAttribute('aria-hidden');homepage.tabIndex=0;homepage.contentWindow.postMessage({type:'tv-interactive'},location.origin);homepage.contentDocument?.querySelector('.start')?.focus();return;}document.body.dataset.phase=s;const texts={doorway:'01 / At the doorway',walk:'02 / Walking toward the TV',notice:'03 / The cord is unplugged',ready:'Your turn · plug in the TV',plug:'04 / Reach · lift · insert',rise:'The power light catches your eye',wake:'05 / The room wakes up',enter:'06 / Into your world',done:'Motion study complete'};$('phase').textContent=texts[s];$('action').hidden=!['doorway','ready'].includes(s);$('action').disabled=false;$('action').textContent=s==='ready'?'Plug in · Enter / Click':'Approach TV';$('end').style.display=s==='done'?'block':'none';if((s==='ready'||s==='doorway')&&$('start-screen').hidden)$('action').focus({preventScroll:true});}
function reset(){tvBooted=false;$('view').style.opacity='1';$('view').style.visibility='visible';document.getElementById("room-ui").hidden=false;homepage.inert=true;homepage.tabIndex=-1;homepage.setAttribute('aria-hidden','true');homepage.style.cssText='position:fixed;left:0;top:0;width:1280px;height:720px;border:0;pointer-events:none;transform-origin:0 0;display:none;background:#060a15;z-index:1';sizeSurface();homepage.contentWindow.postMessage({type:'tv-reset'},location.origin); $('study').value='walk';previewLight=false;$('lighting').setAttribute('aria-pressed','false');total=0;plug.position.copy(loose);plug.rotation.set(0,0,0);hand.rotation.set(0,0,0);gripRig?.pose(0);hand.visible=false;glow.intensity=0;warmBounce.intensity=0;led.material.color.set('#302414');updateCable();setState('doorway');}
$('study').onchange=()=>{const choice=$('study').value;reset();$('study').value=choice;if(choice!=='walk'){$('action').hidden=true;$('phase').textContent=choice==='corner'?'TV + Chopper · asset study':'Articulated hand · grip study';}if(choice==='grip'){plug.position.copy(inserted);updateCable();}};
$('action').onclick=()=>{if(state==='doorway')setState('walk');else if(state==='ready')setState('plug');};$('replay').onclick=reset;$('skip').onclick=()=>{total=15.0;plug.position.copy(inserted);hand.visible=false;updateCable();setState('done');};
document.addEventListener('visibilitychange',()=>{paused=document.hidden;last=performance.now();if(paused)audio.stop();else if(state==='walk')audio.sound('walk');});
function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.05);last=now;if(paused)return;if(state==='done'||state==='title')return;const duration=durations[state];if(duration){elapsed+=dt;total+=dt;}
let p=duration?clamp(elapsed/duration):0,e=ease(p),pos=v(initial),target=v(tv),mode='off';
if(state==='walk'){pos=mix(initial,near,reduced.checked?1:e);if(!reduced.checked)pos.y+=Math.sin(p*Math.PI*8)*.014*Math.sin(p*Math.PI);}
if(state==='notice'){pos=mix(near,low,reduced.checked?1:e);target=mix(tv,socket,reduced.checked?1:e);}
if(['ready','plug'].includes(state)){pos=v(low);target=v(socket);}
if(state==='plug'){
 const pose=plugPose(p);hand.visible=!reduced.checked;
 plug.position.fromArray(pose.position);plug.rotation.set(...pose.rotation);
 hand.rotation.copy(plug.rotation);
 const gripOffset=new T.Vector3(.012,.012,.025).applyQuaternion(plug.quaternion);
 hand.position.copy(plug.position).add(gripOffset).add(v(pose.approach));
 gripRig?.pose(pose.grip);updateCable();
 document.body.dataset.grip=pose.grip.toFixed(3);
}
if(state==='rise'){
 pos=mix(low,front,reduced.checked?1:e);target=mix(socket,tv,reduced.checked?1:e);
 const release=releasePose(p);hand.visible=!reduced.checked&&release.visible;
 hand.position.copy(inserted).add(new T.Vector3(.012,.012,.025)).add(v(release.offset));
 hand.rotation.set(...release.rotation);gripRig?.pose(release.grip);led.material.color.set('#ffc568');
}if(state==='wake'){pos=v(front);mode=elapsed<.6?'static':'world';if(mode==='world'&&!tvBooted&&tvReady){homepage.contentWindow.postMessage({type:'tv-start',reduced:reduced.checked},location.origin);tvBooted=true;elapsed=.6;p=.6/durations.wake;}if(!tvReady&&elapsed>durations.wake-.1)elapsed=durations.wake-.1;}
if(state==='enter'||state==='done'){const distance=Math.min(.255/(Math.tan(camera.fov*Math.PI/360)*camera.aspect),.18/Math.tan(camera.fov*Math.PI/360));const landing=[.04,.98,-1.701+distance];pos=state==='done'?v(landing):mix(front,landing,reduced.checked?1:e);target=v([.04,.98,-2]);mode='world';$('view').style.opacity=String(1-ease(clamp((p-.7)/.3)));}
if(['doorway','walk','notice','ready'].includes(state))hand.visible=false;
if(state==='doorway'&&previewLight)mode='world';
if(state==='doorway'&&$('study').value==='corner'){pos=v([.1,1.24,-.78]);target=v([.16,1,-2]);mode='world';}
if(state==='doorway'&&$('study').value==='grip'){pos=v(low);target=v(socket);hand.visible=true;hand.position.copy(inserted).add(new T.Vector3(.02,.015,.02));gripRig?.pose(1);}
$('lighting').disabled=state!=='doorway';
glow.intensity=mode==='off'?0:mode==='static'?.3:1.15;
warmBounce.intensity+=( (mode==='world'?1.25:0)-warmBounce.intensity)*(1-Math.exp(-dt*3));
if(state==='doorway')led.material.color.set(previewLight?'#ffc568':'#302414');
drawScreen(mode,now/1000);camera.position.copy(pos);camera.lookAt(target);renderer.render(scene,camera);projectHomepage(mode==='world');
$('time').textContent=`${Math.min(total,15.0).toFixed(1)} / 15.0 seconds`;$('progress').style.width=`${Math.min(total/15.0,1)*100}%`;
if(duration&&p>=1&&(state!=='wake'||(tvReady&&tvBooted))){const next={walk:'notice',notice:'ready',plug:'rise',rise:'wake',wake:'enter',enter:'title'};setState(next[state]);}
}
addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==parent)return;if(event.data?.type==='scene-settings')homepage.contentWindow.postMessage(event.data,location.origin);if(event.data?.type==='replay-intro'){reset();setState('walk')}});
try{gripRig=await loadHeroAssets(scene,room,hand);$('asset-status').textContent='Blender models · CC0 textures · optional sound';document.body.dataset.assets='loaded';}
catch(error){console.error('Hero asset load failed',error);$('asset-status').textContent='Asset loading failed · fallback geometry';document.body.dataset.assets='fallback';}
document.body.classList.remove('starting');$('start-screen').hidden=true;$('room-ui').inert=false;reset();setState('walk');requestAnimationFrame(animate);
