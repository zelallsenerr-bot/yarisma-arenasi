import json,pathlib,hashlib,shutil,io,collections,html
from PIL import Image,ImageDraw,ImageFont
ROOT=pathlib.Path(__file__).resolve().parents[1];CACHE=pathlib.Path('/workspace/scratch/91eb78c6b52b/picture200-cache');DEST=ROOT/'dist/assets/picture200';DEST.mkdir(exist_ok=True)
questions=json.loads((ROOT/'picture200-questions-draft.json').read_text());subjects=sorted(set(q['subject'] for q in questions));original=json.loads((ROOT/'dist/assets/gonder194/discovery.json').read_text());candidates=json.loads((ROOT/'picture200-candidates.json').read_text());reject=set(json.loads((ROOT/'picture200-rejections.json').read_text())) if (ROOT/'picture200-rejections.json').exists() else set();used=set();hashes=set();rows=[];by=collections.defaultdict(list)
for i in subjects:
 p=ROOT/f'dist/assets/gonder194/{i}.webp';key=original[i]['id'];h=hashlib.sha256(p.read_bytes()).hexdigest();assert h not in hashes;hashes.add(h);used.add(key);row={'subject':i,'photoID':key,'image':f'../../assets/gonder194/{i}.webp','source':original[i].get('source',''),'page':original[i].get('url','').split('?')[0],'license':'https://unsplash.com/license'};rows.append(row);by[i].append(row)
# Proportional coverage first, then fill from clear subjects with spare views.
def take(c):
 if c['id'] in used or c['id'] in reject or c['subject'] not in subjects:return False
 p=CACHE/(c['id']+'.webp')
 if not p.exists():return False
 h=hashlib.sha256(p.read_bytes()).hexdigest()
 if h in hashes:return False
 im=Image.open(p).convert('RGB');
 # A bounded image size keeps 500 local photos within the static hosting envelope.
 for width,q in [(480,82),(450,78),(420,76),(400,73)]:
  out=im.copy();out.thumbnail((width,360));buf=io.BytesIO();out.save(buf,'WEBP',quality=q,method=6)
  if len(buf.getvalue())<=14500:break
 dest=DEST/(c['id']+'.webp');dest.write_bytes(buf.getvalue());used.add(c['id']);hashes.add(h);row={'subject':c['subject'],'photoID':c['id'],'image':'../../assets/picture200/'+dest.name,'page':c['page'],'description':c['description'][:300],'license':'https://unsplash.com/license'};rows.append(row);by[c['subject']].append(row);return True
for i in subjects:
 for c in candidates:
  if c['subject']==i and len(by[i])<5:take(c)
for c in candidates:
 if len(rows)>=500:break
 if len(by[c['subject']])<9:take(c)
assert len(rows)==500,(len(rows),len(used));assert len(by)==100
usedFiles={pathlib.Path(r['image']).name for r in rows if '/picture200/' in r['image']}
for p in DEST.glob('*.webp'):
 if p.name not in usedFiles:p.unlink()
for q in questions:
 q['images']=[r['image'] for r in by[q['subject']]];i=q['subject'];q['category']='Doğa' if i<29 or i>=99 else 'Müzik' if i in [29,30,31,46,47] else 'Dünya kültürü' if 32<=i<=39 or 91<=i<=98 else 'Spor' if 77<=i<=83 else 'Çiçekler' if 48<=i<=55 else 'Araçlar' if 63<=i<=68 else 'Mutfak'
(ROOT/'dist/games/milyonluk-resim/bank200.js').write_text('window.PictureBank200='+json.dumps(questions,ensure_ascii=False,separators=(',',':'))+';\n')
(DEST/'sources.json').write_text(json.dumps(rows,ensure_ascii=False,separators=(',',':')))
for page in range(5):
 subset=rows[page*100:(page+1)*100];sheet=Image.new('RGB',(1400,1200),'#151522');draw=ImageDraw.Draw(sheet)
 for j,row in enumerate(subset):
  p=(ROOT/'dist/games/milyonluk-resim'/row['image']).resolve();im=Image.open(p).convert('RGB');im.thumbnail((136,96));x=(j%10)*140;y=(j//10)*120;sheet.paste(im,(x+(136-im.width)//2,y));draw.text((x+3,y+97),f'{page*100+j}: subj {row["subject"]}',fill='white')
 sheet.save(f'/workspace/scratch/91eb78c6b52b/picture200-review-{page}.jpg',quality=90)
print('500 local photo assets; 500 authored questions; reused',sum('/gonder194/' in r['image'] for r in rows),'existing photos; new bytes',sum(p.stat().st_size for p in DEST.glob('*.webp')),'bank', (ROOT/'dist/games/milyonluk-resim/bank200.js').stat().st_size)
