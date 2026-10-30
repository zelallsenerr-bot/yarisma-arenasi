/* 10.000 soruluk taslak havuz icin geriye uyumlu adaptor.
   Kaynak: question-bank-10000-data.js (ayri yuklenecek).
   Mevcut joker/odul/oyun motorunu degistirmez. */
(function(root){
'use strict';
const source=root.ARENA_10000_QUESTIONS;
if(!Array.isArray(source)||!Array.isArray(root.QUESTION_BANK))return;
const used=new Set(root.QUESTION_BANK.map(q=>q.id));
let added=0;
for(const q of source){
 if(!q||typeof q.id!=='string'||used.has(q.id)||typeof q.question!=='string'||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.answerIndex)||q.answerIndex<0||q.answerIndex>3)continue;
 const d=Number(q.difficulty);
 if(![1,2,3].includes(d))continue;
 const n=Number(q.id.match(/\d+$/)?.[0]||0);
 const level=d===1?1:d===2?(n%2?2:3):(n%2?4:5);
 root.QUESTION_BANK.push({
   id:'ortak-'+q.id,factID:q.factKey||q.id,
   question:q.question,options:q.options.slice(),answer:q.answerIndex,
   difficulty:level,quizDifficulty160:level,
   category:q.category||'Genel kültür',
   quizGroup160:(q.category||'Genel kültür')+' · '+(q.questionFamily||'genel')+' · '+(n%7),
   explanation:q.explanation||'',
   sourceStatus:q.status||'draft'
 });
 used.add(q.id);added++;
}
root.ARENA_10000_ADDED=added;
})(window);
