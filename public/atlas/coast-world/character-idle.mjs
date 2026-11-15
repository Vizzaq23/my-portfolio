// Only the upper body moves. Legs and soles are always drawn at the same pixels.
export function idlePose(time,still=false){
  const cycle=time%11.7;
  return {rise:still?0:Math.round((1-Math.cos(time*Math.PI*2/4.6))),blink:!still&&((cycle>3.8&&cycle<3.96)||(cycle>8.9&&cycle<9.06))};
}
export function drawCharacter(c,sprite,center,ground,time,still=false){
  const pose=idlePose(time,still),w=sprite.width,h=sprite.height;
  const waist=Math.round(h*.67),x=Math.round(center-w/2),y=ground-h;
  c.drawImage(sprite,0,waist,w,h-waist,x,y+waist,w,h-waist);
  // Keep the neck attached while scaling only the head; the body stays unchanged.
  const neck=Math.round(h*.455),headScale=.82,pivot=Math.round(w*.54);
  c.save();c.translate(x,y-pose.rise);c.scale(1,(waist+pose.rise)/waist);
  c.drawImage(sprite,0,neck,w,waist-neck,0,neck,w,waist-neck);
  c.translate(pivot,neck);c.scale(headScale,headScale);c.translate(-pivot,-neck);
  c.drawImage(sprite,0,0,w,neck,0,0,w,neck);
  if(pose.blink){
    // Eyelids registered to the two simple eye clusters in character-v3.
    for(const [ex,ey] of [[.58,.265],[.758,.259]]){
      const px=Math.round(w*ex),py=Math.round(h*ey),ew=Math.ceil(w*.052),eh=Math.ceil(h*.034);
      c.fillStyle='#ffad76';c.fillRect(px,py,ew,eh);
      c.fillStyle='#68412f';c.fillRect(px,py+Math.floor(eh*.65),ew,2);
    }
  }
  c.restore();
  return pose;
}
