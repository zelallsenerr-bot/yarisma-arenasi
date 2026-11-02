import * as T from '../vendor/three175/three.module.js';
let atlas,atlas418;
export function audienceTexture413(){if(!atlas){atlas=new T.TextureLoader().load(new URL('./audience413.webp',import.meta.url).href,()=>window.dispatchEvent(new Event('studio211:asset')));atlas.colorSpace=T.SRGBColorSpace}return atlas}
function audienceTexture418(){if(!atlas418){atlas418=new T.TextureLoader().load(new URL('./audience418.webp',import.meta.url).href,()=>window.dispatchEvent(new Event('studio211:asset')));atlas418.colorSpace=T.SRGBColorSpace}return atlas418}
export function audiencePerson413(index=0,height=1.5){const local=index%24,col=local%6,row=Math.floor(local/6)%4,g=new T.PlaneGeometry(index>=24?height:height*2/3,height),uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,(col+uv.getX(i))/6,1-(row+1-uv.getY(i))/4);return new T.Mesh(g,new T.MeshBasicMaterial({map:index>=24?audienceTexture418():audienceTexture413(),transparent:true,alphaTest:.08,side:T.DoubleSide,toneMapped:false}))}
const hash=s=>Array.from(s).reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,73);
export function addAudience413(v){v.audience413=[];const million=v.cfg.layout==='millionaire',seed=hash(v.cfg.id),layout=v.cfg.audienceLayout||'side-wings';
 const dimensions={'son-karar':[3,16],'yetenek-sahnesi':[5,18],'donen-koltuklar':[4,16],'kismet-locasi':[3,12],'turnike':[2,16],'hepsi-benim':[2,12],'sahane-pazar':[4,16],'eyvah-dusuyorum':[3,16]};
 const [rows,columns]=dimensions[v.cfg.id]||[2,12];let n=0;
 for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){
 const half=columns/2,side=col<half?-1:1,j=col%half,theta=(j/(half-1))*.7+.15,rad=4.6+row*.72;
 let x,z,y;
 if(million){x=side*(2.15+Math.sin(theta)*rad*.66);z=-2.8-Math.cos(theta)*rad*.4-row*.3;y=.48+row*.49}
 else if(layout==='side-wings'){x=side*(4.2+row*.58);z=2.2-j*.8;y=.28+row*.43}
 else if(layout==='theatre'){x=(col-(columns-1)/2)*.63;z=5.15+row*.7;y=.18+row*.4}
 else{x=(col-(columns-1)/2)*.64;z=-4.2-row*.72;y=.25+row*.45}
 const index=(n*7+seed)%48,m=audiencePerson413(index,1.35+(n%3)*.035);m.position.set(x,y+.675,z);m.material.color.set(million?'#29243e':['#747081','#8e8794','#686b80'][(n+seed)%3]);m.rotation.y=(side===1?-.08:.08)+(n%3-1)*.07;v.scene.add(m);v.audience413.push({mesh:m,baseY:m.position.y,index,phase:n*1.7+seed,yaw:m.rotation.y});n++}
 if(million){const m=audiencePerson413(7,1.6);m.position.set(-2.05,1.42,-2.85);m.visible=false;v.scene.add(m);v.companion413=m;v.companionSlot413=new T.Vector3(-2.05,1.42,-2.85);const spot=new T.SpotLight('#fff0da',35,9,.16,.7,1);spot.position.set(-2.05,6,-2.55);spot.target.position.copy(v.companionSlot413);v.scene.add(spot,spot.target);spot.visible=false;v.companionLight413=spot;const cone=new T.Mesh(new T.ConeGeometry(.47,4.4,24,1,true),new T.MeshBasicMaterial({color:'#ffdfad',transparent:true,opacity:.055,depthWrite:false,side:T.DoubleSide}));cone.position.set(-2.05,3.8,-2.85);v.scene.add(cone);cone.visible=false;v.companionCone413=cone;
 // Reserve a real seat for the relative; no overlapping background person.
 for(const a of v.audience413)if(Math.abs(a.mesh.position.x+2.05)<.6&&Math.abs(a.mesh.position.z+2.85)<.7)a.mesh.visible=false;
 }}
export function updateCompanion413(v,companion){if(!v.companion413)return;const m=v.companion413;m.visible=!!companion;v.companionLight413.visible=!!companion;v.companionCone413.visible=!!companion;if(!companion)return;const older=/Annesi|Babası|Teyze|Amca/.test(companion.role||''),index=older?(companion.gender==='male'?14:13):(companion.gender==='male'?0:3);if(m.userData.index413!==index){m.geometry.dispose();const next=audiencePerson413(index,1.6);m.geometry=next.geometry;m.userData.index413=index}m.material.color.set('#fff0d8');for(const a of v.audience413){if(a.index===index&&!a.replaced413){a.mesh.geometry.dispose();a.mesh.geometry=audiencePerson413((index+2)%24,1.35).geometry;a.replaced413=true}}}
export function animateAudience413(v,t,camera){for(const a of v.audience413||[]){a.mesh.position.y=a.baseY+Math.sin(t*.00065+a.phase)*.006;a.mesh.quaternion.copy(camera.quaternion);a.mesh.rotateY(a.yaw+Math.sin(t*.00018+a.phase)*.025)}if(v.companion413){v.companion413.quaternion.copy(camera.quaternion);v.companion413.position.y=1.42+Math.sin(t*.001)*.006}}
