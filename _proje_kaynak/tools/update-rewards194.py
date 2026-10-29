from pathlib import Path
import re,json
changed=set();updates={}
def edit(path,replacements):
 p=Path('dist')/path;s=p.read_text()
 for a,b in replacements:
  assert a in s,(path,a)
  s=s.replace(a,b)
 p.write_text(s);changed.add(str(p))
def currency_text(path,mapping):
 p=Path('dist')/path;s=p.read_text()
 def sub(m):
  n=int(m.group(1).replace('.',''));return f'{mapping.get(n,n):,}'.replace(',','.')+m.group(2)
 # Literal formatted money followed by TL, sanal TL or a comma in prize list is handled separately.
 s=re.sub(r'(?<![\d.])(\d{1,3}(?:\.\d{3})+)(\s+(?:sanal\s+)?TL)',sub,s)
 p.write_text(s);changed.add(str(p))
# Modern active-format maxima are retained: Milyoner 10m, Beyaz'la Joker 3m.
# These are game reward plans, not asserted inflation-index calculations.
for game in ['sansli-masa','ilk-bulusma']:
 edit(f'games/{game}/engine.js',[('[10000,25000,50000,100000,250000]','[50000,100000,250000,500000,1000000]')]);currency_text(f'games/{game}/app.js',{250000:1000000});updates[game]='5 aşama: 50.000 → 100.000 → 250.000 → 500.000 → 1.000.000 TL'
