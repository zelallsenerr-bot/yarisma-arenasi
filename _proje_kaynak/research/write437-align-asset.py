import json,sys
from pathlib import Path
from PIL import Image
r=Path('/workspace/scratch/1cdac27dbcf0/stage437');key,path=sys.argv[1:];j=next(x for x in json.loads((r/'research/align437-jobs.json').read_text()) if x['key']==key)
i=Image.open(path).convert('RGBA');w,h=i.size;rects=[]
for row in range(j['rows']):
 for col in range(j['cols']):
  x0,y0=round(col*w/j['cols']),round(row*h/j['rows']);x1,y1=round((col+1)*w/j['cols']),round((row+1)*h/j['rows']);a=i.crop((x0,y0,x1,y1)).getchannel('A').point(lambda v:255 if v>=80 else 0);b=a.getbbox()
  if not b:raise ValueError(f'Empty cell {key} {col}/{row}')
  l,t,rr,bb=b;rects.append([x0+l,y0+t,rr-l,bb-t])
asset=f'humans435/angle437-{key}.webp';i.save(r/'dist'/asset,'WEBP',quality=84,method=3)
out={**j,'asset':asset,'size':[w,h],'rects':rects,'generated_path':path,'method':'built-in imagegen'}
(r/f'research/asset437-{key}.json').write_text(json.dumps(out,ensure_ascii=False,indent=2));print(key,asset,len(rects))
