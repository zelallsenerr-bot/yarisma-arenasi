/* Gönder Gitsin local visual stage. Original answer buttons remain authoritative. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;let signature='';
function update(){const state=window.Gonder194Test?.state;let current=app.querySelector('.gonder-platform-v67');if(!state||app.querySelector('.g-hero')){if(current)current.remove();signature='';return}
const photos=Array.from(app.querySelectorAll('.g-options .g-photo'));
const sig=JSON.stringify([state.name,state.phase,state.round,state.hidden,state.attempts,photos.map(p=>p.innerHTML)]);if(current&&sig===signature)return;signature=sig;
const stage=document.createElement('section');stage.className='gonder-platform-v67';stage.setAttribute('aria-label','Gönder Gitsin stüdyosu: dört yuvarlak ekran, kırmızı siyah panel, beyaz kırmızı masa, Timur Acar, yarışmacı ve takım arkadaşı');
const title=document.createElement('h2');title.textContent='GÖNDER GİTSİN';stage.append(title);
const screens=document.createElement('div');screens.className='gonder-screens-v67';for(let i=0;i<4;i++){const screen=document.createElement('div');screen.className='gonder-screen-v67';screen.setAttribute('aria-hidden','true');if(photos[i])screen.append(photos[i].cloneNode(true));else screen.innerHTML='<span class="gonder-target-v67"></span>';screens.append(screen)}stage.append(screens);
for(const side of ['left','right']){const lights=document.createElement('div');lights.className='gonder-lights-v67 '+side;lights.setAttribute('aria-hidden','true');stage.append(lights)}
const host=document.createElement('div');host.className='gonder-host-v67';host.innerHTML=window.ArenaHumans435?.host()||'';const hostName=document.createElement('strong');hostName.textContent='Timur Acar';host.append(hostName);stage.append(host);
const player=document.createElement('div');player.className='gonder-player-v67';const name=state.name||'Yarışmacı';player.innerHTML=window.ArenaHumans435?.person({id:'gonder-platform-player',name,player:true},0)||'';const label=document.createElement('strong');label.textContent=name;player.append(label);stage.append(player);
const desk=document.createElement('div');desk.className='gonder-desk-v67';desk.innerHTML='<span>GÖNDER GİTSİN</span>';stage.append(desk);
if(current)current.replaceWith(stage);else app.prepend(stage);
}new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest?.('.gonder-platform-v67')))return;update()}).observe(app,{childList:true,subtree:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
