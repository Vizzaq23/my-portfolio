import type { Surface, Walker } from './portfolio-physics';

export type ContentSurface = Surface & { kind: 'letter' | 'card' | 'scenery'; element: HTMLElement; range?: Range; glyph?: string; color?: string };
const solids = '.level-pipe,.world-block,.level-staircase > div,.level-castle,[data-walk-surface="solid"]';
const cards = 'article,figure,.hero-proof,[data-arcade-hover],dl > div,.about-profile-panel,.profile-career-panel,.contact-vault-panel,.project-map-artboard,.experience-record,[id^="project-panel-"],button,summary';
const scenery = '.platform-pixel-tile,.level-ground,.world-cloud,.about-garden-island,.experience-airship-art,.about-ground-strip,.retro-sky-ledge,[data-walk-surface]';
const excluded = '[hidden],.sr-only,[data-walk-surface="none"],[data-walk-broken],dialog,[role="dialog"],script,style,svg,canvas,textarea,input,select';

/** Pick an individual letter first; a card only when no letter is in reach. */
export function smashTarget(s: Walker, targets: ContentSurface[], facing: number) {
  return targets.filter(b=>b.kind!=='scenery' && b.right>=s.x-18 && b.left<=s.x+46 && b.bottom>=s.y-86 && b.top<=s.y+18)
    .sort((a,b)=>Number(a.kind!=='letter')-Number(b.kind!=='letter') ||
      Math.abs((a.left+a.right)/2-(s.x+14+facing*20))+Math.abs(a.top-(s.y-30))-
      Math.abs((b.left+b.right)/2-(s.x+14+facing*20))-Math.abs(b.top-(s.y-30)))[0];
}

/** Range geometry and CSS highlights leave React's text nodes and line wrapping intact. */
export class PortfolioContent {
  private nextId = 1;
  private ids = new WeakMap<Element,number>();
  private text = new WeakMap<Text,{value:string;parts:{id:number;range:Range;glyph:string}[]}>();
  private broken = new Set<number>();
  private hiddenCards = new Set<HTMLElement>();
  private highlight = new Highlight();
  private segmenter = new Intl.Segmenter(undefined,{granularity:'grapheme'});
  private main: Element;
  constructor(main: Element) { this.main=main; CSS.highlights.set('portfolio-break',this.highlight); }

  measure(width: number): ContentSurface[] {
    const result: ContentSurface[] = [];
    const visible = (el: HTMLElement) => {
      if(el.closest(excluded)) return false;
      const css=getComputedStyle(el), r=el.getBoundingClientRect();
      return css.visibility!=='hidden' && css.display!=='none' && Number(css.opacity)!==0 && r.width>0 && r.height>0 && r.right>0 && r.left<width;
    };
    for(const el of this.main.querySelectorAll<HTMLElement>(`${solids},${cards},${scenery}`)) {
      if(!visible(el)) continue;
      let id=this.ids.get(el); if(id===undefined){id=this.nextId++;this.ids.set(el,id);}
      if(this.broken.has(id)) continue;
      const r=el.getBoundingClientRect();
      result.push({id,left:r.left+scrollX,right:r.right+scrollX,top:r.top+scrollY,bottom:r.bottom+scrollY,solid:el.matches(solids),element:el,kind:el.matches(solids)||el.matches(scenery)?'scenery':'card'});
    }
    const walker=document.createTreeWalker(this.main,NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while((node=walker.nextNode())) {
      const text=node as Text, el=text.parentElement;
      if(!el || !text.data.trim() || !visible(el)) continue;
      const parentRect=el.getBoundingClientRect();
      // Only build glyph geometry close enough to interact with. Cards remain global.
      if(parentRect.bottom < -innerHeight || parentRect.top > innerHeight*2) continue;
      let cached=this.text.get(text);
      if(!cached || cached.value!==text.data) {
        const parts=[];
        for(const {segment,index} of this.segmenter.segment(text.data)) {
          if(!segment.trim()) continue;
          const range=document.createRange(); range.setStart(text,index); range.setEnd(text,index+segment.length);
          parts.push({id:this.nextId++,range,glyph:segment});
        }
        cached={value:text.data,parts};this.text.set(text,cached);
      }
      const color=getComputedStyle(el).color;
      for(const part of cached.parts) {
        if(this.broken.has(part.id)) continue;
        const r=part.range.getBoundingClientRect();
        if(r.width<1 || r.height<2 || r.right<=0 || r.left>=width || r.bottom < -100 || r.top > innerHeight+100) continue;
        result.push({id:part.id,left:r.left+scrollX,right:r.right+scrollX,top:r.top+scrollY,bottom:r.bottom+scrollY,solid:false,kind:'letter',element:el,range:part.range,glyph:part.glyph,color});
      }
    }
    return result;
  }
  break(target: ContentSurface) {
    if(target.kind==='scenery' || this.broken.has(target.id)) return false;
    this.broken.add(target.id);
    if(target.range) this.highlight.add(target.range);
    else {target.element.dataset.walkBroken='true';this.hiddenCards.add(target.element);}
    return true;
  }
  restore() {
    this.broken.clear();this.highlight.clear();
    for(const el of this.hiddenCards) delete el.dataset.walkBroken;
    this.hiddenCards.clear();
  }
  destroy(){this.restore();CSS.highlights.delete('portfolio-break');}
}
