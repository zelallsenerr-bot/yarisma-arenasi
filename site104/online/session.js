/* Host-authoritative, actor-bound online adapters. Offline game engines remain unchanged. */
(function(root){'use strict';
const validGames=['password','milyoner-aile','super-bulmaca'];
class Session{
 constructor(game,players){if(['milyoner-aile','super-bulmaca'].includes(game))players=players.slice(0,4);if(!validGames.includes(game)||players.length<2||players.length>5||new Set(players.map(p=>p.id)).size!==players.length)throw Error('2–5 farklı oyuncu gerekli.');this.game=game;this.players=players.map(p=>({id:p.id,name:String(p.name).slice(0,24)}));this.token=1;this.revision=0;this.paused=false;this.reason='';this.ready=[];this.ended=[];this.now=0;
 if(game==='password'){this.deck=root.PasswordEngine.shuffle(root.PasswordBank).slice(0,10);this.s={index:0,phase:'ready',remaining:0,score:0,clue:'',feedback:'',guesses:[]}}
 if(game==='milyoner-aile'){this.s=root.FamilyMillion363.create(root.FAMILY_CLIPS363);this.s.teams[0].name='Arkadaş Ailesi';this.s.teams[0].members.forEach((m,i)=>m.name=players[i]?.name||['Deniz','Selin','Mert','Ece'][i]);}
 if(game==='super-bulmaca'){this.s=root.Super393.create(root.SuperContent393,players[0].name);this.s.players.forEach((p,i)=>{if(players[i]){p.name=players[i].name;p.human=true}else p.human=false})}
 }
 key(){const s=this.s;return [s.phase,s.stage,s.index,s.turn,s.claimant].join('|')}
 mutate(fn){const before=this.key();const value=fn();if(before!==this.key())this.token++;this.revision++;return value}
 actor(id){return this.players.findIndex(p=>p.id===id)}
 giver(){return this.s.index%this.players.length}
 maskFamilyBots(){const p=this.s.plans[0];if(p)for(let i=0;i<this.players.length;i++)p.at[i]=null}
 finishPassword(text){this.s.phase='result';this.s.remaining=0;this.s.feedback=text}
 apply(id,a){const i=this.actor(id);if(i<0||!a||a.token!==this.token||typeof a.kind!=='string'||this.paused)return false;let ok=false;this.error='';const text=String(a.value??'').trim().slice(0,64),s=this.s;
 this.mutate(()=>{
 if(this.game==='password'){
  const card=this.deck[s.index];
  if(a.kind==='next'&&i===0){if(s.phase==='result'){if(++s.index===10){s.phase='finished';ok=true;return}s.phase='ready'}if(s.phase==='ready'){s.phase='clue';s.remaining=15;s.clue='';s.guesses=[];s.feedback='';ok=true}}
  if(a.kind==='clue'&&s.phase==='clue'&&i===this.giver()){const error=root.PasswordEngine.valid(text,card,[]);if(error){this.error=error;return}s.clue=text;s.phase='guess';s.remaining=15;ok=true}
  if(a.kind==='guess'&&s.phase==='guess'&&i!==this.giver()&&!s.guesses.includes(i)&&text){s.guesses.push(i);ok=true;if(root.PasswordEngine.match(text,card)){s.score+=20;this.finishPassword(this.players[i].name+' doğru bildi · +20 puan')}else{s.feedback=this.players[i].name+' farklı bir tahminde bulundu.';if(s.guesses.length===this.players.length-1)this.finishPassword('Tahminler tamamlandı.')}}
 }
 if(this.game==='milyoner-aile'){
  const E=root.FamilyMillion363;
  if(a.kind==='ready'&&s.phase==='clipready'){if(!this.ready.includes(i))this.ready.push(i);ok=true}
  if(a.kind==='next'&&i===0){if(s.phase==='result'){ok=E.next(s);this.ready=[];this.ended=[]}else if(s.phase==='clipready'&&this.ready.length===this.players.length){ok=E.startClip(s);this.ended=[]}}
  if(a.kind==='video-ended'&&s.phase==='clip'&&Number(a.value)>=29.8){if(!this.ended.includes(i))this.ended.push(i);ok=true;if(this.ended.length===this.players.length){E.finishClip(s,30);this.maskFamilyBots()}}
  if(a.kind==='option'&&Number.isInteger(a.value)){ok=E.choose(s,0,i,a.value);this.maskFamilyBots()}
 }
 if(this.game==='super-bulmaca'){
  const E=root.Super393,C=root.SuperContent393;
  if(a.kind==='next'&&i===0){if(s.phase==='elimination'){s.phase='stageIntro';ok=true}else if(s.phase==='tie')ok=E.sudden(s,C);else if(s.phase==='result')ok=E.next(s,C);else ok=E.start(s,C)}
  if(a.kind==='buzz')ok=E.buzz(s,i);
  if(a.kind==='answer'&&s.claimant===i)ok=E.answer(s,C,s.stage===4?a.value:text);
  if(a.kind==='word'&&s.turn===i&&s.stage===3){const before=s.turn;E.word(s,C,text);ok=s.turn!==before||s.phase==='result'}
  if(a.kind==='pass'&&s.turn===i&&s.stage===3)ok=E.pass(s);
 }
 });return ok}
 tick(seconds){if(this.paused)return;const dt=Math.max(0,Math.min(seconds,.25)),s=this.s;this.now+=dt;this.mutate(()=>{
 if(this.game==='password'&&['clue','guess'].includes(s.phase)){s.remaining=Math.max(0,s.remaining-dt);if(!s.remaining)this.finishPassword('Süre doldu.')}
 if(this.game==='milyoner-aile'&&s.phase==='question'){this.maskFamilyBots();root.FamilyMillion363.tick(s,dt);if(s.elapsed>=60){for(let t=0;t<4;t++)root.FamilyMillion363.skip(s,t)}}
 if(this.game==='super-bulmaca')root.Super393.tick(s,root.SuperContent393,dt);
 })}
 view(id){const i=this.actor(id),s=this.s;const v={game:this.game,token:this.token,revision:this.revision,paused:this.paused,reason:this.reason,phase:s.phase,players:this.players,remaining:s.remaining||0,index:s.index||0,host:id===this.players[0].id,self:i};
 if(this.game==='password'){const q=this.deck[Math.min(s.index,9)];Object.assign(v,{round:Math.min(s.index+1,10),score:s.score,giver:this.giver(),clue:s.clue,feedback:s.feedback,guessed:s.guesses.includes(i),word:i===this.giver()||['result','finished'].includes(s.phase)?q.word:null})}
 if(this.game==='milyoner-aile'){const E=root.FamilyMillion363,q=E.current(s);Object.assign(v,{round:s.index+1,clip:{title:q.title,file:q.file.replace('../../','../'),parts:q.parts?.map(p=>({...p,file:p.file.replace('../../','../')}))},ready:this.ready,ended:this.ended,question:['question','result','weekend'].includes(s.phase)?{question:q.question.question,options:q.question.options}:null,choices:s.records[0]?.choices||[],answer:['result','weekend'].includes(s.phase)?q.question.answer:null,records:s.phase==='result'?s.records:null,teams:s.teams.map(t=>({name:t.name,correct:t.correct,time:t.totalTime,bank:t.bank})),remaining:s.phase==='question'?Math.max(0,60-s.elapsed):0,first:s.records[0]?.choices.find(n=>n!==null),weekRanking:s.weekRanking})}
 if(this.game==='super-bulmaca'){const E=root.Super393,C=root.SuperContent393,q=E.item(s,C),n=s.stage<3?E.norm(q.answer):'';Object.assign(v,{stage:s.stage,round:s.index+1,scores:s.players.map(p=>({name:p.name,score:p.score,human:!!p.human})),value:s.value||0,question:s.stage===4?q.question||q.q:s.stage<3?q.question:'Harflerinden en az dört harfli kelimeler türet.',claimant:s.claimant,turn:s.turn,finalists:s.finalists,remaining:s.phase==='answer'?s.answerRemaining:s.remaining,turnRemaining:s.turnRemaining,feedback:s.feedback||'',feedbackBad:!!s.feedbackBad,hint:s.host||'',found:s.found||[],phrase:s.stage===3?q.phrase:null,poolCount:s.stage===3?q.words.length:0,options:s.stage===4?q.options:null,answer:s.phase==='result'?s.stage===4?q.options[q.answer]:s.stage===3?q.phrase:q.answer:null,canBuzz:i>=0&&s.phase==='question'&&s.stage!==3&&!s.blocked.includes(i)&&(s.stage!==4||s.finalists.includes(i)),winner:s.winner});if(s.stage<3){v.boxes=[...n].map((c,j)=>({char:(s.revealOrder||[]).slice(0,s.revealed||0).includes(j)?c:'',index:j}));v.scramble=s.stage===2?(s.scrambled||[]).join(''):null}}
 return v}
}
root.ArenaOnlineSession=Session;
})(typeof window==='undefined'?globalThis:window);
