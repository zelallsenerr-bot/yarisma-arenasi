# Şans Kapıda — ev salonu
image(20261025-172817).png referansına ve kullanıcının oturma talebine göre solda tekli koltukta Yiğit Alıcı, sağdaki kanepede yarışmacı ile iki dekoratif aile üyesi, ortada sehpa, çanta/vazo ve arkada duvar dekoru oluşturuldu. Fotoğraf arka plan olarak eklenmedi. Oturan bedenler CSS ile, yüzler mevcut sunucu/kişi görselleriyle oluşturuldu; hareketli oturma animasyonu değildir.

Oyuncu adı mevcut oyun durumundan alınır. İki aile üyesi yalnız dekoratiftir; yeni oyuncu veya yardım hakkı eklenmedi. Mevcut oyun kontrolleri salonun altında korunur. Soru, takas, pazarlık, süre ve para kuralları değişmedi.

Değişen: dist/games/sans-kapida/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel ev platformu betiği çağrılır. Paylaşılan retro400-c motoru ve ortak kişi/sunucu dosyaları korunmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında; siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasına göre üç yönlü karşılaştırıp birleştirin. Diğer oyun paketleri etkilenmez.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda Yiğit Alıcı, yarışmacı, iki aile üyesi ve oyun hazırlık ekranı doğrulandı. Tam beş etap ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
