import * as T from './vendor/three.module.js';

// Editable smooth stylized anatomy in the same local coordinates as the grip rig.
export function buildHand(){
 const root=new T.Group();root.name='RightHand';
 const skin=new T.MeshStandardMaterial({color:'#bd8d73',roughness:.78});
 const nails=new T.MeshStandardMaterial({color:'#d7ae99',roughness:.55});
 const cloth=new T.MeshStandardMaterial({color:'#172942',roughness:.95});
 function ellipsoid(name,parent,position,scale,material=skin){
   const mesh=new T.Mesh(new T.SphereGeometry(1,24,16),material);
   mesh.name=name;mesh.position.set(...position);mesh.scale.set(...scale);
   mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
 }
 // Flattened palm, narrower wrist and a thumb pad instead of one inflated mitten.
 ellipsoid('palm',root,[0,0,.074],[.041,.021,.052]);
 ellipsoid('wrist',root,[0,-.002,.125],[.031,.020,.035]);
 ellipsoid('thumb pad',root,[.028,-.006,.085],[.021,.018,.034]);
 const lengths=[.039,.048,.044,.033],xs=[-.029,-.010,.010,.028];
 for(let i=0;i<4;i++){
   const finger=new T.Group();finger.name=`Finger_${i}`;
   finger.position.set(xs[i],0,.035+Math.abs(i-1.5)*.003);root.add(finger);
   const radius=i===3?.0075:.0085,length=lengths[i];
   ellipsoid('knuckle',finger,[0,0,0],[radius*1.08,.010,.012]);
   ellipsoid('finger proximal',finger,[0,0,-length*.46],[radius,.009,length*.57]);
   const tip=new T.Group();tip.name=`FingerTip_${i}`;tip.position.z=-length*.85;finger.add(tip);
   ellipsoid('finger distal',tip,[0,0,-.016],[radius*.9,.0085,.022]);
   ellipsoid('fingernail',tip,[0,.0074,-.022],[radius*.65,.0012,.008],nails);
 }
 const thumb=new T.Group();thumb.name='Thumb';thumb.position.set(.034,-.003,.087);thumb.rotation.y=.3;root.add(thumb);
 ellipsoid('thumb proximal',thumb,[.003,-.002,-.015],[.011,.012,.026]);
 ellipsoid('thumb distal',thumb,[.006,-.003,-.042],[.010,.010,.019]);
 ellipsoid('thumb nail',thumb,[.006,.006,-.047],[.0065,.0012,.008],nails);
 // Smooth tapered sleeve meets the wrist without the old squared cuff corners.
 const sleeve=new T.Mesh(new T.CylinderGeometry(.033,.043,.24,24),cloth);
 sleeve.name='forearm';sleeve.rotation.x=Math.PI/2;sleeve.position.set(0,-.006,.263);sleeve.castShadow=true;sleeve.receiveShadow=true;root.add(sleeve);
 const cuff=new T.Mesh(new T.CylinderGeometry(.034,.034,.028,24),cloth);
 cuff.rotation.x=Math.PI/2;cuff.position.set(0,-.005,.15);cuff.castShadow=true;root.add(cuff);
 return root;
}
