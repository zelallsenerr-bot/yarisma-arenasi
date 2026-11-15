/* Local home setting; host and household are shown seated, no game logic changes. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;let signature='';
function updateTrade(state, view) {
  if (state.phase !== 'play' || !view) return;
  if (state.mode === 'trade') {
    view.querySelectorAll('[id^="tradeCash"]').forEach(button => {
      if (button.textContent !== 'Nakit için riske et') {
        button.textContent = 'Nakit için riske et';
      }
    });
    return;
  }
  const trade = state.trade;
  const answers = view.querySelector('.answers400');
  if (!trade || !answers || view.querySelector('.door-trade-summary')) return;

  const summary = document.createElement('div');
  summary.className = 'door-trade-summary';
  const item = document.createElement('strong');
  item.textContent = 'Riskteki eşya: ' + trade.item;
  const terms = document.createElement('span');
  const reward = trade.type === 'cash'
    ? new Intl.NumberFormat('tr-TR').format(trade.offer) + ' sanal TL kasana eklenir.'
    : 'Eşyan yenisiyle değiştirilir.';
  terms.textContent = 'Doğru cevapta: ' + reward + ' Yanlış cevapta: Eşya elden gider.';
  summary.append(item, terms);
  answers.before(summary);
}

function update(){const s=window.Retro400CTest?.state;let current=app.querySelector('.door-home-v67');if(!s||app.querySelector('.hero400')){if(current)current.remove();signature='';return}updateTrade(s,app.querySelector('#view'));if(current&&signature===s.name)return;signature=s.name;
const stage=document.createElement('section');stage.className='door-home-v67';stage.setAttribute('aria-label','Şans Kapıda ev salonu: solda koltukta Yiğit Alıcı, sağdaki kanepede yarışmacı ve iki aile üyesi');const title=document.createElement('h2');title.textContent='ŞANS KAPIDA · EVİNİZE KONUK OLDUK';stage.append(title);
const art=document.createElement('div');art.className='door-wallart-v67';art.setAttribute('aria-hidden','true');stage.append(art);
const host=document.createElement('div');host.className='door-host-v67';host.innerHTML='<div class="door-armchair-v67"></div><div class="door-seated-body-v67"></div><div class="door-host-face-v67">'+(window.ArenaHumans435?.host()||'')+'</div><strong>Yiğit Alıcı</strong>';stage.append(host);
const sofa=document.createElement('div');sofa.className='door-sofa-v67';const names=[s.name||'Yarışmacı','Aile üyesi','Aile üyesi'];names.forEach((name,i)=>{const person=document.createElement('div');person.className='door-family-v67';const body=document.createElement('div');body.className='door-seated-body-v67';person.append(body);const face=document.createElement('div');face.className='door-family-face-v67';face.innerHTML=window.ArenaHumans435?.person({id:'door-household-'+i,name,player:i===0,gender:i?'female':undefined},i)||'';person.append(face);const label=document.createElement('strong');label.textContent=name;person.append(label);sofa.append(person)});stage.append(sofa);
const table=document.createElement('div');table.className='door-table-v67';table.innerHTML='<span class="door-vase-v67" aria-hidden="true"></span><span class="door-case-v67" aria-hidden="true"></span>';stage.append(table);
if(current)current.replaceWith(stage);else app.prepend(stage);
}new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest?.('.door-home-v67')))return;update()}).observe(app,{childList:true,subtree:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
