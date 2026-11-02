/* Local studio presentation. Existing money controls own all actions. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;let signature='';const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function update(){const s=window.Double395Test?.state;let current=app.querySelector('.double-platform-v67');if(!s||!app.querySelector('.game-layout191')){if(current)current.remove();signature='';return}
const sig=JSON.stringify([s.name,s.partner,s.phase,s.cash,s.allocation,s.reveal191?.opened]);if(current&&sig===signature)return;signature=sig;
const stage=document.createElement('section');stage.className='double-platform-v67';stage.setAttribute('aria-label','Çifte Milyon stüdyosu: önde A B C D silindirleri, arkada çift ve para masası, sağda İlker Ayrık ve kasa');
const screen=document.createElement('h2');screen.textContent='2.000.000 TL';stage.append(screen);
for(const [role,name,i] of [['partner',s.partner,1],['player',s.name,0]]){const person=document.createElement('div');person.className='double-person-v67 '+role;person.innerHTML=(window.ArenaHumans435?.person({id:'double-platform-'+role,name,player:i===0},i)||'')+'<strong>'+esc(name)+'</strong>';stage.append(person)}
const money=document.createElement('div');money.className='double-money-v67';money.innerHTML='<span aria-hidden="true">₺ ▥ ▥ ▥ ₺</span><small>PARA MASASI</small>';stage.append(money);
const vault=document.createElement('div');vault.className='double-vault-v67';vault.innerHTML='<span aria-hidden="true">✣</span><strong>KASA</strong>';stage.append(vault);
const host=document.createElement('div');host.className='double-host-v67';host.innerHTML=(window.ArenaHumans435?.host()||'')+'<strong>İlker Ayrık</strong>';stage.append(host);
const tubes=document.createElement('div');tubes.className='double-tubes-v67';
for(let i=0;i<4;i++){const tube=document.createElement('div');tube.className='double-tube-v67'+(s.reveal191?.opened?.includes(i)?' double-open-v67':'');const amount=Number(s.allocation?.[i]||0)*50000;tube.innerHTML='<div class="double-glass-v67"><b>'+('ABCD'[i])+'</b><span>'+amount.toLocaleString('tr-TR')+' TL</span></div><div class="double-base-v67"></div>';tubes.append(tube)}stage.append(tubes);
if(current)current.replaceWith(stage);else app.prepend(stage);
}new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest?.('.double-platform-v67')))return;update()}).observe(app,{childList:true,subtree:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
