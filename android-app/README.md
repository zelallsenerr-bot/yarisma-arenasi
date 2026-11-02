# Yarışma Arenası Android deneme sürümü

Güncel oyunları https://yarismaatolyesi.com/ üzerinden açar. İnternet gerekir; oyun dosyaları APK içine kopyalanmaz. Web sitesi ve 76 oyun değiştirilmez.

Android 8+ (API 26). Java 17, Gradle 8.11.1, Android SDK 35, Android Gradle Plugin 8.9.2.

GitHub Actions → Android test APK → başarılı çalışma → Yarisma-Arenasi-test-APK çıktısını indirip ZIP içindeki app-debug.apk dosyasını Android telefona yükleyin. Bu paket test imzalıdır; Play Store yayını değildir. İlk kurulumda yalnızca APK'yı açtığınız uygulama için yükleme izni gerekir.

Kontrol: ana sayfa, Oyuncum, oyun açma/geri dönme, Milyoner soruları, Milyoner Aile 30 saniyelik video ve tam ekran, portre/yatay dönüş, arka plana geçince ses, internet kesintisi/yeniden deneme. Gerçek cihaz kontrolü tamamlanmadan mağaza sürümü sayılmaz. Çevrimiçi sesli oda mikrofonu bu ilk pakette desteklenmez.

Üretim AAB paketi ve kalıcı yükleme anahtarı testten sonra hazırlanmalıdır. Anahtarları depoya koymayın. Görünen ad Yarışma Arenası; paket kimliği com.yarismaatolyesi.arena.
