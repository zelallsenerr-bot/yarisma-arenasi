from pathlib import Path
from PIL import Image
import json,sys
r=Path(__file__).resolve().parents[1];m=json.loads(sys.argv[1]);im=Image.open(m['path']).convert('RGBA');w,h=im.size;asset='humans435/calm-seated438.webp';im.save(r/'dist'/asset,quality=84,method=3);out=[]
for i in range(8):
 x=i%4*(w//4);y=i//4*(h//2);b=im.getchannel('A').crop((x,y,x+w//4,y+h//2)).point(lambda v:255 if v>80 else 0).getbbox()
 out.append({'asset':asset,'size':[w,h],'rect':[x+b[0],y+b[1],b[2]-b[0],b[3]-b[1]],'height':1.65,'seated':True,'bodyOnly':True,'facing':'front','gender':'female'if i%2==0 else'male','age':'adult'if i<4 else'mature'})
m['entries']=out;(r/'research/asset438-calm-seated.json').write_text(json.dumps(m,ensure_ascii=False,indent=2));(r/'dist/humans435/relaxed438.js').write_text('window.ArenaRelaxed438='+json.dumps(out,separators=(',',':'))+';');print('Saved 8 relaxed chairless seated figures')
