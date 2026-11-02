/* Local, live presentation derived from the existing roster. */
(()=>{'use strict';function install(){const app=document.getElementById('app');if(!app)return;
function build(){const roster=app.querySelector('.takip-team175');if(!roster||app.querySelector('.takip-platform-v67'))return;
const stage=document.createElement('section');stage.className='takip-platform-v67';stage.setAttribute('aria-label','Takip platformu: takım solda, Uraz Kaygılaroğlu ortada ayakta, takipçi sağda');
const title=document.createElement('h2');title.textContent='TAKİP';stage.append(title);
const team=document.createElement('div');team.className='platform-team-v67';
const members=Array.from(roster.children);for(const member of members){const pod=document.createElement('div');pod.className='platform-pod-v67'+(member.classList.contains('caught175')?' platform-caught-v67':'');const face=member.querySelector('.portrait35');if(face)pod.append(face.cloneNode(true));const name=document.createElement('strong');name.textContent=member.querySelector('b')?.textContent||'Yarışmacı';pod.append(name);team.append(pod)}stage.append(team);
const host=document.createElement('div');host.className='platform-host-v67';const pose=window.ArenaBodyPoses211?.['Uraz Kaygılaroğlu|standing']||window.ArenaBodyPoses211?.['Uraz Kaygılaroğlu'];const hostArt=pose?'<svg viewBox="'+pose.rect.join(' ')+'" role="img" aria-label="Uraz Kaygılaroğlu ayakta"><image href="../../'+pose.asset+'" width="'+pose.size[0]+'" height="'+pose.size[1]+'"/></svg>':(window.ArenaHumans435?.host()||'');host.innerHTML=hostArt+'<strong>Uraz Kaygılaroğlu</strong><small>SUNUCU</small>';stage.append(host);
const hunter=document.createElement('div');hunter.className='platform-hunter-v67';hunter.innerHTML='<svg viewBox="950 270 310 330" role="img" aria-label="Takipçi Muhsin Divan"><image href="platform-reference.webp" width="1265" height="612"/></svg><strong>Muhsin Divan</strong><small>TAKİPÇİ</small>';stage.append(hunter);
app.prepend(stage);
}new MutationObserver(build).observe(app,{childList:true});build();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();})();
