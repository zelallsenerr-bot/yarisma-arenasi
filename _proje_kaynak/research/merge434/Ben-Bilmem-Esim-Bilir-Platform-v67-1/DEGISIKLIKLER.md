# Ben Bilmem Eşim Bilir platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Referansa göre önde dört kadın yarışmacı kırmızı ortak masada, arkada dört erkek eş camlı sessiz odada, sağda İlker Ayrık mavi sunucu masasında gösterilir. Kullanıcının yazdığı İlker Aydın adı, projedeki sunucu bilgisine göre İlker Ayrık olarak yazıldı.
- Oyuncunun mevcut a/b adları ve diğer üç çiftin mevcut isimleri kullanılır. Aktif/elenmiş ve tekerlek sayıları mevcut durumdan okunur.
- Görseldeki sabit kadın-önde/erkek-arkada yerleşimi uygulanmıştır. Mevcut oyunun turdan tura iddia veren/oynayan eş değiştirme kuralları korunur; sahne rol değişimini canlandırmaz. Asıl rol ve iddia bilgileri oyun kontrollerinde geçerlidir. Cam oda görseldir; yeni ses engelleme sistemi eklenmedi.
- Temsili CSS sahnesi ve mevcut çizim avatarlarıdır; fotoğrafın birebir kopyası değildir. Antrenmanda sahne gizlenir. Aynı yerdeki eski couple-studio37 görseli yeni platform varken yerel CSS ile gizlenir.
- index.html değişti; platform.js/platform.css eklendi. Ortak dosyalar değiştirilmedi. Bu oyunda genel stüdyo entegrasyonu yerine yerel platform yüklenir.
- Oyun motoru, açık artırma, etaplar, eleme, otomobil finali ve kayıt kuralları değişmedi. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın; yeni değişiklikleri silmeyin. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm açık artırma, eş rol değişimi, mini oyun ve final akışları uçtan uca test edilmedi.
