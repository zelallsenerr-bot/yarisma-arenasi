import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,plate,mat} from './kit.js?v=422';
export function floorSet422(cfg){
 const v=baseWorld(cfg),g=v.scene;g.background=new T.Color('#02030d');
 const floor=new T.Group(),duel=new T.Group();g.add(floor,duel);v.floorGroup422=floor;v.duelGroup422=duel;duel.visible=false;
 const neon=(group,x,y,z,w,h,d,color)=>box(group,x,y,z,w,h,d,color,{emissive:color,emissiveIntensity:1.2});
 const logo=(group,x,y,z,w,h)=>{box(group,x,y,z,w,h,.16,'#040818').renderOrder=-2;for(const side of[-1,1])neon(group,x+side*w/2,y,z+.1,.055,h,.04,'#da11ef');for(const sy of[-1,1])neon(group,x,y+sy*h/2,z+.1,w,.055,.04,'#da11ef');const sign=plate(group,'ALAN',x,y,z+.14,w*.96,h*.92,'#102b4a','#ed56f8');const canvas=sign.material.map.image,ctx=canvas.getContext('2d');for(let i=0;i<10;i++)for(let j=0;j<5;j++){ctx.fillStyle=['#102a48','#154772','#0b2541','#143957'][(i*3+j)%4];ctx.fillRect(i*103,j*52,101,50)}ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 145px Arial';ctx.strokeStyle='#c8acd6';ctx.lineWidth=3;ctx.strokeText('[ ALAN ]',512,134);ctx.fillStyle='#df3ee8';ctx.fillText('[ ALAN ]',512,134);sign.material.map.needsUpdate=true;};
 const wall=(group,w,z)=>{box(group,0,3,z,w,6,.15,'#030713');for(let i=0;i<22;i++)for(let j=0;j<7;j++)neon(group,(i-10.5)*w/23,.6+j*.72,z+.12,.045,.045,.04,j%3?'#1238ec':'#b718e4');};
 box(floor,0,-.13,-.6,13.5,.25,12.2,'#131729');
 v.cells422=[];for(let row=0;row<10;row++)for(let col=0;col<10;col++){const x=(col-4.5)*1.28,z=-5.8+row*1.1;const tile=box(floor,x,.015,z,1.26,.06,1.08,['#0a457a','#167abc','#253d64','#1b5a92'][(row*3+col)%4]);v.led.push(tile);v.cells422.push({x,z});v.playerSlots.push({x,z,y:.055,pose:'standing',floorId422:row*10+col});}
 for(const x of[-6.65,6.65])neon(floor,x,.04,-.8,.045,.04,11.9,'#c216eb');for(const z of[-6.7,5.15])neon(floor,0,.04,z,13.3,.04,.045,'#c216eb');
 wall(floor,17,-10.25);logo(floor,0,4.45,-10.05,3.1,1.7);logo(floor,-7.5,2.6,-4.9,2.3,1.8);logo(floor,7.5,2.6,-4.9,2.3,1.8);
 for(const side of[-1,1]){box(floor,side*7.2,2.7,-.9,.12,5.4,11,'#030614');for(let j=0;j<10;j++)for(let row=0;row<6;row++)neon(floor,side*7.08,.7+row*.76,-5.8+j*1.03,.05,.05,.07,row%2?'#1739ef':'#a823d7');}
 // Seated public gallery is distinct from the hundred standing contestants in the reference.
 v.supportSlots=[];for(let row=0;row<3;row++)for(let i=0;i<12;i++){const x=(i-5.5)*.88,z=-7.35-row*.69;box(floor,x,row*.35+.1,z,.86,.25+row*.7,.62,'#111323');v.supportSlots.push({x,z,y:.16+row*.35,pose:'seated',role:'audience',portrait415:(i*7+row*3)%24,name:'Arka tribün seyircisi'});}
 for(const y of[.5,1.45])neon(floor,0,y,-6.96,11,.025,.035,'#d9ddf1');
 // Black polished duel deck, white perimeter, pink desk lighting.
 box(duel,0,-.08,0,8.4,.16,7,'#080a16');for(const x of[-4.1,4.1])neon(duel,x,.025,0,.035,.025,6.8,'#f0f2ec');for(const z of[-3.4,3.4])neon(duel,0,.025,z,8.2,.025,.035,'#f0f2ec');wall(duel,12,-3.9);logo(duel,0,2.9,-3.7,6.7,3.35);
 const desk=new T.Group();duel.add(desk);v.objects.duelDesk422=desk;
 box(desk,0,.06,.65,3.9,.12,1.8,'#13131e');neon(desk,0,.135,1.55,3.9,.035,.035,'#e40eff');
 for(const x of[-1.4,1.4]){cyl(desk,x,.32,.65,.29,.4,'#11121b',.46);cyl(desk,x,.72,.65,.46,.4,'#aab0b6',.58).renderOrder=1;cyl(desk,x,1.095,.65,.58,.35,'#11121b',.69);box(desk,x,1.27,.65,1.13,.17,1.15,'#c5c7d1');neon(desk,x,1.26,1.24,1.04,.31,.045,'#dc0cff').renderOrder=2;box(desk,x,1.39,.65,1.06,.045,1.05,'#10101b');}
 box(desk,0,1.09,.65,1.9,.17,.78,'#c0c5cd');neon(desk,0,.84,1.05,1.6,.35,.045,'#8a0fea');box(desk,0,.48,.65,.5,.9,.5,'#10101b');
 v.hostSlots.push({x:0,z:5.7,y:0,pose:'standing'});v.gridCamera422=new T.Vector3(0,13.0,19.6);v.gridFocus422=new T.Vector3(0,.7,-1.2);v.camera.copy(v.gridCamera422);v.focus.copy(v.gridFocus422);
 let state={};v.refreshFloor422=next=>{state=next||{};v.duelMode422=['ready','duel'].includes(state.phase);floor.visible=!v.duelMode422;duel.visible=v.duelMode422;v.opponent422=state.opponent??1;
 const occupied=state.floor||Array.from({length:100},(_,i)=>i);
 for(const actor of v.actors){if(actor.host){Object.assign(actor.slot,v.duelMode422?{x:0,z:-.7}:{x:0,z:5.7});}else if(actor.slot.floorId422!==undefined){const id=actor.slot.floorId422,cell=occupied.indexOf(id),pos=v.duelMode422?(id===0?{x:-2.2,z:.65}:id===v.opponent422?{x:2.2,z:.65}:v.cells422[Math.max(0,cell)]):v.cells422[Math.max(0,cell)];Object.assign(actor.slot,pos);actor.alive422=cell>=0;}
 actor.mesh.position.x=actor.slot.x;actor.mesh.position.z=actor.slot.z;}
 v.camera.copy(v.duelMode422?new T.Vector3(.3,3.6,9.4):v.gridCamera422);v.focus.copy(v.duelMode422?new T.Vector3(0,1.25,-.1):v.gridFocus422);
 };
 v.visibilityFloor422=mode=>{const focus=v.playerSlots[0];for(const actor of v.actors){const id=actor.slot.floorId422;let show=v.duelMode422?(actor.host||id===0||id===v.opponent422):(actor.alive422!==false);if(actor.slot.role==='audience')show=!v.duelMode422;if(mode==='host')show=actor.host;if(mode==='player')show=show&&(actor.slot===focus||actor.slot.z<focus.z-.65);if(mode==='companion')show=false;actor.mesh.visible=show;}};
 return v;
}
