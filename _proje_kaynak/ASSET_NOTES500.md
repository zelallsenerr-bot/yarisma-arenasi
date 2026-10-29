# Seçili karakterlerin temiz arka planı

`dist/assets/contestants500.png`, `dist/assets/contestants346.webp` dosyasının arka planı temizlenmiş yeni sürümüdür. Orijinal dosya korunmuştur.

Yerleşik imagegen aracı ile background-extraction düzenlemesi kullanıldı. İstem: 1024×1536 tuvalde 8 sütun ve 6 satırdaki 48 kişinin yüz, beden, kıyafet, ölçek ve konumlarını koruyarak yalnız mavi stüdyo arka planını alfa saydamlığına dönüştür; mavi kıyafetleri koru, kişi ekleme/çıkarma ve yerlerini değiştirme.

Çıktı: 1024×1536 RGBA. Arka plan köşeleri alfa 0; kişi içleri alfa yaklaşık 250–254. Kızlar ve Anneleri sahnesinde seçilen anne/kız gövdeleri ve temiz kenarlar tarayıcıda kontrol edildi. Dosya gerçek yarışmacı fotoğrafı olarak sunulmaz; mevcut oyun karakterlerinin düzenlenmiş varlığıdır.
