# Turnike platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Solda mavi dört kişilik takım, ortada mevcut Mehmet Ali Erbil sunucu avatarı, sağda turuncu dört kişilik takım. Üst balkonda yetişkin kadın görevliler ve cevap panoları.
- Referansa göre çift kavisli takım kürsüleri, mavi/turuncu ışıklar, merdivenler ve parlak zemin eklendi. Temsili CSS ve mevcut çizim avatarlarıdır; fotoğrafın birebir kopyası değildir.
- Takım üyeleri ve puanları mevcut Turnike319 durumundan okunur. Balkonda mevcut sekiz cevap kapısıyla eşleşen sekiz görevli/pano vardır. Yalnızca s.opened içinde bulunan cevaplar gösterilir, kapalı yanıtlar DOM'a eklenmez. Kapılar açılınca balkon panoları güncellenir. Yeni açma animasyonu eklenmedi.
- index.html değişti; platform.js/platform.css eklendi. Ortak dosyalar değiştirilmedi; yalnızca bu oyunun genel stüdyo entegrasyonu yerel platformla değiştirildi.
- Cevap eşleştirme, takım desteği, süre, çağrışım, kulaklık ve araba finali kuralları değişmedi. Mevcut kontroller aşağıda korunur. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın; yeni değişiklikleri silmeyin. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm cevap kapıları, etaplar ve final akışları uçtan uca test edilmedi.
