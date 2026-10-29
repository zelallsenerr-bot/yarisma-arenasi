# Password platform değişikliği

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip; SHA256 BASLANGIC_SURUMU.json içinde.

- Soldan sağa: yarışmacı, Enis Arıkan, ortada Şebnem Bozoklu, ünlü konuk, diğer yarışmacı.
- Referansa göre mavi dikey ışıklar, geniş altın şeritli ortak masa, merkez basamakları ve Password tabelası eklendi. Bu, CSS ve mevcut çizim avatarlarıyla oluşturulmuş temsili sahnedir; fotoğraf benzerliği iddiası yoktur.
- Yarışmacı ve konuk adları mevcut oyun durumundan alınır. Yerleşim sabittir; oyundaki takım seçimi ve turdaki eş değişimleri mevcut kurallarla devam eder. Sahne görseldir, yeni oyun düğmesi eklemez.
- Yalnızca dist/games/password/index.html değişti; platform.js ve platform.css eklendi. Ortak dosyalar değiştirilmedi. Bu oyunda ortak stüdyo entegrasyonunun yerine yerel platform yüklenir.
- Oyun motoru, süreler, kayıt ve puan kuralları değiştirilmedi. Site yayımlanmadı.

## Birleştirme

Önce yedek alın. dist içeriğini aynı yollarla aktarın. index.html başka hesapta değiştiyse baslangic içindeki özgün index.html ile üç yönlü karşılaştırın; otomatik üzerine yazmayın. baslangic klasörünü siteye yüklemeyin. Yeni dosyaların aynı isimde mevcut sürümleri varsa karşılaştırın. Diğer oyun yamalarından bağımsızdır.

## Kontroller

JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm tur ve final akışları uçtan uca test edilmedi.
