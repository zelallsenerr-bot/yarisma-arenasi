# 540 · Genişletilmiş karakter seçimi

Ortak yarışmacı menüsü 4 görünümden kadın ve erkek için ayrı ayrı14 seçeneğe çıkarıldı: otomatik yaş görünümü, 3 mevcut stil, 6 yeni stil, 4 yaş görünümü. Toplam12 yeni karakterin ayakta ve oturan hâli tek atlas içinde eşlenir.

Yeni panel: büyük önizleme, görünüm adı, görünüm sayacı, Tümü/Günlük/Klasik/Tesettür/Yaşa göre filtreleri, rastgele seçim, yaşa göre sıfırlama, seçili kart işareti, mobil3sütun düzeni ve klavye odağı. Yaşa göre görünüm çocuk/ileri yaş desteğini korur; elle seçilen yetişkin modeller açıkça etiketlenir.

Profil kaydı ve ana menüdeki oyuncu formu yeni kimlikleri kabul eder. Eski kayıtlar korunur. Oyunların paylaşılan DOM/canvas karakter seçicisi aynı kimliği standing/seated için kullanır. Cache referansları80HTMLsayfasında güncellendi; oyun motorları değişmedi.

Kontrol: node _proje_kaynak/tests/characters540.cjs. 28seçim, standing/seatedeşleşmeleri, varlık yolları/atlas sınırları, profil kalıcılığı, çocuk/ileri yaş otomatik görünümü. Üç değişenJSdosyasında sözdizimi denetimi. Yeni görselatlas gözle incelendi. Tarayıcı önizlemesi ve Netlify yayını doğrulanmadı.

Görsel: yerleşik Imagegen ile photorealistic-natural atlas üretildi. İstem: 6sütun4satır, 6farklıerkek ve6farklıkadın; ilk2satır ayakta, son2satıraynıkişiler otururken; farklı yüz/saç/ten/kıyafet ve2tesettürlü stil; saydamzemin, mobilya/yazıyok. Kaynak humans435/characters540.webp.
