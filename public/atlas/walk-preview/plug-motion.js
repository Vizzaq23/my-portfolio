const clamp=t=>Math.max(0,Math.min(1,t));
const ease=t=>{t=clamp(t);return t*t*t*(t*(t*6-15)+10)};
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
const loose=[-1.08,.07,-2],aligned=[-1.12,.4,-2.23],seated=[-1.12,.4,-2.31];
export function plugPose(progress){
  const reach=ease(progress/.23),grip=ease((progress-.21)/.14);
  const lift=ease((progress-.35)/.4),align=ease((progress-.75)/.1),insert=ease((progress-.85)/.15);
  const position=mix(loose,aligned,lift);
  // A small outward arc clears the furniture; final travel is straight into the socket.
  position[0]-=Math.sin(lift*Math.PI)*.055;
  position[1]+=Math.sin(lift*Math.PI)*.025;
  position[2]+=.035*Math.sin(lift*Math.PI);
  const held=mix(position,seated,insert);
  const rotation=[-.16*(1-align)*Math.sin(lift*Math.PI),0,-.14*(1-align)*Math.sin(lift*Math.PI)];
  return {position:held,rotation,grip,reach,approach:mix([.24,-.16,.42],[0,0,0],reach)};
}
export function releasePose(progress){
  const release=ease(progress/.24),withdraw=ease((progress-.22)/.58);
  return {grip:1-release,offset:[.22*withdraw,-.2*withdraw,.5*withdraw],rotation:[.12*withdraw,0,-.18*withdraw],visible:progress<.82};
}
