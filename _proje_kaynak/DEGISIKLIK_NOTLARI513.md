# Son dokuz istek — 513

Temel: mevcut önizleme projesi, kayıtlı sürüm 90. Eski work513 klasörü bulunamadı; bu uygulama kullanıcının yeniden gönderdiği dokuz madde ve üç durum ekranından yeniden hazırlandı.

1. Eyvah ve ortak düşme görüntüleyicisi: tüm mevcut yarışmacılar ve sunucu geniş kadrajda; yalnız seçili kapak ve üzerindeki beden düşer. Son sorunun metni, cevabı ve varsa açıklamasıyla devam eden sohbet. Eyvah ana sahnesinde eşit açılı on konum. Aynı kimlikli standing.webp atlasındaki sekiz kişiye şeffaf korku/irkilme pozları eklendi. Diğer kimliklerde yüz değiştirilmez; mevcut beden dokusu eklem hareketiyle kullanılır. Bu nedenle her özel görünüm için yeni korku yüzü tamamlanmış değildir.
2. Gönder Gitsin: iki yarışmacı yakın, yan yana; tek masa arkalarında değil önlerinde. Son yüksek öncelikli eski CSS konumları da düzeltildi.
3. Arkandayız: arkada tek sırada beş küçük destekçi, önde lider; SVG boyutu kendi kutusuna sınırlandı. Tarayıcıda doğrulandı.
4. Beyaz'la Joker: yedinci sorudaki yakın kişinin sahnedeki bedeni ve karttaki portresi aynı çözümlenmiş görselden. Yarışmacı sola, yakını hemen soluna alındı.
5. O Ses: oyun motorunun indeksleri korunarak yeni dönen koç önce 650 ms kolunu gerçek buton konumuna uzatır, ardından koltuk/kişi dönüşü başlar. İsim koltuk arkasında. Yeni basma pozu üretimi başarısız olduğundan mevcut bedenin iki eklemli kol hareketi kullanılır.
6. Piramit: üçgendeki başlık küçültüldü; altta ortalanıp taşması sınırlandı.
7. Şahane Pazar: reddedilen dekoratif Belediye Çukuru kapakları kaldırıldı; sade zemin, sunucular ve yarışmacı korundu. Oyun kuralları değiştirilmedi.
8. Çember: ayakların dış sınıra taşmaması için içe alınan konumlar, küçük isimler, daha temiz ışıklı çember.
9. Para Bende: sunucular kendi kutularıyla sınırlandı; yükseklik %25, genişlik %8; uzaktan daha küçük figürler.

## Doğrulama
Değişen JS sözdizimleri; requests513, eyvah510, joker509, crowds511, events511, stage510 testleri geçti. Arkandayız ve Gönder Gitsin gerçek sayfaları tarayıcıda incelendi. Geniş düşme sahnesi yerel kontrol sayfasında incelendi; kontrol sayfası dağıtım dışındadır. Tüm telefon boyutları ve bütün oyun turları tek tek denenmedi.

## Görsel üretimi
Built-in imagegen, identity-preserve düzenlemesi. Kaynak dist/humans435/standing.webp, çıktı dist/humans435/fear513.webp. İstek: aynı sekiz kişi, aynı yüz/saç/kıyafet/ayakkabı ve sıra; 4x2 şeffaf atlas; gözler açık, doğal korku ifadesi, eller cepten çıkmış ve parmaklar açık, hafif bükülü dizler; dekor/yazı/ek kişi yok. Alfa korundu. Yeni korku pozları yalnız kaynak kimlik eşleşince kullanılır.
