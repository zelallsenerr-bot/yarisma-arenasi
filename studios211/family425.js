import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,ring,plate,mat,buzzer} from './kit.js?v=425';
export function familySet425(cfg){
 const v=baseWorld(cfg),g=v.scene;g.background=new T.Color('#020518');
 const neon=(group,x,y,z,w,h,d,color)=>box(group,x,y,z,w,h,d,color,{emissive:color,emissiveIntensity:1});
 const tube=(points,r,color)=>{const m=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),64,r,8,false),mat(color,{emissive:color,emissiveIntensity:.7}));g.add(m);return m};
 box(g,0,-.13,0,16,.24,13,'#090d25');cyl(g,0,.005,.4,7.1,.025,'#101c49');ring(g,7.05,.035,'#d4f4ff',.028,0,.4);for(const x of[-5.8,5.8]){const stripe=box(g,x,.045,1.8,.055,.025,8,'#e3f5ff');stripe.rotation.y=x<0?.68:-.68;}
 box(g,0,2.8,-5.7,16,5.6,.16,'#0a1740');for(let i=-7;i<=7;i++)neon(g,i,2.8,-5.57,.035,5.3,.05,'#42d4ff');for(const y of[1.8,3.0,5.2])neon(g,0,y,-5.42,16,.08,.08,'#5a0cd2');
 // Large curved wings, purple bands and lit double arches behind each family.
 for(const side of[-1,1]){const cx=side*5;for(const radius of[2.18,2.43,2.65]){const p=Array.from({length:41},(_,i)=>{const a=Math.PI*i/40;return new T.Vector3(cx+Math.cos(a)*radius,.27+Math.sin(a)*radius,-3.3)});tube(p,radius===2.43?.13:.045,radius===2.43?'#a011b9':'#55bbff');}
 for(let i=0;i<17;i++){const a=Math.PI*i/16;cyl(g,cx+Math.cos(a)*2.3,.27+Math.sin(a)*2.3,-3.21,.035,.06,'#f6e9d1');}
 neon(g,cx,4.3,-4.7,5.0,.45,.13,'#8623c8');for(const y of[4.0,4.6])neon(g,cx,y,-4.58,5.1,.025,.05,'#c6efff');}
 // Circular light wall surrounding the answer board.
 const circle=new T.Mesh(new T.TorusGeometry(2.72,.13,10,80),mat('#9f16bc',{emissive:'#7317ae',emissiveIntensity:.65}));circle.position.set(0,3.45,-5.2);g.add(circle);
 for(let x=-12;x<=12;x++)for(let y=-12;y<=12;y++){if(x*x+y*y>144)continue;neon(g,x*.21,3.45+y*.21,-5.26,.035,.035,.03,'#83c9ff');}
 const panel=plate(g,'AİLELER YARIŞIYOR',0,3.5,-4.98,4.6,3.2,'#073a89','#f1ce69');v.objects.answerPanel425=panel;const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=768;panel.material.map.dispose();panel.material.map=new T.CanvasTexture(canvas);panel.material.map.colorSpace=T.SRGBColorSpace;const ctx=canvas.getContext('2d');
 const replaceText=(mesh,text,bg='#0d3b86',color='#e7f7ff')=>{const c=mesh.material.map.image,x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,c.width,c.height);x.textAlign='center';x.textBaseline='middle';x.fillStyle=color;let size=text.length<4?190:95;x.font='700 '+size+'px Arial';while(x.measureText(text).width>940&&size>20){size-=3;x.font='700 '+size+'px Arial'}x.fillText(text,512,128);mesh.material.map.needsUpdate=true;};
 v.familyDesks425=[];v.teamSigns425=[];v.scoreSigns425=[];
 for(let team=0;team<2;team++){const side=team?1:-1,desk=new T.Group();desk.position.set(side*4.7,0,-.9);desk.rotation.y=side*-.12;desk.scale.y=.85;g.add(desk);v.familyDesks425.push(desk);
 box(desk,0,.67,0,4.45,1.2,.72,'#a7aec1');box(desk,0,1.35,0,4.58,.12,.92,'#702575');for(const y of[.15,1.22])neon(desk,0,y,.4,4.45,.045,.045,'#bf3bd2');const sign=plate(desk,team?'YILMAZ':'ŞENER',0,.69,.38,4.1,.89,'#103e89','#edffff');v.teamSigns425.push(sign);
 for(let i=0;i<5;i++){v.playerSlots.push({x:side*4.7+(i-2)*.78,z:-1.5,y:0,pose:'standing',height425:2.1,team425:team,member425:i});}
 const score=plate(g,'0',side*3.5,3.8,-4.9,1.28,.95,'#073b94','#b2f5ff');v.scoreSigns425.push(score);}
 // Split center buzzer station with silver divider and blue LED fronts.
 const station=new T.Group();station.position.set(0,0,1.1);station.scale.y=.83;g.add(station);v.objects.faceoffDesk425=station;
 for(const side of[-1,1]){const wing=box(station,side*.65,.68,0,1.1,1.3,.65,'#929fb4');wing.rotation.z=side*-.07;box(station,side*.65,.69,.35,.9,1.05,.035,'#071c42');for(let row=0;row<4;row++)for(let col=0;col<5;col++)neon(station,side*.65+(col-2)*.15,.42+row*.15,.38,.035,.035,.025,'#8dd4ff');box(station,side*.65,1.37,0,1.14,.09,.78,'#3977d3');buzzer(station,side*.66,1.46,-.05);}
 box(station,0,.75,.03,.4,1.5,.81,'#b7bfcc');
 // Floor medallion, with native drawn text instead of a television screenshot overlay.
 const fc=document.createElement('canvas');fc.width=fc.height=1024;const fx=fc.getContext('2d');fx.fillStyle='#163c91';fx.beginPath();fx.arc(512,512,490,0,Math.PI*2);fx.fill();fx.strokeStyle='#efdba7';fx.lineWidth=18;fx.stroke();fx.textAlign='center';fx.fillStyle='#edc779';fx.font='700 108px Georgia';fx.fillText('AİLELER',512,480);fx.fillText('YARIŞIYOR',512,605);const texture=new T.CanvasTexture(fc);texture.colorSpace=T.SRGBColorSpace;const medallion=new T.Mesh(new T.CircleGeometry(2.0,64),new T.MeshBasicMaterial({map:texture}));medallion.rotation.x=-Math.PI/2;medallion.position.set(0,.052,3.6);medallion.renderOrder=-80;g.add(medallion);
 v.hostSlots.push({x:1.55,z:1.0,y:0,pose:'standing'});v.camera.set(.2,5.4,15.2);v.focus.set(0,1.35,-1.0);v.duel425=false;
 let signature='';v.refreshFamily425=state=>{const s=state||{};v.duel425=['announce355','buzz','duel','retry355'].includes(s.phase);v.camera.set(.2,v.duel425?3.6:5.4,v.duel425?9.1:15.2);v.focus.set(0,v.duel425?1.65:1.35,v.duel425?-.6:-1);
 for(const actor of v.actors){if(actor.host){actor.slot.x=v.duel425?0:1.55;actor.slot.z=v.duel425?.5:1.0;actor.mesh.position.x=actor.slot.x;actor.mesh.position.z=actor.slot.z;continue;}const slot=actor.slot;if(slot.team425===undefined)continue;const captain=slot.member425===0;slot.x=v.duel425&&captain?(slot.team425?1.55:-1.55):(slot.team425?4.7:-4.7)+(slot.member425-2)*.78;slot.z=v.duel425&&captain?1.03:-1.5;actor.mesh.position.x=slot.x;actor.mesh.position.z=slot.z;}
 const next=JSON.stringify(s);if(signature===next)return;signature=next;for(let t=0;t<2;t++){replaceText(v.teamSigns425[t],String(s.names?.[t]|| (t?'YILMAZ':'ŞENER')).toLocaleUpperCase('tr'));replaceText(v.scoreSigns425[t],String(s.scores?.[t]||0));}
 ctx.fillStyle='#092e7a';ctx.fillRect(0,0,1024,768);ctx.strokeStyle='#b027d2';ctx.lineWidth=10;ctx.strokeRect(5,5,1014,758);const answers=s.answers||[];const rows=Math.max(6,answers.length),rh=630/rows;
 if(!answers.length){replaceText(panel,'AİLELER YARIŞIYOR','#073a89','#f1ce69');return;}
 for(let i=0;i<rows;i++){const y=25+i*rh;ctx.fillStyle=i%2?'#1554b6':'#104498';ctx.fillRect(38,y,948,rh-3);ctx.fillStyle='#bceeff';ctx.textAlign='left';ctx.textBaseline='middle';ctx.font='600 '+Math.min(54,rh*.6)+'px Arial';const a=answers[i];ctx.fillText((i+1)+'. '+(a?.open?a.text:'••••••'),55,y+rh/2,800);ctx.textAlign='right';ctx.fillText(a?.open?String(a.points):'',960,y+rh/2);}
 ctx.fillStyle='#e6f4ff';ctx.textAlign='right';ctx.font='600 46px Arial';ctx.fillText('TOPLAM: '+(s.pot||0),960,725);panel.material.map.needsUpdate=true;};
 v.visibilityFamily425=mode=>{const focus=v.playerSlots[0];for(const actor of v.actors){let show=!v.duel425||actor.host||actor.slot.member425===0;if(mode==='host')show=actor.host;if(mode==='player')show=show&&(actor.slot===focus||actor.slot.z<focus.z-.65);if(mode==='companion')show=false;actor.mesh.visible=show;}};
 return v;
}
