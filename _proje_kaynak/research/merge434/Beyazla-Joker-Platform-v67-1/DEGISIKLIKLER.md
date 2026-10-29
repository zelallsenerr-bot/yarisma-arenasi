# Beyaz’la Joker platform düzenlemesi
Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip; kesin SHA256 ve dosya özetleri BASLANGIC_SURUMU.json içinde.

Kullanıcının gönderdiği fotoğraf, mevcut genel stüdyo yerine sabit platform görseli olarak eklendi. Fotoğraftaki kişiler sabittir; hareketli/3B platform değildir. Görsel kırpılmadan ekran genişliğine uyarlanır.

Değişen: dist/games/beyazla-joker/index.html
Eklenen: aynı klasörde platform.js, platform.css, platform-reference.png.
Ortak dosyalarda değişiklik YOK. Ortak integration.js silinmedi; yalnızca bu oyunun HTML dosyasında yerel platform betiğiyle değiştirildi.
Oyun motoru, joker, para ve soru kurallarında değişiklik yok.

## Uygulama
Mevcut projeyi yedekleyin. BASLANGIC_SURUMU.json içindeki base_sha256 ile mevcut index.html eşleşiyorsa dist/ altındaki dört dosyayı aynı yollara uygulayın. Eşleşmiyorsa başlangıç index.html ile üç yönlü karşılaştırıp HTML betik/stil değişikliğini birleştirin. Diğer hesaptaki daha yeni değişikliklerin üzerine doğrudan yazmayın. baslangic/ klasörü karşılaştırma içindir; siteye kopyalanmaz.

## Kontrol
JavaScript sözdizimi kontrolü başarılı. Yerel tarayıcıda başlangıçtan açılış ve ilk soru ekranına geçiş doğrulandı; platform, 7 joker ve ödül merdiveni mevcut. Telefon/Android kontrolü yapılmadı. Site yayımlanmadı.
