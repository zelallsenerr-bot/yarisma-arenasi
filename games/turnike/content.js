/* Original mobile prompts inspired by the programme, not a TV transcript. */
(()=>{'use strict';const doors=`Üflemeli müzik aletleri|Flüt;Klarnet;Ney;Trompet;Saksafon;Trombon;Obua;Fagot
Telli müzik aletleri|Gitar;Keman;Bağlama=Saz;Ud;Kanun;Çello=Viyolonsel;Mandolin;Tambur=Tanbur
Evde beslenen hayvanlar|Kedi;Köpek;Muhabbet kuşu;Papağan;Balık;Tavşan;Hamster;Kanarya
Türk mutfağından çorbalar|Mercimek;Ezogelin;Tarhana;Yayla;İşkembe;Domates;Düğün;Tavuk suyu
Kahvaltı sofrasında bulunanlar|Peynir;Zeytin;Yumurta;Bal;Reçel;Tereyağı;Domates;Salatalık
Bir tiyatro sahnesinde görebileceklerin|Perde;Dekor;Oyuncu;Kostüm;Işık;Sahne;Koltuk;Mikrofon
Yeşilçam'ın komedi oyuncuları|Kemal Sunal;Şener Şen;Adile Naşit;Münir Özkul;İlyas Salman;Halit Akçatepe;Zeki Alasya;Metin Akpınar
Doksanlı yılların erkek pop şarkıcıları|Tarkan;Mustafa Sandal;Kenan Doğulu;Çelik;Burak Kut;Tayfun;Hakan Peker;Soner Arıca
Türkçe pop müziğin kadın sesleri|Sezen Aksu;Ajda Pekkan;Nilüfer;Sertab Erener;Sibel Can;Hande Yener;Gülşen;Demet Akalın
Bir futbol maçında duyulan sözler|Gol;Ofsayt;Penaltı;Korner;Taç;Faul;Kart;Uzatma
Bir basketbol maçında duyulan sözler|Pota;Ribaund;Asist;Faul;Smaç;Turnike;Üçlük;Serbest atış
Sahiliyle bilinen tatil yerleri|Bodrum;Çeşme;Marmaris;Fethiye;Kaş;Kuşadası;Alanya;Kemer
Karadeniz mutfağından lezzetler|Hamsi;Kuymak=Mıhlama;Karalahana;Mısır ekmeği;Laz böreği;Akçaabat köftesi;Hamsiköy sütlacı;Turşu kavurması
Sokakta rastlanan dükkânlar|Fırın;Manav;Kasap;Bakkal;Eczane;Terzi;Berber;Çiçekçi
Yağmurlu bir günde yanına alabileceklerin|Şemsiye;Yağmurluk;Çizme;Mont;Atkı;Şapka;Yedek çorap;Havlu
Köye gidince görülebilecekler|Ahır;Samanlık;Kümes;Traktör;Tarla;Çeşme;İnek;Tavuk
Geleneksel Türk tatlıları|Baklava;Künefe;Sütlaç;Kazandibi;Revani;Tulumba;Şekerpare;Aşure
Bavula konulan seyahat eşyaları|Gömlek;Pantolon;Çorap;Diş fırçası;Terlik;Şarj aleti;Havlu;Tarak
Bir sinema salonunu çağrıştıranlar|Bilet;Perde;Koltuk;Mısır;Fragman;Projektör;Film;Afiş
İstanbul'un tarihî yapıları|Ayasofya;Topkapı Sarayı;Galata Kulesi;Kız Kulesi;Sultanahmet Camii;Yerebatan Sarnıcı;Dolmabahçe Sarayı;Rumeli Hisarı
Türkiye ile kara sınırı olan ülkeler|Yunanistan;Bulgaristan;Gürcistan;Ermenistan;Azerbaycan;İran;Irak;Suriye
İsmi duyulunca bir renk düşündüren meyveler|Muz;Portakal;Çilek;Kivi;Limon;Üzüm;Erik;Kiraz
Mutfakta kullanılan el aletleri|Kepçe;Süzgeç;Rende;Çırpıcı;Merdane;Oklava;Maşa;Bıçak
Bir okul çantasında bulunabilecekler|Kitap;Defter;Kalem;Silgi;Cetvel;Kalemtıraş;Boya;Suluk
Deniz yolculuğunu çağrıştıranlar|Vapur;Feribot;İskele;Liman;Kaptan;Dümen;Çapa;Yelken
Havada uçabilen canlılar|Serçe;Güvercin;Kartal;Leylek;Kırlangıç;Yarasa;Kelebek;Arı
Takımla oynanan sporlar|Futbol;Basketbol;Voleybol;Hentbol;Sutopu;Ragbi;Beyzbol;Buz hokeyi
Evdeki beyaz eşyalar ve küçük yardımcılar|Buzdolabı;Çamaşır makinesi;Bulaşık makinesi;Fırın;Kurutma makinesi;Süpürge;Ütü;Mikrodalga
Yazın serinlemek için akla gelenler|Dondurma;Ayran;Limonata;Vantilatör;Klima;Havuz;Deniz;Gölge
Bir düğünde karşılaşabileceklerin|Gelin;Damat;Pasta;Davetiye;Çiçek;Dans;Müzik;Fotoğrafçı
Kış mevsimini hatırlatanlar|Kar;Kardan adam;Kızak;Atkı;Eldiven;Bere;Soba;Salep
Bir piknik sepetinde bulunabilecekler|Sandviç;Meyve;Termos;Bardak;Peçete;Ekmek;Peynir;Su
Bir kütüphanede görebileceklerin|Kitap;Raf;Masa;Sandalye;Katalog;Dergi;Gazete;Kütüphaneci
Bir stadyumda görebileceklerin|Tribün;Kale;Saha;Hakem;Futbolcu;Taraftar;Skor tabelası;Yedek kulübesi
Sağlıklı bir salataya eklenebilecekler|Marul;Domates;Salatalık;Roka;Havuç;Mısır;Zeytin;Turp
Bir fotoğrafçının kullandıkları|Makine;Objektif;Tripod;Flaş;Hafıza kartı;Filtre;Reflektör;Pil
Ev taşırken ihtiyaç duyulanlar|Koli;Bant;Makas;Etiket;Gazete;Battaniye;Kamyon;El arabası
Bayramı çağrıştıranlar|Şeker;Kolonya;Ziyaret;Harçlık;Bayramlaşma;Baklava;Kahve;Yeni kıyafet
Bir tren yolculuğunda görülenler|Vagon;Ray;Lokomotif;İstasyon;Peron;Bilet;Makinist;Kompartıman
Çiçek isimleri|Gül;Lale;Papatya;Menekşe;Orkide;Karanfil;Sümbül;Nergis
Türkiye'deki göller|Van;Tuz;Beyşehir;Eğirdir;İznik;Sapanca;Burdur;Salda
Bir otelin hizmet alanları|Resepsiyon;Lobi;Restoran;Oda;Havuz;Spor salonu;Otopark;Asansör
Kâğıtla yapılan veya oynanan şeyler|Uçak;Gemi;Origami;İskambil;Bulmaca;Resim;Mektup;Yelpaze
Bir konser hazırlığında kullanılanlar|Mikrofon;Hoparlör;Sahne;Kablo;Nota;Işık;Enstrüman;Ses mikseri
Türk mutfağından hamur işleri|Börek;Mantı;Gözleme;Poğaça;Açma;Pide;Lahmacun;Erişte
Bir bahçede yetişebilecek sebzeler|Domates;Biber;Patlıcan;Salatalık;Kabak;Fasulye;Marul;Havuç
Gökyüzüne bakınca görülebilecekler|Güneş;Ay;Yıldız;Bulut;Uçak;Kuş;Gökkuşağı;Meteor
Yüzme tatiline giderken gerekenler|Mayo;Havlu;Güneş kremi;Gözlük;Terlik;Şapka;Şnorkel;Bone
Bir doğum günü kutlamasında bulunanlar|Pasta;Mum;Hediye;Balon;Çiçek;Davetiye;Müzik;Fotoğraf
Bir haber merkezini çağrıştıranlar|Muhabir;Kamera;Mikrofon;Spiker;Stüdyo;Haber;Canlı yayın;Kurgu`.split('\n').map((line,i)=>{let [title,answers]=line.split('|');return{id:'door-'+i,title,answers:answers.split(';').map(a=>a.split('='))}});
const associations=`Pusula|Yön;Manyetik iğne;Kuzeyi gösterir
Kütüphane|Raf;Ödünç kitap;Sessiz okuma yeri
Galata Kulesi|İstanbul;Tarihî kule;Beyoğlu'ndan şehri izlersin
Barış Manço|Uzun saç;Adam Olacak Çocuk;Gülpembe
Sezen Aksu|Besteci;Gülümse;Minik Serçe
Kemal Sunal|Yeşilçam;Hababam Sınıfı;İnek Şaban
Adile Naşit|Neşeli kahkaha;Uykudan Önce;Hafize Ana
Şener Şen|Oyuncu;Eşkıya;Badi Ekrem
Tarkan|Pop müzik;Kuzu Kuzu;Megastar
Ajda Pekkan|Pop müzik;Bambaşka Biri;Süperstar
Keman|Yay;Dört tel;Çene altına yerleşen çalgı
Bağlama=Saz|Tezene;Halk müziği;Uzun saplı telli çalgı
Klarnet|Kamış;Üflemeli;Hüsnü Şenlendirici
Akordeon|Körük;Tuşlar;Açılıp kapanan çalgı
Sahne|Perde;Oyuncu;Gösterinin yapıldığı yer
Suflör|Tiyatro;Unutulan replik;Oyuncuya sözü hatırlatan kişi
Kostüm|Rol;Kıyafet;Oyuncunun sahnedeki giysisi
Baklava|Yufka;Şerbet;Antep fıstığı
Künefe|Kadayıf;Peynir;Hatay tatlısı
Sütlaç|Pirinç;Süt;Fırında üzeri kızarır
Mantı|Hamur;Yoğurt;Küçük bohçalara et doldurulur
Tarhana|Kurutma;Yoğurt ve un;Kışlık çorbalık
Kuymak=Mıhlama|Mısır unu;Peynir;Karadeniz kahvaltısı
Ayran|Yoğurt;Su;Soğuk ve köpüklü içecek
Limonata|Sarı meyve;Soğuk içecek;Limonla hazırlanır
Simit|Halka;Susam;Çayın yanında yenir
İznik|Bursa;Göl;Çinileriyle ünlü ilçe
Kapadokya|Peribacaları;Sıcak hava balonu;Nevşehir
Pamukkale|Denizli;Beyaz;Traverten
Efes|Antik kent;Selçuk;Celsus Kütüphanesi
Anıtkabir|Ankara;Atatürk;Anıt mezar
Boğaziçi|İstanbul;İki kıta;Karadeniz'i Marmara'ya bağlar
Truva|Çanakkale;Antik kent;Tahta at
Nemrut|Adıyaman;Dağ;Dev heykeller
Göbeklitepe|Şanlıurfa;Arkeoloji;T biçimli dikilitaşlar
Vapur|İskele;Deniz;Şehir içi yolcu taşır
Tren|Ray;İstasyon;Lokomotif ve vagonlar
Bisiklet|İki teker;Pedal;Motorsuz ulaşım aracı
Şemsiye|Yağmur;Sap;Açılıp kapanan koruyucu
Termos|Kap;İçecek;Sıcaklığı uzun süre korur
Dürbün|İki göz;Mercek;Uzağı yakın gösterir
Mikroskop|Mercek;Laboratuvar;Çok küçüğü büyütür
Teleskop|Uzay;Gözlem;Gök cisimlerini yakınlaştırır
Saat|Akrep;Yelkovan;Zamanı gösterir
Takvim|Ay;Gün;Yılın tarih düzeni
Satranç|Şah;Vezir;Altmış dört kare
Tavla|Pul;Zar;Otuz pulla oynanan oyun
Mangala|Taş;Kuyu;Geleneksel strateji oyunu
Domino|Taş;Nokta;Benzer uçlar yan yana dizilir
Tombala|Torba;Sayı;Karttaki sayılar kapatılır
Voleybol|File;Altı oyuncu;Manşet ve smaç
Basketbol|Pota;Beş oyuncu;Topu çemberden geçirirsin
Futbol|Kale;On bir oyuncu;Ofsayt kuralı vardır
Tenis|Raket;Kort;Setler üzerinden oynanır
Yüzme|Havuz;Kulaç;Serbest ve kurbağalama
Güreş|Minder;Pehlivan;Tuş
Maraton|Koşu;Dayanıklılık;Yaklaşık kırk iki kilometre
Kayak|Kar;Pist;Ayaklardaki uzun takımlarla kayılır
Ebru|Su;Boya;Desen kâğıda aktarılır
Çini|Seramik;Sır;İznik ve Kütahya
Hat|Yazı;Kalem;Güzel yazı sanatı
Mozaik|Küçük parçalar;Desen;Taş veya camla resim
Origami|Katlama;Kâğıt;Makas kullanmadan şekil yapma
Roman|Edebiyat;Uzun anlatı;Olay ve karakterler genişçe işlenir
Masal|Olağanüstü;Bir varmış bir yokmuş;Geleneksel anlatı
Fabl|Hayvanlar;Öğüt;Kişileştirmeyle anlatılır
Destan|Kahramanlık;Toplum;Uzun şiirsel anlatı
Deyim|Kalıplaşmış söz;Mecaz;Etekleri zil çalmak bir örnektir
Atasözü|Deneyim;Öğüt;Damlaya damlaya göl olur
Bilmece|İpucu;Soru;Cevabı dolaylı anlatılır
Kırmızı Başlıklı Kız|Masal;Sepet;Kurt ve büyükanne
Pinokyo|Tahta kukla;Geppetto;Yalan söyleyince burnu uzar
Külkedisi|Masal;Balo;Cam ayakkabı
Nasreddin Hoca|Fıkra;Akşehir;Göle maya çalar
Karagöz|Gölge oyunu;Hacivat;Perdede deri tasvir
Keloğlan|Masal;Zekâ;Saçı olmayan halk kahramanı
Temel Reis|Çizgi film;Denizci;Ispanak
Bugs Bunny|Çizgi film;Tavşan;Havuç
Şirinler|Mavi;Mantar evler;Gargamel
Tom ve Jerry|Çizgi film;Kedi;Fareyle kovalamaca
Scooby Doo|Köpek;Gizem;Shaggy ile arkadaş
Arı Maya|Çizgi film;Kovan;Willy ile arkadaş
Rafadan Tayfa|Mahalle;İstanbul;Akın ve Hayri
Sünger Bob|Deniz altı;Yengeç Restoran;Kare pantolon
Buzdolabı|Mutfak;Soğuk;Yiyecekleri saklar
Çamaşır makinesi|Tambur;Deterjan;Kıyafetleri yıkar
Bulaşık makinesi|Tabak;Deterjan;Mutfak kaplarını yıkar
Ütü|Isı;Buhar;Kıyafetin kırışığını açar
Süpürge|Toz;Emiş;Zemini temizler
Kahve makinesi|Fincan;Kahve;İçecek hazırlayan ev aleti
Rende|Mutfak;Delikler;Yiyeceği küçük parçalara ayırır
Oklava|Hamur;Ahşap;İnce uzun açma çubuğu
Merdane|Hamur;Silindir;Açarken yuvarlanır
Havan|Baharat;Dövme;Tokmakla kullanılan kap
Süzgeç|Delikler;Mutfak;Katıyı sıvıdan ayırır
Kepçe|Çorba;Sap;Derin kaşık
Kaktüs|Bitki;Çöl;Dikenli gövde
Orkide|Çiçek;Saksı;Zarif ve uzun ömürlü çiçek
Papatya|Çiçek;Beyaz yaprak;Sarı merkez
Zeytin|Ağaç;Ege;Yağı çıkarılır
Lale|Çiçek;Soğan;Bir Osmanlı dönemine adını verir
Çınar|Ağaç;Geniş yaprak;Uzun ömür ve gölge
Gökkuşağı|Yağmur;Güneş;Renkli yay
Kar tanesi|Kış;Kristal;Altı kollu buz yapısı
Volkan|Dağ;Magma;Lav püskürtür
Fosil|Taş;Geçmiş canlı;Kalıntı veya iz
Kutup yıldızı|Gökyüzü;Kuzey;Yön bulmaya yardım eder
Ay|Gece;Dünya;Doğal uydu
Güneş|Yıldız;Isı;Dünya'nın ışık kaynağı
Yörünge|Uzay;Dolanma;Gök cisminin izlediği yol
Kervansaray|Tarih;Ticaret yolu;Yolcuların konakladığı büyük yapı
Şadırvan|Avlu;Su;Abdest için çok musluklu yapı
Köprü|İki kıyı;Geçiş;Aradaki engelin üzerinden uzanır
Fener|Kıyı;Işık;Gemilere yol gösterir
Yelken|Rüzgâr;Tekne;Kumaştan itiş yüzeyi
Çapa|Gemi;Demir;Dibe tutunur
Dümen|Gemi;Yön;Kaptanın kumanda ettiği düzenek
Piyano|Tuş;Tel;Siyah ve beyaz klavye
Nota|Müzik;Porte;Sesi yazıda gösteren işaret
Nakarat|Şarkı;Tekrar;Belirli aralıklarla yinelenen bölüm
Orkestra|Çalgı;Şef;Birlikte müzik yapan topluluk
Palet|Ressam;Boya;Renkler üzerinde karıştırılır
Şövale|Resim;Ayaklı araç;Tuvali dik tutar`.split('\n').map((l,i)=>{let [a,h]=l.split('|');return{id:'assoc-'+i,answers:a.split('='),hints:h.split(';')}});
const headphones=`Bir fincan kahvenin kırk yıl hatırı var denir mi?|1
Bir futbol takımının sahadaki oyuncu sayısı on bir midir?|1
Simit denilince üzerindeki susam akla gelir mi?|1
Bir kedinin miyavlamasını kuş sesi sanır mısın?|0
Yağmurlu havada şemsiyeyi evde bırakmak iyi bir fikir mi?|0
Bir filmin sonunu arkadaşına önceden anlatmak hoşuna gider mi?|0
Kahvaltıda zeytin ve peynir yan yana gelir mi?|1
Bir tiyatro oyununda perde açılınca gösteri başlar mı?|1
Misafir gelince çayı demlemek aklına gelir mi?|1
Kışın denize giderken kalın battaniye şart mıdır?|0
Bir kütüphanede yüksek sesle bağırmak uygun mudur?|0
Yolculukta yanlış trene binmek istediğin bir şey mi?|0
Sahnede alkış duymak yarışmacıya moral verir mi?|1
Doğum günü pastasının üzerinde mum olabilir mi?|1
Vapur denilince akla deniz yolculuğu gelir mi?|1
Ütüyü dondurucuda saklamak doğru bir yöntem midir?|0
Keman yayla çalınan bir çalgı mıdır?|1
Sıcak çayı aceleyle içmek dilini yakabilir mi?|1
Bir gökkuşağını tek bir renkle anlatır mısın?|0
Düğüne giderken yanında bir davetiye olabilir mi?|1
Bisiklet sürmek için pedal çevrilebilir mi?|1
Bir futbol maçında gol olunca tribünler sevinir mi?|1
Dondurmayı sıcak fırında saklar mısın?|0
Gece yıldızlara bakmak için gökyüzüne döner misin?|1
Bir kitabı okumaya son sayfasından başlamak zorunda mısın?|0
Sahneye çıkarken heyecanlanmak doğal mıdır?|1
Bir misafire kapıyı açmadan önce hoş geldin diyebilir misin?|1
Çorbaya çatalla kaşık kadar rahat ulaşır mısın?|0
Tatil bavuluna şarj aleti koymak işe yarar mı?|1
Masadaki bütün pastayı tek başına yemek paylaşmak mıdır?|0
Kediler genellikle ağaçlara tırmanabilir mi?|1
Bir orkestrada farklı çalgılar birlikte çalabilir mi?|1
Bir gölü okyanus kadar büyük göstermek doğru mudur?|0
Sinemada telefon sesinin açık kalması rahatsız eder mi?|1
Kalemi açmak için kalemtıraş kullanılır mı?|1
Bir bulmacanın bütün cevaplarını ilk bakışta bilmek şart mıdır?|0
Yemek pişirirken tarifteki sırayı izlemek işe yarar mı?|1
Denizdeki bir yelkene rüzgâr güç verebilir mi?|1
Kışlık paltoyla havuza atlamak rahat yüzdürür mü?|0
Bir aile fotoğrafında herkesin görünmesini ister misin?|1`.split('\n').map((l,i)=>{let [text,yes]=l.split('|');return{id:'ear-'+i,text,yes:yes==='1'}});
window.TURNIKE319={doors,associations,headphones,chat:[
'Bu masada herkesin ayrı bir hikâyesi var. Yarışmaya gelirken en çok neyi merak ettin?',
'Seni buraya kim uğurladı? Ekran başında bekleyen bir destekçin var mı?',
'Günlük hayatında arkadaşların arasında en çok hangi özelliğinle tanınırsın?',
'Bu akşam güzel bir anı biriktiriyoruz. Yanındaki arkadaşınla nasıl tanıştınız?',
'Biraz nefes alalım. Buraya gelirken kendine ne söyledin?',
'Ödülü bir kenara bırakırsak bu akşam eve hangi hikâyeyle dönmek istersin?'
],reactions:['Stüdyoda gülüşmeler var. Hadi şu kapılara da bir bakalım!','Takım arkadaşların alkışlıyor. Masadaki enerji güzel!','Karşı masa da gülümsedi. Birazdan yeniden yarışacağız.','Güzel bir hatıra oldu. Şimdi dikkatleri oyuna çevirelim.']};})();
