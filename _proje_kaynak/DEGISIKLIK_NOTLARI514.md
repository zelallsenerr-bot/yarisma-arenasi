# Dokuz isteğin tamamlanması — 514

513 düzenlemeleri korunur. Bu ek çalışma, eksik yüz ifadelerini ve tarayıcı kontrollerinde bulunan sorunları tamamlar.

- Hazır ayakta karakter atlaslarının tamamı: standing, standing1, standing2, profile443-standing, profile449-standing. Toplam 40 hücre için aynı yüz, saç, yaş, kıyafet ve ayakkabıya bağlı irkilme yüzü, açık eller ve bükülü dizler. Çocuk/yaşlı/tesettürlü ve alternatif hazır görünümler dahil. Kimliği bilinmeyen harici görseller farklı yüzle değiştirilmez.
- Korku atlasları düşme başlamadan yüklenir. Bekleyen karakterler hareket etmez; seçili kapak ve karakter düşer. Üst sıranın başlarını kesen geniş kadraj konumu düzeltildi.
- O Ses gerçek motorunun boolean dönüş dizisiyle indeks dizisi ayrıştırıldı. Tarayıcıda Sıcak pop → Do/Mi/Sol oynanarak Hadise'nin önce BUTONA BASIYOR, sonra DÖNDÜ aşamasına geçtiği, diğer üç koçun dönmediği doğrulandı. Koltuk arkası isim hizası düzeltildi. Bu hareket mevcut beden dokusunun iki eklemli kol hareketidir; yeni video kaydı değildir.
- Şahane Pazar sade zeminine üç bekleyen yarışmacı eklendi; dekoratif çukur kapakları yok.

## Görsel kontroller
Arkandayız ve Gönder Gitsin önceki kontrolde; Para Bende, Piramit, Çember, Şahane Pazar, O Ses gerçek oyun sayfalarında incelendi. Beyaz yedinci soru ve Eyvah düşme anı geçici yerel kontrol sayfalarında incelendi. Ayşe'nin portresiyle bedeni aynı angle437-standing1.webp hücresidir. Eyvah'ın irkilme karesinde aynı pembe ceketli kişi, korku ifadesi ve açık ellerle görünür; tüm kadro kadrajda kalır. Kontrol sayfaları dağıtıma dahil edilmedi. Telefon boyutlarının tamamı ve tüm oyunların bütün turları tek tek oynanmadı.

## Kontroller
requests513: yedi maddelik sahne sözleşmesi, gerçek O Ses boolean dizisi ve 40 korku hücresinin doğru dosya/hücre eşleşmesi. eyvah510, joker509 önceki oyun akışları. Sözdizimi ve git diff --check.

## Görseller
Built-in imagegen identity-preserve ile aynı adlı kaynak atlaslardan üretildi:
- dist/humans435/fear514-standing1.webp
- dist/humans435/fear514-standing2.webp
- dist/humans435/fear514-profile443-standing.webp
- dist/humans435/fear514-profile449-standing.webp
İstem özeti: tam aynı kişiler, aynı hücre sırası, yüz/saç/kıyafet/yaş/ayakkabı korunarak hafif korku/şaşırma ifadesi; açık eller omuz hizasında, kollar bedenden uzakta, hafif bükülü dizler; baştan ayakkabıya tam beden; şeffaf arka plan, yazı/dekor/ek kişi yok. Kaynak gridleri 4x2, 5x2, 3x2 korunur. Alfa kayıpsız taşındı, WebP varlıkları proje içine alındı.

## Yayın engeli
Uzak depo ilk aşamada artifacts_git_receive_pack_failed, sonraki denemelerde HTTP 500 döndürdü. Yenilenmiş erişimle normal ve no-thin Git denemelerinden sonra uzak HEAD hâlâ 20a97ee733b30899212289ef7c67a71f5ad5e5ee olarak doğrulandı. Sunucu kaydı doğrulanmadan yeni sürüm yayımlanmış sayılmaz.
