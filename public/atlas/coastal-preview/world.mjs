// Art placements and physical rectangles are independent, explicit world data.
export const W=640,H=360;
export const solids=[{x:0,y:302,w:640,h:58},{x:552,y:286,w:32,h:16},{x:584,y:270,w:56,h:32},{x:608,y:254,w:32,h:16},{x:480,y:253,w:46,h:49},{x:360,y:230,w:120,h:24}];
export const spawn={x:248,y:258};
export const lightSources=[{x:58,y:125,radius:64,color:'#ffb94d',power:.38},{x:85,y:183,radius:58,color:'#ffc779',power:.32},{x:443,y:180,radius:26,color:'#ffcd72',power:.2}];
export const occluders=[{x:15,y:151,w:25,h:86},{x:137,y:151,w:23,h:86},{x:17,y:247,w:148,h:9},{x:0,y:302,w:640,h:58},solids[4],solids[5]];
export const plants=[{x:162,y:272,scale:1},{x:196,y:280,scale:.7},{x:311,y:284,scale:.55},{x:455,y:278,scale:.75},{x:530,y:274,scale:.9}];
