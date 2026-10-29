/* Eyvah only: one oval platform for selection, conversation and elimination. */
(()=>{'use strict';
const positions=Array.from({length:10},(_,i)=>{const a=[-155,-122.5,-90,-57.5,-25,25,57.5,90,122.5,155][i]*Math.PI/180;return[50+40*Math.cos(a),59+30*Math.sin(a)]});
const clamp=n=>Math.max(0,Math.min(1,n));
function art(p,i,facing){const a=window.ArenaStageCast437?.resolve({...p,game:'eyvah-dusuyorum'},i,'standing',facing);return a?window.ArenaHumans435.art(a,p.name):window.ArenaHumans435?.person({...p,facing},i,'standing')||''}
function host(board,x=31,y=59,facing='right'){
 let el=board.querySelector('.eyvah-host516');if(!el){el=document.createElement('aside');el.className='eyvah-host516';el.innerHTML='<div class="host-body516"></div><strong>Mehmet Ali Erbil</strong><small>SUNUCU</small>';board.append(el)}
 el.style.left=x+'%';el.style.top=y+'%';if(el.dataset.facing!==facing){el.dataset.facing=facing;el.querySelector('.host-body516').innerHTML=art({id:'eyvah-host211',name:'Mehmet Ali Erbil',host:true},0,facing)}
 return el;
}
function decorate(board){
 if(board.dataset.ringPlatform==='v516')return;
 board.dataset.ringPlatform='v516';board.classList.add('oval516');board.setAttribute('aria-label','Oval yarışma platformu; ortada ana yarışmacı ve çevresinde on rakip');
 board.querySelectorAll('.ring-host-v67').forEach(el=>el.remove());
 board.querySelectorAll('.pod366').forEach((pod,i)=>{const n=Number(pod.dataset.pod516??i);pod.style.setProperty('--pod-x',positions[n][0]+'%');pod.style.setProperty('--pod-y',positions[n][1]+'%');const hatch=pod.querySelector('.number366');if(hatch&&!hatch.querySelector('.hatch-lid516'))hatch.insertAdjacentHTML('afterbegin','<i class="hatch-lid516 left516"></i><i class="hatch-lid516 right516"></i>');const button=pod.querySelector('.pick366');if(button){pod.style.cursor='pointer';pod.addEventListener('click',e=>{if(!e.target.closest('button'))button.click()})}});
 const center=board.querySelector('.floor-you366');if(center&&!center.querySelector('.center-hatch516'))center.insertAdjacentHTML('beforeend','<div class="center-hatch516" aria-hidden="true"><i class="hatch-lid516 left516"></i><i class="hatch-lid516 right516"></i></div>');
 host(board);
}
function placeHost(board,px,py){
 const el=board.querySelector('.eyvah-host516'),frame=board.getBoundingClientRect(),over=(a,b)=>a.left<b.right+3&&a.right>b.left-3&&a.top<b.bottom+3&&a.bottom>b.top-3;
 el.style.transition='none';
 const heads=[...board.querySelectorAll('svg.human435')].filter(e=>!el.contains(e)).map(e=>{const r=e.getBoundingClientRect();return{left:r.left,right:r.right,top:r.top,bottom:r.top+r.height*.25}});
 const labels=[...board.querySelectorAll('.pick366,.pod-label516,.floor-you366>strong')].map(e=>e.getBoundingClientRect());
 const candidates=[];for(const dx of [-13,13,-19,19,-26,26])for(const dy of [0,-8,8,-16,16,-24,24]){const x=px+dx,y=py+dy;if(x<8||x>92||y<25||y>86)continue;el.style.left=x+'%';el.style.top=y+'%';const body=el.getBoundingClientRect(),label=el.querySelector('strong').getBoundingClientRect();const collisions=heads.filter(h=>over(body,h)||over(label,h)).length+labels.filter(l=>over(body,l)||over(label,l)).length;const distance=dx*dx+dy*dy*1.2;candidates.push({x,y,score:collisions*100000+distance})}
 const best=candidates.sort((a,b)=>a.score-b.score)[0];if(best)host(board,best.x,best.y,best.x<px?'right':'left');return best?.x??31;
}
function prepare(board){
 if(!board)return;decorate(board);if(board.dataset.prepared516)return;
 const id=board.dataset.loser516;if(id===undefined)return;
 const selected=id==='center'?board.querySelector('.floor-you366'):board.querySelector('[data-pod516="'+id+'"]');if(!selected)return;
 board.dataset.prepared516='true';board.classList.add('conversation516');selected.classList.add('drop-target516');
 const [px,py]=id==='center'?[50,59]:positions[Number(id)],hx=placeHost(board,px,py);
 const svg=selected.querySelector('svg.human435'),body=selected.querySelector('.standing-body435');
 if(svg&&body){const p={id:svg.dataset.castId437,name:svg.dataset.person435,gender:svg.dataset.gender437,age:svg.dataset.age437||undefined,player:svg.dataset.player443==='true'};body.innerHTML=art(p,id==='center'?4:Number(id),hx<px?'left':'right');const image=body.querySelector('svg image');const resolved=window.ArenaStageCast437?.resolve({...p,game:'eyvah-dusuyorum'},id==='center'?4:Number(id),'standing',hx<px?'left':'right');if(resolved?.facing==='front')body.style.setProperty('--turn516',hx<px?'-12deg':'12deg');}
}
function update(board,elapsed){
 if(!board?.isConnected)return;prepare(board);const selected=board.querySelector('.drop-target516');if(!selected)return;
 const lid=clamp(elapsed/.18),fall=clamp((elapsed-.10)/.62);selected.style.setProperty('--open516',lid);selected.style.setProperty('--drop516',(fall*fall*190)+'%');selected.classList.toggle('hatch-open516',lid>0);selected.classList.toggle('falling516',fall>0);board.classList.toggle('dropping516',fall>0);
}
window.ArenaEyvah516={positions,prepare,update};
function install(){const app=document.getElementById('app');if(!app)return;let queued=false;function scan(){queued=false;app.querySelectorAll('.floor366').forEach(b=>{decorate(b);if(b.dataset.loser516!==undefined)prepare(b)})}new MutationObserver(()=>{if(!queued){queued=true;queueMicrotask(scan)}}).observe(app,{childList:true,subtree:true});scan()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
