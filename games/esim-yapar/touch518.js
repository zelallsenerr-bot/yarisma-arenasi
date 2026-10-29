(function(root){'use strict';
const bank=[
['Çay',['çay','cay'],'Kuru, ince ve ufalanabilen parçacıklar.','Parmaklarının arasında küçük kıvrımlı yaprak kırıntıları var.'],
['Pirinç',['pirinç','pirinc'],'Sert, kuru ve küçük taneler.','Taneler ince uzun; uçları hafif sivri.'],
['Bulgur',['bulgur'],'Kuru, sert ve pütürlü taneler.','Taneler düzensiz, kırılmış tahıl parçaları gibi.'],
['Tavuk',['tavuk','tavuk eti'],'Yumuşak, serin ve kaygan bir yüzey.','Esnek et dokusu, derimsi bölüm ve sert kemik hissediyorsun.'],
['Karpuz kabuğu',['karpuz','karpuz kabuğu','karpuz kabugu'],'Bir yüzeyi sert ve pürüzsüz, diğeri nemli.','Kalın, eğri bir dilim; iç yüzünde az miktarda yumuşak meyve kalmış.'],
['Brokoli',['brokoli'],'Üst kısmı sık, taneli ve dallanmış.','Altta kalın bir sap; üstte küçük ağaç tacı gibi kümeler.'],
['Arap sabunu',['arap sabunu','sabun'],'Yoğun, yumuşak ve çok kaygan bir madde.','Jel kıvamında; parmakların kayıyor, belirgin bir sert şekli yok.'],
['Keman yayı',['keman yayı','keman yayi','yay'],'Uzun, ince ve sert bir çubuk.','Çubuk boyunca gergin, ince teller veya kıllar uzanıyor.'],
['Sünger',['sünger','sunger'],'Gözenekli, hafif ve esnek.','Sıkınca küçülüyor, bırakınca eski biçimine dönüyor.'],
['Kozalak',['kozalak'],'Sert ve pullu bir yüzey.','Üst üste binen odunsu pullar, uca doğru daralan bir biçim.'],
['Makarna',['makarna'],'Kuru, sert ve birbirinden ayrı parçalar.','İçi boş küçük borular; bazı yüzeylerde ince çizgiler var.'],
['Ceviz',['ceviz'],'Sert ve derin çizgili kabuk.','Avuca sığan yuvarlak biçim; ortasında iki yarıyı ayıran bir hat var.'],
['Pamuk',['pamuk'],'Çok hafif, yumuşak ve lifli.','Çekince ince liflere ayrılıyor; sıkıldığında küçük bir top oluyor.'],
['Fırça',['fırça','firca'],'Bir tarafı sert sap, diğer tarafı sık ince kıllar.','Kıllar bastırınca eğilip geri dönüyor.'],
['Mandal',['mandal'],'Küçük ve sert, iki parçalı.','Ortada yay var; bir ucunu sıkınca öteki uç açılıyor.'],
['Anahtar',['anahtar'],'Soğuk, sert ve metal.','Bir ucunda halka deliği, diğerinde dişler var.'],
['İp',['ip','halat'],'Uzun, esnek ve lifli.','Birbirine dolanmış lifler; düğüm atılabilecek ince bir uzunluk.'],
['Deniz kabuğu',['deniz kabuğu','deniz kabugu'],'Sert, kıvrımlı; dışı çizgili.','İç yüzeyi pürüzsüz, kenarı dalgalı ve içi oyuk.']];
const norm=v=>String(v).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/[^a-z0-9]/g,'');
function create(rng=Math.random){let order=bank.map((_,i)=>i);for(let i=order.length-1;i>0;i--){let j=Math.floor(rng()*(i+1));[order[i],order[j]]=[order[j],order[i]];}return {order:order.slice(0,12),at:0,score:0,solved:[],seen:[],clues:0,travel:0,last:null,feedback:'Kutunun içini sürükleyerek incele veya DOKUN düğmesini kullan.',done:false,cool:0,gesture:0};}
function item(s){return bank[s.order[s.at]];}
function touch(s,amount=1){if(s.done||s.cool>0||s.solved.includes(s.at))return false;s.travel+=amount;s.gesture=.8;let n=s.clues;s.clues=Math.min(2,Math.floor(s.travel));if(s.clues!==n)s.feedback=item(s)[s.clues+1];return true;}
function answer(s,value){if(s.done||s.cool>0||s.solved.includes(s.at))return false;if(!s.clues){s.feedback='Önce kutudaki nesneye dokun.';return false;}if(!String(value).trim()){s.feedback='Tahmin ettiğin nesnenin adını yaz.';return false;}if(item(s)[1].some(v=>norm(v)===norm(value))){s.score++;s.solved.push(s.at);s.feedback='Doğru: '+item(s)[0]+'! Başka bir kutuya geç.';s.cool=.65;root.ArenaSound?.cue('correct');if(s.score===s.order.length)s.done=true;return true;}s.feedback='Bu tahmin doğru değil. Yeniden inceleyebilir veya başka kutuya geçebilirsin.';s.cool=.6;root.ArenaSound?.cue('wrong');return false;}
function select(s,at){if(s.done||s.cool>0||at<0||at>=s.order.length||s.solved.includes(at))return false;if(s.solved.includes(s.at))s.seen[s.at]=0;else s.seen[s.at]=s.travel;s.at=at;s.travel=s.seen[at]||0;s.clues=Math.min(2,Math.floor(s.travel));s.last=null;s.feedback='Kutu '+(at+1)+'. Dokunarak incele.';return true;}
function next(s){for(let i=1;i<=s.order.length;i++){let j=(s.at+i)%s.order.length;if(!s.solved.includes(j))return select(s,j);}return false;}
function step(s,dt){s.cool=Math.max(0,s.cool-dt);s.gesture=Math.max(0,s.gesture-dt);}
function pointer(s,type,x,y){if(type==='down'&&x>180&&x<620&&y>150&&y<400)s.last={x,y};else if(type==='move'&&s.last){let d=Math.hypot(x-s.last.x,y-s.last.y);if(x>180&&x<620&&y>150&&y<400)touch(s,Math.min(d,40)/220);s.last={x,y};}else if(type==='up'||type==='cancel')s.last=null;}
function draw(c,s){c.fillStyle='#1d1534';c.fillRect(0,0,800,450);for(let i=0;i<8;i++){c.fillStyle='#7149a8';c.fillRect(i*110,0,4,450);}c.textAlign='center';c.fillStyle='#fff';c.font='bold 24px system-ui';c.fillText('DOKUNARAK TANI',400,37);for(let i=0;i<12;i++){let x=22+i*64;c.fillStyle=s.solved.includes(i)?'#3b9279':i===s.at?'#f0cb70':'#3a5272';c.fillRect(x,64,53,53);c.fillStyle='#fff';c.font='bold 18px system-ui';c.fillText(s.solved.includes(i)?'✓':i+1,x+26,97);}c.fillStyle='#6a8fba55';c.fillRect(175,140,450,257);c.strokeStyle='#99c4e4';c.lineWidth=4;c.strokeRect(175,140,450,257);c.fillStyle='#0c1528';c.fillRect(180,180,440,212);c.fillStyle='#cedff5';c.font='bold 20px system-ui';c.fillText('KUTU '+(s.at+1)+' · GÖRÜŞ KAPALI',400,170);c.fillStyle='#425373';c.beginPath();c.ellipse(400,305,155,63,0,0,7);c.fill();c.fillStyle='#081020';c.beginPath();c.ellipse(400,305,120,42,0,0,7);c.fill();let x=s.last?s.last.x:390+Math.sin(s.gesture*10)*20,y=s.last?s.last.y:310;c.strokeStyle='#f0c9a5';c.lineWidth=27;c.lineCap='round';c.beginPath();c.moveTo(400,395);c.lineTo(x,y+25);c.stroke();c.fillStyle='#f4d4b7';c.beginPath();c.ellipse(x,y,22,28,-.3,0,7);c.fill();c.fillStyle='#f3d894';c.font='16px system-ui';c.fillText(s.solved.includes(s.at)?'TANINDI · BAŞKA KUTU SEÇ':'Nesneyi görmeden incele',400,430);}
root.Touch518={create,touch,answer,select,next,step,pointer,draw,item,norm,bank};
})(globalThis);
