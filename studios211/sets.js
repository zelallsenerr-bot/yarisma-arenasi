import {luckSet441} from './luck441.js?v=441';
import {sabaSet433} from './saba433.js?v=511';
import {runwaySet432} from './runway432.js?v=478';
import {datingSet431} from './dating431.js?v=479';
import {honeycombSet430} from './honeycomb430.js?v=430';
import {doorsSet429} from './doors429.js?v=439';
import {eliminationSet428} from './elimination428.js?v=446';
import {riskSet426} from './risk426.js?v=438';
import {familySet425} from './family425.js?v=425';
import {trustSet423} from './trust423.js?v=424';
import {floorSet422} from './floor422.js?v=422';
import {loungeSet421} from './lounge421.js?v=421';
import {moneySet420} from './money420.js?v=420';
import {familySet417} from './family417.js?v=418';
import {auditedSet415} from './sets415.js?v=418';
import * as T from '../vendor/three175/three.module.js';
import{baseWorld,box,cyl,ring,plate,chair,lectern,monitor,table,buzzer,sofa,shelf,mat}from'./kit.js?v=420';
const slot=(v,x,z,pose='standing',host=false,y=0)=>{const s={x,z,pose,y};(host?v.hostSlots:v.playerSlots).push(s);return s};
const host=(v,x=-3.2,z=1,pose=v.cfg.hostPose)=>slot(v,x,z,pose,true);
function podiums(v,n,z=0,span=6,pairs=false){for(let i=0;i<n;i++){const x=n===1?1.3:(i/(n-1)-.5)*span;lectern(v.scene,x,z,v.cfg.accent,pairs?1.6:.92);slot(v,x,z-.25);if(pairs)slot(v,x+.48,z-.25)}}
function tiles(v,cols,rows,x=0,y=1.4,z=-5.3,w=6.7,h=2.2){for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const m=box(v.scene,x+(i-(cols-1)/2)*w/cols,y+(rows-1-j)*h/rows,z,w/cols*.92,h/rows*.88,.09,j%2?'#1a3356':'#2a4572');v.led.push(m)}}
function kitchens(v,n){for(let i=0;i<n;i++){const x=(i%4-1.5)*1.8,z=-2.1+Math.floor(i/4)*1.65,t=table(v.scene,x,z,1.55,.8,['#406c8c','#aa4e4e','#628d73','#c0925c'][i%4],.91);box(t,.25,1,0,.48,.045,.42,'#18212d');for(const bx of [.12,.37])for(const bz of [-.11,.12])ring(t,.075,1.03,'#42494f',.01,bx,bz);cyl(t,-.45,1.07,.05,.16,.12,'#a6b1ba');slot(v,x,z-.38)}for(let i=-3;i<=3;i++)shelf(v.scene,i*1.75,-5.3,'#5c4539')}
function home(v,k){const g=v.scene;g.background=new T.Color('#c8b8a7');box(g,0,1.8,-5.2,12,3.6,.13,'#c6b7a3');box(g,-5.8,1.8,-1.4,.13,3.6,7.4,'#d8ccbe');box(g,0,-.06,0,12,.12,10,'#9f7858');for(let x=-5;x<6;x+=.45)box(g,x,.005,0,.008,.006,10,'#bd9472');box(g,-3,2,-5.08,1.8,1.9,.04,'#6d98ac');shelf(g,4.5,-4.6);sofa(g,2,-2,2.9,'#a17f6d');box(g,2,.04,-.8,3.8,.04,2.3,'#b6a183');if(k==='dining'||k==='restaurant-control'){table(g,0,.9,3.1,1.6,'#6e4932',.78);for(let i=0;i<5;i++){const x=(i%3-1)*.85,z=i<3?.3:1.7;chair(g,x,z);slot(v,x,z,'seated');cyl(g,x,.9,i<3?.6:1.2,.19,.025,'#f1eee5')}host(v,-2.6,1.1,'standing')}else{table(g,-2,-1,2.5,1,'#c7c4bc',.9);slot(v,1.2,1);if(v.cfg.host)host(v,-1.5,.8)}if(k==='restaurant-control'||k==='prank-control'){v.hostSlots=[];table(g,-3,-.8,2.8,.75,'#253344',.85);for(let y=0;y<2;y++)for(let x=0;x<2;x++)plate(g,'●',-3.6+x*1.2,1.2+y*.7,-2.3,1.1,.6,'#17364b','#b2d7de');chair(g,-3.5,-1.2);host(v,-3.5,-1.2,'seated');if(k==='restaurant-control'){chair(g,-2.5,-1.2);host(v,-2.5,-1.2,'seated')}}}
export function buildSet(cfg){if(cfg.id==='sans-kapiyi-calinca')return luckSet441(cfg);if(cfg.id==='saba-ile-oyuna-geldik')return sabaSet433(cfg);if(cfg.id==='iste-benim-stilim')return runwaySet432(cfg);if(cfg.id==='kismet-locasi')return datingSet431(cfg);if(cfg.id==='altin-petek')return honeycombSet430(cfg);if(cfg.id==='kapi-kapanmadan')return doorsSet429(cfg);if(cfg.id==='ortak-kasa')return eliminationSet428(cfg);if(cfg.id==='risk-meydani')return riskSet426(cfg);if(cfg.id==='aile-meydani')return familySet425(cfg);if(cfg.id==='guven-cizgisi')return trustSet423(cfg);if(cfg.id==='alan-hakimi')return floorSet422(cfg);if(cfg.id==='sepetini-koru')return loungeSet421(cfg);if(cfg.id==='para-kapani')return moneySet420(cfg);const audited=auditedSet415(cfg);if(audited)return audited;const v=baseWorld(cfg),g=v.scene,a=cfg.accent,k=cfg.layout;
if(k==='millionaire'){
 v.camera.set(0,4.1,10.8);v.focus.set(0,1.0,-1.4);
 g.background=new T.Color('#020207');
 cyl(g,0,-.06,0,4.35,.14,'#111020');ring(g,4.3,.025,'#e6a14b',.055);ring(g,4.12,.026,'#6e59cf',.035);
 const c=document.createElement('canvas');c.width=c.height=1024;const cx=c.getContext('2d');cx.fillStyle='#101329';cx.fillRect(0,0,1024,1024);cx.translate(512,512);for(let n=0;n<24;n++){cx.save();cx.rotate(n*Math.PI/12);cx.strokeStyle=n%2?'#b7bbd4':'#f2c56e';cx.lineWidth=n%2?2:4;cx.beginPath();cx.moveTo(0,0);cx.lineTo(0,490);cx.stroke();cx.restore()}for(let n=0;n<8;n++){cx.save();cx.rotate(n*Math.PI/4);cx.strokeStyle='#f4cb73';cx.lineWidth=6;cx.beginPath();cx.ellipse(0,-200,62,260,.38,0,Math.PI*2);cx.stroke();cx.restore()}cx.strokeStyle='#d7c9a4';cx.lineWidth=5;cx.beginPath();cx.arc(0,0,485,0,Math.PI*2);cx.stroke();const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;const med=new T.Mesh(new T.CircleGeometry(4.08,96),new T.MeshBasicMaterial({map:tx}));med.rotation.x=-Math.PI/2;med.position.y=.03;g.add(med);
 for(const side of[-1,1])for(let row=0;row<4;row++){
 const rad=5.0+row*.72;const points=[];for(let j=0;j<=28;j++){const t=j/28*.8+.1,x=side*(2.0+Math.sin(t)*rad*.66),z=-2.9-Math.cos(t)*rad*.4-row*.3;points.push(new T.Vector3(x,.15+row*.48,z));if(j%3===0)box(g,x,row*.24-.05,z,.75,.3+row*.48,.68,'#090c1c')}
 const rail=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),28,.022,4,false),mat('#163dff',{emissive:'#142fff',emissiveIntensity:1.8}));g.add(rail);
 }
 // Blue stair lights on both audience wings.
 for(const side of[-1,1])for(let row=0;row<7;row++){box(g,side*(4.4+row*.19),.13+row*.22,-2.8-row*.4,.85,.08,.36,'#243bff',{emissive:'#172fff',emissiveIntensity:1.7})}
 for(const x of[-1.35,1.35]){chair(g,x,.15,x<0?.8:-.8,true,'#13131b');const q=new T.Group();q.position.set(x<0?-.56:.56,0,.13);q.rotation.z=x<0?-.16:.16;g.add(q);box(q,0,.66,0,.28,1.3,.32,'#1936e5',{emissive:'#0b1bbf',emissiveIntensity:.4});monitor(q,0,1.24,0,x<0?-.35:.35,.78)}
 cyl(g,0,.07,.15,.9,.1,'#080b1f');ring(g,.9,.13,'#1946ff');host(v,1.35,.15,'seated');slot(v,-1.35,.15,'seated');
 box(g,0,2.35,-6.7,3.4,4.6,.15,'#231a38');for(const x of[-1.85,1.85]){box(g,x,2.3,-6.5,.18,4.7,.17,'#d18a36');box(g,x*.91,2.3,-6.38,.16,4.5,.1,'#203aff',{emissive:'#1a24ff',emissiveIntensity:1.1})}plate(g,'MİLYONER',0,2.65,-6.52,2.8,.65,'#201b3f','#e9cf8d');
 for(const y of[5.1,5.8]){ring(g,6.5,y,'#bf7d37',.06,0,-1.3);ring(g,6.42,y-.13,'#243cff',.04,0,-1.3)}
}
else if(k==='money'||k==='double-money'){for(let i=0;i<4;i++){const x=(i-1.5)*1.35;table(g,x,.15,1.26,.95,'#f0f0eb',.95);v.led.push(box(g,x,1.03,.17,1.12,.025,.75,'#bc2c3d'));monitor(g,x,1.07,-.35,0,.7);for(let b=0;b<4;b++){box(g,x+(b%2-.5)*.32,1.09+Math.floor(b/2)*.07,.18,.29,.065,.16,'#aec3a3');box(g,x+(b%2-.5)*.32,1.125+Math.floor(b/2)*.07,.18,.045,.005,.165,'#e3d6bc')}}slot(v,0,1.6);slot(v,1.05,1.6);host(v,-3.25,-.35);if(k==='double-money'){box(g,0,1.6,-5.4,2.4,2.7,.2,'#6d5b39');for(const x of[-4,4])lectern(g,x,-2.3,'#b58a36')}}
else if(k==='floor'){for(let z=0;z<10;z++)for(let x=0;x<10;x++){v.led.push(box(g,(x-4.5)*.72,.03,-3.3+z*.65,.7,.08,.63,(x+z)%4?'#1c3d67':a));slot(v,(x-4.5)*.72,-3.3+z*.65)}host(v,-.2,3.2);v.camera.set(7.7,9,12.4);v.focus.set(0,.5,0)}
else if(k==='trust'){for(const x of[-1.3,1.3]){chair(g,x,0,0,false,'#a42e49');table(g,x,.6,.8,.65,'#b8bec7',.68);buzzer(g,x,.79,.6);slot(v,x,0,'seated')}host(v,0,-2.1);for(const x of[-1.3,1.3])box(g,x,.02,-.4,.08,.03,3,'#b0bad4')}
else if(k==='family'){for(const x of[-2.3,2.3]){table(g,x,-1.1,3.2,.7,a,.95);for(let i=0;i<4;i++)slot(v,x+(i-1.5)*.7,-1.5)}table(g,0,.9,.85,.85,'#bdd1df',.95);buzzer(g,-.2,1.06,.9);buzzer(g,.2,1.06,.9);host(v,0,-.1);tiles(v,1,6,0,1.1,-5.2,3.7,1.9)}
else if(k==='ring'){for(let i=0;i<9;i++){const t=(i/9-.5)*Math.PI*1.5,x=Math.sin(t)*3.4,z=-Math.cos(t)*3.4+.3,p=lectern(g,x,z,a,.75);p.rotation.y=-t;slot(v,x,z-.15)}lectern(g,0,1,'#777f8f');host(v,0,.7);ring(g,3.7,.02,a)}
else if(k==='risk'){podiums(v,3,0,4);host(v,-3.6,-1);lectern(g,-3.6,-.7,a);tiles(v,6,5,0,1.1,-5.2,7.6,2.3)}
else if(k==='wheel'){const wg=new T.Group();wg.position.set(0,.85,.6);g.add(wg);for(let i=0;i<24;i++)wg.add(new T.Mesh(new T.CylinderGeometry(1.6,1.6,.12,4,1,false,i*Math.PI/12,Math.PI/12),mat(['#d45b70','#c6aa4d','#4f83be','#7a5db6'][i%4])));for(let i=0;i<3;i++)slot(v,(i-1)*1.4,-.7);host(v,-3.3,.8);tiles(v,12,3,0,1.55,-5.3,7.7,1.65)}
else if(k==='letters-numbers'){table(g,-2.5,-1.3,2.2,1,'#874d42',.83);chair(g,-2.5,-1.7);host(v,-2.5,-1.7,'seated');for(const x of[.5,2.5]){table(g,x,.3,1.6,.85,'#4b5f79',.83);chair(g,x,-.1);slot(v,x,-.1,'seated')}tiles(v,9,1,0,2.1,-5.3,6.5,.75)}
else if(k==='alphabet'){for(const x of[-2,2]){table(g,x,-.3,2.5,.7,'#594c92',.82);for(const dx of[-.65,0,.65]){chair(g,x+dx,-.7);slot(v,x+dx,-.7,'seated')}}host(v,0,1);for(let i=0;i<29;i++){const t=i/29*Math.PI*2;plate(g,'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'[i]||'',Math.sin(t)*1.45,2.1+Math.cos(t)*1.45,-5.5,.26,.26,'#365d9a')}}
else if(['dining','restaurant-control','living-room','cleaning','renovation','doorstep','prank-control','reality'].includes(k)){home(v,k);if(k==='cleaning'){for(let i=0;i<4;i++){const x=1+(i%2)*1.25,z=-2+Math.floor(i/2)*.9;(v.supportSlots??=[]).push({x,z,y:0,pose:'seated',role:'rival',name:'Rakip '+(i+1)})}box(g,-3.4,.42,.7,.8,.8,.55,'#94b0a3');for(let i=0;i<4;i++)cyl(g,-3.6+i*.15,1,.7,.07,.24,'#d7ba7e')}if(k==='renovation')plate(g,'EV PLANI',0,2,-5,2,.7,'#d9d4c7','#594d41');if(k==='reality')for(const x of[-2,0,2]){chair(g,x,1);slot(v,x,1,'seated')}}
else if(k==='masterchef'||k==='taste'||k==='brides-kitchen'){kitchens(v,k==='masterchef'?20:k==='taste'?12:4);table(g,0,2.7,k==='brides-kitchen'?4.1:5.4,.9,k==='brides-kitchen'?'#b34768':'#352a25',1);if(k==='brides-kitchen'){host(v,0,1.1);for(let i=0;i<4;i++){const x=(i-1.5)*1.2;chair(g,x,-4.4,0,false,'#ca7ba6');(v.supportSlots??=[]).push({x,z:-4.4,y:0,pose:'seated',role:'mother',gender:'female',name:'Kayınvalide '+(i+1),portrait415:[13,15,19,21][i]})}}else{for(let i=0;i<(k==='masterchef'?3:4);i++){const x=(i-(k==='masterchef'?1:1.5))*1.2;if(k==='taste'&&i)chair(g,x,2.2);host(v,x,2.2,k==='masterchef'||i===0?'standing':'seated')}box(g,0,3,-4.7,10,.16,1,'#6b5647');v.camera.set(6.4,6.3,12.2);v.focus.set(0,.8,-.8)}}
else if(k==='word'){table(g,0,.2,2.5,.85,'#f2f0e9',.97);host(v,-1.3,-.2);slot(v,1.15,-.2);buzzer(g,.8,1.08,.35);tiles(v,7,2,0,1.8,-5.3,5.8,1.1)}
else if(k==='password'){v.camera.set(0,2.8,7.2);v.focus.set(0,1.25,-.8);const sh=new T.Shape();sh.absarc(0,0,2.65,.15*Math.PI,.85*Math.PI,false);sh.lineTo(Math.cos(.85*Math.PI)*1.85,Math.sin(.85*Math.PI)*1.85);sh.absarc(0,0,1.85,.85*Math.PI,.15*Math.PI,true);sh.closePath();const m=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:.12,bevelEnabled:true,bevelSize:.025,bevelThickness:.02,bevelSegments:2,steps:1,curveSegments:32}),mat('#142135'));m.rotation.x=Math.PI/2;m.position.set(0,1.02,-1.5);g.add(m);for(const x of[-2,-.9,.9,2]){box(g,x,.5,.3,.45,1,.32,'#213752');box(g,x,.67,.48,.38,.44,.03,a);chair(g,x,-.2,0,true);slot(v,x,-.2,'seated')}lectern(g,0,-2.5,a,1.1,1.1);host(v,0,-2.7);for(let i=-5;i<=5;i++)box(g,i,2,-5.1,.16,3.7,.1,i%2?'#d7b44f':'#598cb8')}
else if(k==='dating'){for(let z=0;z<10;z++)for(let x=0;x<12;x++)box(g,(x-5.5)*.8,.015,(z-4.5)*.8,.8,.025,.8,(x+z)%2?'#10151c':'#e3e4dd');for(const x of[-1.3,1.3]){chair(g,x,.4,0,false,'#df732f');slot(v,x,.4,'seated')}chair(g,-3.1,1,0,false,'#df732f');host(v,-3.1,1,'seated');for(const x of[-3.7,0,3.7]){sofa(g,x,-3.6,2.8,'#cc6f35');for(let j=0;j<3;j++)(v.supportSlots??=[]).push({x:x+(j-1)*.7,z:-3.5,y:0,pose:'seated',role:'waiting-suitor',name:'Locadaki aday '+(j+1)})}}
else if(k==='party'){sofa(g,-2,-.5,2.6,'#584b9b');sofa(g,2,-.5,2.6,'#bc6999');for(const x of[-2.4,-1.6,1.6,2.4])slot(v,x,-.4,'seated');host(v,0,1);table(g,0,.2,1.2,.65,'#ba7598',.55)}
else if(k==='honeycomb'){for(let j=0;j<4;j++)for(let i=0;i<7;i++){const m=new T.Mesh(new T.CylinderGeometry(.35,.35,.1,6),mat((i+j)%3?a:'#dac07b'));m.rotation.x=Math.PI/2;m.position.set((i-3)*.68+(j%2)*.34,1.1+j*.58,-5.25);g.add(m)}lectern(g,-1.5,0,a);lectern(g,1.5,0,a);host(v,-1.5,-.2);slot(v,1.5,-.2)}
else if(k==='crossword'){podiums(v,4,.2,6);table(g,-3.4,-2.1,1.5,.8,'#792b3b',.86);host(v,-3.4,-2.5);tiles(v,10,2,0,1.8,-5.3,7,1.4)}
else if(k==='pyramid'){for(const x of[-2.2,2.2]){table(g,x,.1,2.1,.8,a);slot(v,x-.35,-.25);(v.supportSlots??=[]).push({x:x+.35,z:-.25,y:0,pose:'standing',role:'coach',name:x<0?'Koç · Evrim Akın':'Koç · Sertan Erkaçan',gender:x<0?'female':'male'})}host(v,0,1.2);for(let row=0;row<4;row++)for(let col=0;col<=row;col++)plate(g,'',(col-row/2),3.7-row*.55,-5.3,.9,.47,'#a47735')}
else if(k==='history'){for(const[x,z]of[[-2,0],[1.9,0],[-2.9,-2.6]])lectern(g,x,z,'#d5e0df',1.35);host(v,-2,-.25);host(v,-2.9,-2.85);slot(v,1.9,-.25);tiles(v,3,5,2.6,1.1,-5.2,2.9,2.4)}
else if(k==='piggybank'){for(const x of[-1.5,1.5])chair(g,x,.3,0,true,'#d9dce2');table(g,0,0,.65,.65,a,.95);host(v,-1.5,.3,'seated');slot(v,1.5,.3,'seated');tiles(v,3,4,0,1.15,-5.3,2.8,2.5)}
else if(k==='booth'){for(const x of[.57,1.83])for(const z of[-.33,.93])box(g,x,1.2,z,.055,2.4,.055,'#d7b455');box(g,1.2,2.4,.3,1.4,.1,1.4,'#d7b455');for(const x of[.55,1.85])box(g,x,1.2,.3,.02,2.3,1.25,'#97bfd7',{transparent:true,opacity:.13});box(g,1.2,1.4,-.27,.23,.4,.1,'#343c44');slot(v,1.2,.3)}
else if(k==='boxes'){
 v.camera.set(.25,6.9,12.0);v.focus.set(0,.95,-1.2);g.background=new T.Color('#120c28');
 box(g,0,-.14,0,17,.2,16,'#3c3a47');
 for(const x of[-.82,.82]){box(g,x,-.025,-2.1,.55,.035,7.8,'#daf6ff',{emissive:'#a4dcff',emissiveIntensity:.9})}
 cyl(g,0,-.025,1.55,2.25,.14,'#ecebef');ring(g,2.18,.055,'#d9edff',.12,0,1.55);ring(g,1.79,.058,'#4b4e5b',.22,0,1.55);
 const names=['Cem','Zeynep','Murat','Elif','Emre','Selin','Oğuz','Derya','Berk','İpek','Kaan','Seda','Can','Nehir','Onur','Buse','Arda','Ceren','Kerem','Sıla','Deniz','Yasemin'];
 for(let i=0;i<22;i++){const side=i<11?-1:1,j=i%11,angle=.23+j*.108,x=side*Math.sin(angle)*7.0,z=-Math.cos(angle)*3.1-1.3;const unit=new T.Group();unit.position.set(x,0,z);unit.rotation.y=-side*(angle*.35);g.add(unit);
 box(unit,0,.59,0,.72,1.13,.65,'#ec6d25');for(const y of[.2,.54,.88]){box(unit,0,y,.34,.69,.18,.045,'#ff8b3e',{emissive:'#ff5e19',emissiveIntensity:.35});box(unit,0,y-.12,.345,.7,.035,.05,'#f4c4a5')}
 box(unit,0,1.19,0,.76,.09,.77,'#e5e6ec');plate(unit,names[i].toLocaleUpperCase('tr'),0,.96,.375,.65,.23,'#2874e9','#e4f2ff');
 const q=box(unit,0,1.39,0,.5,.3,.35,'#555c68');q.rotation.x=-.12;plate(unit,String(i+1),0,1.4,.188,.28,.17,'#333c4e','#e6debb');box(unit,0,1.57,0,.18,.035,.04,'#151925');
 if(i<21){/* Rear standing riser keeps the other contestants visible above their cases. */
 const rearZ=z-.62;box(g,x,.22,rearZ,.82,.44,.72,'#353247');box(g,x,.455,rearZ+.34,.82,.035,.045,'#9fc8ff',{emissive:'#6c9dff',emissiveIntensity:.5});
 const q={x:x+Math.sin(unit.rotation.y)*(-.52),z:z+Math.cos(unit.rotation.y)*(-.52),counter438:{x,z,rotation:unit.rotation.y},y:.46,pose:'standing',role:'case-holder',name:names[i],gender:i%2?'female':'male'};(v.supportSlots??=[]).push(q)}}
 for(const side of[-1,1]){box(g,side*4.35,2.55,-5.65,6.8,3.05,.16,'#091733');box(g,side*4.35,3.98,-5.5,6.8,.12,.1,'#7047eb',{emissive:'#6c34f0',emissiveIntensity:.7});box(g,side*4.35,1.1,-5.5,6.8,.11,.1,'#248bfa');plate(g,'VAR MISIN',side*4.35-.8,2.85,-5.5,2.15,.7,'#b29357','#431d22');plate(g,'YOK MUSUN',side*4.35+1.45,2.85,-5.5,2.15,.7,'#5f2438','#f3e5df')}
 box(g,0,2.3,-5.38,1.65,4.65,.3,'#261e49');for(const x of[-.88,.88])box(g,x,2.3,-5.24,.08,4.7,.1,'#a16cff');const prizes=['1','5','10','25','50','100','250','500','1.000','5.000','10.000','25.000','50.000','100.000','250.000','500.000','750.000','1.000.000','2.000.000','3.000.000','5.000.000','5.000.000'];for(let i=0;i<11;i++)for(const side of[-1,1])plate(g,prizes[i+(side>0?11:0)],side*.4,4.35-i*.35,-5.18,.74,.29,side<0?'#126abb':'#bf502a','#fff2d7');
 cyl(g,0,.58,1.55,.28,1.05,'#2b303c');for(const y of[.2,.48,.76])ring(g,.3,y,'#c1cbd6',.023,0,1.55);cyl(g,0,1.16,1.55,.95,.12,'#e4e4e9');ring(g,.94,1.23,'#eee0ba',.027,0,1.55);
 box(g,0,1.41,1.55,.55,.36,.38,'#4b515c');plate(g,'SENİN KUTUN',0,1.41,1.75,.45,.18,'#353d4d','#f1dab5');box(g,0,1.62,1.55,.2,.035,.04,'#111827');box(g,-.6,1.25,1.68,.22,.06,.13,'#242833');
 for(const x of[-1.2,1.2])chair(g,x,1.55,x<0?.9:-.9,true,'#151823');host(v,-1.2,1.55,'seated');slot(v,1.2,1.55,'seated');v.primaryPlayer414=v.playerSlots.length-1;
}

