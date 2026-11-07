# TikTok LIVE entegrasyonu — Eyvah Düşüyorum

Bu klasör yalnızca `feature/tiktok-live` geliştirme dalındadır. Ana sürüm ve yayımlanan `site104/` dosyaları değiştirilmemiştir.

## Doğrulanan mevcut dosyalar
- `site104/catalog.js`: oyun kimliği `eyvah-dusuyorum`, yol `games/eyvah-dusuyorum/index.html`
- `site104/games/eyvah-dusuyorum/index.html`: mevcut sahne giriş dosyası
- Aynı oyun klasöründe `platform.js`, `fall515.js`, `config.js`, `bank.js`, `knowledge516.js` ve harici `expansion318/runtime.js` yükleniyor.
- `site104/tiktok-live/index.html`: bağımsız yorum simülasyonu; TikTok'a bağlı değil.
- `site104/tiktok-live/live-round.mjs`: prototip A/B/C/D cevap motoru; gerçek oyuna henüz bağlı değil.

## Geliştirme için zorunlu adımlar
1. `runtime.js`, `platform.js` ve `knowledge516.js` içindeki soru gösterimi, aktif yarışmacı, cevap kontrolü ve düşme animasyonu giriş noktalarını belirle.
2. Mevcut Eyvah Düşüyorum yazılı/harf açmalı sorularını incele: A/B/C/D prototipini doğrudan gerçek oyuna bağlama; Türkçe serbest metin, yazım farklılıkları, pas ve süre kurallarını destekle.
3. Merkez + 10 rakip (11 pozisyon) ile kullanıcının istediği toplam 10 kişi arasındaki farkı çöz; onay almadan oyuncu sayısını değiştirme.
4. Oyun motoruna güvenli bir `receiveAuthorizedAnswer(userId, commentId, text)` arayüzü ekle. Kimliği görüntülenen kullanıcı adına göre değil platformun değişmez kimliğine göre doğrula.
5. Yalnızca aktif sorunun süresi içinde gelen yorumları işle; tekrarları engelle, kopmada oyunu duraklat, olayları günlüğe yaz.
6. Önce sahte yorumlarla uçtan uca test et; sonra canlı yorum kaynağını yalnızca sunucu tarafında bağla. Resmi olmayan TikTok bağlantısının güvenilirliğini ve kurallara uygunluğunu ayrıca değerlendir.
7. Hediyeler zorunlu giriş şartı, avantaj veya gerçek para ödül mekanizması olarak kullanılmamalı.

## Durum
Bu belge teknik inceleme notudur; gerçek oyun entegrasyonu veya canlı TikTok bağlantısı tamamlanmış değildir.
