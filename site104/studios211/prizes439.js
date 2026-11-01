/* Photo-real prize cutouts; atlas is generated from the user's exact stage reference. */
import * as T from '../vendor/three175/three.module.js';
export const prizes439=[
 {id:'car',label:'Otomobil',rect:[0,112,475,287],x:3.75,z:-.85,h:2.35},
 {id:'refrigerator',label:'Buzdolabı',rect:[482,0,257,401],x:-5.65,z:-3.65,h:2.65},
 {id:'washer',label:'Çamaşır makinesi',rect:[778,94,313,326],x:-4.1,z:-3.35,h:1.5},
 {id:'dishwasher',label:'Bulaşık makinesi',rect:[1130,86,318,325],x:-2.7,z:-3.35,h:1.5},
 {id:'sofa',label:'Üçlü koltuk',rect:[0,445,475,264],x:-3.75,z:-.35,h:1.65},
 {id:'armchair',label:'Berjer',rect:[480,440,250,267],x:-5.25,z:1.55,h:1.3},
 {id:'dining',label:'Altı kişilik yemek masası',rect:[735,442,377,280],x:.15,z:-3.4,h:1.8},
 {id:'television',label:'Televizyon ve ahşap ünite',rect:[1116,410,332,307],x:3.45,z:-3.8,h:2.05},
 {id:'oven',label:'Fırın',rect:[44,720,305,366],x:-1.45,z:-3.1,h:1.5},
 {id:'vacuum',label:'Dikey süpürge',rect:[425,690,215,396],x:-1.25,z:-.35,h:1.9},
 {id:'coffee',label:'Kahve makinesi ve su ısıtıcı',rect:[690,750,390,336],x:.2,z:-.25,h:1.4},
 {id:'cookware',label:'Tencere ve yemek takımı',rect:[1080,790,368,296],x:1.8,z:-.2,h:1.15}
];
export function addPrizes439(v){
 const tex=new T.TextureLoader().load(new URL('./prizes439.webp',import.meta.url).href,()=>window.dispatchEvent(new Event('studio211:asset')));tex.colorSpace=T.SRGBColorSpace;
 v.prizes439=[];
 for(const p of prizes439){const [x,y,w,h]=p.rect,geo=new T.PlaneGeometry(p.h*w/h,p.h),uv=geo.attributes.uv;
  for(let i=0;i<uv.count;i++)uv.setXY(i,(x+uv.getX(i)*w)/1448,1-(y+(1-uv.getY(i))*h)/1086);
  const mesh=new T.Mesh(geo,new T.MeshBasicMaterial({map:tex,transparent:true,alphaTest:.08,side:T.DoubleSide,toneMapped:false}));mesh.position.set(p.x,.09+p.h/2,p.z);mesh.userData.prize439=p.id;mesh.name=p.label;v.scene.add(mesh);v.billboards.push(mesh);v.prizes439.push(mesh);
 }
}
