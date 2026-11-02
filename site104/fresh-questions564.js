/* Exclude displayed question/fact history when a new quiz starts. Never clear it on reload. */
(function(root){'use strict';
const memory=root.QuestionMemory;if(!memory)return;
const game=document.body.dataset.game||location.pathname.split('/games/')[1]?.split('/')[0];
const names=['QUESTION_BANK','EXP_BANK','LINK_BANK','JOKER_BANK315','RISK_BANK','CEVAP_BANK317','KUMBARA_BANK','SundayBank399','NineteenBank398','DoubleBank395','TAXI_BANK388'];
const norm=s=>String(s||'').normalize('NFKC').toLocaleLowerCase('tr-TR').replace(/\s+/g,' ').trim();
const sources=[],byText=new Map(),byId=new Map(),arrays=new Set();
function remember(rows){memory.register(rows);for(const q of rows){const text=norm(q.question||q.text||q.clue);if(text){if(!byText.has(text))byText.set(text,[]);if(!byText.get(text).some(v=>v.id===q.id))byText.get(text).push(q);}if(q.id!=null)byId.set(String(q.id),q);}}
for(const name of names){const bank=root[name];if(!Array.isArray(bank)||arrays.has(bank))continue;arrays.add(bank);const all=bank.slice();sources.push({name,bank,all});remember(all);}
const families=Array.isArray(root.TRUST_FAMILIES39)?root.TRUST_FAMILIES39:null,allFamilies=families?.slice();
if(families)for(const f of families){remember(f.variants);byId.set(f.id,{familyRows564:f.variants});}
const fifty=root.FiftyBank195;
if(fifty?.categories)for(const c of fifty.categories){remember(c.questions);sources.push({name:'FiftyBank195',bank:c.questions,all:c.questions.slice()});}
if(root.FiftyBankReady195)root.FiftyBankReady195.then(data=>{for(const c of data.categories){remember(c.questions);sources.push({name:'FiftyBank195',bank:c.questions,all:c.questions.slice()});}});
// Migrate actual earlier game history against current IDs, including scoped storage.
const store=root.ArenaGlobalStorage||root.localStorage;
try{const ids=new Set();for(let i=0;i<store.length;i++){
 const key=store.key(i);if(!key||!key.startsWith('arena-game:'+game+':')||!/seen|history|memory|pool-v3|sonkarar/.test(key))continue;
 const data=JSON.parse(store.getItem(key)||'null');
 const collect=v=>{if(typeof v==='string'&&byId.has(v))ids.add(v);else if(Array.isArray(v))for(const x of v)collect(x);else if(v&&typeof v==='object')for(const [k,x]of Object.entries(v))if(['seen','history','used','id','questions','ids','usedFamilies39'].includes(k))collect(x);};
 collect(data);
 }const rows=[];for(const id of ids){const q=byId.get(id);rows.push(...(q.familyRows564||[q]));}if(rows.length)memory.mark(rows);
}catch{}
function replace(bank,rows){bank.length=0;for(const q of rows)bank.push(q);}
function balanced(rows,all){
 // Prefer the original tier. If it is exhausted, use unseen questions from the nearest tier.
 let out=rows.slice();for(const field of ['difficulty','level']){
  const tiers=[...new Set(all.map(q=>q[field]).filter(Number.isInteger))];
  if(tiers.length<2||tiers.length>5)continue;
  for(const tier of tiers){if(out.some(q=>q[field]===tier))continue;
   const candidates=out.filter(q=>!q.selectionTier564).sort((a,b)=>Math.abs(a[field]-tier)-Math.abs(b[field]-tier));
   const chosen=candidates.slice(0,Math.min(20,Math.floor(candidates.length/4)));
   const selected=new Set(chosen);out=out.map(q=>selected.has(q)?{...q,[field]:tier,originalDifficulty564:q.originalDifficulty564??q[field],selectionTier564:true}:q);
  }
 }return out;
}
function refresh(){for(const s of sources){
 if(game==='son-karar'||s.name==='RISK_BANK'||s.name==='TAXI_BANK388')continue;
 const fresh=s.all.filter(q=>!memory.has(q));
 let selected=balanced(fresh.length?fresh:memory.fresh(s.all),s.all);
 if(s.name==='CEVAP_BANK317')for(const stage of ['attention','logic'])if(!selected.some(q=>q.stage===stage))selected.push(...memory.fresh(s.all.filter(q=>q.stage===stage)).slice(0,20));
 replace(s.bank,selected);
 }
 if(families){const fresh=allFamilies.filter(f=>f.variants.every(q=>!memory.has(q)));replace(families,balanced(fresh.length?fresh:allFamilies,allFamilies));}
}
let scheduled=false,observed=new Set();
function scan(){scheduled=false;const app=document.getElementById('app')||document.getElementById('content');if(!app)return;
 const found=[],visibleText=norm(app.textContent);function check(text){const key=norm(text),matches=byText.get(key);if(!matches)return;const q=matches.find(q=>!q.passage||visibleText.includes(norm(q.passage)));if(!q)return;const token=key+'|'+(q.passage?norm(q.passage):'');if(observed.has(token))return;found.push(q);observed.add(token);}
 for(const el of app.querySelectorAll('h1,h2,h3,p,.question,.clue,[data-question]'))check(el.textContent);
 const walker=document.createTreeWalker(app,NodeFilter.SHOW_TEXT);let node;while((node=walker.nextNode()))check(node.nodeValue);
 if(found.length)memory.mark(found);
}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(scan);}}
function install(){const app=document.getElementById('app')||document.getElementById('content');if(!app)return;
 new MutationObserver(schedule).observe(app,{childList:true,subtree:true,characterData:true});scan();
 document.addEventListener('click',e=>{const b=e.target.closest('button,input[type=submit]');if(!b)return;
 const text=norm(b.textContent||b.value),id=b.id||'';
 const explicit=/^(newGame|again)$/.test(id)||/^(yeni yarışma|yeni ortaklık|yeniden oyna|tekrar oyna)/.test(text);
 const active=app.querySelector('.stage435,.studio211,[data-studio211-slot],#clock,#questionHeading,#timerBox');
 if(explicit||!active&&(/^(start|startButton)$/.test(id)||/yarışmaya başla|yarışmayı başlat|koltuğa otur|masaya getir/.test(text))){refresh();observed=new Set();}
 },true);
}
root.ArenaFreshQuestions564={refresh,scan,sourceCount:byText.size};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})(window);
