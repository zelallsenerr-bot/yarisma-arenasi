from pathlib import Path
from PIL import Image
import json,statistics
r=Path(__file__).resolve().parents[1];d=r/'dist';old=json.loads((d/'humans435/data.js').read_text().split('=',1)[1].rstrip(';\n'));new=json.loads((d/'humans435/data437.js').read_text().split('=',1)[1].rstrip(';\n'));entries=[]
for ps in [old.get('poses',{}),new.get('poses',{})]:entries.extend(p for p in ps.values() if isinstance(p,dict) and not p.get('seated'))
for k,bs in old['bounds'].items():
 if k.startswith('standing'):
  entries.extend({'asset':'humans435/'+k+'.webp','rect':b}for b in bs)
entries.extend(new['generic']['standing']);out={};ims={}
for p in entries:
 a=p['asset'];im=ims.setdefault(a,Image.open(d/a).convert('RGBA'));x,y,w,h=p['rect'];centers=[]
 for row in range(int(y+h*.55),min(im.height,int(y+h*.88)),3):
  xs=[col for col in range(max(0,int(x)),min(im.width,int(x+w))) if im.getpixel((col,row))[3]>100]
  if xs:centers.append(((min(xs)+max(xs))/2-x)/w)
 if centers:out[a+'|'+','.join(str(v)for v in p['rect'])]=round(max(.2,min(.8,statistics.median(centers))),4)
(d/'humans435/anchors438.js').write_text('window.ArenaAnchors438='+json.dumps(out,separators=(',',':'))+';')
print('Standing body anchors',len(out))
