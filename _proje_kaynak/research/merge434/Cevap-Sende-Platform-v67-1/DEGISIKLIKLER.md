# Cevap Sende platformu
Son kullanıcı talebi ve image(20261025-171339).png esas alındı. Büyük soru/şık ekranı, etrafında dekoratif seyirci portre panelleri, mor/mavi ışıklı dairesel zemin, merkezde Anıl İlter ve aktif takım yarışmacısı kodla oluşturuldu. Fotoğraf arka plan olarak eklenmedi; kodla oluşturulan 2B görünüm kullanılır. 48 dekoratif seyirci portresi mevcut kişi atlaslarından alınır; bunlar gerçek oy kullanan kişiler değildir ve oy dağılımını değiştirmez.

Soru/şık ekranı yalnız question/locked/reveal aşamalarında mevcut soru metnini gösterir. Diğer aşamalarda program adı gösterilir. Özgün oyun resimli şık sistemi içermez; bu yüzden ekrana soru seçeneklerinin metni kondu, referanstaki tramvay fotoğrafları oyun sorusu olarak eklenmedi. Aktif kişi adı/kimliği oyunun mevcut takımından alınır. Mevcut 3B düşme sahnesi, takım seçimi, cevap düğmeleri ve 25/50 jokerleri korunur.

Değişen: dist/games/cevap-sende/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca oyunun HTML dosyasında genel stüdyo betiği yerine yerel platform betiği çağrılır. Ortak kişi/sunucu dosyaları korunmalıdır. Oyun motoru, süre, anket, ödül ve eleme kuralları değişmedi.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip; kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında; siteye kopyalanmaz. Bu Cevap Sende paketidir; önceki Cevap Soruda paketi ayrı oyuna aittir ve değiştirilmez.

Uygulama: Projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Mevcut HTML daha yeni ise başlangıç dosyasına göre üç yönlü karşılaştırıp birleştirin. Diğer oyun paketleri etkilenmez.

Kontrol: JavaScript sözdizimi kontrolü geçti. Yerel tarayıcıda oyuna giriş, Anıl İlter ve aktif yarışmacı, mevcut takım ve hareketli kapak sahnesi doğrulandı. Soru gösteriminin üç aşamayla sınırlandırılması statik olarak kontrol edildi. Tam eleme/final ve fiziksel telefon/Android testi yapılmadı. Dar ekran CSS düzeni eklendi. Site yayımlanmadı.
