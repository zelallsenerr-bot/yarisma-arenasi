# Arkandayız platformu
İlk referans image(20261025-171945).png genel stüdyo, ikinci referans image(20261025-171953).png yarışmacı/arkadaş yerleşimi için kullanıldı. Yarışmacı öndeki yuvarlak alanda, arkadaşları arkasındaki yükseltilmiş uzun masada, Ünal Yeter sol yanda yer alır. İki yanda merdiven ve dekoratif seyirci siluetleri, mor/turkuaz ışıklar ve Arkandayız tabelası kodla oluşturuldu. Fotoğraflar arka plan olarak eklenmedi; 2B stüdyo görünümüdür.

Mevcut uyarlamada ana yarışmacı + üç arkadaş vardır. Referanstaki kişi sayısı için motor değiştirilmedi; mevcut üç arkadaşın kimlikleri kullanıldı. Takım adları mevcut oyun durumundan alınır. Orijinal arkadaş önerileri ve Normal/İki kat kontrolleri korunur. Motor, soru, bahis, süre ve kasa kuralları değişmedi.

Değişen: dist/games/arkandayiz/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Paylaşılan retro400-b motoru ve ortak kişi/sunucu dosyaları korunmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip; kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında; siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasına göre üç yönlü karşılaştırıp birleştirin. Diğer oyun paketleri etkilenmez.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda önde oyuncu, arkasında üç arkadaş, Ünal Yeter, mevcut soru ve destek/iddia seçenekleri doğrulandı. Son dekoratif seyirci siluetleri statik olarak kontrol edildi. Tam sekiz soru ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
