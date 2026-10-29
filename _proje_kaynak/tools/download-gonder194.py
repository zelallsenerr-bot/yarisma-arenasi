import json,io,urllib.request,concurrent.futures
from pathlib import Path
from PIL import Image
root=Path('dist/assets/gonder194');rows=json.loads((root/'discovery.json').read_text())
def get(pair):
 i,r=pair;p=root/(str(i)+'.webp')
 if p.exists():return i,True
 try:
  raw=urllib.request.urlopen(r['url'],timeout=35).read();im=Image.open(io.BytesIO(raw)).convert('RGB');im.thumbnail((560,560));im.save(p,'WEBP',quality=86);return i,True
 except Exception as e:return i,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 for i,status in pool.map(get,enumerate(rows)):
  if status is not True:print(i,status,flush=True)
print('Downloaded',len(list(root.glob('*.webp'))),'of',len(rows),flush=True)
