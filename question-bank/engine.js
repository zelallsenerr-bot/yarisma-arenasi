/** Yarışma Arenası ortak soru havuzu — tarayıcı ve Node.js ES modülü. */
const normalize = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/\s+/g,' ');
export function validateBank(bank){
 const errors=[],warnings=[],ids=new Set(),texts=new Set();
 if(!bank||!Array.isArray(bank.questions))return {valid:false,errors:['questions dizisi eksik'],warnings,total:0,approved:0};
 for(const q of bank.questions){
  const id=String(q?.id??'');
  const normalized=normalize(q?.question);
  if(!id||ids.has(id))errors.push('Tekrar/eksik ID: '+id);ids.add(id);
  if(!normalized||texts.has(normalized))errors.push('Tekrar/boş soru: '+id);texts.add(normalized);
  if(typeof q.question!=='string'||q.question.trim().length<12)errors.push('Soru çok kısa/eksik: '+id);
  if(!Array.isArray(q.options)||q.options.length!==4||q.options.some(x=>typeof x!=='string'||!x.trim())||new Set((q.options||[]).map(normalize)).size!==4)errors.push('Dört farklı dolu şık gerekli: '+id);
  if(!Number.isInteger(q.answerIndex)||q.answerIndex<0||q.answerIndex>3)errors.push('Cevap hatalı: '+id);
  if(![1,2,3].includes(q.difficulty)||!q.category||!q.explanation?.trim())errors.push('Eksik alan: '+id);
  if(!['draft','approved','rejected'].includes(q.status))errors.push('Geçersiz inceleme durumu: '+id);
  if(q.status==='approved'&&!q.reviewedBy)warnings.push('Onaylı ama inceleyen kaydı yok: '+id);
 }
 return {valid:errors.length===0,errors,warnings,total:bank.questions.length,approved:bank.questions.filter(q=>q.status==='approved').length};
}
function shuffle(items,rng=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function shuffleOptions(q,rng){const indices=shuffle([0,1,2,3],rng);return {...q,options:indices.map(i=>q.options[i]),answerIndex:indices.indexOf(q.answerIndex)};}
export function selectQuestions(bank,{category=null,difficulties=[1,2,3],count=10,seenIds=[],approvedOnly=true,rng=Math.random}={}){
 const seen=new Set(seenIds);
 const pool=(bank.questions||[]).filter(q=>(!approvedOnly||q.status==='approved')&&(!category||q.category===category)&&difficulties.includes(q.difficulty)&&!seen.has(q.id));
 return shuffle(pool,rng).slice(0,Math.max(0,count)).map(q=>shuffleOptions(q,rng));
}
/** Her soru için belirtilen zorlukta soru bulur; havuz yetmezse eksik döndürür, tekrar üretmez. */
export function selectByDifficultyPlan(bank,plan,{seenIds=[],approvedOnly=true,rng=Math.random}={}){
 const seen=new Set(seenIds),result=[],missing=[];
 for(const [index,difficulty] of plan.entries()){
  const choice=selectQuestions(bank,{difficulties:[difficulty],count:1,seenIds:[...seen],approvedOnly,rng})[0];
  if(!choice){missing.push({position:index+1,difficulty});continue;}
  result.push(choice);seen.add(choice.id);
 }
 return {questions:result,missing,complete:missing.length===0};
}
export function difficultyForMilyoner(questionNumber){if(!Number.isInteger(questionNumber)||questionNumber<1||questionNumber>15)throw Error('Soru numarası 1–15 arasında olmalı');return questionNumber<=5?1:questionNumber<=10?2:3;}
export function selectMilyonerRound(bank,options={}){return selectByDifficultyPlan(bank,Array.from({length:15},(_,i)=>difficultyForMilyoner(i+1)),options);}
export function markSeen(storage,key,questionId,limit=500){
 let list=[];try{const parsed=JSON.parse(storage.getItem(key)||'[]');if(Array.isArray(parsed))list=parsed.filter(id=>typeof id==='string'&&id!==questionId);}catch{}
 list.push(questionId);storage.setItem(key,JSON.stringify(list.slice(-Math.max(1,limit))));
}
