# Yarışma Arenası — yalnızca sahibine açık istatistik raporları

Durum: Kod hazırlanmıştır; `measurementId` boş olduğundan ölçüm kapalıdır.

## Hesabı bağla

1. Sahibin kendi Google hesabıyla https://analytics.google.com/ adresinde Yarışma Arenası için GA4 mülkü ve `https://yarismaatolyesi.com` için Web veri akışı oluşturması gerekir.
2. Zaman dilimi Türkiye/İstanbul; Google Signals ve reklam kişiselleştirmesi kapalı. Web veri akışının Gelişmiş Ölçümünü kapatın: otomatik geçmiş değişikliği/page_view ve arama terimleri göndermeyin. Page view olaylarını bu kod açıkça ve temizlenmiş adreslerle gönderir.
3. Mülk erişim yönetiminde yalnızca sahibin hesabını yetkili tutun. Bir raporu herkese açık paylaşmayın. Ölçüm kimliğinin (`G-...`) herkese açık olması raporlara erişim vermez.
4. `site104/analytics-config.js` içindeki `measurementId` alanına Web akışının G-... kimliğini, `propertyId` alanına sayısal mülk kimliğini yazın. Hesap şifresi, OAuth token veya API sırrı kaynak koduna konmaz.
5. Mevcut Android WebView uygulamasında ölçüm kapalı kalır (`collectInWebView: false`). Bunu değiştirmek, uygulamanın veri güvenliği beyanının ayrıca yeniden değerlendirilmesini gerektirir.
6. GA4 saklama ayarını 2 ay seçin. Bu konsol ayarı koddan otomatik değiştirilemez. Gizlilik metni ve seçim ekranını yayından önce beraber kontrol edin.

## Raporları aç

`/yonetici.html` rapor girişidir; burada veri yoktur. Raporlar Google Analytics'in sunucu taraflı hesap yetkisiyle korunur. Sayfanın adresini bilen biri istatistiklere erişemez. Kodda/HTML'de bir şifre saklanmaz; istemci taraflı parola bir güvenlik sınırı olarak kullanılmaz.

- Kullanıcı ve oturumlar: Google Analytics standart edinme/etkileşim raporları.
- Oyunlar: Sayfalar ve ekranlar raporunda `/oyun/` yolları ve oyun başlıkları.
- Açılma sayısı: `game_open` olay sayısı. Olayın `game_name`, `game_id`, `game_category` parametreleri için olay kapsamlı özel boyutlar oluşturun.
- Ön planda süre: `game_engagement` olayının `active_seconds` parametresi için saniye biriminde özel metrik oluşturun. Arka plandaki sekmeler sayılmaz; oyun açıkken işlem yapılmadan geçirilen ön plan süresi de dahil olduğundan bu aktif oyunculuk kanıtı değildir.
- Kendi ziyaretini hariç tutma: Yönetici girişindeki “Bu tarayıcıyı sayma”. Her tarayıcıda ayrı uygulanır. Reklam engelleyici, DNT/GPC ve reddedilen izinler eksik sayım üretir.

Bu ölçüm farklı kişileri kesin tanımaz: tarayıcı/çerez bazında yaklaşık tekil kullanıcıdır. Önceki ziyaretler geri getirilemez. Oyun tamamlanma sayısı veya kazananlar ölçülmez. Açılma olayı iframe başarıyla yüklenince gönderilir; oyun ekranını yeniden açmak yeni açılmadır.

## Doğrulama

- `node tests/analytics.test.cjs`
- `python3 migration104/verify_snapshot.py` (tam site dosyaları bulunan checkout'ta)
- Kimlik bağlandıktan sonra: önce ret ile Google etiketi/ağ isteği olmadığını, izin sonrası bir ana sayfa page_view ve oyun açarken bir game_open üretildiğini GA DebugView/Realtime üzerinden doğrulayın.
- Aynı oyuna tekrar tıklamak çift olay üretmemeli; geri/ileri, oyun değiştirme ve yeniden yükleme yollarını deneyin. Sayfayı yenilemek yeni sayfa ziyareti olabilir, otomatik olarak yeni kişi anlamına gelmez.
- Rapor linkini yetkisiz ayrı Google hesabıyla açınca veriye erişemediğini doğrulayın. Bu son kontrol, sahibin gerçek GA4 mülkü olmadan tamamlanamaz.
