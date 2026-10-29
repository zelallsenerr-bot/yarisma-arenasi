# Para Bende platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Arşiv ve dosya SHA256 değerleri BASLANGIC_SURUMU.json içinde. Özgün index.html baslangic klasöründe.

- Gönderilen havaalanı referans fotoğrafı platform-airport.png olarak eklendi. Solda Almeda Abazi, sağda Murat Ceylan; isim etiketleri aynı sırada.
- Platform statik fotoğraftır; sunucular hareket etmez, oyuncunun avatarı fotoğrafa yerleştirilmez. Arayüzde statik olduğu belirtilir.
- Oyuncu adı, düello/gezi aşaması ve belirlenmiş bütçeler ayrı bilgi alanında açık oyun durumundan güncellenir. Havaalanı fotoğrafı gezi sırasında da sabit kalır.
- Mevcut kontroller altta korunur. Düello, bütçe dağılımı, gezi tercihleri, süreler ve puanlama değişmedi.
- index.html değişti; platform.js, platform.css, platform-airport.png eklendi. Genel stüdyo entegrasyonu yalnız bu oyunda yerel platformla değiştirildi. Ortak dosyalarda değişiklik yok. Site yayımlanmadı.

## Birleştirme
Yedek aldıktan sonra dist içeriğini aynı yollara aktarın. Hedef index.html değişmişse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi, entegrasyon ve ZIP bütünlüğü kontrol edildi. Tarayıcıda uçtan uca oyun testi yapılmadı.
