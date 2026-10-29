# The Taste Türkiye platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Referansa göre solda mutfak tezgâhları ve yarışmacılar, sağda ışıklı basamaklı yükselti üzerinde sunucu kürsüsü oluşturuldu. Tuğla panolar, beyaz ışık çerçeveleri, koyu parlak zemin, ahşap tezgâhlar, ocaklar ve eviyeler eklendi.
- Oyun başlayınca mevcut 12 yarışmacı solda üç sırada dörder istasyonda gösterilir. Adlar, takım renkleri ve elenme durumları mevcut Retro400BTest durumundan okunur. Mobilde yerleşim korunur.
- Sunucu figürü temsili çizimdir; belirli bir kişinin fotoğrafı değildir. Sahne ve yarışmacılar mevcut çizim avatarları/CSS ile oluşturulmuştur. Oyun içindeki mevcut üç jüri ve puanlama kuralları korunur.
- index.html değişti; platform.js/platform.css eklendi. Ortak retro400-b dosyaları dahil hiçbir ortak dosya değiştirilmedi. Yalnızca bu oyunda genel stüdyo entegrasyonu yerine yerel sahne yüklenir.
- Sahne görseldir; mevcut malzeme seçme, pişirme ve kör tadım kontrolleri aşağıda korunur. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollarla aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın; üzerine körlemesine yazmayın. Yeni dosyalar hedefte varsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm pişirme, takım, eleme ve final akışları uçtan uca test edilmedi.
