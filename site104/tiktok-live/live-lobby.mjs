// TikTok event adapter contract for a trusted server-side provider.
// This module does not connect to TikTok or read mobile LIVE comments.
// Gifts are OPTIONAL participation requests; free "katil" comments work equally.
export class LiveLobby {
  constructor({onEvent=()=>{},capacity=11}={}) {
    if(capacity!==11)throw Error('Exactly 11 seats required');
    this.onEvent=onEvent;this.requests=new Map();this.players=[];
    this.seen=new Set();this.started=false;
  }
  ingest(event) {
    if(this.started||!event||typeof event.id!=='string'||!event.id||this.seen.has(event.id))return false;
    if(typeof event.userId!=='string'||!event.userId.trim())return false;
    const kind=event.type;
    const isFree=kind==='comment'&&String(event.text??'').trim().toLocaleLowerCase('tr-TR')==='katıl' ||
      kind==='comment'&&String(event.text??'').trim().toLocaleLowerCase('tr-TR')==='katil';
    const giftName=String(event.giftName??'').trim().toLocaleLowerCase('tr-TR');
    const isGift=kind==='gift'&&['rose','gül','gul','tea','çay','cay'].includes(giftName);
    if(!isFree&&!isGift)return false;
    this.seen.add(event.id);
    const request={userId:event.userId,username:String(event.username??event.userId).slice(0,64),source:isGift?'gift':'free'};
    if(!this.requests.has(event.userId)){this.requests.set(event.userId,request);this.onEvent({type:'join_request',...request})}
    return true;
  }
  approve(userId) {
    if(this.started||this.players.length>=11||this.players.some(p=>p.id===userId))return false;
    const request=this.requests.get(userId);if(!request)return false;
    this.players.push({id:userId,name:request.username});
    this.onEvent({type:'approved',userId,count:this.players.length});
    return true;
  }
  start(centerId) {
    if(this.started||this.players.length!==11||!this.players.some(p=>p.id===centerId))return null;
    this.started=true;this.onEvent({type:'lobby_started',centerId});
    return {players:this.players.map(p=>({...p})),centerId};
  }
}
