import * as T from './vendor/three.module.js';

export class Cable {
 constructor(scene,material,plug){
  this.plug=plug;this.anchor=new T.Vector3(-.38,.64,-1.66);
  this.points=Array.from({length:28},()=>new T.Vector3());this.previous=this.points.map(p=>p.clone());
  this.rest=1.65/27;this.accumulator=0;this.mesh=new T.Mesh(new T.BufferGeometry(),material);
  this.mesh.castShadow=true;this.mesh.receiveShadow=true;scene.add(this.mesh);this.reset();
 }
 endpoint(){return new T.Vector3(0,0,.085).applyQuaternion(this.plug.quaternion).add(this.plug.position)}
 pin(){
  const end=this.endpoint();this.points[0].copy(this.anchor);this.points[27].copy(end);
  this.points[26].copy(end).add(new T.Vector3(0,0,this.rest).applyQuaternion(this.plug.quaternion));
 }
 reset(){
  const end=this.endpoint();
  const curve=new T.CatmullRomCurve3([this.anchor,new T.Vector3(-.55,.035,-1.5),new T.Vector3(-1,.035,-1.75),end]);
  this.points.forEach((p,i)=>{p.copy(curve.getPoint(i/27));this.previous[i].copy(p)});
  for(let i=0;i<180;i++)this.step();this.accumulator=0;this.redraw();
 }
 step(){
  const dt=1/120;
  for(let i=1;i<26;i++){
   const p=this.points[i],old=this.previous[i],velocity=p.clone().sub(old).multiplyScalar(.975);
   old.copy(p);p.add(velocity);p.y-=2.8*dt*dt;
  }
  for(let pass=0;pass<20;pass++){
   this.pin();
   for(let i=0;i<27;i++){
    const a=this.points[i],b=this.points[i+1],delta=b.clone().sub(a),length=delta.length();
    if(length<1e-8)continue;
    delta.multiplyScalar((length-this.rest)/length);
    const fixedA=i===0||i>=26,fixedB=i+1>=26;
    if(!fixedA&&!fixedB){a.addScaledVector(delta,.5);b.addScaledVector(delta,-.5)}
    else if(!fixedA)a.add(delta);else if(!fixedB)b.sub(delta);
   }
   for(let i=1;i<26;i++){
    const p=this.points[i];p.y=Math.max(.036,p.y);p.z=Math.max(-2.365,p.z);
    // Cabinet front: stop the free cable from passing through wood during pickup.
    if(p.x>-.94&&p.x<.94&&p.y>.10&&p.y<.63)p.z=Math.max(-1.655,p.z);
   }
  }
  this.pin();
  for(let i=1;i<26;i++)if(this.points[i].y<=.0361){this.previous[i].x+=(this.points[i].x-this.previous[i].x)*.65;this.previous[i].z+=(this.points[i].z-this.previous[i].z)*.65;}
 }
 update(dt,still=false){
  if(still){
   const end=this.endpoint();
   if(!this.stillEnd||end.distanceToSquared(this.stillEnd)>1e-8||this.stillRotation.angleTo(this.plug.quaternion)>1e-4){this.reset();this.stillEnd=end;this.stillRotation=this.plug.quaternion.clone();}
   return;
  }
  this.stillEnd=null;
  this.accumulator+=Math.min(dt,.05);
  while(this.accumulator>=1/120){this.step();this.accumulator-=1/120;}
  this.redraw();
 }
 redraw(){
  const lead=[new T.Vector3(-.34,.66,-2.12),new T.Vector3(-.36,.66,-1.7)];
  const curve=new T.CatmullRomCurve3([...lead,...this.points]);
  const geometry=new T.TubeGeometry(curve,80,.008,8,false);
  this.mesh.geometry.dispose();this.mesh.geometry=geometry;
 }
}
