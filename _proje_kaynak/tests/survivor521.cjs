const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),E=require('../../games/ada-mucadelesi/engine.js');
const c={E,person(){},window:{},Image:function(){},s:null};vm.createContext(c);vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../../games/ada-mucadelesi/actor521.js'),'utf8'),c);const M=c.window.SurvivorMotion521;
const base={id:0,x:100,y:0,vy:0,stage:'run',climb:0,slide:false,water:false,seed:1,motion521:{speed:120,landAt:-10},balance:0};
for(const [mode,patch] of Object.entries({run:{},jump:{y:45,vy:20},crouch:{slide:true},climb:{climb:.6},swim:{water:true},balance:{beam:{},balance:.6},aim:{stage:'aim'},stumble:{penalty:.7}})){let p={...base,...patch};for(let t=0;t<2;t+=.02){let q=M.posture(p,t);assert.equal(q.mode,mode);assert(q.hip.concat(q.head,...q.feet,...q.hands).every(Number.isFinite));for(let foot of q.feet)assert(M.ik(q.hip,foot,26,25,-1).every(Number.isFinite))}}
assert(M.posture({...base,slide:true},1).head[1]>M.posture(base,1).head[1]+25,'crouch physically lowers head');
let r=E.create([0,1],0,'normal',85,{speed:112,aim:.7},()=>.5);r.countdown=0;E.action(r,'action');assert.equal(r.racers[0].motion521.takeAt,0);for(let i=0;i<50;i++)E.tick(r,.025,{});assert(r.racers[0].motion521.landAt>0,'landing detected');assert(r.racers[0].motion521.impact>0,'impact measured');
console.log('PASS: eight motion states, finite joints, crouch clearance, takeoff and landing events');

for(let i=0;i<2;i++){let start=i?36:5,a=M.posture({...base,x:start},1),b=M.posture({...base,x:start+3},1);assert(Math.abs((start+a.feet[i][0])-(start+3+b.feet[i][0]))<.01,"planted foot stays at same world coordinate")}
console.log("PASS: stance feet remain planted instead of sliding");
