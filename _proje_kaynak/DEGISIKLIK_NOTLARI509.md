# Beyaz’la Joker — düzeltme 509

Kullanıcının iki ekran görüntüsünde bildirdiği yakın kamera, sandalye hiza, sürekli kol hareketi, her yanlışta sarı buton, belirsiz cevap sonucu ve büyük yakın sorunları düzeltildi.

- Geniş ve hafif yükseltilmiş yeni stüdyo kamerası. Aynı dekorun daha çok zemin/ışık/çevre gösteren görünümü.
- Sunucu ve yarışmacı arka plandaki gerçek iki sandalyeye hizalı. Ek CSS sandalyesi oluşturulmaz. Sahneye genel beden/kol otomasyonu müdahale etmez.
- Beyaz normalde elleri kucağında sabit oturur. Destek verildiğinde yalnızca 1,25 saniye butona basma pozu; sonra nötr poza döner. Ortak sürekli IK uzanması bu oyundan kaldırıldı.
- Sarı destek yarışma boyunca **bir defa**. Üçten az joker kaldığında yanlış cevap/süre dolması üzerine 1,7 saniye sonuç gösterildikten sonra devreye girer. Hak kayıt dosyasında saklanır; yeniden yükleyince sıfırlanmaz.
- Diğer yanlışlarda en fazla üç joker silinir. Eksik joker kadar ödül basamağı düşülür; bu düşüş sıfıra ulaştırırsa oyun biter. Sarı hak sonradan yeniden verilmez. Bu destek davranışı kullanıcının talebine göre mobil oyun için uygulanmıştır; televizyonun resmî kuralı olduğu iddia edilmez.
- İşaretlenen yanlış kırmızı, doğru seçenek yeşil ve açık etiketli. Genel temanın bu renkleri bastırması düzeltildi. Doğru/yanlış sonucu kendiliğinden kaybolmaz: kullanıcı Sonraki soru / Sonucu gör düğmesine basar.
- Yedinci soruda yakın aynı geniş kamera ölçeğinde, yarışmacının yanında ayakta. Sahne içindeki SORU 7 ve soru metni yazan büyük panel tamamen kaldırıldı. Sorular normal oyun alanında durur.

## Kontroller

`node tests/joker509.cjs`: normal joker cezası, tek destek, kayıt yükleme, yanlış/doğru/süre dolması, mola, elenme, sonucu elle ilerletme ve sürekli kol hareketinin kaldırılması geçti.

Tarayıcıda: iki normal yanlış (7→4→1 joker), üçüncü yanlışta tek destek, kayıt dönüşünde hakkın kullanılmış kalması, kırmızı/yeşil renkler ve sonuç bekleme doğrulandı. Ayrı yerel test kaydıyla yedinci soru yakını/sandalye/panelsiz sahne incelendi; ardından önceki test kaydı geri getirildi. Test hazırlama sayfası dağıtıma dahil edilmedi.

## Görseller

Built-in imagegen, referanslı düzenleme. `studio-wide509.webp`: mevcut boş stüdyo referansından uzak ve yaklaşık 18° yüksek kamera; iki mevcut sandalye ve küçük masa, aynı altın dekor, insan ve soru paneli yok. `beyaz-poses509.webp`: mevcut Beyaz referansının yüzünü/giysisini koruyan iki şeffaf beden pozu; nötr kucakta eller ve tek buton basma. Yeni görseller fotoğraf dokulu AI canlandırmalarıdır.

Kaydedilen dosyalar: `dist/games/beyazla-joker/studio-wide509.webp`, `dist/games/beyazla-joker/beyaz-poses509.webp`. Orijinaller: `exec-78764f54-3835-4123-a9c1-bb67522f7537.png`, `exec-63f22ee4-e87f-46f0-93b2-139844ad9a9a.png`. WebP dönüşümü dışında semantik görüntü düzenlemesi yapılmadı.
