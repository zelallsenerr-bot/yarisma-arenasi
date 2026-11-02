/* Local Kumbara studio, independent of shared stage code. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;
function update(){if(app.querySelector('.hero')||!app.children.length||app.querySelector('.kumbara-platform-v67'))return;
const stage=document.createElement('section');stage.className='kumbara-platform-v67';stage.setAttribute('aria-label','Kumbara stüdyosu: beyaz oval masa, solda Ali İhsan Varol, sağda yarışmacı');
const sign=document.createElement('div');sign.className='kumbara-sign-v67';sign.innerHTML='<small>ALİ İHSAN VAROL İLE</small><h2>KUMBARA</h2>';stage.append(sign);
const host=document.createElement('div');host.className='kumbara-host-v67';host.innerHTML=(window.ArenaHumans435?.host()||'')+'<strong>Ali İhsan Varol</strong>';stage.append(host);
const player=document.createElement('div');player.className='kumbara-player-v67';const name=window.KumbaraTest?.state?.name||window.ArenaProfile338?.get?.()?.name||'Yarışmacı';player.innerHTML=window.ArenaHumans435?.person({id:'kumbara-platform-player',name,player:true},0)||'';const label=document.createElement('strong');label.textContent=name;player.append(label);stage.append(player);
for(const side of ['left','right']){const chair=document.createElement('div');chair.className='kumbara-chair-v67 '+side;chair.setAttribute('aria-hidden','true');stage.append(chair)}
const table=document.createElement('div');table.className='kumbara-table-v67';table.innerHTML='<div class="kumbara-tabletop-v67"><span class="kumbara-laptop-v67" aria-hidden="true"></span><span class="kumbara-cup-v67" aria-hidden="true"></span></div><div class="kumbara-base-v67"></div>';stage.append(table);app.prepend(stage);
}new MutationObserver(update).observe(app,{childList:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
