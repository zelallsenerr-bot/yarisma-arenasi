/* Local platform presentation; shared game engine and elimination state are untouched. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;
function decorate(){for(const board of app.querySelectorAll('.floor366:not([data-ring-platform])')){
 board.dataset.ringPlatform='v515';board.setAttribute('aria-label','Dairesel platform: merkez yarışmacısı, yanında sunucu ve çevrede on numaralı kapak');
 board.querySelectorAll('.pod366').forEach((pod,i)=>{pod.style.setProperty('--pod-x',positions[i][0]+'%');pod.style.setProperty('--pod-y',positions[i][1]+'%');});
 const host=document.createElement('aside');host.className='ring-host-v67';
 host.innerHTML='<div class="ring-host-face-v67">'+(window.ArenaHumans435?.host()||'<span aria-hidden="true">🎤</span>')+'</div><strong>Mehmet Ali Erbil</strong><small>SUNUCU</small>';
 board.append(host);
 board.querySelectorAll('.pod366').forEach(pod=>{const button=pod.querySelector('.pick366');if(!button)return;pod.style.cursor='pointer';pod.addEventListener('click',e=>{if(!e.target.closest('button'))button.click()});});
}}
const positions=Array.from({length:10},(_,i)=>{return[12+(i%5)*19,i<5?27:80]});
new MutationObserver(decorate).observe(app,{childList:true,subtree:true});decorate();
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
