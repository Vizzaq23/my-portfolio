import * as T from './vendor/three.module.js';

// Small, deliberately painted pixel materials; one shared map per surface type.
function painted(kind,base,w=128,h=128){
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const g=c.getContext('2d');g.fillStyle=base;g.fillRect(0,0,w,h);
  let seed=134;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<w*h/2;i++){g.fillStyle=rand()>.5?'#ffffff06':'#00000009';g.fillRect(rand()*w|0,rand()*h|0,1,1);}
  if(kind==='wood'){
    for(let i=0;i<180;i++){g.fillStyle=i%3?'#140d081d':'#b58b5d18';g.fillRect(rand()*w|0,rand()*h|0,12+rand()*80,1);}
    g.fillStyle='#211711';g.fillRect(0,0,w,1);g.fillRect(0,h-1,w,1);g.fillRect(0,0,1,h);g.fillRect(w-1,0,1,h);
    for(let i=0;i<8;i++){g.fillStyle='#d8bd8126';g.fillRect(rand()*w|0,rand()*h|0,10+rand()*15,1);}
  }
  if(kind==='plaster'){
    for(let i=0;i<300;i++){g.fillStyle=rand()>.5?'#8b9b9210':'#040b1012';g.fillRect(rand()*w|0,rand()*h|0,rand()*9+1,rand()*14+1);}
    g.strokeStyle='#0d252126';g.lineWidth=1;g.beginPath();g.moveTo(92,0);g.lineTo(89,18);g.lineTo(93,29);g.lineTo(88,36);g.stroke();
  }
  if(kind==='plaid'){
    for(let i=0;i<w;i+=32){g.fillStyle='#733b4377';g.fillRect(i,0,13,h);g.fillRect(0,i,w,13);g.fillStyle='#b9b2a344';g.fillRect(i+17,0,3,h);g.fillRect(0,i+17,w,3);}
  }
  if(kind==='fabric'||kind==='plaid')for(let i=0;i<w;i+=2){g.fillStyle='#ffffff08';g.fillRect(i,0,1,h);g.fillStyle='#00000012';g.fillRect(0,i,w,1);}
  const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.magFilter=T.NearestFilter;tex.minFilter=T.LinearMipmapLinearFilter;return {tex,g,c};
}
function material(kind,color){return new T.MeshStandardMaterial({map:painted(kind,color).tex,roughness:.94,metalness:0});}
// Small static occlusion accents complement the moving moon/TV lighting.
// One shared texture: no extra shadow maps or screen-space postprocessing.
function contactShadows(scene){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=64;
  const c=canvas.getContext('2d'),g=c.createRadialGradient(32,32,4,32,32,32);
  g.addColorStop(0,'rgba(4,7,12,.65)');g.addColorStop(.45,'rgba(4,7,12,.35)');g.addColorStop(1,'rgba(4,7,12,0)');
  c.fillStyle=g;c.fillRect(0,0,64,64);
  const map=new T.CanvasTexture(canvas);
  const base=new T.MeshBasicMaterial({map,transparent:true,depthWrite:false,opacity:.55,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
  const patch=(x,y,z,w,d,opacity)=>{const mat=base.clone();mat.opacity=opacity;const mesh=new T.Mesh(new T.PlaneGeometry(w,d),mat);mesh.name='Contact occlusion';mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);mesh.renderOrder=1;scene.add(mesh);};
  patch(0,.009,-2.02,2.12,.94,.7); // cabinet on floor
  patch(-1.65,.01,-.3,1.5,2.3,.5); // bed
  patch(-1.95,.011,-1.85,.65,.66,.5); // bedside table
  for(const z of [-.12,1.12])for(const x of [1.75,2.22])patch(x,.012,z,.25,.25,.6);
  patch(.08,.627,-2.02,.84,.49,.58); // CRT on cabinet
  patch(-.57,.628,-1.98,.47,.32,.5); // console
  patch(.67,.629,-1.98,.4,.34,.48); // plush
  patch(-.59,.63,-1.75,.29,.2,.4); // controller
}
function art(draw,w=128,h=128){const {tex,g,c}=painted('fabric','#b5a17b',w,h);draw(g,w,h);tex.needsUpdate=true;return new T.MeshStandardMaterial({map:tex,roughness:1});}

export function buildRoom(scene){
  const wood=material('wood','#69513c'),wall=material('plaster','#344c4b'),navy=material('fabric','#293a51'),cream=material('fabric','#c3b79e'),black=material('fabric','#12191e'),skin=material('fabric','#b78b65'),pink=material('fabric','#a85870'),fur=material('fabric','#886347'),gold=material('fabric','#b59857');
  const box=(w,h,d,x,y,z,m,parent=scene)=>{const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
  const ball=(r,x,y,z,m,parent=scene)=>{const o=new T.Mesh(new T.SphereGeometry(r,12,8),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
  const rod=(a,b,r,m,parent=scene)=>{const av=new T.Vector3(...a),bv=new T.Vector3(...b),o=new T.Mesh(new T.CylinderGeometry(r,r,av.distanceTo(bv),8),m);o.position.copy(av).add(bv).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bv.sub(av).normalize());o.castShadow=true;parent.add(o);return o;};
  const bevel=(w,h,d,x,y,z,m,r=.035,parent=scene)=>{const s=new T.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);const o=new T.Mesh(new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:2}),m);o.position.set(x,y,z-d/2);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
  const panel=(w,h,x,y,z,m)=>{const o=new T.Mesh(new T.PlaneGeometry(w,h),m);o.position.set(x,y,z);o.receiveShadow=true;scene.add(o);return o;};
  // Full scale architecture. Individual staggered floorboards avoid a stretched checker texture.
  box(4.8,.1,7,0,-.07,.5,black);
  const boards=[wood,material('wood','#604a38'),material('wood','#735944'),material('wood','#574637')];
  for(let row=0;row<23;row++)for(let col=0;col<6;col++){const x=-2.28+row*.207,z=-2.6+col*1.2+(row%2)*.6;box(.202,.025,1.19,x,-.005,z,boards[(row+col*3)%4]);}
  box(4.8,2.8,.12,0,1.4,-2.5,wall);box(.12,2.8,7,-2.4,1.4,.5,wall);box(.12,2.8,7,2.4,1.4,.5,wall);box(4.8,.1,7,0,2.8,.5,material('plaster','#343c41'));
  for(const y of [.12,2.65]){box(4.7,.13,.055,0,y,-2.4,wood);for(const x of [-2.31,2.31])box(.055,.13,7,x,y,.5,wood);}
  // Entrance jambs frame a human-scale view without obstructing the animation route.
  for(const x of [-1.72,1.72])box(.13,2.7,.18,x,1.35,3.25,wood);
  box(3.55,.14,.18,0,2.65,3.25,wood);
  const rug=art((g,w,h)=>{g.fillStyle='#29303b';g.fillRect(0,0,w,h);for(const [inset,color]of[[3,'#733f44'],[7,'#b89e77'],[10,'#252b36']]){g.strokeStyle=color;g.lineWidth=2;g.strokeRect(inset,inset,w-inset*2,h-inset*2);}for(let x=16;x<w-12;x+=12){g.fillStyle='#a48b69';g.fillRect(x,12,3,3);g.fillRect(x,h-15,3,3);}g.strokeStyle='#c4bba1';g.lineWidth=5;g.beginPath();g.moveTo(43,46);g.lineTo(86,86);g.moveTo(86,46);g.lineTo(43,86);g.stroke();g.fillStyle='#c4bba1';g.beginPath();g.ellipse(64,60,18,16,0,0,7);g.fill();g.fillRect(56,73,16,9);g.fillStyle='#29303b';g.fillRect(54,56,7,7);g.fillRect(68,56,7,7);g.fillStyle='#b18c4b';g.fillRect(40,46,48,5);g.fillRect(49,36,30,11);g.fillStyle='#74343a';g.fillRect(49,43,30,3);});
  const rugMesh=panel(1.9,2.2,0,.025,.5,rug);rugMesh.rotation.x=-Math.PI/2;
  for(let i=0;i<28;i++)for(const z of [-.63,1.63])box(.015,.004,.07,-.91+i*.067,.026,z,cream);
  // Bed: separate legs, turned posts, soft pillow and a plaid cover draped over edges.
  for(const x of [-2.2,-1.1])for(const z of [-1.25,.7]){box(.065,.55,.065,x,.27,z,wood);ball(.05,x,.65,z,wood);}
  box(1.2,.16,2.05,-1.65,.32,-.3,wood);bevel(1.17,.22,1.95,-1.65,.48,-.3,cream,.07);
  const blanket=material('plaid','#394455');box(1.18,.07,1.4,-1.65,.62,0,blanket);for(const x of [-2.23,-1.07])box(.025,.27,1.4,x,.49,0,blanket);
  const pillow=ball(.34,-1.65,.65,-1.04,cream);pillow.scale.set(1.25,.25,.58);box(1.25,.7,.07,-1.65,.7,-1.38,wood);for(let i=0;i<7;i++)box(.09,.55,.025,-2.18+i*.17,.7,-1.33,wood);
  box(.45,.48,.45,-1.95,.25,-1.85,wood);box(.49,.045,.49,-1.95,.51,-1.85,wood);box(.35,.16,.025,-1.95,.37,-1.61,wood);ball(.018,-1.95,.37,-1.58,gold);
  rod([-1.95,.54,-1.85],[-1.95,.89,-1.85],.018,gold);const shade=new T.Mesh(new T.CylinderGeometry(.12,.19,.22,8),cream);shade.position.set(-1.95,.92,-1.85);scene.add(shade);
  // Moonlit window inset and folded curtains.
  const night=new T.MeshBasicMaterial({map:art((g,w,h)=>{g.fillStyle='#111d39';g.fillRect(0,0,w,h);for(let i=0;i<25;i++){g.fillStyle='#6c85a6';g.fillRect((i*37)%w,(i*19)%h,1,1);}g.fillStyle='#9daec8';g.beginPath();g.arc(81,28,13,0,7);g.fill();g.fillStyle='#182b39';for(let i=0;i<9;i++){g.beginPath();g.moveTo(i*18-10,h);g.lineTo(i*18,80-i%3*12);g.lineTo(i*18+16,h);g.fill();}}).map});
  const window=panel(1.15,1.25,-2.325,1.72,-.48,night);window.rotation.y=Math.PI/2;
  for(const z of [-1.08,-.48,.12])box(.07,1.34,.04,-2.29,1.72,z,wood);for(const y of [1.05,1.72,2.39])box(.09,.05,1.26,-2.29,y,-.48,wood);box(.19,.055,1.35,-2.27,1.04,-.48,wood);
  const curtain=material('plaid','#4c586b');for(const start of [-1.31,.19])for(let i=0;i<5;i++){const z=start+i*.055;box(.05+(i%2)*.035,1.5,.055,-2.22,1.68,z,curtain);}rod([-2.18,2.46,-1.4],[-2.18,2.46,.5],.018,wood);
  const moon=new T.SpotLight('#a6bcf5',22,10,.8,.65,1.8);moon.position.set(-2.1,2.1,-.5);moon.target.position.set(.3,.1,.4);moon.castShadow=true;moon.shadow.mapSize.set(2048,2048);moon.shadow.bias=-.0005;moon.shadow.normalBias=.015;scene.add(moon,moon.target);
  scene.add(new T.HemisphereLight('#a4b3ca','#42332a',2.0));const fill=new T.PointLight('#8896b3',1.9,7,2);fill.position.set(0,2.4,2);scene.add(fill);
  // Credible wood cabinet with inset doors, drawers and hardware.
  box(1.85,.07,.62,0,.59,-2.02,wood);box(1.85,.07,.6,0,.12,-2.02,wood);box(1.8,.45,.035,0,.35,-2.3,wood);
  for(const x of [-.87,-.3,.3,.87])box(.055,.46,.55,x,.35,-2.02,wood);
  for(const x of [-.58,.58]){box(.5,.35,.035,x,.35,-1.72,wood);box(.43,.27,.015,x,.35,-1.695,wood);box(.065,.018,.025,x,.39,-1.67,gold);}
  for(let i=0;i<2;i++)box(.44,.06,.25,0,.2+i*.075,-1.88,i?navy:cream);
  // CRT case with chamfered bezel, rear vents, speaker grille, knobs and feet.
  const crtStart=scene.children.length;
  bevel(.71,.58,.45,.08,.94,-2.02,navy,.055);bevel(.62,.46,.055,.04,.98,-1.78,black,.04);bevel(.56,.4,.035,.04,.98,-1.746,cream,.035);bevel(.53,.38,.018,.04,.98,-1.724,black,.03);
  for(let i=0;i<8;i++)box(.075,.006,.006,.29,.71+i*.008,-1.775,black);
  for(let i=0;i<2;i++)rod([-.11+i*.09,.704,-1.78],[-.11+i*.09,.704,-1.755],.022,cream);
  for(let i=0;i<7;i++)box(.005,.16,.009,.45,.92,-2.18+i*.045,black);
  for(const x of [-.17,.29])box(.08,.035,.19,x,.64,-2,black);
  const led=ball(.008,-.24,.704,-1.77,new T.MeshBasicMaterial({color:'#302414'}));
  const label=art(g=>{g.fillStyle='#273343';g.fillRect(0,0,128,128);g.fillStyle='#c1b99b';g.font='17px monospace';g.fillText('VOYAGER',7,70);});panel(.15,.032,-.04,.745,-1.775,label);
  const crtFallback=scene.children.slice(crtStart).filter(o=>o!==led);
  const consolePlastic=new T.MeshStandardMaterial({color:'#263c62',roughness:.6});
  const ivoryPlastic=new T.MeshStandardMaterial({color:'#b9b7a5',roughness:.5});
  bevel(.37,.09,.26,-.57,.68,-1.98,consolePlastic,.025);box(.22,.008,.09,-.57,.733,-2.02,black);bevel(.15,.13,.025,-.57,.78,-2.02,ivoryPlastic,.01);
  bevel(.23,.04,.11,-.59,.67,-1.73,ivoryPlastic,.025);box(.055,.007,.018,-.65,.695,-1.73,black);box(.018,.007,.055,-.65,.695,-1.73,black);for(const x of [-.55,-.51])ball(.01,x,.695,-1.73,pink);
  const controllerCord=new T.CatmullRomCurve3([new T.Vector3(-.6,.67,-1.8),new T.Vector3(-.7,.47,-1.64),new T.Vector3(-.8,.34,-1.75),new T.Vector3(-.72,.66,-1.95)]);scene.add(new T.Mesh(new T.TubeGeometry(controllerCord,18,.005,5,false),black));
  // A work desk and small engineering objects balance the room's right side.
  box(.62,.055,1.4,1.99,.78,.5,wood);for(const z of [-.12,1.12])for(const x of [1.75,2.22])box(.055,.76,.055,x,.38,z,wood);
  box(.34,.018,.27,1.99,.82,.28,cream);box(.29,.025,.22,2,.83,.62,navy);box(.21,.012,.15,1.91,.82,.91,material('fabric','#3e6254'));
  for(let i=0;i<4;i++)box(.025,.015,.035,1.86+i*.035,.84,.91,black);
  const mug=new T.Mesh(new T.CylinderGeometry(.045,.04,.09,10),cream);mug.position.set(2.08,.85,-.01);mug.castShadow=true;scene.add(mug);
  const handle=new T.Mesh(new T.TorusGeometry(.03,.008,4,10),cream);handle.position.set(2.13,.85,-.01);handle.castShadow=true;scene.add(handle);
  box(.37,.05,.36,1.55,.45,.5,wood);box(.04,.53,.35,1.74,.72,.5,wood);for(const x of [1.4,1.7])for(const z of [.36,.64])box(.035,.44,.035,x,.22,z,wood);
  // Hanging shade and a shelf of personal keepsakes create an inhabited silhouette.
  rod([0,2.8,.15],[0,2.45,.15],.008,black);const ceilingShade=new T.Mesh(new T.CylinderGeometry(.12,.23,.16,8),wood);ceilingShade.position.set(0,2.4,.15);ceilingShade.castShadow=true;scene.add(ceilingShade);
  box(.23,.045,1.05,-2.23,2.02,1.05,wood);for(let i=0;i<5;i++)box(.13,.22+i%2*.06,.065,-2.18,2.15, .69+i*.08,i%2?cream:navy);
  const plantPot=new T.Mesh(new T.CylinderGeometry(.085,.06,.12,8),wood);plantPot.position.set(-2.16,2.11,1.42);scene.add(plantPot);
  const leaf=material('fabric','#486c50');for(let i=0;i<5;i++){const stem=ball(.06,-2.14+Math.sin(i*2)*.06,2.23+(i%3)*.05,1.42+Math.cos(i*2)*.05,leaf);stem.scale.set(.6,1.2,.5);stem.rotation.z=i*.8;}
  // Chopper plush: seated proportions, muzzle, hat cross, ear/antler branches and stitched seams.
  const plushStart=scene.children.length;
  const body=ball(.115,.67,.77,-1.98,fur);body.scale.set(.9,1.1,.8);
  for(const sign of [-1,1]){const foot=ball(.059,.67+sign*.08,.68,-1.9,fur);foot.scale.set(1,.7,1.25);const arm=ball(.046,.67+sign*.11,.79,-1.96,fur);arm.scale.set(.7,1.5,.7);ball(.049,.67+sign*.115,.99,-1.98,fur);}
  ball(.126,.67,.98,-1.98,skin);const muzzle=ball(.066,.67,.95,-1.865,cream);muzzle.scale.set(1,.65,.35);
  for(const x of [.625,.715]){ball(.019,x,.994,-1.862,black);ball(.005,x-.004,1.001,-1.846,cream);}
  ball(.012,.67,.968,-1.837,navy);rod([.67,.954,-1.84],[.67,.938,-1.84],.002,black);
  const cap=ball(.145,.67,1.105,-1.985,pink);cap.scale.set(1,.8,1);const brim=new T.Mesh(new T.CylinderGeometry(.176,.176,.025,16),pink);brim.position.set(.67,1.07,-1.97);brim.castShadow=true;scene.add(brim);
  for(const angle of [-Math.PI/4,Math.PI/4]){const cross=box(.027,.085,.008,.67,1.13,-1.858,cream);cross.rotation.z=angle;}
  for(const sign of [-1,1]){const x=.67+sign*.145;rod([x,1.1,-1.98],[x+sign*.035,1.25,-1.98],.017,fur);rod([x+sign*.035,1.23,-1.98],[x+sign*.09,1.26,-1.98],.014,fur);rod([x+sign*.035,1.22,-1.98],[x+sign*.02,1.29,-1.98],.012,fur);}
  // Books, small ship model, straw hat and custom printed nautical poster.
  const plushFallback=scene.children.slice(plushStart);
  for(let y of [.16,.65,1.14])box(.8,.045,.3,1.7,y,-2.18,wood);for(const x of [1.29,2.11])box(.045,1.16,.3,x,.6,-2.18,wood);
  for(let i=0;i<8;i++){const x=1.4+i*.075;box(.06,.28,.17,x,.82,-2.15,i%3?cream:navy);for(const y of [.73,.88])box(.045,.018,.003,x,y,-2.063,pink);}
  box(.3,.18,.2,1.85,.28,-2.15,wood);box(.04,.035,.01,1.85,.29,-2.04,gold);
  bevel(.49,.12,.18,1.7,1.26,-2.15,wood,.04);rod([1.7,1.3,-2.15],[1.7,1.69,-2.15],.01,wood);box(.25,.27,.012,1.76,1.51,-2.14,cream);ball(.027,1.49,1.35,-2.13,cream);
  const hat=new T.Mesh(new T.CylinderGeometry(.22,.22,.025,16),gold);hat.rotation.x=Math.PI/2;hat.position.set(-.65,1.95,-2.4);hat.castShadow=true;scene.add(hat);const crown=ball(.13,-.65,1.95,-2.36,gold);crown.scale.z=.55;const band=new T.Mesh(new T.TorusGeometry(.125,.015,4,16),pink);band.position.set(-.65,1.95,-2.34);scene.add(band);
  const poster=art((g,w,h)=>{g.fillStyle='#c0aa82';g.fillRect(0,0,w,h);g.strokeStyle='#584633';g.lineWidth=3;g.strokeRect(6,6,w-12,h-12);g.fillStyle='#463c33';g.font='bold 20px serif';g.textAlign='center';g.fillText('WANTED',w/2,29);g.fillStyle='#796951';g.fillRect(15,38,w-30,85);g.fillStyle='#c8aa76';g.beginPath();g.arc(64,82,24,0,7);g.fill();g.fillStyle='#322f2c';g.fillRect(49,76,6,5);g.fillRect(74,76,6,5);g.fillStyle='#ceb579';g.fillRect(29,61,70,7);g.fillRect(43,47,42,17);g.fillStyle='#783d35';g.fillRect(43,58,42,6);g.strokeStyle='#514132';g.beginPath();g.arc(64,86,14,0,Math.PI);g.stroke();g.fillStyle='#463c33';g.font='12px serif';g.fillText('THE NEXT ADVENTURE',64,143);g.font='9px monospace';g.fillText('EAST BLUE · GRAND LINE',64,159);},128,176);const posterMesh=panel(.44,.61,.85,1.94,-2.425,poster);posterMesh.rotation.z=-.045;
  contactShadows(scene);
  gold.roughness=.48;gold.metalness=.35;
  navy.roughness=.78;black.roughness=.86;
  return {box,ball,rod,wood,cream,black,skin,navy,led,wall,boards,crtFallback,plushFallback};
}
