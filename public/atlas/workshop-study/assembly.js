const names=['Lantern','Pirate flag','Wanted poster','Left shutter','Right shutter','Ivy','Computer','Chopper plush','Straw hat','Pendant','Books','Mug'];
const initial=[
 {name:'Building',frame:-1,x:0,y:0,w:1000,h:1000},
 {name:'Left shutter',frame:3,x:231,y:430,w:92,h:335},
 {name:'Right shutter',frame:4,x:671,y:430,w:100,h:335},
 {name:'Pendant',frame:9,x:351,y:447,w:115,h:125},
 {name:'Books',frame:10,x:588,y:506,w:87,h:83},
 {name:'Computer',frame:6,x:346,y:619,w:163,h:140},
 {name:'Mug',frame:11,x:328,y:709,w:58,h:49},
 {name:'Chopper plush',frame:7,x:539,y:623,w:142,h:139},
 {name:'Pirate flag',frame:1,x:451,y:292,w:255,h:151},
 {name:'Lantern',frame:0,x:249,y:255,w:140,h:160},
 {name:'Wanted poster',frame:2,x:145,y:581,w:137,h:189},
 {name:'Straw hat',frame:8,x:783,y:462,w:91,h:155},
 {name:'Upper ivy',frame:5,x:132,y:104,w:192,h:293},
 {name:'Trailing ivy',frame:5,x:133,y:300,w:119,h:227},
 {name:'Lower ivy',frame:5,x:766,y:747,w:159,h:177}
];
const canvas=document.getElementById('assembly'),ctx=canvas.getContext('2d');
const selection=document.getElementById('selection'),status=document.getElementById('status');
const controls=Object.fromEntries(['x','y','scale','visible'].map(id=>[id,document.getElementById(id)]));
let layers=initial.map(p=>({...p,scale:100,visible:true}));const sources=[];
function load(src){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error(`Unable to load ${src}`));image.src=src})}
function surface(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
// Three architectural bands enlarge the window without stretching every prop.
const buildingBands=[[0,467,0,435],[467,271,435,335],[738,262,770,230]];
function shell(p){const image=sources[0],s=p.scale/100;for(const [sy,sh,dy,dh] of buildingBands)ctx.drawImage(image,0,sy/1000*image.height,image.width,sh/1000*image.height,p.x,p.y+dy/1000*p.h*s,p.w*s,dh/1000*p.h*s)}
function illumination(){if(!document.getElementById('illumination').checked||!layers[0].visible)return;const pendant=layers.find(p=>p.name==='Pendant'),lantern=layers.find(p=>p.name==='Lantern');ctx.save();ctx.globalCompositeOperation='screen';
 if(pendant.visible){const x=pendant.x+pendant.w*.5*pendant.scale/100,y=pendant.y+pendant.h*.94*pendant.scale/100;ctx.save();ctx.beginPath();ctx.rect(290,444,412,323);ctx.clip();const glow=ctx.createRadialGradient(x,y,8,x,y,230);glow.addColorStop(0,'#ffc14385');glow.addColorStop(.45,'#f3a52750');glow.addColorStop(1,'#c78b1700');ctx.fillStyle=glow;ctx.fillRect(290,444,412,323);ctx.beginPath();ctx.moveTo(x-20,y);ctx.lineTo(x-92,758);ctx.lineTo(x+113,758);ctx.lineTo(x+20,y);ctx.closePath();ctx.fillStyle='#fbc34a15';ctx.fill();ctx.restore()}
 if(lantern.visible){const x=lantern.x+lantern.w*.65*lantern.scale/100,y=lantern.y+lantern.h*.65*lantern.scale/100;const glow=ctx.createRadialGradient(x,y,10,x,y,125);glow.addColorStop(0,'#ffc65b50');glow.addColorStop(1,'#ffb95100');ctx.fillStyle=glow;ctx.fillRect(x-125,y-125,250,250)}ctx.restore()}
function render(){ctx.clearRect(0,0,1000,1000);if(layers[0].visible)shell(layers[0]);illumination();for(const p of layers)if(p.visible&&p.frame!==-1)ctx.drawImage(sources[p.frame+1],p.x,p.y,p.w*p.scale/100,p.h*p.scale/100);document.getElementById('count').textContent=`${layers.filter(p=>p.visible).length} separate layers`}
function refresh(){const p=layers[Number(selection.value)||0];for(const id of ['x','y','scale'])controls[id].value=p[id];controls.visible.checked=p.visible}
function download(href,name){const a=document.createElement('a');a.href=href;a.download=name;a.click()}
try{
 const [base,atlas,interior,reference]=await Promise.all([load('building.png'),load('props.png'),load('interior.png'),load('reference.png')]);const baseCanvas=surface(base.width,base.height);baseCanvas.getContext('2d').drawImage(base,0,0);sources.push(baseCanvas);
 // Compare at matching roof-to-foundation height, without the old board margins.
 const referenceCanvas=document.createElement('canvas');referenceCanvas.width=1000;referenceCanvas.height=1000;referenceCanvas.setAttribute('aria-label','Approved workshop normalized to the same building height as the assembly');referenceCanvas.getContext('2d').drawImage(reference,795,60,635,835,135,15,730,960);document.querySelector('.reference').replaceWith(referenceCanvas);
 const sheet=surface(atlas.width,atlas.height),sc=sheet.getContext('2d',{willReadFrequently:true});sc.drawImage(atlas,0,0);const cellW=atlas.width/3,cellH=atlas.height/3;const frames={};let totalTransparent=0;
 // Alpha-trim each explicitly assigned atlas cell. Rendering sources remain untouched.
 for(let i=0;i<9;i++){const left=Math.round(i%3*cellW),top=Math.round(Math.floor(i/3)*cellH),w=Math.round(cellW),h=Math.round(cellH);const pixels=sc.getImageData(left,top,w,h).data;let minX=w,minY=h,maxX=0,maxY=0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(pixels[(y*w+x)*4+3]>32){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y)}else totalTransparent++}
  if(minX>maxX)throw new Error(`Empty sprite cell: ${names[i]}`);const rect={x:left+minX,y:top+minY,w:maxX-minX+1,h:maxY-minY+1};const sprite=surface(rect.w,rect.h);sprite.getContext('2d').drawImage(atlas,rect.x,rect.y,rect.w,rect.h,0,0,rect.w,rect.h);sources.push(sprite);frames[names[i]]=rect;
 }
 const extra=surface(interior.width,interior.height),ec=extra.getContext('2d',{willReadFrequently:true});ec.drawImage(interior,0,0);
 for(let i=0;i<3;i++){const left=Math.round(i*interior.width/3),right=Math.round((i+1)*interior.width/3),w=right-left,h=interior.height;const pixels=ec.getImageData(left,0,w,h).data;let minX=w,minY=h,maxX=0,maxY=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(pixels[(y*w+x)*4+3]>32){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y)}const r={image:'interior.png',x:left+minX,y:minY,w:maxX-minX+1,h:maxY-minY+1};const sprite=surface(r.w,r.h);sprite.getContext('2d').drawImage(interior,r.x,r.y,r.w,r.h,0,0,r.w,r.h);sources.push(sprite);frames[names[i+9]]=r}
 if(totalTransparent===0)throw new Error('Atlas has no transparent padding');
 layers.forEach((p,i)=>{const o=document.createElement('option');o.value=i;o.textContent=p.name;selection.append(o)});selection.value=String(layers.findIndex(p=>p.name==='Lantern'));selection.onchange=refresh;document.getElementById('illumination').onchange=render;
 for(const [id,control] of Object.entries(controls))control.addEventListener('input',()=>{layers[Number(selection.value)][id]=id==='visible'?control.checked:Number(control.value);render()});
 document.getElementById('download').onclick=()=>{const p=layers[Number(selection.value)];download(sources[p.frame+1].toDataURL(),p.name.toLowerCase().replaceAll(' ','-')+'.png')};
 document.getElementById('save').onclick=()=>{const blob=new Blob([JSON.stringify({source:'props.png',frames,layers,buildingBands,illumination:document.getElementById('illumination').checked},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);download(url,'workshop-placements.json');setTimeout(()=>URL.revokeObjectURL(url),1000)};
 document.getElementById('reset').onclick=()=>{layers=initial.map(p=>({...p,scale:100,visible:true}));refresh();render()};refresh();render();
 status.textContent='15 assembled layers · matching comparison scale · separate warm-light pass. Select a layer to hide, reposition or download it.';
}catch(error){status.textContent=error.message;status.style.color='#ffbe91';document.querySelectorAll('.tools input,.tools button,.tools select').forEach(e=>e.disabled=true)}
