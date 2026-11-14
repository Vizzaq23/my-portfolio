export const STEP=1/120;
export function makePlayer(spawn){return {...spawn,w:16,h:44,vx:0,vy:0,grounded:false,coyote:0,buffer:0,facing:1}}
const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
export function tick(p,input,solids,dt=STEP){
 p.coyote=p.grounded?.1:Math.max(0,p.coyote-dt);p.buffer=input.jumpPressed?.12:Math.max(0,p.buffer-dt);
 const dir=Number(Boolean(input.right))-Number(Boolean(input.left));const target=dir*98;const acceleration=p.grounded?1100:720;
 p.vx+=Math.sign(target-p.vx)*Math.min(Math.abs(target-p.vx),acceleration*dt);if(dir)p.facing=dir;
 if(p.buffer>0&&p.coyote>0){p.vy=-365;p.grounded=false;p.buffer=0;p.coyote=0}
 if(input.jumpReleased&&p.vy<0)p.vy*=.45;
 p.vy=Math.min(p.vy+(p.vy>0?1250:850)*dt,450);
 p.x+=p.vx*dt;for(const s of solids)if(overlap(p,s)){p.x=p.vx>0?s.x-p.w:s.x+s.w;p.vx=0}
 p.x=Math.max(0,Math.min(640-p.w,p.x));p.y+=p.vy*dt;p.grounded=false;
 for(const s of solids)if(overlap(p,s)){if(p.vy>=0){p.y=s.y-p.h;p.grounded=true}else{p.y=s.y+s.h;p.buffer=0}p.vy=0}
}
// Damped spring for paper / foliage. Same fixed timestep as character physics.
export function spring(body,target,dt){body.velocity+=((target-body.angle)*32-body.velocity*7)*dt;body.angle+=body.velocity*dt}
// Raycast light visibility against rectangle edges: real silhouettes, not painted halos.
export function visibility(light,rectangles){
 const edges=[],points=[];const r=light.radius;
 for(const b of [...rectangles,{x:light.x-r,y:light.y-r,w:r*2,h:r*2}]){const p=[[b.x,b.y],[b.x+b.w,b.y],[b.x+b.w,b.y+b.h],[b.x,b.y+b.h]];points.push(...p);for(let i=0;i<4;i++)edges.push([p[i],p[(i+1)%4]])}
 const hits=[];for(const [x,y] of points){const a=Math.atan2(y-light.y,x-light.x);for(const delta of [-.0001,0,.0001]){const angle=a+delta,dx=Math.cos(angle),dy=Math.sin(angle);let nearest=r*2;for(const [[ax,ay],[bx,by]] of edges){const sx=bx-ax,sy=by-ay,den=dx*sy-dy*sx;if(Math.abs(den)<1e-9)continue;const qx=ax-light.x,qy=ay-light.y;const t=(qx*sy-qy*sx)/den,u=(qx*dy-qy*dx)/den;if(t>=0&&u>=0&&u<=1)nearest=Math.min(nearest,t)}hits.push({angle,x:light.x+dx*nearest,y:light.y+dy*nearest})}}
 return hits.sort((a,b)=>a.angle-b.angle).map(p=>[p.x,p.y]);
}
