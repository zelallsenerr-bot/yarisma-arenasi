from pathlib import Path
import json,re
r=Path(__file__).resolve().parents[1];d=r/'dist';a=d/'humans435'
p=r/'scripts/collect437.py';s=p.read_text().replace(" if not asset or not size:"," if key=='seatedhosts':continue\n if not asset or not size:");p.write_text(s)
p=a/'resolver437.js';s=p.read_text();pattern="if(['altin-sofra','kizlar-ve-anneleri','iste-benim-stilim'].includes(p.game))gender='female';";s=s.replace(pattern,'');s=s.replace("let gender=profile.gender||p.gender;","let gender=profile.gender||p.gender;"+pattern+"if(['esim-yapar','yaparsin-askim'].includes(p.game)&&p.gender)gender=p.gender;");s=s.replace("(direction==='front'?'front':'angle')","(pose==='seated'?'angle':direction==='front'?'front':'angle')");p.write_text(s)
p=a/'actors.js';s=p.read_text().replace('href="../../${p.asset}"','href="${p.asset.startsWith(\'data:\')?p.asset:\'../../\'+p.asset}"');s=s.replace("old.outerHTML=art(p,name);box.classList.toggle", "old.outerHTML=art(p,name);window.ArenaStageCast437?.clean?.(p).then(cp=>{if(box.dataset.art437!==key||!box.isConnected)return;const current=box.querySelector(':scope > svg.human435');if(current)current.outerHTML=art(cp,name);window.ArenaOrient437(stage)});box.classList.toggle");p.write_text(s)
for f in (d/'games').glob('*/index.html'):
 s=f.read_text()
 if 'humans435/resolver437.js' in s and 'humans435/clean437.js' not in s:s=re.sub(r'(<script src="../../humans435/resolver437.js[^>]*></script>)',r'\1<script src="../../humans435/clean437.js?v=437"></script>',s);f.write_text(s)
for f in (d/'_qa437').glob('*.html'):
 s=f.read_text()
 if 'resolver437.js' in s and 'clean437.js' not in s:s=re.sub(r'(<script src="[^"]*resolver437.js[^>]*></script>)',lambda m:m[0]+m[0].replace('resolver437.js','clean437.js'),s);f.write_text(s)
p=d/'studios211/staging437.js';s=p.read_text();s=s.replace("a.castKey437=key;setChair437(v,a.slot,r);", "a.castKey437=key;setChair437(v,a.slot,r);window.ArenaStageCast437?.clean?.(r).then(cp=>{if(a.castKey437!==key||!cp.canvas437)return;a.mesh.geometry.dispose();a.mesh.geometry=v.stagingApi437.geometry(cp.rect,cp.size,r.height);const t=new T.CanvasTexture(cp.canvas437);t.colorSpace=T.SRGBColorSpace;a.mesh.material.map=t;a.mesh.material.needsUpdate=true;});");p.write_text(s)
