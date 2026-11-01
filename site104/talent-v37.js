(function(root){'use strict';const E=root.Talent36,oldMount=E.mount,oldDraw=E.draw;
// Distinct stage disciplines share appropriate controls, but keep their own stage, props and sequence.
const extra=[
['Keman','rhythm','🎻',['Yay başlangıcı','Staccato','Legato','Çift tel','Yay finali'],[294,440,659,880]],
['Gitar','rhythm','🎸',['Arpej','Akor geçişi','İspanyol vuruşu','Bas yürüyüşü','Solo'],[165,220,330,440]],
['Piyano','rhythm','🎹',['Sağ el ezgisi','Sol el bası','Üçlü akor','Arpej merdiveni','Final kadansı'],[262,330,392,523]],
['Flüt','rhythm','🪈',['Uzun nefes','İkili motif','Soru cevap','Yükselen ezgi','Yumuşak final'],[523,587,659,784]],
['Cam müziği','rhythm','🥂',['Tek kadeh','İki ses','Kristal arpej','Sırayla tını','Uzayan akor'],[698,784,880,1047]],
['Kaşık ritmi','rhythm','🥄',['Çift vuruş','Diz üstü ritim','El değişimi','Üçleme','Hızlı final'],[180,240,350,480]],
['Vücut perküsyonu','rhythm','👏',['Parmak şıklatma','El çırpma','Göğüs ritmi','Ayak vuruşu','Birleşik ritim'],[110,180,260,420]],
['Step dansı','rhythm','👞',['Topuk ucu','Çapraz adım','Üçlü sekme','Sahne geçişi','Final vuruşu'],[120,220,330,460]],
['Islık melodisi','rhythm','🎵',['Uzun nota','İnce cevap','Kısa süsleme','İniş çıkış','Son nefes'],[659,740,831,988]],
['Bateri','rhythm','🥁',['Bas trampet','Zil vurgusu','Dörtlü geçiş','Tom yürüyüşü','Solo finali'],[85,170,290,900]],
['Kaligrafi','trace','✒',['Kavisli harf','İmza çizgisi','Uzun kuyruk','Çift kontur','Çerçeve'],[]],
['Işıkla resim','trace','✨',['Yıldız izi','Spiral ışık','Kuş kanadı','Çift halka','Işık imzası'],[]],
['Hızlı portre','trace','🖼',['Yüz çevresi','Göz hattı','Burun çizgisi','Saç silüeti','Portre finali'],[]],
['Ebru deseni','trace','🎨',['Damla çemberi','Lale yaprağı','Gelgit','Tarak izi','Çiçek finali'],[]],
['Kurdele dansı','trace','🎗',['Geniş yay','Dalgalı iz','Sonsuzluk','Yüksek halka','Yere spiral'],[]],
['Pandomim','trace','🎭',['Görünmez duvar','İp çekişi','Rüzgârda yürüyüş','Kutu içinde','Sessiz selam'],[]],
['Hula hoop','balance','⭕',['Bel çevrimi','Kol halkası','Yavaş dönüş','İki halka','Final dengesi'],[]],
['Şemsiye dengesi','balance','☂',['Avuç dengesi','Parmak ucu','Kısa geçiş','Yan salınım','Sabit final'],[]],
['Tabak çevirme','balance','🍽',['İlk tabak','Çubuk geçişi','Sol el dengesi','Sağ el dengesi','Çift tabak'],[]],
['Temas jonglörlüğü','balance','🔮',['Avuç yuvarlaması','Parmak geçişi','Bilek dönüşü','Kol yolu','Sabit küre'],[]],
['Kalem çevirme','balance','🖊',['Başparmak dönüşü','Parmak arası','Ters geçiş','Çift tur','Yakalama'],[]],
['Rubik küp hafızası','memory','🧩',['Ön yüz','Yan yüz','Üst sıra','Çapraz renk','Son katman'],[]],
['Kart hafızası','memory','🃏',['Dört kart','Kupa sırası','Asların yeri','Renk dizisi','Son deste'],[]],
['Nota hafızası','memory','🎼',['Kısa motif','Ters cevap','Dörtlü ezgi','Uzun cümle','Final ezgisi'],[262,330,392,523]],
['Nesne tahmini','memory','🎁',['Gizli nesne','Üçlü sıra','Renk değişimi','Yer değişimi','Kapalı final'],[]],
['Sayı hafızası','memory','🔢',['İlk dizi','Ters sıra','Çift basamak','Atlayan sıra','Final şifresi'],[]],
['Domino sanatı','place','🁣',['Düz hat','Yumuşak viraj','S harfi','Çift yol','Final kapısı'],[]],
['Hızlı bardak dizme','place','🥤',['Üçlü sıra','Altılı piramit','Çift kule','Dar sütun','Final köprüsü'],[]],
['Taş dengesi sanatı','place','🪨',['Geniş taban','İnce taş','Yan ağırlık','Üçlü denge','Son taş'],[]],
['İskambil mimarisi','place','🂡',['İlk çatı','Çift ayak','İkinci kat','Yan köprü','Final kartı'],[]]
];
const styles=['Sakin giriş','Işıklı merkez','Çapraz sahne','Yakın gösteri','Sürpriz geçiş','Sessiz başlangıç','Yükselen tempo','Renkli geçiş','Uzun final','Seyirci finali'];
E.skills.forEach(sk=>{const plans=sk.plans.slice();for(let i=plans.length;i<50;i++)plans.push(plans[i%20].split(' · ')[0]+' · '+styles[Math.floor(i/5)%10]);sk.plans=[...new Set(plans)];for(let i=0;sk.plans.length<50;i++)sk.plans.push(sk.name+' · '+styles[i%10]+' '+(Math.floor(i/10)+1));});
extra.forEach((d,i)=>{let id=20+i;E.skills.push({id,name:d[0],plans:styles.flatMap(style=>d[3].map(obj=>obj+' · '+style))});E.prompts[id]=({rhythm:'Işık sırayla hangi vuruşa geliyorsa o ses düğmesine dokun. Kendi enstrümanın eşlik eder. Yanlış vuruşta ritmi yeniden yakala.',trace:'Kalemi tutup ışıklı noktalardan sırayla geçir. Her tamamlanan çizgi sahnede kalır. Hedefe yakın çizmek gerekir.',balance:'Sahnedeki nesneyi parmağınla sağa sola dengele. Merkezde tutarken nesne de senin hareketine karşılık verir.',memory:'Önce gösterilen diziyi izle. Işıklar söndüğünde aynı sırayı alttaki nesnelerle tekrar et.',place:'Malzemeyi alttaki tepsiden tut. Sıradaki ışıklı konuma bırak. Yerleştirdiğin parçalar sahnede kalır; yanına bırakmak sayılmaz.'})[d[1]]});
E.mount=function(s,cv,note){if(s.skill35<20)return oldMount(s,cv,note);const d=extra[s.skill35-20],v=s.routine35||0;let z=s.custom36={mode37:d[1],t:0,done:0,goal:5+v%4,x:350,y:200,points:[],placed:[],balance:0,held:0,at:0,sequence:Array.from({length:4+v%4},(_,i)=>(i*3+v+Math.floor(i/3))%4),message:E.prompts[s.skill35]};let controls=document.createElement('div');controls.id='talent-controls36';cv.after(controls);if(root.People37){let actor=document.createElement('div');actor.className='performer37';actor.innerHTML=People37.face({name:'Sahne yarışmacısı'},0);cv.before(actor)}
let hit=()=>{z.done++;s.score+=4;note((d[4][z.done%4]||440),0,.35);z.message='Tamamlanan hareket '+z.done+'/'+z.goal};z.hit=hit;function xy(e){let b=cv.getBoundingClientRect();return{x:(e.clientX-b.left)*700/b.width,y:(e.clientY-b.top)*400/b.height}}function target(){let n=z.done;return{x:150+(n%5)*100,y:135+Math.sin(n*1.2+v)*65}}z.target=target;
cv.onpointerdown=e=>{if(s.paused)return;z.down=true;z.last=xy(e);cv.setPointerCapture?.(e.pointerId);if(d[1]==='place'){z.x=z.last.x;z.y=z.last.y}};
cv.onpointermove=e=>{if(!z.down||s.paused)return;let p=xy(e);z.x=p.x;z.y=p.y;if(d[1]==='balance')z.balance=(p.x-350)/250;if(d[1]==='trace'){let t=target();z.points.push(p);if(Math.hypot(p.x-t.x,p.y-t.y)<24)hit()}z.last=p};
cv.onpointerup=cv.onpointercancel=e=>{if(s.paused)return;let p=xy(e);z.down=false;if(d[1]==='place'){let t=target();if(Math.hypot(p.x-t.x,p.y-t.y)<30){z.placed.push({...t,rotation:(v%3-1)*.1});hit()}else{s.errors++;z.message='Parçayı ışıklı hedefe biraz daha yakın bırak.'}}};
if(d[1]==='rhythm'||d[1]==='memory'){controls.innerHTML='<p id="talentCue37"></p>'+[0,1,2,3].map(i=>'<button class="talent-pad37" data-pad37="'+i+'">'+(d[1]==='memory'?['◆','●','★','▲'][i]:['DO / BAS','Mİ / TAK','SOL / TIS','DO / ZİL'][i])+'</button>').join('');controls.querySelectorAll('[data-pad37]').forEach(b=>b.onclick=()=>{if(s.paused)return;let i=+b.dataset.pad37;if(d[1]==='memory'&&z.t<z.sequence.length*.8+1)return;note(d[4][i]||[330,440,550,660][i],0,.4);let wanted=d[1]==='memory'?z.sequence[z.at]:Math.floor(z.t/1.1)%4;if(i===wanted){if(d[1]==='memory'){z.at++;if(z.at===z.sequence.length){hit();z.at=0;z.t=0;z.sequence=z.sequence.map((x,j)=>(x+1+j%2)%4)}}else if(z.lastBeat!==Math.floor(z.t/1.1)){hit();z.lastBeat=Math.floor(z.t/1.1)}}else{s.errors++;z.at=0;z.message='Bir sonraki ışığı takip et.'}})}
};
E.draw=function(c,s,dt){if(s.skill35<20)return oldDraw(c,s,dt);let z=s.custom36,d=extra[s.skill35-20],v=s.routine35||0;z.t+=dt;c.fillStyle='#171332';c.fillRect(0,0,700,400);let g=c.createLinearGradient(0,0,700,400);g.addColorStop(0,'#573f77');g.addColorStop(1,'#122e55');c.fillStyle=g;c.fillRect(12,12,676,376);c.fillStyle='#fff3cb';c.textAlign='center';c.font='bold 24px system-ui';c.fillText(d[0],350,40);c.fillStyle='#b99565';c.fillRect(50,300,600,18);c.font='80px system-ui';c.fillText(d[2],80,150);const dot=(x,y,r,col)=>{c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,7);c.fill()};
if(z.mode37==='rhythm'||z.mode37==='memory'){let showing=z.mode37==='memory'&&z.t<z.sequence.length*.8+1;let lit=z.mode37==='rhythm'?Math.floor(z.t/1.1)%4:showing?z.sequence[Math.floor(z.t/.8)]:-1;for(let i=0;i<4;i++){dot(170+i*115,210,42,i===lit?'#fff3b0':['#f17fa0','#66d6e7','#e9bc69','#9ddbba'][i]);c.fillStyle='#14263f';c.font='bold 30px system-ui';c.fillText(z.mode37==='memory'?['◆','●','★','▲'][i]:['♪','♫','♬','♩'][i],170+i*115,220)}let text=document.getElementById('talentCue37');if(text)text.textContent=z.mode37==='rhythm'?'Işıklı vuruş: '+(lit+1):showing?'Önce izle':'Şimdi sırayı tekrar et · '+z.at+'/'+z.sequence.length;}
if(z.mode37==='trace'){c.strokeStyle=['#f3d5a2','#72d9e3','#e9a2df'][v%3];c.lineWidth=7;c.lineCap='round';c.beginPath();z.points.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.stroke();let t=z.target();dot(t.x,t.y,22,'#fff2bb');if(z.down){c.font='50px system-ui';c.fillText(d[2],z.x,z.y)}}
if(z.mode37==='place'){for(let p of z.placed){c.save();c.translate(p.x,p.y);c.rotate(p.rotation);c.font='48px system-ui';c.fillText(d[2],0,0);c.restore()}let t=z.target();c.strokeStyle='#f2d088';c.lineWidth=3;c.strokeRect(t.x-30,t.y-45,60,60);c.font='48px system-ui';c.fillText(d[2],z.down?z.x:350,z.down?z.y:365)}
if(z.mode37==='balance'){let drift=Math.sin(z.t*(1.3+v%3*.1))*.6,angle=drift+z.balance;c.save();c.translate(350,245);c.rotate(angle*.5);c.fillStyle='#d7ad6a';c.fillRect(-130,0,260,15);c.font='90px system-ui';c.fillText(d[2],0,-15);c.restore();if(Math.abs(angle)<.23){z.held+=dt;if(z.held>1){z.hit();z.held=0}}else z.held=0}
c.fillStyle='#fff';c.font='18px system-ui';c.fillText(z.done+'/'+z.goal+' · '+Math.ceil(s.left)+' saniye',350,390);document.getElementById('talentInfo').textContent=z.message;if(z.done>=z.goal){s.score=Math.max(25,s.score);s.left=0}}
})(window);
