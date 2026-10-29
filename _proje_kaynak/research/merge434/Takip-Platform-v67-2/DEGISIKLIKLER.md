# Takip platformu — düzeltme 2
Bu paket Takip-Platform-v67-1.zip'in YERİNE GEÇER. İkisini arka arkaya uygulamak gerekmez; bu paket v67 kaynaklarının üzerine tek başına uygulanabilir. v1 zaten uygulandıysa aynı dört dosyayı v2 ile güncelleyin; başka yeni değişiklik varsa önce karşılaştırın.

Kullanıcının yeni referansı image(20261025-170914).png esas alındı. Solda üç yarışmacı ortak dikdörtgen kürsüde, ortada Uraz Kaygılaroğlu, sağda yüksek koltukta Muhsin Divan var. v1'in ortadaki ayrı yarışmacı portresi ve dairesel merkez platformu kaldırıldı. Takım portreleri dikdörtgen çerçeveye alındı. Sunucuda mevcut ayakta figür varsa o kullanılır; yoksa mevcut portreye dönülür. Fotoğraf bütünü arka plan değildir; takipçi referanstan SVG çerçevesi ile gösterilir.

Oyun motoru, soru, süre, para ve final kuralları değiştirilmedi.
Değişen/eklenen: dist/games/takip/index.html, platform.js, platform.css, platform-reference.png.
Ortak dosya değişikliği YOK. Oyun HTML dosyasında yerel platform betiği kullanılır; ortak kişi/sunucu/poz varlıkları korunmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip ve önceki Takip-Platform-v67-1.zip. Kesin dosya özetleri BASLANGIC_SURUMU.json içinde. baslangic/ ve onceki_v1/ klasörleri karşılaştırma içindir; siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin; dist/ içindeki dört dosyayı aynı yollarına uygulayın. Daha yeni HTML/kod değişikliği varsa ilgili başlangıç kopyasına göre üç yönlü birleştirin. Diğer oyun paketleri etkilenmez.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda üç kişilik takım, tek sunucu ve takipçi görünümü ile hız etabı başlangıcı doğrulandı. Son ayakta figür seçimi statik olarak kontrol edildi. Tam final ve fiziksel telefon/Android testi yapılmadı. Site yayımlanmadı.
