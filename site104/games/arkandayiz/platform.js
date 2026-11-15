/* Local Arkandayız studio; five-friend support group. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;let signature='';
function update(){const s=window.Retro400BTest?.state;let current=app.querySelector('.arka-scene589');if(!s||app.querySelector('.hero400')){if(current)current.remove();signature='';return}const sig=JSON.stringify([s.phase,s.step,s.multiplier,s.players.map(p=>[p.id,p.name]),s.opinions]);if(current&&sig===signature)return;signature=sig;
const scene=document.createElement('div');scene.className='arka-scene589';
const stage=document.createElement('section');scene.append(stage);stage.className='arka-platform-v67';stage.setAttribute('aria-label','Arkandayız stüdyosu: önde yarışmacı, arkasında ayakta duran arkadaşları ve ortak buton, iki yanda merdiven');const title=document.createElement('h2');title.textContent='ARKANDAYIZ';stage.append(title);
for(const side of ['left','right']){const steps=document.createElement('div');steps.className='arka-steps-v67 '+side;steps.setAttribute('aria-hidden','true');stage.append(steps)}
for(const side of ['left','right']){const crowd=document.createElement('div');crowd.className='arka-audience-v67 '+side;crowd.setAttribute('aria-hidden','true');stage.append(crowd)}
const friends=document.createElement('div');friends.className='arka-friends-v67 arka-support519';const group=document.createElement('img');group.src='support519.webp?v=519';group.alt='Beş arkadaş omuz omuza, ellerini ortak butona uzatarak yarışmacıyı destekliyor';friends.append(group);const names=document.createElement('div');names.className='arka-names519';s.players.slice(1,6).forEach((p,i)=>{
 const label=document.createElement('strong');label.textContent=p.name;
 if(['confidence','play'].includes(s.phase)&&s.opinions?.[i])label.classList.add('arka-advising589');
 names.append(label);
});stage.append(friends);stage.append(names);
const desk=document.createElement('div');desk.className='arka-desk-v67';desk.innerHTML='<span class="arka-team-button462" aria-label="Takım butonu"></span>';stage.append(desk);
const player=document.createElement('div');player.className='arka-player-v67';const p=s.players[0];player.innerHTML=window.ArenaHumans435?.person({id:p.id,name:p.name,player:true},0)||'';stage.append(player);
const host=document.createElement('div');host.className='arka-host-v67';host.innerHTML=window.ArenaHumans435?.host()||'';const name=document.createElement('strong');name.textContent='Ünal Yeter';host.append(name);stage.append(host);
if(s.phase==='play'&&s.opinions?.length){
 const question=window.Retro400B?.q(s);
 if(question){
  const notes=document.createElement('section');notes.className='arka-notes589';
  const heading=document.createElement('h3');heading.textContent=s.multiplier===2?'Takım desteği · İki kat':'Destekçilerin önerileri';notes.append(heading);
  const list=document.createElement('ul');
  s.players.slice(1,6).forEach((p,i)=>{
   const opinion=s.opinions[i];const option=question.options?.[opinion?.option];
   if(option===undefined)return;
   const item=document.createElement('li');const label=document.createElement('b');label.textContent=p.name;
   const detail=document.createElement('span');detail.textContent=option+' · %'+opinion.confidence+' güven';
   item.append(label,detail);list.append(item);
  });
  notes.append(list);scene.append(notes);
 }
}
if(current)current.replaceWith(scene);else app.prepend(scene);
}new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest?.('.arka-scene589')))return;update()}).observe(app,{childList:true,subtree:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();

