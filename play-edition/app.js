import { startScene } from './scene.js';

const questions = [
  { text: 'Bir üçgenin iç açılarının toplamı kaç derecedir?', choices: ['90', '180', '270', '360'], right: 1 },
  { text: 'Fotoğraf makinesinde diyafram hangi özelliği doğrudan değiştirir?', choices: ['Dosya adı', 'Bellek kapasitesi', 'Işık açıklığı', 'Pil gerilimi'], right: 2 },
  { text: 'Bir metronom müzisyene hangi bilgiyi verir?', choices: ['Tempo', 'Şarkı sözü', 'Nota adı', 'Akort sıklığı'], right: 0 },
  { text: '1 kilometreyi 4 dakikada koşan biri aynı hızla 3 kilometreyi ne kadar sürede koşar?', choices: ['7 dakika', '8 dakika', '10 dakika', '12 dakika'], right: 3 },
  { text: 'Elektrik devresinde açık anahtar ne yapar?', choices: ['Akımı keser', 'Pilin yönünü değiştirir', 'Gerilimi ikiye katlar', 'Devreye paralel direnç ekler'], right: 0 },
  { text: 'Haritada 1:100.000 ölçek kullanılıyorsa 1 cm gerçekte ne kadardır?', choices: ['10 m', '1 km', '100 km', '100 m'], right: 1 },
  { text: 'Bir zarın karşılıklı yüzlerindeki sayıların toplamı standart dizilimde kaçtır?', choices: ['5', '6', '7', '8'], right: 2 },
  { text: 'Bir sayının yüzde 25’i 15 ise sayı kaçtır?', choices: ['30', '45', '75', '60'], right: 3 },
  { text: 'Suyun sıvı hâlden gaz hâline geçmesinin genel adı nedir?', choices: ['Yoğuşma', 'Buharlaşma', 'Donma', 'Erime'], right: 1 },
  { text: 'Bir daireyi iki eş parçaya bölen, merkezden geçen kiriş nedir?', choices: ['Çap', 'Yay', 'Teğet', 'Yarıçap'], right: 0 },
];

const app = document.querySelector('#app');
const number = new Intl.NumberFormat('tr-TR');
let duelTimer;

function button(label, action, { primary = false, disabled = false } = {}) {
  const node = document.createElement('button');
  node.type = 'button';
  node.textContent = label;
  node.disabled = disabled;
  if (primary) node.classList.add('primary');
  node.addEventListener('click', action);
  return node;
}

