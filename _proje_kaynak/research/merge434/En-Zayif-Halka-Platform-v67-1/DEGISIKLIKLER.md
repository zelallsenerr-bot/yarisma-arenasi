# En Zayıf Halka platformu
Kullanıcının image(8).png referansına göre yarım dairede mavi ekranlı yarışmacı kürsüleri, merkezde yuvarlak sunucu alanı ve mavi ışıklı zemin kodla oluşturuldu. Fotoğraf arka plan olarak eklenmedi. Oyunun mevcut dokuz kişilik kadrosu korundu. Kadro adları, portreler, doğru/yanlış sayıları ve elenme durumu mevcut kadro DOM'undan alınır. Sırası gelen kişi altın renkle vurgulanır; elenenler soluklaştırılır. Sunucu oyundaki mevcut Baybars Altuntaş görselidir.

Kadronun bulunduğu ekranlarda platform görünür. Kadro bulunmayan mola/sonuç ekranlarında kaldırılır. Oyun motoru, banka ve zincir hesabı, oylama ve süre kuralları değişmedi.

Değişen: dist/games/halka-mucadelesi/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Ortak kişi/sunucu dosyaları korunmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında, siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasıyla üç yönlü karşılaştırarak birleştirin. Önceki oyun ZIP'leriyle dosya çakışması yoktur.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda dokuz yarışmacı ve sunucu, tur başlangıcı, banka/zincir karar ekranına geçiş doğrulandı. Tam eleme/final ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
