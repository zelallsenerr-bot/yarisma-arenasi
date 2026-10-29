# Yarışma Arenası — 75 oyun sahne düzenlemesi

54 önceki oyun ve kalan 21 oyun, katalog kimlikleriyle eşleştirildi. Her oyunun mevcut dekoru ve oyun motoru korundu; kişi seçimi, oturma/ayakta durma pozları, bakış yönleri, masa/kürsü derinliği ve sahne mesafeleri düzenlendi.

Görseller yapay zekâ ile hazırlanmış fotogerçekçi tam beden canlandırmalardır; gerçek video veya hacimsel 3B insan taraması değildir. Taksi oyununun mevcut gerçekçi kabin görüntüleri korundu.

## Kalan 21 oyun

- Kim Milyoner Olmak İster? (`son-karar`)
- Var Mısın Yok Musun? (`kutu-karari`)
- 1 Milyon Canlı Para (`para-kapani`)
- Şansa Davet (`sepetini-koru`)
- Alan (`alan-hakimi`)
- Güven Bana (`guven-cizgisi`)
- Aileler Yarışıyor (`aile-meydani`)
- Büyük Risk (`risk-meydani`)
- Çarkıfelek (`kelime-carki`)
- Kim Gitsin? (`ortak-kasa`)
- Lingo Türkiye (`lingo-meydani`)
- Kapanmadan Kazan (`kapi-kapanmadan`)
- Zuhal Topal’la İzdivaç (`kismet-locasi`)
- İşte Benim Stilim (`iste-benim-stilim`)
- Milyoner Aile (`milyoner-aile`)
- Saba ile Oyuna Geldik (`saba-ile-oyuna-geldik`)
- Altın Petek (`altin-petek`)
- Tuhaf Taksi (`tuhaf-taksi`)
- Bir İçeri Bir Dışarı (`bir-iceri-bir-disari`)
- Kendi Düşen Ağlamaz (`kendi-dusen-aglamaz`)
- Sıradaki Gelsin (`siradaki-gelsin`)

## Önceden düzenlenen 54 oyun

- Ben Bilmem Eşim Bilir
- Survivor
- En Zayıf Halka
- Bir Kelime Bir İşlem
- Passaparola
- Yemekteyiz
- MasterChef Türkiye
- Gelinim Mutfakta
- Kelime Oyunu
- Kazanmak İçin 1 Dakika
- Yetenek Sizsiniz Türkiye
- O Ses Türkiye
- Şanslı Masa
- Password
- Beyaz’la Joker
- Cevap Soruda
- Ütopya
- Mehmet Ali Erbil ile Eyvah Düşüyorum
- Süper Bulmaca
- Takip
- Şebeke
- Turnike
- Ben Bilirim
- Piramit
- 3’te 3
- Ali İhsan Varol ile Kumbara
- Kızlar ve Anneleri
- İlk Buluşma
- Telefon Kulübesi
- Çifte Milyon
- Yaparsın Aşkım
- Hepsi Benim
- 19
- Şahane Pazar
- Bak Şu Duvara
- Çember
- Gönder Gitsin
- Temizlik Benim İşim
- Göz6
- Evim Şahane
- 50 Sarışın
- Milyonluk Resim
- Cevap Sende
- The Taste Türkiye
- Herkes Kazanır
- Arkandayız
- Anlaşma
- Yaşım Kaç?
- Para Odası
- Kızma Kazan
- Şans Kapıda
- Kapış Kapış
- Gel Hemşerim
- Para Bende

## Somut düzeltmeler

- Cevap Soruda: dört ayrı kürsünün arkasında yarışmacılar; sunucu kendi kürsüsünde.
- Şanslı Masa ve İlk Buluşma: mevcut kontrol masası/koltuklarına hizalı sunucular; karşılıklı sohbet eden masa arkadaşları.
- Kumbara ve Milyonluk Resim: mevcut tabureler korundu; bedenler oturma noktalarına yerleştirildi.
- Herkes Kazanır: beş koltuk önünde ayrı sunucu alanı.
- Kızma Kazan: Öner Erkan oturarak mevcut masa arkasında, masa bedeni doğru örter.
- İşte Benim Stilim: eski kırpılmış yüz panelleri kaldırıldı, dört jüri üyesi tam beden ve gerçek sahne koltuklarında.
- 50 Sarışın: elli ayrı sarışın kadın görseli korundu; genel yarışmacı havuzuyla yanlış değiştirme düzeltildi.
- Şansa Davet: dört yarışmacı kanepede, sunucu ayrı koltukta; seyirci eklenmedi.
- Bilinen sunucu/ünlü adları anonim kişiyle değiştirilmez; aynı yüzün bazı farklı kıyafet kopyaları genel havuzdan çıkarıldı.
- Sprite sınırlarındaki komşu el parçaları, bağlı alfa bileşeni temizliğiyle giderildi.

## Doğrulama

- `node tests/staging437.cjs`: 75 yükleyici, 54+21 envanter, dosyalar/kırpmalar, ad/poz eşleşmeleri, bakış aynalama, yaş/cinsiyet, sabit kimlik seçimi; gerçek Three.js nesnelerinde oturma → yürüme → düşme geometrisi.
- `node tests/alpha437.cjs`: ana beden ve ayrık baş korunur, uzaktaki komşu el parçası kaldırılır.
- 54 dekor sahnesi toplu ekranlarda, paylaşılan stüdyoların 18 özgün dekoru ayrı seçimlerle incelendi. Aktif oyun durumuna bağlı İzdivaç ve Stilim yarışmacıları dekor fikstüründe başlamaz; oyun motoruna ait akış korunur.
- Hareketli Kendi Düşen Ağlamaz sahnesinde para taşıma/yürüme, kapak açılışı/düşme, gizli etap kontrolleri; Taksi gerçek başlangıç/soru ekranı.
- Bu kontrol tarayıcısında WebGL açılamadığı için Sıradaki Gelsin GPU görüntüsü doğrulanamadı. Oturma/yürüme davranışı Three.js yapısal testleriyle doğrulandı. 75 oyunun tamamında baştan sona oyun turu oynandığı iddia edilmez.

- Cevap Soruda, Şanslı Masa ve Herkes Kazanır, 390px iç pencere genişliğinde de incelendi.

## Görsel üretim kayıtları

Yöntem: yerleşik ImageGen. Kabul edilen WebP dosyaları `dist/humans435/angle437-*.webp` altında; her üretimin tam istemi, isim sırası, kaynak görseli ve kırpma koordinatları `research/asset437-*.json` içinde. `seatedhosts` kimlikleri hatalı olduğu için kullanım dışı bırakıldı; görseli `research/rejected437` altında tutulur. Yeni kayıtlar `scripts/collect437.py` ile derlenir.

Yeni yönlü poz eşleşmeleri: 95. Genel ayakta bedenler: 20; koltuksuz oturan bedenler: 22.
