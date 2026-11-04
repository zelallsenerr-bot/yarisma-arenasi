from pathlib import Path
from urllib.parse import urlparse
import json,re
r=Path(__file__).resolve().parents[1];site=r/'site104';out=site/'assets/family579';out.mkdir(exist_ok=True)
paths=[r/'research579'/(x+'-final.json') for x in ['crafts','culture','science','science-extra','root-extra']]
bank=[]
for p in paths:
 if not p.exists():raise SystemExit('Waiting: '+p.name)
 data=json.loads(p.read_text());data=data if isinstance(data,list) else data['clips']
 for raw in data:
  c=dict(raw);c['category579']=c.get('category579') or c.get('category');c['group579']=c.get('group579') or c.get('group') or 'Genel kültür';c['group579']={'Teknoloji':'Bilim ve teknoloji','Bilim ve çevre':'Çevre ve enerji','Hayvanlar':'Doğa ve hayvanlar','Bitkiler':'Tarım','Gösteriler':'Sahne sanatları','Zeka oyunları':'Müzeler'}.get(c['group579'],c['group579'])
  media=urlparse(c['file']).path.rsplit('/',1)[-1];media=re.sub(r'_(?:240|360|480|720|1080|1440|2160)p(?=\.)','',media);media=re.sub(r'\.(?:240|360|480|720|1080)p\.vp9(?=\.)','',media)
  c['originalKey579']='production579:'+media;c['mediaKey571']=c['originalKey579'];c['active573']=True;c['language']='tr';c['duration']=30;c['theme']=c['group579']
  assert c['file'].startswith(('https://voa-video-ns.akamaized.net/','https://upload.wikimedia.org/')),c['id']
  assert len(c['questions'])==1,c['id']
  q=c['questions'][0];assert len(q['options'])==4 and len(set(q['options']))==4 and isinstance(q['answer'],int) and 0<=q['answer']<4,c['id']
  assert q.get('evidence573') and q.get('explanation'),c['id']
  if isinstance(c.get('author'),list):c['author']=', '.join(c['author'])
  bank.append(c)
assert len(bank)>=100,len(bank)
for field in ['id','originalKey579','category579']:
 vals=[str(c[field]).casefold().strip() for c in bank];assert len(set(vals))==len(vals),(field,[v for v in vals if vals.count(v)>1])
overrides=r/'research579/question-overrides579.json'
if overrides.exists():
 for c in bank:
  patch=json.loads(overrides.read_text()).get(c['id'])
  if patch:c['questions'][0].update(patch)
# Preserve editorial evidence in repository, not in game chrome.
audit={'revision':579,'videoCount':len(bank),'topicCount':len({c['category579'] for c in bank}),'groupCount':len({c['group579'] for c in bank}),'clips':bank}
(r/'migration104/family579-review.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
allowed=['id','category579','group579','theme','originalKey579','mediaKey571','title','file','mediaStart578','duration','active573','language','questions','source','author','license','licenseUrl','audioKind579','audioType579']
bank=[{k:c[k] for k in allowed if k in c} for c in bank]
manifest={'revision':579,'videoCount':len(bank),'categoryCount':len({c['category579'] for c in bank}),'groupCount':len({c['group579'] for c in bank}),'questionCount':sum(len(c['questions']) for c in bank),'clips':bank}
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
(out/'clips579.js').write_text('/* One original Turkish production, one topic, one question. */\nwindow.FAMILY_CLIPS363.forEach(c=>c.active573=false);\nwindow.FAMILY_CLIPS363.push(...'+json.dumps(bank,ensure_ascii=False,separators=(',',':'))+');\n')
print({k:v for k,v in manifest.items() if k!='clips'})
