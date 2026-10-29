# Para Odası platformu
image(20261025-172627).png referansına göre solda üç yarışmacı kürsüsü, ortada büyük Para Odası ekranı, sağda sunucu kürsüsü, beyaz/mavi ışıklı zemin ve pembe yan paneller kodla oluşturuldu. Fotoğraf arka plan olarak eklenmedi; 2B görünüm kullanılır. Sunucu mevcut oyundaki Ahmet Çakar görselidir; referans için sunucu kimliği değiştirilmedi.

Kürsülerdeki adlar ve kasalar mevcut canlı oyuncu tablosundan alınır. Tur kazananı mevcut active sınıfına göre vurgulanır. Orijinal sayısal tahmin, aile kutusu ve final kontrolleri korunur. Oyun motoru, üç takım, süre, kura ve para kuralları değişmedi.

Değişen: dist/games/para-odasi/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Paylaşılan retro400-c motoru ve ortak kişi/sunucu dosyaları korunmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip; kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında; siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasına göre üç yönlü karşılaştırıp birleştirin. Diğer oyun paketleri etkilenmez.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda üç oyuncu ve kasaları, sunucu ve oyun hazırlık ekranı doğrulandı. Tam kutu/final turu ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
