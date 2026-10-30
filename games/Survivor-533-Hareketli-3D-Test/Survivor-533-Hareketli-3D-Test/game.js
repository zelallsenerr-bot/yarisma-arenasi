import * as T from './vendor/three.module.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
const $=id=>document.getElementById(id),holder=$('game'),angle=$('angle'),power=$('power'),score=$('score'),status=$('status'),powerText=$('powerText'),shoot=$('shoot'),msg=$('msg');
let renderer,scene,camera,clock,character,armPivot,ball=null,targets=[],shots=8,hits=0,camMode=0,throwTime=0,flight=null,shake=0,noticeUntil=0;
const clamp=T.MathUtils.clamp;
try{renderer=new T.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;holder.insertBefore(renderer.domElement,holder.firstChild);}catch(e){$('error').style.display='block';$('error').textContent='WebGL başlatılamadı: '+e.message;throw e}
scene=new T.Scene();scene.background=new T.Color('#8cc4d1');scene.fog=new T.Fog('#9ac9c4',20,64);camera=new T.PerspectiveCamera(53,16/9,.08,120);clock=new T.Clock();
scene.add(new T.HemisphereLight('#f5f7e2','#876b46',2.2));const sun=new T.DirectionalLight('#fff1d5',3.3);sun.position.set(-9,18,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-22;sun.shadow.camera.right=22;sun.shadow.camera.top=22;sun.shadow.camera.bottom=-22;scene.add(sun);
const mat=(color,roughness=.9)=>new T.MeshStandardMaterial({color,roughness});const sand=mat('#c4a372'),wood=mat('#6e4a2e'),darkWood=mat('#3d2b20'),red=mat('#ba422d'),cream=mat('#efe0af'),blue=mat('#1f5361'),skin=mat('#b67b54'),hair=mat('#1d1716'),black=mat('#282625');
function mesh(geo,m,x=0,y=0,z=0,parent=scene){const o=new T.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function box(w,h,d,m,x,y,z,parent){return mesh(new T.BoxGeometry(w,h,d),m,x,y,z,parent)}function cyl(rt,rb,h,m,x,y,z,parent,n=16){return mesh(new T.CylinderGeometry(rt,rb,h,n),m,x,y,z,parent)}function ballMesh(r,m,x,y,z,parent){return mesh(new T.SphereGeometry(r,18,12),m,x,y,z,parent)}
box(90,.35,90,sand,0,-.2,-13);box(8,.25,2.7,wood,0,.08,2.0);for(let i=-4;i<=4;i++)box(.06,.04,2.7,darkWood,i*.86,.23,2);
// Shooting stand, target scaffold, and surrounding flags
for(let x of [-4.3,4.3]){box(.2,2.6,.2,wood,x,1.25,-17.5);box(.2,2.6,.2,wood,x,1.25,-19);box(.2,.2,2,wood,x,2.45,-18.25)}box(9,.22,.2,darkWood,0,2.5,-18.25);box(9,.22,.2,darkWood,0,.48,-18.25);
for(let i=0;i<5;i++){const x=(i-2)*1.75;box(.95,.13,.5,wood,x,.72,-17.65);const stand=cyl(.075,.085,1.1,darkWood,x,1.25,-17.7);const target=new T.Group();target.position.set(x,1.86,-17.6);scene.add(target);const plate=cyl(.48,.48,.13,cream,0,0,0,target,32);plate.rotation.x=Math.PI/2;const ring=cyl(.33,.33,.145,red,0,0,.01,target,32);ring.rotation.x=Math.PI/2;const core=cyl(.17,.17,.16,cream,0,0,.025,target,32);core.rotation.x=Math.PI/2;targets.push({group:target,x,hit:false,fall:0});}
for(let x of [-6,6]){cyl(.09,.11,5,wood,x,2.5,-18);const flag=box(1.7,.8,.04,x<0?red:blue,x+.83,4.35,-18);flag.rotation.y=.15}
for(let z=-25;z<10;z+=7)for(let x of [-15,15]){const trunk=cyl(.15,.23,3.6,wood,x,1.8,z);trunk.rotation.z=x>0?-.15:.15;const crown=new T.Group();crown.position.set(x,3.7,z);scene.add(crown);for(let j=0;j<7;j++){let leaf=mesh(new T.ConeGeometry(.45,3.6,5),mat(j%2?'#327d4b':'#3c8e55'),0,0,0,crown);leaf.rotation.z=Math.PI/2;leaf.rotation.y=j*Math.PI*2/7;leaf.position.set(Math.cos(j*6.28/7)*1.1,.1,Math.sin(j*6.28/7)*1.1)}}
// Stylized human seen from behind, rigged into separate upper arm for throwing
character=new T.Group();character.position.set(-.8,0,3.1);scene.add(character);
const torso=box(.82,1.18,.42,blue,0,1.68,0,character);torso.rotation.x=.08;box(.8,.16,.43,cream,0,1.18,0,character);box(.78,.45,.46,red,0,.95,0,character);for(let s of [-1,1]){let thigh=cyl(.16,.17,.7,skin,s*.22,.56,0,character);thigh.rotation.x=.08;let calf=cyl(.12,.15,.55,skin,s*.22,.17,.05,character);calf.rotation.x=-.08;box(.27,.13,.47,black,s*.22,.08,-.12,character)}
const neck=cyl(.16,.17,.2,skin,0,2.35,0,character),head=ballMesh(.29,skin,0,2.62,0,character);const cap=ballMesh(.30,hair,0,2.75,.02,character);cap.scale.set(1,.42,1);box(.55,.05,.17,hair,0,2.73,-.24,character);
const leftArm=new T.Group();leftArm.position.set(-.54,2.14,0);character.add(leftArm);cyl(.14,.12,.68,skin,0,-.32,0,leftArm);cyl(.11,.10,.48,skin,-.06,-.8,-.05,leftArm);
armPivot=new T.Group();armPivot.position.set(.55,2.13,0);character.add(armPivot);cyl(.145,.12,.69,skin,0,-.34,0,armPivot);cyl(.12,.10,.48,skin,.02,-.88,-.02,armPivot);ballMesh(.13,skin,.02,-1.1,-.02,armPivot);
// Animated skinned human, loaded locally. This is NOT a likeness of a named contestant.
let athlete=null, shoulder=null, elbow=null, spine=null, headBone=null, pelvis=null, restPose={},hairStrands=[];
const placeholderParts=[...character.children];
new GLTFLoader().load('./assets/sam.glb',gltf=>{
 const figure=gltf.scene;
 figure.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;}});
 const bb=new T.Box3().setFromObject(figure);
 const h=bb.max.y-bb.min.y;
 if(!(h>0))return;
 const scale=1.82/h;
 figure.scale.setScalar(scale);
 figure.position.y=-bb.min.y*scale;
 figure.rotation.y=0;
 character.add(figure);
 athlete=figure;
 figure.traverse(o=>{if(!o.isBone)return;
   if(/upperarm_r|upper_arm_r|rightarm/i.test(o.name))shoulder=o;
   if(/lowerarm_r|forearm_r|rightforearm/i.test(o.name))elbow=o;
   if(/spine_01|spine1|spine/i.test(o.name)&&!spine)spine=o;
   if(/head/i.test(o.name)&&!headBone)headBone=o;
   if(/hips|pelvis/i.test(o.name))pelvis=o;
 });
 for(const o of [shoulder,elbow,spine,headBone,pelvis])if(o)restPose[o.uuid]=o.quaternion.clone();
 // Short-haired athletic contestant styling from user reference. Not an exact facial likeness.
 figure.traverse(o=>{if(!o.isMesh||!o.material)return; const n=o.name.toLowerCase();
   if(/shirt|top|tshirt|body_cloth|uppercloth/.test(n)){o.material=o.material.clone();o.material.color.set('#292e33');}
   if(/pant|short|trouser/.test(n)){o.material=o.material.clone();o.material.color.set('#b82d27');}
 });
 if(headBone){
   const darkHair=new T.MeshStandardMaterial({color:'#18120f',roughness:.98,side:T.DoubleSide});
   const hairCap=new T.Mesh(new T.SphereGeometry(.115,20,14,0,Math.PI*2,0,Math.PI*.53),darkHair);
   hairCap.position.set(0,.085,0);headBone.add(hairCap);
   for(let i=0;i<5;i++){
     const theta=(i/5)*Math.PI*1.25+.85;
     const strand=new T.Mesh(new T.CapsuleGeometry(.012,.025+(i%3)*.008,4,6),darkHair);
     strand.position.set(Math.cos(theta)*.095,.075,Math.sin(theta)*.085);
     strand.rotation.z=.12*Math.sin(i*3);headBone.add(strand);hairStrands.push({strand,i});
   }
   const beard=new T.Mesh(new T.SphereGeometry(.087,12,8),darkHair);
   beard.scale.set(.8,.65,.55);beard.position.set(0,-.075,-.065);headBone.add(beard);
 }
 placeholderParts.forEach(o=>o.visible=false);
 announce('HAREKETLİ 3D KARAKTER HAZIR');
},undefined,e=>{console.warn('Model loading failed',e);announce('MODEL AÇILAMADI — YEDEK KARAKTER');});

