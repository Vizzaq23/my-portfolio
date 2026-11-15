// Editable two-unit pixel construction; beacon and water share this anchor.
export const BEACON={x:1150,y:469};
export function drawLighthouse(c){
  const r=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(BEACON.x+x,BEACON.y+y,w,h)};
  // Small stone tower, cool shaded right face and warm moonlit left face.
  r(-10,12,20,46,'#44435f');r(-8,12,10,46,'#a49a8b');r(2,12,6,46,'#716980');
  r(-12,54,24,6,'#313e50');r(-10,52,20,4,'#b4a38b');
  r(-8,22,16,4,'#585875');r(-8,24,8,2,'#b1a18b');
  r(-8,40,16,4,'#585875');r(-8,42,8,2,'#b1a18b');
  r(-2,32,4,6,'#253c51');r(-2,34,2,2,'#e3b763');
  r(-2,48,6,6,'#293548');
  // Lantern housing, a dark roof and warm glass; no baked bloom.
  r(-12,8,24,4,'#303949');r(-10,6,20,2,'#c29c61');
  r(-8,-6,16,12,'#302f43');r(-6,-4,12,10,'#df9e49');
  r(-4,-2,8,6,'#ffe4a1');r(2,-4,2,10,'#9c6a3c');
  r(-12,-8,24,2,'#283547');r(-8,-12,16,4,'#87705c');
  r(-4,-16,8,4,'#bd8b50');r(-2,-20,4,4,'#e0b569');
}

