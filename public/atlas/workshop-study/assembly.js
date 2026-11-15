const names=['Lantern','Pirate flag','Wanted poster','Left shutter','Right shutter','Ivy','Computer','Chopper plush','Straw hat','Pendant','Books','Mug'];
const initial=[
 {name:'Building',frame:-1,x:0,y:0,w:1000,h:1000},
 {name:'Left shutter',frame:3,x:220,y:464,w:88,h:275},
 {name:'Right shutter',frame:4,x:693,y:464,w:90,h:275},
 {name:'Pendant',frame:9,x:337,y:475,w:122,h:116},
 {name:'Books',frame:10,x:583,y:514,w:91,h:53},
 {name:'Computer',frame:6,x:328,y:605,w:153,h:131},
 {name:'Mug',frame:11,x:308,y:699,w:44,h:36},
 {name:'Chopper plush',frame:7,x:548,y:620,w:135,h:122},
 {name:'Pirate flag',frame:1,x:438,y:331,w:235,h:150},
 {name:'Lantern',frame:0,x:230,y:273,w:130,h:145},
 {name:'Wanted poster',frame:2,x:152,y:602,w:122,h:158},
 {name:'Straw hat',frame:8,x:787,y:490,w:86,h:145},
 {name:'Upper ivy',frame:5,x:142,y:99,w:156,h:245},
 {name:'Lower ivy',frame:5,x:759,y:737,w:120,h:173}
];
const canvas=document.getElementById('assembly'),ctx=canvas.getContext('2d');
const selection=document.getElementById('selection'),status=document.getElementById('status');
const controls=Object.fromEntries(['x','y','scale','visible'].map(id=>[id,document.getElementById(id)]));
let layers=initial.map(p=>({...p,scale:100,visible:true}));const sources=[];
function load(src){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error(`Unable to load ${src}`));image.src=src})}
function surface(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function render(){ctx.clearRect(0,0,1000,1000);for(const p of layers)if(p.visible){const source=p.frame===-1?sources[0]:sources[p.frame+1];ctx.drawImage(source,p.x,p.y,p.w*p.scale/100,p.h*p.scale/100)}document.getElementById('count').textContent=`${layers.filter(p=>p.visible).length} separate layers`}
function refresh(){const p=layers[Number(selection.value)||0];for(const id of ['x','y','scale'])controls[id].value=p[id];controls.visible.checked=p.visible}
function download(href,name){const a=document.createElement('a');a.href=href;a.download=name;a.click()}
try{
 const [base,atlas,interior]=await Promise.all([load('building.png'),load('props.png'),load('interior.png')]);const baseCanvas=surface(base.width,base.height);baseCanvas.getContext('2d').drawImage(base,0,0);sources.push(baseCanvas);
 const sheet=surface(atlas.width,atlas.height),sc=sheet.getContext('2d',{willReadFrequently:true});sc.drawImage(atlas,0,0);const cellW=atlas.width/3,cellH=atlas.height/3;const frames={};let totalTransparent=0;
 // Alpha-trim each explicitly assigned atlas cell. Rendering sources remain untouched.
 for(let i=0;i<9;i++){const left=Math.round(i%3*cellW),top=Math.round(Math.floor(i/3)*cellH),w=Math.round(cellW),h=Math.round(cellH);const pixels=sc.getImageData(left,top,w,h).data;let minX=w,minY=h,maxX=0,maxY=0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(pixels[(y*w+x)*4+3]>32){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y)}else totalTransparent++}
  if(minX>maxX)throw new Error(`Empty sprite cell: ${names[i]}`);const rect={x:left+minX,y:top+minY,w:maxX-minX+1,h:maxY-minY+1};const sprite=surface(rect.w,rect.h);sprite.getContext('2d').drawImage(atlas,rect.x,rect.y,rect.w,rect.h,0,0,rect.w,rect.h);sources.push(sprite);frames[names[i]]=rect;
 }
 const extra=surface(interior.width,interior.height),ec=extra.getContext('2d',{willReadFrequently:true});ec.drawImage(interior,0,0);
 for(let i=0;i<3;i++){const left=Math.round(i*interior.width/3),right=Math.round((i+1)*interior.width/3),w=right-left,h=interior.height;const pixels=ec.getImageData(left,0,w,h).data;let minX=w,minY=h,maxX=0,maxY=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(pixels[(y*w+x)*4+3]>32){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y)}const r={image:'interior.png',x:left+minX,y:minY,w:maxX-minX+1,h:maxY-minY+1};const sprite=surface(r.w,r.h);sprite.getContext('2d').drawImage(interior,r.x,r.y,r.w,r.h,0,0,r.w,r.h);sources.push(sprite);frames[names[i+9]]=r}
 if(totalTransparent===0)throw new Error('Atlas has no transparent padding');
 layers.forEach((p,i)=>{const o=document.createElement('option');o.value=i;o.textContent=p.name;selection.append(o)});selection.value='6';selection.onchange=refresh;
 for(const [id,control] of Object.entries(controls))control.addEventListener('input',()=>{layers[Number(selection.value)][id]=id==='visible'?control.checked:Number(control.value);render()});
 document.getElementById('download').onclick=()=>{const p=layers[Number(selection.value)];download(sources[p.frame+1].toDataURL(),p.name.toLowerCase().replaceAll(' ','-')+'.png')};
 document.getElementById('save').onclick=()=>{const blob=new Blob([JSON.stringify({source:'props.png',frames,layers},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);download(url,'workshop-placements.json');setTimeout(()=>URL.revokeObjectURL(url),1000)};
 document.getElementById('reset').onclick=()=>{layers=initial.map(p=>({...p,scale:100,visible:true}));refresh();render()};refresh();render();
 status.textContent='14 assembled layers · 12 alpha-trimmed props · select any layer to hide, reposition or download it.';
}catch(error){status.textContent=error.message;status.style.color='#ffbe91';document.querySelectorAll('.tools input,.tools button,.tools select').forEach(e=>e.disabled=true)}
