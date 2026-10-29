# MasterChef Türkiye platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- İlk referansa göre 4 sırada 5'er istasyon: toplam 20 yarışmacı, kırmızı/mavi önlükler, tezgâhlar, hazırlık tahtaları, ocaklar, mavi ışıklar ve ahşap zemin eklendi. Yarışmacılar mevcut çizim avatarlarıdır; fotoğrafın birebir kopyası değildir.
- İkinci kullanıcı görseli yerel platform-chefs.png dosyası olarak ayrı şef bölümüne eklendi: soldan sağa Mehmet Yalçınkaya, Danilo Zanna, Somer Sivrioğlu.
- Yarışmacılar mevcut oyuncu ve 19 bilgisayar rakibidir. Adlar ve aktif/elenmiş durumları mevcut durumdan okunur. Girişte başlangıç kadrosu gösterilir. Renkli önlükler görseldir; mevcut takım üyeliğini temsil etmez.
- index.html yerel sahneyi yükler. app.js içine yalnızca görselin durumu okuyabilmesi için MasterchefPlatformV67 erişimi eklendi. platform.js, platform.css ve platform-chefs.png yenidir.
- Ortak dosyalar değiştirilmedi. Yalnızca bu oyunda genel stüdyo entegrasyonunun yerine yerel platform yüklenir. Yemek pişirme, şef değerlendirmeleri, puanlama ve eleme kuralları değiştirilmedi; mevcut kontroller sahnenin altında kalır.
- Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollarla aktarın. Hedef index.html veya app.js değiştiyse baslangic içindeki özgün dosyaları temel alarak üç yönlü karşılaştırın; yeni sürümün üzerine körlemesine yazmayın. baslangic klasörünü siteye yüklemeyin. Yeni dosyalar hedefte varsa karşılaştırın. Diğer oyun yamalarından bağımsızdır.

## Doğrulama
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm pişirme, takım, eleme ve final akışları uçtan uca test edilmedi.
