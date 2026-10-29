# Ben Bilirim platformu
Kullanıcının image(5).png görseli esas alınarak mavi/turuncu stüdyo, üstte ışıklı halka, solda dört yarışmacı kürsüsü ve sağda Alper Ateş kürsüsü kodla oluşturuldu. Fotoğraf arka plan olarak eklenmedi. Mevcut kişi atlasları ve sunucu görseli kullanıldı. Yarışmacı adları, puanlar, aktif cevap sırası ve elenme durumu oyunun mevcut puan tablosundan alınır. Her oyun ekranı yenilenişinde platform yeniden güncellenir. Eski puan tablosu da korunur.

Değişen: dist/games/ben-bilirim/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Kişi/sunucu dosyaları mevcut projede korunmalıdır. Oyun motoru, süreler, harf tablosu ve puan kuralları değişmedi.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında, siteye kopyalanmaz.

Uygulama: Mevcut projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Daha yeni HTML değişiklikleri varsa başlangıç dosyasına göre üç yönlü birleştirin. Önceki oyun ZIP'lerinden bağımsız uygulanabilir.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda ad girişi, dört yarışmacı adı/puanı, Alper Ateş, harf seçimi ve soru/cevap ekranına geçiş doğrulandı. Tam final turu ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
