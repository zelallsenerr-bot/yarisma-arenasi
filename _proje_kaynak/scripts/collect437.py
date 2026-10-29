from pathlib import Path
import json,re
r=Path(__file__).resolve().parents[1];d={'poses':{},'generic':{'standing':[],'seated':[]},'blondes':[]};blondes=[]
for f in sorted((r/'research').glob('asset437-*.json')):
 m=json.loads(f.read_text());key=m.get('key',f.stem[9:]);asset=m.get('asset');rects=m.get('rects',m.get('bounds',[]));size=m.get('size');names=m.get('names',[]);nmatch=re.search('hosts?(\d+)',key);n=int(nmatch[1]) if nmatch else -1
 if key=='seatedhosts':continue
 if not asset or not size:print('SKIP',f);continue
 generic=bool(re.fullmatch('(standing|seated)[012]?',key));isblonde='blonde'in key
 for i,rect in enumerate(rects):
  if key in ['standing1','standing2','seated2'] and i<2:continue # same two source identities occur in multiple wardrobe atlases
  modes=m.get('poses');pose=modes[i] if isinstance(modes,list) and i<len(modes) else m.get('pose','standing')
  if n>=0 and pose not in ['standing','seated']:pose='seated' if (n==1 and i==3)or(n==6 and i==3)or(n==8 and i<3)or(n==10 and i==2)or(n==13 and i in [1,3]) else 'standing'
  if isblonde:pose='standing'
  p={'asset':asset,'size':size,'rect':rect,'height':1.65 if pose=='seated' else 2.1,'seated':pose=='seated','bodyOnly':pose=='seated','facing':m.get('facing','left' if isblonde else 'right')}
  if generic:p.update(gender='female' if i%2==0 else 'male',age='mature' if i>=4 else 'adult');d['generic'][pose].append(p)
  elif isblonde:blondes.append((int(re.search(r'blonde(\d+)',key)[1])*10+i,p))
  elif i<len(names):d['poses'][names[i]+'|'+pose]=p
for _,p in sorted(blondes):d['blondes'].append(p)
(r/'dist/humans435/data437.js').write_text('window.ArenaBlockingData437='+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';')
print('REGISTERED',len(d['poses']), {k:len(v)for k,v in d['generic'].items()},'blondes',len(d['blondes']))
