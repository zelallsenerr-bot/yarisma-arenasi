(() => {
 'use strict'; if(window.ArenaMetrics)return;
 const c=window.ARENA_METRICS_CONFIG||{},K='arena-metrics-consent-v1',V='arena-metrics-visitor-v1',S='arena-metrics-session-v1',X='arena-metrics-exclude-v1';
 const read=(k,session=false)=>{try{return (session?sessionStorage:localStorage).getItem(k)}catch(_){return null}};
 const save=(k,v,session=false)=>{try{(session?sessionStorage:localStorage).setItem(k,v)}catch(_){}};
 const remove=k=>{try{localStorage.removeItem(k)}catch(_){}};
 const uuid=()=>crypto.randomUUID();
 const configured=c.collectionEnabled===true&&/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(c.supabaseUrl||'')&&/^(sb_publishable_|eyJ)/.test(c.publishableKey||'');
 const isWebView=/;\s*wv\)|\bVersion\/\d.*Chrome\/.*Mobile Safari\//i.test(navigator.userAgent||'');
 const blocked=()=>!['yarismaatolyesi.com','www.yarismaatolyesi.com'].includes(location.hostname)||read(X)==='yes'||navigator.doNotTrack==='1'||navigator.globalPrivacyControl===true||(isWebView&&!c.collectInWebView);
 let choice=read(K),enabled=false,current=null,activeSince=null,elapsed=0,visitor,session,panel;
 function identities(){
  const now=Date.now(); let v,s;
  try{v=JSON.parse(read(V)||'null');s=JSON.parse(read(S,true)||'null')}catch(_){}
  if(!v||!/^[0-9a-f-]{36}$/.test(v.id)||now-v.at>90*86400000)v={id:uuid(),at:now};
  if(!s||!/^[0-9a-f-]{36}$/.test(s.id)||now-s.at>30*60000)s={id:uuid(),at:now};
  s.at=now;visitor=v.id;session=s.id;save(V,JSON.stringify(v));save(S,JSON.stringify(s),true);
 }
 function emit(kind,game=null,seconds=0){
  if(!enabled||blocked())return;
  identities();
  const headers={'Content-Type':'application/json',apikey:c.publishableKey};
  if(c.publishableKey.startsWith('eyJ'))headers.Authorization='Bearer '+c.publishableKey;
  const body={p_event_id:uuid(),p_visitor_id:visitor,p_session_id:session,p_kind:kind,p_game_id:game?.id||null,p_seconds:seconds};
  fetch(c.supabaseUrl+'/rest/v1/rpc/arena_record_event',{method:'POST',headers,body:JSON.stringify(body),mode:'cors',credentials:'omit',referrerPolicy:'origin',keepalive:true,cache:'no-store'}).catch(()=>{});
  save(S,JSON.stringify({id:session,at:Date.now()}),true);
 }
 function tick(){const now=performance.now();if(activeSince!==null)elapsed+=Math.max(0,now-activeSince);activeSince=enabled&&current&&!document.hidden?now:null}
 function flush(){tick();const seconds=Math.min(60,Math.floor(elapsed/1000));if(seconds&&current)emit('game_engagement',current,seconds);elapsed=0}
 function gameLoaded(candidate){const game=(window.ARENA_GAMES||[]).find(g=>g.id===candidate?.id);if(!game||current?.id===game.id)return;flush();current=game;activeSince=enabled&&!document.hidden?performance.now():null;emit('game_open',game)}
 function leave(){flush();current=null;activeSince=null}
 function enable(){if(!configured||blocked()||choice!=='yes'||enabled)return;identities();enabled=true;emit('site_visit');if(current)emit('game_open',current);elapsed=0;activeSince=current&&!document.hidden?performance.now():null}
 function consent(value){if(!['yes','no'].includes(value))return;choice=value;save(K,value);if(panel)panel.hidden=true;if(value==='yes')enable();else{enabled=false;activeSince=null;elapsed=0;remove(V);try{sessionStorage.removeItem(S)}catch(_){}}}
 function preferences(){
  if(!configured||blocked())return;
  if(!panel){
   const style=document.createElement('style');style.textContent='#arenaMetricsConsent{position:fixed;left:16px;right:16px;bottom:88px;max-width:560px;margin:auto;padding:22px;background:#19112f;color:#fff;border:1px solid #c7a65e;border-radius:18px;z-index:100000;box-shadow:0 8px 50px #000a;font:16px/1.5 system-ui}#arenaMetricsConsent[hidden]{display:none}#arenaMetricsConsent p{margin:8px 0 14px}#arenaMetricsConsent a{color:#f1cc78}#arenaMetricsConsent button{margin:8px 8px 0 0;padding:11px 18px;background:#35224c;color:white;border:1px solid #c7a65e;border-radius:9px;font:inherit;cursor:pointer}';document.head.appendChild(style);
   panel=document.createElement('section');panel.id='arenaMetricsConsent';panel.setAttribute('aria-label','İsteğe bağlı kullanım istatistikleri');
   const h=document.createElement('strong');h.textContent='Kullanım istatistiklerine izin verir misin?';panel.appendChild(h);
   const p=document.createElement('p');p.textContent='Site sahibinin hangi oyunların ilgi gördüğünü anlaması için ziyaretleri, oyun açılmalarını ve yaklaşık kullanım süresini ölçebiliriz. İsim veya e-posta göndermeyiz. Raporları yalnızca yönetici görebilir. Reddetmek oyunları etkilemez.';panel.appendChild(p);
   const a=document.createElement('a');a.href='privacy.html#istatistik';a.textContent='Gizlilik bilgisi';panel.appendChild(a);
   const div=document.createElement('div');for(const [label,value]of[['İzin verme','no'],['İzin ver','yes']]){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>consent(value));div.appendChild(b)}panel.appendChild(div);document.body.appendChild(panel);
  }panel.hidden=false;
 }
 window.ArenaMetrics=Object.freeze({gameLoaded,leave,preferences,consent,get configured(){return configured}});
 document.addEventListener('visibilitychange',()=>{flush();activeSince=enabled&&current&&!document.hidden?performance.now():null});
 addEventListener('pagehide',()=>{flush();activeSince=null});addEventListener('pageshow',()=>{activeSince=enabled&&current&&!document.hidden?performance.now():null});
 addEventListener('storage',e=>{if((e.key===K&&e.newValue!=='yes')||(e.key===X&&e.newValue==='yes')){enabled=false;activeSince=null;elapsed=0}});
 setInterval(flush,30000);
 function ready(){const trigger=document.getElementById('metricsPreferences');if(trigger){trigger.hidden=!configured||blocked();trigger.addEventListener('click',preferences)}if(!configured||blocked())return;if(choice==='yes')enable()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();
