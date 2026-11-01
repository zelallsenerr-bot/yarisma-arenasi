/* Cevap Soruda only: reference-photo studio; no shared studio mutations. */
(()=>{'use strict';
function install(){
 const app=document.getElementById('app');if(!app)return;
 function update(){
  if(app.querySelector('.intro'))return;
  if(app.querySelector('[data-cevap-platform]'))return;
  const slot=document.createElement('figure');
  slot.className='cevap-platform-v67';slot.dataset.cevapPlatform='reference';
  slot.setAttribute('data-studio211-slot','cevap-soruda');
  const image=document.createElement('img');
  image.src='platform-reference.webp';image.width=1270;image.height=638;
  image.alt='Cevap Soruda stüdyosu: mavi ışıklı paneller, solda sunucu kürsüsü, sağda dört yarışmacı kürsüsü ve geniş orta platform.';
  image.decoding='async';image.draggable=false;
  slot.append(image);app.prepend(slot);
 }
 const observer=new MutationObserver(update);
 observer.observe(app,{childList:true});update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
