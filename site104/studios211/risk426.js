import * as T from '../vendor/three175/three.module.js';
import {baseWorld,box,cyl,ring,plate,mat,buzzer} from './kit.js?v=426';
export function riskSet426(cfg){
 const v=baseWorld(cfg),g=v.scene;g.background=new T.Color('#02030d');v.camera.set(.7,6.0,16.1);v.focus.set(0,1.2,-.45);
 const glow=(group,x,y,z,w,h,d,color)=>box(group,x,y,z,w,h,d,color,{emissive:color,emissiveIntensity:.85});
 box(g,0,-.15,0,17,.26,13,'#3f2635');for(let i=-8;i<=8;i++)box(g,i,.0,0,.012,.012,12.8,'#715150');
 // Central white roundabout, raised host disc and three broad illuminated paths.
 cyl(g,0,.045,.9,2.85,.09,'#edf0f2');ring(g,2.8,.1,'#ffe9ff',.04,0,.9);cyl(g,0,.22,.9,1.98,.3,'#c8d7e5');ring(g,1.95,.38,'#e8dff0',.03,0,.9);
 const c=document.createElement('canvas');c.width=c.height=768;const x=c.getContext('2d');x.fillStyle='#157eb1';x.fillRect(0,0,768,768);x.fillStyle='#a92d8b';x.fillRect(0,180,768,230);x.textAlign='center';x.fillStyle='#fff';x.font='700 115px Arial';x.fillText('BÜYÜK',384,366);x.fillText('RİSK',384,500);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const logo=new T.Mesh(new T.CircleGeometry(1.9,64),new T.MeshBasicMaterial({map:tex}));logo.rotation.x=-Math.PI/2;logo.position.set(0,.383,.9);logo.renderOrder=1;g.add(logo);
 for(const side of[-1,1]){box(g,side*4.9,.08,1.1,5,.12,1.1,'#e9eef2');glow(g,side*4.9,.16,1.68,5,.04,.04,'#ef41d7');}
 box(g,0,.08,4.2,1.35,.12,4.2,'#eaf0f3');for(const xx of[-.72,.72])glow(g,xx,.16,4.2,.045,.04,4.2,'#ef41d7');
 // Right-hand bright blue raised contestant deck.
 box(g,4.75,.12,.4,4.8,.24,4.3,'#18a6df');for(const xx of[2.33,7.17])glow(g,xx,.27,.4,.05,.04,4.4,'#ec30d2');for(const z of[-1.77,2.57])glow(g,4.75,.27,z,4.9,.04,.05,'#ec30d2');
 v.riskPodiums426=[];v.riskScoreSigns426=[];
 for(let i=0;i<3;i++){const px=3.15+i*1.4,pz=-.8+i*.67,desk=new T.Group();desk.position.set(px,.25,pz+.25);g.add(desk);v.riskPodiums426.push(desk);
 box(desk,0,.68,0,.91,1.32,.72,'#b9c6d7');glow(desk,0,.51,.38,.53,.76,.04,'#b21cae');box(desk,0,1.38,0,1.02,.12,.82,'#e3ebef');const score=plate(desk,'0',0,1.11,.45,.72,.32,'#153c76','#eeffff');v.riskScoreSigns426.push(score);buzzer(desk,.29,1.49,.0);v.playerSlots.push({x:px,z:pz-.2,y:.25,pose:'standing',height425:2.1});}
 v.hostSlots.push({x:0,z:.9,y:.39,pose:'standing'});
 // Host's small side console, behind his central circle.
 box(g,.75,.67,-1.6,.8,1.3,.65,'#bdc6d0');glow(g,.75,.7,-1.25,.52,1.05,.04,'#c030b2');
 // Large category/value wall on the left, surrounded by mosaic border.
 const wall=new T.Group();wall.position.set(-4.6,0,-2.55);wall.rotation.y=.10;g.add(wall);v.objects.riskBoard426=wall;
 box(wall,0,3.0,0,6.65,6.35,.20,'#434463');for(let row=0;row<9;row++)for(let col=0;col<11;col++){if(row>0&&row<8&&col>0&&col<10)continue;box(wall,(col-5)*.59,.15+row*.7,.13,.56,.66,.035,['#a62685','#754c98','#d1712e','#287da9','#ac3c84'][(row*3+col)%5]);}
 const board=plate(wall,'',0,2.98,.18,5.68,4.63,'#123f93','#efdf9d'),bc=document.createElement('canvas');bc.width=1200;bc.height=1000;board.renderOrder=1;board.material.map.dispose();board.material.map=new T.CanvasTexture(bc);board.material.map.colorSpace=T.SRGBColorSpace;const bx=bc.getContext('2d');
 // Amber ribs and continuous blue graphic belt at the rear.
 box(g,3.0,2.8,-5.55,10.8,5.6,.16,'#c4b2ac');for(let i=0;i<30;i++)box(g,-1.9+i*.35,2.85,-5.42,.025,3.2,.06,'#bf834b');for(const y of[1.2,4.6])glow(g,3,y,-5.36,10.8,.07,.07,'#f9c09c');
 box(g,3,2.55,-5.25,10.8,1.2,.09,'#0d76b6');for(let i=0;i<23;i++){const bar=glow(g,-1.7+i*.44,2.5,-5.18,.04,.65,.03,i%3?'#4bcfff':'#c333dd');bar.rotation.z=-.5;}for(const y of[1.9,3.2])glow(g,3,y,-5.15,10.9,.055,.04,'#7bd9ff');
 for(const xx of[-2.1,2.4,7.4]){box(g,xx,2.85,-5.05,.27,5.5,.5,'#dfdce1');glow(g,xx,2.6,-4.77,.29,1.15,.045,'#d443e3');}
 // No freestanding spectator cluster: host and three contestants only.
 v.supportSlots=[];
 let signature='';v.refreshRisk426=s=>{s=s||{};const key=JSON.stringify(s);if(signature===key)return;signature=key;bx.fillStyle='#08285b';bx.fillRect(0,0,1200,1000);
 const cats=s.cats||['TARİH','COĞRAFYA','BİLİM','SANAT','SPOR','GENEL'];for(let col=0;col<6;col++){bx.fillStyle='#143e7b';bx.fillRect(col*200+3,4,194,144);bx.fillStyle='#f1f1e7';bx.textAlign='center';bx.textBaseline='middle';let size=30;bx.font='700 '+size+'px Arial';while(bx.measureText(cats[col]||'').width>181&&size>17){size--;bx.font='700 '+size+'px Arial'}bx.fillText(cats[col]||'',col*200+100,76);for(let row=0;row<5;row++){const cell=s.cells?.find(a=>a.cat===col&&a.level===row+1),value=cell?cell.value:(row+1)*100;bx.fillStyle=row%2?'#144eab':'#17469a';bx.fillRect(col*200+3,154+row*169,194,162);bx.fillStyle='#f0dc88';bx.font='700 63px Arial';bx.fillText(cell?.used?'':String(value),col*200+100,235+row*169);}}
 board.material.map.needsUpdate=true;for(let i=0;i<3;i++){const cv=v.riskScoreSigns426[i].material.map.image,ctx=cv.getContext('2d');ctx.fillStyle='#173c73';ctx.fillRect(0,0,1024,256);ctx.fillStyle='#f3ffff';ctx.textAlign='center';ctx.textBaseline='middle';const value=String(s.scores?.[i]??0);let size=200;ctx.font='700 '+size+'px Arial';while(ctx.measureText(value).width>940&&size>50){size-=5;ctx.font='700 '+size+'px Arial'}ctx.fillText(value,512,128);v.riskScoreSigns426[i].material.map.needsUpdate=true;}};
 v.refreshRisk426();return v;
}
