/* Local 3’te 3 presentation; game mechanics remain in the existing engine. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;
function update(){if(app.querySelector('.hero')||!app.children.length||app.querySelector('.ucte-platform-v67'))return;
const stage=document.createElement('section');stage.className='ucte-platform-v67';stage.setAttribute('aria-label','3’te 3 platformu: solda yarışmacı ve Pelin Çift, sağda yüksek masada Tufan Gündüz');
const screen=document.createElement('h2');screen.className='ucte-sign-v67';screen.textContent='3’TE 3';stage.append(screen);
const player=document.createElement('div');player.className='ucte-player-v67';const profile=window.ArenaProfile338?.get?.()||{};
player.innerHTML=window.ArenaHumans435?.person({id:'ucte-platform-player',name:profile.name||'Sen',player:true,gender:profile.gender||'male'},0)||'';stage.append(player);
const desk=document.createElement('div');desk.className='ucte-player-desk-v67';desk.innerHTML='<span>3’TE 3</span>';stage.append(desk);
const host=document.createElement('div');host.className='ucte-host-v67';host.innerHTML=(window.ArenaHumans435?.host()||'')+'<span class="ucte-host-label451"><strong>Pelin Çift</strong><small>Sunucu</small></span>';stage.append(host);
const expert=document.createElement('div');expert.className='ucte-expert-v67';expert.innerHTML='<div class="ucte-books-v67" aria-hidden="true"></div><svg viewBox="890 150 150 160" role="img" aria-label="Prof. Dr. Tufan Gündüz"><image href="platform-reference.webp" width="1053" height="536"/></svg><div class="ucte-expert-desk-v67"><strong>Tufan Gündüz</strong><small>DANIŞMAN</small></div>';stage.append(expert);app.prepend(stage);
}new MutationObserver(update).observe(app,{childList:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
