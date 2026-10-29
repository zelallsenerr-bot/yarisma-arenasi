# Yemekteyiz platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Arşiv ve dosya SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Karşıda günün yarışmacısı ve Zuhal Topal; solda iki, sağda iki diğer günün yarışmacısı. Altı kişilik sofra düzeni.
- Referanstan esinlenen ev içi ortam, perde/pencere, bitkiler, siyah masa, yeşil runner, altı servis, çiçek ve mum eklendi. Mevcut çizim avatarlarıyla temsili CSS sahnesidir; fotoğraf birebir kopyalanmadı.
- Oyuncu adı ve haftanın dört rakibinin adları mevcut oyundan alınır. Sahne oyuncunun ev sahipliğini temsil eder; rakipleri puanlama ekranında ev sahibi otomatik değişmez. Yeni tur veya yemek mekaniği eklenmedi.
- index.html yerel platformu yükler. app.js içine yalnızca durum okuma erişimi YemekteyizPlatformV67 eklendi. platform.js ve platform.css yenidir. Ortak dosyalar değiştirilmedi; yalnızca bu oyunda genel stüdyo entegrasyonu yerel platformla değiştirildi.
- Yemek hazırlama, alışveriş, değerlendirme ve kayıt kuralları korundu. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı dosya yollarına aktarın. Hedef app.js/index.html değiştiyse baslangic içindeki özgün dosyaları temel alarak üç yönlü karşılaştırın; hedefteki yeni değişiklikleri silmeyin. baslangic klasörünü siteye yüklemeyin. Yeni dosyalar hedefte varsa karşılaştırın. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm yemek, puanlama ve hafta geçişi akışları uçtan uca test edilmedi.
