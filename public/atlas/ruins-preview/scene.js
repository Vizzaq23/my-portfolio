import {palette as P,ground,skyline,gateBlocks,explorer,spritePalette} from './assets.js';

const ids=['sky','architecture','water','light','life'];
const contexts=Object.fromEntries(ids.map(id=>[id,document.getElementById(id).getContext('2d')]));
for(const c of Object.values(contexts)) c.imageSmoothingEnabled=false;
const rect=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)};
function poly(c,points,color){c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(Math.round(x),Math.round(y)):c.moveTo(Math.round(x),Math.round(y)));c.closePath();c.fill()}
function line(c,points,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(Math.round(x),Math.round(y)):c.moveTo(Math.round(x),Math.round(y)));c.stroke()}
const noise=n=>{const v=Math.sin(n*127.1+31.7)*43758.5453;return v-Math.floor(v)};
function block(c,x,y,w,h,variant=0){rect(c,x,y,w,h,P.shade);poly(c,[[x,y],[x+w-3,y],[x+w,y+3],[x+w,y+h-4],[x+w-6,y+h],[x+2,y+h],[x,y+h-3]],P.face);rect(c,x+2,y,w-5,2,P.edge);rect(c,x+2,y+3,w-5,5,P.stone);if(variant%2===0)line(c,[[x+w*.65,y+1],[x+w*.65,y+7],[x+w*.57,y+10],[x+w*.57,y+15]],P.shade);}
function moss(c,x,y,w){rect(c,x,y,w,3,P.moss);for(let i=0;i<w;i+=4){const h=3+Math.floor(noise(x+i)*9);rect(c,x+i,y+2,3,h,i%3?'#53683c':'#78884b')}}
function drawSky(){const c=contexts.sky;const g=c.createLinearGradient(0,0,0,470);g.addColorStop(0,'#34334e');g.addColorStop(.65,'#68607e');g.addColorStop(1,'#363b52');c.fillStyle=g;c.fillRect(0,0,840,470);
 // Stepped planet crescent and orbital trajectory are independent geometry.
 c.save();c.globalAlpha=.3;for(let y=0;y<130;y+=2){const x=52+Math.sqrt(Math.max(0,150**2-(y-140)**2));rect(c,x,y,2,2,'#c1a8b9');rect(c,x-9,y,8,2,'#77627e')}c.restore();
 line(c,[[145,24],[248,32],[365,51],[478,78],[570,102]],'#625c78');
 const ring=[];for(let a=.25;a<5.45;a+=.035)ring.push([265+99*Math.cos(a),196+99*Math.sin(a)]);for(let a=5.45;a>.25;a-=.035)ring.push([265+87*Math.cos(a),196+87*Math.sin(a)]);poly(c,ring,'#46435f');line(c,[[179,189],[210,205],[260,213],[310,208],[351,191]],'#48445e',3);rect(c,176,179,2,31,'#55506b');
 poly(c,[[0,470],...skyline,[840,470]],'#49475f');poly(c,[[0,470],[0,328],[67,313],[93,331],[129,309],[155,338],[202,325],[252,350],[290,341],[349,359],[413,329],[455,335],[497,305],[558,328],[620,291],[687,322],[740,283],[840,315],[840,470]],'#3b3d54');
 for(let i=0;i<16;i++)rect(c,Math.floor(noise(i)*820),Math.floor(noise(i+28)*100),1,1,'#7c748d');
}
function drawArchitecture(){const c=contexts.architecture;
 poly(c,[[515,373],[527,295],[550,275],[551,136],[576,128],[577,88],[602,67],[611,0],[840,0],[840,373]],'#242b3c');
 poly(c,[[790,370],[790,156],[815,130],[812,82],[840,70],[840,370]],'#30364a');
 // Door recess, stone surrounds, ceramic inserts.
 rect(c,611,152,115,219,'#151f30');rect(c,620,158,98,210,'#1c2638');
 gateBlocks.forEach((b,i)=>block(c,...b,i));
 poly(c,[[577,157],[578,143],[613,108],[665,108],[665,124],[619,124],[588,157]],P.ceramic);
 line(c,[[582,147],[617,113],[657,113]],'#e1cfbd',2);line(c,[[597,145],[624,120],[650,120]],'#79717c',2);
 poly(c,[[756,213],[769,198],[780,198],[780,241],[756,266]],P.ceramic);line(c,[[759,222],[775,206],[779,206]],'#dfc9b1');
 poly(c,[[589,271],[600,271],[611,284],[611,323],[589,309]],'#a39b9e');line(c,[[591,276],[597,276],[607,286],[607,313]],'#d0b9a8');
 rect(c,637,222,67,104,'#111b2b');block(c,641,224,61,99,1);rect(c,647,231,49,84,'#20283a');rect(c,653,229,36,3,'#55556b');
 rect(c,632,214,77,9,'#30394d');rect(c,644,216,14,3,'#171e2e');rect(c,682,216,14,3,'#171e2e');
 line(c,[[642,164],[642,199],[628,212],[628,250]],'#3b5264',3);line(c,[[701,164],[701,199],[715,212],[715,250]],'#3b5264',3);
 line(c,[[635,323],[650,337],[665,337],[665,367]],'#3b5264',3);line(c,[[703,323],[690,337],[680,337],[680,367]],'#3b5264',3);
 // Abandoned cable, rooted masonry and approach terminal.
 line(c,[[555,183],[536,183],[536,254],[524,273],[520,292]],'#151e2b',5);poly(c,[[514,275],[529,280],[522,296],[510,291]],'#34394b');for(let i=0;i<3;i++)line(c,[[513+i*4,291],[510+i*4,301],[510+i*4,306]],'#121c2a',2);
 line(c,[[821,28],[785,39],[765,57],[750,80],[711,94],[685,120],[670,137],[669,154]],'#503f4b',13);line(c,[[821,25],[785,36],[765,54],[750,77],[711,91],[685,117],[670,134]],'#856775',3);
 line(c,[[751,78],[770,95],[774,114],[784,128]],'#604b58',6);
 moss(c,649,103,47);moss(c,552,185,34);moss(c,759,245,28);
 poly(c,[[502,371],[514,326],[545,326],[555,371]],'#292e40');poly(c,[[509,366],[518,329],[542,329],[549,366]],'#5d596c');line(c,[[518,329],[542,329],[546,345]],'#9a8e91');
 block(c,39,280,18,91);block(c,14,267,72,15);moss(c,52,280,17);
 ground.forEach(({x,y,w,h,moss:m,variant})=>{block(c,x,y,w,h,variant);if(m)moss(c,x+7,y+3,15)});
}
drawSky();drawArchitecture();

