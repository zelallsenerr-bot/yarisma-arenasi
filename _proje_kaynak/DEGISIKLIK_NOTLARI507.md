# ZIP güncellemesi birleştirme — 28 Ekim 2026

- Yüklenen tam paket: Yarisma-Arenasi-v84-Guncellenmis-Tam-Kaynak.zip.
- GUNCELLEME_505.md, REVISION_CHECKLIST_500.md, DOGRULAMA_505.json ve TEST_SONUCLARI_505.json incelendi.
- Kaynak temel SHA: 972946c38765381e8446c2780b412e1856896b4d. Mevcut kaynak da bu SHA idi. Temel dosya dökümündeki SHA256 değerleriyle karşılaştırmada sonradan değişmiş dosya ve çatışma yok.
- 249 yeni/değişen dosya aktarıldı. ZIP'te bulunmayan mevcut dosyalar silinmedi. Site kimliği ve herkese açık erişim korunuyor. Eksik/yarım geçici .maya.glb.13NgnV dosyası pakete alınmadı.
- Güncellemeler: GUNCELLEME_505.md içindeki karakter seçimleri, sahne yerleşimleri, sorular, oyun mekanikleri ve ses/yenileme kontrolleri aktarıldı.
- Ek onarım: ses ve yenileme düğmeleri üst menüdeki Mola düğmesinden aşağı taşındı.
- Ek onarım: Kumbara'da mevcut koltuklu insan görsellerinin yanındaki fazladan boş koltuklar CSS önceliği düzeltilerek gizlendi.
- Yayın sınırı için 7 yeni PNG, aynı boyut ve şeffaflıkla WebP kalite92 kopyasına dönüştürüldü; referansları güncellendi. 10 büyük eski WebP aynı ölçüde yeniden sıkıştırıldı. Asıllar research/import505-originals ve research/optimized507-originals içinde kaynakta tutuluyor. Ayrıntılar OPTIMIZASYON507.json.
- Değişen HTML kaynaklarına 507 önbellek sürümü eklendi; 951 referans yenilendi. HTML yerel kaynak denetiminde eksik dosya yok. Değişen JS sözdizimi kontrolü geçti.
- 75 otomatik test çalıştırıldı. Çekirdek yeni profile503, renovation499, sunday506, trust445 ve million444 geçti. Eski rapordaki 21 başarısız test temel v84'te de başarısızdı (önceki karşılaştırma). water202 ayrıca rastlantısal eski test: kaynak v84'ün izole 8 koşusunda 1 kez başarısız oldu. Bu nedenle bütün testlerin geçtiği iddia edilmiyor. Tam çıktılar TEST_SONUCLARI_BIRLESTIRME507.json ve TEST_WATER_TEMEL507.json.
- trust445 testindeki dosya uzantısı beklentisi PNG → WebP kopyalarına uyarlandı; kimlik/cinsiyet/yaş kontrolleri korundu.
- Tarayıcı: Şahane Pazar balon antrenmanı açıldı, pompa basıncı ve erken bağlama reddi; Milyoner tanışma, yakınsız başlangıç, ilk soru ve telefon jokeri kişi/bağlantı ekranları; Kumbara başlangıç, soru cevabı ilerlemesi ve mola/devam kontrol edildi. Tüm oyunların her aşaması ve tüm mobil ekranlar tek tek görsel olarak onaylanmadı.
