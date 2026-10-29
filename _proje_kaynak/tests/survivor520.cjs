const assert=require('node:assert/strict'),E=require('../../games/ada-mucadelesi/engine.js');
function make(day=0){let r=E.create([0,1],day,'normal',85,{speed:112,aim:.7},()=>.5);r.countdown=0;return r}
let r=make();r.countdown=3;E.tick(r,.05,{});assert.equal(r.time,0);assert.equal(r.racers[0].x,45);
for(let day=0;day<9;day++){let q=make(day),p=q.racers[0];for(let i=0;i<6000&&!q.ended;i++){
 let o=E.layouts[day].find(o=>!p.passed.includes(o.x)&&o.x+o.w>=p.x),input={};
 if(o){if(o.type==='bar'||o.type==='pendulum')input.slide=p.x>o.x-65;if(o.type==='gap'){input.sprint=true;if(o.x-p.x<18&&o.x>p.x&&p.y===0)E.action(q,'action')}if(o.type==='hurdle'&&o.x-p.x<38&&o.x>p.x&&p.y===0)E.action(q,'action');if(o.type==='wall'||o.type==='water')E.action(q,'action');if(p.beam){input.slide=p.balance>.04;input.sprint=p.balance<-.04}}
 if(p.stage==='aim'){if(p.shotAxis===0&&Math.abs(E.aimX(q,p)+q.wind*.2-50)<4)E.action(q,'action');else if(p.shotAxis===1&&Math.abs(E.aimY(q,p)-50)<4)E.action(q,'action')}
 E.tick(q,.025,input,()=>.5)}
 assert(q.ended,'course '+day+' terminates');assert(p.stage==='aim','player completes course '+day);assert(q.time<120,'no timeout '+day);assert(p.mistakes<=1,'controllable course '+day+': mistakes '+p.mistakes);console.log(day,E.names[day],q.time.toFixed(1)+'s','mistakes',p.mistakes,'winner',q.winner)}
// Same hurdle: correct jump is rewarded, running into it costs time and stamina.
r=make();let p=r.racers[0],o=E.layouts[0][0];p.x=o.x-3;p.y=50;E.tick(r,.05,{});assert.equal(p.penalty,0);r=make();p=r.racers[0];p.x=o.x-3;E.tick(r,.05,{});assert(p.penalty>0);assert(p.x<o.x+o.w,'no teleport');
r=make(2);p=r.racers[0];o=E.layouts[2].find(o=>o.type==='beam');p.x=o.x+50;p.balance=.99;E.tick(r,.05,{sprint:true});assert(p.mistakes===1);assert(p.passed.includes(o.x));
r=make();p=r.racers[0];o=E.layouts[0].find(o=>o.type==='wall');p.x=o.x;E.action(r,'action');let initial=p.climb;E.action(r,'action');assert.equal(p.climb,initial,'spam ignored');r.time+=.4;E.action(r,'action');assert.equal(p.climb,initial+.25,'rhythm bonus');
console.log('PASS: all courses, countdown, collisions, balance, rhythmic climb and aiming');
for(let day=0;day<9;day++){let q=make(day);q.racers[0].stage='aim';for(let i=0;i<4800&&!q.ended;i++)E.tick(q,.025,{},()=>.1);assert.equal(q.winner,1,'bot completes '+day);assert(!q.timeout,'bot no timeout '+day)}
console.log('PASS: AI finishes all nine courses');
