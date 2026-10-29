# İstek ve doğrulama kaydı

Bu dosya, yapılan değişikliklerin kontrol kapsamını ve kullanılan canlandırmaların teknik sınırlarını kaydeder.

## Bu kontrolde doğrulananlar

- Çember: beş kişi ışıklı halkanın içinde; dinlen seçimi oturma pozuna geçiyor; isim etiketleri kişilerinin altında. Alt kartlarda Ece'nin cinsiyet eşleşmesi düzeltildi.
- Evim Şahane: 18 farklı iş kıyafetli ekip görseli; komşu atlas hücrelerinin taşması giderildi. Tadilat artık üç ayrı bölgede sürükleme ile yapılabiliyor. Bölgeyi iki kere sayma, yanlış iş sırası, duraklatma ve kayıt sonrası devam testleri geçti.
- Kızlar ve Anneleri: ayrı seçilen anne ve kız aynı kayıtla geri yüklendi; stüdyodaki tam boy karakterler seçilen kıyafet/kişilerle eşleşiyor. Gereksiz genel karakter seçimi kaldırıldı. Koyu atlas arka planları temizlendi.
- MasterChef: önlüklerin ortak karakter yenilemesi sırasında silinme hatası giderildi; takımlar oluşmadan beyaz, takım etabında seçilen takıma göre renk.
- Piramit: üst üçgen başlık görünür.
- O Ses: başlangıçta jüri kameraya dönük; koltuk yönü başlangıç durumu kontrol edildi.
- Göz6: 6+6 kadro ve iki basamak; kadın oyuncunun kadın evine yerleşmesi doğrulandı.

## Diğer uygulanan düzenlemeler

- Password: sahnedeki oyuncu/takım arkadaşı butonlarını mevcut oyun eylemlerine bağlama; basan kişinin kısa eğilme hareketi.
- MasterChef: önlüğün son trapez kesimi.
- Ortak isim stili: oyunlara özel mutlak konumlandırmayı bozan position:relative kaldırıldı.

## Canlandırma ve doğrulama sınırları

- Survivor kadrosunda gerçek yarışmacı isimleri ve 20 gerçek fotoğraflı seçim/kadro kartı var; parkurdaki hareketli bedenler hâlâ temsilî. Kaynaklar cast502.json içinde.
- Çember'de zamanla ayrı ayrı yer değiştirme, gövde/bacak adımları, dinlenirken oturma ve molada hareketi durdurma var. Hareketler iki boyutlu karakter görselinden oluşturulur.
- Kızma Kazan/Para Bende'de senaryo/tekerleme görevleri basit zamanlama yerine eklendi; televizyon oyunlarının bütün fiziksel ayrıntıları simüle edilmiyor.
- Düşme, yemek yapma ve kart dağıtma efektleri kodda genişletilmiş durumda; görsel gerçekçilik her sahnede tek tek onaylanmış değil.
- Görsel kontroller yukarıdaki örnek sahnelerde yapıldı; bütün olası oyun durumlarının ve ekran boyutlarının görsel kontrolü yapılmadı. Ortak isim kontrolü, karakterin yüzüne taşan etiketi uygun boş alana taşır.

## Kontroller

- Değişen 96 JavaScript dosyasının sözdizimi kontrolü geçti (499/500/501 öncesi tam tarama); sonraki düzenlemeler kendi dosyalarında kontrol edildi.
- staging438, eyvah206, picture200, fifty195, dating431, runway432, trust445 ve renovation499 geçti.
- Eski toplu testlerin 21'i kaynak v84'te de başarısız; bunlar yeni düzenlemelerden kaynaklanan hata olarak sayılmadı.

## Son kontroller (28 Ekim 2026)

- Kumbara: 30 yaş varsayılanı doğru bedenle açılıyor; isimler aşağıda; masa ve kişiler yakın; boş eski koltuklar kaldırıldı.
- Cevap Sende: yarışmacının önündeki gereksiz eğik pano yok; iki isim altta görünür.
- Çember: konum değişimi sırasında bölünmüş gövde/bacak adımları tarayıcıda çalışıyor.
- Yaş verilmediğinde yanlışlıkla yaşlı beden seçilmesi giderildi; profile503 testi geçti.
- 75 test dosyası: 54 geçti. 21 başarısızlık başlangıç kaynak sürümünde de bulunan eski test/hazırlık uyumsuzluklarıdır; tamamının geçtiği iddia edilmez. Ayrıntılar TEST_SONUCLARI_505.json dosyasında.

- Şahane Pazar: balon bölümünde soru ekranı kaldırıldı; pompa ve bağlama kontrolleri tarayıcıda doğrulandı. Beş hedefi bitirme, erken bağlama, patlama, mola ve kayıt verisi sunday506 testinden geçti.