let time=0,last=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,playerX=166,facing=1;
const held=new Set();const stage=document.querySelector('.stage');
function drawWater(t){const c=contexts.water;c.clearRect(0,0,840,470);rect(c,0,406,840,64,'#181f31');
 for(let i=0;i<74;i++){const row=Math.floor(i/12);const x=(noise(i+61)*840+Math.sin(t*.28+row)*8+t*(row%2?1.2:-.8)+840)%840;const y=410+row*10+noise(i+36)*5;c.globalAlpha=.2+noise(i+7)*.25;rect(c,x,y,8+Math.floor(noise(i)*36),1,i%4?'#7b7194':'#a59cbb')}
 // Discrete reflected light bands travel independently of masonry.
 for(let j=0;j<12;j++){const drift=Math.sin(t*.85+j*1.6)*(2+j*.35);const width=(23-j*.9)*(1+.2*Math.sin(t+j));c.globalAlpha=(1-j/13)*(.45+.09*Math.sin(t*.7));rect(c,531-width/2+drift,408+j*5,width,1+(j%3===0?1:0),P.amber);c.globalAlpha*=.3;rect(c,673-width/2+drift,410+j*5,width*.6,1,P.cyan)}c.globalAlpha=1;
}
function glow(c,x,y,r,color,alpha){const g=c.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');c.globalAlpha=alpha;c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.globalAlpha=1}
function drawLight(t){const c=contexts.light;c.clearRect(0,0,840,470);const pulse=.8+.12*Math.sin(t*.9)+.04*Math.sin(t*1.7);
 glow(c,671,267,48,'#efa64f',.15*pulse);glow(c,532,349,44,'#efa64f',.22*pulse);
 c.globalAlpha=pulse;rect(c,661,266,21,3,P.amber);rect(c,662,265,19,1,'#ffe0a1');
 for(const [x,y,dx,dy] of [[522,339,1,1],[541,339,-1,1],[522,350,1,-1],[541,350,-1,-1]]){rect(c,x+(dx<0?-5:0),y,6,2,P.amber);rect(c,x,y+(dy<0?-5:0),2,6,P.amber)}
 line(c,[[642,190],[642,200],[629,213],[629,226]],P.cyan);line(c,[[701,190],[701,200],[714,213],[714,226]],P.cyan);line(c,[[636,323],[649,336],[664,336],[664,349]],P.cyan);line(c,[[702,323],[690,336],[681,336],[681,362]],P.cyan);
 const bob=Math.round(Math.sin(t*.7)*2);poly(c,[[671,175+bob],[677,182+bob],[665,182+bob]],'#d3c6bf');poly(c,[[665,185+bob],[677,185+bob],[671,192+bob]],'#7d859e');rect(c,667,183+bob,8,1,P.cyan);
 c.globalAlpha=.2*pulse;for(let i=0;i<5;i++)rect(c,520-i*2,369+i*3,23+i*4,1,P.amber);c.globalAlpha=.5;rect(c,196,134,8,1,P.cyan);rect(c,349,176,1,7,P.cyan);c.globalAlpha=1;
}
function fern(c,x,y,t,scale=1){const sway=Math.sin(t*.7+x)*1.8;for(let j=0;j<6;j++){const yy=y-j*5*scale;const xx=x+j*.9+sway*j/6;rect(c,xx,yy,1,5*scale,'#485e3b');poly(c,[[xx,yy],[xx-7*scale,yy-5*scale],[xx-9*scale,yy-5*scale],[xx-7*scale,yy],[xx,yy+2]],j%2?'#536e44':'#688047');poly(c,[[xx,yy],[xx+5*scale,yy-6*scale],[xx+8*scale,yy-7*scale],[xx+7*scale,yy-2*scale]],'#647b45')}}
function drawLife(t,moving){const c=contexts.life;c.clearRect(0,0,840,470);fern(c,21,372,t);fern(c,81,373,t, .7);fern(c,802,371,t,.7);
 const walking=moving&&Math.sin(t*12)>0?1:0;const px=Math.round(playerX),py=339-walking;
 explorer.forEach((row,y)=>[...row].forEach((symbol,x)=>{if(spritePalette[symbol])rect(c,px+(facing>0?x:12-x)*2,py+y*2,2,2,spritePalette[symbol])}));
 for(let i=0;i<7;i++){c.globalAlpha=.25+.2*Math.sin(t*.6+i);rect(c,495+noise(i+4)*64+Math.sin(t*.25+i)*4,285+noise(i+25)*64+Math.sin(t*.3+i)*3,1,1,'#bcad87')}c.globalAlpha=1;
}
function render(dt){const direction=(held.has('right')?1:0)-(held.has('left')?1:0);if(direction){playerX=Math.max(93,Math.min(470,playerX+direction*dt*55));facing=direction}drawWater(time);drawLight(time);drawLife(time,direction&&!paused)}
function frame(now){const dt=last?Math.min((now-last)/1000,.05):0;last=now;if(!document.hidden){if(!paused)time+=dt;render(dt)}requestAnimationFrame(frame)}requestAnimationFrame(frame);
const pause=document.getElementById('pause');function syncPause(){pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Resume motion':'Pause motion'}syncPause();pause.onclick=()=>{paused=!paused;syncPause()};matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{paused=e.matches;syncPause()});
function keyDirection(key){return ['ArrowLeft','a','A'].includes(key)?'left':['ArrowRight','d','D'].includes(key)?'right':null}
stage.addEventListener('keydown',e=>{const dir=keyDirection(e.key);if(dir){e.preventDefault();held.add(dir)}});window.addEventListener('keyup',e=>held.delete(keyDirection(e.key)));stage.addEventListener('blur',()=>held.clear());window.addEventListener('blur',()=>held.clear());document.addEventListener('visibilitychange',()=>{held.clear();last=0});
for(const dir of ['left','right']){const b=document.getElementById(dir);b.addEventListener('pointerdown',e=>{b.setPointerCapture(e.pointerId);held.add(dir)});for(const evt of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(evt,()=>held.delete(dir));b.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();held.add(dir)}});b.addEventListener('keyup',()=>held.delete(dir));b.addEventListener('blur',()=>held.delete(dir))}
const layerButton=document.getElementById('layers');layerButton.onclick=()=>{const panel=document.getElementById('layer-panel');panel.hidden=!panel.hidden;layerButton.setAttribute('aria-expanded',String(!panel.hidden))};
const labels=['Sky & distant ruins','Stone tiles & machinery','Water & reflections','Energy & lighting','Character & foliage'];
ids.forEach((id,i)=>{const label=document.createElement('label');const input=document.createElement('input');input.type='checkbox';input.checked=true;input.onchange=()=>{document.getElementById(id).style.visibility=input.checked?'visible':'hidden'};label.append(input,labels[i]);document.getElementById('layer-options').append(label)});
