/* Additional authored word cards and round-two associations. No suggested-clue buttons. */
(()=>{const rows=`
Gündelik hayat|battaniye|örtü,yatak,yün,kış,yumuşak
Gündelik hayat|pamuk|beyaz,koza,yumuşak,bitki,lif
Gündelik hayat|eldiven|el,kış,parmak,örgü,soğuk
Gündelik hayat|atkı|boyun,kış,örgü,yün,sarmak
Gündelik hayat|çorap|ayak,örgü,çift,topuk,kış
Gündelik hayat|ayak|el,bacak,yürümek,taban,parmak
Gündelik hayat|anaokulu|çocuk,eğitim,oyun,öğretmen,minik
Gündelik hayat|albüm|fotoğraf,hatıra,sayfa,şarkı,koleksiyon
Gündelik hayat|askı|elbise,dolap,omuz,asmak,vestiyer
Gündelik hayat|asansör|kat,binmek,düğme,kabin,yükselmek
Gündelik hayat|avize|tavan,ışık,salon,kristal,aydınlatma
Gündelik hayat|anahtarlık|halka,cep,kilit,süs,metal
Gündelik hayat|bez|silmek,kumaş,temizlik,toz,leke
Gündelik hayat|boya|renk,fırça,duvar,tüp,resim
Gündelik hayat|boncuk|kolye,dizmek,delik,takı,renkli
Gündelik hayat|bilezik|altın,bilek,takı,halka,hediye
Gündelik hayat|bohça|kumaş,çeyiz,paket,düğün,sarmak
Gündelik hayat|baston|yaşlı,dayanmak,sap,yürümek,destek
Gündelik hayat|cüz|sayfa,Kuran,otuz,okumak,bölüm
Gündelik hayat|ceket|takım,yaka,kol,giysi,düğme
Gündelik hayat|cezve|kahve,bakır,sap,telve,köpük
Gündelik hayat|cetvel|ölçü,çizgi,santimetre,geometri,uzunluk
Gündelik hayat|cam|pencere,saydam,kırılmak,şişe,kum
Gündelik hayat|cankurtaran|plaj,kurtarma,deniz,gözetleme,can
Gündelik hayat|cübbe|avukat,mezuniyet,kıyafet,hâkim,tören
Gündelik hayat|çanta|omuz,sap,taşımak,eşya,fermuar
Gündelik hayat|çarşaf|yatak,örtü,kumaş,nevresim,sermek
Gündelik hayat|çerçeve|fotoğraf,kenar,resim,duvar,cam
Gündelik hayat|çivi|çekiç,tahta,metal,çakmak,sivri
Gündelik hayat|çakmak|alev,ateş,gaz,kıvılcım,yanmak
Gündelik hayat|çekiç|çivi,vurmak,alet,sap,tamir
Gündelik hayat|çengel|kanca,asmak,kıvrık,metal,tutmak
Gündelik hayat|çadır|kamp,kumaş,orman,barınak,kurmak
Gündelik hayat|düğme|ilik,kıyafet,basmak,gömlek,yuvarlak
Gündelik hayat|daktilo|yazı,tuş,şerit,kâğıt,eski
Gündelik hayat|dürüm|lavaş,sarmak,kebap,et,sokak
Gündelik hayat|düdük|hakem,ses,üflemek,maç,uyarı
Gündelik hayat|duvak|gelin,beyaz,tül,düğün,baş
Gündelik hayat|davetiye|düğün,kart,çağrı,tören,adres
Gündelik hayat|eğlence|neşe,oyun,kahkaha,şenlik,keyif
Gündelik hayat|elbise|giysi,kumaş,etek,dikmek,askı
Gündelik hayat|elma|meyve,kırmızı,ağaç,kabuk,çekirdek
Gündelik hayat|ekmek|fırın,un,hamur,somun,kahvaltı
Gündelik hayat|etek|bel,kumaş,pile,giysi,dikmek
Gündelik hayat|eyer|at,binmek,deri,üzengi,semer
Gündelik hayat|eczane|ilaç,reçete,sağlık,nöbetçi,şişe
Gündelik hayat|elmas|pırlanta,sert,taş,yüzük,parlak
Gündelik hayat|evrak|belge,dosya,kâğıt,imza,resmî
Gündelik hayat|fırça|boya,kıl,sap,resim,temizlik
Gündelik hayat|fermuar|diş,çanta,kapatmak,ceket,açmak
Gündelik hayat|fular|boyun,ipek,aksesuar,kumaş,bağlamak
Gündelik hayat|fincan|kahve,kulp,telve,porselen,fal
Gündelik hayat|fıskiye|su,havuz,püskürtmek,bahçe,serin
Gündelik hayat|fenerbahçe|sarı,lacivert,Kadıköy,kanarya,futbol
Gündelik hayat|fotoğraf|kamera,anı,çekmek,kare,albüm
Gündelik hayat|gömlek|yaka,düğme,kol,kumaş,ütü
Gündelik hayat|gemi|deniz,liman,kaptan,yük,güverte
Gündelik hayat|gökyüzü|bulut,mavi,yıldız,güneş,yukarı
Gündelik hayat|gitar|tel,pena,müzik,akor,sap
Gündelik hayat|güvercin|kuş,posta,beyaz,kanat,yem
Gündelik hayat|gazete|haber,manşet,sayfa,basın,okumak
Gündelik hayat|gondol|Venedik,tekne,kanal,kürek,İtalya
Gündelik hayat|gül|çiçek,diken,kırmızı,koku,demet
Gündelik hayat|havlu|kurulamak,banyo,kumaş,ıslak,pamuk
Gündelik hayat|hırka|örgü,düğme,yün,giysi,ısınmak
Gündelik hayat|hamak|sallanmak,ağaç,ip,uyku,bahçe
Gündelik hayat|harita|yön,ülke,şehir,ölçek,atlas
Gündelik hayat|hazine|sandık,altın,korsan,define,gömülü
Gündelik hayat|halı|zemin,dokuma,desen,saçak,kilim
Gündelik hayat|heykel|yontmak,mermer,sanat,taş,anıt
Gündelik hayat|horoz|kümes,ötmek,sabah,ibik,tavuk
Gündelik hayat|ıhlamur|çay,çiçek,demlemek,kış,bitki
Gündelik hayat|ırmak|nehir,su,akmak,yatak,kıyı
Gündelik hayat|ıslık|dudak,ses,üflemek,melodi,çağrı
Gündelik hayat|ızgara|kömür,et,tel,pişirmek,mangal
Gündelik hayat|ışık|aydınlık,lamba,güneş,karanlık,parlak
Gündelik hayat|ısırgan|bitki,yaprak,kaşıntı,ot,eldiven
Gündelik hayat|ıspanak|sebze,yeşil,Temelreis,yaprak,demir
Gündelik hayat|ısı|sıcaklık,enerji,termometre,derece,ocak
Yemek|limon|ekşi,sarı,narenciye,sıkmak,kabuk
Yemek|portakal|turuncu,narenciye,meyve,sıkmak,vitamin
Yemek|karpuz|yaz,çekirdek,kırmızı,kabuk,dilim
Yemek|kavun|yaz,sarı,koku,meyve,dilim
Yemek|biber|acı,yeşil,dolma,salça,sebze
Yemek|buz|soğuk,donmak,su,erimek,küp
Doğa|bulut|gökyüzü,yağmur,beyaz,pamuk,buhar
Doğa|kış|soğuk,kar,mevsim,atkı,ocak
Spor|pota|basketbol,çember,file,sayı,atış
Spor|file|ağ,voleybol,kale,tenis,ip
Gündelik hayat|uçurtma|ip,rüzgâr,gökyüzü,kâğıt,kuyruk
Gündelik hayat|bilmece|soru,tahmin,cevap,zihin,bulmak
Gündelik hayat|bilgisayar|ekran,klavye,fare,yazılım,işlemci
Gündelik hayat|mektup|zarf,pul,posta,yazı,haber
Gündelik hayat|şişe|kapak,cam,su,boyun,sıvı
Gündelik hayat|kutu|kapak,paket,karton,hediye,saklamak
Gündelik hayat|valiz|bavul,bagaj,seyahat,tekerlek,kıyafet
`;let known=new Set(PasswordBank.map(q=>q.word));for(let row of rows.trim().split('\n')){let [theme,word,c]=row.split('|');if(known.has(word))continue;known.add(word);PasswordBank.push({id:'pw389-'+word,theme,word,clues:c.split(',')})}
// Host association is genuinely related to every word in the theme, not a genre label.
window.PasswordThemes389=[
['Yumuşak','yastık battaniye pamuk havlu hırka'],['Soğuk','buz kış buzul dondurma buzdolabı'],['Sıcak','fırın ütü kahve termos çaydanlık'],['Yuvarlak','simit saat top tabak pota'],['Cam','ayna kavanoz gözlük şişe pencere'],['Yolculuk','bavul valiz harita uçak gemi'],['Gökyüzü','bulut uçurtma gökkuşağı şimşek yıldız'],['Sarı','limon güneş bal altın saman'],['Ses','radyo kulaklık düdük ıslık gitar'],['Kapak','tencere kavanoz kutu termos şişe'],['Kumaş','perde gömlek etek elbise çarşaf'],['Tel','gitar ızgara telefon bisiklet piyano'],['Su','ırmak şelale yağmur buz deniz'],['Kâğıt','gazete kitap mektup takvim uçurtma'],['El','eldiven bilezik çekiç makas tarak'],['Ateş','mum çakmak volkan fırın ızgara'],['Ağaç','orman elma zeytin hamak kağıt'],['Düğün','duvak davetiye bilezik elbise bohça'],['Yemek','çatal tencere kepçe tabak süzgeç'],['Yaz','karpuz kavun dondurma şemsiye fıskiye']
].map(([clue,words],i)=>({id:'theme389-'+i,clue,ids:words.split(' ').map(w=>PasswordBank.find(q=>q.word===w)?.id).filter(Boolean)})).filter(t=>t.ids.length>=4);
window.PasswordGuests389=['Demet Evgar','Eser Yenenler','Büşra Pekin','İbrahim Büyükak','Gupse Özay','Oğuzhan Koç','Ezgi Mola','Doğu Demirkol','Melis Sezen','İrem Sak'];
})();