// jersey detail on back
const number=new T.CanvasTexture((()=>{const c=document.createElement('canvas');c.width=256;c.height=256;const ctx=c.getContext('2d');ctx.clearRect(0,0,256,256);ctx.fillStyle='#f7d995';ctx.textAlign='center';ctx.font='bold 116px Arial';ctx.fillText('01',128,155);ctx.font='bold 34px Arial';ctx.fillText('YARIŞMACI',128,54);return c})());number.colorSpace=T.SRGBColorSpace;// No floating jersey decal over the skinned character.
const ballMaterial=mat('#e6d2a5',.55);const lineMaterial=mat('#bd6a38');
function makeBall(){let b=ballMesh(.16,ballMaterial,0,0,0);for(let i=0;i<3;i++){let ring=mesh(new T.TorusGeometry(.161,.008,5,48),lineMaterial,0,0,0,b);ring.rotation.set(i*.95,i*.8,0)}return b}
const crosshair=(()=>{const group=new T.Group();const ring=mesh(new T.TorusGeometry(.36,.022,6,48),new T.MeshBasicMaterial({color:'#f8df90'}),0,0,0,group);return group})();scene.add(crosshair);
function announce(t){msg.textContent=t;msg.classList.add('on');noticeUntil=performance.now()+1400}function update(){score.textContent=`${hits}/5 HEDEF · ${shots} TOP`;powerText.textContent=`ATIŞ GÜCÜ %${power.value}`;shoot.disabled=!!flight||shots===0||hits===5;status.textContent=hits===5?'KAZANDIN':shots===0?'TOPLAR BİTTİ':flight?'TOP HAVADA':'NİŞAN AL'}
function reset(){shots=8;hits=0;flight=null;throwTime=0;targets.forEach(t=>{t.hit=false;t.fall=0;t.group.rotation.x=0;t.group.position.y=1.86;t.group.visible=true});if(ball){scene.remove(ball);ball=null}announce('FİNAL ATIŞI BAŞLIYOR');update()}
function fire(){if(flight||shots<=0||hits===5)return;shots--;const a=+angle.value*Math.PI/180,p=+power.value/100;const origin=new T.Vector3(-.38,1.65,2.6);const dest=new T.Vector3(Math.tan(a)*14.3,1.86,-17.6);const time=.88+(.98-p)*.55;const vel=dest.clone().sub(origin).divideScalar(time);vel.y+=.5*9.8*time;ball=makeBall();ball.position.copy(origin);flight={origin,vel,t:0,time,hit:false};throwTime=.55;update()}
function resize(){const w=holder.clientWidth,h=holder.clientHeight||w*9/16;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}new ResizeObserver(resize).observe(holder);resize();
function tick(){requestAnimationFrame(tick);const dt=Math.min(clock.getDelta(),.04);const now=clock.elapsedTime;if(noticeUntil&&performance.now()>noticeUntil){msg.classList.remove('on');noticeUntil=0}const a=+angle.value*Math.PI/180;character.rotation.y=-a*.42;armPivot.rotation.x=-.35;if(throwTime>0){throwTime=Math.max(0,throwTime-dt);armPivot.rotation.x=-1.8*Math.sin((1-throwTime/.55)*Math.PI)-.35;character.rotation.z=.065*Math.sin((1-throwTime/.55)*Math.PI)}else character.rotation.z*=.9;
if(athlete){
 // Controlled throw sequence: anticipation, wind-up, release and recovery.
 const progress=throwTime>0?1-throwTime/.55:0;
 const ease=x=>x*x*(3-2*x);
 const wind=throwTime>0?Math.sin(Math.PI*ease(Math.min(progress/.72,1))):0;
 const follow=throwTime>0?Math.sin(Math.PI*Math.min(1,Math.max(0,(progress-.42)/.58))):0;
 if(shoulder){shoulder.quaternion.copy(restPose[shoulder.uuid]);shoulder.rotateX(-.25-1.05*wind+.55*follow);shoulder.rotateZ(-.25-.2*wind);}
 if(elbow){elbow.quaternion.copy(restPose[elbow.uuid]);elbow.rotateX(-.25-.65*wind+.7*follow);}
 if(spine){spine.quaternion.copy(restPose[spine.uuid]);spine.rotateY(-a*.32+.22*wind-.16*follow);spine.rotateX(.018*Math.sin(now*2.3)+.1*wind);}
 if(headBone){headBone.quaternion.copy(restPose[headBone.uuid]);headBone.rotateY(a*.08);}
 if(pelvis){pelvis.quaternion.copy(restPose[pelvis.uuid]);pelvis.rotateY(-.09*wind);}
 for(const {strand,i} of hairStrands){strand.rotation.z=.05*Math.sin(now*3+i*.7)+.16*wind;} // subtle hair follow-through
}

const targetX=Math.tan(a)*14.3;crosshair.position.set(targetX,1.86,-17.35);crosshair.rotation.y=0;crosshair.visible=!flight;
if(flight){flight.t+=dt;const t=flight.t;ball.position.copy(flight.origin).addScaledVector(flight.vel,t);ball.position.y-=4.9*t*t;ball.rotation.x+=dt*14;ball.rotation.z+=dt*7;if(ball.position.z<=-17.35||ball.position.y<.15){let match=targets.find(q=>!q.hit&&Math.abs(q.x-ball.position.x)<.46&&Math.abs(1.86-ball.position.y)<.53&&ball.position.z<-16.9);if(match){match.hit=true;hits++;announce('İSABET!');shake=.15}else announce('ISKA!');scene.remove(ball);ball=null;flight=null;update();if(hits===5)announce('TÜM HEDEFLER DEVİRİLDİ!');else if(shots===0)announce('TOPLAR BİTTİ — TEKRAR DENE') }}
targets.forEach(q=>{if(q.hit){q.fall=Math.min(1,q.fall+dt*2.6);q.group.rotation.x=-q.fall*1.52;q.group.position.y=1.86-q.fall*.35}});
const desired=camMode===0?new T.Vector3(-.3,3.2,12.5):new T.Vector3(6.8,3.5,11.5);camera.position.lerp(desired,1-Math.exp(-dt*4));const look=new T.Vector3(camMode===0?0:-.5,1.65,-11);camera.lookAt(look);if(shake>0){camera.position.x+=(Math.random()-.5)*shake;shake=Math.max(0,shake-dt)}renderer.render(scene,camera)}
$('shoot').onclick=fire;$('reset').onclick=reset;$('camera').onclick=()=>camMode=1-camMode;power.oninput=update;window.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();fire()}if(e.code==='ArrowLeft')angle.value=clamp(+angle.value-2,-24,24);if(e.code==='ArrowRight')angle.value=clamp(+angle.value+2,-24,24);if(e.code==='ArrowUp')power.value=clamp(+power.value+3,35,100);if(e.code==='ArrowDown')power.value=clamp(+power.value-3,35,100);update()});let dragging=false;renderer.domElement.addEventListener('pointerdown',e=>{dragging=true;renderer.domElement.setPointerCapture(e.pointerId)});renderer.domElement.addEventListener('pointerup',()=>dragging=false);renderer.domElement.addEventListener('pointermove',e=>{if(!dragging)return;const r=renderer.domElement.getBoundingClientRect();angle.value=Math.round(clamp(((e.clientX-r.left)/r.width-.5)*48,-24,24))});reset();tick();
