/* Physical casting for the existing studio worlds. Geometry and game hooks stay native. */
import * as T from '../vendor/three175/three.module.js';
import {chair} from './kit.js?v=420';
const seatedLift437={'son-karar':.44,'kutu-karari':.44,'sepetini-koru':.02,'guven-cizgisi':0,'saba-ile-oyuna-geldik':.04,'altin-petek':.44,'milyoner-aile':.38,'iste-benim-stilim':0};
export function direction437(v,s,host=false,mode='stage'){
 if(mode==='host'&&host||mode==='player'&&s===(v.playerCameraSlot418||v.playerSlots[v.primaryPlayer414??0]))return'front';
 if(s.dating431)return s.datingSide431===0?'right':'left';
 if(s.role==='audience')return s.x<0?'right':'left';
 if(s.role==='juror')return'right';
 if(v.cfg.id==='iste-benim-stilim'&&s.role==='fashion-contestant')return'left';
 const grouped=!host&&!s.dating431&&(s.role==='case-holder'||s.role==='family-member'||s.role==='waiting-suitor'||s.role==='juror'||v.playerSlots.length>2&&v.playerSlots.includes(s));
 const target=host?(v.playerCameraSlot418||v.playerSlots[v.primaryPlayer414??0]||v.playerSlots[0]):v.hostSlots[0];
 const preferred=!target||Math.abs(target.x-s.x)<.4?(s.x<0?'right':s.x>.4?'left':'front'):target.x>s.x?'right':'left';if(grouped){const i=s.groupIndex438??Math.max(0,v.playerSlots.indexOf(s));return window.ArenaGroup438?.direction(v.cfg.id,i,preferred)||preferred;}return preferred;
}
export function cast437(v,p,i,s,host=false,mode='stage'){
 if(s.back424)return null;
 const pose=s.pose==='seated'?'seated':'standing',direction=direction437(v,s,host,mode);
 let r=window.ArenaStageCast437?.resolve({...p,style438:!host&&!s.dating431&&(s.role==='case-holder'||s.role==='family-member'||s.role==='waiting-suitor'||v.playerSlots.length>2&&v.playerSlots.includes(s))?window.ArenaGroup438?.style(v.cfg.id,s.groupIndex438??i):undefined,embeddedChair437:s.role==='audience',game:v.cfg.id},i,pose,direction);
 if(!r)return null;
 r={...r,rect:[...r.rect],size:[...r.size]};
 if(s.videoCrop429){r.height=s.height425||2.45;r.videoCrop429=true;}
 else r.height=pose==='seated'?(r.bodyOnly?1.65:1.8):(s.height425||2.1);
 if(s.role==='audience')r.height=1.5;
 return r;
}
function lift437(v,s,p){if(!p.seated||!p.bodyOnly)return s.y||0;if(s.role==='juror')return(s.y||0)+.45;if(v.cfg.id==='kismet-locasi')return(s.y||0)+(v.hostSlots.includes(s)?.42:0);return(s.y||0)+(seatedLift437[v.cfg.id]||0)}
function setChair437(v,s,p){for(const g of v.scene.children){if(!g.userData.chair211||Math.abs(g.position.x-s.x)>.06||Math.abs(g.position.z-s.z)>.06)continue;if(g.userData.baseVisible437===undefined)g.userData.baseVisible437=g.visible;g.visible=!!p.bodyOnly&&g.userData.baseVisible437;}}
export function attach437(v,a,p,i=0){a.castPerson437=p;a.castIndex437=i;a.castKey437='';}
export function installStaging437(v,api){
 v.stagingApi437=api;
 v.playerSlots.forEach((s,i)=>s.groupIndex438=i);(v.supportSlots||[]).forEach((s,i)=>s.groupIndex438=i);

 if(v.cfg.id==='sepetini-koru')for(const s of v.hostSlots){const c=chair(v.scene,s.x,s.z,-.65,false,'#392653');c.position.y=s.y||0;}

 if(v.cfg.id==='kismet-locasi')for(const seat of v.scene.children){if(seat.isGroup&&Math.abs(seat.position.x-7.05)<.02&&Math.abs(seat.position.z-.85)<.02){seat.userData.chair211=true;seat.visible=true;}}
 // These previous poses carried their own chairs. Body-only poses now use one actual seat.
 if(['altin-petek','milyoner-aile'].includes(v.cfg.id))for(const a of v.actors){if(a.slot.pose!=='seated')continue;const s=a.slot,c=chair(v.scene,s.x,s.z,s.x<0?.65:-.65,true,v.cfg.id==='altin-petek'?'#1d313d':'#293b65');c.position.y=s.y||0;}
 // Crop-only jury faces were previously painted in asynchronously. Add full bodies at the same seats.
 if(v.cfg.id==='iste-benim-stilim'){
  const names=['Nur Yerlitaş','Ivana Sert','Kemal Doğulu','Uğurkan Erez'];
  names.forEach((name,i)=>{const s={x:-5.0,z:-2.65+i*1.55,y:.38,pose:'seated',role:'juror',name};const p=cast437(v,{name},i,s);if(p){const seat=chair(v.scene,s.x,s.z,Math.PI/2,true,'#eef2f5');seat.position.y=s.y;const mesh=api.add(p,s,false,name);attach437(v,v.actors.find(a=>a.mesh===mesh),{name},i);}});
 }
}
function key437(p){return[p.asset,...p.rect,p.flip,p.height,p.bodyOnly].join('|')}
function refreshActor437(v,a,mode){
 if(!a.castPerson437||a.slot.back424)return;
 const p={...a.castPerson437,name:a.name||a.castPerson437.name};
 if(v.cfg.id==='saba-ile-oyuna-geldik'&&a.slot.role==='celebrity'){const st=window.X318?.s,n=[...(st?.team||[]),...(st?.other||[])][a.castIndex437];if(n){p.name=n==='Sen'?(window.ArenaProfile338?.get?.()?.name||'Yarışmacı'):n;p.player=n==='Sen';a.name=p.name;}}
 if(a.slot.dating431){const st=window.ArenaDatingStage431?.(),identity=a.slot.datingSide431===0?st?.visitor:st?.resident;if(identity)Object.assign(p,identity);}
 if(a.slot.datingWait431!==undefined){const identity=window.ArenaDatingStage431?.()?.waiting?.[a.slot.datingWait431];if(identity)Object.assign(p,identity);}
 const r=cast437(v,p,a.castIndex437,a.slot,a.host,mode);if(!r)return;
 const key=key437(r);if(key!==a.castKey437){a.mesh.geometry.dispose();a.mesh.geometry=v.stagingApi437.geometry(r.rect,r.size,r.height,r.anchorX438);a.mesh.material.map=v.stagingApi437.texture(r.asset);a.mesh.material.onBeforeCompile=()=>{};a.mesh.material.customProgramCacheKey=()=> 'staging437';a.mesh.material.needsUpdate=true;a.mesh.scale.x=r.flip?-1:1;a.mesh.userData.cast437=r;a.castKey437=key;setChair437(v,a.slot,r);window.ArenaStageCast437?.clean?.(r).then(cp=>{if(a.castKey437!==key||!cp.canvas437)return;a.mesh.geometry.dispose();a.mesh.geometry=v.stagingApi437.geometry(cp.rect,cp.size,r.height,r.anchorX438);const t=new T.CanvasTexture(cp.canvas437);t.colorSpace=T.SRGBColorSpace;a.mesh.material.map=t;a.mesh.material.needsUpdate=true;});}
 a.mesh.position.y=(r.height/2)+lift437(v,a.slot,r);a.mesh.renderOrder=0;
}
function refreshAudience437(v){
 if(!v.stagingApi437)return;
 for(const [i,a]of(v.audience413||[]).entries()){
  if(a.mesh.userData.cast437)continue;
  const r=window.ArenaStageCast437?.resolve({embeddedChair437:true,id:v.cfg.id+'-audience-'+i,name:'Seyirci '+(i+1),gender:i%2?'female':'male',age:i%5===0?50:26},i,'seated',i%3===0?'front':a.mesh.position.x<0?'right':'left');if(!r)continue;
  a.mesh.geometry.dispose();a.mesh.geometry=v.stagingApi437.geometry(r.rect,r.size,1.35);a.mesh.material.map=v.stagingApi437.texture(r.asset);a.mesh.material.needsUpdate=true;a.mesh.scale.x=r.flip?-1:1;a.mesh.userData.cast437=r;
 }
 if(v.companion413&&v.companionIdentity437){const c=v.companionIdentity437,key=JSON.stringify(c);if(v.companion413.userData.key437!==key){const r=window.ArenaStageCast437?.resolve({id:'companion-'+c.name,name:c.name||'Yakını',gender:c.gender,age:/Annesi|Babası|Teyze|Amca/.test(c.role||'')?50:27},0,'seated','front');if(r){const m=v.companion413;m.geometry.dispose();m.geometry=v.stagingApi437.geometry(r.rect,r.size,1.6);m.material.map=v.stagingApi437.texture(r.asset);m.material.needsUpdate=true;m.scale.x=r.flip?-1:1;m.userData.key437=key;}}}
}
export function stageFrame437(v,mode='stage'){
 if(!v.stagingApi437)return;
 if(v.sabaBuzzer511)v.sabaBuzzer511.visible=window.X318?.s?.phase==='reaction';
 for(const a of v.actors){refreshActor437(v,a,mode);if(a.slot.role==='juror')a.mesh.visible=mode==='stage';}
 refreshAudience437(v);
 if(v.cfg.id==='iste-benim-stilim')v.scene.traverse(m=>{if(m.isMesh&&m.material?.map?.image?.width===168&&m.material.map.image.height===360&&m.position.x<-3)m.visible=false});
}
