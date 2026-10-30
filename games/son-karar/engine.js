(function(root){
'use strict';
const PRIZES=[2000,5000,7500,10000,20000,30000,50000,100000,200000,300000,500000,1000000,2000000,4000000,10000000];
const BARRIERS=[5,10];
const shuffle=(a,r=Math.random)=>{a=a.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const LEVELS160=[1,1,1,1,1,2,2,3,3,3,4,4,4,5,5];
const group160=q=>q.quizGroup160||q.category||'Genel kültür';
const fact160=q=>String(q.family||q.factID||q.question||q.id).toLocaleLowerCase('tr');
function create(bank,seen=[],rng=Math.random){
 if(!Array.isArray(bank)||!bank.length)throw Error('Soru havuzu bulunamadı');
 const memory=root.QuestionMemory;memory?.register?.(bank);const old=new Set(seen),history=new Set(memory?.seen?.()||[]),recent=new Map(seen.map((id,i)=>[id,i])),seen444=new Set(bank.filter(q=>old.has(q.id)||history.has(q.id)||memory?.has?.(q)).map(q=>q.id));
 function prepare(mode){const byLevel=new Map;for(const level of new Set(LEVELS160)){const groups=new Map;for(const q of shuffle(bank,rng)){if((q.quizDifficulty160||q.difficulty)!==level||(level===1&&!/^ortak-QA-00\d{3}$/.test(q.id||''))||mode===1&&seen444.has(q.id)||mode===2&&old.has(q.id))continue;const g=group160(q);if(!groups.has(g))groups.set(g,[]);groups.get(g).push(q)}for(const list of groups.values())list.sort((a,b)=>Number(seen444.has(a.id))-Number(seen444.has(b.id))||(seen444.has(a.id)?(recent.get(a.id)??-1)-(recent.get(b.id)??-1):0));byLevel.set(level,groups)}return byLevel}
 function match(byLevel){for(let attempt=0;attempt<12;attempt++){const options=LEVELS160.map(level=>shuffle([...byLevel.get(level).keys()],rng)),owners=new Map,assigned=Array(15);function augment(slot,visited){for(const group of options[slot]){if(visited.has(group))continue;visited.add(group);const previous=owners.get(group);if(previous===undefined||augment(previous,visited)){owners.set(group,slot);assigned[slot]=group;return true}}return false}const order=shuffle(Array.from({length:15},(_,i)=>i),rng).sort((a,b)=>options[a].length-options[b].length);if(!order.every(slot=>augment(slot,new Set)))return null;const facts=new Set,chosen=[];let valid=true;for(let i=0;i<15;i++){const q=byLevel.get(LEVELS160[i]).get(assigned[i]).find(q=>!facts.has(fact160(q)));if(!q){valid=false;break}chosen.push(q);facts.add(fact160(q))}if(valid)return chosen}return null}
 const chosen=match(prepare(1))||match(prepare(2))||match(prepare(0));if(!chosen)throw Error('Farklı konulardan 15 soruluk yarışma hazırlanamadı.');memory?.mark?.(chosen);const rounds=chosen.map(q=>({id:q.id,order:shuffle([0,1,2,3],rng)}));
 return {version:5,deckRevision160:2,rounds,index:0,remaining:45,stage:'ask',won:0,used:{fifty:false,audience:false,phone:false,double:false},removed:[],doubleActive:false,firstWrong:[],chosen:null,history:[],helps:{},result:null};
}
function canDouble(s){return s.index>=10&&new Set(s.history.filter(h=>h.correct&&h.level>=1&&h.level<=10).map(h=>h.level)).size===10;}
function limit(index){return index<5?45:null;}
function tick(s,dt){if(s.stage!=='ask'||s.remaining===null||!(dt>0))return false;s.remaining=Math.max(0,s.remaining-dt);if(s.remaining>0)return false;s.result={reason:'timeout',prize:guaranteed(s)};s.stage='result';return true;}
function current(s,bank){let slot=s.rounds[s.index],q=bank.find(q=>q.id===slot.id);return {...q,options:slot.order.map(i=>q.options[i]),answer:slot.order.indexOf(q.answer)};}
function guaranteed(s){let passed=BARRIERS.filter(n=>s.history.filter(h=>h.correct).length>=n);return passed.length?PRIZES[passed[passed.length-1]-1]:0;}
function answer(s,bank,n){if(s.stage!=='ask'||!Number.isInteger(n)||n<0||n>3||s.removed.includes(n)||s.firstWrong.includes(n))throw Error('Geçersiz cevap');const q=current(s,bank);s.chosen=n;
 if(n!==q.answer&&s.doubleActive&&s.firstWrong.length===0){s.firstWrong=[n];s.chosen=null;return 'retry';}
 const correct=n===q.answer;s.history.push({id:q.id,correct,selected:s.rounds[s.index].order[n],level:s.index+1});s.stage='reveal';s.doubleActive=false;
 if(correct)s.won=PRIZES[s.index];else s.result={reason:'wrong',prize:guaranteed(s)};
 return correct?'correct':'wrong';
}
function next(s){if(s.stage!=='reveal')throw Error('Henüz cevap yok');if(s.result){s.stage='result';return;}if(s.index===14){s.stage='result';s.result={reason:'jackpot',prize:PRIZES[14]};return;}s.index++;s.remaining=limit(s.index);s.stage='ask';s.removed=[];s.firstWrong=[];s.chosen=null;s.helps={};}
function withdraw(s){if(s.stage!=='ask'||s.doubleActive)throw Error('Şimdi çekilemezsin');s.result={reason:'withdraw',prize:s.won};s.stage='result';}
function joker(s,bank,type,rng=Math.random){if(s.stage!=='ask'||s.used[type]!==false||s.firstWrong.length||s.doubleActive)throw Error('Joker kullanılamaz');const q=current(s,bank),available=[0,1,2,3].filter(n=>!s.removed.includes(n));
 if(type==='double'){if(!canDouble(s))throw Error('Çift cevap 10. doğru cevaptan sonra, 11. soruda açılır');s.used.double=true;s.doubleActive=true;s.chosen=null;return true;}
 s.used[type]=true;
 if(type==='fifty'){s.removed=shuffle(available.filter(n=>n!==q.answer),rng).slice(0,2);return s.removed;}
 let wrong=available.filter(n=>n!==q.answer);let likely=rng()<(q.difficulty===1?.995:q.difficulty===2?.98:.95)?q.answer:shuffle(wrong,rng)[0];
 if(type==='phone'){s.helps.phone={pick:likely,confidence:Math.round(95-q.difficulty*7+rng()*7)};return s.helps.phone;}
 if(type==='audience'){let weights=[0,0,0,0];for(let n of available)weights[n]=n===likely?30+rng()*35:5+rng()*18;let sum=weights.reduce((a,b)=>a+b,0);let votes=weights.map(w=>Math.floor(w/sum*100));votes[likely]+=100-votes.reduce((a,b)=>a+b,0);s.helps.audience=votes;return votes;}
 throw Error('Bilinmeyen joker');
}
function valid(s,bank){try{if(!s||s.version!==5||!Array.isArray(s.rounds)||s.rounds.length!==15||!Number.isInteger(s.index)||s.index<0||s.index>14||!['ask','reveal','result'].includes(s.stage))return false;if(new Set(s.rounds.map(x=>x.id)).size!==15)return false;for(let r of s.rounds)if(!bank.some(q=>q.id===r.id)||!Array.isArray(r.order)||r.order.slice().sort().join()!=='0,1,2,3')return false;if(!s.used||!['fifty','phone','audience','double'].every(k=>typeof s.used[k]==='boolean'))return false;if(!Array.isArray(s.history)||s.history.length>15||!Array.isArray(s.removed)||!Array.isArray(s.firstWrong)||s.firstWrong.length>1||!s.helps)return false;if(![0,...PRIZES].includes(s.won))return false;return true;}catch{return false;}}
function revealDelay(index,rng=Math.random){const base=index<5?2000:index<10?4000:5000;return base+Math.floor(rng()*1001)}
const api={revealDelay,LEVELS160,group160,canDouble,limit,tick,PRIZES,BARRIERS,shuffle,create,current,guaranteed,answer,next,withdraw,joker,valid};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.QuizEngine=api;
})(typeof window!=='undefined'?window:globalThis);
