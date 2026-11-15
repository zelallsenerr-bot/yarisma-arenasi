const scenes = [
  { title: 'Serada bir sabah', colors: ['#8fc889', '#514426'], props: [
    ['🪴', 'Fide', 'Fideyi tezgâhın soluna bırakıyoruz.'],
    ['🧤', 'Eldiven', 'Ortada bahçe eldiveni duruyor.'],
    ['🪣', 'Kova', 'Kova sağ tarafta, kapının yanında.'],
  ], question: 'Ortada ve sağda hangi eşyalar vardı?', options: ['Eldiven ve kova', 'Fide ve eldiven', 'Kova ve fide', 'Eldiven ve fide'] },
  { title: 'Bisiklet atölyesi', colors: ['#7c9ac4', '#553943'], props: [
    ['🧰', 'Alet kutusu', 'Alet kutusu sol tarafta.'],
    ['🚲', 'Bisiklet', 'Bisikleti ortaya alıyoruz.'],
    ['🔦', 'El feneri', 'El feneri sağdaki rafta.'],
  ], question: 'Bisikletin solunda ve sağında sırasıyla ne vardı?', options: ['Alet kutusu ve el feneri', 'El feneri ve alet kutusu', 'Kask ve pompa', 'Alet kutusu ve kask'] },
  { title: 'Sahilde piknik', colors: ['#70abc9', '#83522d'], props: [
    ['🧺', 'Sepet', 'Piknik sepeti sol tarafta.'],
    ['🍉', 'Karpuz', 'Ortaya dilimlenmiş karpuz koyuyoruz.'],
    ['📕', 'Kitap', 'Sağ tarafta bir kitap var.'],
  ], question: 'Sahnede hem hangi yiyecek hem hangi eşya vardı?', options: ['Karpuz ve kitap', 'Elma ve kitap', 'Karpuz ve termos', 'Ekmek ve termos'] },
];

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function startScene(app, home, now = () => performance.now()) {
  const deck = shuffle(scenes);
  let round = 0;
  let correct = 0;
  let timer;
  function add(label, action, primary = false, target = '.row') {
    const button = document.createElement('button');
    button.textContent = label;
    button.classList.toggle('primary', primary);
    button.onclick = action;
    app.querySelector(target).append(button);
    return button;
  }
  function stop() {
    clearInterval(timer);
    window.speechSynthesis?.cancel();
  }
  function leave() {
    stop();
    home();
  }
  function intro() {
    if (round === deck.length) {
      app.innerHTML = '<section class="stage"><h1>Yarışma tamamlandı</h1><p class="score"></p><div class="row"></div></section>';
      app.querySelector('.score').textContent = correct + ' / ' + deck.length + ' doğru';
      add('Yeniden başlat', () => startScene(app, home), true);
      add('Oyunlara dön', leave);
      return;
    }
    app.innerHTML = '<h1>Sahne Hafızası</h1><section class="stage"><p class="scene-progress"></p><p>Sahneyi izle. Ardından iki ayrıntıyı bir araya getiren soruyu yanıtla.</p><div class="row"></div></section>';
    app.querySelector('.scene-progress').textContent = 'Sahne ' + (round + 1) + ' / ' + deck.length;
    add('Sahneyi izle · 30 sn', () => watch(false), true);
    const voice = window.speechSynthesis?.getVoices().find(item => /^tr(?:-|$)/i.test(item.lang));
    if (voice) add('Türkçe anlatımla izle', () => watch(true, voice));
    add('Oyunlara dön', leave);
  }
  function watch(narrate, voice) {
    const scene = deck[round];
    const started = now();
    let shown = -1;
    app.innerHTML = '<h1>Sahne Hafızası</h1><section class="stage"><div class="bar"><strong class="scene-title"></strong><span class="scene-time"></span></div><div class="scene-set"></div><p class="scene-caption" role="status"></p><div class="row"></div></section>';
    app.querySelector('.scene-title').textContent = scene.title;
    const set = app.querySelector('.scene-set');
    set.style.setProperty('--sky', scene.colors[0]);
    set.style.setProperty('--ground', scene.colors[1]);
    const caption = app.querySelector('.scene-caption');
    const clock = app.querySelector('.scene-time');
    const slots = scene.props.map(([icon, label]) => {
      const slot = document.createElement('div');
      slot.className = 'scene-prop';
      slot.hidden = true;
      const graphic = document.createElement('span');
      graphic.textContent = icon;
      graphic.setAttribute('aria-hidden', 'true');
      slot.append(graphic, document.createTextNode(label));
      set.append(slot);
      return slot;
    });
    add('Oyunlara dön', leave);
    function tick() {
      const elapsed = (now() - started) / 1000;
      if (elapsed >= 30) {
        stop();
        ask(scene);
        return;
      }
      clock.textContent = Math.ceil(30 - elapsed) + ' sn';
      const step = Math.min(2, Math.floor(elapsed / 10));
      if (shown === step) return;
      shown = step;
      slots.forEach((slot, index) => { slot.hidden = index > step; });
      caption.textContent = scene.props[step][2];
      if (narrate) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(caption.textContent);
        utterance.voice = voice;
        utterance.lang = voice.lang;
        window.speechSynthesis.speak(utterance);
      }
    }
    timer = setInterval(tick, 100);
    tick();
  }
  function ask(scene) {
    app.innerHTML = '<h1>Sahne Hafızası</h1><section class="stage"><h2></h2><div class="choices"></div><p class="feedback" role="status"></p><div class="row"></div></section>';
    app.querySelector('h2').textContent = scene.question;
    for (const option of shuffle(scene.options)) {
      add(option, () => {
        const ok = option === scene.options[0];
        correct += Number(ok);
        app.querySelectorAll('.choices button').forEach(button => { button.disabled = true; });
        app.querySelector('.feedback').textContent = ok ? 'Doğru!' : 'Doğru cevap: ' + scene.options[0];
        round++;
        add(round === deck.length ? 'Sonucu gör' : 'Sonraki sahne', intro, true).focus();
      }, false, '.choices');
    }
    add('Oyunlara dön', leave);
  }
  intro();
}
