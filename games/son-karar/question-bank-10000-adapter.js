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
 if(!q||typeof q.id!=='string'||used.has('ortak-'+q.id)||typeof q.question!=='string'||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.answerIndex)||q.answerIndex<0||q.answerIndex>3)continue;
 const d=Number(q.difficulty);
 if(![1,2,3].includes(d))continue;
 const n=Number(q.id.match(/\d+$/)?.[0]||0);
 const mediumIds=new Set([4,10,11,13,19,20,23,26,27,32,36,37,40,41,42,46,49,56,59,61,62,63,67,68,69,70,72,73,74,75,77,79,80,81,82,83,84,86,88,89,92,93,94,96,98,101,102,105,107,111,112,117,119,121,125,129,130]);
 const hardIds=new Set([5,28,33,42,46,51,60,65,66,69,76,78,83,86,88,90,93,96,103,106,108,113,116,123,126,128,133,143,146,148,180,181,182,183,184,185,186,187,188,189,190,191,192,194,195,196,197,198,199,200]);
 const level=hardIds.has(n)?(n%2?4:5):mediumIds.has(n)?(n%2?2:3):d===1?1:d===2?(n%2?2:3):(n%2?4:5);
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
