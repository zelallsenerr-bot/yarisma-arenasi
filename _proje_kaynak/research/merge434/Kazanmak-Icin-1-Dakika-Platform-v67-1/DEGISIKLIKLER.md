# Kazanmak İçin 1 Dakika platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Referansa göre yuvarlak parlak oyun sahnesi, mavi/mor ışıklar, seyirci tribünü, oyun sehpası ve küçük kaide eklendi.
- Kullanıcı talimatıyla sunucu Ertem Şener olarak gösterilir. Projedeki games/kendi-dusen-aglamaz/assets/ertem-standing207.webp fotoğrafının üst bölümü SVG içinde kırpılarak kullanılır; gövde ve bacaklar CSS ile temsili tamamlanır. Kaynak fotoğraf ve ortak sunucu verisi değiştirilmedi. Tam boy fotoğraf kesiti stüdyo yayını değildir.
- Yarışmacı mevcut profil adı ve çizim avatarıyla gösterilir. Platform temsili çizimdir; fotoğrafın birebir kopyası değildir.
- 60 SANİYE ekranı dekoratif başlık olup canlı sayaç değildir. Gerçek süre ve görevler aşağıdaki mevcut oyun alanında gösterilir. Platform yeni animasyon/fizik eklemez.
- index.html değişti; platform.js/platform.css eklendi. Ortak dosyalar değiştirilmedi; yalnızca bu oyunun genel stüdyo entegrasyonu yerel platformla değiştirildi.
- Mevcut Minute33 oyunları, sürükleme, dokunma, 60 saniye kuralı ve mola kontrolleri korundu. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın; yeni değişiklikleri silmeyin. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Referans verilen mevcut Ertem fotoğrafı başlangıç kaynaklarında bulunmalıdır. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm mini oyun, süre ve tur geçişleri uçtan uca test edilmedi.
