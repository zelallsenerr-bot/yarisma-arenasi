/* Furniture-aware stage blocking. Decorative only; game state and events remain owned by each game. */
(()=>{'use strict';
const game=document.body?.dataset.game||location.pathname.split('/games/')[1]?.split('/')[0];
const map={
 'ada-mucadelesi':[['.sv-volunteers .sv-person','right','standing'],['.sv-celebrities .sv-person','left','standing'],['.sv-host','front','standing']],
 'altin-sofra':[['.gm-station','front','standing'],['.gm-host','right','standing'],['.gm-mother','left','seated']],
 'altmis-saniye':[['.mn-host','right','standing'],['.mn-player','left','standing']],
 'anlasma':[['.person-0','right','standing'],['.person-1','front','standing'],['.person-2','left','standing']],
 'arkandayiz':[['.arka-friend-v67','front','standing'],['.arka-player-v67','left','standing'],['.arka-host-v67','right','standing']],
 'bak-su-duvara':[['.bw-person','right','standing'],['.bw-host','left','standing']],
 'ben-bilirim':[['.ben-person-v67','right','standing'],['.ben-host-person-v67','left','standing']],
 'beyazla-joker':[['.scene-person435-0','left','seated'],['.scene-person435-1','right','seated']],
 'cember':[['.cr-person-0,.cr-person-1','right','standing'],['.cr-person-2,.cr-person-4','left','standing'],['.cr-person-3','back','standing']],
 'cevap-sende':[['.cs-host-v67','right','standing'],['.cs-player-v67','left','standing']],
 'cevap-soruda':[['.scene-person435-0','right','standing'],['.scene-person435:not(.scene-person435-0)','left','standing']],
 'cifte-milyon':[['.double-person-v67','right','standing'],['.double-host-v67','left','standing']],
 'donen-koltuklar':[['.vs-actor','front','standing']],
 'elli-sarisin':[['.fifty-pod-v67','left','standing'],['.fifty-host-v67','right','standing'],['.fifty-player-v67','left','standing']],
 'esim-yapar':[['.eb-person','right','seated'],['.eb-host','left','standing']],
 'evim-sahane':[['.ev-worker','front','standing'],['.ev-host','right','standing']],
 'eyvah-dusuyorum':[['.ring-host-v67','left','standing']],
 'gel-hemserim':[['.scene-person435-0','left','standing'],['.scene-person435-1','right','standing']],
 'gonder-gitsin':[['.gonder-host-v67','right','standing'],['.gonder-player-v67,.gonder-rival435','left','standing']],
 'goz6':[['.gz-girls .gz-person','right','seated'],['.gz-boys .gz-person','left','seated']],
 'halka-mucadelesi':[['.halka-podium-v67','front','standing'],['.halka-host-v67','back','standing']],
 'hepsi-benim':[['.hb-person','left','standing'],['.hb-host','right','standing']],
 'herkes-kazanir':[['.everyone-chair-v67','front','seated'],['.everyone-host-v67','back','standing']],
 'ilk-bulusma':[['.lm-player','right','seated'],['.lm-guest','left','seated'],['.control-host435','left','seated']],
 'kapis-kapis':[['.kp-person','left','standing'],['.kp-host','right','standing']],
 'kelime-islem':[['.mind-pod-v67','right','seated'],['.mind-host-v67','left','seated'],['.mind-experts-v67>div','left','seated']],
 'kelime-meydani':[['.word-host-v67','right','standing'],['.word-player-v67','left','seated'],['.word-waiter-v67','left','seated']],
 'kizlar-ve-anneleri':[['.ka-person','right','standing'],['.ka-presenter','left','standing']],
 'kizma-kazan':[['.scene-person435-0','left','seated']],
 'kumbara':[['.kumbara-host-v67','right','seated'],['.kumbara-player-v67','left','seated']],
 'milyonluk-resim':[['.picture-player-v67','right','seated'],['.picture-host-v67','left','seated']],
 'on-dokuz':[['.nineteen-podium-v67','front','standing'],['.nineteen-host-v67','back','standing']],
 'para-bende':[['.scene-person435-0','right','standing'],['.scene-person435-1','left','standing']],
 'para-odasi':[['.room-podium-v67','right','standing'],['.room-host-v67','left','standing']],
 'password':[['.pw-person-0,.pw-person-3','right','seated'],['.pw-person-1,.pw-person-4','left','seated'],['.pw-person-2','front','standing']],
 'piramit':[['.py-person-0','right','seated'],['.py-person-1','left','seated'],['.py-host','front','standing']],
 'sahane-pazar':[['.sp-player','right','standing'],['.sp-host','left','standing']],
 'sans-kapida':[['.door-host-v67','right','seated'],['.door-family-v67','left','seated']],
 'sansli-masa':[['.lm-player','right','seated'],['.lm-guest','left','seated'],['.control-host435','left','seated']],
 'sebeke':[['.sbk-person-0,.sbk-person-1','right','seated'],['.sbk-person-2,.sbk-person-3','left','seated']],
 'sefler-arenasi':[['.mc-station','front','standing'],['.judge435','front','standing']],
 'sofra-rekabeti':[['.yd-seat-0,.yd-seat-1','front','seated'],['.yd-seat-2,.yd-seat-3','right','seated'],['.yd-seat-4,.yd-seat-5','left','seated']],
 'super-bulmaca':[['.sb-host','right','standing'],['.sb-seat','left','standing']],
 'takip':[['.platform-pod-v67','right','seated'],['.platform-host-v67','left','standing'],['.platform-hunter-v67','left','seated']],
 'telefon-kulubesi':[],
 'temizlik-benim-isim':[['.yd-seat-0,.yd-seat-2,.yd-seat-3','right','seated'],['.yd-seat-1,.yd-seat-4,.yd-seat-5','left','seated']],
 'the-taste-turkiye':[['.tt-station','front','standing'],['.taste-judge435','left','standing']],
 'turnike':[['.tk-blue .tk-person','right','standing'],['.tk-orange .tk-person','left','standing'],['.tk-panel','front','standing'],['.tk-host','front','standing']],
 'ucte-uc':[['.ucte-player-v67','right','seated'],['.ucte-host-v67','left','standing'],['.ucte-expert-v67','left','seated']],
 'utopya':[['.ut-person-0,.ut-person-1,.ut-person-2,.ut-person-3,.ut-person-4','front','seated'],['.ut-person-5,.ut-person-6,.ut-person-7,.ut-person-8,.ut-person-9','right','seated'],['.ut-person-10,.ut-person-11,.ut-person-12,.ut-person-13,.ut-person-14','left','seated']],
 'yaparsin-askim':[['.eb-person','right','seated'],['.eb-host','left','standing']],
 'yasim-kac':[['.ag-host','right','standing'],['.ag-guest','left','standing']],
 'yetenek-sahnesi':[['.yt-performer','front','standing']],
 'harf-cemberi':[['.passa-player-v67','right','standing'],['.passa-host-v67','left','standing']]
};
/* v438: only groups are varied. Hosts, two-person conversations and moving performers keep their action-specific blocking. */
const groups438={"ada-mucadelesi":".sv-person","altin-sofra":".gm-station","anlasma":".deal-person-v67","arkandayiz":".arka-friend-v67","bak-su-duvara":".bw-person","ben-bilirim":".ben-person-v67","cember":".cr-person:not(.cr-person-3)","cevap-soruda":".scene-person435:not(.scene-person435-0)","esim-yapar":".eb-person","evim-sahane":".ev-worker","goz6":".gz-person","halka-mucadelesi":".halka-podium-v67","hepsi-benim":".hb-person","herkes-kazanir":".everyone-chair-v67","kapis-kapis":".kp-person","kelime-meydani":".word-waiter-v67","kizlar-ve-anneleri":".ka-person","on-dokuz":".nineteen-podium-v67:not(.nineteen-main-v67)","para-odasi":".room-podium-v67","password":".pw-person:not(.pw-person-2)","piramit":".py-person","sans-kapida":".door-family-v67","sebeke":".sbk-person","sefler-arenasi":".mc-station","sofra-rekabeti":".yd-seat:not(.yd-seat-1)","super-bulmaca":".sb-seat","takip":".platform-pod-v67","the-taste-turkiye":".tt-station","turnike":".tk-person,.tk-panel","utopya":".ut-person","yaparsin-askim":".eb-person"};
const decorativeAudiences438={'altmis-saniye':'.mn-audience','arkandayiz':'.arka-audience-v67','cevap-sende':'.cs-audience-v67','kapis-kapis':'.kp-audience'};
function varyGroup438(stage){
 const selector=groups438[game];if(!selector)return;
 const boxes=Array.from(new Set(Array.from(stage.querySelectorAll(selector)).flatMap(parent=>{if(parent.classList.contains('actor-slot435'))return[parent];return Array.from(parent.querySelectorAll('.actor-slot435')).map(box=>{if(parent.dataset.pose437)box.dataset.pose437=parent.dataset.pose437;if(parent.dataset.facing437)box.dataset.facing437=parent.dataset.facing437;return box;});}))).filter(box=>!box.classList.contains('host-slot435')&&!box.matches('.eliminated366,.back-facing435'));
 if(boxes.length<3){boxes.forEach(box=>{delete box.dataset.group438;delete box.dataset.groupIndex438;delete box.dataset.style438;});return;}
 boxes.forEach((box,i)=>{const preferred=box.dataset.facing437||'front',direction=window.ArenaGroup438?.direction(game,i,preferred)||(['front',preferred,'front',preferred==='left'?'right':'left','front',preferred][i%6]),style=window.ArenaGroup438?.style(game,i)||(i%3?'relaxed':'conversation');box.dataset.group438='true';box.dataset.groupIndex438=String(i);box.dataset.facing437=direction;box.dataset.style438=style;});
}
window.ArenaDomGroups438=groups438;
function overlay(parent,src,clip,cls){if(parent.querySelector('.'+cls))return;const image=document.createElement('img');image.src=src;image.alt='';image.setAttribute('aria-hidden','true');image.className='furniture437 '+cls;image.style.clipPath=clip;parent.append(image)}
function decorate(stage){
 stage.classList.add('blocking437');
 const extraCrowd=decorativeAudiences438[game];if(extraCrowd)stage.querySelectorAll(extraCrowd).forEach(el=>el.remove());
 for(const [selector,facing,pose] of map[game]||[])stage.querySelectorAll(selector).forEach(box=>{if(box.dataset.facing437!==facing)box.dataset.facing437=facing;const actualPose=game==='cember'&&box.dataset.rest496==='true'?'seated':pose;if(box.dataset.pose437!==actualPose)box.dataset.pose437=actualPose});
 if(game==='cevap-soruda'){
  const polys=['polygon(11.7% 46%,23.3% 46%,23.6% 66.6%,26.9% 69.5%,26.9% 72.5%,20.8% 78%,7.3% 74%,7.3% 71.1%,14.6% 66.3%)','polygon(56.8% 41.8%,65% 42.8%,65.2% 61.7%,61% 66.3%,54.3% 62.8%,54.3% 59.7%,57% 58%)','polygon(62.3% 43.1%,71.2% 44.4%,71.3% 65.7%,65.1% 71.5%,58.3% 67%,58.3% 64.4%,62.1% 62.8%)','polygon(68% 44%,79.8% 45.5%,80% 72%,72.5% 78.6%,64% 73.2%,64% 70%,67.8% 67.4%)','polygon(76% 46%,91.8% 47.7%,91.8% 78.6%,97% 80%,97% 84.7%,85.6% 88.2%,70.6% 81.4%,70.6% 77.8%,75.5% 74.8%)'];
  polys.forEach((p,i)=>overlay(stage,'../../humans435/setcevap-soruda.webp',p,'cevap-desk437-'+i));
 }
 if(game==='sansli-masa'||game==='ilk-bulusma'){
  const room=stage.querySelector('.lm-control');if(room){
   const task=room.querySelector('.lm-task');if(task){task.classList.add('control-task437');stage.append(task)}
   const src='../../humans435/set'+game+'.webp';
   overlay(room,src,'polygon(11% 48%,67% 48%,68% 51%,66.5% 54%,66.5% 84.5%,59% 86%,12% 82%)','control-desk437');
   overlay(room,src,'polygon(17% 23%,25% 23%,25% 47%,26% 49%,24% 52%,17% 51%)','control-monitor437');
   overlay(room,src,'polygon(25% 43%,34% 32%,36% 33%,28% 45%,29% 49%,25% 49%)','control-microphone437-a');
   overlay(room,src,'polygon(39% 45%,49% 38%,51% 38%,50% 40%,42% 47%,42% 51%,39% 51%)','control-microphone437-b');
  }
 }
 if(game==='kizma-kazan'){const room=stage.querySelector('.kk-reference');if(room)overlay(room,'../../humans435/setkizma-kazan.webp','polygon(8% 60%,31% 59%,31% 56.5%,36% 56.5%,36% 59%,87% 60%,90% 63%,90% 69%,79% 71%,79% 95%,17% 95%,17% 72%,8% 69%)','kizma-desk437');}
 if(game==='takip'&&!stage.querySelector('.team-desk437')){const desk=document.createElement('div');desk.className='team-desk437';desk.setAttribute('aria-hidden','true');stage.append(desk)}
 if(game==='halka-mucadelesi')stage.querySelectorAll('.halka-podium-v67').forEach(box=>{const x=parseFloat(box.style.left);box.dataset.facing437=x<42?'right':x>58?'left':'front'});
 if(game==='on-dokuz')stage.querySelectorAll('.nineteen-podium-v67').forEach(box=>{const x=parseFloat(box.style.left);box.dataset.facing437=x<42?'right':x>58?'left':'front'});
 varyGroup438(stage);
}
function nameLabels505(stage){const slots=[...stage.querySelectorAll('.actor-slot435')],heads=slots.map(slot=>{const r=slot.querySelector('svg.human435')?.getBoundingClientRect();return r&&r.height?{left:r.left+r.width*.2,right:r.right-r.width*.2,top:r.top,bottom:r.top+r.height*.24}:null}).filter(Boolean),overlap=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top,frame=stage.getBoundingClientRect();slots.forEach(slot=>{const label=slot.querySelector(':scope>strong,:scope>.yd-name'),art=slot.querySelector('svg.human435');if(!label||!art||label.dataset.readable505)return;const r=label.getBoundingClientRect(),body=art.getBoundingClientRect(),box=slot.getBoundingClientRect();if(!r.width||!r.height||!box.height||!heads.some(h=>overlap(r,h)))return;const candidates=[body.bottom+4,body.top-r.height-5];const top=candidates.find(y=>y>=frame.top+3&&y+r.height<=frame.bottom-3&&!heads.some(h=>overlap({left:box.left,right:box.right,top:y,bottom:y+r.height},h)));if(top===undefined)return;label.dataset.readable505='true';Object.assign(label.style,{position:'absolute',top:((top-box.top)/box.height*100)+'%',bottom:'auto',left:'0',right:'0',width:'100%',boxSizing:'border-box',zIndex:'30'});});}
let queued=false;function scan(){queued=false;for(const stage of document.querySelectorAll('.stage435')){decorate(stage);window.ArenaOrient437?.(stage);requestAnimationFrame(()=>nameLabels505(stage))}}
const root=document.getElementById('app')||document.body;new MutationObserver(records=>{if(records.every(r=>r.target?.closest?.('.furniture437')))return;if(!queued){queued=true;queueMicrotask(scan)}}).observe(root,{childList:true,subtree:true});scan();
})();
