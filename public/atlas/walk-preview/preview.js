import * as T from './vendor/three.module.js';

const $=id=>document.getElementById(id), scene=new T.Scene();
scene.background=new T.Color('#070b13');scene.fog=new T.Fog('#101823',6,13);
const camera=new T.PerspectiveCamera(62,innerWidth/innerHeight,.015,30);
let renderer;
try {renderer=new T.WebGLRenderer({antialias:false,powerPreference:'high-performance'});}catch{ $('phase').textContent='3D is unavailable. You can still view the portfolio.';throw new Error('WebGL unavailable'); }
renderer.outputColorSpace=T.SRGBColorSpace;renderer.setPixelRatio(1);$('view').append(renderer.domElement);
function resize(){renderer.setSize(Math.min(innerWidth,960),Math.min(innerWidth,960)*innerHeight/innerWidth,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}resize();addEventListener('resize',resize);
let seed=91;function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
function texture(base,grain=.18){const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d'),col=new T.Color(base).convertLinearToSRGB();for(let y=0;y<64;y++)for(let x=0;x<64;x++){const n=1+(random()-.5)*grain;ctx.fillStyle=`rgb(${Math.min(255,col.r*255*n)},${Math.min(255,col.g*255*n)},${Math.min(255,col.b*255*n)})`;ctx.fillRect(x,y,1,1);}const t=new T.CanvasTexture(c);t.magFilter=T.NearestFilter;t.minFilter=T.NearestFilter;t.colorSpace=T.SRGBColorSpace;return t;}
const mat=(color)=>new T.MeshLambertMaterial({map:texture(color,.5)});
const wood=mat('#59483c'),wall=mat('#35454b'),navy=mat('#29364b'),cream=mat('#aaa18a'),black=mat('#15191e'),skin=mat('#ad8065'),pink=mat('#995568');
function box(w,h,d,x,y,z,m,parent=scene){const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);parent.add(o);return o;}
function ball(r,x,y,z,m,parent=scene){const o=new T.Mesh(new T.SphereGeometry(r,8,6),m);o.position.set(x,y,z);parent.add(o);return o;}
function rod(a,b,r,m,parent=scene){const av=new T.Vector3(...a),bv=new T.Vector3(...b),o=new T.Mesh(new T.CylinderGeometry(r,r,av.distanceTo(bv),6),m);o.position.copy(av).add(bv).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bv.sub(av).normalize());parent.add(o);return o;}
// Metres: full-size room, adult eye height 1.68 m, back wall z=-2.5.
box(4.8,.12,7,0,-.06,.5,wood);box(4.8,2.8,.12,0,1.4,-2.5,wall);box(.12,2.8,7,-2.4,1.4,.5,wall);box(.12,2.8,7,2.4,1.4,.5,wall);box(4.8,.1,7,0,2.8,.5,mat('#252d34'));
for(let x=-2.3;x<2.4;x+=.24)box(.009,.004,7,x,.003,.5,black);
for(let z=-2;z<4;z+=.8)box(4.8,.003,.008,0,.004,z,black);
box(1.9,.015,2.1,0,.015,.5,mat('#3b3846'));for(let x of [-.91,.91])box(.06,.02,2.1,x,.02,.5,cream);
// Bed and nightstand.
box(1.2,.3,2.05,-1.65,.24,-.3,wood);box(1.17,.2,1.95,-1.65,.47,-.3,cream);box(1.18,.08,1.4,-1.65,.6,.0,navy);box(.8,.12,.4,-1.65,.62,-1.05,cream);box(1.25,.95,.1,-1.65,.5,-1.38,wood);
box(.45,.55,.45,-1.95,.28,-1.85,wood);
// Window and blue night light.
box(.015,1.2,1.05,-2.32,1.7,-.55,new T.MeshBasicMaterial({color:'#233b68'}));
for(const z of [-1.08,-.55,-.02])box(.05,1.24,.035,-2.29,1.7,z,wood);box(.05,.035,1.1,-2.29,1.7,-.55,wood);
const moon=new T.PointLight('#85a9ef',7,7,2);moon.position.set(-2,2,-.5);scene.add(moon);scene.add(new T.HemisphereLight('#9aafc8','#30231e',1.0));
// Cabinet, CRT and console.
box(1.85,.09,.6,0,.59,-2.02,wood);box(1.85,.09,.6,0,.1,-2.02,wood);for(const x of [-.87,0,.87])box(.07,.49,.55,x,.34,-2.02,wood);
box(.69,.56,.43,.08,.92,-2.02,navy);box(.59,.45,.04,.04,.96,-1.785,cream);box(.53,.38,.02,.04,.97,-1.755,black);
for(let i=0;i<3;i++)ball(.018,.27-i*.055,.69,-1.78,cream);
const led=ball(.009,-.22,.69,-1.78,new T.MeshBasicMaterial({color:'#302414'}));
box(.36,.09,.25,-.57,.68,-1.98,navy);box(.14,.12,.035,-.57,.77,-2.02,cream);box(.2,.035,.1,-.59,.66,-1.73,cream);
// Recognizable rough Chopper silhouette; final plush is an art asset, not this blockout.
ball(.13,.66,.78,-1.98,mat('#8a654a'));ball(.13,.66,.99,-1.97,skin);ball(.14,.66,1.10,-1.98,pink);box(.32,.035,.23,.66,1.07,-1.96,pink);box(.025,.09,.015,.66,1.12,-1.84,cream);box(.085,.025,.015,.66,1.12,-1.84,cream);
for(const x of [.48,.84]){rod([x,1.1,-1.98],[x,1.25,-1.98],.018,wood);rod([x,1.18,-1.98],[x+(x<.6?-.05:.05),1.23,-1.98],.014,wood);ball(.018,x<.6?.61:.71,1.0,-1.851,black);}
// Shelf, manga, straw hat and a simple ship.
for(let y of [.16,.65,1.14])box(.8,.055,.3,1.7,y,-2.18,wood);for(const x of [1.29,2.11])box(.06,1.16,.3,x,.6,-2.18,wood);
for(let i=0;i<7;i++)box(.06,.28,.17,1.4+i*.085,.82,-2.15,i%2?cream:navy);
box(.5,.09,.18,1.7,1.25,-2.15,wood);rod([1.7,1.28,-2.15],[1.7,1.65,-2.15],.012,wood);box(.22,.25,.015,1.81,1.5,-2.15,cream);
const hat=new T.Mesh(new T.CylinderGeometry(.22,.22,.04,12),mat('#b69757'));hat.rotation.x=Math.PI/2;hat.position.set(-.65,1.95,-2.4);scene.add(hat);ball(.13,-.65,1.95,-2.37,mat('#b69757'));
box(.42,.6,.025,.85,1.94,-2.4,cream);box(.31,.29,.03,.85,2.02,-2.38,wood);
// Outlet on back wall left of cabinet. Plug is loose until interaction.
const outlet=new T.Vector3(-1.12,.38,-2.39);box(.11,.17,.025,...outlet.toArray(),cream);for(const x of [-1.145,-1.105])box(.009,.035,.008,x,.4,-2.37,black);
const plug=new T.Group();scene.add(plug);box(.065,.055,.08,0,0,0,black,plug);for(const x of [-.018,.018])box(.009,.025,.025,x,0,-.05,cream,plug);
const loose=new T.Vector3(-1.08,.07,-2.0),inserted=new T.Vector3(-1.12,.4,-2.31);plug.position.copy(loose);
const hand=new T.Group();scene.add(hand);box(.085,.045,.11,0,0,.07,skin,hand);box(.075,.065,.24,.015,-.015,.23,navy,hand);for(let i=0;i<4;i++)box(.017,.026,.06,-.03+i*.02,-.017,.005,skin,hand);box(.025,.04,.06,.05,-.01,.055,skin,hand);hand.visible=false;
let cable;function updateCable(){if(cable){scene.remove(cable);cable.geometry.dispose();}const p=plug.position;const curve=new T.CatmullRomCurve3([new T.Vector3(-.34,.66,-2.12),new T.Vector3(-.87,.06,-1.96),new T.Vector3(p.x+.12,.035,p.z+.16),new T.Vector3(p.x,p.y,p.z+.05)]);cable=new T.Mesh(new T.TubeGeometry(curve,24,.009,5,false),black);scene.add(cable);}updateCable();
// Pixel screen is drawn as an emissive texture on a genuine 3D TV surface.
const screenCanvas=document.createElement('canvas');screenCanvas.width=256;screenCanvas.height=180;const ctx=screenCanvas.getContext('2d'),screenTex=new T.CanvasTexture(screenCanvas);screenTex.magFilter=T.NearestFilter;screenTex.minFilter=T.NearestFilter;screenTex.colorSpace=T.SRGBColorSpace;
const screenMat=new T.MeshBasicMaterial({map:screenTex});box(.51,.36,.005,.04,.97,-1.74,screenMat);
const glow=new T.PointLight('#ffce88',0,4,2);glow.position.set(.05,1.04,-1.35);scene.add(glow);
function drawScreen(mode,t){ctx.fillStyle=mode==='world'?'#348dc9':'#090e17';ctx.fillRect(0,0,256,180);if(mode==='static'){for(let y=0;y<180;y+=4)for(let x=0;x<256;x+=4){let v=40+Math.floor(random()*90);ctx.fillStyle=`rgb(${v},${v},${v})`;ctx.fillRect(x,y,4,4);}}if(mode==='world'){ctx.fillStyle='#bcdfe6';for(const [x,y]of[[25,28],[150,45],[210,19]]){ctx.fillRect(x,y,31,7);ctx.fillRect(x+8,y-6,14,8);}ctx.fillStyle='#507b65';ctx.beginPath();ctx.moveTo(100,140);ctx.lineTo(160,70);ctx.lineTo(210,140);ctx.fill();ctx.fillStyle='#286fba';ctx.fillRect(0,130,256,50);ctx.fillStyle='#986637';ctx.fillRect(0,153,95,27);ctx.fillRect(140,141,116,39);ctx.fillStyle='#84ac4b';ctx.fillRect(0,151,95,6);ctx.fillRect(140,139,116,6);ctx.fillStyle='#efd077';ctx.fillRect(43,123,14,7);ctx.fillStyle='#b84e43';ctx.fillRect(46,136,9,11);ctx.fillStyle='#efbe95';ctx.fillRect(47,130,8,7);ctx.fillStyle='#202c45';ctx.fillRect(45,147,5,5);ctx.fillRect(52,147,5,5);for(let i=0;i<3;i++){ctx.fillStyle='#efd077';ctx.fillRect(160+i*26,116+Math.sin(t*2+i)*2,5,8);}}screenTex.needsUpdate=true;}
const initial=[0,1.68,3.6],near=[-.45,1.68,-.65],low=[-.9,.82,-1.35],front=[.04,1.4,-.7],final=[.04,.97,-1.39];
const tv=[.04,1,-2],socket=[-1.08,.25,-2.1];const v=a=>new T.Vector3(...a),mix=(a,b,t)=>v(a).lerp(v(b),t),ease=t=>t*t*(3-2*t),clamp=t=>Math.max(0,Math.min(1,t));
let state='doorway',elapsed=0,total=0,last=performance.now(),paused=false;const durations={walk:3.5,notice:1.2,plug:2.2,rise:1,wake:1.4,enter:2.5};
const reduced=$('motion');reduced.checked=matchMedia('(prefers-reduced-motion: reduce)').matches;
function setState(s){state=s;elapsed=0;document.body.dataset.phase=s;const texts={doorway:'01 / At the doorway',walk:'02 / Walking toward the TV',notice:'03 / The cord is unplugged',ready:'Your turn · plug in the TV',plug:'04 / Reach · lift · insert',rise:'The power light catches your eye',wake:'05 / The room wakes up',enter:'06 / Into your world',done:'Motion study complete'};$('phase').textContent=texts[s];$('action').hidden=!['doorway','ready'].includes(s);$('action').disabled=false;$('action').textContent=s==='ready'?'Plug in · Enter / Click':'Approach TV';$('end').style.display=s==='done'?'block':'none';if(s==='ready'||s==='doorway')$('action').focus({preventScroll:true});}
function reset(){total=0;plug.position.copy(loose);hand.visible=false;glow.intensity=0;led.material.color.set('#302414');updateCable();setState('doorway');}
$('action').onclick=()=>{if(state==='doorway')setState('walk');else if(state==='ready')setState('plug');};$('replay').onclick=reset;$('skip').onclick=()=>{total=11.8;plug.position.copy(inserted);hand.visible=false;updateCable();setState('done');};
document.addEventListener('visibilitychange',()=>{paused=document.hidden;last=performance.now();});
function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.05);last=now;if(paused)return;const duration=durations[state];if(duration){elapsed+=dt;total+=dt;}
let p=duration?clamp(elapsed/duration):0,e=ease(p),pos=v(initial),target=v(tv),mode='off';
if(state==='walk'){pos=mix(initial,near,reduced.checked?1:e);if(!reduced.checked)pos.y+=Math.sin(p*Math.PI*8)*.014*Math.sin(p*Math.PI);}
if(state==='notice'){pos=mix(near,low,reduced.checked?1:e);target=mix(tv,socket,reduced.checked?1:e);}
if(['ready','plug'].includes(state)){pos=v(low);target=v(socket);}
if(state==='plug'){hand.visible=!reduced.checked;const reach=clamp(p/.3),lift=ease(clamp((p-.3)/.48)),insert=ease(clamp((p-.78)/.22));const held=mix(loose.toArray(),[-1.12,.4,-2.17],lift);held.lerp(inserted,insert);plug.position.copy(held);hand.position.copy(held).add(new T.Vector3(.02,-.01,.02+(1-ease(reach))*.45));updateCable();}
if(state==='rise'){pos=mix(low,front,reduced.checked?1:e);target=mix(socket,tv,reduced.checked?1:e);hand.visible=!reduced.checked&&p<.35;hand.position.z+=dt*.3;led.material.color.set('#ffc568');}
if(state==='wake'){pos=v(front);mode=p<.38?'static':'world';}
if(state==='enter'||state==='done'){pos=state==='done'?v(final):mix(front,final,reduced.checked?1:e);target=v([.04,.97,-2]);mode='world';}
if(['doorway','walk','notice','ready'].includes(state))hand.visible=false;
if(mode!=='off')glow.intensity=mode==='static'?.5:2.8;drawScreen(mode,now/1000);camera.position.copy(pos);camera.lookAt(target);renderer.render(scene,camera);
$('time').textContent=`${Math.min(total,11.8).toFixed(1)} / 11.8 seconds`;$('progress').style.width=`${Math.min(total/11.8,1)*100}%`;
if(duration&&p>=1){const next={walk:'notice',notice:'ready',plug:'rise',rise:'wake',wake:'enter',enter:'done'};setState(next[state]);}
}
reset();requestAnimationFrame(animate);


