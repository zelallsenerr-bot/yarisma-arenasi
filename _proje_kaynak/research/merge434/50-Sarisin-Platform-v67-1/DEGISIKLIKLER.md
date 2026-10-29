# 50 Sarışın platformu
Kullanıcının referansı ve açık konum talebine göre solda yarışmacı ile Mehmet Ali Erbil, sağda basamaklı alanda tam 50 sarışın kadın gösterilir. En üstte 1 numara; altında yedişer kişilik yedi sıra bulunur. Mavi/turkuaz/mor ışıklar ve solda dairesel zemin kodla oluşturuldu. Fotoğraf arka plan olarak eklenmedi.

Mevcut assets/contestant-00.webp ile contestant-49.webp arasındaki 50 farklı portre kullanılır. Yeni fotoğraf veya rakip üretilmedi. Numaralar, adlar ve elenme/cevap durumları canlı s.players verisinden alınır. Elenenler soluk gösterilir; doğru/yanlış etiketleri renklenir. Sağdaki her kişi görseldir; seçim işlemleri mevcut orijinal oyun kontrollerinden yapılır. Mevcut oyun kuralları ve kadro alanı korunur.

Değişen: dist/games/elli-sarisin/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Oyunun mevcut 50 portresi ve ortak sunucu/kişi dosyaları mevcut projede korunmalıdır; değişmedikleri için ZIP içinde bulunmazlar.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip; kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında; siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasına göre üç yönlü birleştirin. Önceki oyun ZIP'leriyle dosya çakışması yoktur.

Kontrol: JavaScript sözdizimi ve 50 portre dosyasının varlığı doğrulandı. Yerel tarayıcıda Mehmet Ali Erbil, oyuncu ve 1–50 numaralı elli kadın portresinin tamamı, ayrıca mevcut kategori seçim ekranı görüldü. Tam eleme/final ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
