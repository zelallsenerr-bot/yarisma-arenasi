import assert from 'node:assert/strict';
import {EyvahLiveGame} from './eyvah-live-game.mjs';
const players=Array.from({length:11},(_,i)=>({id:'u'+i}));
let time=100000;const events=[];
const game=new EyvahLiveGame({players,centerId:'u0',questions:[
{question:'Başkent?',answer:'Ankara'},
{question:'En büyük gezegen?',answer:'Jüpiter'},
{question:'Su kaç derecede donar?',answer:'0'}
],onEvent:e=>events.push(e),now:()=>time,seconds:30});
assert.equal(game.remaining.length,10);
assert.equal(game.selectOpponent('u1','u2'),false);
assert.equal(game.selectOpponent('u0','u1'),true);
assert.equal(game.receiveComment({id:'a',userId:'u2',text:'Ankara',timestamp:time}),false);
assert.equal(game.receiveComment({id:'b',userId:'u0',text:'ankara',timestamp:time}),true);
assert.equal(game.turnId,'u1');
assert.equal(game.receiveComment({id:'c',userId:'u1',text:'pas',timestamp:time}),true);
assert.equal(game.passes.get('u1'),1);
assert.equal(game.turnId,'u0');
assert.equal(game.receiveComment({id:'d',userId:'u0',text:'yanlış',timestamp:time}),true);
assert.equal(game.centerId,'u1');
assert.equal(game.remaining.length,9);
assert.equal(game.phase,'choose');
assert.equal(events.filter(e=>e.type==='fall').length,1);
console.log('Eyvah LIVE state machine tests passed');
