# O Ses Türkiye platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- İstenen yerleşim: soldan sağa Sibel Can, Murat Boz, Hadise, Gökhan; dört kırmızı koltukta arkadan görünürler. Karşılarında ışıklı sahne, mikrofon ve yarışmacı platformu bulunur.
- Mavi/mor sahne, ışık huzmeleri ve O Ses Türkiye tabelası eklendi. Koçlar temsili arkadan CSS figürleridir; yüz fotoğrafı değildir. Yarışmacı mevcut profil adı ve çizim avatarıyla gösterilir.
- Bu görselde koltuklar istenen arka görünümü korur. Mevcut motorun koç dönme kararları DÖNDÜ etiketiyle yansıtılır; gerçek koltuk dönüşü/koç seçimi alttaki mevcut arayüzde devam eder. Masa butonları dekoratiftir.
- index.html değişti; platform.js/platform.css eklendi. Ortak dosyalar değiştirilmedi. Yalnız bu oyunun genel stüdyo entegrasyonu yerel platformla değiştirildi.
- Nota, performans, koç seçimi, prova ve tur geçiş kuralları değişmedi. Mevcut kontroller aşağıda korunur. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın; yeni değişiklikleri silmeyin. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm nota, koltuk dönme, koç seçimi ve üst tur akışları uçtan uca test edilmedi.
