import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,mat,chair,plate} from './kit.js?v=420';
export function datingSet431(cfg){
 const v=baseWorld({...cfg,layout:'risk'});v.cfg=cfg;v.customAudience431=true;const g=v.scene;g.background=new T.Color('#c2cbb8');g.userData.solidSeams428=true;v.camera.set(6.0,6.0,17.6);v.focus.set(-.2,1.3,-1.15);
 const glow=(gr,x,y,z,w,h,d,color='#fff5d4')=>box(gr,x,y,z,w,h,d,color,{emissive:color,emissiveIntensity:.45});
 box(g,0,-.12,0,21,.2,15,'#cec9b7',{roughness:.16,metalness:.3});
 // Window wall: real garden texture behind a black steel grid and white brick piers.
 const garden=new T.TextureLoader().load(new URL('./garden431.webp',import.meta.url).href,()=>window.dispatchEvent(new Event('studio211:asset')));garden.colorSpace=T.SRGBColorSpace;const view=new T.Mesh(new T.PlaneGeometry(20,5.6),new T.MeshBasicMaterial({map:garden}));view.position.set(0,2.9,-6.2);view.renderOrder=-30;g.add(view);
 for(let col=0;col<15;col++)box(g,-9.8+col*1.4,2.9,-6.1,.045,5.7,.05,'#252b26').renderOrder=-28;for(const y of[.15,1.45,2.9,4.3,5.7])box(g,0,y,-6.05,20,.045,.06,'#252b26').renderOrder=-28;
 for(const xx of[-10,-3.25,3.4,10]){box(g,xx,2.9,-5.91,.62,5.8,.44,'#eeeae1').renderOrder=-25;for(let row=0;row<30;row++){box(g,xx,row*.19,-5.66,.59,.014,.018,'#c5c2b7').renderOrder=-24;if(row%2)box(g,xx+.1,row*.19+.09,-5.66,.012,.16,.018,'#c5c2b7').renderOrder=-24;}}
 // Ivory stage with a glowing L-shaped walkway and thin dark inlay.
 box(g,-1.2,.06,-.8,16.9,.20,6.5,'#e4dfd0');for(const z of[2.45,-4.05]){box(g,-1.2,.17,z,17.0,.07,.22,'#e9e5d5');glow(g,-1.2,.215,z,16.9,.035,.15);}
 box(g,-1.1,.025,4.0,16.7,.06,.08,'#333a35');box(g,7.2,.025,2.5,.08,.06,3.1,'#333a35');box(g,-9.1,.025,2.5,.08,.06,3.1,'#333a35');
 // Left-hand waiting loca: eight individual seats, two raised rows.
 v.supportSlots=[];for(let row=0;row<2;row++){box(g,-6.15,.20+row*.24,-1.4-row*1.6,5.5,.18,1.35,'#353a35');glow(g,-6.15,.30+row*.24,-.73-row*1.6,5.5,.035,.045);for(let col=0;col<4;col++){const px=-8.25+col*1.38,pz=-1.4-row*1.6,y=.3+row*.24;const seat=chair(g,px,pz,0,false,'#f3ecdb');seat.position.y=y;box(seat,-.36,.5,0,.09,.7,.65,'#202925');box(seat,.36,.5,0,.09,.7,.65,'#202925');v.supportSlots.push({x:px,z:pz,y,pose:'seated',role:'waiting-suitor',portrait415:(row*11+col*3)%24,datingWait431:row*4+col,name:'Locada bekleyen aday'});}}
 // Two central yellow armchairs, visitor on the left and resident on the right.
 for(const px of[-1.55,1.55]){const seat=chair(g,px,-1.0,px<0?-.2:.2,false,'#e2b812');seat.userData.chair211=true;box(seat,0,.8,-.29,.70,.64,.11,'#e7c518');}
 v.playerSlots.push({x:-1.55,z:-1.0,y:.18,pose:'seated',dating431:true,datingSide431:0},{x:1.55,z:-1.0,y:.18,pose:'seated',dating431:true,datingSide431:1});
 // Central opaque divider is perpendicular to the line between the two people.
 const frame=new T.Group();frame.position.set(0,.17,-1.0);g.add(frame);box(frame,0,.04,0,.5,.09,3.0,'#ccc8b9');for(const zz of[-1.48,1.48])cyl(frame,0,1.67,zz,.045,3.2,'#b0ad9e');
 const panel=new T.Group();frame.add(panel);box(panel,0,1.65,0,.26,3.25,2.96,'#eee9db');for(const zz of[-1.49,1.49]){box(panel,0,1.65,zz,.35,3.3,.055,'#f9f5e8');glow(panel,0,1.65,zz+.033,.055,3.2,.02,'#efe2ad');}for(let j=0;j<7;j++)box(panel,.137,1.65,-1.32+j*.44,.018,3.1,.012,'#d9d3c3');
 // Zuhal Topal sits at her own small round desk on the far right.
 const hchair=chair(g,7.05,.85,-.4,true,'#e7bc13');hchair.userData.chair211=false;hchair.visible=false;v.hostSlots.push({x:7.05,z:.85,y:.12,pose:'seated'});
 cyl(g,6.15,.56,.25,.038,1.05,'#9eaaa7');cyl(g,6.15,.08,.25,.43,.055,'#9eaaa7');cyl(g,6.15,1.12,.25,.64,.065,'#17201f');box(g,6.16,1.17,.24,.4,.035,.27,'#f4f0dd');
 // Right fireplace, stacked logs and yellow flowers.
 box(g,8.65,1.5,-4.62,2.8,3,.43,'#eae5d8').renderOrder=-15;box(g,8.65,.95,-4.34,2.2,1.25,.06,'#151e21').renderOrder=-14;for(let i=0;i<7;i++){const log=cyl(g,7.83+i*.27,.55,-4.23,.14,.45,'#b89c62');log.rotation.x=Math.PI/2;log.renderOrder=-13;}for(let i=0;i<13;i++){const flame=new T.Mesh(new T.ConeGeometry(.075,.25+(i%3)*.08,6),mat(i%2?'#2875de':'#75c6ff',{emissive:'#2875de',emissiveIntensity:.4}));flame.position.set(7.82+i*.137,.98,-4.18);flame.renderOrder=-13;g.add(flame);}
 function flowers(px,pz,base=0){cyl(g,px,1.4+base,pz,.21,.52,'#959782');for(let i=0;i<15;i++){const xx=px+Math.sin(i*2.4)*.35,yy=1.9+base+(i%4)*.08,zz=pz+Math.cos(i*2.4)*.22;cyl(g,xx,1.75+base,zz,.008,.5,'#52712d');const f=new T.Mesh(new T.SphereGeometry(.10,6,5),mat('#eec82c'));f.position.set(xx,yy,zz);g.add(f);}}flowers(8.7,-4.2,1.8);flowers(-8.8,-5.45);
 box(g,-5.2,3.4,-5.62,1.9,3.4,.12,'#e3c337').renderOrder=-23;const lc=document.createElement('canvas');lc.width=512;lc.height=768;const lx=lc.getContext('2d');lx.fillStyle='#e4c22b';lx.fillRect(0,0,512,768);lx.fillStyle='#151c16';lx.font='900 290px Georgia';lx.textAlign='center';lx.textBaseline='middle';lx.fillText('LO',256,235);lx.fillText('VE',256,535);const lt=new T.CanvasTexture(lc);lt.colorSpace=T.SRGBColorSpace;const love=new T.Mesh(new T.PlaneGeometry(1.7,2.55),new T.MeshBasicMaterial({map:lt}));love.position.set(-5.2,3.65,-5.52);love.renderOrder=-22;g.add(love);
 let stage=null,progress=0,from=0,to=0,start=0;v.refreshDating431=s=>{stage=s;if(!s)return;v.primaryPlayer414=s.playerSlot;v.playerCameraSlot418=v.playerSlots[s.playerSlot];frame.visible=s.meeting;const desired=s.open?1:0;if(desired!==to){from=progress;to=desired;start=performance.now();}v.updateDatingActors431?.(s);};
 v.animateDating431=t=>{if(!stage?.meeting){panel.visible=false;progress=0;from=to=0;return;}const f=Math.min(1,Math.max(0,(t-start)/1500));progress=from+(to-from)*(f*f*(3-2*f));panel.scale.y=Math.max(.02,1-progress);panel.position.y=progress*3.25;panel.visible=progress<.995;};
 v.visibilityDating431=mode=>{for(const a of v.actors){if(a.host)a.mesh.visible=mode!=='player';else if(a.slot.dating431)a.mesh.visible=!!stage?.meeting&&(mode==='stage'||mode==='player'&&a.slot===v.playerCameraSlot418);else if(a.slot.datingWait431!==undefined)a.mesh.visible=mode==='stage'&&!!stage?.waiting?.[a.slot.datingWait431];else a.mesh.visible=mode==='stage';}};
 return v;
}
