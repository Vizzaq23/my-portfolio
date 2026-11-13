const items = {
  laptop:{label:'EQUIPPED / LAPTOP',title:'Build products.',copy:'One Piece TCG Shelf brings collections, market prices, and card sharing into a full-stack application.',stack:'TypeScript · React · Next.js · Supabase',href:'/projects/tcg-shelf',icon:'<path fill="#21374a" stroke="#92c8be" stroke-width="2" d="M8 8h32v24H8z"/><path fill="#111c30" d="M12 12h24v15H12z"/><path stroke="#efcf8e" fill="none" stroke-width="2" d="m21 17-4 3 4 3m7-6 4 3-4 3"/><path fill="#8faeac" d="M4 32h40v5H4z"/>'},
  circuit:{label:'EQUIPPED / CIRCUIT BOARD',title:'Connect systems.',copy:'For a full-scale pinball machine, I connected Raspberry Pi hardware to real-time game software and led the software development.',stack:'Python · Pygame · GPIO · Game logic',href:'/#projects',icon:'<path fill="#326a5c" stroke="#92c8be" stroke-width="2" d="M8 5h32v37H8z"/><path fill="#111c30" d="M17 16h14v14H17z"/><path stroke="#efcf8e" stroke-width="2" d="M12 9h8v7m16-4h-8v4M12 34h8v-4m16 7h-8v-7M14 20h3m14 6h5"/>'},
  notebook:{label:'EQUIPPED / NOTEBOOK',title:'Make data useful.',copy:'At Sentari AI, I built an analytics dashboard for referrals, retention, engagement, and user growth using Supabase RPCs and SQL.',stack:'SQL · Supabase · Analytics · Production experience',href:'/#experience',icon:'<path fill="#b197c0" stroke="#23334b" stroke-width="2" d="M9 5h29v37H9z"/><path fill="#e9dbb8" d="M15 8h20v30H15z"/><path stroke="#526e7c" stroke-width="2" d="M19 14h12m-12 5h12m-12 5h8m-8 5h10"/><path stroke="#edcb85" stroke-width="3" d="M7 12h6m-6 9h6m-6 9h6"/>'}
};
function equip(key) {
  const item=items[key];
  for(const [id,value] of [['item-label',item.label],['item-title',item.title],['item-copy',item.copy],['item-stack',item.stack]])document.getElementById(id).textContent=value;
  document.getElementById('item-link').href=item.href;
  document.getElementById('equipped').innerHTML=`<svg viewBox="0 0 48 48" shape-rendering="crispEdges">${item.icon}</svg>`;
  document.querySelectorAll('[data-item]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.item===key)));
}
document.querySelectorAll('[data-item]').forEach(button=>button.onclick=()=>equip(button.dataset.item));
document.querySelectorAll('[data-color]').forEach(button=>button.onclick=()=>{
  document.body.dataset.color=button.dataset.color;
  document.querySelectorAll('[data-color]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
});
const places={projects:['01 / WORKSHOP','Things I’ve built.','Explore all nine projects, from full-stack applications to games and physical hardware.','/#all-projects'],experience:['02 / LIGHTHOUSE','Experience & education.','Production work at Sentari AI, engineering foundations, and the milestones along the way.','/#experience'],about:['03 / LOOKOUT','The person behind it.','How I approach building, what I bring to a team, and what I’m looking for next.','/#about'],contact:['04 / HARBOR','Start a conversation.','Open to full-time software engineering opportunities. Find my email, résumé, and social links.','/#contact']};
function destination(key){const coordinates={projects:[18,34],experience:[57,17],about:[66,55],contact:[45,70]};const marker=document.getElementById("map-player");marker.style.left=coordinates[key][0]+"%";marker.style.top=coordinates[key][1]+"%";const [number,name,copy,href]=places[key];document.getElementById('place-number').textContent=number;document.getElementById('place-name').textContent=name;document.getElementById('place-copy').textContent=copy;document.getElementById('place-link').href=href;document.querySelectorAll('[data-place]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.place===key)));}
document.querySelectorAll('[data-place]').forEach(button=>button.onclick=()=>destination(button.dataset.place));
function route(){const map=location.hash==='#map';document.getElementById('player-screen').hidden=map;document.getElementById('map-screen').hidden=!map;document.getElementById(map?'map-title':'player-title').focus({preventScroll:true});scrollTo(0,0);}
document.getElementById('enter-map').onclick=()=>{location.hash='map';};
document.getElementById('back-player').onclick=()=>{location.hash='player';};
addEventListener('hashchange',route);
equip('laptop');destination('projects');route();

