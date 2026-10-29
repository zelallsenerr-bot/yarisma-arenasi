"""Build distinct fact relations and reproducible scenario questions, not shuffled copies."""
import json,pathlib,re,collections,hashlib
ROOT=pathlib.Path(__file__).resolve().parents[1]; OUT=ROOT/'dist/games/elli-sarisin'
raw_by_text={}
for source in sorted((ROOT/'dist').rglob('bank*.js')):
 text=source.read_text(errors='replace');match=re.search(r'(?:window\.)?\w+\s*=\s*(\[)',text)
 if not match:continue
 try:items=json.JSONDecoder().raw_decode(text[match.start(1):])[0]
 except ValueError:continue
 for q in items:
  if not isinstance(q,dict) or not q.get('question') or not q.get('options'):continue
  if not isinstance(q.get('correct',q.get('answer')),int):continue
  raw_by_text.setdefault(q['question'].lower(),q)
raw=list(raw_by_text.values())
def ans(q):return str(q['options'][q.get('correct',q.get('answer'))])
def family(q,prefix):return q.get('family','').startswith(prefix+':')
def mapped(cat,prefix,condition=lambda q:True):
 d={}
 for q in raw:
  if q.get('category')==cat and family(q,prefix) and condition(q):
   subject=q['family'].split(':',1)[1];d.setdefault(subject,(subject,ans(q)))
 return list(d.values())
def generic(cats):
 d={}
 for q in raw:
  if q.get('category') not in cats:continue
  a=ans(q)
  if len(a)>65:continue
  t=q['question']
  for p in ['Günlük yaşamda kullanılan bir araç veya kavram tarif ediliyor. ','Bir tarih belgeselinde bu ayrıntıdan söz ediliyor. ','Bir gezi programında rehber bu ayrıntıya dikkat çekiyor. ','Bir doğa belgeselinde anlatıcı bu özelliği vurguluyor. ']:t=t.removeprefix(p)
  if len(t)>220:continue
  d.setdefault(a,(t,a))
 return list(d.values())
sets=[]
def add(name,label,rows,kind='map'):
 assert len(rows)>=32,(name,len(rows))
 sets.append(dict(id='c'+str(len(sets)),name=name,label=label,kind=kind,rows=rows))
add('Film yönetmenleri','filminin yönetmeni',mapped('Sinema','film',lambda q:'yönetmen' in q['question']))
add('Film yılları','filminin ilk gösterim yılı',mapped('Sinema','film',lambda q:'yıl' in q['question']))
add('Sinema oyuncuları','filminde sorulan karakterin oyuncusu',mapped('Oyuncular','film'))
# Preserve the role in the question instead of suggesting every cast member is the same character.
sets[-1]['rows']=generic(['Oyuncular']);sets[-1]['kind']='quiz'
add('Kitaplar ve yazarlar','eserinin yazarı',mapped('Edebiyat','book'))
add('Şarkılar ve sanatçılar','şarkısını seslendiren sanatçı',mapped('Müzik','song'))
rows=[]
for q in raw:
 if q.get('category')=='Televizyon' and family(q,'tv') and len(q['family'].split(':'))==3:
  p=q['family'].split(':');rows.append((p[1]+' — '+p[2]+' rolü',ans(q)))
rows=list(dict.fromkeys(rows));add('Televizyon','rolünün oyuncusu',rows)
add('Başkentler','ülkesinin başkenti',mapped('Dünya şehirleri','country'))
add('Ülkeler','başkentinin ülkesi',[(b,a) for a,b in mapped('Dünya şehirleri','country')])
add('Dünya dilleri','ülkesinin dil notu',mapped('Diller','country'))
add('Kıtalar','ülkesinin coğrafi kıtası',mapped('Dünya coğrafyası','country'))
add('Plaka kodları','ilinin trafik plaka kodu',mapped('Türkiye şehirleri','city'))
add('Türkiye bölgeleri','il merkezinin coğrafi bölgesi',mapped('Türkiye coğrafyası','city'))
# Cross-border / ambiguous geographies are excluded from this category's source banks.
rows=[]
for q in raw:
 if family(q,'place') and q.get('category')=='Dünya kültürü':rows.append((q['family'].split(':',1)[1],ans(q)))
add('Dünya yapıları','yapısının bulunduğu ülke',list(dict.fromkeys(rows)))
add('Gezilecek yerler','',generic(['Gezilecek yerler','Seyahat','Kültür ve coğrafya','Dünya kültürü']),'quiz')
add('Teknoloji','',generic(['Teknoloji','Bilgisayar parçaları','İnternet terimleri']),'quiz')
add('Spor bilgisi','',generic(['Spor','Futbol terimleri','Olimpik dallar','Basketbol','Kış sporları','Su sporları']),'quiz')
add('Mutfak kültürü','tarifinde öne çıkan malzeme',list(dict.fromkeys(mapped('Mutfak','food')+[('Cacık','Yoğurt'),('Guacamole','Avokado'),('Marzipan','Badem'),('Patlamış mısır','Mısır'),('Kestane şekeri','Kestane'),('Helva (tahinli)','Susam'),('Pesto (klasik yeşil)','Fesleğen'),('Çikolata','Kakao')])))
add('Sanat','',generic(['Sanat','Ressamlar','Resim teknikleri','Mimarlık','El sanatları']),'quiz')
add('Tarih','',generic(['Tarih','Anadolu uygarlıkları','Dünya tarihindeki olaylar','Antik dünya','Millî mücadele']),'quiz')
add('Bilim ve doğa','',generic(['Bilim ve doğa','Bilim','Biyoloji','Doğa','Astronomi','Uzay','Bilim insanları','Gök cisimleri','İnsan vücudu','Ekoloji']),'quiz')
add('Genel kültür','',generic(['Gündelik nesneler','Gündelik kültür','Dünya kültürü','Türk kültürü','Bilim tarihi','Hobiler','Meslekler','Sanat']),'quiz')
add('Dil ve kültür','',generic(['Dil ve kültür','Dil ve deyimler','Deyimler','Atasözleri','Dil ve edebiyat','Edebî türler','Kitap dünyası','Masallar','Türk halk dansları','Müzik terimleri']),'quiz')
add('Coğrafya bilgisi','',generic(['Coğrafya','Doğa','Dağlar','Nehirler','Türkiye gölleri','Adalar','Çöller','Türkiye coğrafyası']),'quiz')
add('Gündelik yaşam','',generic(['Gündelik nesneler','Günlük hayat','Gündelik yaşam','Mutfak teknikleri','Bahçe işleri','Kumaşlar','Ulaşım terimleri','Denizcilik','Havacılık','Fotoğrafçılık']),'quiz')
assert len(sets)==24
(OUT/'facts195.json').write_text(json.dumps(sets,ensure_ascii=False,separators=(',',':')))
print([(x['name'],len(x['rows'])) for x in sets])
