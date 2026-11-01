import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,ring,mat,plate} from './kit.js?v=420';
const ROWS=[[0],[-1,1],[-2,0,2],[-1,1],[-2,0,2],[-3,-1,1,3],[-2,0,2],[-3,-1,1,3],[-4,-2,0,2,4],[-3,-1,1,3],[-2,0,2],[-3,-1,1,3],[-2,0,2],[-1,1],[0]];
export function honeycombSet430(cfg){
 const v=baseWorld({...cfg,layout:'risk'});v.cfg=cfg;const g=v.scene;g.background=new T.Color('#030e1c');g.userData.solidSeams428=true;v.camera.set(.3,3.7,12.8);v.focus.set(0,2.2,-.7);
 const glow=(gr,x,y,z,w,h,d,color='#41e9fa')=>box(gr,x,y,z,w,h,d,color,{emissive:color,emissiveIntensity:.9});
 cyl(g,0,-.13,.4,6.5,.22,'#121e26');ring(g,5.8,.015,'#c7bc85',.045,0,.4);ring(g,5.4,.02,'#9dc6cf',.018,0,.4);
 // Angled architectural surround with parallel cyan, brass and silver rails.
 const outline=[[-6.6,.2],[-7.8,3.4],[-6.8,6.1],[-3.2,7.1],[3.2,7.1],[6.8,6.1],[7.8,3.4],[6.6,.2]];
 function tube(points,color,width,z,scale=1){const curve=new T.CurvePath();for(let i=1;i<points.length;i++)curve.add(new T.LineCurve3(new T.Vector3(points[i-1][0]*scale,points[i-1][1]*scale,z),new T.Vector3(points[i][0]*scale,points[i][1]*scale,z)));const mesh=new T.Mesh(new T.TubeGeometry(curve,points.length*10,width,6,false),mat(color,{emissive:color,emissiveIntensity:color==='#36e7ff'?.6:.12}));g.add(mesh);return mesh;}
 tube(outline,'#2b3b4d',.26,-4.18);tube(outline,'#36e7ff',.10,-3.86,.965);tube(outline,'#bcab61',.055,-3.80,1.025);tube(outline,'#78959a',.065,-3.74,.925);
 // Warm honeycomb LED wall, generated deterministically as a native canvas texture.
 const c=document.createElement('canvas');c.width=1400;c.height=900;const x=c.getContext('2d'),gradient=x.createRadialGradient(700,470,70,700,470,800);gradient.addColorStop(0,'#b27735');gradient.addColorStop(.5,'#764a31');gradient.addColorStop(1,'#1c2636');x.fillStyle=gradient;x.fillRect(0,0,1400,900);
 function hex(ctx,cx,cy,r){ctx.beginPath();for(let j=0;j<6;j++){let a=j*Math.PI/3;let xx=cx+Math.cos(a)*r,yy=cy+Math.sin(a)*r;j?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)}ctx.closePath();}
 for(let row=0;row<20;row++)for(let col=0;col<26;col++){hex(x,col*58+(row%2)*29,row*49,31);x.strokeStyle=(row+col)%3?'#ce925622':'#f5b05b33';x.lineWidth=2;x.stroke();}const wallTex=new T.CanvasTexture(c);wallTex.colorSpace=T.SRGBColorSpace;const wall=new T.Mesh(new T.PlaneGeometry(13.1,6.65),new T.MeshBasicMaterial({map:wallTex}));wall.position.set(0,3.45,-4.3);wall.renderOrder=-20;g.add(wall);
 // The same 44-cell, fifteen-band board as the game's selectable route.
 v.petekCells430=new Map();const hexGeo=new T.CircleGeometry(.363,6),borderGeo=new T.CircleGeometry(.40,6);
 ROWS.forEach((cols,row)=>cols.forEach(col=>{const px=col*.60,py=6.00-row*.34641,id=row+':'+col,border=new T.Mesh(borderGeo,mat('#bbb78b')),cell=new T.Mesh(hexGeo,mat(row===14?'#c28a45':'#173b4c',{roughness:.3}));border.position.set(px,py,-4.02);cell.position.set(px,py,-3.99);border.renderOrder=-16;cell.renderOrder=-15;g.add(border,cell);v.petekCells430.set(id,cell);}));
 const titleCanvas=document.createElement('canvas');titleCanvas.width=titleCanvas.height=512;const tc=titleCanvas.getContext('2d');tc.fillStyle='#173b4c';tc.fillRect(0,0,512,512);tc.fillStyle='#eee4bd';tc.font='700 140px Arial';tc.textAlign='center';tc.textBaseline='middle';tc.fillText('ALTIN',256,172);tc.fillText('PETEK',256,340);const titleTex=new T.CanvasTexture(titleCanvas);titleTex.colorSpace=T.SRGBColorSpace;const title=new T.Mesh(new T.PlaneGeometry(.63,.48),new T.MeshBasicMaterial({map:titleTex}));title.position.set(0,6.0,-3.94);title.renderOrder=-14;g.add(title);
 // Fine amber dot strips on the sloping side sections.
 for(const side of[-1,1])for(let row=0;row<21;row++)for(let col=0;col<4;col++){const yy=.45+row*.25,xx=side*(6.75+.55*Math.sin((yy/5.7)*Math.PI)+col*.13);const dot=new T.Mesh(new T.CircleGeometry(.035,8),new T.MeshBasicMaterial({color:(row+col)%3?'#e6d46f':'#87baca'}));dot.position.set(xx,yy,-3.61);g.add(dot);}
 // Symmetrical shallow staircase wings with lit risers.
 for(const side of[-1,1])for(let i=0;i<6;i++){const px=side*(5.5+i*.33),pz=.75-i*.72,y=i*.19;box(g,px,y-.08,pz,1.8,.20,.76,'#475963');glow(g,px,y+.01,pz+.37,1.8,.075,.035);}
 // Open hexagonal console: silver frame containing bright double cyan rails.
 const consolePoints=[[-1.03,1.88],[-1.48,.92],[-.82,.14],[.82,.14],[1.48,.92],[1.03,1.88]];
 tube(consolePoints,'#627b86',.14,1.20);tube(consolePoints,'#36e7ff',.092,1.32);tube(consolePoints.map(([a,b])=>[a*.80,(b-.9)*.80+.9]),'#b5f7ff',.045,1.37);
 box(g,0,.10,1.2,2.55,.16,.64,'#a6bfc5');glow(g,0,.195,1.48,2.45,.055,.04);
 for(const side of[-1,1]){const monitor=new T.Group();monitor.position.set(side*1.06,1.92,1.2);monitor.rotation.z=-side*.28;g.add(monitor);box(monitor,0,.04,0,.62,.10,.62,'#adbdc5');const screen=box(monitor,0,.10,0,.53,.04,.49,'#102035');screen.rotation.x=-.12;}
 v.playerSlots.push({x:-2.9,z:1.35,y:.02,pose:'seated',petek430:true});v.hostSlots.push({x:2.9,z:1.35,y:.02,pose:'seated',petek430:true});v.playerCameraSlot418=v.playerSlots[0];
 v.visibilityPetek430=mode=>{for(const a of v.actors)a.mesh.visible=mode==='host'?a.host:mode==='player'?!a.host:true;};
 let signature='';v.refreshPetek430=s=>{if(!s?.nodes)return;const key=s.nodes.map(n=>n.id+'='+n.status).join(';');if(key===signature)return;signature=key;for(const n of s.nodes){const cell=v.petekCells430.get(n.id);if(cell)cell.material.color.set(({current:'#f6b749',correct:'#bb963c',passed:'#bb963c',available:'#34899a',wrong:'#9e2938',locked:'#173b4c'})[n.status]||'#173b4c');}};
 return v;
}
