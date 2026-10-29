# 520 · Survivor parkur yenilemesi

Yalnız games/ada-mucadelesi değişti. Önceki oyun düzenlemeleri korunur.

- Dokuz isimli ve serbest modda seçilebilir rota; her rotada sekiz engel.
- Denge köprüsü: sola/sağa düzeltme; sallanan engel: zamanlama ve eğilme; çamur: enerji yönetimi.
- Duvar: 0,28–0,65 saniye dokunma ritmine bonus, çok hızlı tekrar yok sayılır.
- Su: aralıklı yüzme hamleleri; zıplama tamponu; depar/enerji dengesi.
- Temiz geçiş serisi, hata sayısı, başlangıç geri sayımı, engel adı/mesafesi ve minimap.
- Engel çarpışması oyuncuyu engelin sonuna ışınlamaz; kısa toparlanma ve enerji kaybı uygular.
- Yerel sahne çizimi: katmanlı ada/deniz, ahşap parkur, hareketli sarkaç, karakterin tırmanma/yüzme/denge tepkileri.
- Serbest mod her gün parkur açar. Eski kayıtların sezon ilerlemesi korunur; eski yarış kayıtları yeni parkuru başlatmadan önce giriş ekranına alınır.
- Telefon kontrolleri sabitlenir; dokunma/odak kaybında basılı durum temizlenir.

Doğrulama: node _proje_kaynak/tests/survivor520.cjs. Dokuz rotada insan girdisiyle hatasız bitiş, dokuz rotada bot bitişi, çarpışma/ritim/denge/atış ve geri sayım. Tarayıcıda masaüstü ve 390px mobil denge sahnesi kontrol edildi.
