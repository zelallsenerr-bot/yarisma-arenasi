# Herkes Kazanır platformu
Kullanıcının son talebi ve image(20261025-171654).png referansı esas alındı. Arkada beş turuncu/gri yarışmacı koltuğu, ortada önde Hakan Bilgin, büyük Herkes Kazanır tabelası, mavi/turuncu dekor ve ışıklar kodla oluşturuldu. Fotoğraf arka plan olarak eklenmedi; 2B stüdyo görünümüdür.

Koltuklar mevcut beş kişilik kadro DOM'undan oluşturulur. Adlar, puanlar, joker sayıları ve elenme durumu mevcut oyun tablosundan alınır. Hakan Bilgin için mevcut ayakta figür bulunursa kullanılır; yoksa ortak sunucu portresi gösterilir. Orijinal oyun puan/kadro alanı korunur. Motor, 11 soru, 9 saniye, puan ve joker kuralları değişmedi.

Değişen: dist/games/herkes-kazanir/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Paylaşılan retro400-b motoru değiştirilmedi. Ortak kişi/sunucu/poz dosyaları mevcut projede korunmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında; siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasına göre üç yönlü karşılaştırıp birleştirin. Diğer oyun paketleri etkilenmez.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda beş yarışmacı adı/puanı, Hakan Bilgin, ilk soru ve dört cevap düğmesi doğrulandı. Tam 11 soru ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
