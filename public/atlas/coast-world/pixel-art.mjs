// Runtime sprite treatment: one logical pixel = two world units.
// Source PNGs stay intact and editable; cache is rebuilt only when sprite size changes.
const colors = ['101329','18223d','203452','294563','315b75','42768a','609b9d','97c7bd','d7e4bd','f8edb9','123b40','20534b','34705a','558566','83a276','171c31','31314b','4d4163','705979','9a7496','c29baa','352b39','553b44','774b4b','9c6050','bf7956','dda365','f2c878','5d452f','8c6237','bd863d','e8ad48','ffd56c','ffe8a2','181b24','3a424c','657477','a5afb0'].map(hex=>[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)));
const cache = new WeakMap();
export function pixelSprite(source, width, height) {
  const w = Math.max(1,Math.round(width/2)), h = Math.max(1,Math.round(height/2));
  let sizes=cache.get(source);if(!sizes){sizes=new Map();cache.set(source,sizes)}
  const key=w+':'+h;if(sizes.has(key))return sizes.get(key);
  const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
  const c=canvas.getContext('2d',{willReadFrequently:true});
  c.drawImage(source,0,0,w,h);
  const data=c.getImageData(0,0,w,h),p=data.data,original=new Uint8ClampedArray(p);
  // Suppress low-contrast texture speckles without averaging across silhouettes.
  for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
    const i=(y*w+x)*4;if(original[i+3]<96)continue;
    const sum=[0,0,0];let count=0;
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
      const j=((y+dy)*w+x+dx)*4;
      if(original[j+3]<96||Math.max(...[0,1,2].map(k=>Math.abs(original[j+k]-original[i+k])))>28)continue;
      for(let k=0;k<3;k++)sum[k]+=original[j+k];count++;
    }
    for(let k=0;k<3;k++)p[i+k]=sum[k]/count;
  }
  for(let i=0;i<p.length;i+=4){if(p[i+3]<96){p[i+3]=0;continue}let best=colors[0],distance=Infinity;
    for(const color of colors){const delta=(p[i]-color[0])**2*.3+(p[i+1]-color[1])**2*.59+(p[i+2]-color[2])**2*.11;if(delta<distance){distance=delta;best=color}}
    p[i]=best[0];p[i+1]=best[1];p[i+2]=best[2];p[i+3]=255;
  }
  c.putImageData(data,0,0);sizes.set(key,canvas);return canvas;
}
