# Şanslı Masa platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- İlk referansa göre restoranda aynı masada karşılıklı oturan yarışmacı ve tanıdığı; beyaz örtü, iki servis, çiçekler ve kadehler eklendi. Oyuncu adı, tanıdık adı ve ilişki türü mevcut oyun durumundan okunur. Restoran ve kişiler temsili CSS/mevcut çizim avatarlarıdır.
- İkinci kullanıcı görseli platform-hosts.png olarak ayrı görev odasında kullanıldı. Sinan Çalışkanoğlu ve Orçun Kaptan ekran başında mikrofonlarla gösterilir. Mevcut görev başlığı odada yazılır; tam görev ve kontroller alttaki mevcut arayüzdedir.
- Mobilde restoran ve kontrol odası alt alta, geniş ekranda yan yana görünür. Görev veren odanın görüntüsü statik referans fotoğrafıdır; video veya yeni ses sistemi eklenmedi.
- Sahne oyun başladıktan sonra görünür. index.html değişti; platform.js, platform.css ve platform-hosts.png eklendi. Ortak dosyalar değiştirilmedi; yalnız bu oyunun genel stüdyo entegrasyonu yerel platformla değiştirildi.
- Şüphe, sabır, görevler, süre, ödül ve kayıt kuralları değişmedi. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın; yeni değişiklikleri silmeyin. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm görev, süre, sonuç ve kayıt akışları uçtan uca test edilmedi.