else if(['nineteen','inout'].includes(k)){const n=k==='inout'?14:19;for(let i=0;i<n;i++){const x=(i%10-4.5)*.7,z=-2.7-Math.floor(i/10)*.8;lectern(g,x,z,a,.62,.55);box(g,x,.77,z,.48,.35,.35,i%3?'#4378bd':'#a43b4d');plate(g,String(i+1),x,.78,z+.19,.38,.18,'#1c345a');if(k==='boxes'&&i<8)slot(v,x,z-.27)}table(g,0,.7,2.3,1.1,a);host(v,-1.4,.1);slot(v,1.1,.1);if(k==='boxes')buzzer(g,.3,1.05,.8)}
else if(k==='wall'){box(g,0,0,2.4,7,.05,1.7,'#248da5');box(g,0,1.35,-2.7,6,2.7,.23,'#58aec1');for(const x of[-2,0,2]){box(g,x,1,-2.55,.45,1.8,.1,'#091927');slot(v,x,.6)}for(const x of[-2,0,2])slot(v,x,-.8);host(v,-3.8,0)}
else if(k==='blondes'){
 v.supportSlots??=[];v.blondePanel418=[];
 box(g,0,-.09,-1,12,.16,13,'#10192b');box(g,0,2.1,-7.4,12,4.6,.12,'#071025');
 for(const y of[.6,1.6,2.6,3.6])box(g,0,y,-7.3,11,.035,.035,'#315d91');
 plate(g,'50 SARIŞIN',0,4.05,-7.25,4.5,.55,'#172746','#d7c396');
 let n=0;
 for(let row=0;row<8;row++){
  const count=row<7?7:1,y=row*.25,z=-.8-row*.7,width=count===7?8:1.2;
  box(g,0,y*.5-.03,z,width,y+.15,.68,'#233451');box(g,0,y+.065,z+.35,width,.035,.035,'#c7ad77');
  for(let col=0;col<count;col++){
   const x=count===7?(col-3)*1.04:0,desk=new T.Group();desk.position.set(x,y,z+.27);g.add(desk);
   box(desk,0,.79,0,.85,.06,.42,'#c1c9d6');box(desk,0,.42,0,.5,.7,.24,'#315d91');box(desk,0,.43,.13,.38,.38,.025,'#668dc3');
   const opponent={x,z:z-.1,y:y+.06,pose:'seated',role:'blonde-opponent',blonde:true,gender:'female',name:(n+1)+'. sarışın yarışmacı',blondePortrait418:(n*7+row*3)%20,tier418:row};
   v.supportSlots.push(opponent);v.blondePanel418.push(opponent);n++;
  }
 }
 host(v,-2.6,2.6);lectern(g,1.6,2.65,a,1.2);slot(v,1.6,2.32);v.primaryPlayer414=0;
 v.camera.set(6.4,7.1,13.9);v.focus.set(0,1.2,-1.5);
}
else if(k==='chase'){table(g,-.7,1.1,4.2,.8,a);for(let i=0;i<3;i++)slot(v,-1.9+i*1.2,.7);box(g,3.4,.4,-2.4,1.8,.8,1.3,'#19253b');chair(g,3.4,-2.3);(v.supportSlots??=[]).push({x:3.4,z:-2.3,y:.8,pose:'seated',role:'chaser',name:'Takipçi · Muhsin Divan'});host(v,-3.2,0);for(let i=0;i<18;i++)box(g,(i-8.5)*.38,2.2,-5.35,.34,.38,.1,i<3?'#d9ab4a':a)}
else if(k==='cash-room'){box(g,2,1.35,-1.5,3,2.7,.04,'#7190a1',{transparent:true,opacity:.14});for(const x of[.5,3.5])box(g,x,1.35,-1.5,.07,2.7,.1,'#a8b4bd');for(let i=0;i<5;i++){lectern(g,.9+i*.5,-1.1,'#bba960',.4,.65);box(g,.9+i*.5,.85,-1.1,.3,.2,.25,'#b3c69d')}table(g,-2,.6,2,.8,a,.87);host(v,-2,.1);for(let i=0;i<3;i++){const x=-2.9+i*1.15;slot(v,x,1.15);lectern(g,x,1.5,a,.85)}}
else if(k==='negotiation'){for(let i=0;i<3;i++){const t=i/3*Math.PI*2,x=Math.sin(t)*1.6,z=Math.cos(t)*1.4;table(g,x,z,1.6,.8,'#27965a',.92);slot(v,x*1.3,z*1.3)}}
else if(k==='endurance-circle'){ring(g,1.75,.06,'#e0ad54',.065);for(let i=0;i<5;i++)slot(v,Math.sin(i*1.257)*1.1,Math.cos(i*1.257)*1.1)}
else if(k==='many-quiz'){for(let row=0;row<2;row++)for(let i=0;i<5;i++){const x=(i-2)*1.4,z=-.3-row*2.1;chair(g,x,z,0,false,i%2?'#cb7836':'#376ca6');slot(v,x,z,'seated');monitor(g,x,.62,z+.45,0,.45)}host(v,-2.8,2)}
else if(k==='supermarket'||k==='market'){for(const x of[-4,-2,2,4]){shelf(g,x,-3.8);shelf(g,x,-1.7)}table(g,0,1,2.5,.9,'#b9465e');if(k==='supermarket'){for(let i=0;i<5;i++)box(g,1.6+i*.18,.7,0,.025,.6,.7,'#9ba8af');for(const z of[-.35,.35])box(g,2,.4,z,.9,.04,.04,'#9ba8af');for(const x of[1.65,2.35])for(const z of[-.3,.3])cyl(g,x,.13,z,.1,.08,'#18202a')}host(v,-1.5,1.7);slot(v,1.4,1);slot(v,2.5,1)}
else if(k==='farm'){g.background=new T.Color('#b8d3d5');box(g,0,-.08,0,30,.15,30,'#667d4b');box(g,-2,1.4,-5,5,2.8,2.8,'#a76c42');box(g,-2,3,-5,5.5,.2,3.4,'#744431');for(let i=-6;i<=6;i++){box(g,i*.7,.55,-2.5,.1,1.1,.1,'#c9b99a');box(g,i*.7,.4,-2.5,.7,.06,.07,'#c9b99a')}for(let i=0;i<4;i++)box(g,2+i*.65,.03,1,.4,.05,4,'#573c2d');for(let i=0;i<15;i++)slot(v,(i%5-2)*1.4,-1+Math.floor(i/5)*1.65)}
else if(k==='island'||k==='travel'){g.background=new T.Color('#a7c1cf');box(g,0,-.1,0,30,.15,30,k==='island'?'#cbb38b':'#9d9f94');if(k==='island')for(const x of[-5,5]){cyl(g,x,2,-4,.17,4,'#83643f');for(let j=0;j<8;j++){const leaf=box(g,x+Math.sin(j)*1.1,3.8,-4+Math.cos(j)*1.1,.35,.07,2.2,'#4d7856');leaf.rotation.y=j;leaf.rotation.z=.3}}else for(let i=0;i<7;i++){const x=-8+i*2.7;box(g,x,1.5,-7,2.4,3,2,'#bfaa92');box(g,x,1.7,-5.96,.6,1.1,.03,'#516f7d')}if(k==='travel'){host(v,-1.1,1);host(v,1.1,1)}else{slot(v,1,1.2);host(v,-1,1)}}
else if(k==='talent'||k==='voice'||k==='runway'){box(g,0,.08,-1.9,8,.18,4,a);box(g,0,2.7,-5.15,9,3.7,.1,'#112146');slot(v,0,-1.5);host(v,-3.5,-1.6);if(k==='runway')box(g,0,.11,1.4,1.8,.2,6,a);else if(k==='voice')for(let i=0;i<4;i++){chair(g,(i-1.5)*1.7,2.2,Math.PI,false,'#b1263e');buzzer(g,(i-1.5)*1.7+.34,.8,2.2)}else{table(g,0,2.8,6,.9,'#d1d4d9',.87);for(let i=0;i<4;i++)chair(g,(i-1.5)*1.35,3.4,Math.PI)}}
else if(k==='lingo'){podiums(v,3,0,5,true);host(v,-3.7,1.3);tiles(v,6,5,0,1.1,-5.3,4.3,2.4)}
else if(k==='doors'){for(const x of[-1.4,1.4])box(g,x,1.5,-4,2.7,3,.16,'#8b2943');box(g,0,3,-3.9,5.8,.2,.4,'#d3b464');table(g,0,.8,2.5,1,a);slot(v,.4,.3);slot(v,1.4,-3.1);host(v,-1.5,.2);for(let i=0;i<3;i++)box(g,-2+i*.7,.5,-4.5,.5,1,.5,['#bb8f50','#849da8','#a26c7c'][i])}
else if(k==='eyvah'){for(let i=0;i<10;i++){const x=i<5?-2.8:2.8,z=2.6-(i%5)*1.4;lectern(g,x,z,'#e6e6e1',.9,.75,String(i+1));cyl(g,x,.02,z,.55,.05,'#18263d');(v.supportSlots??=[]).push({x,z:z-.2,y:0,pose:'standing',role:'trapdoor-opponent',number:i+1,name:(i+1)+'. rakip'})}slot(v,0,.2);cyl(g,0,.03,.2,.7,.08,'#c5ccd3');host(v,-1.6,-2.5);v.camera.set(0,5.2,9.8)}
else if(k==='minute'){ring(g,2.5,.03,a);table(g,0,.2,2,1,'#e7e7df',.85);slot(v,0,-.3);host(v,-3,1);for(let i=0;i<5;i++)cyl(g,-.8+i*.4,1.01,.2,.09,.18,['#dc5268','#6a9bd6','#cfb84b'][i%3])}
else if(['couples','daughters','shopping-couples','variety','turnstiles'].includes(k)){for(let i=0;i<4;i++){const x=(i-1.5)*2;table(g,x,-2,1.6,.65,['#c9446b','#4f83cb','#a46aba','#e2a549'][i],.85);slot(v,x-.3,-2.4);slot(v,x+.3,-2.4)}host(v,-2.6,1);ring(g,2.2,.02,a);table(g,.7,.4,2.2,1.1,'#e7e7df',.85);if(k==='shopping-couples'){for(let j=0;j<10;j++)box(g,3+Math.sin(j*.63)*.65,1.1,.6+Math.cos(j*.63)*.65,.035,2.2,.035,'#d0b359');ring(g,.65,2.2,'#e4be59',.025,3,.6);for(let j=0;j<3;j++){const b=new T.Mesh(new T.SphereGeometry(.23,20,16),mat(['#da5776','#60a6db','#e6be50'][j]));b.position.set(2.7+j*.3,1.2,.55);g.add(b)}const wheel=new T.Mesh(new T.CylinderGeometry(.65,.65,.08,48),mat('#9f56be'));wheel.rotation.x=Math.PI/2;wheel.position.set(-3.5,1.3,0);g.add(wheel)}if(k==='turnstiles')for(const x of[-1.6,1.6]){box(g,x,.55,1,.2,1.1,.25,'#8d98aa');box(g,x,.7,1,1,.05,.05,'#d4dbe6')}}
else if(k==='joker'){host(v,-2.15,0);lectern(g,1.4,.25,'#b7954b',1.2);slot(v,1.4,-.05);for(let i=0;i<7;i++)plate(g,'JOKER',-4.1,3.1-i*.35,-4.1,.85,.28,'#174d8e','#efd795');for(let i=0;i<7;i++)plate(g,String(i+1),3.9,1.0+i*.33,-4.7,1,.27,'#8a7747','#fff1bd')}
else if(k==='picture-wall'){host(v,-2.8,1);lectern(g,1.35,.35,a,1.2);slot(v,1.35,.05);tiles(v,5,4,0,.85,-5.2,7.2,3.1);for(let i=0;i<5;i++)plate(g,String(i+1),4.3,1.1+i*.4,-4.8,.75,.3,'#745735','#f7dc8d')}
else if(k==='picture-quiz'){host(v,-3.5,1.15);const desk=table(g,0,.55,3.5,.9,'#cd433c',.94);desk.userData.sharedContestantDesk418=true;v.objects.sharedContestantDesk418=desk;for(const x of[-.65,.65])slot(v,x,.0);plate(g,'',0,2.15,-5.1,6.6,2.7,'#091c39')}
else if(k==='video-family'){familySet417(v)}
else if(k==='four-quiz'){podiums(v,4,0,6);host(v,-3.8,1.5);tiles(v,5,2,0,1.5,-5.2,7.4,2);for(let i=0;i<4;i++)buzzer(g,(i/3-.5)*6,1.13,0)}
else if(k==='elimination'){host(v,-3.7,1.2);for(let i=0;i<5;i++){const t=(i-2)*.43,x=Math.sin(t)*3.2,z=-Math.cos(t)*2.6;lectern(g,x,z,a,.88);slot(v,x,z-.25);plate(g,String(i+1),x,1.35,z+.35,.5,.3,'#432451')}table(g,0,1.4,2.5,.8,'#be9346')}
else if(k==='age'){host(v,-3.3,1);sofa(g,1,.1,2.8,'#c45d37');slot(v,.45,.15,'seated');slot(v,1.55,.15,'seated');for(let i=0;i<7;i++){const x=(i-3)*1.0;lectern(g,x,-3.3,'#635597',.8,.6,String(i+1));(v.supportSlots??=[]).push({x,z:-3.6,y:0,pose:'standing',role:'age-guest',name:'Yaş konuğu '+(i+1)})}}
else if(k==='backers'){host(v,-3.6,1.3);lectern(g,0,.45,a,1.2);slot(v,0,.15);for(let i=0;i<4;i++){chair(g,(i-1.5)*1.5,-2.7);(v.supportSlots??=[]).push({x:(i-1.5)*1.5,z:-2.7,y:0,pose:'seated',role:'backer',name:'Destekçi '+(i+1)})}plate(g,'ARKANDAYIZ',0,2.4,-5.2,5.5,1.1,'#18315b')}
else if(k==='hemserim'){host(v,-3.1,.8);slot(v,1.1,.3);for(let i=0;i<4;i++){const x=(i-1.5)*1.4,disc=cyl(g,x,1.8,-4.2,.55,.14,'#2c8c54');disc.rotation.x=Math.PI/2;plate(g,String(i+1),x,1.8,-4.05,.4,.4,'#17643b')}for(let i=0;i<14;i++){const x=(i%7-3)*.75,z=-1.4-Math.floor(i/7)*.8;box(g,x,.65,z,.55,.55,.45,'#ac7c3e');plate(g,String(i+1),x,.7,z+.24,.4,.24,'#694925')}}

