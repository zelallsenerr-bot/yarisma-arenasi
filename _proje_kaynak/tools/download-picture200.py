import sys,json,pathlib,concurrent.futures,urllib.request,io
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[1];OUT=pathlib.Path(sys.argv[1]);OUT.mkdir(parents=True,exist_ok=True);rows=json.loads((ROOT/'picture200-candidates.json').read_text());seen=set();todo=[]
for row in rows:
 if row['id'] in seen:continue
 seen.add(row['id']);todo.append(row)
def get(row):
 path=OUT/(row['id']+'.webp')
 if path.exists():return None
 try:
  req=urllib.request.Request(row['url'],headers={'User-Agent':'Mozilla/5.0'})
  raw=urllib.request.urlopen(req,timeout=30).read();im=Image.open(io.BytesIO(raw)).convert('RGB');im.thumbnail((480,360))
  for q in [82,77,72,67,62]:
   buf=io.BytesIO();im.save(buf,'WEBP',quality=q,method=5)
   if len(buf.getvalue())<=17500:break
  path.write_bytes(buf.getvalue());return None
 except Exception as e:return (row['id'],str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:failures=[x for x in pool.map(get,todo) if x]
print('available',len(list(OUT.glob('*.webp'))),'of',len(todo),'errors',failures[:8],flush=True)
