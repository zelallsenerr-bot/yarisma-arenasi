import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,ring,plate,chair,lectern,monitor,table,sofa,shelf} from './kit.js?v=418';

function person(v,x,z,pose='standing',role='contestant',extra={}){
 const s={x,z,y:0,pose,role,...extra};
 (role==='host'?v.hostSlots:role==='contestant'?v.playerSlots:(v.supportSlots??=[])).push(s);return s;
}
function hosts(v,x,z,pose='standing'){person(v,x,z,pose,'host')}
function controlRoom(v){
 const g=v.scene;
 box(g,-3.65,1.55,-2.2,3.9,3.1,.12,'#1a2532');
 box(g,-1.65,1.55,-.7,.12,3.1,3,'#283443');
 table(g,-3.65,-.9,3.3,.8,'#243144',.8);
 for(let i=0;i<3;i++)monitor(g,-4.7+i*.98,1.05,-1.55,0,.8);
 for(const x of[-4.35,-2.95]){chair(g,x,-.4);hosts(v,x,-.4,'seated')}
 v.camera.set(6.5,5.2,10.5);v.focus.set(-.6,.9,-.5);
}

// Only the layouts whose role/count corrections are supported by the audit.
// Unknown historical details are kept in research/stage-audit415-*.json.
export function auditedSet415(cfg){
 const ids=['sepetini-koru','on-dokuz','esim-yapar','saba-ile-oyuna-geldik','herkes-kazanir','ilk-bulusma','sansli-masa','gel-hemserim','telefon-kulubesi'];
 if(!ids.includes(cfg.id))return null;
 const v=baseWorld(cfg),g=v.scene,a=cfg.accent;
 if(cfg.id==='sepetini-koru'){
  g.background=new T.Color('#282139');
  box(g,0,-.06,-.2,12,.12,9,'#b8b0b0');
  for(let i=-5;i<=5;i++)box(g,i,.006,-.2,.012,.009,9,'#e4ded9');
  box(g,0,2,-4.3,11,4,.12,'#6d6879');
  for(const x of[-4.7,-2.9,2.9,4.7]){shelf(g,x,-3.95,'#d7d3ce');box(g,x,2.6,-4.02,1.5,.07,.65,'#ecd7af')}
  plate(g,'ŞANSA DAVET',0,2.9,-4.15,3.4,.75,'#3e3259','#fff1d2');
  for(let i=0;i<4;i++){
   const x=-1.55+i*1.4,z=-.75+Math.abs(i-1.5)*.25;
   chair(g,x,z,0,false,['#69466d','#526780','#8f5968','#665c86'][i]);
   person(v,x,z,'seated');
  }
  chair(g,-3.25,1.05,0,false,'#52394d');hosts(v,-3.25,1.05,'seated');
  table(g,.35,1.3,3.1,1.1,'#847180',.42);
  for(let i=0;i<4;i++){box(g,3.9,.3+i*.25,-.15,.9,.46,.72,['#d6bd92','#a7b8c8','#d5cbb7','#b5a3c0'][i]);}
  v.camera.set(.4,3.45,9.5);v.focus.set(0,.85,-.35);
 }else if(cfg.id==='on-dokuz'){
  for(const x of[-1.35,1.35]){lectern(g,x,1,a,1.4);person(v,x,.7)}
  hosts(v,-3.8,1.4);
  table(g,0,-2.65,6.7,.85,'#534080',.9);
  for(let i=0;i<5;i++){const x=(i-2)*1.25;chair(g,x,-3.2);person(v,x,-3.2,'seated','panel',{name:'Muhteşem 5’li · '+(i+1)})}
  plate(g,'MUHTEŞEM 5’Lİ',0,2.65,-5.35,5,.55,'#33234d');
  v.focus.set(0,1,-.6);v.camera.set(.3,4.3,11.4);
 }else if(cfg.id==='esim-yapar'){
  table(g,0,.95,6,.95,'#794d79',.76);
  for(let i=0;i<4;i++){
   const x=(i-1.5)*1.55;chair(g,x,.15);person(v,x,.15,'seated','contestant',{gender:i%2?'female':'male',team:i});
   box(g,x,1.35,-3.6,1.4,2.7,.055,'#9ed4ef',{transparent:true,opacity:.09});
   for(const dx of[-.72,.72])box(g,x+dx,1.35,-3.55,.035,2.7,.06,'#c4cbd5');
   chair(g,x,-3.9);person(v,x,-3.9,'seated','contestant',{gender:i%2?'male':'female',team:i});
  }
  hosts(v,-3.8,1.5);v.camera.set(.4,4.5,11);v.focus.set(0,1,-1.4);
 }else if(cfg.id==='saba-ile-oyuna-geldik'){
  for(const side of[-1,1]){
   sofa(g,side*2.2,-1,3.9,side<0?'#654b9b':'#b96593');
   for(let i=0;i<4;i++)person(v,side*2.2+(i-1.5)*.9,-.92,'seated','contestant',{team:side<0?0:1});
  }
  hosts(v,0,1.5);table(g,0,.3,1.2,.7,'#a67aad',.45);
  v.camera.set(.3,3.9,11);v.focus.set(0,1,-.8);
 }else if(cfg.id==='herkes-kazanir'){
  for(let i=0;i<5;i++){
   const x=(i-2)*1.55;
   for(let step=0;step<10;step++)box(g,x,.015,1.7-step*.55,1.3,.03,.49,step%2?'#254e71':'#396b8a');
   lectern(g,x,-2.8,a,.9);person(v,x,-3.1);
  }
  hosts(v,-3.6,2.5);v.camera.set(.5,6.9,12);v.focus.set(0,.6,-.6);
 }else if(cfg.id==='ilk-bulusma'||cfg.id==='sansli-masa'){
  g.background=new T.Color('#cbbca9');box(g,1,0,0,12,.1,10,'#9c765a');
  box(g,1,1.7,-5,12,3.4,.12,'#d5c2a8');
  for(const x of[.6,3.8]){box(g,x,2,-4.9,1.8,1.8,.04,'#799ba9');shelf(g,x,-4.3)}
  table(g,2.1,.7,2.5,1.4,'#6d4834',.74);
  for(const x of[1.35,2.85]){chair(g,x,.1);person(v,x,.1,'seated',x===1.35?'contestant':'companion',{name:x===1.35?'Yarışmacı':'Masa arkadaşı'})}
  for(const x of[1.35,2.85])cyl(g,x,.85,.7,.17,.025,'#f0e9df');
  controlRoom(v);
 }else if(cfg.id==='telefon-kulubesi'){
  g.background=new T.Color('#a1bac7');box(g,0,-.05,0,24,.1,24,'#7e8586');
  for(let i=0;i<6;i++){const x=-7+i*2.8;box(g,x,1.8,-6.5,2.5,3.6,2,'#bca88b');box(g,x,1.8,-5.45,.8,1.4,.04,'#4f6a75')}
  for(const x of[-.7,.7])for(const z of[-.6,.6])box(g,x,1.3,z,.065,2.6,.065,'#b89f52');
  box(g,0,2.6,0,1.5,.12,1.4,'#b89f52');box(g,0,1.5,-.6,.24,.42,.1,'#29343c');
  person(v,0,.05);v.camera.set(3.3,3.1,7.5);
 }else if(cfg.id==='gel-hemserim'){
  g.background=new T.Color('#9eb9ca');box(g,0,-.09,0,28,.16,26,'#b6a58b');
  for(let i=0;i<7;i++){const x=(i-3)*2.5;box(g,x,1.9,-7,2.3,3.8,2.2,'#e0d0b5');box(g,x,2,-5.85,.7,1.2,.04,'#58787f')}
  cyl(g,0,.07,0,4.6,.15,'#568268');ring(g,4.5,.16,a);
  hosts(v,-2.5,1);lectern(g,1.2,.5,a,1.15);person(v,1.2,.2);
  plate(g,'GEL HEMŞERİM',0,3.2,-4.8,5,.8,'#256747');
  v.camera.set(.3,4,10.4);
 }
 return v;
}
