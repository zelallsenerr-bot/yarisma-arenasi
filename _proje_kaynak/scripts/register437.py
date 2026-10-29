from pathlib import Path
from PIL import Image
import json,sys
r=Path(__file__).resolve().parents[1];j=json.loads(sys.argv[1]);im=Image.open(j['path']).convert('RGBA');w,h=im.size;c=j.get('cols',2);rows=j.get('rows',2);rects=[]
for n in range(c*rows):
 x,y=n%c*(w//c),n//c*(h//rows);b=im.getchannel('A').crop((x,y,x+w//c,y+h//rows)).point(lambda v:255 if v>80 else 0).getbbox();rects.append([x+b[0],y+b[1],b[2]-b[0],b[3]-b[1]])
a='humans435/angle437-'+j['key']+'.webp';im.save(r/'dist'/a,quality=84,method=3);j.update(asset=a,size=[w,h],rects=rects);(r/'research'/('asset437-'+j['key']+'.json')).write_text(json.dumps(j,ensure_ascii=False,indent=2));print(j['key'])
