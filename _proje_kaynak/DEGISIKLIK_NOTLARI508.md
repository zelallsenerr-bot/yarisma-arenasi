# Yarışma Arenası — düzeltme 508

Temel sürüm: yayımlanan v85, `d198ff361c0257326e7275ac15674c6510635971`. Mevcut oyunlar, kayıtlar ve ZIP dışında kalan kaynaklar korundu. Bu belge her isteğin sıfırdan yeniden yapıldığı anlamına gelmez: önceki sürümdeki işlevler korunmuş, eksik bulunan alanlara aşağıdaki ek düzeltmeler yapılmıştır.

## Bu sürümde özellikle bakılacak yerler

- **Şanslı Masa / İlk Buluşma:** seçilen altı kişinin her biri için masaya oturan tam beden; portre üzerine farklı beden bindirilmesi kaldırıldı. Elif seçilince tesettürlü aynı kişi sahnede görünür. Genel kişi yenilemesi özel seçimi değiştiremez. Başlık sahneden ayrıldı.
- **Güven Bana:** yüzleşme ile portre aynı yüz atlasından gelir. Kadın rakip erkek olmaz; yaş ve görünüm kayıt boyunca sabittir. Koltuk/buton hizası güncellendi.
- **Kelime Oyunu / Password / Beyaz’la Joker:** fotoğraf dokusu kullanan eklemli kol uzanması; Kelime Oyunu eli butona uzanır. Password dağıtma hareketi 2,1 saniyede biter, sürekli sallanmaz. İsimler sahnenin altındaki okunur şeride taşındı.
- **Survivor:** 20 gerçek yarışmacının referans yüzlerine dayalı tam beden canlandırması, hem ada sahnesinde hem parkurda. Kendi profilinle veya listeden seçtiğin yarışmacıyla başlama korunur. Parkur adları yüzlerin üstünden uzaklaştırıldı; elenenler ada dizilişinde gizlenir.
- **Kapanmadan Kazan:** oyuncu bilgisayar paketine ayrı yüksek çözünürlüklü ürün görseli; mevcut kayıtlardaki paket de onarılır. Yanal ve çapraz ilerleme görünümü eklendi.
- **En Zayıf Halka / ortak sahneler:** elenen kişinin eski portresinin tekrar oluşturulması engellendi; açıkça elendiği bildirilen kişi yuvası gizlenir. Portre üzerindeki ikinci arka plan resmi bastırıldı.
- **Sıradaki Gelsin:** normal saniyeye ek olarak tanışma, soru kurulumu, cevap ve tüp geçişleri yarışma saatine bir defa yansır. Mola ve düello açıklaması süreyi tüketmez. Sıradan geri gelen kişi yeniden tanışma yerine yeniden hoş geldin diyaloğunu alır.
- **Kendi Düşen Ağlamaz:** yazılımsal görüntüleyicide de ıslak kıyafet koyuluğu; omuz/kalça/diz/bilek düşme tepkileri asimetrik. Son soru beklemesi önceki sürümden korunur.
- **Çember:** yürürken fotoğraf parçalarını yanlış atlas koordinatından kesen hata düzeltildi.
- **Yemekteyiz / Evim Şahane:** bıçak, kaşık, tabak, boya rulosu ve tornavida için gerçekçi el/alet dokuları; yemek masasında sırayla yeme hareketi. Önceden eklenen iş bölgesi, doğru alet ve eşya yerleştirme akışları korunur.
- **Şahane Pazar:** ortak fotoğraf dokulu eklemli beden hareketi; beş balonun fiziksel görev akışı korunur.
- **Kızma Kazan:** eski şıklı sakinleşme sorularının yerine beş servis/sıralama/yerleştirme görevi; sürükle-bırak, dokunarak seçme ve klavye desteği. Stres, nefes, mola ve çekilme kuralları korunur.
- **Para Bende:** tekerlemeyi okuyup sonra hafızadan yazma düellosu; Türkçe harf ve noktalama kontrolü, şapkalı harf toleransı.
- **Soru çeşitliliği:** 48 yeni özgün soru (16 kolay, 16 orta, 16 zor), beş uyumlu banka eklenir. Son üç sorudaki soru biçimini, alternatif varsa tekrar etmeyen seçim. Milyonluk Resim’e 12 ek görsel yorumlama/uygulama sorusu; görülmemiş resimlere öncelik.
- **Görünüm seçimi:** alternatif erkek/kadın bedenlerini yüklerken yanlış `.png` uzantısı nedeniyle oluşan boş görsel düzeltildi.

