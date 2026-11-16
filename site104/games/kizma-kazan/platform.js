/* Static user-supplied control-room reference with live public game labels. */
(()=>{'use strict';function install(){const app=document.getElementById('app');let signature='';function positionStress(view) {
  const meter = view?.querySelector('#stressBar');
  const label = view?.querySelector('#stress')?.parentElement;
  const scene = view?.querySelector('.prank-scene508');
  if (!meter || !label || !scene || meter.parentElement.classList.contains('kk-stress')) return;
  const status = document.createElement('div');
  status.className = 'kk-stress';
  meter.setAttribute('aria-label', 'Stres seviyesi');
  scene.before(status);
  status.append(label, meter);
}
function update(){const s=window.Retro400CTest?.state;positionStress(app.querySelector('#view'));const name=s?.name||document.getElementById('name')?.value||'Yarışmacı';const sig=JSON.stringify([name,s?.round,s?.phase]);let current=app.querySelector('.kizma-platform-v67');if(current&&signature===sig)return;signature=sig;const stage=document.createElement('section');stage.className='kizma-platform-v67';stage.setAttribute('aria-label','Kızma Kazan kontrol odası: masada Öner Erkan, arkada monitörler ve sağ üst ekranda şaka sahnesi');stage.innerHTML='<h2>KIZMA KAZAN</h2><div class="kk-reference"><img src="platform-control-room.webp" alt="Öner Erkan kontrol odasında masada oturuyor; sağ üst monitörde programdan şaka sahnesi"><strong>Öner Erkan · Sunucu</strong></div><div class="kk-status"></div>';const label=document.createElement('span');label.textContent=name;const phase=document.createElement('span');phase.textContent=s?'ETAP '+Math.min(5,s.round+1)+' / 5':'KONTROL ODASI';const note=document.createElement('small');note.textContent='Referans kare · Görseldeki monitör yayını statiktir';stage.querySelector('.kk-status').append(label,phase,note);if(current)current.replaceWith(stage);else app.prepend(stage)}new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest?.('.kizma-platform-v67')))return;update()}).observe(app,{subtree:true,childList:true});app.addEventListener('input',e=>{if(e.target.id==='name')update()});update()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install()})();
