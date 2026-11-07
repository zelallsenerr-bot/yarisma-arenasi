import {normalizeTurkish,validateWrittenAnswer,assignPositions} from './eyvah-adapter.mjs';

// Standalone, deterministic 11-person LIVE duel engine.
// Provider events must be authenticated by the server; never trust a browser-supplied user ID.
export class EyvahLiveGame {
  constructor({players,centerId,questions,onEvent=()=>{},seconds=30,now=()=>Date.now()}) {
    this.positions=assignPositions(players,centerId);
    if(!Array.isArray(questions)||!questions.length)throw Error('Questions required');
    if(!Number.isFinite(seconds)||seconds<=0)throw Error('Invalid duration');
    this.questions=questions;this.onEvent=onEvent;this.seconds=seconds;this.now=now;
    this.players=new Map(players.map(p=>[p.id,p]));
    this.centerId=centerId;this.remaining=this.positions.opponents.map(p=>p.player.id);
    this.phase='choose';this.opponentId=null;this.turnId=centerId;this.questionIndex=0;
    this.passes=new Map(players.map(p=>[p.id,2]));this.seen=new Set();
    this.deadline=0;this.activeQuestion=null;this.history=[];
    this.emit('ready',{centerId,remaining:this.remaining.length});
  }
  emit(type,data={}) {const event={type,...data};this.history.push(event);this.onEvent(event)}
  selectOpponent(userId,opponentId) {
    if(this.phase!=='choose'||userId!==this.centerId||!this.remaining.includes(opponentId))return false;
    this.opponentId=opponentId;this.turnId=this.centerId;this.emit('duel',{centerId:this.centerId,opponentId});return this.nextQuestion();
  }
  nextQuestion(){
    if(this.questionIndex>=this.questions.length){this.phase='finished';this.emit('finished',{reason:'questions_exhausted'});return false}
    const q=this.questions[this.questionIndex++];
    if(!q||typeof q.question!=='string'||!q.question.trim()||!q.answer)throw Error('Invalid question');
    this.activeQuestion=q;this.phase='answer';this.deadline=this.now()+this.seconds*1000;
    this.emit('question',{question:q.question,turnId:this.turnId,deadline:this.deadline,number:this.questionIndex});return true;
  }
  receiveComment({id,userId,text,timestamp}={}){
    if(this.phase!=='answer'||typeof id!=='string'||!id||this.seen.has(id))return false;
    // Reject events from outside the current question window, including delayed delivery.
    const received=this.now(),at=Number.isFinite(timestamp)?timestamp:received;
    if(received>this.deadline||at>this.deadline||at<this.deadline-this.seconds*1000)return false;
    this.seen.add(id);if(this.seen.size>10000)this.seen.clear();
    if(userId!==this.turnId)return false;
    const command=normalizeTurkish(text);
    if(command==='pas'){
      const left=this.passes.get(userId)||0;
      if(!left){this.emit('pass_denied',{userId});return false}
      this.passes.set(userId,left-1);this.emit('pass',{userId,left:left-1});
      this.turnId=userId===this.centerId?this.opponentId:this.centerId;
      return this.nextQuestion();
    }
    const result=validateWrittenAnswer(text,this.activeQuestion.acceptedAnswers??this.activeQuestion.answer);
    if(!result.valid)return false;
    this.emit('answer',{userId,correct:result.correct,text:String(text)});
    if(result.correct){
      this.turnId=userId===this.centerId?this.opponentId:this.centerId;
      return this.nextQuestion();
    }
    return this.eliminate(userId,'wrong');
  }
  tick(){
    if(this.phase!=='answer'||this.now()<=this.deadline)return false;
    return this.eliminate(this.turnId,'timeout');
  }
  eliminate(userId,reason){
    this.emit('fall',{userId,reason});
    if(userId===this.centerId){
      this.centerId=this.opponentId;
      this.remaining=this.remaining.filter(id=>id!==this.centerId);
      this.emit('center_changed',{centerId:this.centerId});
    }else{
      this.remaining=this.remaining.filter(id=>id!==userId);
    }
    this.opponentId=null;this.turnId=this.centerId;
    if(!this.remaining.length){this.phase='finished';this.emit('finished',{reason:'last_player',winnerId:this.centerId})}
    else {this.phase='choose';this.emit('choose',{centerId:this.centerId,remaining:this.remaining.length})}
    return true;
  }
}
