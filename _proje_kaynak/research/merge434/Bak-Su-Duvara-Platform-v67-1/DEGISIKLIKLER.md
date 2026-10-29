# Bak Şu Duvara platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Referansa göre solda kırmızı şekilli duvar, önde havuz, sağda sunucu Behzat Uygur ve beş bekleyen yarışmacı. Aktif oyuncuyla toplam altı yarışmacı. Kırmızı ve mavi kostümler/kasklar ve ışıklı stüdyo eklendi.
- Duvar boşluğu s.target kol/bacak değerlerini, aktif figür s.pose değerlerini gösterir. Mevcut kol ve bacak düğmeleri değişince sahne güncellenir. Sonuçta geçme/düşme bilgisi gösterilir. Suya düşme için yeni fizik animasyonu eklenmedi.
- Platform temsili CSS/SVG çizimidir; fotoğrafın birebir kopyası değildir. Sunucu mevcut avatarla gösterilir. İkili/üçlü turdaki takım arkadaşlarının pozları mevcut motor tarafından simüle edilmeye devam eder; büyük duvarda yalnız insan oyuncunun pozu gösterilir.
- index.html değişti; platform.js/platform.css eklendi. Ortak retro400-a dosyaları dahil hiçbir ortak dosya değiştirilmedi. Bu oyunun genel stüdyo entegrasyonu yerel platformla değiştirildi.
- Süre, puan, takım ve tur kuralları değişmedi. Mevcut oyun kontrolleri aşağıda korunur. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın; yeni değişiklikleri silmeyin. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm süre, ikili/üçlü tur ve sonuç akışları uçtan uca test edilmedi.
