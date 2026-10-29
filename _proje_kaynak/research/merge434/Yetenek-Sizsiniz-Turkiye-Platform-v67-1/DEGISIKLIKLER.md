# Yetenek Sizsiniz Türkiye platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Referanstaki seyirci yönünden görünüm: önde jüri masası ve sandalyeler; soldan sağa Ali Taran, Hülya Avşar ve Acun Ilıcalı arkaları izleyiciye dönük oturur. Karşılarında sahnede yarışmacı bulunur. Sıralama referansa uygundur.
- Üç kırmızı masa butonu, üstte üç X tabelası, yıldızlı mavi/mor dekor, ışık huzmeleri ve parlak zemin eklendi. Jüriler arkadan temsili CSS figürleridir; yüz fotoğrafı gösterilmez. Yarışmacı mevcut çizim avatarı ve profil adıyla gösterilir.
- Masa butonları görseldir, oy verme kontrolleri değildir. Oyunun mevcut jüri kararları değiştirilmedi. İlk turdaki mevcut votes bilgisi varsa ilgili X hayır oyunda kırmızı görünür.
- index.html değişti; platform.js/platform.css eklendi. Ortak dosyalar değiştirilmedi. Yalnız bu oyunun genel stüdyo entegrasyonu yerel platformla değiştirildi. Mevcut jüri diyalog/sonuç kartları ve performans kontrolleri aşağıda korunur.
- Yetenek seçimi, nesne etkileşimleri, değerlendirmeler ve tur kuralları değişmedi. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın; yeni değişiklikleri silmeyin. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm performans, jüri ve üst tur akışları uçtan uca test edilmedi.
