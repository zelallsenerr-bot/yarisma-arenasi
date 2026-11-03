import vm from 'node:vm';import {readFileSync} from 'node:fs';import assert from 'node:assert/strict';
const source=readFileSync(new URL('../site104/metrics.js',import.meta.url),'utf8');
function boot({consent='no',exclude=false,wv=false,configured=true}={}){
 const local=new Map([['arena-metrics-consent-v1',consent],...(exclude?[['arena-metrics-exclude-v1','yes']]:[])]),session=new Map(),calls=[],listeners={};let clock=0,now=1000000000,id=0,interval;
 const storage=m=>({getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)});
 const doc={hidden:false,readyState:'complete',getElementById:()=>null,addEventListener:(k,f)=>listeners[k]=f};
 const win={ARENA_METRICS_CONFIG:configured?{supabaseUrl:'https://test.supabase.co',publishableKey:'sb_publishable_test'}:{},ARENA_GAMES:[{id:'game-a'}]};
 const ctx={window:win,document:doc,localStorage:storage(local),sessionStorage:storage(session),navigator:{userAgent:wv?'Android; wv)':''},location:{hostname:'yarismaatolyesi.com'},crypto:{randomUUID:()=>`00000000-0000-4000-8000-${String(++id).padStart(12,'0')}`},performance:{now:()=>clock},Date:class extends Date{static now(){return now}},fetch:(url,options)=>{calls.push(JSON.parse(options.body));return Promise.resolve({ok:true})},addEventListener:(k,f)=>listeners[k]=f,setInterval:f=>interval=f};vm.runInNewContext(source,ctx);
 return {win,doc,calls,local,session,listeners,advance:ms=>{clock+=ms;now+=ms},flush:()=>interval()};
}
let n=0;function test(name,fn){fn();n++;console.log('PASS '+name)}
test('refusal sends nothing and creates no identity',()=>{const x=boot();x.win.ArenaMetrics.gameLoaded({id:'game-a'});x.advance(30000);x.flush();assert.equal(x.calls.length,0);assert.equal(x.local.has('arena-metrics-visitor-v1'),false)});
test('missing configuration disables collection',()=>assert.equal(boot({consent:'yes',configured:false}).calls.length,0));
test('excluded owner browser disabled',()=>assert.equal(boot({consent:'yes',exclude:true}).calls.length,0));
test('Android WebView disabled',()=>assert.equal(boot({consent:'yes',wv:true}).calls.length,0));
test('only canonical game and one opening counted',()=>{const x=boot({consent:'yes'});x.win.ArenaMetrics.gameLoaded({id:'unknown'});x.win.ArenaMetrics.gameLoaded({id:'game-a'});x.win.ArenaMetrics.gameLoaded({id:'game-a'});assert.deepEqual(x.calls.map(c=>c.p_kind),['site_visit','game_open'])});
test('foreground time counted, hidden time excluded',()=>{const x=boot({consent:'yes'});x.win.ArenaMetrics.gameLoaded({id:'game-a'});x.advance(5000);x.doc.hidden=true;x.listeners.visibilitychange();x.advance(60000);x.flush();assert.equal(x.calls.filter(c=>c.p_kind==='game_engagement').reduce((n,c)=>n+c.p_seconds,0),5)});
test('withdrawal stops requests and removes identifiers',()=>{const x=boot({consent:'yes'});const before=x.calls.length;x.win.ArenaMetrics.consent('no');x.win.ArenaMetrics.gameLoaded({id:'game-a'});x.advance(30000);x.flush();assert.equal(x.calls.length,before);assert.equal(x.local.has('arena-metrics-visitor-v1'),false);assert.equal(x.session.size,0)});
test('idle session rotates after thirty minutes',()=>{const x=boot({consent:'yes'});const first=x.calls[0].p_session_id;x.advance(31*60000);x.win.ArenaMetrics.gameLoaded({id:'game-a'});assert.notEqual(x.calls.at(-1).p_session_id,first)});
console.log(`${n} collector checks passed`);
