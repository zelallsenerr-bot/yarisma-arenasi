/* Shared existing 10,000-question source; each game keeps its own answer format. */
(function(root){
'use strict';
const game=document.body.dataset.game||location.pathname.split('/games/')[1]?.split('/')[0];
const targets={
 'para-kapani':['QUESTION_BANK','choice'],'sepetini-koru':['QUESTION_BANK','choice'],
 'guven-cizgisi':['QUESTION_BANK','choice'],'ortak-kasa':['QUESTION_BANK','choice'],
 'kapi-kapanmadan':['QUESTION_BANK','choice'],'beyazla-joker':['JOKER_BANK315','choice'],
 'on-dokuz':['NineteenBank398','choice'],'cifte-milyon':['DoubleBank395','choice'],
 'sahane-pazar':['SundayBank399','choice'],'kendi-dusen-aglamaz':['SundayBank399','choice'],
 'siradaki-gelsin':['SundayBank399','choice'],'herkes-kazanir':['SundayBank399','choice'],
 'arkandayiz':['SundayBank399','choice'],'anlasma':['SundayBank399','choice'],
 'para-odasi':['SundayBank399','choice'],'sans-kapida':['SundayBank399','choice'],
 'halka-mucadelesi':['LINK_BANK','free'],'risk-meydani':['RISK_BANK','risk'],
 'cevap-soruda':['CEVAP_BANK317','attention'],'altin-petek':['EXP_BANK','text'],
 'eyvah-dusuyorum':['EXP_BANK','text'],'takip':['EXP_BANK','text'],
 'ucte-uc':['EXP_BANK','text'],'kumbara':['KUMBARA_BANK','binary'],
 'tuhaf-taksi':['TAXI_BANK388','taxi']
};
const target=targets[game],source=root.ARENA_10000_QUESTIONS;
if(!target||!Array.isArray(source))return;
const [name,format]=target,bank=root[name];if(!Array.isArray(bank))return;
const norm=x=>String(x||'').normalize('NFKC').toLocaleLowerCase('tr').replace(/\s+/g,' ').trim();
const easyIds=new Set([1,3,6,7,8,9,12,14,15,16,17,18,21,22,24,25,29,30,31,34,35,39,43,44,45,47,48,50,52,53,54,55,58,71,85,95,97,100]);
const specialist=/doğum|ölüm|familya|bilimsel adı|ISO 639|hangi periyod|hangi grup|proton sayısı|mimar|yönetmen|yazarlığı|alıcı su kütlesi|idari yer|dağ sistem/i;
const existing=new Set(bank.map(q=>norm(q.question||q.text||q.clue)));
const ids=new Set(bank.map(q=>q.id)),facts=new Set();let added=0,rejected=0,duplicates=0;
for(const q of source){
 const key=norm(q.question),options=q.options;
 if(!key||key.length<12||!Array.isArray(options)||options.length!==4||options.some(x=>typeof x!=='string'||!x.trim())||new Set(options.map(norm)).size!==4||!Number.isInteger(q.answerIndex)||q.answerIndex<0||q.answerIndex>3||![1,2,3].includes(q.difficulty)){rejected++;continue;}
 const id='shared563-'+q.id;if(existing.has(key)||ids.has(id)){duplicates++;continue;}
 const answer=options[q.answerIndex],number=Number(q.id.match(/\d+$/)?.[0]||0);
 const level=easyIds.has(number)?1:specialist.test(q.question)||q.difficulty===3?3:2;
 const row={id,factID:q.factKey||q.id,fact:q.factKey||q.id,family:q.factKey||q.id,
  question:q.question,text:q.question,clue:q.question,options:options.slice(),
  answer:q.answerIndex,answers:[answer],aliases:[],correct:q.answerIndex,
  category:q.category||'Genel kültür',topic:q.category||'Genel kültür',
  difficulty:level,level,explanation:q.explanation||'',sourceStatus:q.status||'draft',
  sourcePool563:'existing-10000',opening34:level===1,friendly35:level===1,moderate34:level>=2};
 if(format==='text'||format==='attention'||format==='binary'||format==='taxi')row.answer=answer;
 if(format==='attention')row.stage='knowledge';
 if(format==='binary'){row.cat=row.category;row.other=options.find(x=>x!==answer);}
 if(format==='risk'){
  row.sourceCategory563=row.category;
  const cat=row.category.toLocaleLowerCase('tr');
  row.category=/coğraf|ülke|şehir/.test(cat)?'Harita':/tarih/.test(cat)?'Bir Zamanlar':/sanat|edebiyat/.test(cat)?'Satır':/spor/.test(cat)?'Tribün':/tekn|fizik|kimya/.test(cat)?'Teknik':/bilim|doğa|canlı/.test(cat)?'Doğa':'Günlük';
  row.level=level===1?1+(added%2):level===2?3:4+(added%2);
 }
 if(format==='taxi'){const other=options.find(x=>x!==answer);row.options=added%2?[other,answer]:[answer,other];row.correct=row.options.indexOf(answer);}
 bank.push(row);ids.add(id);existing.add(key);facts.add(row.factID);added++;
}
if(game==='guven-cizgisi'&&Array.isArray(root.TRUST_FAMILIES39)){
 const buckets=new Map();
 for(const row of bank.filter(q=>q.sourcePool563)){const key=row.difficulty+'|'+row.category;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(row);}
 let serial=0;for(const rows of buckets.values())for(let i=0;i+2<rows.length;i+=3){
  const variants=rows.slice(i,i+3).map(q=>({...q,mix38:q.category}));
  root.TRUST_FAMILIES39.push({id:'trust563-'+serial++,topic:variants[0].category,difficulty:variants[0].difficulty,teaser:variants[0].category+' alanından …… sorusu. Seçtiğiniz teklifin sorusu açılacak.',variants});
 }
}
root.ArenaKnowledgePool563={game,bank:name,sourceCount:source.length,total:bank.length,added,rejected,duplicates,uniqueQuestions:existing.size,addedFacts:facts.size};
if(game==='guven-cizgisi'){const reachable=new Set(root.TRUST_FAMILIES39.flatMap(f=>f.variants.map(q=>norm(q.question))));root.ArenaKnowledgePool563.uniqueQuestions=reachable.size;root.ArenaKnowledgePool563.playableVariants=root.TRUST_FAMILIES39.reduce((n,f)=>n+f.variants.length,0);}
// Existing engines retain their own seen-question history and round progression.
})(window);
