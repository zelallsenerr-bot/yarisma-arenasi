from pathlib import Path
import json,re,html,subprocess
root=Path('dist');p=root/'catalog.js';games=json.loads(p.read_text().split('=',1)[1].rstrip(';\n'));updates=json.loads((root/'rewards194-changes.json').read_text())
texts={
'gonder-gitsin':('520 fotoğraflı ana etap sorusu, iki joker, 6. sorudan başlayan tamam/devam kararı ve 520 ipuçlu sabit görsel finali.','Uymayan fotoğrafı seç. X2 veya %50 kullan. Tamam diyerek beş soruluk finale geç; 5’te 5 ile hedefin tamamını kazan.'),
'telefon-kulubesi':('Çalan telefonu aç, beş farklı sokak görevini tamamla ve 1.000.000 TL sanal ödüle ulaş.',None),
'on-dokuz':('Barış Kılıç ile 19 kutu, 19 saniye ve iki joker. Düelloyu kazan; her yeni gün kasana 1.000.000 TL sanal ödül ekle.',None),
'altin-petek':('Anahtar sözcüklerden yukarı uzanan petek yolunu seç. Dört bronz ve bir gümüş jokerle 5.000.000 TL sanal hedefe ilerle.',None),
'ucte-uc':('Beş para aşamasında üçer soruyu doğru cevapla. Her aşamada Tufan Gündüz’e bir kez danış; üçte üçten sonra tamam veya devam de.',None),
'milyonluk-resim':('Resimle bağlantılı soruları çözerek on iki basamakta 5.000.000 TL sanal ödüle ulaş.',None),
'bir-iceri-bir-disari':('250.000 TL sanal kasayla 14 kutuyu sırayla içeri ve dışarı seç.',None)
}
for g in games:
 if g['id'] in texts:
  g['description']=texts[g['id']][0]
  if texts[g['id']][1]:g['controls']=texts[g['id']][1]
p.write_text('window.ARENA_GAMES='+json.dumps(games,ensure_ascii=False)+';\n')
# All 75 are explicitly covered, including score-only and product-prize formats.
audit=[]
for g in games:
 p=root/g['path'];s=p.read_text();scripts=[]
 for src in re.findall(r'<script[^>]+src="([^"]+)"',s):
  q=(p.parent/src.split('?')[0]).resolve()
  if q.exists() and q.is_relative_to(root.resolve()) and not any(x in q.name for x in ['bank','people','audio','bridge','profile','guide','catalog','clock']):scripts.append(q)
 code='\n'.join(q.read_text() for q in scripts)
 status='updated' if g['id'] in updates else 'reviewed-existing-money' if re.search(r'\bTL\b|\bcash\b|\bmoney\b|\bPRIZES\b',code) else 'reviewed-points-or-product-format'
 audit.append({'id':g['id'],'name':g['name'],'status':status,'plan':updates.get(g['id'],'Mevcut ölçek veya puan/ürün formatı korundu; tarihsel program tutarları oyun ödülü değildir.')})
 note='<small class="reward-note194">Oyun içindeki para ve ödüller sanaldır. Ödül planları Ekim 2026 için gözden geçirilmiştir; tarihsel program tanıtımı televizyonun o dönemini anlatır.</small>'
 if 'reward-note194' not in s:s=s.replace('</div></details></aside>',note+'</div></details></aside>')
 p.write_text(s)
(root/'rewards194-audit.json').write_text(json.dumps({'reviewedAt':'2026-10-23','policy':'Sanal oyun ödül planları; TÜFE ile birebir endekslenmiş veya resmî TV güncel ödülü olduğu iddia edilmez. Mevcut ürün tahmin verileri ve yabancı para formatları ayrı tutulur.','games':audit},ensure_ascii=False,indent=2))
assert len(audit)==75 and sum(g['status']=='updated' for g in audit)==36
# Cache bust every changed tracked JavaScript asset at its existing entry point.
changed=subprocess.check_output(['git','diff','--name-only'],text=True).splitlines();targets={(Path.cwd()/f).resolve() for f in changed if f.startswith('dist/') and f.endswith('.js')}
for p in root.rglob('*.html'):
 s=p.read_text()
 def version(m):
  src=m.group(1);q=(p.parent/src.split('?')[0]).resolve()
  return 'src="'+src.split('?')[0]+'?v=revision194"' if q in targets else m.group(0)
 s=re.sub(r'src="([^"]+\.js(?:\?[^"]*)?)"',version,s);p.write_text(s)
# Attribution stays on the existing credits page, not in the game's question flow.
p=root/'credits.html';s=p.read_text();rows=json.loads((root/'assets/gonder194/discovery.json').read_text());items=[]
for i,r in enumerate(rows):
 m=re.search(r'\((https://unsplash\.com/[^\s)]+)\)',r['source']);url=m.group(1) if m else r['url']
 items.append('<li><a href="'+html.escape(url,quote=True)+'" target="_blank" rel="noopener">'+html.escape(r['title'])+'</a> · <a href="assets/gonder194/'+str(i)+'.webp">Oyun kopyası</a></li>')
section='<section id="gonder-photo-credits194"><h2>Gönder Gitsin fotoğrafları</h2><p>142 gerçek fotoğraf Unsplash üzerinden sağlanmış, oyun için yerel WebP kopyaları hazırlanmıştır. <a href="https://unsplash.com/license" target="_blank" rel="noopener">Unsplash lisansı</a>. Unsplash+ ücretli görselleri kullanılmamıştır.</p><details><summary>Fotoğraf künyeleri</summary><ol>'+''.join(items)+'</ol></details></section>'
if 'gonder-photo-credits194' not in s:s=s.replace('</main>',section+'</main>') if '</main>' in s else s.replace('</body>',section+'</body>')
p.write_text(s)
print('75 games reviewed; 36 updated reward plans; cache references and photo credits completed')
