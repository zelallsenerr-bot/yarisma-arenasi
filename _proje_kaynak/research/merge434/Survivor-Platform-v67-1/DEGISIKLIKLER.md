# Survivor ada platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Kullanıcının istediği yerleşim: solda mavi Gönüllüler, ortada mevcut sunucu avatarı, sağda kırmızı Ünlüler. Palmiye korusu, kum zemin ve takım tabelaları eklendi.
- Mevcut 20 kurgusal yarışmacı takım başına 10 kişi olacak şekilde iki sırada gösterilir. Adlar, takım üyelikleri ve adadan ayrılma durumları mevcut oyun durumundan okunur. Elenenler soluk gösterilir. Gerçek sezon kadrosu eklenmedi. Platform temsili CSS ve mevcut çizim avatarlarıyla oluşturulmuştur.
- Mevcut takım kimlikleri korunarak takım 0: KOR ATEŞİ → ÜNLÜLER; takım 1: OKYANUS → GÖNÜLLÜLER olarak yerel arayüz adları değişti. Eski kayıtlar aynı sayısal takımları kullanır. Ünlüler etiketi mevcut kurgusal oyuncuları gerçek ünlülere dönüştürmez.
- index.html yerel platformu yükler. app.js içindeki takım etiketleri değişti ve yalnızca görsel durum erişimi SurvivorPlatformV67 eklendi. platform.js ve platform.css yenidir.
- Ortak dosyalar değiştirilmedi. Yalnızca bu oyunun genel stüdyo entegrasyonu yerel platformla değiştirildi. Parkur, puanlama, konsey, eleme ve kayıt kuralları değişmedi. Platform oyun başladıktan sonra görünür, mola ve ana menüde gizlenir; kontroller aşağıda korunur.
- Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef app.js/index.html değiştiyse baslangic içindeki özgün dosyalarla üç yönlü karşılaştırın; yeni değişikliklerin üzerine körlemesine yazmayın. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm parkur, konsey ve final akışları uçtan uca test edilmedi.
