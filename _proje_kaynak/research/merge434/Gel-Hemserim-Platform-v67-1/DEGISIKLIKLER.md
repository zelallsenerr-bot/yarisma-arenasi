# Gel Hemşerim platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Arşiv ve dosya SHA256 değerleri BASLANGIC_SURUMU.json içinde. Özgün index.html baslangic klasöründe.

- Kullanıcının gönderdiği köy meydanı karesi platform-village.png olarak eklendi: ortada Rüştü Onur Atilla, mavi ışıklı kutu merdivenleri, iki yanda seyirciler ve önde yarışmacı.
- Fotoğrafın altındaki yayın yazısı, orijinal dosya değiştirilmeden kapsayıcının dışında bırakılır. Sunucu etiketi eklenir.
- Sahne statik fotoğraftır; fotoğraftaki yarışmacı mevcut oyuncunun avatarı değildir. Kutular tıklanabilir değildir, sahnedeki kişiler hareket etmez. Bu durum arayüzde belirtilir.
- Canlı oyuncu adı, sanal kasa ve dört çarkın açık sonuçları ayrı şeritte güncellenir. Gizli kutu içerikleri okunmaz.
- Mevcut oyun kontrolleri aşağıda korunur; süre, joker, kutu ve çark kuralları değişmez.
- index.html değiştirildi; platform.js, platform.css ve platform-village.png eklendi. Genel stüdyo entegrasyonu yalnız bu oyunda yerel platformla değiştirildi. Hiçbir ortak dosya değiştirilmedi. Site yayımlanmadı.

## Birleştirme
Yedek aldıktan sonra dist içeriğini aynı yollara aktarın. Hedef index.html değişmişse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi, entegrasyon ve ZIP bütünlüğü kontrol edildi. Tarayıcıda uçtan uca oyun testi yapılmadı.
