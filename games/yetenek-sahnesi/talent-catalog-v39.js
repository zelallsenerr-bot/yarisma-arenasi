(function(){const names={
0:['Üç bardak ve gizli top','Avuçta kaybolan para','Düğümlü ipin kaçışı','Havada duran küre','Yırtılan posterin dönüşü','Sihirli ayna','Renk değiştiren mendil','Gizemli sandık','Birleşen halkalar','Gölge illüzyonu','Seyircinin seçtiği kart','Manyetik değnek'],
1:['Üç top geniş yay','Çapraz renk yakalama','Yüksekten inen toplar','Dar alanda seri','Dörtlü renk ritmi','Sol ağırlıklı çevrim','Sağ ağırlıklı çevrim','Alçak atış zinciri','Çift hız geçişi','Yavaş başlangıç hızlı final','Asimetrik toplar','Final hava gösterisi'],
2:['Salsa adımları','Hip hop çaprazı','Vals dönüşleri','Zeybek çizgisi','Halay ritmi','Tango adımları','Disco sahnesi','Samba çaprazı','Break adım dizisi','Ayna koreografisi','Dört köşe dansı','Büyük sahne finali'],
3:['Rock vuruşları','Latin aksanları','Vals ölçüsü','Funk ritmi','Yavaş blues','Samba davulları','Dört dörtlük solo','Caz geçişi','Sekizlik vuruşlar','Bas trampet diyaloğu','Senkop zinciri','Crescendo finali'],
4:['Düz ip geçişi','Dalgalı ip dengesi','Çapraz ip rotası','Halka içinden sıçrama','Yükselen çemberler','Üçlü atlama zinciri','Yay çizerek salto','Ters yay inişi','Çift dönüş hattı','Dört duruş koreografisi','Ters duruş serisi','Sahne dengesi finali'],
5:['Uçan kuş','Kedi silüeti','Yelkenli tekne','Dağ manzarası','Deniz feneri','Kelebek kanatları','Balık çizgisi','Lale deseni','Şehir çatısı','Yüz profili','Palmiye','Yıldız kompozisyonu'],
6:['Turna katları','Yelkenli katları','Lale yaprakları','Kâğıt zarf','Yelpaze kıvrımları','Kurbağa ayakları','Kelebek kanatları','Kâğıt kalp','Balık kuyruğu','Kutu köşeleri','Yıldız katları','Lotus yaprakları'],
7:['Köpek boğumları','Çiçek yaprakları','Kılıç ve kabza','Tavşan kulakları','Kuğu boynu','Zürafa boynu','Kalp halkası','Kelebek kanadı','Ahtapot kolları','Balon taç','Palmiye gövdesi','Papağan kanadı'],
8:['İlk selam','Şaşkın kukla','Saklanan kukla','Dans eden kukla','Uyuyan kukla','Orkestra şefi','Meraklı komşu','Uçan kahraman','Kukla aynası','İki el diyaloğu','Ritimli selam','Büyük veda'],
9:['Merkez yakalama','Sol salınım','Sağ salınım','Hızlanan diabolo','Alçak hat','Geniş yay','Dar hedef','Çift tempo','Dur kalk geçişi','Üçlü salınım','Ters ivme','Final yakalaması'],
10:['Kısa ip geri dönüş','Uzun ip geri dönüş','Uyuyan yo-yo','Yüksek yakalama','Dar pencere','Sarkaç ritmi','Çapraz tutuş','Hızlanan dönüş','Yavaş çağırma','Çift çekiş','İp merdiveni','Final geri çağırma'],
11:['Dört köşe bağ','Ters düğüm sırası','Çapraz köprü','İki uç birleşimi','Merdiven düğümü','Halka bağlantısı','Zikzak geçiş','Geriye çözüm','Altılı bağlantı','Çift bağlantı','Sahne şifresi','Final çözümü'],
12:['21 kartın sırrı','Dokuz kartta hafıza','Kupa kartlarını ayır','Altı çiftin sırrı','Sekiz kart merdiveni','Seyircinin kartını hatırla','Maça kartlarını ayır','Kapalı çiftler','Ters destede sıralama','Gizli kart hafızası','Karo kartlarını ayır','Final eşleştirmesi'],
14:['Dört renk hafıza','Beşli ışık dizisi','Ters sıralı nesneler','Altı adım hatırla','Çapraz renk dizisi','Sahne haritası','Çift renk zinciri','Yedili dizi','Kısa uzun sıra','Dört sembol karışımı','Sekiz adım hafıza','Final sahne şifresi'],
17:['Geniş ışık halkası','Dar ışık halkası','Sonsuzluk izi','Çapraz iki halka','Yavaş neon dönüş','Hızlı neon dönüş','Sol daireler','Sağ daireler','Yıldız izi','Dalga çizgisi','Çift renk akışı','Kesintisiz final'],
19:['Otobüs telaşı','Akıllı telefon','Spor salonu','Mutfak tarifi','Tatil valizi','Aile grubu','Evden çalışma','Yeni komşu','Kahve siparişi','Yol tarifi','Alışveriş listesi','Alarm sabahı']};
Talent36.skills[0].name='İllüzyon';for(let v of Talent36.skills){if(!names[v.id])continue;v.plans=names[v.id];v.configs39=v.plans.map((name,i)=>({name,seed:137+v.id*43+i*71,variant:i,goal:5+i%4,tempo:1.45+(i%4)*.18,sequence:Array.from({length:4+i%5},(_,j)=>(j*j+3*i+j)%4),palette:['#f4be78','#b695ec','#5ccbd8','#f19cb4'][i%4]}));}
window.TalentCatalog39=names;
})();
