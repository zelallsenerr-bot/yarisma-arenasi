import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,mat} from './kit.js?v=420';
import {addPrizes439} from './prizes439.js?v=439';
export function doorsSet429(cfg){
 const v=baseWorld({...cfg,layout:'risk'});v.cfg=cfg;const g=v.scene;g.background=new T.Color('#030615');g.userData.solidSeams428=true;v.camera.set(-7,11.4,16.5);v.focus.set(0,2,-.7);
 const glow=(gr,x,y,z,w,h,d,color='#a9f7ff')=>box(gr,x,y,z,w,h,d,color,{emissive:color,emissiveIntensity:.7});
 box(g,0,-.18,0,17,.32,15,'#080f20');box(g,0,3.3,-6.65,18,6.6,.16,'#05091b').renderOrder=-20;box(g,-8.65,3.3,-1.7,.15,6.6,10,'#05091b').renderOrder=-20;
 // Flowing amber graphic strips and cool white architectural edges.
 const c=document.createElement('canvas');c.width=1536;c.height=128;const x=c.getContext('2d');const grad=x.createLinearGradient(0,0,0,128);grad.addColorStop(0,'#fecc36');grad.addColorStop(.45,'#f0870b');grad.addColorStop(1,'#f9c13a');x.fillStyle=grad;x.fillRect(0,0,1536,128);for(let i=0;i<50;i++){x.strokeStyle=i%3?'#fff4a9':'#b95b0a';x.lineWidth=4+i%4;x.beginPath();x.moveTo(-100,i*17%128);x.bezierCurveTo(500,(i*11)%128,950,(i*29)%128,1630,(i*23)%128);x.stroke();}const amber=new T.CanvasTexture(c);amber.colorSpace=T.SRGBColorSpace;
 for(const y of[1.5,3.15]){const band=new T.Mesh(new T.PlaneGeometry(17.2,.65),new T.MeshBasicMaterial({map:amber}));band.position.set(0,y,-6.52);band.renderOrder=-18;g.add(band);const side=band.clone();side.geometry=new T.PlaneGeometry(9.8,.65);side.position.set(-8.54,y,-1.65);side.rotation.y=Math.PI/2;g.add(side);}
 for(const y of[.95,2.2,5.25,6.15]){glow(g,0,y,-6.43,17.3,.055,.045).renderOrder=-17;glow(g,-8.47,y,-1.5,.055,.055,10).renderOrder=-17;}
 for(const xx of[-8,-.5,7.8])glow(g,xx,3.2,-6.35,.055,6.2,.05).renderOrder=-17;
 // Open display pit below the elevated walkway.
 box(g,0,.0,-.6,13.6,.10,8.7,'#c2d8e6').renderOrder=-90;for(let j=0;j<16;j++)box(g,-6.65+j*.89,.06,-.65,.018,.018,8.55,'#7796ac').renderOrder=-89;
 const deck=new T.Group();g.add(deck);box(deck,0,1.58,4.3,15,.3,2.35,'#1c2130');box(deck,0,1.73,4.3,15,.035,2.35,'#303b4c',{roughness:.22,metalness:.6});
 for(const xx of[-7.0,7.0]){box(deck,xx,1.58,-.4,1,.3,7.4,'#1c2130');glow(deck,xx,1.75,-.4,.95,.035,7.4,'#e7faff');}glow(deck,0,1.78,5.47,15,.04,.06,'#d6faff');
 function rail(x1,z1,x2,z2){const len=Math.hypot(x2-x1,z2-z1),gr=new T.Group();gr.position.set((x1+x2)/2,0,(z1+z2)/2);gr.rotation.y=-Math.atan2(z2-z1,x2-x1);g.add(gr);const count=Math.ceil(len/1.6);for(let i=0;i<=count;i++)cyl(gr,-len/2+i*len/count,2.23,0,.027,1.04,'#b6cad6');box(gr,0,2.78,0,len+.05,.10,.10,'#d4e2e9');box(gr,0,2.65,.0,len,.045,.13,'#151a25');box(gr,0,1.85,0,len,.055,.055,'#8aa9bb');const glass=box(gr,0,2.24,0,len,.72,.018,'#9cd8e9',{transparent:true,opacity:.14,metalness:.15,roughness:.1,depthWrite:false});glass.renderOrder=1;return gr;}
 rail(-7,3.1,7,3.1);rail(-6.5,3.1,-6.5,-3.9);rail(6.5,3.1,6.5,-3.9);rail(-7.45,5.15,-7.45,3.2);rail(7.45,5.15,7.45,3.2);
 // Silver pedestal rails at the host and contestant's positions.
 for(const px of[-4.7,3.8]){for(const dx of[-.62,.62]){cyl(g,px+dx,2.25,4.0,.035,1.0,'#adbac9');cyl(g,px+dx,1.78,4.0,.12,.04,'#bbc5cd');}box(g,px,2.78,4.0,1.4,.07,.48,'#141927');glow(g,px,2.73,4.23,1.4,.045,.035,'#d6faff');}
 v.hostSlots.push({x:-4.7,z:4.25,y:1.75,pose:'standing'});v.playerSlots.push({x:3.8,z:4.22,y:1.75,pose:'standing',height425:2.15});v.playerCameraSlot418=v.playerSlots[0];
 // Photo-real household prizes occupy the lower display floor.
 addPrizes439(v);
 // Oversized rounded cyan video frame; the second contestant appears inside it.
 function roundedFrame(w,h,r){const s=new T.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return new T.ShapeGeometry(s,24);}
 const frame=new T.Mesh(roundedFrame(4.45,3.45,.6),mat('#b7f9ff',{emissive:'#69dfff',emissiveIntensity:.5}));frame.position.set(3.8,4.35,-5.68);frame.renderOrder=-16;g.add(frame);box(g,3.8,4.35,-5.59,3.9,2.88,.03,'#111a32').renderOrder=-15;for(let i=0;i<8;i++)for(let j=0;j<3;j++)glow(g,4.8+j*.18,3.2+i*.3,-5.54,.075,.075,.018,i%2?'#ffe06b':'#a9f9ff');glow(g,5.5,4.35,-5.53,.22,2.85,.018,'#f45e35');v.playerSlots.push({x:3.65,z:-5.45,y:3.05,pose:'standing',height425:2.45,videoCrop429:true,role:'video-contestant'});
 // This format has no decorative audience gallery.
 v.supportSlots=[];
 v.visibilityDoors429=mode=>{for(const a of v.actors)a.mesh.visible=mode==='host'?a.host:mode==='player'?a.slot===v.playerSlots[0]:true;};return v;
}
