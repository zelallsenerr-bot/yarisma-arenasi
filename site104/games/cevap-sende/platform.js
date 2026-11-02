/* Cevap Sende local studio. Existing answers, teams and fall scene remain intact. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;let signature='';const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function update(){const s=window.Cevap201Test?.state;let current=app.querySelector('.cs-platform-v67');if(!s||app.querySelector('.hero201')){if(current)current.remove();signature='';return}
const q=['question','locked','reveal'].includes(s.phase)?window.Cevap201.q(s):null,team=s.teams[s.turn],m=team.members[team.active];const sig=JSON.stringify([s.phase,s.turn,team.active,q?.text,q?.options]);if(current&&sig===signature)return;signature=sig;
const stage=document.createElement('section');stage.className='cs-platform-v67';stage.setAttribute('aria-label','Cevap Sende stüdyosu: lacivert arka ekran ve oval ışıklı sahnede Anıl İlter ile aktif yarışmacı');
const screen=document.createElement('div');screen.className='cs-screen-v67';const heading=document.createElement('h2');heading.textContent='CEVAP SENDE';screen.append(heading);stage.append(screen);
const host=document.createElement('div');host.className='cs-host-v67';host.innerHTML=(window.ArenaHumans435?.host()||'')+'<strong>Anıl İlter</strong>';stage.append(host);
const player=document.createElement('div');player.className='cs-player-v67';player.innerHTML=window.ArenaHumans435?.person({id:'cs201-'+(s.turn*4+team.active),name:m.name,visual37:m.visual37,player:s.turn===0&&team.active===0},team.active)||'';const label=document.createElement('strong');label.textContent=m.name;player.append(label);stage.append(player);
if(current)current.replaceWith(stage);else app.prepend(stage);
}new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest?.('.cs-platform-v67')))return;update()}).observe(app,{childList:true,subtree:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