edit('games/telefon-kulubesi/engine.js',[('s.cash=25000','s.cash=1000000')]);currency_text('games/telefon-kulubesi/app.js',{25000:1000000});updates['telefon-kulubesi']='5 görev sonunda 1.000.000 TL'
edit('games/on-dokuz/engine.js',[('winner.bank+=100000','winner.bank+=1000000'),('s.cash+=100000','s.cash+=1000000'),('100.000 TL','1.000.000 TL')]);currency_text('games/on-dokuz/app.js',{100000:1000000});updates['on-dokuz']='Günlük 1.000.000 TL'
edit('games/kumbara/engine.js',[('value:100,','value:5000,'),('value:500,','value:25000,'),('value:1000,','value:50000,'),('value:5000,','value:250000,'),('value:10000,','value:500000,')])
# Ordered replacements above would also hit the new first-stage 5000; restore exact stage array.
p=Path('dist/games/kumbara/engine.js');s=p.read_text();a=s.index('const stages=');b=s.index(';const E=',a);s=s[:a]+"const stages=[{seconds:60,value:5000,errors:3,min:3,level:1},{seconds:60,value:25000,errors:3,min:3,level:1},{seconds:90,value:50000,errors:2,min:2,level:1},{seconds:90,value:250000,errors:2,min:2,level:2},{seconds:120,value:500000,errors:1,min:0,level:2}]"+s[b:];p.write_text(s);updates['kumbara']='Etapta doğru başına 5.000 / 25.000 / 50.000 / 250.000 / 500.000 TL'
edit('games/altin-petek/engine.js',[('[250,500,1000,2000,3000,5000,10000,15000,30000,50000,100000,150000,250000,500000,1000000]','[2500,5000,10000,20000,30000,50000,100000,150000,300000,500000,1000000,1500000,2500000,3500000,5000000]')]);currency_text('games/altin-petek/app.js',{15000:150000,1000000:5000000});updates['altin-petek']='15 basamak, en yüksek 5.000.000 TL'
edit('games/ucte-uc/engine384.js',[('[15000,50000,150000,500000,1500000]','[50000,200000,600000,2000000,5000000]')]);edit('games/ucte-uc/app.js',[('15.000, 50.000, 150.000, 500.000 ve 1.500.000 TL','50.000, 200.000, 600.000, 2.000.000 ve 5.000.000 TL')]);updates['ucte-uc']='50.000 → 200.000 → 600.000 → 2.000.000 → 5.000.000 TL'
edit('games/cevap-soruda/engine.js',[('s.bank+=50000','s.bank+=1000000'),('s.bank+=10000','s.bank+=200000')]);currency_text('games/cevap-soruda/app.js',{10000:200000,50000:1000000});updates['cevap-soruda']='Finalde devam 1.000.000, çekilme 200.000 TL'
# En Zayıf Halka had a 1m explanation but only a 10k runtime cap. Fix BOTH money tree and cap.
edit('games/halka-mucadelesi/engine.js',[('[200,500,1000,2000,3000,4500,6000,8000,10000]','[20000,50000,100000,200000,300000,450000,600000,800000,1000000]')]);edit('games/halka-mucadelesi/app.js',[('s.roundBank>=10000','s.roundBank>=1000000'),('10000-s.roundBank','1000000-s.roundBank')]);updates['halka-mucadelesi']='Gerçek oyun zinciri ve tur tavanı 1.000.000 TL ile eşleştirildi'
# Hepsi Benim vouchers: no product-price changes or balloon/cage timing changes.
edit('games/hepsi-benim/engine.js',[('s.teams[s.active].cash+=1000','s.teams[s.active].cash+=25000'),('s.item===0?1000:3000','s.item===0?25000:75000'),('s.earned=5000','s.earned=125000'),('s.teams[s.active].cash+=5000','s.teams[s.active].cash+=125000')]);currency_text('games/hepsi-benim/engine.js',{1000:25000,3000:75000,4000:100000,5000:125000});currency_text('games/hepsi-benim/app.js',{1000:25000,3000:75000,4000:100000,5000:125000});updates['hepsi-benim']='Olsa Olsa 25.000; balon 25.000 +75.000; 5 kablo 125.000 TL'
# Shared retro games: change isolated prize expressions, never question answers or time values.
edit('retro400-a/engine.js',[("s.money=100000;if(c.type==='reno')","s.money=1000000;if(c.type==='reno')"),("s.money=s.ranking[0].id==='you'?10000:0","s.money=s.ranking[0].id==='you'?250000:0"),('[500,1000,2000,4000,7500,10000,15000,30000,60000,125000,250000,1000000]','[5000,10000,25000,50000,75000,100000,150000,300000,600000,1250000,2500000,5000000]')]);currency_text('retro400-a/engine.js',{100000:1000000,10000:250000});updates['cember']='Ortak başlangıç kasası 1.000.000 TL';updates['temizlik-benim-isim']='Hafta birincisi 250.000 TL';updates['milyonluk-resim']='Görsel soru merdiveni 5.000.000 TL'
edit('retro400-b/engine.js',[("s.cash=10000;s.boxes=sh([500,1000,2000,3000,5000,7500,10000,15000,25000,-1000,-2500,-5000,-7500,-10000])","s.cash=250000;s.boxes=sh([12500,25000,50000,75000,125000,187500,250000,375000,625000,-25000,-62500,-125000,-187500,-250000])"),("if(type==='water'){s.cash=1000000", "if(type==='water'){s.cash=5000000"),("s.cash=10000;s.phase='confidence'", "s.cash=250000;s.phase='confidence'"),('[10000,15000,20000,25000,30000,40000,50000,75000]','[100000,150000,200000,250000,300000,400000,500000,750000]'),('(s.step+1)*2000*','(s.step+1)*50000*')]);currency_text('retro400-b/data.js',{10000:250000});edit('retro400-b/data.js',[('1 milyon sanal TL','5 milyon sanal TL')]);updates.update({'bir-iceri-bir-disari':'250.000 TL başlangıç, kutu ödül ve cezaları birlikte güncellendi','kendi-dusen-aglamaz':'5.000.000 TL başlangıç','arkandayiz':'250.000 TL başlangıç','siradaki-gelsin':'Çark 100.000–750.000 TL','anlasma':'Soru taban değeri 50.000 TL'})
# Patience, door and hometown awards; foreign-currency travel budget remains a distinct format rule.
edit('retro400-c/engine.js',[("case'para-odasi':s.left=35;s.mode=s.round===7?'final':'estimate';s.boxes=sh([500,1000,2500,5000,10000,20000])","case'para-odasi':s.left=35;s.mode=s.round===7?'final':'estimate';s.boxes=sh([12500,25000,62500,125000,250000,500000])"),("if(s.id==='yasim-kac')s.cash=500000","if(s.id==='yasim-kac')s.cash=5000000"),('s.bonus+=5000','s.bonus+=50000'),('diff*(s.round+1)*5000','diff*(s.round+1)*50000'),('s.round===0?500:s.round===1?1000:s.round===3?2500:0','s.round===0?12500:s.round===1?25000:s.round===3?62500:0'),('s.cash+=5000;if(s.wheel===3){s.cash=50000','s.cash+=125000;if(s.wheel===3){s.cash=1250000'),('s.cash+=1000;if(s.round===4)','s.cash+=50000;if(s.round===4)'),('[1000,2000,3000,4000,5000,6000,7000,8000,10000,12000,15000,18000,20000,25000]','[25000,50000,75000,100000,125000,150000,175000,200000,250000,300000,375000,450000,500000,625000]')]);currency_text('retro400-c/engine.js',{50000:1250000,5000:250000,1000:50000});currency_text('retro400-c/app.js',{500000:5000000,50000:1250000,5000:250000,1000:50000});
# Plain 500 TL and inline 1.000/2.500 stage labels: keep door labels exactly aligned with engine.
p=Path('dist/retro400-c/app.js');s=p.read_text().replace('500 TL','12.500 TL').replace('İkinci soru · 50.000 TL','İkinci soru · 25.000 TL').replace('1.000 TL ikinci soru','25.000 TL ikinci soru').replace('50.000 TL ikinci soru','25.000 TL ikinci soru').replace('2.500 TL','62.500 TL');s=s.replace('5/10/15/20/25/30 bin TL','50/100/150/200/250/300 bin TL').replace('Tam isabet: +250.000 TL','Tam isabet: +50.000 TL').replace('tam isabet 250.000 TL','tam isabet 50.000 TL');p.write_text(s)
updates.update({'yasim-kac':'5.000.000 TL kasa; isabet 50.000, kesintiler 50.000–300.000 TL','para-odasi':'Kutular 12.500–500.000 TL','kizma-kazan':'Şaka başına 50.000, toplam 250.000 TL','sans-kapida':'Soru ödülleri 12.500 /25.000 /62.500 TL','gel-hemserim':'Dört çark finali 1.250.000 TL'})
# Currency lists displayed by engine-driven UI remain generated directly from these values.
updates['gonder-gitsin']='25.000 → 75.000 →125.000 →250.000 →400.000 →600.000 →1.000.000 →2.000.000 →3.000.000 →5.000.000 TL; finalde doğru başına %7,5'
Path('dist/rewards194-changes.json').write_text(json.dumps(updates,ensure_ascii=False,indent=2))
Path('tools/rewards194-files.json').write_text(json.dumps(sorted(changed),indent=2))
print(len(updates),'reward plans updated;',len(changed),'source files')
