/** Ortak soru havuzu motoru. Tarayıcıda ES modülü olarak kullanılır. */
export function validateBank(bank){
 const errors=[],ids=new Set(),texts=new Set();
 for(const q of bank.questions||[]){
  const norm=String(q.question||'').toLocaleLowerCase('tr').replace(/\s+/g,' ').trim();
  if(!q.id||ids.has(q.id))errors.push('Tekrar/eksik ID: '+q.id);ids.add(q.id);
  if(!norm||texts.has(norm))errors.push('Tekrar/boş soru: '+q.id);texts.add(norm);
  if(!Array.isArray(q.options)||q.options.length!==4||new Set(q.options).size!==4)errors.push('Dört benzersiz şık gerekli: '+q.id);
  if(!Number.isInteger(q.answerIndex)||q.answerIndex<0||q.answerIndex>3)errors.push('Cevap hatalı: '+q.id);
  if(![1,2,3].includes(q.difficulty)||!q.category||!q.explanation)errors.push('Eksik alan: '+q.id);
 }
 return {valid:errors.length===0,errors,total:(bank.questions||[]).length};
}
export function selectQuestions(bank,{category=null,difficulties=[1,2,3],count=10,seenIds=[],approvedOnly=true}={}){
 const seen=new Set(seenIds);
 const pool=(bank.questions||[]).filter(q=>(!approvedOnly||q.status==='approved')&&(!category||q.category===category)&&difficulties.includes(q.difficulty)&&!seen.has(q.id));
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
 return pool.slice(0,count).map(q=>{const order=[0,1,2,3];for(let i=3;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}return {...q,options:order.map(i=>q.options[i]),answerIndex:order.indexOf(q.answerIndex)};});
}
export function difficultyForMilyoner(questionNumber){return questionNumber<=5?1:questionNumber<=10?2:3;}
export function markSeen(storage,key,questionId,limit=500){const list=JSON.parse(storage.getItem(key)||'[]').filter(id=>id!==questionId);list.push(questionId);storage.setItem(key,JSON.stringify(list.slice(-limit)));}
