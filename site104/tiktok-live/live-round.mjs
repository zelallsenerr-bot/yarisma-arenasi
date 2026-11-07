// TikTok LIVE event processing core. No TikTok connection is opened here.
// This module is deliberately independent of the existing 76 games.
// Integrate a provider adapter only after verifying platform terms and reliability.
export class LiveRound {
  constructor({players,questions,onEvent=()=>{}}) {
    if (!Array.isArray(players)||players.length!==10||new Set(players.map(p=>p.id)).size!==10) throw Error('10 unique player IDs required');
    if (!Array.isArray(questions)||!questions.length) throw Error('Questions required');
    this.players=players;this.questions=questions;this.onEvent=onEvent;
    this.active=0;this.index=0;this.state='idle';this.seen=new Set();
    this.epoch=0;this.timer=null;
  }
  emit(type,data={}) {this.onEvent({type,...data})}
  start(centerId) {
    const index=this.players.findIndex(p=>p.id===centerId);
    if(index<0)throw Error('Center must be an authorized player');
    this.stop();this.active=index;this.index=0;this.state='question';this.seen.clear();
    this.emit('question',{playerId:this.players[this.active].id,index:this.index,question:this.questions[this.index]});
  }
  stop(){this.epoch++;if(this.timer)clearTimeout(this.timer);this.timer=null;this.state='idle'}
  // event: {id, userId, text, timestamp}. IDs must be stable provider IDs.
  receiveComment(event) {
    if(this.state!=='question'||!event||typeof event.id!=='string'||!event.id||this.seen.has(event.id))return false;
    this.seen.add(event.id);
    if(this.seen.size>5000)this.seen.clear();
    if(event.userId!==this.players[this.active].id)return false;
    const answer=String(event.text??'').trim().toLocaleUpperCase('tr-TR');
    if(!/^[ABCD]$/.test(answer))return false;
    const question=this.questions[this.index];
    if(!question||!['A','B','C','D'].includes(question.answer))throw Error('Invalid question');
    this.state='transition';
    this.emit('answer',{playerId:event.userId,index:this.index,answer,correct:answer===question.answer});
    const epoch=this.epoch;
    this.timer=setTimeout(()=>{
      if(this.epoch!==epoch||this.state!=='transition')return;
      this.index++;
      if(this.index>=this.questions.length){this.state='finished';this.emit('finished');return}
      this.active=(this.active+1)%this.players.length;
      this.state='question';
      this.emit('question',{playerId:this.players[this.active].id,index:this.index,question:this.questions[this.index]});
    },1100);
    return true;
  }
}
