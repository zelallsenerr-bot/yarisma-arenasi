# Milyonluk Resim platformu
Kullanıcının düzelttiği son talep ve image(20261025-171009).png referansı esas alındı. Önceki mesajdaki 50 kadın ve Mehmet Ali Erbil tarifi uygulanmadı. Altın çerçeveli büyük resim ekranı, önünde iki yüksek koltuk, yarışmacı ve Selçuk Yöntem, mavi spot ışıklı zemin kodla oluşturuldu. Bu 2B bir stüdyo görünümüdür; fotoğraf arka plan olarak eklenmedi.

Büyük ekran yalnızca mevcut görünür #photo200 öğesindeki fotoğrafı ve alternatif metnini kopyalar. Soru açılmadan fotoğrafın cevabını gösteren ek metin üretilmez. Fotoğraf olmayan ekranlarda program tabelası gösterilir. Orijinal fotoğraf ve soru kontrolleri korunur; oyuncu adı mevcut oyun durumundan alınır. Motor, 12 soru, süre, joker ve para kuralları değişmedi.

Değişen: dist/games/milyonluk-resim/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Ortak kişi/sunucu ve fotoğraf dosyaları mevcut projede korunmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında, siteye kopyalanmaz. Önceki Milyonluk Resim paketi yoktur; bu ilk pakettir.

Uygulama: Projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasına göre üç yönlü karşılaştırıp birleştirin. Diğer oyun paketleri etkilenmez.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda Selçuk Yöntem/yarışmacı, başlangıç ve resim önizleme ekranına geçiş, görünür oyun fotoğrafının büyük ekrana yansıması doğrulandı. Tam 12 soru ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
