"""Build 520 visual cases from the reviewed 130 relation families."""
import json
from pathlib import Path
names='''Devekuşu|Zebra|Zürafa|Kel kartal|Yunus|Penguen|Balina|Kaplan|Fil|Aslan|Köpekbalığı|Goril|Deniz kaplumbağası|Dev panda|Deve|Gergedan|Koala|Kurbağa|Çita|Timsah|Su aygırı|Şempanze|Denizyıldızı|Denizatı|Denizanası|Kelebek|Leopar|Bal arısı|Ahtapot|Keman|Piyano|Gitar|Sidney Opera Binası|Tac Mahal|Big Ben|Eyfel Kulesi|Özgürlük Heykeli|Pisa Kulesi|Kolezyum|Sagrada Familia|Muz|Çilek|Elma|Kiraz|Üzüm|Şeftali|Trompet|Bateri|Papatya|Lotus|Orkide|Gül|Lavanta|Ayçiçeği|Lale|Kaktüs|Nar|Ananas|Armut|Karpuz|Hindistan cevizi|Kivi|Portakal|İğne ve iplik|Kum saati|Pusula|Çapa|Çekiç|Mum|Baklava|Deniz dalgası|Koltuk|Dünya|Kalp modeli|Göz|Beyin modeli|Ayak|Bilardo|Ragbi topu|Voleybol topu|Futbol topu|Tenis topu|Basketbol topu|Satranç|Kahve|Mısır|Yeşil çay|Zeytinyağı|Çikolata|Buğday|Pirinç|Kurtarıcı İsa Heykeli|Petra|Machu Picchu|Çin Seddi|Moai heykeli|Deniz feneri|Gize Piramidi|Yel değirmeni|Koyun|İnek|Sincap|At|Keçi|Tavşan|Köpek|Kedi|Tavus kuşu|Flamingo|Kuğu|Papağan|Baykuş|Ördek|Yarasa|Yılan|Şimşek|Dağ|Yanardağ|Kutup ışıkları|Çöl|Buzul|Şelale|Gökkuşağı|Havuç|Ispanak|Biber|Soğan|Domates|Gümüş takılar|Altın takılar|Ateş|Şemsiye|Ağaç|Taş|Kaşık|Ekmek|Sıcak hava balonu|Kol saati|Köprü|Kapı|Yıldızlı gökyüzü|Güneş'''.split('|')
families=json.loads(Path('dist/games/gonder-gitsin/relations194.json').read_text())
rows=[]
for fi,f in enumerate(families):
 assert len(set(f['yes']))>=3 and len(set(f['no']))==4 and not set(f['yes'])&set(f['no'])
 for j,n in enumerate(f['no']):
  ids=[f['yes'][(j+k)%len(f['yes'])] for k in range(3)]+[n]
  assert len(set(ids))==4
  rows.append(dict(id=f'gg194-{fi:03}-{j}',family=f'gg194-{fi:03}',category=f['category'],level=f['level'],question=f['question'],options=[names[i] for i in ids],images=[f'../../assets/gonder194/{i}.webp' for i in ids],answer=3,explanation=f'{names[n]} bu üçlüye uymaz. '+f['why']))
assert len(rows)==520
Path('dist/games/gonder-gitsin/bank194.js').write_text('window.GonderBank194='+json.dumps(rows,ensure_ascii=False,separators=(',',':'))+';\n')
print('520 photo cases / 130 relation families')
facts=[]
for line in Path('dist/games/gonder-gitsin/facts194.tsv').read_text().splitlines():
 parts=line.split('|');assert len(parts)==5
 i=int(parts[0]);theme='Doğa' if i<29 or 99<=i<=114 else 'Mutfak' if 40<=i<=45 or 56<=i<=62 or 84<=i<=90 or 123<=i<=127 or i==69 else 'Çiçekler' if 48<=i<=55 else 'Dünya kültürü' if 32<=i<=39 or 91<=i<=95 or i==97 else 'Spor' if 77<=i<=83 else 'Bilim ve doğa' if 72<=i<=76 or 115<=i<=122 else 'Araçlar ve sanat'
 for j,question in enumerate(parts[1:]):facts.append(dict(id=f'gf194-{i:03}-{j}',subject=i,name=names[i],image=f'../../assets/gonder194/{i}.webp',theme=theme,question=question))
assert len(facts)==520 and len({q['id'] for q in facts})==520
Path('dist/games/gonder-gitsin/final194.js').write_text('window.GonderFinal194='+json.dumps(facts,ensure_ascii=False,separators=(',',':'))+';\n')
print('520 final clues / 130 photographic subjects')
