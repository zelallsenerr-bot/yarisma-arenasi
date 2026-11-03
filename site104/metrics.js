(() => {
'use strict';if(window.ArenaMetrics)return;
const c=window.ARENA_METRICS_CONFIG||{};
const configured=c.collectionEnabled===true&&/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(c.supabaseUrl||'')&&/^(sb_publishable_|eyJ)/.test(c.publishableKey||'');
const webview=/;\s*wv\)|\bVersion\/\d.*Chrome\/.*Mobile Safari\//i.test(navigator.userAgent||'');
const blocked=()=>!['yarismaatolyesi.com','www.yarismaatolyesi.com'].includes(location.hostname)||navigator.doNotTrack==='1'||navigator.globalPrivacyControl===true||(webview&&!c.collectInWebView);
try{for(const k of ['arena-metrics-visitor-v1','arena-metrics-consent-v1','arena-metrics-exclude-v1'])localStorage.removeItem(k);sessionStorage.removeItem('arena-metrics-session-v1')}catch(_){}
let current=null;
function record(kind,game=null){if(!configured||blocked())return;const headers={apikey:c.publishableKey,'Content-Type':'application/json'};if(c.publishableKey.startsWith('eyJ'))headers.Authorization='Bearer '+c.publishableKey;fetch(c.supabaseUrl+'/rest/v1/rpc/arena_record_count',{method:'POST',headers,body:JSON.stringify({p_kind:kind,p_game_id:game}),credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',keepalive:true}).catch(()=>{});}
function gameLoaded(candidate){const game=(window.ARENA_GAMES||[]).find(g=>g.id===candidate?.id);if(!game||current===game.id)return;current=game.id;record('game_open',game.id)}
window.ArenaMetrics=Object.freeze({gameLoaded,leave(){current=null},get configured(){return configured}});
function ready(){document.getElementById('arenaMetricsConsent')?.remove();document.getElementById('metricsPreferences')?.remove();record('site_visit')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();
