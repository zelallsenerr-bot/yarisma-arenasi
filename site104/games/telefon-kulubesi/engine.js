(()=>{'use strict';const C=ShowContent395.phone,M=ArenaMini395;
function create(name='Yarışmacı',seen=[]){let order=[];for(let tier=0;tier<5;tier++){let pool=C.filter(t=>t.tier===tier),fresh=pool.filter(t=>!seen.includes(t.id));order.push(M.shuffle(fresh.length?fresh:pool)[0].id)}return{version:395,name,phase:'ring',index:0,order,paused:false,history:[],remaining:12,cash:0,m:null,message:''}}
const current=s=>C.find(t=>t.id===s.order[s.index]);
function answerPhone(s){if(s.paused)return false;if(s.phase==='ring'){s.phase='brief';return true}if(s.phase==='return'){s.history.push(s.order[s.index]);s.phase='checkpoint';return true}return false}
function start(s){if(s.paused||s.phase!=='brief')return false;let t=current(s);s.m=M.create(t.kind,t.goal,t.duration);s.phase='play';return true}
function complete(s,won){if(s.phase!=='play')return false;if(!won)return fail(s,'Görev süresi doldu. Hat bu kez kapandı.');s.phase='return';s.remaining=10;return true}
function fail(s,text){s.phase='end';s.cash=0;s.message=text;return true}
function tick(s,dt){if(s.paused)return false;if(['ring','return'].includes(s.phase)){s.remaining=Math.max(0,s.remaining-Math.min(.25,Math.max(0,dt)));if(!s.remaining)return fail(s,'Telefon çaldı ama zamanında açamadın.')}return false}
function next(s){if(s.paused||s.phase!=='checkpoint')return false;if(s.index===4){s.phase='end';s.cash=1000000;s.message='Hattaki bütün görevleri tamamladın!';return true}s.index++;s.phase='ring';s.remaining=12;return true}
function valid(s){return s?.version===395&&s.order?.length===5&&s.order.every(id=>C.some(t=>t.id===id))&&s.index>=0&&s.index<5&&['ring','brief','play','return','checkpoint','end'].includes(s.phase)}
window.Phone395={create,current,answerPhone,start,complete,fail,tick,next,valid};})();
