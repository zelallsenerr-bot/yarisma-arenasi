import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,mat} from './kit.js?v=420';
export function loungeSet421(cfg){
 const v=baseWorld(cfg),g=v.scene;g.background=new T.Color('#b8cbd4');v.camera.set(.4,3.35,10.9);v.focus.set(0,1,-.7);
 // Warm wood floor and daylight mall frontage, without broadcast captions or logos.
 box(g,0,-.09,-.4,13,.16,10,'#a17c5d');for(let i=0;i<42;i++){const x=(i-20.5)*.31;box(g,x,.005,-.4,.012,.008,10,'#705b4d');for(let j=0;j<5;j++)box(g,x+.15,.009,-4.5+j*2+(i%3)*.5,.3,.005,.009,'#8a6b53');}
 // Buildings and walkways outside the glass.
 box(g,0,-.07,-7.3,17,.1,6,'#c2c6c3');box(g,0,2.5,-9.3,18,5,.25,'#ecebe7');
 for(let i=0;i<10;i++){const x=(i-4.5)*1.7;box(g,x,2.8,-9.13,.98,2.5,.035,'#7d9aa8');box(g,x,.65,-9.05,1.3,.6,.15,'#d2d3cf');}for(const y of[1.2,3.7])box(g,0,y,-8.9,17,.14,.45,'#fbfbf2');
 for(let i=0;i<7;i++){box(g,-4.8+i*1.55,.22,-6.3,1.1,.4,.5,'#a6a7a0');for(let j=0;j<6;j++)cyl(g,-5.23+i*1.55+j*.16,.54,-6.3,.12,.27,['#778d3a','#789a43','#bbaa53'][j%3]);}
 // Full-height window frames and double glass doors.
 for(let i=0;i<8;i++){const x=-5.4+i*1.55;box(g,x,2.4,-4.65,.075,4.8,.12,'#b9c3c8');if(i<7)box(g,x+.77,2.4,-4.7,1.45,4.6,.025,'#c9e9ee',{transparent:true,opacity:.13,depthWrite:false});}
 for(const y of[.1,4.65])box(g,0,y,-4.54,11.7,.09,.13,'#d7dede');
 for(const x of[.25,1.65]){box(g,x,2.0,-4.45,.05,3.9,.08,'#b2b9be');box(g,x+.32,1.45,-4.35,.035,.7,.06,'#e0e5e5');}
 // Red inward arrows on the doors, drawn as geometry rather than text.
 for(const side of[-1,1]){const sh=new T.Shape();sh.moveTo(-.38,-.18);sh.lineTo(.05,-.18);sh.lineTo(.05,-.36);sh.lineTo(.48,0);sh.lineTo(.05,.36);sh.lineTo(.05,.18);sh.lineTo(-.38,.18);sh.closePath();const arrow=new T.Mesh(new T.ShapeGeometry(sh),mat('#a3202a',{side:T.DoubleSide}));arrow.position.set(.92+side*.75,2.35,-4.32);arrow.rotation.z=side<0?0:Math.PI;g.add(arrow);}
 const beam=(a,b,w,color)=>{const dir=new T.Vector3().subVectors(b,a),m=box(g,0,0,0,w,dir.length(),.22,color);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),dir.normalize());};
 beam(new T.Vector3(-3.8,0,-4.25),new T.Vector3(-3.8,2.1,-4.25),.32,'#b7773e');for(const x of[-5.3,-2.3])beam(new T.Vector3(-3.8,2,-4.25),new T.Vector3(x,4.8,-4.25),.4,'#bd7f45');
 for(const x of[3.4,5.5])beam(new T.Vector3(4.5,2.1,-4.25),new T.Vector3(x,4.8,-4.25),.3,'#555e60');
 // One long purple sofa with a pale curved end module, four adjacent seats.
 const couch=new T.Group();g.add(couch);v.objects.sharedSofa421=couch;
 box(couch,-2.05,.32,-.6,4.25,.58,1.05,'#7258a0');box(couch,-2.05,.86,-1.05,4.25,.88,.24,'#c1c7d2');
 for(let i=0;i<4;i++){const x=-3.6+i*1.04;box(couch,x,.64,-.55,1.01,.18,.98,'#8164b3');v.playerSlots.push({x,z:-.42,y:0,pose:'seated',sofa421:true});}
 for(const x of[-4.2,.15])box(couch,x,.72,-.56,.25,.88,1.12,'#bbc4d2');
 const end=cyl(g,.62,.35,-.26,.72,.7,'#77a5bd');box(g,.6,.93,-.75,1.3,.85,.2,'#b9c8d4');box(g,.6,.71,-.1,1.25,.13,.95,'#78a8c1');box(g,.6,1.02,-.62,.62,.65,.15,'#68b8dc');
 // Low oval glass coffee table with crossed chrome supports.
 const glass=cyl(g,-2.35,.49,1.28,1.45,.035,'#d1e4e7');glass.scale.z=.58;glass.material.transparent=true;glass.material.opacity=.42;glass.material.depthWrite=false;
 for(const side of[-1,1])beam(new T.Vector3(-3.15,.03,1.28+side*.45),new T.Vector3(-1.55,.46,1.28-side*.45),.035,'#b4bdc3');
 for(let i=0;i<4;i++){const x=-3.35+i*.65;const cup=cyl(g,x,.61,1.2,.09,.19,'#dbeff0');cup.material.transparent=true;cup.material.opacity=.5;}
 box(g,-2.2,.55,1.53,.52,.12,.32,'#a6b8c1');
 // Yiğit's separate purple swivel chair on the right; portrait includes chair.
 v.hostSlots.push({x:3.2,z:.2,y:0,pose:'seated'});v.objects.hostSeat421={x:3.2,z:.2};
 return v;
}
