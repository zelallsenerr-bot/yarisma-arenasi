# Ali İhsan Varol ile Kumbara — platform
Kullanıcının image(7).png referansına göre beyaz oval masa, karşılıklı koltuklar, solda Ali İhsan Varol, sağda yarışmacı, turkuaz/turuncu dekor, harf panelleri, Kumbara tabelası ve ışıklı zemin oluşturuldu. Fotoğraf arka plan olarak eklenmedi; kodla oluşturulan 2B stüdyo görünümüdür. Ortak sunucu ve kişi görselleri kullanılır; oyuncu adı mevcut Kumbara durumundan alınır.

Değişen: dist/games/kumbara/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Mevcut ortak kişi/sunucu dosyaları korunmalıdır. Oyun motoru, etaplar, süreler ve para kuralları değiştirilmedi.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında; siteye kopyalanmaz.

Uygulama: Mevcut projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasına göre üç yönlü birleştirin. Önceki oyun ZIP'leriyle dosya çakışması yoktur.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda ad girişi, hazırlık, sunucu/oyuncu kimlikleri, ilk soruya geçiş, iki cevap seçeneği, etap hedefi ve süre görünümü doğrulandı. Tam beş etap ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
