from pathlib import Path
from PIL import Image
import json,sys
r=Path(__file__).resolve().parents[1];m=json.loads(sys.argv[1]);im=Image.open(m['path']).convert('RGBA');w,h=im.size;asset='humans435/saba-relaxed438.webp';im.save(r/'dist'/asset,quality=84,method=3);names=json.loads((r/'research/asset437-saba.json').read_text())['names'];out={}
for i,name in enumerate(names):
 x=i%3*(w//3);y=i//3*(h//2);b=im.getchannel('A').crop((x,y,x+w//3,y+h//2)).point(lambda v:255 if v>80 else 0).getbbox();out[name+'|seated']={'asset':asset,'size':[w,h],'rect':[x+b[0],y+b[1],b[2]-b[0],b[3]-b[1]],'height':1.65,'seated':True,'bodyOnly':True,'facing':'right'}
m['entries']=out;(r/'research/asset438-saba-relaxed.json').write_text(json.dumps(m,ensure_ascii=False,indent=2));p=r/'dist/humans435/relaxed438.js';s=p.read_text().split('window.ArenaNamedRelaxed438=')[0];p.write_text(s+'window.ArenaNamedRelaxed438='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';');print('Saved six identity-preserving relaxed celebrity poses')