function shuffled(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function home() {
  clearInterval(duelTimer);
  app.innerHTML = '<h1>Yarışma Atölyesi</h1><div class="tiles"><article class="card"><strong class="accent">Bilgi düellosu</strong><h2>Zaman Pisti</h2><p>Soruları süre dolmadan yanıtla. Seri bonusuyla pistte ilerle.</p><div id="duel-start"></div></article><article class="card"><strong class="accent">Strateji oyunu</strong><h2>Dokuz Kasa</h2><p>Kasalarından çıkan puanları biriktir. Çarpanları ne zaman kullanacağına karar ver.</p><div id="crate-start"></div></article><article class="card"><strong class="accent">Dikkat oyunu</strong><h2>Sahne Hafızası</h2><p>30 saniyelik sahneyi izle ve iki ayrıntıyı birlikte hatırla.</p><div id="scene-start"></div></article></div>';
  document.querySelector('#duel-start').append(button('Zaman Pisti’ni başlat', startDuel, { primary: true }));
  document.querySelector('#crate-start').append(button('Dokuz Kasa’yı başlat', startCrates, { primary: true }));
  document.querySelector('#scene-start').append(button('Sahne Hafızası’nı başlat', () => startScene(app, home), { primary: true }));
}

function finish(title, points, summary, restart) {
  clearInterval(duelTimer);
  app.innerHTML = '<section class="stage"><h1></h1><div class="score"></div><p></p><div class="row"></div></section>';
  app.querySelector('h1').textContent = title;
  app.querySelector('.score').textContent = number.format(points) + ' puan';
  app.querySelector('p').textContent = summary;
  app.querySelector('.row').append(button('Yeniden başlat', restart, { primary: true }), button('Oyunlara dön', home));
}

function startDuel() {
  const round = shuffled(questions).slice(0, 6);
  let index = 0;
  let score = 0;
  let correct = 0;
  let streak = 0;
  let usedPass = false;
  function next() {
    clearInterval(duelTimer);
    if (index === round.length) {
      finish('Pist tamamlandı', score, correct + ' doğru / ' + round.length + ' soru', startDuel);
      return;
    }
    const question = round[index];
    const deadline = performance.now() + 18000;
    let answered = false;
    app.innerHTML = '<h1>Zaman Pisti</h1><section class="stage"><div class="bar"><span id="round"></span><strong id="time"></strong><span id="points"></span></div><p>Sunucu Deniz</p><h2 id="question"></h2><div class="choices"></div><p class="feedback" role="status"></p><div class="row"></div></section>';
    const get = id => document.getElementById(id);
    get('round').textContent = (index + 1) + ' / ' + round.length;
    get('points').textContent = score + ' puan';
    get('question').textContent = question.text;
    const controls = app.querySelector('.row');
    const options = app.querySelector('.choices');
    function reveal(choice, passed = false) {
      if (answered) return;
      answered = true;
      clearInterval(duelTimer);
      if (passed) usedPass = true;
      const ok = choice === question.right;
      streak = ok ? streak + 1 : 0;
      if (ok) {
        correct++;
        score += 100 + 25 * (streak - 1);
      }
      get('points').textContent = score + ' puan';
      app.querySelector('.feedback').textContent = (ok ? 'Doğru.' : passed ? 'Pas geçildi.' : choice === null ? 'Süre doldu.' : 'Yanlış.') + ' Cevap: ' + question.choices[question.right];
      options.querySelectorAll('button').forEach(node => { node.disabled = true; });
      index++;
      const advance = button(index === round.length ? 'Sonucu gör' : 'Sonraki soru', next, { primary: true });
      controls.replaceChildren(advance, button('Oyunlara dön', home));
      advance.focus();
    }
    function tick() {
      const remaining = Math.max(0, Math.ceil((deadline - performance.now()) / 1000));
      get('time').textContent = remaining + ' sn';
      if (!remaining) reveal(null);
    }
    shuffled(question.choices.map((label, id) => ({ label, id }))).forEach(({ label, id }) => {
      options.append(button(label, () => performance.now() < deadline ? reveal(id) : reveal(null)));
    });
    controls.append(button('Pas geç', () => reveal(null, true), { disabled: usedPass }), button('Oyunlara dön', home));
    duelTimer = setInterval(tick, 200);
    tick();
  }
  next();
}

function startCrates() {
  const amounts = shuffled([0, 0, 50, 80, 120, 170, 230, 300, 400]);
  const opened = new Set();
  let score = 0;
  let charge = true;
  let boosted = false;
  let last = '';
  function draw() {
    app.innerHTML = '<h1>Dokuz Kasa</h1><section class="stage"><div class="bar"><span id="moves"></span><strong id="points"></strong></div><p>Sunucu Ada</p><p>Beş kasa açabilirsin. Bir kez çarpan kullanarak sıradaki kasanın puanını ikiye katla.</p><div class="board" aria-label="Dokuz kasa"></div><p class="feedback" role="status"></p><div class="row"></div></section>';
    document.getElementById('moves').textContent = (5 - opened.size) + ' açma hakkı';
    document.getElementById('points').textContent = score + ' puan';
    app.querySelector('.feedback').textContent = last;
    const board = app.querySelector('.board');
    amounts.forEach((amount, index) => {
      const spent = opened.has(index);
      const label = 'Kasa ' + (index + 1) + (spent ? ' · ' + amount : '');
      const option = button(label, () => {
        const reward = amount * (boosted ? 2 : 1);
        last = (index + 1) + '. kasa: +' + reward + ' puan' + (boosted ? ' · İki kat çarpan kullanıldı.' : '.');
        opened.add(index);
        score += reward;
        boosted = false;
        draw();
        app.querySelector('.board button:not(:disabled)')?.focus();
      }, { disabled: spent || opened.size === 5 });
      if (spent) option.classList.add('spent');
      board.append(option);
    });
    const controls = app.querySelector('.row');
    if (opened.size === 5) {
      const summary = button('Sonucu gör', () => finish('Kasalar kapandı', score, last, startCrates), { primary: true });
      controls.append(summary);
      summary.focus();
    } else {
      controls.append(button(boosted ? 'Çarpan hazır' : 'İki kat çarpanı kullan', () => {
        charge = false;
        boosted = true;
        last = 'Sıradaki kasa iki kat puan verecek.';
        draw();
        app.querySelector('.board button:not(:disabled)')?.focus();
      }, { disabled: !charge }));
    }
    controls.append(button('Oyunlara dön', home));
  }
  draw();
}

home();
