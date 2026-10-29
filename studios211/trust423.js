import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,plate,mat,buzzer,monitor} from './kit.js?v=423';
export function trustSet423(cfg){
 const v=baseWorld(cfg),g=v.scene;g.background=new T.Color('#03020c');v.camera.set(.2,5.1,17.2);v.focus.set(0,1.0,-.8);
 const light=(x,y,z,w,h,d,color)=>box(g,x,y,z,w,h,d,color,{emissive:color,emissiveIntensity:1});
 box(g,0,-.12,-.5,21,.22,16,'#080913');
 // White illuminated runway links both family lounges and the central red contestant bench.
 box(g,0,.02,-.9,18.5,.07,1.25,'#e5edf1',{emissive:'#bbc9ff',emissiveIntensity:.65});for(const z of[-1.5,-.28])light(0,.065,z,18.5,.025,.025,'#6987ff');
 box(g,0,.02,1.1,3.6,.07,3.3,'#e7ebf1');for(const x of[-1.77,1.77])light(x,.065,1.1,.025,.025,3.3,'#f3f5ff');
 // Two independent red seats, each with its own base and buzzer.
 v.contestantChairs424=[];
 for(let i=0;i<2;i++){const x=i?1.05:-1.05,seat=new T.Group();seat.position.set(x,0,.5);g.add(seat);v.contestantChairs424.push(seat);
 box(seat,0,.23,0,1.62,.42,1.5,'#adb4be');box(seat,0,.77,-.58,1.5,.96,.2,'#c8173a');box(seat,0,.55,0,1.48,.18,1.13,'#df1e40');
 for(const side of[-1,1]){box(seat,side*.82,.58,0,.18,1.1,1.55,'#aab4bf');box(seat,side*.82,1.08,.12,.28,.12,1.27,'#e0e4e9');for(const y of[.35,.7])box(seat,side*.82,y,.79,.185,.08,.035,'#f47c98',{emissive:'#f47c98',emissiveIntensity:.5});}
 buzzer(seat,i?.82:-.82,1.2,.55);v.playerSlots.push({x,z:.68,y:0,pose:'seated',sofa421:true,gender:i?'female':undefined});}
 v.objects.trustBench423=v.contestantChairs424[0];
 // Symmetrical family enclosures, four seated relatives on each side.
 v.supportSlots=[];v.familyLounges423=[];
 for(const side of[-1,1]){const group=new T.Group();group.position.set(side*7.7,0,-3.5);g.add(group);v.familyLounges423.push(group);
 cyl(group,0,.12,0,2.2,.2,'#dde2e8');box(group,0,.43,-.2,3.7,.65,1,'#d5dbe2');box(group,0,.73,-.2,3.5,.21,.95,'#cf173d');box(group,0,1.05,-.64,3.8,.7,.2,'#e9edf1');box(group,0,1.1,-.52,3.5,.56,.13,'#b81936');
 for(const x of[-1.95,1.95])box(group,x,.75,-.12,.24,.86,1.2,'#ecedf2');
 // White semicircle around the rear of each family area.
 const points=Array.from({length:33},(_,i)=>{const a=Math.PI+i*Math.PI/32;return new T.Vector3(Math.cos(a)*2.13,1.42,Math.sin(a)*1.25)});group.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),40,.065,8,false),mat('#f2f3ef')));
 for(let i=0;i<4;i++){const x=side*7.7+(i-1.5)*.86;v.supportSlots.push({x,z:-3.42,y:.12,pose:'seated',role:'family-member',team423:side<0?0:1,portrait415:(side<0?[3,6,13,18]:[1,8,17,20])[i],gender:i%2?'male':'female',name:(side<0?'Sol':'Sağ')+' aile · '+(i+1)});}
 // Small sculpted white family coffee table.
 const tab=cyl(group,0,.56,.92,.58,.08,'#f6f4f1');tab.scale.z=.62;box(group,0,.28,.92,.16,.52,.22,'#e6e8e9');
 }
 // Host console faces the pair from the rear right; its front has narrow red ribs.
 const desk=new T.Group();desk.position.set(0,0,3.8);g.add(desk);v.objects.hostConsole423=desk;
 box(desk,0,.68,0,1.75,1.35,1.2,'#10121c');box(desk,0,1.38,0,1.9,.13,1.35,'#24242b');for(let i=0;i<10;i++)box(desk,(i-4.5)*.14,.72,.62,.035,1.14,.035,'#eb5b7e',{emissive:'#e94475',emissiveIntensity:.6});monitor(desk,0,1.4,.15,0,.7);
 v.hostSlots.push({x:0,z:4.65,y:0,pose:'seated',back424:true});
 // Purple vertical light walls and dark rear audience gallery as in the supplied frame.
 box(g,0,2.7,-6.1,21,5.4,.13,'#040311');for(let i=-10;i<=10;i++)light(i,2.9,-5.98,.035,5.1,.04,'#7414cf');
 for(let row=0;row<2;row++)for(let i=0;i<12;i++){const x=(i-5.5)*.62,z=-4.8-row*.65;box(g,x,.12+row*.45,z,.6,.3+row*.9,.58,'#0d0c22');v.supportSlots.push({x,z,y:.2+row*.45,pose:'seated',role:'audience',portrait415:(i*7+row*5)%24,name:'Arka tribün seyircisi'});}
 for(let i=0;i<10;i++)light(-4.65,.05+i*.17,-5.4+i*.19,.85,.035,.15,'#d82856');
 for(let i=-7;i<=7;i++)cyl(g,i,.14,-3.95,.06,.09,'#6ca8ff');
 return v;
}
