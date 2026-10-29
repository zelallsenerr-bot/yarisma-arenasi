# Bir Kelime Bir İşlem platformu
image(20261025-173341).png ve kullanıcının konum tarifine göre yarışmacılar solda, sunucu ortadaki ayrı kürsüde, dekoratif kelime/işlem uzman masası sağda yer alır. Ortada yeşil ışıklı uzun zemin, yeşil/mavi kürsüler ve turuncu çerçeveli stüdyo kodla oluşturuldu. Fotoğraf arka plan olarak eklenmedi; 2B görünüm kullanılır.

Kürsü sayısı, adlar ve puanlar mevcut oyun tablosundan alınır; iki kişilik modda da uyarlanır. Sunucuda mevcut oyunun Levent Ülgen görseli korunur. Sağdaki iki uzman portresi dekoratiftir, yeni yardım/cevap mekanizması eklenmez. Kelime/sayı motoru, süre, sıra ve puan kuralları değiştirilmedi.

Değişen: dist/games/kelime-islem/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Ortak kişi/sunucu dosyaları korunmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip; kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında; siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasına göre üç yönlü karşılaştırıp birleştirin. Diğer oyun paketleri etkilenmez.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda solda üç oyuncu adı/puanı, ortada sunucu, sağda iki uzman ve ilk kelime turu hazırlığı doğrulandı. Tam on tur, iki kişilik mod ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