## 44 maddeye göre kontrol noktaları

| Madde | Korunan / eklenen karşılık |
|---|---|
|1|Güven Bana koltuk ve en yakın buton yerleşimi; yüz kimliği onarımı.|
|2|Büyük Risk puan üzerindeki pembe katman düzeltmesi korunur.|
|3|En Zayıf Halka portre çoğalması ve ortak arka plan bastırma.|
|4|Elenme sınıfı/oyun durumu ile kişiyi gizleme; Kim Gitsin’in önceki eleme akışı korunur.|
|5|Ortak Oyunu yenile düğmesi korunur.|
|6|Bilgisayar paketi fotoğrafı ve yan/çapraz hareket görünümü.|
|7|Sadece Beyaz giriş görseli, yer değişimi, soru paneli, yanlış cevapta sarı buton ve 7. soruda yakını korunur; kol hareketi eklenir.|
|8|Sunucuya dönük düzen korunur; kalabalık sahne çeşitliliği kaldırılmaz.|
|9|Görünüm/cinsiyet/yaş/tesettür seçenekleri korunur, alternatif beden dosyası yolu onarılır.|
|10|Eyvah Düşüyorum sohbet ve belirsiz kapak süresi korunur; ortak düşme bedeni tepkileri geliştirilir.|
|11|3’te 3 isim yerleşimi korunur, ortak isim şeridi eklenir.|
|12|Kumbara küçük masa ve alfabesiz sahne korunur.|
|13|Gönder Gitsin takım arkadaşı kimliği ve isimleri korunur.|
|14|50 Sarışın kategori havuzu korunur.|
|15|Milyonluk Resim 12 ek soru ve görülmemiş fotoğraf önceliği.|
|16|Cevap Sende ön yazı temizliği korunur.|
|17|Islak kıyafet yazılımsal görüntüleyiciye de uygulanır, düşme dengesi geliştirilir; final beklemesi korunur.|
|18|Uyumlu beş bankaya 48 soru ve biçim tekrarını azaltan ortak seçim.|
|19|Tekrarsız tüp, geri dönüş diyaloğu ve aşama bazlı yayın süresi.|
|20|Arkandayız ayakta grup ve orta buton korunur.|
|21|Bir Kelime Bir İşlem puan/isim okunurluğu korunur.|
|22|Passaparola küçültülmüş masa korunur.|
|23|Kelime Oyunu butona uzanma eklenir; bekleyen dört kişi korunur.|
|24|Lingo sahne düzeni korunur.|
|25|Password sonlu kart dağıtma/kol ve buzzer hareketleri; mevcut yarı final/final motoru korunur.|
|26|Yemekteyiz masada yeme ve fotoğraf dokulu hazırlama elleri; önceki oturma/soğan hızı/servis akışı korunur.|
|27|MasterChef beyaz/kırmızı/mavi önlükler korunur.|
|28|Survivor 20 referans yüzlü tam beden; kendin/yarışmacı seçimi korunur.|
|29|Yüzlerden ayrılmış ortak isim şeridi.|
|30|Saba koltuk oturma ve ünlü kadro düzeltmeleri korunur.|
|31|Şanslı Masa seçilen kişinin tam beden görünümü onarılır.|
|32|O Ses ters başlayan koltuklar ve butonla dönüş korunur.|
|33|İşte Benim Stilim karşılıklı dikey diziliş korunur.|
|34|İzdivaç bekleyen kişi/ayırıcı düzeni korunur.|
|35|Piramit üçgen üst başlığı korunur.|
|36|Kızlar ve Anneleri ayrı seçilen kimlikleri korunur.|
|37|İlk Buluşma seçilen kişinin tam beden görünümü onarılır.|
|38|Yaparsın Aşkım isimleri için ortak şerit.|
|39|Şahane Pazar fotoğraf dokulu beden animasyonu.|
|40|Çember yürüyen kişinin atlas kırpma hatası düzeltilir; önceki konum hareketleri korunur.|
|41|Konuşana dönük oturma düzenleri korunur, kimlik/isim örtüşmeleri düzeltilir.|
|42|Göz6 iki basamaklı 6+6 kadro korunur.|
|43|Evim Şahane üniformalı ekip ve iş bölgesi akışı korunur; gerçekçi tutuşlu alet eklenir.|
|44|Kızma Kazan yerleştirme/sıralama, Para Bende hafızadan tekerleme, Evim Şahane gerçekçi alet tutuşları.|

