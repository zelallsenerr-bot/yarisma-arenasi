/* Local Arkandayız studio; five-friend support group. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;let signature='';
function update(){const s=window.Retro400BTest?.state;let current=app.querySelector('.arka-platform-v67');if(!s||app.querySelector('.hero400')){if(current)current.remove();signature='';return}const sig=JSON.stringify(s.players.map(p=>[p.id,p.name]));if(current&&sig===signature)return;signature=sig;
const stage=document.createElement('section');stage.className='arka-platform-v67';stage.setAttribute('aria-label','Arkandayız stüdyosu: önde yarışmacı, arkasında ayakta duran arkadaşları ve ortak buton, iki yanda merdiven');const title=document.createElement('h2');title.textContent='ARKANDAYIZ';stage.append(title);
for(const side of ['left','right']){const steps=document.createElement('div');steps.className='arka-steps-v67 '+side;steps.setAttribute('aria-hidden','true');stage.append(steps)}
for(const side of ['left','right']){const crowd=document.createElement('div');crowd.className='arka-audience-v67 '+side;crowd.setAttribute('aria-hidden','true');stage.append(crowd)}
const friends=document.createElement('div');friends.className='arka-friends-v67 arka-support519';const group=document.createElement('img');group.src='support519.webp?v=519';group.alt='Beş arkadaş omuz omuza, ellerini ortak butona uzatarak yarışmacıyı destekliyor';friends.append(group);const names=document.createElement('div');names.className='arka-names519';s.players.slice(1,6).forEach(p=>{const label=document.createElement('strong');label.textContent=p.name;names.append(label)});stage.append(friends);stage.append(names);
const desk=document.createElement('div');desk.className='arka-desk-v67';desk.innerHTML='<span class="arka-team-button462" aria-label="Takım butonu"></span>';stage.append(desk);
const player=document.createElement('div');player.className='arka-player-v67';const p=s.players[0];player.innerHTML=window.ArenaHumans435?.person({id:p.id,name:p.name,player:true},0)||'';stage.append(player);
const host=document.createElement('div');host.className='arka-host-v67';host.innerHTML=window.ArenaHumans435?.host()||'';const name=document.createElement('strong');name.textContent='Ünal Yeter';host.append(name);stage.append(host);
if(current)current.replaceWith(stage);else app.prepend(stage);
}new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest?.('.arka-platform-v67')))return;update()}).observe(app,{childList:true,subtree:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();

