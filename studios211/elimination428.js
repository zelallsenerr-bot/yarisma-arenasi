import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,ring,mat,buzzer} from './kit.js?v=420';
// Kim Gitsin: five radiating consoles, a separate host desk and white curved set walls.
export function eliminationSet428(cfg){
 const v=baseWorld({...cfg,layout:'risk'});v.cfg=cfg;const g=v.scene;g.userData.solidSeams428=true;g.background=new T.Color('#360954');v.camera.set(-6,7.0,17.8);v.focus.set(-.3,1.25,-.3);
 const glow=(group,x,y,z,w,h,d,color='#ed36f1')=>box(group,x,y,z,w,h,d,color,{emissive:color,emissiveIntensity:.7});
 box(g,0,-.24,0,18,.24,15,'#2b1c39',{roughness:.18,metalness:.5});
 // Purple cyclorama; the bright lower belt follows the programme's pink lighting.
 box(g,0,2.85,-6.3,18,6,.15,'#790e9e').renderOrder=-20;box(g,-8,2.6,-1.6,.15,5.5,9.3,'#7b109e').renderOrder=-20;
 for(let i=0;i<18;i++)glow(g,-8.5+i,0.1,-6.08,.38,.18,.2,i%3?'#b92beb':'#622af1');
 cyl(g,0,.03,1.25,4.15,.32,'#e8dfef');cyl(g,0,.23,1.25,3.91,.12,'#503b5c');ring(g,3.92,.30,'#fa56f4',.035,0,1.25);ring(g,4.14,.15,'#fff4ff',.025,0,1.25);
 // White front steps and spoke seams around the low round platform.
 for(let i=0;i<11;i++){const a=-.12+i*Math.PI/10,grp=new T.Group();grp.position.set(Math.cos(a)*4.48,.0,1.25+Math.sin(a)*4.48);grp.rotation.y=-a+Math.PI/2;g.add(grp);box(grp,0,.02,0,1.16,.12,.6,'#f1eaf3');glow(grp,0,.1,.3,1.1,.035,.035,'#eaa9f6');}
 function logoCanvas(square=true){const c=document.createElement('canvas');c.width=square?768:1536;c.height=768;const x=c.getContext('2d'),cx=c.width/2,cy=384;x.fillStyle='#180e42';x.fillRect(0,0,c.width,c.height);const gradient=x.createRadialGradient(cx,cy,70,cx,cy,650);gradient.addColorStop(0,'#4632ae');gradient.addColorStop(1,'#100a36');x.fillStyle=gradient;x.fillRect(0,0,c.width,c.height);
 for(let r=240;r<700;r+=82){x.strokeStyle=r%3?'#7139ce':'#324ed1';x.lineWidth=15;x.beginPath();x.arc(cx,cy,r,0,7);x.stroke();for(let j=0;j<48;j++){const a=j*Math.PI/24;x.fillStyle=j%3?'#e966e5':'#5b77ff';x.beginPath();x.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),5.5,0,7);x.fill();}}
 x.fillStyle='#d59c42';x.beginPath();x.arc(cx,cy,218,0,7);x.fill();x.fillStyle='#4933a0';x.beginPath();x.arc(cx,cy,203,0,7);x.fill();x.textAlign='center';x.textBaseline='middle';x.lineJoin='round';x.strokeStyle='#14254a';x.lineWidth=16;x.font='900 126px Arial';x.strokeText('Kim?',cx,329);x.fillStyle='#fff';x.fillText('Kim?',cx,329);x.font='900 110px Arial';x.strokeText('gitsin',cx,435);x.fillText('gitsin',cx,435);return c;}
 const logoTex=new T.CanvasTexture(logoCanvas());logoTex.colorSpace=T.SRGBColorSpace;const floorLogo=new T.Mesh(new T.CircleGeometry(1.38,64),new T.MeshBasicMaterial({map:logoTex}));floorLogo.rotation.x=-Math.PI/2;floorLogo.position.set(0,.301,1.25);floorLogo.renderOrder=1;g.add(floorLogo);ring(g,1.42,.304,'#ff8cf8',.028,0,1.25);
 // Separate picture wall, offset to the right behind the host.
 box(g,3.2,3.15,-5.94,7.7,4.35,.28,'#593367').renderOrder=-19;const screenTex=new T.CanvasTexture(logoCanvas(false));screenTex.colorSpace=T.SRGBColorSpace;const screen=new T.Mesh(new T.PlaneGeometry(7.3,3.98),new T.MeshBasicMaterial({map:screenTex}));screen.position.set(3.2,3.15,-5.78);screen.renderOrder=-18;g.add(screen);
 function arch(x,z,w,h){const shape=new T.Shape();shape.moveTo(-w/2,0);shape.absellipse(0,0,w/2,h,Math.PI,0,true);shape.lineTo(w/2-.19,0);shape.absellipse(0,0,w/2-.19,h-.19,0,Math.PI,false);shape.closePath();const white=new T.Mesh(new T.ExtrudeGeometry(shape,{depth:.18,bevelEnabled:false,curveSegments:40}),mat('#faf5fb'));white.position.set(x,.21,z);g.add(white);
 for(let j=0;j<14;j++){const xx=-w/2+.28+j*(w-.56)/13,yy=(h-.26)*Math.sqrt(Math.max(0,1-(xx/(w/2))**2));box(g,x+xx,.26+yy/2,z+.08,.045,yy,.045,'#f5b0c7');}box(g,x,.2,z+.1,w,.15,.55,'#edb4d3');}
 arch(-4.9,-3.2,4.8,1.7);arch(-.6,-4.6,4.8,2.0);arch(7.2,-1.9,3.7,1.6);
 const slots=[[-5.3,1.1],[-4.4,-.35],[-3.1,-1.55],[-1.65,-2.35],[-.1,-2.65]];
 for(let i=0;i<slots.length;i++){const [px,pz]=slots[i],grp=new T.Group();grp.position.set(px,.19,pz);grp.rotation.y=[.42,.30,.19,.10,.02][i];g.add(grp);
 // Sloping console body, wider at its foot and with an inset square monitor.
 const shape=new T.Shape();shape.moveTo(-.55,0);shape.lineTo(.55,0);shape.lineTo(.43,1.36);shape.quadraticCurveTo(.18,1.6,-.33,1.38);shape.lineTo(-.55,0);const body=new T.Mesh(new T.ExtrudeGeometry(shape,{depth:.7,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.065,bevelThickness:.035}),mat('#807383'));body.position.z=-.35;grp.add(body);
 box(grp,0,1.47,.0,1.06,.11,.8,'#b5a7b8');buzzer(grp,-.28,1.56,-.1);glow(grp,0,.91,.405,.68,.48,.035);box(grp,0,.91,.432,.58,.38,.035,'#171127');glow(grp,0,.91,.456,.16,.025,.015,'#bfb0dd');
 const edge=new T.BufferGeometry().setFromPoints([new T.Vector3(-.42,1.35,.45),new T.Vector3(.42,1.35,.45),new T.Vector3(.54,.03,.45)]);grp.add(new T.Line(edge,new T.LineBasicMaterial({color:'#e952df'})));
 const start=new T.Vector3(px,.32,pz+.5),end=new T.Vector3((i-2)*.33,.32,.6);const route=new T.BufferGeometry().setFromPoints([start,end]);g.add(new T.Line(route,new T.LineBasicMaterial({color:'#f448ee'})));
 const participant=window.ArenaEliminationStage446?.()?.[i];v.playerSlots.push({x:px,z:pz-.50,y:.55,pose:'standing',height425:2.1,name:participant?.name,castId417:participant?.id?'ortak-kasa-'+participant.id:undefined,gender:i===1||i===3?'female':'male',eliminationIndex446:i});}
 // Broad silver desk with lit magenta fascia, on the right opposite the contestants.
 const hostDesk=new T.Group();hostDesk.position.set(5.6,.0,.6);hostDesk.rotation.y=-.25;g.add(hostDesk);box(hostDesk,0,.75,0,1.9,1.5,.75,'#ada4b5');box(hostDesk,0,1.53,0,2.3,.14,1.12,'#e6dce9');glow(hostDesk,0,1.28,.43,2.08,.16,.06);box(hostDesk,0,.69,.41,1.5,1.1,.08,'#3c274c');box(hostDesk,0,1.66,-.14,.85,.04,.55,'#181321');
 v.hostSlots.push({x:5.6,z:-.15,y:.35,pose:'standing'});v.playerCameraSlot418=v.playerSlots[0];
 v.refreshElimination446=players=>{if(!Array.isArray(players))return;for(const slot of v.playerSlots){const p=players[slot.eliminationIndex446];if(p&&typeof p.active==='boolean')slot.active446=p.active;}};
 v.visibilityElimination428=mode=>{for(const a of v.actors){const active=a.host||a.slot.active446!==false;const camera=mode==='host'?a.host:mode==='player'?!a.host&&a.slot===v.playerSlots[0]:mode!=='companion';a.mesh.visible=active&&camera;}};
 return v;
}
