// Opt-in mix: CC0 wood footstep slices plus synthesized plug/CRT sounds.
export class RoomAudio {
 constructor(){this.context=null;this.enabled=false;this.nodes=new Set();this.buffer=null;this.steps=[];this.stepIndex=-1;}
 async enable(){
  this.context??=new AudioContext();await this.context.resume();
  if(!this.master){const c=this.context;this.master=c.createGain();this.master.gain.value=.45;const compressor=c.createDynamicsCompressor();compressor.threshold.value=-18;compressor.ratio.value=4;compressor.attack.value=.003;compressor.release.value=.18;this.master.connect(compressor);compressor.connect(c.destination);}
  this.enabled=true;
  if(!this.buffer){try{const r=await fetch('./assets/footsteps-wood.mp3');if(!r.ok)throw Error('Footsteps unavailable');this.buffer=await this.context.decodeAudioData(await r.arrayBuffer());
   const data=this.buffer.getChannelData(0),rate=this.buffer.sampleRate,window=Math.floor(rate*.02),peaks=[];
   for(let i=0;i<data.length-window;i+=window){let energy=0;for(let j=0;j<window;j++)energy+=data[i+j]*data[i+j];peaks.push({at:i/rate,energy});}
   for(const peak of peaks.sort((a,b)=>b.energy-a.energy)){if(this.steps.every(t=>Math.abs(t-peak.at)>.35))this.steps.push(Math.max(0,peak.at-.025));if(this.steps.length===6)break;}
   document.body.dataset.audio='decoded';
  }catch{document.body.dataset.audio='synth-fallback';}}
 }
 stop(){for(const node of this.nodes){try{node.stop();}catch{}}this.nodes.clear();this.stepIndex=-1;this.ambient=false;document.body.dataset.ambience='off';}
 startAmbience(){
  if(!this.enabled||this.ambient)return;
  this.ambient=true;
  const c=this.context,t=c.currentTime;
  // Different loop lengths keep surf and gusts from repeating together.
  for(const [duration,cutoff,level,panValue] of [[24,1100,.16,-.18],[31,650,.065,.22]]){
   const buffer=c.createBuffer(1,Math.ceil(c.sampleRate*duration),c.sampleRate),data=buffer.getChannelData(0);
   let low=0;
   for(let i=0;i<data.length;i++){
    const phase=i/data.length,edge=Math.min(1,phase*duration,(1-phase)*duration);
    const swell=.22+.78*Math.pow(.5-.5*Math.cos(phase*Math.PI*2*(duration===24?3:2)),2);
    low=.96*low+.04*(Math.random()*2-1);
    data[i]=low*4*swell*edge;
   }
   const source=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain(),pan=c.createStereoPanner();
   source.buffer=buffer;source.loop=true;filter.type=duration===24?'lowpass':'bandpass';filter.frequency.value=cutoff;filter.Q.value=.45;pan.pan.value=panValue;
   gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(level,t+3);
   source.connect(filter);filter.connect(gain);gain.connect(pan);pan.connect(this.master);
   source.start(t);this.track(source,[filter,gain,pan]);
  }
  document.body.dataset.ambience='ocean-wind';
 }
 disable(){this.enabled=false;this.stop();}
 track(source,chain){this.nodes.add(source);source.onended=()=>{this.nodes.delete(source);for(const node of [source,...chain])node.disconnect();};}
 tone(frequency,end,duration,gain,delay=0,type='sine'){
  const c=this.context,t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(frequency,t);o.frequency.exponentialRampToValueAtTime(end,t+duration);
  g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(gain,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+duration+.02);this.track(o,[g]);
 }
 noise(duration,gain,startHz,endHz,delay=0){
  const c=this.context,t=c.currentTime+delay,b=c.createBuffer(1,Math.ceil(c.sampleRate*duration),c.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=b;f.type='lowpass';f.frequency.setValueAtTime(startHz,t);f.frequency.exponentialRampToValueAtTime(endHz,t+duration);
  g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(gain,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+duration);s.connect(f);f.connect(g);g.connect(this.master);s.start(t);this.track(s,[f,g]);
 }
 tickWalk(elapsed){
  if(!this.enabled)return;const index=Math.min(7,Math.floor((elapsed+.02)/.4375));if(index===this.stepIndex)return;this.stepIndex=index;
  const c=this.context,t=c.currentTime;
  if(this.buffer&&this.steps.length){const source=c.createBufferSource(),g=c.createGain(),pan=c.createStereoPanner();source.buffer=this.buffer;source.playbackRate.value=.95+(index%3)*.035;pan.pan.value=index%2?.1:-.1;
   g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.28+(index%2)*.025,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+.32);source.connect(g);g.connect(pan);pan.connect(this.master);source.start(t,this.steps[index%this.steps.length],.34);this.track(source,[g,pan]);
  }else{this.noise(.13,.13,900,170);this.tone(115,65,.16,.1);}
  document.body.dataset.footstep=String(index);
 }
 endWalk(){this.stepIndex=-1;}
 sound(kind){
  if(!this.enabled||!this.context)return;
  document.body.dataset.audioCue=kind;
  if(kind==='walk'){this.stepIndex=-1;return;}
  if(kind==='click'){this.noise(.045,.36,4200,1000);this.tone(180,75,.12,.22);this.noise(.055,.12,2300,700,.045);return;}
  if(kind==='static'){
   this.noise(2.6,.16,5800,380);
   this.tone(150,60,3.4,.055,0,'triangle');this.tone(120,120,5.5,.018,.12);
   this.noise(.05,.09,3000,900,.2);this.noise(.045,.065,2600,700,.43);return;
  }
  if(kind==='chime'){this.tone(392,392,.45,.045);this.tone(523,523,.6,.035,.11);}
 }
}

