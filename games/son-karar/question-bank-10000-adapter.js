/* 10.000 soruluk taslak havuz icin geriye uyumlu adaptor.
   Kaynak: question-bank-10000-data.js (ayri yuklenecek).
   Mevcut joker/odul/oyun motorunu degistirmez. */
(function(root){
'use strict';
const source=root.ARENA_10000_QUESTIONS;
if(!Array.isArray(source)||!Array.isArray(root.QUESTION_BANK))return;
const EASY_IDS=new Set([1,3,6,7,8,9,12,14,15,16,17,18,21,22,24,25,29,30,31,34,35,39,43,44,45,47,48,50,52,53,54,55,58,71,85,95,97,100]);
const SPECIAL=/ölüm yılı|doğum yılı|doğum yeri|hangi familyada|bilimsel adı|mimar(?:ı|lık sorumluluğu)|yönetmenlik görevini|yönetmen.film eşleştirmesi|kayıtlı doğum|kayıtlı ölüm|hangi kişi ya da kuruluşla ilişkilidir|hangi dağ sisteminin parçasıdır|idari yer|ISO 639|hangi periyodundadır|hangi grupta yer alır|alıcı su kütlesi|proton sayısı|hangi yılda doğmuştur|hangi yılda ölmüştür|hangi ülkede doğmuştur|hangi ülkede ölmüştür|hangi isim kayıtlıdır|hangi isimle eşleşir|hangi mimar|hangi tarihte doğmuştur|hangi tarihte ölmüştür|yazarı sorulan eser|hangi kuruluş tarafından geliştirilmiştir/i;
const NORMALIZED=x=>String(x).normalize('NFKC').trim().toLocaleLowerCase('tr');
const audit={total:0,eligible:[0,0,0,0],excluded:0,reasons:{}};
function classify(q,n){
 const options=q.options.map(NORMALIZED);
 let reason='';
 if(!q.question||q.question.length<12||q.question.length>260)reason='length';
 else if(new Set(options).size!==4||options.some(x=>!x))reason='duplicate-or-empty-option';
 else if(SPECIAL.test(q.question))reason='niche-template';
 else if(/(?:^|\\s)(?:Q\\d+|P\\d+)(?:\\s|$)/.test(q.question))reason='unreadable';
 if(reason)return {eligible:false,level:0,reason};
 // The source difficulty is not a verified editorial rating.
 // First 5 questions use a conservative, previously tested shortlist.
 const level=EASY_IDS.has(n)?1:Number(q.difficulty)===1?2:Number(q.difficulty)===2?2:3;
 return {eligible:true,level,reason:'automated-screen'};
}
const used=new Set(root.QUESTION_BANK.map(q=>q.id));
let added=0;
for(const q of source){
 if(!q||typeof q.id!=='string'||used.has('ortak-'+q.id)||typeof q.question!=='string'||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.answerIndex)||q.answerIndex<0||q.answerIndex>3)continue;
 const d=Number(q.difficulty);
 if(![1,2,3].includes(d))continue;
 const n=Number(q.id.match(/\d+$/)?.[0]||0);
 const review=classify(q,n);audit.total++;if(!review.eligible){audit.excluded++;audit.reasons[review.reason]=(audit.reasons[review.reason]||0)+1;}else audit.eligible[review.level]++;
 const level=review.level;
 root.QUESTION_BANK.push({
   id:'ortak-'+q.id,factID:q.factKey||q.id,
   question:q.question,options:q.options.slice(),answer:q.answerIndex,
   difficulty:level||d,quizDifficulty160:level||d,quizEligible160:review.eligible,quizReview160:review.reason,
   category:q.category||'Genel kültür',
   quizGroup160:(q.category||'Genel kültür')+' · '+(q.questionFamily||'genel')+' · '+(n%7),
   explanation:q.explanation||'',
   sourceStatus:q.status||'draft'
 });
 used.add(q.id);added++;
}
root.ARENA_10000_ADDED=added;
root.ARENA_10000_AUDIT=audit;
})(window);
