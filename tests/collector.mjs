import vm from 'node:vm';import {readFileSync} from 'node:fs';import assert from 'node:assert/strict';
const code=readFileSync(new URL('../site104/metrics.js',import.meta.url),'utf8');
function boot(extra={}){const calls=[],removed=[];const document={readyState:'complete',getElementById:()=>null};const storage={removeItem:k=>removed.push(k),setItem(){throw Error('Persistent tracking must not be written')},getItem(){throw Error('Persistent tracking must not be read')}};const window={ARENA_METRICS_CONFIG:{supabaseUrl:'https://test.supabase.co',publishableKey:'sb_publishable_test',collectionEnabled:true},ARENA_GAMES:[{id:'son-karar'}]};vm.runInNewContext(code,{window,document,localStorage:storage,sessionStorage:storage,location:{hostname:'yarismaatolyesi.com'},navigator:extra,fetch:(url,options)=>{calls.push({url,options,body:JSON.parse(options.body)});return Promise.resolve({ok:true})}});return{window,calls,removed}}
let n=0;const test=(name,f)=>{f();n++;console.log('PASS '+name)};
test('page counted without persistent identity or consent storage',()=>{const x=boot();assert.deepEqual(x.calls[0].body,{p_kind:'site_visit',p_game_id:null});assert(x.removed.includes('arena-metrics-visitor-v1'))});
test('only known games counted; duplicate onload ignored; reopen counted',()=>{const x=boot();x.window.ArenaMetrics.gameLoaded({id:'unknown'});x.window.ArenaMetrics.gameLoaded({id:'son-karar'});x.window.ArenaMetrics.gameLoaded({id:'son-karar'});assert.equal(x.calls.length,2);x.window.ArenaMetrics.leave();x.window.ArenaMetrics.gameLoaded({id:'son-karar'});assert.equal(x.calls.length,3)});
test('no browser credentials or referrer included',()=>{const x=boot();assert.equal(x.calls[0].options.credentials,'omit');assert.equal(x.calls[0].options.referrerPolicy,'no-referrer');assert.equal(x.calls[0].url.endsWith('/arena_record_count'),true)});
test('DNT respected',()=>assert.equal(boot({doNotTrack:'1'}).calls.length,0));
test('GPC respected',()=>assert.equal(boot({globalPrivacyControl:true}).calls.length,0));
test('Android wrapper remains excluded',()=>assert.equal(boot({userAgent:'Android; wv)'}).calls.length,0));
console.log(n+' aggregate collector checks passed');