else{podiums(v,Math.min(cfg.players,6),0,Math.min(7,cfg.players*1.3));host(v,-3.5,1);if(['picture-quiz','picture-wall','video-family','age'].includes(k)){plate(g,'',0,2.1,-5.35,6,1.8,'#17324f');if(k==='picture-quiz')tiles(v,4,1,0,1.7,-5.3,6.7,1.5)}if(k==='backers')podiums(v,4,-3,5);if(k==='joker'||k==='picture-wall')for(let i=0;i<10;i++)plate(g,String(i+1),4.3,1+i*.24,-4.7,.8,.2,'#75552c','#f4d68e')}

// Named jurors, waiting candidates and presenters occupy distinct positions.
if(['talent','voice','runway'].includes(k)){
 const names=k==='voice'?['Hadise','Beyazıt Öztürk','Gökhan Özoğuz','Melike Şahin']:k==='talent'?['Eda Ece','Şevval Sam','İlker Ayrık','Hande Yener']:['Ivana Sert','Güzide Duran','Nur Bilen Yavuzer'];
 for(let i=0;i<names.length;i++){
  const x=(i-(names.length-1)/2)*(k==='voice'?1.7:1.35),z=k==='voice'?2.2:3.4;
  if(k==='runway')chair(g,x,z,Math.PI);
  (v.supportSlots??=[]).push({x,z,y:0,pose:'seated',role:'juror',name:names[i],person415:names[i]});
 }
 if(k==='runway')table(g,0,2.8,4.8,.9,'#c5c5cc',.87);
 if(k==='voice'){
  v.hostSlots[0]={x:-5.7,z:-2.5,y:0,pose:'standing',name:'Saadet Özsırkıntı'};
  box(g,-4.75,1.4,-2.6,.08,2.8,3.2,'#151b2b');
  chair(g,5.7,1.8);v.hostSlots.push({x:5.7,z:1.8,y:0,pose:'seated',name:'Acun Ilıcalı'});
 }
 v.camera.set(.2,5.1,14.2);v.focus.set(0,1,.1);
}

if(!v.hostSlots.length&&cfg.host&&cfg.hostPose!=='none')host(v);if(!v.playerSlots.length&&cfg.id!=='para-bende')slot(v,1.3,1);return v}
