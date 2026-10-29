# Göz6 platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Referansa göre solda kızlar takımı, sağda erkekler takımı; ahşap basamaklı oturma alanları ve önde iki ayrı oyun masası. Kızlar beyaz, erkekler yeşil üstlerle; sol basamaklar kırmızı, sağ basamaklar mavi ışıklı gösterilir.
- Mevcut oyun dört kız ve dört erkekten oluşur. Mevcut house=1 kızlar solda, house=0 erkekler sağda gösterilir; takım/ev kimlikleri değiştirilmez. İsimler ve elenme durumları mevcut Retro400ATest durumundan okunur. Gerçek sezon kadrosu eklenmedi.
- Temsili CSS ve mevcut çizim avatarları kullanılır. Öndeki iki masada yarım çember engel, turuncu hedefler ve toplar dekoratiftir; yeni fizik veya masa oyunu eklenmedi.
- index.html değişti; platform.js/platform.css eklendi. Ortak retro400-a dosyaları dahil hiçbir ortak dosya değiştirilmedi. Yalnız bu oyunun genel stüdyo entegrasyonu yerel platformla değiştirildi.
- Mevcut sosyal karar, hafıza, dokunulmazlık, adaylık, oylama ve final kuralları korundu; kontroller aşağıda kalır. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm hafıza, dokunulmazlık, oylama ve final akışları uçtan uca test edilmedi.
