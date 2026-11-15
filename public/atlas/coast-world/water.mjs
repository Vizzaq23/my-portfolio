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
  reflectionClusters(c,864,skyColor,.18+day*.3,time,250,4);
  if(state.sunVisible)reflectionClusters(c,state.sunX,blend([245,239,195],[255,193,117],twilight),.8,time,150+twilight*80,31);
  moonReflection(c,state,time);
  reflectionClusters(c,1150,[235,178,93],(1-day)*.3,time,24,91);
}

export function moonReflection(c,state,time){
  // A rough-water glitter path, not a second moon painted on the surface.
  if(!state.moonVisible||state.daylight>=.65)return;
  const power=(1-state.daylight/.65)*Math.sqrt(Math.max(0,state.phase.fraction));
  if(power<=0)return;
  c.save();c.beginPath();c.rect(0,598,1672,220);c.clip();
  for(let row=0;row<48;row++){
    const depth=row/47;
    // Perspective compresses the far ripples and widens the near-water footprint.
    const y=600+Math.pow(depth,1.65)*211;
    const spread=12+Math.pow(depth,1.3)*200;
    const bend=Math.sin(time*.43-depth*8)*(.8+depth*5);
    const center=state.moonX+bend;
    const wave=.5+.5*Math.sin(time*.85-depth*18);
    c.fillStyle='#83bac6';c.globalAlpha=power*.055*(.6+wave*.4);
    pixel(c,center-spread*.7,y,spread*1.4,2);
    for(let part=0;part<5;part++){
      const seed=row*19+part*71;
      const offset=(hash(seed+7)*2-1)*spread;
      const core=Math.exp(-Math.pow(offset/(spread*.55),2));
      const crest=Math.max(0,Math.sin(time*(.65+hash(seed+9)*.22)-depth*19+hash(seed+2)*6));
      const exposure=core*(.23+crest*.77)*(1-depth*.2);
      if(exposure<.045)continue;
      const length=(3+depth*16)*( .5+hash(seed+12));
      c.globalAlpha=power*exposure*.85;
      c.fillStyle=core>.7&&crest>.65?'#e1efda':'#9bcbd0';
      pixel(c,center+offset-length/2,y,length,depth>.65?4:2);
      // A few sharp silver crests sit inside the wider, dimmer blue reflection.
      if(core>.75&&crest>.8){c.globalAlpha=power*.9;c.fillStyle='#f2f3df';pixel(c,center+offset,y,Math.max(2,length*.35),2)}
    }
  }
  c.restore();
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
