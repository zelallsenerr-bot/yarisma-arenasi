import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,ring,plate,mat} from './kit.js?v=420';
// User photo: elevated circular deck, glass guardrail, crescent cash desk and overhead red fascia.
export function moneySet420(cfg){
 const v=baseWorld(cfg),g=v.scene;g.background=new T.Color('#020719');v.camera.set(.3,7.0,16.7);v.focus.set(0,2.1,-.3);
 const blue='#164dff',white='#d2f7ff';
 const tube=(points,r,color)=>{const m=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),64,r,6,false),mat(color,{emissive:color,emissiveIntensity:.8}));g.add(m);return m};
 const arc=(r,y,start,end,color,width=.025)=>tube(Array.from({length:49},(_,i)=>{const a=start+(end-start)*i/48;return new T.Vector3(Math.sin(a)*r,y,Math.cos(a)*r)}),width,color);
 cyl(g,0,-.4,0,7.8,.12,'#03081c');cyl(g,0,.16,0,4.65,.54,'#38485f');cyl(g,0,.45,0,4.6,.07,'#abb6c4');ring(g,4.63,.46,blue,.065);ring(g,4.45,.5,white,.025);
 // Central entrance ramp, flanked by glass sections with a gap at the front.
 box(g,0,.22,5.25,1.75,.44,2.1,'#7b879b');for(const x of[-.92,.92])box(g,x,.455,5.25,.04,.035,2.2,white,{emissive:white});
 for(let n=0;n<28;n++){const a=.27+n*(Math.PI*2-.54)/27,r=4.55,x=Math.sin(a)*r,z=Math.cos(a)*r;const pane=box(g,x,1.02,z,1,.96,.025,'#a8eaff',{transparent:true,opacity:.13,depthWrite:false});pane.rotation.y=a; cyl(g,x,1.0,z,.025,1.05,'#a3b2c7');}
 arc(4.56,1.55,.27,Math.PI*2-.27,white);arc(4.56,.54,.27,Math.PI*2-.27,blue);
 // One continuous crescent desk; four red trapdoors and four blue answer monitors.
 const sh=new T.Shape();const outer=3.36,inner=1.93,start=.04,end=Math.PI-.04;
 sh.moveTo(Math.cos(start)*outer,Math.sin(start)*outer);sh.absarc(0,0,outer,start,end,false);sh.lineTo(Math.cos(end)*inner,Math.sin(end)*inner);sh.absarc(0,0,inner,end,start,true);sh.closePath();
 const top=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:.13,bevelEnabled:false,curveSegments:56}),mat('#d6e0df'));top.rotation.x=Math.PI/2;top.position.y=1.62;top.renderOrder=-1;g.add(top);v.objects.cashDesk420=top;
 for(let n=0;n<38;n++){const a=.06+n*(Math.PI-.12)/37,x=Math.cos(a)*2.85,z=Math.sin(a)*2.85;const panel=box(g,x,1.05,z,.28,1.02,.54,white,{emissive:'#78dcff',emissiveIntensity:.55});panel.rotation.y=Math.PI/2-a;}
 arc(3.36,1.45,-Math.PI/2+.04,Math.PI/2-.04,blue,.045);
 v.moneyTrapdoors420=[];
 for(let n=0;n<4;n++){const a=.34+n*(Math.PI-.68)/3,group=new T.Group();group.position.set(Math.cos(a)*2.48,1.64,Math.sin(a)*2.48);group.rotation.y=Math.PI/2-a;g.add(group);
 box(group,0,0,0,.92,.045,.7,'#647d91');const door=box(group,0,.03,0,.81,.035,.58,'#b50c2d');door.renderOrder=1;v.led.push(door);v.moneyTrapdoors420.push(door);
 const screen=box(group,0,.12,.62,1,.1,.47,'#091634');screen.renderOrder=1;const display=box(group,0,.177,.62,.89,.012,.37,'#0a3ec2',{emissive:blue,emissiveIntensity:.7});display.renderOrder=2;
 }
 // Bundled cash in reach of both players.
 for(let i=0;i<10;i++){const x=(i%5-2)*.19,z=1.27+Math.floor(i/5)*.23;box(g,x,1.7,z,.17,.12,.18,'#b2b892');box(g,x,1.765,z,.055,.008,.185,'#ead9b4');}
 // Back entrance and vertical luminous ribs.
 box(g,0,2.15,-4.5,3.7,3.45,.12,'#082356');for(const x of[-1.75,-.9,0,.9,1.75])box(g,x,2.12,-4.4,.035,3.3,.05,'#5cbbff',{emissive:'#126aff',emissiveIntensity:1.5});
 for(const side of[-1,1])for(let j=0;j<3;j++){const x=side*(2.3+j*.55);tube([new T.Vector3(x,.5,-3.8),new T.Vector3(x+side*.35,2.1,-3.9),new T.Vector3(x,3.8,-4.0)],.035,white);}
 for(const side of[-1,1])for(let i=0;i<4;i++){const x=side*(5.1+i*.65);tube([new T.Vector3(x,0,1-i),new T.Vector3(x-side*1.4,5.7,-4.7)],.018,'#216bff');}
 // Suspended red display: broad like the photograph, with actual current cash when available.
 const sign=new T.Group();sign.position.set(0,5.65,-.8);g.add(sign);box(sign,0,0,0,8.3,1.72,.38,'#e51910',{emissive:'#b90a05',emissiveIntensity:.4});for(const x of[-3.3,3.3])box(g,x,1.1,0,.035,1.3,.035,'#5b6b83');
 let amount=plate(sign,'1.000.000',0,0,.205,7.85,1.43,'#e51910','#ffffff');v.objects.cashSign420=sign;let previous='1.000.000';
 v.refreshMoney420=value=>{const text=String(value||'').replace(/\s*TL\s*$/,'').trim();if(!text||text===previous)return;previous=text;sign.remove(amount);amount.geometry.dispose();amount.material.map.dispose();amount.material.dispose();amount=plate(sign,text,0,0,.205,7.85,1.43,'#e51910','#ffffff')};
 plate(g,'1 MİLYON CANLI PARA',0,3.65,-4.37,3.2,.52,'#091d51','#e2f5ff');
 v.hostSlots.push({x:-1.9,z:-.38,y:.5,pose:'standing'});v.playerSlots.push({x:1.05,z:-.62,y:.5,pose:'standing'},{x:1.9,z:.05,y:.5,pose:'standing',gender:'female'});return v;
}
