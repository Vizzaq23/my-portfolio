import {buildHand} from './hand-model.js';
import * as T from './vendor/three.module.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';

export async function loadHeroAssets(scene,room,hand){
  const loader=new GLTFLoader();
  const [crt,plush,grip,wood,plaster]=await Promise.all([
    loader.loadAsync('./assets/crt.glb'),loader.loadAsync('./assets/chopper.glb'),Promise.resolve({scene:buildHand()}),
    new T.TextureLoader().loadAsync('./assets/wood_planks.jpg'),new T.TextureLoader().loadAsync('./assets/plastered_wall.jpg'),
  ]);
  function pixelMap(texture,size,repeat){
    const c=document.createElement('canvas');c.width=c.height=size;
    c.getContext('2d').drawImage(texture.image,0,0,size,size);
    const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.magFilter=T.NearestFilter;map.minFilter=T.LinearMipmapLinearFilter;map.anisotropy=4;
    map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(...repeat);texture.dispose();return map;
  }
  const timber=pixelMap(wood,512,[1,1]),plasterMap=pixelMap(plaster,512,[3,2]);
  for(const m of [room.wood,...room.boards]){m.map=timber;m.color.set('#aca394');m.needsUpdate=true;}
  room.wall.map=plasterMap;room.wall.color.set('#465f60');room.wall.needsUpdate=true;
  for(const model of [crt.scene,plush.scene,grip.scene])model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
  crt.scene.position.set(.08,.94,-2.02);plush.scene.position.set(.67,.64,-1.98);
  scene.add(crt.scene,plush.scene);
  for(const o of [...room.crtFallback,...room.plushFallback]){scene.remove(o);o.geometry?.dispose();}
  for(const o of [...hand.children]){hand.remove(o);o.geometry?.dispose();}hand.add(grip.scene);
  // Continue the sleeve beyond the close-up camera instead of exposing a floating stump.
  const sleeveMaterial=grip.scene.getObjectByName('forearm')?.material||room.navy;
  const sleeve=new T.Mesh(new T.CylinderGeometry(.043,.055,.85,24),sleeveMaterial);
  sleeve.rotation.x=Math.PI/2;sleeve.position.set(0,-.014,.77);sleeve.castShadow=true;sleeve.receiveShadow=true;hand.add(sleeve);
  const fingers=[];grip.scene.traverse(o=>{if(/^Finger_/.test(o.name)||/^FingerTip_/.test(o.name))fingers.push({o,q:o.quaternion.clone(),tip:o.name.startsWith('FingerTip'),index:Number(o.name.match(/\d+/)?.[0]||0)});});
  const thumb=grip.scene.getObjectByName('Thumb'),thumbQ=thumb?.quaternion.clone();
  return {pose(amount){for(const {o,q,tip,index}of fingers){const curl=Math.max(0,Math.min(1,(amount-index*.035)/(1-index*.035)));o.quaternion.copy(q).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),-curl*(tip?.85:.65)))};if(thumb)thumb.quaternion.copy(thumbQ).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-.5*amount));}};
}
