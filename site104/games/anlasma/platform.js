/* Anlaşma local stage; original consensus and sharing controls are preserved. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;let signature='';
function guideDeal(state, view) {
  if (!view || view.querySelector('.deal-guide')) return;
  const lock = view.querySelector('#consensus');
  const firstOffer = view.querySelector('#offer0');
  let message;
  if (state.phase === 'consensus' && lock) {
    if (state.chosen === null || state.chosen < 0) {
      message = 'Bir cevap seç. Üç oyun da aynı olduğunda ortak yanıtı kilitleyebilirsin.';
    } else if (state.ballots.every(ballot => ballot === state.chosen)) {
      message = 'Üç oy aynı. Ortak yanıtı kilitleyebilirsin.';
    } else {
      message = 'Oylar farklı. “Arkadaşınla konuş” düğmesi bir oyu değiştirir ve 3 saniyeye mal olur.';
    }
  } else if (state.phase === 'negotiate' && firstOffer) {
    const [first, second] = state.claims;
    if (first === second) {
      message = first === 2
        ? 'İki yarışmacı da küçük payı istiyor. Bu durumda kabul edilecek bir dağılım yok.'
        : 'İki yarışmacı aynı payı istiyor. Birini ikna ederek isteklerini ayırabilirsin. İkna 4 saniye sürer.';
    } else {
      const remaining = 3 - first - second;
      // Offers list all permutations in ascending order, with the player's share first.
      const offerIndex = remaining * 2 + Number(first > second);
      const offer = view.querySelector('#offer' + offerIndex);
      if (offer) {
        offer.classList.add('deal-compatible-offer');
        const label = document.createElement('small');
        label.textContent = 'İsteklere uygun teklif';
        offer.append(label);
      }
      message = 'İsteklere uygun teklif işaretlendi. Süre ilerledikçe kasa küçülür.';
    }
  }
  if (!message) return;
  const guide = document.createElement('p');
  guide.className = 'deal-guide';
  guide.textContent = message;
  if (firstOffer) firstOffer.parentElement.before(guide);
  else lock.parentElement.before(guide);
}

function update(){const s=window.Retro400BTest?.state;let current=app.querySelector('.deal-platform-v67');if(!s||app.querySelector('.hero400')){if(current)current.remove();signature='';return}guideDeal(s,app.querySelector('#view'));const sig=JSON.stringify(s.players.map(p=>p.name));if(current&&sig===signature)return;signature=sig;
const stage=document.createElement('section');stage.className='deal-platform-v67';stage.setAttribute('aria-label','Anlaşma stüdyosu: üç yarışmacı ortak yeşil ışıklı masa çevresinde');const title=document.createElement('h2');title.textContent='ANLAŞMA';stage.append(title);
const people=document.createElement('div');people.className='deal-people-v67';s.players.forEach((p,i)=>{const person=document.createElement('div');person.className='deal-person-v67 person-'+i;person.innerHTML=window.ArenaHumans435?.person({id:p.id,name:p.name,player:i===0,gender:i%2?'female':'male'},i)||'';const label=document.createElement('strong');label.textContent=p.name;person.append(label);people.append(person)});stage.append(people);
const desk=document.createElement('div');desk.className='deal-desk-v67';const button=document.createElement('div');button.className='deal-button-v67';button.setAttribute('aria-hidden','true');desk.append(button);const panels=document.createElement('div');panels.className='deal-panels-v67';s.players.forEach(p=>{const panel=document.createElement('div');const name=document.createElement('strong');name.textContent=p.name;const symbol=document.createElement('span');symbol.textContent='ANLAŞMA';panel.append(name,symbol);panels.append(panel)});desk.append(panels);stage.append(desk);
if(current)current.replaceWith(stage);else app.prepend(stage);
}new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest?.('.deal-platform-v67')))return;update()}).observe(app,{childList:true,subtree:true});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
