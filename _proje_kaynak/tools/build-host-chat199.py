import json,pathlib,re
ROOT=pathlib.Path(__file__).resolve().parents[1]
# Hosts are the characters in this adaptation; no new TV-history claims.
rows='''son-karar|Cem Öğretir|quiz|Soru gelince önce kökünü mü, şıkları mı okursun?|Soruyu kendi cümlelerinle özetlemek aceleyi azaltabilir.|merak ettiğin konular
kutu-karari|Esra Erol|boxes|Kutunu seçerken bir sayıya mı, ilk hissine mi güvenirsin?|Kapalı kutunun içini bilemeyiz; teklif geldiğinde kendi kararını dinle.|uğurlu sayılar
para-kapani|Mesut Yar|risk|Parayı tek şıkta toplamak mı, bölmek mi sana daha yakın?|Karar vermeden önce seçenekleri birlikte tartmak işini kolaylaştırabilir.|karar verme alışkanlıkların
sepetini-koru|Yiğit Alıcı|risk|Sepetini korurken ilk düşüncen temkin mi, cesaret mi?|Bir sonraki hamleden önce elindeki durumu bir kez daha gözden geçir.|alışveriş alışkanlıkların
alan-hakimi|Oktay Kaynarca|quiz|Karşılıklı mücadelede bilgi mi, sakinlik mi seni öne çıkarır?|Rakibin hızından önce kendi soruna odaklan.|rekabetle aran
 guven-cizgisi|Müge Anlı|team|Ortak karar verirken seni ikna eden şey ne olur?|Kararını söylemeden önce eşinin gerekçesini de dinlemek iyi gelebilir.|güven duyduğun insanlar
esim-yapar|İlker Ayrık|team|Eşin bir görevde kendine güvenince sen de hemen inanır mısın?|Birbirinize yalnızca cesaret değil, açık bir plan da verin.|birlikte başardığınız işler
aile-meydani|Asuman Krause|team|Ailende cevapları ilk kim söyler, kim son anda yetiştirir?|Bazen en gündelik cevap, en çok kişinin aklına gelen cevaptır.|aile içindeki tatlı rekabet
ada-mucadelesi|Murat Ceylan|physical|Parkurda seni hız mı, engeli çözmek mi daha çok heyecanlandırır?|Hızlanmadan önce bir sonraki adımını görmeye çalış.|hareketli hobilerin
risk-meydani|Selçuk Yöntem|quiz|Bildik bir başlık mı, yüksek değerli zor bir başlık mı seni çeker?|Başlığa karar verirken yalnızca değerine değil bildiklerine de bak.|sevdiğin bilgi alanları
halka-mucadelesi|Baybars Altuntaş|team|Halka en çok kimin sakin kalmasıyla güçlenir sence?|Takımın temposunu dinlemek bazen tek başına hızlı olmaktan değerlidir.|takım arkadaşlığın
kelime-carki|Cem Davran|word|Çark dönerken harfi mi, bütün kelimeyi mi düşünürsün?|Gördüğün harfleri sesli düşünür gibi bir araya getir.|dilinin ucunda kalan kelimeler
kelime-islem|Sunucu|word|Sayılar mı, harfler mi sana daha yakın?|İlk fikrine takılı kalırsan başka bir birleşim denemek iyi gelebilir.|sayılarla ve kelimelerle aran
harf-cemberi|Kaan Sekban|word|Bir harfte takılınca bekler misin, çevreyi tamamlayıp döner misin?|Takıldığın harfe sonra dönmek bazen zihnini açar.|kelime çağrışımların
sofra-rekabeti|Zuhal Topal|cooking|Misafirin seni en çok hangi yemeğinle hatırlasın istersin?|Lezzet kadar masadaki sıcaklık da akılda kalır.|misafir ağırlama hikâyelerin
sefler-arenasi|Somer Sivrioğlu|cooking|Yeni bir tabakta önce lezzeti mi, sunumu mu hayal edersin?|Tabaktaki her parçanın neden orada olduğunu düşün.|mutfaktaki ilk denemen
altin-sofra|Aslı Hünel|cooking|Aileden kalan bir tarifin var mı?|Tanıdık bir lezzete kendi dokunuşunu eklemek güzel bir başlangıçtır.|aile tariflerin
kelime-meydani|İbrahim Selim|word|Bir tanımı duyunca kelimeyi hemen görür müsün, harf harf mi kurarsın?|Tanımdaki küçük ayrıntılara kulak vermek yeni çağrışımlar açabilir.|sevdiğin sözcükler
altmis-saniye|Zuhal Topal|physical|Kısa bir görevde hızlanınca mı, ritim bulunca mı rahat edersin?|Küçük ve düzenli hareketler telaşı azaltabilir.|zamanla yarıştığın anlar
yetenek-sahnesi|Alp Kırşan|talent|Sahneye çıkmadan önce kendine ne söylersin?|Kendine ait bir dokunuş seyircinin aklında kalabilir.|gizli yeteneklerin
donen-koltuklar|Saadet Özsırkıntı|talent|Bir şarkıyı seçerken sözleri mi, sende bıraktığı duygu mu belirleyici?|Sesini göstermek kadar şarkının hikâyesini hissettirmek de önemli.|dilinden düşmeyen şarkılar
ortak-kasa|Ufuk Özkan|team|Ortak kasada aynı fikirde olmadığınızda nasıl uzlaşırsınız?|Birbirinizin nedenini duymak ortak kararı kolaylaştırır.|ortak kararların
lingo-meydani|Kemal Uçar|word|Bir kelimeyi ararken önce yaygın harfleri mi denersin?|Her denemeden kalan bilgiyi bir sonraki kelimede kullan.|kelime oyunlarıyla aran
kapi-kapanmadan|Murat Serezli|quiz|Kapı yaklaşırken seni en çok ne sakinleştirir?|Önce soruyu netleştir, sonra hamleni yap.|heyecanla baş etme yolların
sansli-masa|Sinan Çalışkanoğlu ve Orçun Kaptan|team|Masada sürpriz bir görev çıksa kiminle göz göze gelirsin?|Birbirinize kısa ve anlaşılır işaretler vermek işe yarayabilir.|masadaki sohbetlerin
password|Şebnem Bozoklu|word|Tek bir ipucuyla anlaşmak sende hangi çağrışımı uyandırıyor?|İpucunu gereğinden çok düşünmeden ilk anlamına da bir şans ver.|bir kelimeyle anlattığın anlar
kismet-locasi|Zuhal Topal|social|Birini tanırken ilk hangi soruyu sormak istersin?|İyi bir sohbet hem anlatmak hem de dinlemekle ilerler.|tanışma hikâyelerin
beyazla-joker|Beyazıt Öztürk|quiz|Joker cebindeyken insan daha mı rahat düşünür?|Önce kendi fikrini kur, sonra gerek duyduğun desteğe bak.|yardım istemekle aran
iste-benim-stilim|Öykü Serter|creative|Bir kombinde önce rengi mi, hikâyeyi mi seçersin?|Seçtiğin parçaların birbirleriyle nasıl konuştuğunu düşün.|tarzını yansıtan ayrıntılar
cevap-soruda|Ersin Düzen|quiz|Cevabın izini soru metninde aramak hoşuna gider mi?|Metni bir kez de farklı vurguyla okumak yeni bir ayrıntı gösterebilir.|dikkatini çeken ayrıntılar
milyoner-aile|Engin Altan Düzyatan|observation|Bir videoyu izlerken gözün en çok harekete mi, ayrıntıya mı gider?|İzlerken yalnızca ana olaya değil çevresindeki küçük değişimlere de dikkat et.|görsel hafızan
utopya|Anlatıcı|social|Ortak bir yaşamda ilk üstleneceğin iş ne olurdu?|Kendi planının yanında diğerlerinin ihtiyacını da düşün.|birlikte yaşama alışkanlıkların
saba-ile-oyuna-geldik|Saba Tümer|team|Arkadaş grubunda oyunu başlatan mısın, şakayı yapan mı?|Birlikte eğlenmek için herkesin fikrine yer aç.|arkadaş grubundaki rolün
altin-petek|Engin Hepileri|quiz|Petekte ilerlerken kendine küçük hedefler koyar mısın?|Bir sonraki adımı düşünmek uzun yolu daha anlaşılır kılabilir.|sabır isteyen uğraşların
eyvah-dusuyorum|Mehmet Ali Erbil|quiz|Zemin altında sürpriz varken soruya odaklanmak nasıl bir his?|Sahnedeki sürprizlerden önce soru cümlesini yakala.|beklenmedik sürprizler
super-bulmaca|Alper Ateş|word|Harfler açılırken zihninde tek bir kelime mi, birkaç ihtimal mi oluşur?|Birden fazla ihtimali aklında tutup tanımla karşılaştır.|bulmaca alışkanlıkların
takip|Uraz Kaygılaroğlu|quiz|Takipçi arkandayken kendi ritmini koruyabilir misin?|Rakibin konumu kadar kendi cevabının gerekçesine de odaklan.|takip edilmeye benzeyen tatlı rekabetler
tuhaf-taksi|Abdurrahman Yunusoğlu|observation|Taksi yolculuğunda sohbeti ilk kim açar?|Soruyu dinlerken yolculuğun telaşını bir an kenara bırak.|yolda karşılaştığın insanlar
turnike|Mehmet Ali Erbil|physical|Bir görevde önce denemeyi mi, plan yapmayı mı seversin?|Görevin küçük adımlarını sıraya koymak işleri kolaylaştırabilir.|eğlenceli küçük meydan okumalar
ben-bilirim|Alper Ateş|quiz|Bir cevabı bildiğinde ses tonun değişir mi?|Duyduğun sorunun tam olarak ne istediğini kontrol et.|bilginin nereden geldiği
piramit|Yusuf Çim|word|Bir kelimeyi anlatırken örnek vermek mi, çağrışım kurmak mı kolay geliyor?|Karşındakinin aklında hangi bağlantının oluşacağını düşün.|anlaşmanın kısa yolları
ucte-uc|Pelin Çift|quiz|Üç soruluk bir grupta her soruya ayrı mı odaklanırsın?|Önceki cevabı geride bırakıp sıradaki soruyu kendi içinde değerlendir.|tarih merakın
kumbara|Ali İhsan Varol|quiz|Biriktirdikçe daha temkinli mi, daha cesur mu olursun?|Etap hedefini göz önünde tutup bildiğin sorulara odaklan.|küçük birikim alışkanlıkların
kizlar-ve-anneleri|Ümit Kantarcılar|team|Ailende en çok kimin ne yapacağını önceden tahmin edebilirsin?|Birbirini tanımak kadar o an dikkatle dinlemek de işe yarar.|ailenle ortak özelliklerin
ilk-bulusma|Şinasi Yurtsever ve Sinan Çalışkanoğlu|social|İlk buluşmada sohbet susarsa konuyu nasıl açarsın?|Samimi ve küçük bir soru, hazır bir cümleden daha çok kapı açabilir.|ilk izlenimler
telefon-kulubesi|Telefondaki ses|physical|Telefon aniden çalsa açmadan önce ne düşünürsün?|Görevi dikkatle dinleyip ne istendiğini netleştir.|beklenmedik telefonlar
cifte-milyon|İlker Ayrık|team|Parayı yerleştirirken ikiniz de aynı seçeneği düşünür müsünüz?|Şıklar arasında karar vermeden önce birbirinizin gerekçesini duymaya çalışın.|birlikte aldığınız kararlar
yaparsin-askim|İlker Ayrık|team|Eşine en çok hangi görevde güvenirsin?|Cesaret verirken yapabileceğiniz somut bir plan da kurun.|birbirinizi şaşırttığınız anlar
hepsi-benim|Çağla Şıkel|creative|Bir ürünün fiyatını görünüşünden tahmin edebilir misin?|Gördüğün ayrıntıları bir araya getirip sakin bir tahmin yap.|fiyat tahmini alışkanlıkların
on-dokuz|Barış Kılıç|quiz|Bir hedefe yaklaşınca hızlanır mısın, daha dikkatli mi olursun?|Sonraki adımı aceleye getirmeden mevcut durumu gör.|hedef koyma alışkanlıkların
sahane-pazar|Süheyl Uygur ve Behzat Uygur|physical|Pazar eğlencesinde seni sahneye çıkaran ne olurdu?|Görevin eğlencesini yaşarken ne istendiğini de aklında tut.|pazar günü anıların
bak-su-duvara|Behzat Uygur|physical|Duvar yaklaşırken ilk tepkin gülmek mi, şekli çözmek mi?|Boşluğun bütününü görüp duruşunu ona göre kur.|dengeyle aran
cember|Sunucu|social|Dar bir alanda beklemek mi, karar vermek mi daha zor?|Kendi ihtiyacını ve bir sonraki kararı birlikte düşün.|sabır sınavların
gonder-gitsin|Timur Acar|observation|Görsellerde ilk gözüne çarpan şeye hemen güvenir misin?|Görselleri yalnızca tek tek değil, aralarındaki ilişkiyle de değerlendir.|görsel çağrışımların
temizlik-benim-isim|Kadir Ezildi|creative|Bir odaya girince ilk hangi ayrıntıyı fark edersin?|İşe başlamadan önce hangi alanın neye ihtiyacı olduğuna bak.|düzen alışkanlıkların
goz6|Öykü Serter|social|Bir ev dolusu insan içinde seni nasıl tanırlar?|Kendi tavrını korurken diğerlerinin sözünü de duy.|ev arkadaşlığın
evim-sahane|Selim Yuhay|creative|Bir odayı değiştirsen ilk hangi köşeye dokunurdun?|Güzel görünüşün yanında odanın nasıl kullanılacağını da düşün.|hayalindeki oda
elli-sarisin|Mehmet Ali Erbil|quiz|Bir rakibin soruyu bilip bilmediğini neye göre tahmin edersin?|Yalnızca görüntüsüne bakıp bilgi düzeyi hakkında karar verme.|insanları tanıma biçimin
milyonluk-resim|Selçuk Yöntem|observation|Bir resimde büyük görüntüyü mü, küçük ayrıntıları mı önce görürsün?|Görselin ilk izlenimini ayrıntılarıyla karşılaştır.|resimlere bakma alışkanlıkların
bir-iceri-bir-disari|Derda Yasir Yenal|risk|Bir hamle kazandırınca hemen bir sonrakini de denemek ister misin?|Önce son hamlenin neyi değiştirdiğini gör.|cesaret ve temkin dengen
cevap-sende|Anıl İlter|quiz|Cevap sende olduğunda hemen söylemek mi, biraz tartmak mı istersin?|Sorunun istediği bilgiyle aklına gelen ilk bilgiyi ayır.|hızlı kararların
the-taste-turkiye|Hazer Amani|cooking|Bir kaşıklık lezzetle bir hikâye anlatabilir misin?|Küçük bir sunumda tatların birbirini örtmemesine dikkat et.|aklında kalan lezzetler
kendi-dusen-aglamaz|Ertem Şener|quiz|Sürprizli bir sahnede sakin kalmanın sırrı sende ne?|Önce cümleyi tamamla, sonra cevabını değerlendir.|sürprizlere verdiğin tepkiler
siradaki-gelsin|Emre Karayel|risk|Sıranın sana gelmesini beklemek mi, hamle yapmak mı daha heyecanlı?|Bir önceki sonuçtan çok kendi hamleni düşün.|bekleme anların
herkes-kazanir|Hakan Bilgin|quiz|Bir soruyu birlikte düşünmek mi, tek başına çözmek mi hoşuna gider?|Farklı bir açıdan bakmak yeni bir bağlantı kurmana yardımcı olabilir.|paylaştığın bilgiler
arkandayiz|Ünal Yeter|team|Arkandan destek sesi gelince daha mı rahat edersin?|Desteği duy ama kararını anlaşılır biçimde kendin de kur.|sana cesaret verenler
anlasma|Sunucu|risk|Bir teklif gelince ilk baktığın şey ne olur?|Teklifin sende neyi değiştirdiğini düşünüp kendi kararını ver.|uzlaşma alışkanlıkların
yasim-kac|Behzat Uygur|observation|Bir yaş tahmininde ilk izlenimine ne kadar güvenirsin?|Tek bir ayrıntıdan kesin bir sonuç çıkarmadan bütününe bak.|tahmin oyunların
para-odasi|Ahmet Çakar|risk|Odanın kapısı açılmadan önce aklından ne geçer?|Heyecanın yanında küçük bir planın olması iyi gelebilir.|heyecanlı bekleyişlerin
kizma-kazan|Öner Erkan|social|Sana şaka yapıldığını fark edince gülmek mi, şaşırmak mı önce gelir?|Sürpriz bir anda bir nefes alıp durumu anlamaya çalış.|şakalara bakışın
sans-kapida|Yiğit Alıcı|creative|Kapına sürpriz bir yarışma gelse ilk kimi çağırırsın?|Elindeki seçeneklerin her birini görüp sonra karar ver.|kapıdaki sürprizler
kapis-kapis|Sinan Çalışkanoğlu|physical|Hediye görünce hızlanmak mı, yolu planlamak mı önce gelir?|Koşmadan önce dönüş yolunu da hesaba kat.|tatlı telaşların
gel-hemserim|Rüştü Onur Atilla|team|Hemşerilerin yanında olunca kendini daha mı rahat hissedersin?|Birlikte düşünüp birbirinize konuşacak alan bırakın.|memleket sohbetlerin
para-bende|Almeda Abazi ve Murat Ceylan|social|Bir geziyi önce rota üzerinden mi, bütçe üzerinden mi planlarsın?|Yeni bir yer keşfederken merakınla planını dengele.|gezi anıların'''
rows+='\nsebeke|Şebeke ekibi|social|Bir aile sohbetinde oyunun içinde olduğunu ne zaman fark ederdin?|Duyduklarını dikkatle dinleyip kendi izlenimini oluştur.|aile sofralarındaki sohbetler'
config={}
for line in rows.splitlines():
 game,host,kind,hook,tactic,topic=line.strip().split('|');config[game]=dict(host=host,kind=kind,hook=hook,tactic=tactic,topic=topic)
