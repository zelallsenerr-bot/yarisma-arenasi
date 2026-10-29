# Cevap Soruda platformu
Kullanıcının image(2).png görseli sabit stüdyo platformu olarak eklendi. Mavi paneller, solda sunucu ve sağda dört yarışmacı kürsüsü fotoğraftaki şekliyle korunur. Bu bir fotoğraf görünümüdür; kişiler hareketli değildir ve 3B sahne değildir. Tam görsel kırpılmadan ekran genişliğine uyarlanır.

Değişen: dist/games/cevap-soruda/index.html.
Eklenen: aynı klasörde platform.js, platform.css, platform-reference.png.
Ortak dosya değişikliği: YOK. Ortak integration.js dosyası korunur; yalnızca bu oyundaki çağrısı yerel platform betiğiyle değiştirilir. Soru/puan/etap motorları korunmuştur.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Kesin SHA256 değerleri BASLANGIC_SURUMU.json içindedir. Başlangıç index.html karşılaştırma için baslangic/ içindedir; siteye kopyalanmaz.

Uygulama: Mevcut projeyi yedekleyin. Başlangıç dosya özeti eşleşiyorsa dist/ içindeki dört dosyayı aynı yollara kopyalayın. Daha yeni değişiklik varsa başlangıç index.html ile üç yönlü birleştirin. Bu ZIP sadece Cevap Soruda içindir; önceki Beyaz’la Joker ZIP’inden bağımsız uygulanabilir.

Kontroller: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda ad girişi, kürsüye geçiş, açılış konuşması, ilk soru ve cevap alanı doğrulandı. Platform görünümü bu ekranlarda mevcut. Telefon/Android testi yapılmadı. Site yayımlanmadı.
