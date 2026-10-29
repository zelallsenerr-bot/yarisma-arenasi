# Kelime Oyunu — oturma düzeni
image(20261025-173911).png ve kullanıcının açık talebi esas alındı. Önde sunucu ve aktif yarışmacı birlikte oturacak şekilde, beyaz masa ve kırmızı düğmeyle; arkada dört bekleme koltuğu, mavi/mor dekor ve ahşap tonlu zemin oluşturuldu. Oturan bedenler CSS ile, yüzler mevcut görsellerle oluşturulur; 2B sahnedir. Fotoğraf arka plan olarak eklenmedi. Sunucu mevcut İbrahim Selim görselidir.

Rakipli modda arka sırada mevcut dört bilgisayar rakibi gösterilir. Tek kişilik/iki kişilik modda dört kişi yalnız dekoratiftir; yeni oyuncu, tur veya puan eklenmedi. Aktif yarışmacı adı mevcut oturumdan alınır. Sahnedeki kırmızı düğme dekoratiftir; gerçek BULDUM, harf ve cevap kontrolleri korunur.

Değişen: dist/games/kelime-meydani/index.html ve app.js.
app.js'e yalnız salt okunur sunum erişimi için window.KelimePlatformStateV67=()=>s eklendi; oyun motoru ve kuralları değiştirilmedi.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Ortak kişi/sunucu dosyaları korunmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip; kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html ve app.js karşılaştırma için baslangic/ altında; siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin. Başlangıç dosya özetleri eşleşiyorsa dist/ içindeki dört dosyayı aynı yollarına uygulayın. Mevcut HTML/app.js daha yeni ise başlangıç kopyalarına göre üç yönlü karşılaştırıp birleştirin. Diğer oyun paketleri etkilenmez.

Kontrol: İki JavaScript dosyasının sözdizimi kontrolü geçti. Yerel tarayıcıda sunucu, aktif yarışmacı, dört rakip, ilk soru ve BULDUM/harf/pas kontrolleri doğrulandı. Tam on dört soru, iki kişilik geçiş ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
