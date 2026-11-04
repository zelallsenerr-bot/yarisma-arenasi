from pathlib import Path
import urllib.request,html,re,json,concurrent.futures,threading,time
r=Path(__file__).parent
starts={'painting':55,'tango':40,'piano':180,'tulum':35,'sign':110,'kites':55,'amal':125}
groups={'tulum':'Müzik','rhythm':'Müzik','miasin':'Müzik','violin':'Müzik','piano':'Müzik','choir':'Müzik','streetmusic':'Müzik','mosaic':'Görsel sanatlar','painting':'Görsel sanatlar','ebru':'Görsel sanatlar','cartoon':'Görsel sanatlar','photography':'Görsel sanatlar','ceramics':'Görsel sanatlar','leonardo':'Müzeler','toymuseum':'Müzeler','records':'Müzeler','amal':'Sahne sanatları','puppetopera':'Sahne sanatları','village':'Sahne sanatları','filmmaking':'Sinema','chess':'Gösteriler','tango':'Dans','hidrellez':'Gelenekler','face':'Gelenekler','wedding':'Gelenekler','crochet':'Hobiler','phones':'Koleksiyon','antiques':'Koleksiyon','bookfair':'Edebiyat','toylibrary':'Çocuk etkinlikleri','kites':'Çocuk etkinlikleri','sign':'Erişilebilirlik','barber':'Kişisel bakım'}
qs={}
for i,line in enumerate((r/'questions.tsv').read_text().splitlines()):
 k,ts,cat,q,*opts=line.split('|');correct=opts[0];answer=i%4;opts=opts[-answer:]+opts[:-answer] if answer else opts;ev=' ve '.join(t+' sn' for t in ts.split(','))+': '+correct+'.';qs[k]={'id':'unique579-culture-'+k+'-q','category181':cat,'question':q,'options':opts,'answer':answer,'evidence573':ev,'explanation':ev}
(r/'reviewed-questions-checkpoint.json').write_text(json.dumps(qs,ensure_ascii=False,indent=2))
order=[line.split('|')[0] for line in (r/'candidates.tsv').read_text().splitlines()];rows={};lock=threading.Lock()
def persist():
 data=[rows[k] for k in order if k in rows];out=r.parent/'culture-partial.json';temp=out.with_suffix('.tmp');temp.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n');temp.replace(out)
 if len(data)==33:(r.parent/'culture-final.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
def go(line):
 k,category,url=line.split('|');p=r/(k+'.html')
 for attempt in range(2):
  try:
   if not p.exists():p.write_bytes(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'YarismaArenasi-content-review/1.0'}),timeout=45).read())
   raw=p.read_text();text=html.unescape(raw);srcs=[]
   for src in re.findall(r'<video[^>]*data-sources="(.*?)"',raw):
    try:srcs.extend(json.loads(html.unescape(src)))
    except:pass
   urls=list(dict.fromkeys(x['Src'] for x in srcs if x.get('Src','').startswith('https://') and '.mp4' in x['Src']))
   if not urls:urls=list(dict.fromkeys(re.findall(r'https://[^"<>\s]+\.mp4(?:\?[^"<>\s]*)?',text)))
   assert urls,'no media'
   file=next((u for u in urls if '_480p' in u),next((u for u in urls if re.search(r'/[0-9a-f-]{36}\.mp4',u)),urls[-1]));download=next((u for u in urls if '_240p' in u),next((u for u in urls if '_270p' in u),urls[0]));uid=re.search(r'/([0-9a-f-]{36})(?:_|\.mp4)',file).group(1)
   title=re.search(r'<title>(.*?)</title>',text,re.S).group(1).strip();author=re.findall(r'<meta[^>]+content="([^"]+)"[^>]+name="Author"',text);thirdparty=list(set(re.findall(r'\b(?:Reuters|Associated Press|AP|AFP)\b',re.sub('<[^>]+>','',text))))
   assert not thirdparty,str(thirdparty)
   start=starts.get(k,10);row={'id':'unique579-culture-'+k,'category':category,'group':groups[k],'source':url,'title':title,'author':'VOA Türkçe'+(' · '+'; '.join(author) if author else ''),'license':'Public domain — exclusively VOA production','licenseUrl':'https://learningenglish.voanews.com/p/6021.html','file':file,'mediaStart578':start,'duration':30,'originalKey579':'voa:'+uid,'mediaKey571':'voa:'+uid,'language':'tr','questions':[qs[k]],'review579':{'method':'Six video frames at 0/5/10/15/20/25 seconds visually inspected before executor reset; reviewer findings faithfully retained; source metadata re-fetched after reset','sourceAudio':'original Turkish report / performance audio; no English-only interview selected','thirdPartyCreditIndicators':thirdparty,'downloadUrl':download,'evidenceFrames':[start+t for t in [0,5,10,15,20,25]],'selectedBeforeReset':True}}
   (r/(k+'.json')).write_text(json.dumps(row,ensure_ascii=False,indent=2))
   with lock:rows[k]=row;persist();print(k,len(rows),flush=True)
   return
  except Exception as e:
   if attempt==1:print('FAIL',k,type(e).__name__,str(e)[:100],flush=True)
   else:time.sleep(2)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as e:list(e.map(go,(r/'candidates.tsv').read_text().splitlines()))
print('DONE',len(rows),flush=True)
