# Çifte Milyon platformu
Kullanıcının image(10).png referansına göre önde dört şeffaf A/B/C/D silindiri, arkada çiftin portreleri ve para masası, sağda İlker Ayrık ve kasa, büyük 2.000.000 TL ekranı ve mavi/altın stüdyo kodla oluşturuldu. Fotoğraf arka plan olarak eklenmedi; kodla oluşturulan 2B görünüm kullanılır.

Çiftin isimleri mevcut oyun durumundan alınır. Silindir tutarları s.allocation değerinden, açılma görseli mevcut açılmış kapak listesinden okunur. Bu üst platform sunum amaçlıdır; para yerleştirme ve cevap işlemleri mevcut oyun kontrollerinden yapılır. Eleme sırasında silindirler 0 TL gösterir. Oyun motoru, para kaybı/dağıtımı, eleme ve süre kuralları değişmedi.

Değişen: dist/games/cifte-milyon/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Ortak kişi/sunucu görselleri korunmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip; kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında, siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin. Başlangıç dosya özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasına göre üç yönlü karşılaştırıp birleştirin. Önceki oyun ZIP'leriyle dosya çakışması yoktur.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda eleme başlangıcında çift isimleri, İlker Ayrık, dört silindir ve mevcut eleme düğmesi doğrulandı. Tam eleme/para dağıtımı ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
