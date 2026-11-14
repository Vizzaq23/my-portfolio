// Original editable source art. Each factory returns an independent transparent sprite.
// All art is drawn on one 640×360 logical pixel grid; no generated image is loaded.
export const colors = { ink:'#101c31', mortar:'#283047', brick:'#86545b', brickLight:'#b37369', brickDark:'#573b50', grass:'#78945a', grassDark:'#3f6550', teal:'#25616a', tealLight:'#5b9b99', cream:'#e7ddae', gold:'#e9b759', sky:'#101e3a' };
export function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)}
export function poly(c,points,color){c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(Math.round(x),Math.round(y)):c.moveTo(Math.round(x),Math.round(y)));c.closePath();c.fill()}
export function stroke(c,points,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(Math.round(x),Math.round(y)):c.moveTo(Math.round(x),Math.round(y)));c.stroke()}
export function surface(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function sprite(w,h,draw){const canvas=surface(w,h);draw(canvas.getContext('2d'));return canvas}
const C=colors;
function brick(c,x,y,w=24,h=12,color=C.brick){rect(c,x,y,w,h,C.mortar);poly(c,[[x+1,y+1],[x+w-2,y+1],[x+w-1,y+2],[x+w-1,y+h-2],[x+2,y+h-2],[x+1,y+h-3]],color);rect(c,x+2,y+1,w-4,1,C.brickLight);rect(c,x+2,y+h-3,w-4,1,C.brickDark)}
function masonry(c,x,y,w,h){for(let j=0;j<h;j+=12)for(let i=-(j%24?12:0);i<w;i+=24)brick(c,x+i,y+j,24,12,(i+j)%48===0?'#795260':C.brick)}
function skull(c,x,y){rect(c,x+3,y,9,2,C.cream);rect(c,x+1,y+2,13,7,C.cream);rect(c,x+4,y+9,7,4,C.cream);rect(c,x+3,y+4,3,3,C.ink);rect(c,x+9,y+4,3,3,C.ink);rect(c,x+7,y+8,1,2,C.ink);rect(c,x+6,y+11,1,2,C.ink);rect(c,x+9,y+11,1,2,C.ink)}
function hat(c,x,y){rect(c,x+3,y,10,3,'#e6b659');rect(c,x+1,y+3,14,3,'#e6b659');rect(c,x+1,y+5,14,2,'#aa4b42');rect(c,x-2,y+7,20,2,'#f0c870')}
function plush(c,x,y){rect(c,x+2,y+14,15,11,'#af764e');rect(c,x+4,y+16,11,7,'#dca975');rect(c,x+3,y+23,4,4,'#dca975');rect(c,x+12,y+23,4,4,'#dca975');rect(c,x,y+4,19,11,'#cc7883');rect(c,x-2,y+13,23,3,'#e19399');rect(c,x+7,y+6,2,6,C.cream);rect(c,x+5,y+8,6,2,C.cream);rect(c,x+5,y+18,2,2,C.ink);rect(c,x+12,y+18,2,2,C.ink);rect(c,x+9,y+21,2,1,'#456777');stroke(c,[[x,y+9],[x-4,y+7],[x-4,y+3]],'#cba16b',2);stroke(c,[[x+18,y+9],[x+22,y+6],[x+22,y+2]],'#cba16b',2)}
function character(frame){return sprite(32,48,c=>{
 const airborne=frame===4, step=frame===1?-2:frame===3?2:0;
 // Shoes and independent leg positions.
 rect(c,8+step,34,6,11,C.ink);rect(c,18-step,34,5,11,C.ink);rect(c,8+step,36,4,8,'#42465b');rect(c,19-step,36,3,8,'#42465b');
 rect(c,6+step,44,9,3,'#c1c6c4');rect(c,18-step,44,9,3,'#c1c6c4');rect(c,6+step,47,9,1,C.ink);rect(c,18-step,47,9,1,C.ink);
 poly(c,[[9,20],[22,20],[26,25],[24,35],[8,35],[5,25]],C.ink);rect(c,10,22,12,12,'#292c3d');rect(c,11,23,3,2,'#b6a69b');
 // Small Chopper emblem, rather than random shirt texture.
 rect(c,15,25,6,4,'#d28491');rect(c,14,29,8,1,'#e5a0a5');rect(c,16,30,4,3,'#c79665');rect(c,17,26,1,3,C.cream);rect(c,16,27,3,1,C.cream);
 const arm=airborne?-5:step;rect(c,5,26+arm,4,9,'#c59675');rect(c,24,26-arm,4,9,'#c59675');rect(c,5,29+arm,4,1,'#565164');
 poly(c,[[9,5],[23,5],[25,10],[24,18],[20,22],[12,20],[8,14]],'#d6a47c');rect(c,10,14,3,4,'#a87652');rect(c,13,18,9,3,'#8d694c');rect(c,18,12,2,3,C.ink);rect(c,22,11,2,2,C.ink);rect(c,20,16,4,1,'#925e4c');
 poly(c,[[5,8],[7,4],[4,3],[11,3],[12,0],[16,3],[21,1],[22,4],[28,4],[25,8],[22,10],[14,8],[11,12],[8,13],[8,9]],'#d4a75d');stroke(c,[[7,6],[12,5],[15,3],[17,5],[22,4]],'#f1cf83',2);rect(c,9,12,3,3,'#e6b38b');rect(c,11,20,2,13,'#485466');
 })}
export function makeAssets(){return {
 turf:sprite(32,24,c=>{brick(c,0,7,32,17);rect(c,0,0,32,3,'#a3b96d');rect(c,0,3,32,5,C.grass);poly(c,[[0,8],[0,11],[5,11],[5,8],[12,8],[12,12],[16,12],[16,8],[25,8],[25,10],[29,10],[29,8]],C.grassDark)}),
 brick:sprite(32,16,c=>brick(c,0,0,32,16)),
 block:sprite(24,24,c=>{rect(c,0,0,24,24,C.ink);rect(c,1,1,22,21,'#946b39');rect(c,2,2,20,18,'#d7a04e');rect(c,3,3,18,1,'#ffe1a0');rect(c,3,4,1,15,'#efc879');for(const [x,y] of [[4,4],[19,4],[4,18],[19,18]])rect(c,x,y,1,1,'#6e5139');stroke(c,[[8,8],[8,6],[15,6],[17,8],[17,10],[12,13],[12,15]],'#fff0b5',2);rect(c,11,18,2,2,'#fff0b5')}),
 pipe:sprite(46,49,c=>{rect(c,4,10,38,39,C.ink);rect(c,6,10,34,39,C.teal);rect(c,9,10,4,39,'#448c8c');rect(c,33,10,6,39,'#174651');rect(c,0,0,46,13,C.ink);rect(c,2,2,42,9,'#377b81');rect(c,3,2,40,2,'#89d4c4');rect(c,3,4,2,6,'#59b7b5');rect(c,36,4,7,7,'#225560');rect(c,15,3,1,8,'#4a8d91')}),
 workshop:sprite(194,252,c=>{
 c.save();c.beginPath();c.moveTo(16,44);c.lineTo(164,84);c.lineTo(164,252);c.lineTo(16,252);c.closePath();c.clip();masonry(c,16,44,148,208);rect(c,156,58,8,194,'#453448');c.restore();rect(c,0,219,16,33,C.ink);
 // Chimney and tiled roof silhouette.
 masonry(c,40,0,24,40);rect(c,38,0,29,4,'#797083');poly(c,[[12,24],[180,70],[191,85],[176,85],[8,43]],C.ink);
 for(let r=0;r<3;r++)for(let i=0;i<10;i++){const x=10+i*17,y=24+i*4+r*5;poly(c,[[x,y],[x+17,y+4],[x+17,y+8],[x,y+4]],r===0?'#c38267':r===1?'#a45d55':'#6f4148');stroke(c,[[x+1,y],[x+16,y+4]],'#e1a177')}
 // Window opening and roof shadow.
 poly(c,[[15,48],[163,88],[163,97],[15,57]],'#483448');rect(c,29,116,121,91,C.ink);rect(c,47,122,85,82,'#5c453b');rect(c,49,123,41,80,'#77503a');
 // Wooden shelves, books, monitor and desk.
 rect(c,108,123,22,5,'#312a31');rect(c,108,148,22,4,'#312a31');rect(c,108,175,22,4,'#312a31');for(let i=0;i<5;i++){rect(c,109+i*4,132+(i%2)*3,3,15-(i%2)*3,['#ab5546','#ddb361','#527c76','#898493','#b56b4c'][i]);rect(c,110+i*4,134+(i%2)*3,1,10,'#d1aa77')}
 rect(c,111,156,17,12,'#a97447');rect(c,119,158,3,2,'#4c3633');
 rect(c,84,123,1,13,C.ink);poly(c,[[83,134],[87,134],[96,143],[75,143]],C.ink);rect(c,78,143,15,2,'#edbd65');rect(c,81,145,9,2,'#ffe4a2');
 rect(c,54,160,39,30,'#181e2c');rect(c,56,161,35,26,'#a4997e');rect(c,59,164,29,19,'#273749');stroke(c,[[68,170],[64,173],[68,176]],'#c4dcd0');stroke(c,[[79,170],[83,173],[79,176]],'#c4dcd0');stroke(c,[[76,168],[72,178]],'#c4dcd0');rect(c,71,190,7,6,'#b1a087');rect(c,62,195,25,2,'#b1a087');rect(c,47,200,85,5,'#d6a367');rect(c,47,205,85,3,'#69433b');
 plush(c,105,179);
 // Open teal shutters with repeatable horizontal slats.
 for(const x of [19,137]){rect(c,x,113,25,96,C.ink);rect(c,x+2,115,21,92,C.teal);rect(c,x+3,116,2,89,'#74a6a0');for(let y=121;y<204;y+=12){rect(c,x+5,y,15,7,'#183f4e');rect(c,x+5,y+7,15,2,'#4d8281')}}
 rect(c,17,209,148,7,'#d6a16c');rect(c,17,216,148,3,'#603a41');rect(c,29,219,7,8,'#452c3b');rect(c,146,219,7,8,'#452c3b');
 // Hanging pirate flag and personal straw hat.
 rect(c,81,79,55,33,C.ink);rect(c,83,81,51,28,'#303041');stroke(c,[[91,86],[124,106]],'#d0c9a7',2);stroke(c,[[124,86],[91,106]],'#d0c9a7',2);skull(c,101,91);hat(c,100,85);rect(c,78,77,61,2,'#9c7950');rect(c,78,77,2,5,'#e4b263');rect(c,137,77,2,5,'#e4b263');
 poly(c,[[173,125],[181,128],[186,140],[185,153],[177,163],[170,158],[165,143]],'#d6a85d');stroke(c,[[171,130],[169,142],[173,153],[179,155]],'#975d46',3);stroke(c,[[171,125],[171,119],[177,117],[180,120],[180,128]],'#e1b46b',2);
 }),
 lantern:sprite(22,34,c=>{stroke(c,[[2,5],[2,0],[20,0],[16,5],[13,7]],'#151f2d',3);rect(c,11,4,2,5,'#9d8051');poly(c,[[5,12],[9,8],[15,8],[19,12]],C.ink);rect(c,5,12,14,18,C.ink);rect(c,7,14,10,13,'#d19a48');rect(c,9,14,6,13,'#efc570');rect(c,11,15,2,9,'#fff1bb');rect(c,11,12,1,18,'#825f36');poly(c,[[5,30],[19,30],[17,33],[7,33]],C.ink)}),
 poster:sprite(27,43,c=>{rect(c,0,0,27,43,'#634a40');rect(c,1,1,25,40,'#c7ab77');rect(c,3,3,21,1,'#644e3c');rect(c,4,6,19,2,'#4f3d35');rect(c,4,9,18,1,'#70553c');rect(c,5,14,17,18,'#8f6f4c');poly(c,[[7,20],[10,17],[18,17],[22,21],[20,29],[11,30],[7,25]],'#e2bf84');hat(c,6,13);rect(c,10,24,2,1,'#5c4237');rect(c,17,24,2,1,'#5c4237');stroke(c,[[11,27],[14,29],[18,27]],'#5c4237');rect(c,4,35,19,1,'#6f543d');rect(c,5,38,16,1,'#8f704e');rect(c,3,1,2,2,'#dbb877');rect(c,23,1,2,2,'#dbb877')}),
 lighthouse:sprite(22,50,c=>{poly(c,[[4,50],[7,13],[15,13],[19,50]],'#8d7184');rect(c,9,15,2,34,'#bd8c87');rect(c,11,32,3,7,'#334058');rect(c,6,11,11,4,'#242d47');rect(c,7,5,9,7,'#d6a45b');rect(c,10,6,3,4,'#fff1a0');poly(c,[[4,5],[11,0],[19,5]],'#ad625d');rect(c,10,0,2,1,'#e4ae70')}),
 fern:sprite(28,32,c=>{stroke(c,[[13,32],[14,19],[19,4]],C.grassDark,2);for(let i=0;i<5;i++){const x=14+i,y=28-i*5;poly(c,[[x,y],[x-8,y-6],[x-11,y-6],[x-8,y-1]],i%2?'#537c60':'#416a58');poly(c,[[x,y],[x+7,y-7],[x+9,y-7],[x+7,y-2]],'#65896a')}}),
 branch:sprite(110,54,c=>{stroke(c,[[0,40],[34,24],[72,13],[108,4]],'#353149',5);for(let i=0;i<7;i++){const x=i*15,y=35-i*4;poly(c,[[x,y],[x+4,y-10],[x+12,y-11],[x+16,y-6],[x+13,y],[x+7,y+3]],i%2?'#27535b':'#376958');poly(c,[[x+6,y+3],[x+11,y+10],[x+18,y+12],[x+20,y+7],[x+15,y+1]],'#244b55')}}),
 boat:sprite(25,21,c=>{poly(c,[[12,0],[2,15],[12,15]],'#d3d7ca');poly(c,[[14,4],[14,15],[21,15]],'#8ba5b1');rect(c,13,0,1,18,'#b59b83');poly(c,[[0,17],[25,17],[21,21],[4,21]],'#ab6156');rect(c,1,17,23,1,'#df9473')}),
 flag:sprite(28,18,c=>{poly(c,[[0,0],[27,3],[22,9],[27,16],[0,14]],'#a84d59');stroke(c,[[8,4],[16,12]],'#e9c9b0',2);stroke(c,[[16,4],[8,12]],'#e9c9b0',2)}),
 idle:character(0), walk1:character(1), walk2:character(2), walk3:character(3), jump:character(4),
 }}
