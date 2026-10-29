# Telefon Kulübesi sokak platformu

Başlangıç: Yarisma-Arenasi-v67-Tum-Kaynaklar.zip. SHA256 bilgileri BASLANGIC_SURUMU.json içinde.

- Referansa göre sokağın ortasında açık renk çerçeveli cam telefon kulübesi, lacivert TELEFON tabelası ve turkuaz telefon cihazı eklendi.
- Kulübede mevcut oyuncu avatarı, ahizeyi kulağına tutan bükülü kol ve telefon kablosuyla gösterilir. Konuşma duruşu dekoratiftir; sesli konuşma veya ses tanıma eklenmedi. Fotoğrafın birebir kopyası değil, temsili CSS çizimidir.
- Arka planda şehir binaları, ağaçlar, yol, araçlar ve kaldırım eklendi. Oyuncu adı mevcut durumdan ve giriş alanından okunur.
- Sahne genel tanıtım görselidir; mini görevlerde yarışmacıyı sokakta hareket ettiren yeni mekanik eklenmedi. Asıl çağrı ve görev kontrolleri aşağıda korunur.
- index.html değişti; platform.js/platform.css eklendi. Ortak dosyalar değiştirilmedi; yalnızca bu oyunun genel stüdyo entegrasyonu yerel platformla değiştirildi.
- Çağrı süreleri, görevler, ödül ve kayıt kuralları değiştirilmedi. Site yayımlanmadı.

## Birleştirme
Önce yedek alın. dist içeriğini aynı yollara aktarın. Hedef index.html değiştiyse baslangic içindeki özgün dosyayla üç yönlü karşılaştırın; yeni değişiklikleri silmeyin. Yeni dosyalar mevcutsa karşılaştırın. baslangic klasörünü siteye yüklemeyin. Diğer oyun yamalarından bağımsızdır.

## Kontroller
JavaScript sözdizimi ve ZIP bütünlüğü kontrol edildi. Tüm çağrı, mini görev ve final akışları uçtan uca test edilmedi.
