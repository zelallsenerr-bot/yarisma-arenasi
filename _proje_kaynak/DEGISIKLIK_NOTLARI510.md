# Düzeltme 510 — beş görsel/akış isteği

Temel: yayımlanan v87. Bu çalışma aşağıdaki son beş istekle sınırlıdır.

1. **Eyvah Düşüyorum ve diğer kapak oyunları:** dikey kuyu/yukarıda asılı duran kişi yakın çekimi kaldırıldı. Kapak öncesi vedalaşma ve teşekkür cümleleri yerine sekiz satırlık üç gündelik sohbet dizisi var. Kapak sohbetin 6,2–13,6 saniye aralığındaki farklı bir anında açılır; sayaç veya bitiş repliği gösterilmez. Kapak 0,22 saniyede açılır; beden irkilip kollarını/bacaklarını hafifçe açarak aynı kapağın içine aşağı iner. Eyvah, Kendi Düşen Ağlamaz ve Cevap Sende’nin insan düşen karelerinde aynı temiz 2D görüntüleyici kullanılır. Yazılımsal 3D çizicinin parçaladığı gövde/kol/bacak görüntüsü bu karelerde kullanılmaz. Diğer oyun aşamaları ve mevcut ana platformlar korunur. Hareket, aynı kişinin fotoğraf dokusunu bütün olarak esnetir; yüz/beden kimliği farklı bir kişiyle değiştirilmez. Gerçek fizik simülasyonu veya yeni yüz ifadesi videosu değildir.
2. **3’te 3:** Pelin Çift etiketi karakterin üstünde, koyu zemin/beyaz kalın yazı ve altın kenarlıkla netleştirildi. Sol alttaki ortak kişi şeridi kaldırıldı.
3. **Gönder Gitsin:** takım arkadaşları yan yana, aynı masanın arkasında; sunucu ayrı konumda. İsimler kendi konumlarında kalır, sol alt ortak şerit yoktur.
4. **50 Sarışın:** yedişer kişilik yedi basamak ve en üstte tek kişi düzeni korunup görünür basamak kenarları ve her kişinin kendi numarası geri getirildi. Numara etiketleri tek bir alt şeride taşınmaz. Elenenin numarası kırmızı/× olarak görünür; bedeni silikleşir. Numaranın bedeni örtmemesi için görsel yüksekliği etikete yer bırakır.
5. **Cevap Sende:** kullanıcının yedinci görselindeki lacivert arka ekran, oval ışıklı zemin ve karşılıklı iki kişi düzeni uygulandı. Anıl İlter’in gerçek ATV program fotoğrafındaki merkez sunucu referans alınarak yüksek çözünürlüklü ve şeffaf tam beden üretildi. Bu aynı beden hem platformda hem oyun içi kapak sahnesinde kullanılır. Önceki düşük kaliteli siluet kesimi ve farklı sunucu bedeni kullanılmaz.

**Bütün oyunlar:** `scene-names508` adlı ortak sol alt isim/numara şeridini oluşturan kod kaldırıldı. Bu şerit için yerel etiketleri gizleyen kural da kaldırıldı; yarışmaya özgü kürsü numaraları ve yerel ad etiketleri korunur.

## Kontroller

- `tests/stage510.cjs`: ortak şerit oluşturulmaması, yerel etiketlerin gizlenmemesi, 1+7×7 ayrı istasyon, Anıl kimliği ve görsel sınırları, üç kapak oyunu için kapalı/açık/düşme zamanları.
- `tests/eyvah510.cjs`: merkez ve rakip düşüşü, doğru kişi, sonuç geri çağrıları, rastgele sohbet süresi, kaldırılmış kuyu/veda katmanı.
- `tests/fall510-scene.mjs`: sonlu eklemler, kol/bacak açılması, düşüş yönü ve eski su oyunu zamanlarının korunması.
- `tests/cevap201.cjs`, `tests/fifty195.cjs`, `tests/joker509.cjs` geçti.
- Eski `water209-scene.mjs` testi mevcut canvas taklidinde `ellipse` bulunmadığı için çalışmıyor. Bu testteki iddialar sessizce değiştirilmedi; ilgili beden/zaman kontrolü gerekli canvas yöntemlerini tanımlayan yeni testle yapıldı.
- Tarayıcı: 3’te 3 etiket kontrastı, 50 Sarışın sıra/numara düzeni, Cevap Sende ana platformu ve yerel kapak görüntüsü; Eyvah düşüş anı ayrı yerel kontrol sayfasıyla incelendi. Geçici kontrol sayfası dağıtımın dışında tutuldu.

## Görsel kaydı ve referanslar

ATV resmî galeri: https://www.atv.com.tr/cevap-sende/galeri/1-bolum-fotogaleri-448072529603
Program/sunucu doğrulaması: https://www.atv.com.tr/cevap-sende/hakkinda

`dist/games/cevap-sende/anil-standing510.webp` built-in imagegen ile üretildi. Referans: `dist/assets/programmes403/cevap-sende.jpg` içindeki ortadaki mor ceketli Anıl İlter. İstek: yalnızca bu kişinin yüzü/saçı/vücut oranları ve program giysisini koru; baştan ayakkabıya tam beden, doğal sunucu pozu, yarışmacıya dönük bakış, şeffaf arka plan, başka insan/dekor/yazı yok. Üretilen orijinal: `exec-1d1911ff-79fe-4af2-b5dd-1dc7eaf408d2.png`; alfa korunarak WebP’ye dönüştürüldü. Bu bir referanslı AI canlandırmasıdır, orijinal canlı çekim değildir.
