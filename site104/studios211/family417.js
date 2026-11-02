import * as T from '../vendor/three175/three.module.js';
import {box,cyl,ring,mat,plate} from './kit.js?v=418';

const blue='#235aff',red='#ff284a',pink='#f3a5c8',white='#f3eee9';
function tube(g,points,color,r=.025){
 const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));
 const mesh=new T.Mesh(new T.TubeGeometry(curve,48,r,6,false),mat(color,{emissive:color,emissiveIntensity:1.6,roughness:.2}));g.add(mesh);return mesh;
}
function ellipse(g,x,y,z,rx,rz,color,r=.03){
 const points=[];for(let i=0;i<=64;i++){const t=i/64*Math.PI*2;points.push([x+Math.cos(t)*rx,y,z+Math.sin(t)*rz])}return tube(g,points,color,r);
}
function walkway(g,points,width){
 const curve=new T.CatmullRomCurve3(points.map(([x,z])=>new T.Vector3(x,.035,z))),positions=[],left=[],right=[];
 for(let i=0;i<=48;i++){
  const p=curve.getPoint(i/48),t=curve.getTangent(i/48),n=new T.Vector3(t.z,0,-t.x).normalize().multiplyScalar(width/2);
  left.push(p.clone().add(n));right.push(p.clone().sub(n));
 }
 for(let i=0;i<48;i++)for(const p of[left[i],left[i+1],right[i],right[i],left[i+1],right[i+1]])positions.push(p.x,p.y,p.z);
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.computeVertexNormals();
 const m=new T.Mesh(geo,mat('#e9e5e3',{side:T.DoubleSide,metalness:.28,roughness:.18}));m.renderOrder=-80;g.add(m);
 for(const side of[left,right])tube(g,side.map(p=>[p.x,.053,p.z]),'#d1c9d3',.026);
 for(const side of[left,right])tube(g,side.map(p=>[p.x*.988,.062,p.z]),blue,.013);
}
function logo(g,x,y,z,w=1.35,h=1.25){
 const c=document.createElement('canvas');c.width=512;c.height=512;const q=c.getContext('2d');
 const grad=q.createLinearGradient(0,0,512,512);grad.addColorStop(0,'#1337d4');grad.addColorStop(.6,'#091b8a');grad.addColorStop(1,'#1768ff');q.fillStyle=grad;q.fillRect(0,0,512,512);
 for(let i=0;i<5;i++){q.strokeStyle=i%2?'#1463ea':'#3155d7';q.lineWidth=3;q.beginPath();q.moveTo(i*130,0);q.lineTo(512-i*90,512);q.stroke()}
 q.save();q.translate(256,256);q.scale(.85,1);q.strokeStyle='#fff4ca';q.lineWidth=16;q.beginPath();q.arc(0,0,166,0,Math.PI*2);q.stroke();q.strokeStyle='#f69528';q.lineWidth=20;q.beginPath();q.arc(0,0,140,-.45,Math.PI*1.65);q.stroke();q.strokeStyle='#fff6d6';q.lineWidth=9;q.beginPath();q.arc(0,0,115,.2,Math.PI*1.7);q.stroke();q.fillStyle='#fff5d9';q.textAlign='center';q.font='900 50px Arial';q.fillText('MİLYONER',0,-5);q.font='900 65px Arial';q.fillText('AİLE',0,65);q.restore();
 const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:tx,toneMapped:false}));m.position.set(x,y,z);g.add(m);return m;
}
function curvedDesk(g,x,z,y){
 // Narrow pink top and the curved, open front seen in the reference.
 const shape=new T.Shape();shape.moveTo(-.3,0);shape.lineTo(.3,0);shape.bezierCurveTo(.19,-.18,.1,-.67,.25,-.94);shape.lineTo(-.06,-.94);shape.bezierCurveTo(-.34,-.7,-.35,-.2,-.3,0);
 const geo=new T.ExtrudeGeometry(shape,{depth:.14,bevelEnabled:true,bevelThickness:.025,bevelSize:.025,bevelSegments:3,steps:1,curveSegments:12});const leg=new T.Mesh(geo,mat(pink,{roughness:.26,metalness:.12}));leg.position.set(x,y,z-.12);leg.scale.x=.62;g.add(leg);
 box(g,x,y+.025,z,.66,.075,.54,pink,{emissive:'#c55486',emissiveIntensity:.2});
 cyl(g,x,y-.94,z+.05,.3,.035,'#b98eaa');
 // Small answer pad, lying flat on the desk rather than a row of TV monitors.
 box(g,x,y+.07,z+.05,.2,.025,.14,'#101728');
}
function nameBoard(g,x,y,z){
 const c=document.createElement('canvas');c.width=1024;c.height=128;const q=c.getContext('2d');
 const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;
 const m=new T.Mesh(new T.PlaneGeometry(3.45,.43),new T.MeshBasicMaterial({map:tx,toneMapped:false}));m.position.set(x,y,z);g.add(m);
 return text=>{q.fillStyle='#0b153a';q.fillRect(0,0,1024,128);q.fillStyle='#f0f5ff';q.textAlign='center';q.textBaseline='middle';let n=44;q.font='bold '+n+'px Arial';while(q.measureText(text).width>975&&n>20){n-=2;q.font='bold '+n+'px Arial'}q.fillText(text,512,67);tx.needsUpdate=true};
}
function step(g,x,z,r,y){
 const m=new T.Mesh(new T.CylinderGeometry(r,r,.13,64,1,false,-Math.PI/2,Math.PI),mat('#d8d0c7',{metalness:.35,roughness:.18}));m.position.set(x,y,z);g.add(m);
 const pts=[];for(let i=0;i<=40;i++){const a=i/40*Math.PI;pts.push([x+Math.cos(a)*r,y+.07,z+Math.sin(a)*r])}tube(g,pts,'#fff2dc',.023);
}

