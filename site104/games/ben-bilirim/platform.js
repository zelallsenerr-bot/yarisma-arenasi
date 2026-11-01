/* Ben Bilirim only: visual podiums mirror live names, scores and elimination. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;
function update(){const scores=app.querySelector('.podiums');if(!scores||app.querySelector('.ben-platform-v67'))return;
const stage=document.createElement('section');stage.className='ben-platform-v67';stage.setAttribute('aria-label','Ben Bilirim stüdyosu: solda dört yarışmacı kürsüsü, sağda Alper Ateş');
const sign=document.createElement('h2');sign.textContent='BEN BİLİRİM';stage.append(sign);
const team=document.createElement('div');team.className='ben-podiums-v67';
Array.from(scores.children).forEach((source,i)=>{const pod=document.createElement('div');pod.className='ben-podium-v67'+(source.classList.contains('active')?' ben-active-v67':'')+(source.classList.contains('out382')?' ben-out-v67':'');
const name=source.querySelector('small')?.textContent||'Yarışmacı';
const person=document.createElement('div');person.className='ben-person-v67';person.innerHTML=window.ArenaHumans435?.person({id:'ben-platform-'+i,name,player:i===0},i)||'';pod.append(person);
const screen=document.createElement('div');screen.className='ben-screen-v67';
const label=document.createElement('strong');label.textContent=name;const value=document.createElement('b');value.textContent=source.querySelector('strong')?.textContent||'0';const status=document.createElement('small');status.textContent=source.querySelector('span')?.textContent||'PUAN';screen.append(label,value,status);pod.append(screen);team.append(pod);});stage.append(team);
const host=document.createElement('div');host.className='ben-host-v67';host.innerHTML='<div class="ben-host-person-v67">'+(window.ArenaHumans435?.host()||'')+'</div><div class="ben-host-desk-v67"><strong>Alper Ateş</strong><small>SUNUCU</small></div>';stage.append(host);app.prepend(stage);
}new MutationObserver(update).observe(app,{childList:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
