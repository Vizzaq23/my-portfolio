// Seeded pixel clusters: stable topology, slow advection and varying exposure.
const hash = n => { const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v); };
const blend=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
const rgb=c=>`rgb(${c.join(',')})`;
const pixel=(c,x,y,w,h)=>c.fillRect(Math.round(x/2)*2,Math.round(y/2)*2,Math.max(2,Math.round(w/2)*2),h);

export function drawWater(c,width,state,time,lighting) {
  const day=state.daylight,twilight=state.twilight;
  const top=blend(blend([9,55,70],[45,115,139],day),[111,75,102],twilight*.55);
  const bottom=blend([5,28,42],[24,72,98],day);
  const gradient=c.createLinearGradient(0,598,0,818);
  gradient.addColorStop(0,rgb(top));gradient.addColorStop(1,rgb(bottom));
  c.fillStyle=gradient;c.fillRect(0,598,width,220);
  // Broad quiet currents establish depth without drawing a ladder of lines.
  for(let i=0;i<95;i++){
    const depth=hash(i+74),x=360+hash(i+3)*(width-360),y=608+depth*196;
    const drift=Math.sin(time*.24+i*.8)*(2+depth*5);
    c.fillStyle=i%4===0?'#071e30':rgb(blend([30,98,111],[114,178,181],day));
    c.globalAlpha=i%4===0?.28:.12+hash(i+40)*.17;
    pixel(c,x+drift,y,8+hash(i+14)*44*(.35+depth),2);
  }
  c.globalAlpha=1;
  if(!lighting)return;
  const skyColor=blend([143,207,193],[185,224,211],day);
  reflectionClusters(c,864,skyColor,.72,time,250,4);
  if(state.sunVisible)reflectionClusters(c,state.sunX,blend([245,239,195],[255,193,117],twilight),.8,time,150+twilight*80,31);
  if(state.moonVisible)reflectionClusters(c,state.moonX,[214,234,203],(1-day)*(.36+state.phase.fraction*.42),time,110,68);
  reflectionClusters(c,1150,[235,178,93],(1-day)*.3,time,24,91);
}

function reflectionClusters(c,center,color,strength,time,width,seed) {
  for(let row=0;row<22;row++){
    const depth=row/21,y=606+row*8.4+hash(row+seed)*4;
    const span=width*(.2+depth*.8);
    const drift=Math.sin(time*.4-row*.8)*span*.09+Math.sin(time*.19+row)*3;
    for(let part=0;part<3;part++){
      const n=row*7+part*43+seed;
      if(hash(n+12)<.2)continue;
      const offset=(hash(n)-.5)*span;
      const length=(8+hash(n+7)*31)*( .45+depth*.8);
      const shimmer=.65+.35*Math.sin(time*.65+row*.9+part*2);
      c.globalAlpha=strength*(.35+hash(n+5)*.65)*shimmer;
      c.fillStyle=rgb(color);
      pixel(c,center+offset+drift,y+part*2,length,hash(n+4)>.72?4:2);
      // Short subordinate edge, rather than a rectangular stripe.
      if(hash(n+2)>.48){c.globalAlpha*=.45;pixel(c,center+offset+drift-6,y+part*2+4,length*.55,2)}
      if(part===1&&hash(n+18)>.66){c.globalAlpha=strength*.85;c.fillStyle='#e2edc5';pixel(c,center+offset+drift+length*.25,y+part*2,4+hash(n+1)*10,2)}
    }
  }
  c.globalAlpha=1;
}
