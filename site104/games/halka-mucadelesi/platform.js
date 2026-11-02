/* Scoped presentation mirrors the existing roster, including eliminations. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;let signature='';
function update(){const roster=app.querySelector('.contestants');let current=app.querySelector('.halka-platform-v67');if(!roster){if(current)current.remove();signature='';return}
const next=roster.innerHTML;if(current&&signature===next)return;signature=next;
const stage=document.createElement('section');stage.className='halka-platform-v67';stage.setAttribute('aria-label','En Zayıf Halka stüdyosu: yarım dairede dokuz yarışmacı kürsüsü, merkezde sunucu');
const title=document.createElement('h2');title.textContent='EN ZAYIF HALKA';stage.append(title);
const positions=[[10,58],[18,37],[28,23],[39,15],[50,12],[61,15],[72,23],[82,37],[90,58]];
Array.from(roster.children).forEach((source,i)=>{const pod=document.createElement('div');pod.className='halka-podium-v67'+(source.classList.contains('active')?' halka-active-v67':'')+(source.classList.contains('out')?' halka-out-v67':'');pod.style.left=positions[i][0]+'%';pod.style.top=positions[i][1]+'%';
const portrait=source.querySelector('.portrait35');if(portrait&&!source.classList.contains('out'))pod.append(portrait.cloneNode(true));pod.dataset.eliminated508=String(source.classList.contains('out'));
const screen=document.createElement('div');screen.className='halka-screen-v67';const name=document.createElement('strong');name.textContent=source.querySelector('b')?.textContent||'Yarışmacı';const status=document.createElement('small');status.textContent=source.querySelector('small')?.textContent||'';screen.append(name,status);pod.append(screen);stage.append(pod);});
const host=document.createElement('div');host.className='halka-host-v67';host.innerHTML=(window.ArenaHumans435?.host()||'')+'<strong>SUNUCU</strong><div class="halka-host-desk-v67" aria-hidden="true"></div>';stage.append(host);
if(current)current.replaceWith(stage);else app.prepend(stage);
}new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest?.('.halka-platform-v67')))return;update()}).observe(app,{childList:true,subtree:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
