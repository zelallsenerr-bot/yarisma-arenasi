# Eyvah Düşüyorum — dairesel platform
Referans: kullanıcının image(3).png görseli. Fotoğraf arka plan olarak kullanılmadı. Rakip seçim ekranının mevcut canlı kadrosu CSS ile dairesel sahneye dönüştürüldü: aydınlatmalı beyaz/mavi halkalar, ortada merkez yarışmacısı, yanında Mehmet Ali Erbil portresi, çevrede 10 numaralı kapak üzerinde yuvarlak kişi portreleri. Mevcut kişi atlasları ve sunucu görseli kullanılır. Kişilerin kimliği mevcut oyun tarafından belirlenir. Elenenlerin portreleri mevcut oyun akışı gereğince kaldırılır, kapaktaki ödül gösterilir.

Bu düzen rakip seçim ekranı içindir. Düello ekranı ve mevcut 3B düşme sahnesi korunur. Oyun kuralları, puanlar, paslar ve eleme mantığı değişmedi.

Değişen: dist/games/eyvah-dusuyorum/index.html.
Eklenen: aynı klasörde platform.js ve platform.css.
Ortak dosya değişikliği YOK. Yalnızca bu oyunun HTML dosyasında genel stüdyo betiğinin yerine yerel platform betiği çağrılır. Paylaşılan oyun motoru ve görsel dosyaları ZIP'e kopyalanmadı, mevcut projede kalmalıdır.

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. Kesin SHA256 değerleri BASLANGIC_SURUMU.json içinde. Başlangıç index.html karşılaştırma için baslangic/ altında, siteye kopyalanmaz.

Uygulama: Projeyi yedekleyin. Başlangıç index.html özeti eşleşiyorsa dist/ içindeki üç dosyayı aynı yollarına uygulayın. Yeni sürümde HTML değişmişse baslangic/index dosyasına göre üç yönlü birleştirme yapın. Daha yeni değişikliklerin üstüne körlemesine yazmayın. Önceki Beyaz’la Joker ve Cevap Soruda paketlerinden bağımsızdır.

Doğrulama: Node sözdizimi kontrolü geçti. Yerel tarayıcıda merkez, sunucu, 10 portre, 10 rakip seçme düğmesi görüldü. Bir rakip seçilerek düelloya, süre ve cevap alanına geçiş kontrol edildi. Dar ekran CSS düzeni eklendi; fiziksel telefon/Android ve tam eleme turu testi yapılmadı. Site yayımlanmadı.
