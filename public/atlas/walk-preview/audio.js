// Audio is opt-in. Footsteps are a licensed CC0 recording; click/static/chime are synthesized.
export class RoomAudio {
  constructor(){this.context=null;this.enabled=false;this.walk=null;this.nodes=new Set();this.buffer=null;}
  async enable(){
    this.context??=new AudioContext();await this.context.resume();this.enabled=true;
    if(!this.buffer){try{const r=await fetch('./assets/footsteps-wood.mp3');if(!r.ok)throw new Error('Footsteps unavailable');this.buffer=await this.context.decodeAudioData(await r.arrayBuffer());document.body.dataset.audio='decoded';}catch{this.buffer=null;document.body.dataset.audio='recording-unavailable';}}
  }
  stop(){for(const node of this.nodes){try{node.stop();}catch{/* already ended */}}this.nodes.clear();this.walk=null;}
  disable(){this.enabled=false;this.stop();}
  sound(kind){
    if(!this.enabled||!this.context)return;
    const c=this.context,t=c.currentTime,g=c.createGain();g.connect(c.destination);
    if(kind==='walk'&&this.buffer){const s=c.createBufferSource();s.buffer=this.buffer;s.loop=true;s.playbackRate.value=.8;s.connect(g);g.gain.value=.16;s.start();this.nodes.add(s);this.walk=s;return;}
    if(kind==='static'){
      const b=c.createBuffer(1,Math.floor(c.sampleRate*.45),c.sampleRate),data=b.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*.1;
      const s=c.createBufferSource();s.buffer=b;const filter=c.createBiquadFilter();filter.type='lowpass';filter.frequency.value=2500;s.connect(filter);filter.connect(g);g.gain.setValueAtTime(.18,t);g.gain.exponentialRampToValueAtTime(.001,t+.45);s.start();this.nodes.add(s);s.onended=()=>this.nodes.delete(s);return;
    }
    const osc=c.createOscillator();osc.type=kind==='click'?'triangle':'sine';osc.frequency.setValueAtTime(kind==='click'?280:392,t);osc.frequency.exponentialRampToValueAtTime(kind==='click'?80:523,t+.14);g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(kind==='click'?.13:.045,t+.008);g.gain.exponentialRampToValueAtTime(.001,t+.22);osc.connect(g);osc.start();osc.stop(t+.24);this.nodes.add(osc);osc.onended=()=>this.nodes.delete(osc);
  }
  endWalk(){if(this.walk){this.walk.stop();this.nodes.delete(this.walk);this.walk=null;}}
}