export function familySet417(v){
 const g=v.scene;g.background=new T.Color('#02030a');v.supportSlots=[];v.familyBooths417=[];
 // Glossy dark studio floor, branching white paths, red perimeter and blue stairs.
 box(g,0,-.16,1,25,.26,24,'#070a13',{metalness:.7,roughness:.08});
 walkway(g,[[1,10],[1.1,6],[0,2],[0,-3]],2.05);
 walkway(g,[[.7,5],[-1.4,3.6],[-4.6,2],[-7.1,.9]],1.7);
 walkway(g,[[.7,5],[3.2,3.5],[6.5,1.7],[7.1,.5]],1.75);
 walkway(g,[[7.4,11],[6.3,8.7],[3.4,5.2],[.7,3.1]],2.2);
 for(const side of[-1,1]){
  const p=[];for(let i=0;i<=32;i++){const t=i/32;p.push([side*(3.8+Math.sin(t*1.8)*6.4),.08,8-t*13])}tube(g,p,red,.047);
  for(let i=0;i<4;i++){box(g,side*(9.5+i*.23),.08+i*.11,1,1.8,.13,8.8,'#18131f');box(g,side*(9.5+i*.23),.16+i*.11,1,1.8,.025,8.8,red,{emissive:red,emissiveIntensity:1.3})}
 }
 for(let i=0;i<4;i++){box(g,0,.1+i*.11,-5.6-i*.24,7,.13,.35,'#153176');box(g,0,.18+i*.11,-5.4-i*.24,7,.025,.035,blue,{emissive:blue,emissiveIntensity:2})}
 box(g,0,2.2,-8.3,25,5,.16,'#03050b');
 for(const y of[.9,1.55,2.2])box(g,0,y,-8.15,25,.045,.04,red,{emissive:red,emissiveIntensity:1.4});
 // Tall central programme column, between the second and third booths.
 box(g,0,2.5,-4.95,1.8,5.0,.22,'#0c2ca2');logo(g,0,2.7,-4.8,1.65,4.6);
 for(const x of[-1.03,1.03]){const m=box(g,x,2.45,-4.85,.06,4.95,.08,red,{emissive:red,emissiveIntensity:1.7});m.rotation.z=x<0?.09:-.09}
 const defaultTeams=[['Şener','Bursa'],['Yılmaz','İstanbul'],['Aksoy','İzmir'],['Demir','Ankara']].map(([name,city],i)=>({name,city,members:Array.from({length:4},(_,j)=>({name:'Aile bireyi '+(j+1),gender:j%2?'female':'male',id:'family417-'+i+'-'+j}))}));
 const teams=window.ArenaFamilyStage417?.()||defaultTeams;
 const centers=[[-7.5,-.5],[-3.2,-3.25],[3.2,-3.25],[7.5,-.5]];
 const portraits={male:[8,2,0,4,6,10,12,14,16,18,20,22],female:[9,3,1,5,13,15,17,19,21,23]};let men=0,women=0;
 const boards=[];
 for(let t=0;t<4;t++){
  const [x,z]=centers[t],base=.55,r=1.86;
  const booth=new T.Group();booth.userData.familyBooth417=t;booth.position.set(x,0,z);g.add(booth);v.familyBooths417.push(booth);
  cyl(g,x,.29,z,r,.5,'#101421');ring(g,r,.57,blue,.055,x,z);ring(g,r+.08,.2,red,.045,x,z);ring(g,r-.08,.09,'#f4dbcf',.028,x,z);
  // Three shallow half-round steps fan forward from each raised booth.
  for(let j=0;j<3;j++)step(g,x,z,r+.2+(2-j)*.19,.055+j*.14);
  // Glass enclosure stays transparent, with the bright outline doing the work.
  const glass=new T.Mesh(new T.CylinderGeometry(r-.02,r-.02,2.9,64,1,true),new T.MeshPhysicalMaterial({color:'#93b9ff',transparent:true,opacity:.035,roughness:.04,metalness:0,side:T.DoubleSide,depthWrite:false}));glass.position.set(x,base+1.45,z);g.add(glass);
  ellipse(g,x,base+2.95,z,r,r*.83,blue,.045);ellipse(g,x,base+.02,z,r,r*.83,blue,.04);
  for(const dx of[-r*.97,r*.97]){box(g,x+dx,base+1.47,z,.055,2.97,.07,'#a6d5fa',{emissive:'#2569ff',emissiveIntensity:.8});box(g,x+dx-.035,base+1.47,z+.035,.025,2.97,.03,blue,{emissive:blue,emissiveIntensity:1.5})}
  box(g,x,base+1.6,z-1.2,3.5,2.7,.08,'#080d20');
  for(const y of[base+.7,base+1.35,base+2])box(g,x,y,z-1.14,3.5,.045,.025,red,{emissive:red,emissiveIntensity:1.2});
  logo(g,x,base+1.73,z-1.08,1.3,1.22);
  boards.push(nameBoard(g,x,base+2.6,z+.5));
  for(let j=0;j<4;j++){
   const member=teams[t]?.members?.[j]||defaultTeams[t].members[j],px=x+(j-1.5)*.74,pz=z+.07;
   const gender=t===0&&j===0?(window.ArenaProfile338?.get?.()?.gender||member.gender):member.gender;
   const portrait=gender==='female'?portraits.female[women++%portraits.female.length]:portraits.male[men++%portraits.male.length];
   const slot={x:px,z:pz,y:base,pose:'seated',role:'family-member',team:t,name:member.name,gender,age:member.age,castId417:member.id,portrait415:portrait};
   (t===0?v.playerSlots:v.supportSlots).push(slot);
   curvedDesk(g,px,z+.49,base+1.11);
  }
 }
 // Real host at the front right; the freestanding central stool is unoccupied.
 v.hostSlots.push({x:4.4,z:6.3,y:0,pose:'standing',name:'Engin Altan Düzyatan'});
 const stool=new T.Group();stool.position.set(.2,0,1.8);g.add(stool);
 cyl(stool,0,.04,0,.31,.04,'#c9d0da');cyl(stool,0,.52,0,.035,1,'#c9d0da');box(stool,0,1.03,0,.46,.1,.4,'#d8cfe2');box(stool,0,1.22,-.19,.46,.35,.035,'#d8cfe2');ring(stool,.24,.4,'#c9d0da',.016);
 // Ceiling truss and a few faceted, mirrored light balls.
 for(const z of[-5,-.5,4]){
  box(g,0,6,z,23,.07,.07,'#46515d');
  for(let i=-5;i<=5;i++){
   box(g,i*1.9,5.84,z,.22,.25,.31,'#171d28');
   const lamp=new T.Mesh(new T.CircleGeometry(.07,12),new T.MeshBasicMaterial({color:i%3?'#f7f1d9':'#a6caff'}));lamp.position.set(i*1.9,5.7,z+.17);g.add(lamp);
  }
 }
 for(const x of[-6,-2,2,6]){
  cyl(g,x,5.1,-1,.012,.8,'#9ba8b8');const ball=new T.Mesh(new T.SphereGeometry(.31,12,8),mat('#c8d3e0',{metalness:1,roughness:.1,flatShading:true}));ball.position.set(x,4.65,-1);g.add(ball);ring(g,.32,4.62,'#a7caff',.016,x,-1);
 }
 const key=new T.SpotLight('#e8efff',65,30,.5,.7,1.5);key.position.set(6,8,6);key.target.position.set(0,1,-2);g.add(key,key.target);
 let last='';v.refreshFamily417=list=>{if(!list?.length)return;const k=list.map(t=>t.name+'/'+t.city).join('|');if(k===last)return;last=k;boards.forEach((draw,i)=>draw(((list[i]?.name||'Aile')+' AİLESİ / '+(list[i]?.city||'')).toLocaleUpperCase('tr')))};
 v.refreshFamily417(teams);v.camera.set(-9.2,7.1,18.4);v.focus.set(.1,1.15,-.4);
 return v;
}
