import * as T from '../vendor/three175/three.module.js';
import {standingPresenter} from '../shared207/ertem.js?v=209';
// The real programme photograph is kept intact as one silhouette. No borrowed contestant face or generated body.
export function realPresenter210(id){
 const c=window.ArenaPresentersData210?.[id];if(!c?.outline)throw new Error('Sunucunun doğrulanmış ayakta silueti yok: '+id);
 const a=standingPresenter();a.model.traverse(o=>{if(o.isMesh){o.geometry.dispose();for(const m of [].concat(o.material))m.dispose();}});for(const o of [...a.model.children])if(o.isMesh)a.model.remove(o);
 const xs=c.outline.map(p=>p[0]),ys=c.outline.map(p=>p[1]),bottom=Math.max(...ys),height=bottom-Math.min(...ys),center=(Math.max(...xs)+Math.min(...xs))/2,k=1.8/height;
 const shape=new T.Shape();c.outline.forEach(([x,y],i)=>i?shape.lineTo((x-center)*k,(bottom-y)*k):shape.moveTo((x-center)*k,(bottom-y)*k));
 const geo=new T.ShapeGeometry(shape),pos=geo.attributes.position,uv=geo.attributes.uv;for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getX(i)/k+center)/c.size[0],1-(bottom-pos.getY(i)/k)/c.size[1]);
 const map=new T.TextureLoader().load(new URL('../'+c.asset,import.meta.url).href);map.colorSpace=T.SRGBColorSpace;map.anisotropy=8;map.minFilter=T.LinearFilter;map.magFilter=T.LinearFilter;map.generateMipmaps=false;
 const m=new T.Mesh(geo,new T.MeshBasicMaterial({map,side:T.DoubleSide,transparent:true,alphaTest:.1,toneMapped:false}));m.frustumCulled=false;a.model.add(m);a.isErtem207=false;a.presenter210=id;a.photoMesh210=m;a.wholePhoto209=true;return a;
}
