import * as T from './vendor/three.module.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';

export async function loadHeroAssets(scene,room,hand){
  const loader=new GLTFLoader();
  const [crt,plush,grip,wood,plaster]=await Promise.all([
    loader.loadAsync('./assets/crt.glb'),loader.loadAsync('./assets/chopper.glb'),loader.loadAsync('./assets/hand.glb'),
    new T.TextureLoader().loadAsync('./assets/wood_planks.jpg'),new T.TextureLoader().loadAsync('./assets/plastered_wall.jpg'),
  ]);
  function pixelMap(texture,size,repeat){
    const c=document.createElement('canvas');c.width=c.height=size;
    c.getContext('2d').drawImage(texture.image,0,0,size,size);
    const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.magFilter=T.NearestFilter;map.minFilter=T.LinearMipmapLinearFilter;
    map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(...repeat);texture.dispose();return map;
  }
  const timber=pixelMap(wood,256,[1,1]),plasterMap=pixelMap(plaster,256,[3,2]);
  for(const m of [room.wood,...room.boards]){m.map=timber;m.color.set('#aca394');m.needsUpdate=true;}
  room.wall.map=plasterMap;room.wall.color.set('#465f60');room.wall.needsUpdate=true;
  for(const model of [crt.scene,plush.scene,grip.scene])model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
  crt.scene.position.set(.08,.94,-2.02);plush.scene.position.set(.67,.64,-1.98);
  scene.add(crt.scene,plush.scene);
  for(const o of [...room.crtFallback,...room.plushFallback]){scene.remove(o);o.geometry?.dispose();}
  for(const o of [...hand.children]){hand.remove(o);o.geometry?.dispose();}hand.add(grip.scene);
  const fingers=[];grip.scene.traverse(o=>{if(/^Finger_/.test(o.name)||/^FingerTip_/.test(o.name))fingers.push({o,q:o.quaternion.clone(),tip:o.name.startsWith('FingerTip')});});
  const thumb=grip.scene.getObjectByName('Thumb'),thumbQ=thumb?.quaternion.clone();
  return {pose(amount){for(const {o,q,tip}of fingers)o.quaternion.copy(q).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),-amount*(tip?.9:.7)));if(thumb)thumb.quaternion.copy(thumbQ).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-.5*amount));}};
}
