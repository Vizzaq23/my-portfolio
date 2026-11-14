import {makeAssets,surface,rect,poly,stroke,colors as C} from './art.mjs';
import {W,H,solids,spawn,lightSources,occluders,plants} from './world.mjs';
import {makePlayer,tick,spring,visibility,STEP} from './physics.mjs';
const canvas=document.getElementById('scene'),c=canvas.getContext('2d',{alpha:false});c.imageSmoothingEnabled=false;
const art=makeAssets(),back=surface(W,H),terrain=surface(W,H),lights=surface(W,H);let p=makePlayer(spawn);
const input={left:false,right:false,jumpPressed:false,jumpReleased:false};const media=matchMedia('(prefers-reduced-motion: reduce)');
let playing=false,paused=media.matches,t=0,simulation=0,last=0,accumulator=0,gust=0;const paper={angle:0,velocity:0},leaf={angle:0,velocity:0};
const stage=document.getElementById('stage'),title=document.getElementById('title'),pause=document.getElementById('pause');
const lighting=document.getElementById('lighting'),colliders=document.getElementById('colliders'),strength=document.getElementById('strength');
const draw=(ctx,name,x,y,scale=1)=>ctx.drawImage(art[name],Math.round(x),Math.round(y),Math.round(art[name].width*scale),Math.round(art[name].height*scale));
function backdrop(){const b=back.getContext('2d');const g=b.createLinearGradient(0,0,0,300);g.addColorStop(0,'#0b1630');g.addColorStop(.6,'#173b59');g.addColorStop(1,'#265366');b.fillStyle=g;b.fillRect(0,0,W,H);
 // Sparse pixel clouds and moon; distant landmarks stay low contrast.
 for(const [x,y,s] of [[111,66,1],[487,83,1.3],[197,146,.7],[307,194,.55]]){b.save();b.translate(x,y);b.scale(s,s);poly(b,[[0,8],[12,8],[12,4],[20,4],[20,0],[34,0],[34,4],[44,4],[44,8],[62,8],[68,11],[0,11]],'#515779');rect(b,4,10,61,2,'#374967');b.restore()}
 poly(b,[[538,46],[542,42],[552,42],[557,46],[559,56],[555,64],[544,65],[537,60]],'#d3e5bc');rect(b,540,49,4,8,'#acc9b2');rect(b,547,45,5,3,'#bdd6b5');rect(b,549,58,5,3,'#b7cfae');
 for(const [x,y] of [[219,35],[402,23],[489,31],[574,78],[311,87],[190,108],[608,49]])rect(b,x,y,1,1,'#c0cdd0');
 poly(b,[[180,238],[180,221],[213,213],[239,223],[269,207],[305,212],[330,203],[351,215],[390,193],[414,205],[443,190],[463,200],[493,182],[513,197],[552,172],[589,185],[640,155],[640,300],[180,300]],'#24475d');
 poly(b,[[174,250],[174,238],[214,228],[239,241],[288,230],[340,240],[386,219],[429,228],[476,207],[530,218],[579,196],[640,205],[640,300],[174,300]],'#19394f');
 poly(b,[[405,260],[414,216],[426,208],[472,208],[479,216],[499,225],[525,220],[535,209],[579,209],[587,227],[640,211],[640,300],[405,300]],'#233b55');
 for(const [x,y,h] of [[418,220,37],[433,215,40],[453,215,28],[538,218,38],[558,214,32]])poly(b,[[x,y],[x+7,y],[x+4,y+h],[x-5,y+h+7]],'#4c4a69');
 rect(b,418,208,54,3,'#58735d');rect(b,476,209,60,5,'#877086');for(const x of [481,501,521]){rect(b,x,213,4,13,'#877086');poly(b,[[x+4,215],[x+8,213],[x+15,215],[x+15,218],[x+4,218]],'#877086')}
 for(const [x,y] of [[550,197],[576,185],[601,197]]){rect(b,x,y,13,10,'#5a536e');poly(b,[[x-2,y],[x+6,y-4],[x+15,y]],'#765569');rect(b,x+3,y+3,2,3,'#d6b16c');rect(b,x+8,y+3,2,3,'#d6b16c')}
 draw(b,'lighthouse',432,173,.8);
}
function buildTerrain(){const b=terrain.getContext('2d');for(let x=0;x<W;x+=32){draw(b,'turf',x,302);for(let y=326;y<H;y+=16)draw(b,'brick',x,y)}draw(b,'workshop',0,38);draw(b,'lantern',46,103);
 for(let i=0;i<5;i++){if(i%2)draw(b,'block',360+i*24,230);else{draw(b,'brick',360+i*24,230,.75);draw(b,'brick',360+i*24,242,.75)}}
 for(let x=16;x<160;x+=32)draw(b,'brick',x,290);draw(b,'pipe',480,253);for(const [x,y,count] of [[552,286,1],[584,270,2],[608,254,1]])for(let i=0;i<count;i++){draw(b,'turf',x+i*32,y);for(let j=y+24;j<302;j+=16)draw(b,'brick',x+i*32,j)}
 rect(b,613,209,2,45,'#caa46b');rect(b,611,207,6,4,'#eac16c');
 // Arch cutout under the path, never confused with a collision gap.
 poly(b,[[64,360],[64,343],[68,335],[75,331],[86,331],[94,337],[96,343],[96,360]],'#0b1b2b');rect(b,77,344,2,2,'#ebc36b');rect(b,86,344,2,2,'#ebc36b');
}
backdrop();buildTerrain();
const lightPolygons=lightSources.map(light=>visibility(light,occluders));
function water(){rect(c,170,237,470,65,'#103447');rect(c,170,237,470,2,'#32606e');for(let j=0;j<9;j++){const y=243+j*6,x=337+Math.sin(t*.55+j)*4,w=24+(j%3)*16;c.globalAlpha=.55-j*.04;rect(c,x-w/2,y,w,1,'#a3c7ac');rect(c,x+23,y+3,12,1,'#4b8790')}c.globalAlpha=1;for(let i=0;i<18;i++){const x=182+(i*47)%430+Math.sin(t*.4+i)*3,y=250+(i*13)%48;rect(c,x,y,10+(i%3)*7,1,i%3?'#1d4c5c':'#326678')}draw(c,'boat',312,251+Math.sin(t*.8)*.7,.72);draw(c,'boat',408,269+Math.sin(t*.7+2)*.7,.65)}
function paintLights(){if(!lighting.checked)return;const b=lights.getContext('2d');b.clearRect(0,0,W,H);b.globalCompositeOperation='source-over';
 lightSources.forEach((light,i)=>{b.save();poly(b,lightPolygons[i],'#fff');b.globalCompositeOperation='source-in';const g=b.createRadialGradient(light.x,light.y,2,light.x,light.y,light.radius);g.addColorStop(0,light.color);g.addColorStop(.35,light.color+'80');g.addColorStop(1,light.color+'00');b.fillStyle=g;b.fillRect(0,0,W,H);b.restore();c.save();c.globalCompositeOperation='screen';c.globalAlpha=light.power*Number(strength.value)/100*(.96+.04*Math.sin(t*1.1+i));c.drawImage(lights,0,0);c.restore();b.clearRect(0,0,W,H)});
 // Workshop pendant has a directional, bounded cone.
 c.save();c.globalCompositeOperation='screen';c.globalAlpha=.10*Number(strength.value)/100;poly(c,[[85,183],[69,229],[105,229]],'#ffc470');c.restore();
 const angle=Math.sin(t*.16)*.12;c.save();c.translate(441,180);c.rotate(angle);c.globalAlpha=.12;const beam=c.createLinearGradient(-84,0,0,0);beam.addColorStop(0,'#ffd47700');beam.addColorStop(1,'#ffd477');poly(c,[[0,-1],[-84,-7],[-84,7],[0,1]],beam);c.restore();
}
function dynamicProps(){
 c.save();c.translate(4,193);c.rotate(paper.angle);draw(c,'poster',0,0);c.restore();
 c.save();c.translate(615,212);c.scale(1,1);c.rotate(paper.angle*.4);draw(c,'flag',0,0,.75);c.restore();
 for(const plant of plants){c.save();c.translate(plant.x,plant.y+32*plant.scale);c.rotate(leaf.angle);draw(c,'fern',-14*plant.scale,-32*plant.scale,plant.scale);c.restore()}
 for(const [x,y,flip] of [[-12,1,1],[70,-16,1],[654,3,-1]]){c.save();c.translate(x,y);c.scale(flip,1);c.rotate(leaf.angle*.5);draw(c,'branch',0,0,1.15);c.restore()}
}
function render(){c.drawImage(back,0,0);water();c.drawImage(terrain,0,0);dynamicProps();const frame=!p.grounded?'jump':Math.abs(p.vx)>8?['idle','walk1','walk2','walk3'][Math.floor(simulation*10)%4]:'idle';c.save();c.translate(Math.round(p.x+8),Math.round(p.y-4));c.scale(p.facing,1);draw(c,frame,-16,0);c.restore();paintLights();
 // Dark close foliage frames the lit playable middle ground.
 c.save();c.globalAlpha=.6;draw(c,'fern',-9,310,1.6);draw(c,'fern',598,323,1.7);c.restore();
 if(colliders.checked){c.strokeStyle='#80f4bc';for(const s of solids)c.strokeRect(s.x+.5,s.y+.5,s.w-1,s.h-1);c.strokeStyle='#ffd277';c.strokeRect(p.x+.5,p.y+.5,p.w,p.h)}
 stage.dataset.playerX=p.x.toFixed(2);stage.dataset.playerY=p.y.toFixed(2);stage.dataset.grounded=String(p.grounded);
}
function animate(now){const delta=last?Math.min((now-last)/1000,.05):0;last=now;if(!document.hidden){accumulator+=delta;while(accumulator>=STEP){if(playing){tick(p,input,solids);input.jumpPressed=false;input.jumpReleased=false;simulation+=STEP}else if(!p.grounded)tick(p,{left:false,right:false},solids);if(!paused){t+=STEP;gust=Math.max(0,gust-STEP*.2);const breeze=Math.sin(t*.4)*.025+Math.sin(t*.9)*.012+gust*.12;spring(paper,breeze,STEP);spring(leaf,breeze*.5,STEP)}accumulator-=STEP}render()}requestAnimationFrame(animate)}requestAnimationFrame(animate);
function clearInput(){input.left=input.right=input.jumpPressed=input.jumpReleased=false}
function start(){playing=true;title.hidden=true;document.getElementById('return').hidden=false;stage.focus();document.getElementById('status').textContent='Move: arrows / A D. Jump: Space. Escape returns to title. Jump onto the pipe and blocks.'}
function returnTitle(){playing=false;clearInput();title.hidden=false;document.getElementById('return').hidden=true;p=makePlayer(spawn);document.getElementById('start').focus();document.getElementById('status').textContent='Editable art prototype · Original room and start screen preserved.'}
document.getElementById('start').onclick=start;document.getElementById('return').onclick=returnTitle;
function key(e,down){const k=e.key.toLowerCase();if(k==='escape'&&playing){returnTitle();return}if(!playing)return;if(['arrowleft','a','arrowright','d',' ','arrowup','w'].includes(k))e.preventDefault();if(['arrowleft','a'].includes(k))input.left=down;if(['arrowright','d'].includes(k))input.right=down;if([' ','arrowup','w'].includes(k)){if(down&&!e.repeat)input.jumpPressed=true;if(!down)input.jumpReleased=true}}
stage.addEventListener('keydown',e=>key(e,true));window.addEventListener('keyup',e=>key(e,false));stage.addEventListener('blur',clearInput);window.addEventListener('blur',clearInput);document.addEventListener('visibilitychange',()=>{clearInput();last=0;accumulator=0});
document.querySelectorAll('[data-input]').forEach(button=>{const action=button.dataset.input;const press=()=>{if(!playing)start();if(action==='jump')input.jumpPressed=true;else input[action]=true};const release=()=>{if(action==='jump')input.jumpReleased=true;else input[action]=false};button.addEventListener('pointerdown',e=>{button.setPointerCapture(e.pointerId);press()});for(const event of ['pointerup','pointercancel','lostpointercapture','blur'])button.addEventListener(event,release);button.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();press()}});button.addEventListener('keyup',release)});
function updatePause(){pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Resume ambience':'Pause ambience'}updatePause();pause.onclick=()=>{paused=!paused;updatePause()};media.addEventListener('change',e=>{paused=e.matches;updatePause()});document.getElementById('gust').onclick=()=>{if(!paused)gust=1};
document.getElementById('studio').onclick=()=>{const panel=document.getElementById('workbench');panel.hidden=!panel.hidden;document.getElementById('studio').setAttribute('aria-expanded',String(!panel.hidden))};
// Real transparent individual PNG downloads and an indexed sheet from editable source.
const sheet=surface(768,512),sheetCtx=sheet.getContext('2d');const manifest={image:'coastal-sprites.png',logicalResolution:[W,H],frames:{}};let sx=0,sy=0,rowH=0;
for(const [name,sprite] of Object.entries(art)){if(sx+sprite.width+8>768){sx=0;sy+=rowH+8;rowH=0}sheetCtx.drawImage(sprite,sx,sy);manifest.frames[name]={x:sx,y:sy,w:sprite.width,h:sprite.height};sx+=sprite.width+8;rowH=Math.max(rowH,sprite.height);const fig=document.createElement('figure');fig.className='asset';const preview=surface(sprite.width,sprite.height);preview.getContext('2d').drawImage(sprite,0,0);preview.style.width=sprite.width*2+'px';const cap=document.createElement('figcaption');cap.textContent=`${name} · ${sprite.width} × ${sprite.height}`;const link=document.createElement('a');link.href=sprite.toDataURL();link.download=`${name}.png`;link.textContent='Download PNG';fig.append(preview,cap,link);document.getElementById('assets').append(fig)}
function download(href,name){const a=document.createElement('a');a.href=href;a.download=name;a.click()}
document.getElementById('export').onclick=()=>download(sheet.toDataURL(),'coastal-sprites.png');
const jsonLink=document.createElement('a');jsonLink.textContent='Download atlas JSON';jsonLink.download='coastal-sprites.json';jsonLink.href=URL.createObjectURL(new Blob([JSON.stringify(manifest,null,2)],{type:'application/json'}));document.querySelector('.options').append(jsonLink);