## Doğrulama ve sınırlar

- Yeni testler: `tests/refinements508.cjs`, `tests/trust508.cjs`, `tests/queue508.cjs`.
- Geçen ilgili önceki testler: profile503, difficulty427, renovation499, sunday506, million444.
- 160 profil/poz/görünüm eşleşmesi, 100 eklem çözümü, 60 cinsiyet/yaş çifti × 5 yüzleşme aşaması, kayıt kimliği ve mola/süre kontrolü.
- Değişen JavaScript dosyalarının sözdizimi ve `git diff --check` denetlendi. Ayrıntı: `research/revision508/syntax.json`.
- Tarayıcıda Şanslı Masa kayıt dönüşü/Elif tam bedeni, Kelime Oyunu buton pozu, Survivor Turabi seçimi/parkur, Kızma Kazan görev ilerlemesi denendi. Her oyunun her finali tarayıcıda baştan sona oynanmış değildir.
- Bunlar fotoğraf dokulu **iki boyutlu** beden canlandırmalarıdır. Her yöne dönen tam üç boyutlu insanlar, kamera kaydı, gerçek kas/giysi/su fiziği veya televizyon programının birebir simülasyonu değildir. Yan/çapraz hareket de bu iki boyutlu sahneye uygun görsel yaklaşımdır.
- Yeni Survivor bedenleri ve el/aletler yapay zekâ üretimidir; referans fotoğraflarından yararlanılmıştır. Gerçek kişilerin sahnede çekilmiş görüntüleri oldukları iddia edilmez.
- Önceki v85’in bilinen eski test başarısızlıkları bu sürümde topluca yeniden yazılmadı; bu rapor yalnızca yukarıdaki ilgili geçen kontrolleri kapsar.

## Yeni görsel varlıkların kaydı

Görseller built-in imagegen ile üretildi. Kod içinde SVG yeniden çizimi yerine WebP alfa dokuları kullanıldı. Yalnızca kayıpsız alfa koruyan format dönüşümü/kırpma sınırı ölçümü yapıldı.

- `dist/humans435/lucky-seated508.webp` — altı referans kişinin oturan bedeni. Üretim açıklaması: `research/revision508/lucky-image-prompt.txt`.
- `dist/assets/gaming-pack508.webp` — bilgisayar, monitör, klavye ve fare ürün çekimi.
- `dist/games/ada-mucadelesi/assets/cast-bodies508-*.webp` — 20 Survivor bedeni. Promptlar, kaynaklar ve doğrulama: `research/survivor508-prompts.json`, `research/survivor508-validation.json`.
- `dist/humans435/hands-tools508.webp` — altı el/alet hücresi. Prompt ve orijinal: `research/revision508/hands508-prompt.txt`, `hands-tools508-original.png`.

- `dist/assets/task-props508.webp`: Kızma Kazan sürükleme görevlerinde kullanılan dokuz gerçekçi eşya. Üretim kaydı: `research/revision508/task-props508-prompt.txt`.
