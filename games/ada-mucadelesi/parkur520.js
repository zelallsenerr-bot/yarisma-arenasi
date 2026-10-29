/* Survivor 520: game-local course presentation and contextual controls. */
(()=>{'use strict';
const oldObstacle=drawObstacle,oldDraw=draw,oldAim=drawAim;
const palette=['#e8bf7f','#789b8c','#6b94a0','#bca17e','#d0a27a','#95aaa4','#86b8bb','#d1bc91','#9ba775'];
function box(g,x,y,w,h,color){g.fillStyle=color;g.fillRect(x,y,w,h)}
function text(g,t,x,y,size=12,color='#fff',align='left'){g.font='700 '+size+'px system-ui';g.textAlign=align;g.fillStyle=color;g.fillText(t,x,y)}
function line(g,x,y,u,v,c,w=2){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(x,y);g.lineTo(u,v);g.stroke()}
drawObstacle=function(g,x,y,o){if(x<-350||x>960)return;g.save();g.shadowColor='#102a2755';g.shadowBlur=5;g.shadowOffsetY=6;
if(o.type==='beam'){box(g,x,y+2,o.w,27,'#295967');for(let i=0;i<o.w;i+=15){line(g,x+i,y+13,x+i+10,y+13,'#91c8c4',2)}box(g,x-6,y-6,o.w+12,10,'#b47a46');box(g,x-6,y-8,o.w+12,3,'#f5ce8e');for(let i=10;i<o.w;i+=55){box(g,x+i,y,7,36,'#5f442c')}line(g,x,y-40,x+o.w,y-40,'#d9c8a2',2);box(g,x,y-45,5,50,'#785d3f');box(g,x+o.w-5,y-45,5,50,'#785d3f')}
else if(o.type==='pendulum'){box(g,x-15,y-124,8,128,'#253d43');box(g,x+o.w+8,y-124,8,128,'#253d43');box(g,x-20,y-128,o.w+44,9,'#eca859');let swing=E.pendulum(s.race,o),cx=x+o.w/2+swing*48,cy=y-38+Math.abs(swing)*20;line(g,x+o.w/2,y-122,cx,cy,'#dfd3ae',4);g.fillStyle='#df624c';g.beginPath();g.arc(cx,cy,24,0,Math.PI*2);g.fill();g.strokeStyle='#ffc2a0';g.lineWidth=3;g.stroke();line(g,cx-16,cy,cx+16,cy,'#6b3026',5)}
else if(o.type==='mud'){box(g,x,y,o.w,30,'#6a5140');for(let i=0;i<o.w;i+=23){g.fillStyle='#96816a';g.beginPath();g.ellipse(x+i+8,y+9+(i%3)*3,14,4,0,0,Math.PI*2);g.fill()}}
else{oldObstacle(g,x,y,o);if(o.type==='bar'){for(let a=0;a<o.w;a+=18){line(g,x+a,y-67,x+a+14,y-50,'#dfa65f',3)}box(g,x,y-53,o.w,4,'#443b30')}if(o.type==='wall'){for(let k=10;k<65;k+=15){box(g,x+8+(k%3)*6,y-k,13,5,'#df9b54')}}if(o.type==='gap'){box(g,x,y+6,o.w,24,'#2c7582');for(let k=0;k<o.w;k+=24)line(g,x+k,y+14,x+k+15,y+14,'#8bbfc2',2)}}
g.shadowBlur=0;g.shadowOffsetY=0;box(g,x-4,y+35,Math.max(o.w+8,98),19,'#102c32dd');text(g,E.labels[o.type],x+o.w/2,y+48,10,'#f2e2be','center');g.restore()};
// Keep the chosen contestant's identity, while changing the whole-body pose for the obstacle.
const originalPerson=person;
person=function(g,x,y,p,col,t){g.save();g.translate(x,y);if(p.water){g.translate(0,27);g.scale(1,.68)}else if(p.climb>0){g.translate(0,-p.climb*65);g.rotate(-.16)}else if(p.beam){g.rotate(p.balance*.25)}else if(p.stumble>0){g.rotate(Math.sin(p.stumble*12)*.2)}else if(p.y>5){g.rotate(-.14)}originalPerson(g,0,0,p,col,t);g.restore()};
draw=function(){if(!s||s.phase!=='race')return;let r=s.race;if(!r.version520){oldDraw();return}let cv=$('canvas');if(!cv)return;let g=cv.getContext('2d'),p=r.racers[0],camera=E.clamp(p.x-240,0,r.finish-630),n=r.racers.length;g.clearRect(0,0,900,440);
let sky=g.createLinearGradient(0,0,0,220);sky.addColorStop(0,'#587d87');sky.addColorStop(.7,'#bdcfc7');sky.addColorStop(1,'#e8d6af');g.fillStyle=sky;g.fillRect(0,0,900,440);g.fillStyle='#fce1a4';g.beginPath();g.arc(765,60,25,0,Math.PI*2);g.fill();
for(let layer=0;layer<3;layer++){g.fillStyle=['#839d8d','#547d6d','#356355'][layer];g.beginPath();g.moveTo(0,210);for(let x=0;x<=950;x+=30)g.lineTo(x,145+layer*13+Math.sin((x+camera*(.03+layer*.04))/130)*18+Math.sin(x/47)*5);g.lineTo(950,240);g.lineTo(0,240);g.fill()}
box(g,0,193,900,47,'#477d83');for(let i=0;i<17;i++){let x=((i*75-camera*.15-r.time*8)%1000+1000)%1000;line(g,x,203+i%4*6,x+35,203+i%4*6,'#b5d6c460',2)}
for(let i=0;i<8;i++)palm(g,((i*210-camera*.28)%1600+1600)%1600-180,235,.65+(i%3)*.12);
box(g,0,235,900,205,palette[r.layout]);
if(p.stage==='aim'){oldAim(g,r,p);text(g,'FINALE KALAN 3 ATIŞ',450,120,18,'#fff1c8','center')}
else{for(let j=0;j<n;j++){let y=n===3?235+j*86:265+j*120;box(g,0,y+2,900,59,j?'#b79c72':'#d9bd88');box(g,0,y+53,900,8,'#806b4a');line(g,0,y+2,900,y+2,j?'#73b8d3':'#f2997b',3);for(let k=0;k<45;k++){let xx=((k*71-camera)%950+950)%950;box(g,xx,y+14+(k%3)*10,3,2,'#69543a30')}
for(let o of E.layouts[r.layout])drawObstacle(g,o.x-camera,y,o);let end=r.finish-camera;box(g,end,y-110,6,115,'#ddd8bb');for(let k=0;k<6;k++)box(g,end,y-110+k*7,36,7,k%2?'#1d373b':'#f1e8ce');
let a=r.racers[j],xx=a.x-camera;if(xx>-40&&xx<940){person(g,xx,y-a.y,a,color(a.id),r.time);let lx=E.clamp(xx+95,64,836);box(g,lx-62,y-a.y-136-(a.climb||0)*38,124,22,'#102c33e8');text(g,s.players[a.id].name,lx,y-a.y-121-(a.climb||0)*38,11,'#f4ecd7','center');if(a.climb>0){box(g,xx-27,y-103,54,6,'#213c3b');box(g,xx-27,y-103,a.climb*54,6,'#edca7e')}}else{text(g,'← '+s.players[a.id].name,18,y-62,11,'#13353c')}
}}
// A compact course map keeps both competitors visible even when the camera follows the player.
box(g,12,10,876,51,'#102b32ee');text(g,'SURVIVOR / '+E.names[r.layout],25,29,12,'#f1d491');text(g,r.time.toFixed(1)+' sn',872,29,12,'#fff','right');let mapX=320,mapW=470;line(g,mapX,35,mapX+mapW,35,'#536d6c',4);for(let o of E.layouts[r.layout])box(g,mapX+o.x/r.finish*mapW,31,3,9,'#c1c4a7');r.racers.forEach((a,j)=>{g.fillStyle=color(a.id);g.beginPath();g.arc(mapX+a.x/r.finish*mapW,30+j*11,5,0,Math.PI*2);g.fill()});text(g,'HEDEF '+p.hits+'/3',872,49,10,'#fff','right');text(g,'SERİ '+(p.combo||0)+' · HATA '+(p.mistakes||0),25,49,10,'#b9cecc');
let next=E.layouts[r.layout].find(o=>!p.passed.includes(o.x)&&o.x+o.w>=p.x),distance=next?Math.max(0,Math.round(next.x-p.x)):0;
let msg='Deparı açık alanlarda kullan; engel öncesi enerjini koru.',action='↑ ZIPLA',left='↓ EĞİL',right='⚡ DEPAR';
if(next){msg=E.labels[next.type]+' · '+(distance>0?distance+' m · ':'')+({hurdle:'Yaklaşınca zıpla.',bar:'EĞİL tuşunu geçiş boyunca basılı tut.',wall:'Ana butona düzenli ritimle dokun.',water:'YÜZ tuşuna ritimli dokunarak hızlan.',gap:'DEPAR basılıyken kenara yakın zıpla.',beam:'Göstergeyi ortada tut: SOL / SAĞ ile dengele.',pendulum:'Sallanan topu izle; altında eğilerek geç.',mud:'Deparla çamuru daha hızlı aş; enerjini kontrol et.'}[next.type])}
if(E.near(r,p,'wall'))action='↑ TIRMAN';else if(p.water)action='≈ YÜZ';
if(p.beam){left='← SOLA DENGELE';right='SAĞA DENGELE →';action='DENGEYİ KORU';box(g,300,85,300,42,'#102b32ef');text(g,'DENGE',450,101,10,'#f2d598','center');box(g,330,111,240,6,'#a85e4f');box(g,420,111,60,6,'#7ecbb0');box(g,447+p.balance*116,106,6,16,'#fff3c6')}
if(p.stage==='aim'){action=p.shotAxis===0?'◎ YATAY NİŞANI KİLİTLE':'🎯 ATIŞ YAP';msg=p.shotAxis===0?'Yatay nişan merkeze geldiğinde kilitle. Rüzgâr yönünü hesaba kat.':'Şimdi dikey nişanı merkeze getirip atış yap.'}
$('action').textContent=action;$('action').disabled=!!p.beam||r.countdown>0;$('slide').innerHTML=left+'<small>Basılı tut</small>';$('sprint').innerHTML=right+'<small>Basılı tut</small>';$('slide').disabled=$('sprint').disabled=p.stage==='aim'||r.countdown>0;$('message').textContent=p.feedbackUntil>r.time?p.feedback:msg;$('racetime').textContent=r.time.toFixed(1)+' sn';$('stamina').textContent='ENERJİ %'+Math.round(p.stamina);$('position').textContent=p.stage==='aim'?'HEDEF ATIŞI':Math.round(p.x/r.finish*100)+'%';
if(p.feedbackUntil>r.time){box(g,270,402,420,27,'#102c33eb');text(g,p.feedback,480,421,12,p.penalty>0?'#ffc1a4':'#bceccc','center')}
if(r.countdown>0){box(g,0,0,900,440,'#071f3077');text(g,String(Math.ceil(r.countdown)),450,220,90,'#ffe3a1','center');text(g,'HAZIRLAN · ENGELİ OKU · RİTMİNİ BUL',450,261,15,'#fff','center')}
};
window.addEventListener('blur',()=>{controls.slide=false;controls.sprint=false});
// A finger released outside the button must never leave sprint/slide latched.
document.addEventListener('pointerup',()=>{controls.slide=false;controls.sprint=false});
})();
