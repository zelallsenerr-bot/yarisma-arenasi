(function(root){function clueText(q){return(typeof q?.clue==="string"&&q.clue.trim())||(typeof q?.question==="string"?q.question.trim():"")}function validQuestion(q){return !!clueText(q)&&Array.isArray(q.answers)&&q.answers.some(a=>typeof a==="string"&&a.trim())}function norm(s){return String(s).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/π/g,'pi').replace(/[.,]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim().replace(/^(nedir|kimdir|neresidir|kactir) /,'').replace(/ (nedir|kimdir|neresidir|kactir)$/,'').trim()}function distance(a,b){let d=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let prev=d[0];d[0]=i;for(let j=1;j<=b.length;j++){let old=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,prev+(a[i-1]!==b[j-1]));prev=old}}return d[b.length]}function correct(q,text){let n=norm(text);return !!n&&q.answers.some(a=>{let x=norm(a);return n===x||(!/\d/.test(n+x)&&n.length>=6&&x.length>=6&&Math.abs(n.length-x.length)<=1&&distance(n,x)===1)})}function shuffle(a,rng=Math.random){return a.map(v=>[rng(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}function makeBoards(bank,rng=Math.random){
 bank=bank.filter(validQuestion);root.QuestionMemory?.register?.(bank);
 const used=new Set,facts=new Set,boards=[],roundCats=[];
 const fact=q=>q.factID||q.family||q.question;
 function available(cat,fresh=true){return bank.filter(q=>(!cat||q.category===cat)&&!used.has(q.id)&&!facts.has(fact(q))&&(!fresh||!root.QuestionMemory?.has?.(q)));}
 for(let round=0;round<2;round++){
  const cats=[...new Set(bank.map(q=>q.category))];
  let candidates=cats.filter(c=>new Set(available(c).map(fact)).size>=5);
  if(!candidates.length)candidates=cats.filter(c=>new Set(available(c,false).map(fact)).size>=5);
  candidates=shuffle(candidates,rng).sort((a,b)=>Number(roundCats.flat().includes(a))-Number(roundCats.flat().includes(b)));
  if(!candidates.length)throw Error('Yeterli kategori yok');
  const chosen=Array.from({length:6},(_,i)=>candidates[i%candidates.length]);roundCats.push(chosen);const cells=[],mixed=new Set();
  for(let level=1;level<=5;level++)for(let cat=0;cat<6;cat++){
   let pool=mixed.has(cat)?available():available(chosen[cat]);if(!pool.length){pool=available();if(pool.length){mixed.add(cat);chosen[cat]='Karma';}else pool=available(null,false);}
   if(!pool.length)throw Error('Soru bulunamadı');
   const nearest=Math.min(...pool.map(q=>Math.abs(q.level-level)));pool=pool.filter(q=>Math.abs(q.level-level)===nearest);
   const q=root.QuestionMemory?.pick(pool,rng)||shuffle(pool,rng)[0];used.add(q.id);facts.add(fact(q));
   cells.push({id:cells.length,qid:q.id,cat,level,value:level*1000*(round+1),used:false,risk:false});
  }
  cells[Math.floor(rng()*cells.length)].risk=true;boards.push(cells);
 }
 return{cats:roundCats[0],roundCats,boards,used:[...used]};
}
function maxRisk(score,round){return Math.max(score,5000*(round+1))}function chance(level,difficulty){return Math.max(.20,({easy:.76,normal:.88,hard:.97}[difficulty]||.88)-level*.09)}function finalScores(scores,wagers,corrects){return scores.map((score,i)=>score+(corrects[i]?wagers[i]:-wagers[i]))}const E={clueText,validQuestion,norm,distance,correct,shuffle,makeBoards,maxRisk,chance,finalScores};if(typeof module!=='undefined')module.exports=E;root.RiskEngine=E})(typeof window!=='undefined'?window:globalThis);