games=json.loads((ROOT/'dist/catalog.json').read_text());assert len(config)==len(games)==75,(len(config),set(g['id'] for g in games)-set(config))
for g in games:
 c=config[g['id']];c['name']=g['name'];html=(ROOT/'dist'/g['path']).read_text();scripts=re.findall(r'<script[^>]+src="([^"]+)',html);hits=[]
 for src in scripts:
  f=(ROOT/'dist'/g['path']).parent/src.split('?')[0]
  if not f.is_file() or not f.resolve().is_relative_to((ROOT/'dist/games').resolve()) or 'bank' in f.name or f.name in ['host-chat199.js','host-chat-data199.js']:continue
  if re.search(r'sohbet|diyalog|smalltalk|chitchat',f.read_text(errors='replace'),re.I):hits.append(src)
 c['existingConversationSignals']=hits
(ROOT/'dist/host-chat-data199.js').write_text('window.ArenaHostChatData199='+json.dumps(config,ensure_ascii=False,separators=(',',':'))+';\n')
(ROOT/'dist/host-chat-audit199.json').write_text(json.dumps({'games':[{'id':g['id'],'host':config[g['id']]['host'],'newConversationTopics':6,'existingConversationSignals':config[g['id']]['existingConversationSignals']} for g in games]},ensure_ascii=False,indent=2))
print('75 host profiles; six multi-turn topics each; existing conversation code retained')
