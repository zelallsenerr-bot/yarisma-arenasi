# 19 yarışması platformu
Kullanıcının image(9).png referansı esas alınarak merkezde Barış Kılıç ve ışıklı beyaz kürsü, çevrede yarışmacı masaları, mavi/kırmızı yatay ışıklar ve radyal zemin oluşturuldu. Fotoğraf arka plan olarak eklenmedi; kodla oluşturulan 2B stüdyo görünümüdür. Mevcut iki ana yarışmacı ve beş adayın toplam yedi kürsüsü korunur; adlar, portreler ve puanlar canlı oyun DOM'undan alınır. Menü/mola gibi kadro bulunmayan ekranlarda platform kaldırılır. Mevcut puan/kadro ekranları da korunur.

Değişen: dist/games/on-dokuz/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Ortak kişi/sunucu dosyaları mevcut projede korunmalıdır. Oyun motoru, 19 kutu, süre, joker ve puan kuralları değiştirilmedi.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında, siteye kopyalanmaz.

Uygulama: Mevcut projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasıyla üç yönlü karşılaştırarak birleştirin. Önceki oyun ZIP'leriyle dosya çakışması yoktur.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda sunucu, iki ana yarışmacı ve beş adayın adı/puanı, açılış ve 19 kutu seçim ekranına geçiş doğrulandı. Tam 19 soru ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
