# Kızma Kazan kontrol odası platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Kullanıcının gönderdiği Öner Erkan görseli, platform-control-room.png olarak kontrol odası platformuna eklendi. Öner masada, arkada çoklu monitörler, sağ üstte şaka sahnesi korunur.
- Bu platform statik referans fotoğrafıdır; video, hareketli sunucu veya canlı monitör yayını değildir. Arayüzde de statik olduğu belirtilir. Alt video oynatıcı şeridi dosyaya dokunmadan CSS ile görüntü dışında bırakılır.
- Oyuncu adı ve mevcut etap sayısı ayrı bilgi şeridinde gösterilir. Sağ üstteki fotoğraf kişisi mevcut insan oyuncu değildir. Mevcut şaka ve sakinleşme kontrolleri aşağıda korunur.
- index.html değişti; platform.js, platform.css, platform-control-room.png eklendi. Ortak retro400-c dosyaları dahil hiçbir ortak dosya değiştirilmedi. Yalnız bu oyunun genel stüdyo entegrasyonu yerel platformla değiştirildi.
- Stres, süre, sakinleşme, para ve sonuç kuralları değişmedi. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm stres, süre ve sonuç akışları uçtan uca test edilmedi.
