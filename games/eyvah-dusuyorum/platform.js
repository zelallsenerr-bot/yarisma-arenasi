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
// Search the complete floor; face/name overlap is a hard rejection, never a penalty.
function placeHost(board,px,py){
 const el=board.querySelector('.eyvah-host516'),frame=board.getBoundingClientRect(),over=(a,b)=>a.left<b.right+5&&a.right>b.left-5&&a.top<b.bottom+5&&a.bottom>b.top-5;
 el.style.transition='none';
 const heads=[...board.querySelectorAll('.pod366:not(.eliminated366) svg.human435,.floor-you366 svg.human435')].map(e=>{const r=e.getBoundingClientRect();return{left:r.left+r.width*.12,right:r.right-r.width*.12,top:r.top,bottom:r.top+r.height*.29}});
 const labels=[...board.querySelectorAll('.pick366,.pod-label516,.floor-you366>strong')].map(e=>e.getBoundingClientRect()).filter(r=>r.width&&r.height);
 let best,all=[];el.style.removeProperty('--host-name-left518');
 for(const scale of [1,.86,.74]){
  el.style.setProperty('--host-scale518',scale);
  const candidates=[],measured=el.getBoundingClientRect(),nameRect=el.querySelector('strong').getBoundingClientRect(),labelOffset={x:nameRect.left-measured.left,y:nameRect.top-measured.top,width:nameRect.width,height:nameRect.height};
  for(let x=8;x<=92;x+=2)for(let y=26;y<=92;y+=2){
   const left=frame.left+board.clientLeft+board.clientWidth*x/100-measured.width/2,top=frame.top+board.clientTop+board.clientHeight*y/100-measured.height,body={left,top,right:left+measured.width,bottom:top+measured.height},label={left:left+labelOffset.x,top:top+labelOffset.y,right:left+labelOffset.x+labelOffset.width,bottom:top+labelOffset.y+labelOffset.height};
   if(body.left<frame.left+5||body.right>frame.right-5||body.top<frame.top+5)continue;
   if(heads.some(h=>over(body,h))||labels.some(l=>over(body,l)))continue;
   for(const nameLeft of [labelOffset.x,measured.width+4,-labelOffset.width-4]){
    const label={left:left+nameLeft,top:top+labelOffset.y,right:left+nameLeft+labelOffset.width,bottom:top+labelOffset.y+labelOffset.height};
    if(label.left<frame.left+4||label.right>frame.right-4||label.bottom>frame.bottom-4||heads.some(h=>over(label,h))||labels.some(l=>over(label,l)))continue;
    const dx=x-px,dy=y-py,distance=dx*dx+dy*dy*4;
    candidates.push({x,y,nameLeft,score:distance+(Math.abs(dx)<10?180:0)+(1-scale)*160});
   }
  }
  const pick=candidates.sort((a,b)=>a.score-b.score)[0];if(pick)all.push({...pick,scale});
 }
 best=all.sort((a,b)=>a.score-b.score)[0];if(best){el.style.setProperty('--host-scale518',best.scale);el.style.setProperty('--host-name-left518',best.nameLeft+'px');host(board,best.x,best.y,best.x<px?'right':'left');el.dataset.clearFaces518='true'}
 return best?.x??31;
}
function conversationArt518(svg,facing,index){
 const p={id:svg.dataset.castId437,name:svg.dataset.person435,gender:svg.dataset.gender437,age:svg.dataset.age437||undefined,player:svg.dataset.player443==='true'};
 const source=svg.querySelector('image')?.getAttribute('href')?.replace(/^\.\.\//,'');
 let entry;
 if(/^humans435\/angle437-standing[12]?\.webp$/.test(source||''))entry={asset:source,size:[1536,1024],rect:svg.getAttribute('viewBox').split(/\s+/).map(Number),facing:'right'};
 if(/^humans435\/standing[12]?\.webp$/.test(source||'')){
  const rect=svg.getAttribute('viewBox').split(/\s+/).map(Number),cell=Math.floor((rect[0]+rect[2]/2)/384)+4*Math.floor((rect[1]+rect[3]/2)/512),asset=source.replace('humans435/','humans435/angle437-');
  entry=window.ArenaBlockingData437?.generic?.standing?.find(e=>e.asset===asset&&Math.floor((e.rect[0]+e.rect[2]/2)/384)+4*Math.floor((e.rect[1]+e.rect[3]/2)/512)===cell);
 }
 entry??=window.ArenaStageCast437?.resolve({...p,game:'eyvah-dusuyorum'},index,'standing',facing);
 if(entry){entry={...entry,...p,flip:entry.source437?entry.flip:(facing==='left'&&entry.facing!=='left'||facing==='right'&&entry.facing==='left')};return window.ArenaHumans435.art(entry,p.name)}
 return art(p,index,facing);
}
let serial518=0;
function rig518(svg){
 if(!svg||svg.dataset.fallRig518)return;
 const source=[...svg.children].find(n=>n.tagName.toLowerCase()==='g');if(!source)return;
 const NS='http://www.w3.org/2000/svg',v=svg.getAttribute('viewBox').split(/\s+/).map(Number),[x,y,w,h]=v,id='fall-rig518-'+(++serial518),defs=document.createElementNS(NS,'defs');
 const parts=[['head',0,0,1,.235,.5,.23],['torso',.26,.22,.48,.40,.5,.59],['arm-left',0,.22,.28,.40,.28,.26],['arm-right',.72,.22,.28,.40,.72,.26],['leg-left',0,.60,.51,.40,.41,.61],['leg-right',.49,.60,.51,.40,.59,.61]];
 for(const [name,px,py,pw,ph,ox,oy]of parts){const clip=document.createElementNS(NS,'clipPath');clip.id=id+'-'+name;const rect=document.createElementNS(NS,'rect');for(const [k,value]of Object.entries({x:x+px*w,y:y+py*h,width:pw*w,height:(name.startsWith('leg-')?.21:ph)*h}))rect.setAttribute(k,value);clip.append(rect);defs.append(clip);const joint=document.createElementNS(NS,'g');joint.setAttribute('class','fall-joint518 fall-'+name+'518');joint.style.transformOrigin=(x+ox*w)+'px '+(y+oy*h)+'px';const mask=document.createElementNS(NS,'g');mask.setAttribute('clip-path','url(#'+clip.id+')');mask.append(source.cloneNode(true));joint.append(mask);if(name.startsWith('leg-')){const knee=document.createElementNS(NS,'g'),kname=name.replace('leg-','knee-'),lowerClip=document.createElementNS(NS,'clipPath'),lowerRect=document.createElementNS(NS,'rect');lowerClip.id=id+'-'+kname;for(const[k,value]of Object.entries({x:x+px*w,y:y+h*.79,width:pw*w,height:h*.21}))lowerRect.setAttribute(k,value);lowerClip.append(lowerRect);defs.append(lowerClip);knee.setAttribute('class','fall-joint518 fall-'+kname+'518');knee.style.transformOrigin=(x+ox*w)+'px '+(y+h*.8)+'px';const lower=document.createElementNS(NS,'g');lower.setAttribute('clip-path','url(#'+lowerClip.id+')');lower.append(source.cloneNode(true));knee.append(lower);joint.append(knee)}svg.append(joint)}
 svg.append(defs);source.remove();svg.dataset.fallRig518='true';svg.dataset.natural511='true';
}
function prepare(board){
 if(!board)return;decorate(board);if(board.dataset.prepared516)return;
 const id=board.dataset.loser516;if(id===undefined)return;
 const selected=id==='center'?board.querySelector('.floor-you366'):board.querySelector('[data-pod516="'+id+'"]');if(!selected)return;
 board.dataset.prepared516='true';board.classList.add('conversation516');selected.classList.add('drop-target516');selected.dataset.guest508='true';selected.querySelectorAll('.actor-slot435').forEach(box=>{box.dataset.guest508='true';box.dataset.art437='eyvah-conversation518'});
 const [px,py]=id==='center'?[50,59]:positions[Number(id)],hx=placeHost(board,px,py);
 const svg=selected.querySelector('svg.human435'),body=selected.querySelector('.standing-body435');
 if(svg&&body){body.dataset.guest508='true';body.innerHTML=conversationArt518(svg,hx<px?'left':'right',id==='center'?4:Number(id));selected.dataset.facing518=hx<px?'left':'right';}
 // Re-evaluate after final layout and whenever the viewport changes.
 let queued=false;const align=()=>{if(queued||board.classList.contains('dropping516'))return;queued=true;requestAnimationFrame(()=>{queued=false;if(!board.isConnected||board.classList.contains('dropping516'))return;const x=placeHost(board,px,py),facing=x<px?'left':'right';if(body&&selected.dataset.facing518!==facing){body.innerHTML=conversationArt518(body.querySelector('svg'),facing,id==='center'?4:Number(id));selected.dataset.facing518=facing}})};
 align();if(typeof ResizeObserver!=='undefined')new ResizeObserver(align).observe(board);
}
const motion518=new WeakMap();
function renderFall518(board,elapsed){
 const selected=board.querySelector('.drop-target516');if(!selected)return;
 const lid=clamp(elapsed/.13),t=Math.max(0,elapsed-.025),fall=clamp(t/.83),reflex=Math.sin(Math.min(1,t/.36)*Math.PI*.68),tilt=Math.sin(Math.min(1,t/.62)*Math.PI/2),side=Number(board.dataset.loser516||0)%2?-1:1;
 selected.style.setProperty('--open516',lid);selected.style.setProperty('--drop516',(fall*fall*245)+'%');selected.style.setProperty('--fall-tilt518',(side*tilt*21)+'deg');selected.style.setProperty('--fall-drift518',(side*tilt*5)+'%');selected.style.setProperty('--fall-blur518',(fall*1.2)+'px');
 if(t>0){const svg=selected.querySelector('svg.human435');rig518(svg);const rotate=(name,value)=>{const part=svg?.querySelector('.fall-'+name+'518');if(part)part.style.transform='rotate('+value+'deg)'};rotate('arm-left',reflex*62);rotate('arm-right',-reflex*76);rotate('leg-left',reflex*24);rotate('leg-right',-reflex*30);rotate('knee-left',-reflex*42);rotate('knee-right',reflex*38);rotate('torso',side*reflex*-8);rotate('head',side*reflex*11)}
 selected.classList.toggle('hatch-open516',lid>0);selected.classList.toggle('falling516',fall>0);board.classList.toggle('dropping516',fall>0);
}
function update(board,elapsed){
 if(!board?.isConnected)return;prepare(board);
 let m=motion518.get(board);if(!m){m={elapsed:0,last:performance.now(),running:false};motion518.set(board,m)}
 m.elapsed=Math.max(m.elapsed,elapsed);renderFall518(board,m.elapsed);
 if(elapsed<=0||m.running)return;m.running=true;m.last=performance.now();
 function frame(now){if(!board.isConnected||m.elapsed>1.2){m.running=false;return}const dt=Math.min(.05,(now-m.last)/1000);m.last=now;if(!window.Exp318Test?.paused&&!document.hidden){m.elapsed+=dt;renderFall518(board,m.elapsed)}requestAnimationFrame(frame)}requestAnimationFrame(frame);
}
window.ArenaEyvah516={positions,prepare,update};
function install(){const app=document.getElementById('app');if(!app)return;let queued=false;function scan(){queued=false;app.querySelectorAll('.floor366').forEach(b=>{decorate(b);if(b.dataset.loser516!==undefined)prepare(b)})}new MutationObserver(()=>{if(!queued){queued=true;queueMicrotask(scan)}}).observe(app,{childList:true,subtree:true});scan()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
