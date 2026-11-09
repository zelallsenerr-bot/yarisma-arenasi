(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const frame = byId('game');
  const queue = new Map();
  const demoPlayer = { uniqueId: 'prova_yarismacisi' };
  const connection = byId('connection');
  let socket = null;
  let activePlayer = '';
  let sawChat = false;

  function renderQueue() {
    const list = byId('queue');
    list.replaceChildren(...Array.from(queue.values(), user => {
      const row = document.createElement('li');
      const choose = document.createElement('button');
      choose.type = 'button';
      choose.textContent = '@' + user;
      choose.addEventListener('click', () => {
        activePlayer = user;
        queue.delete(user);
        byId('player').textContent = '@' + user;
        byId('release').disabled = false;
        byId('answer').textContent = '';
        renderQueue();
      });
      row.append(choose);
      return row;
    }));
    byId('queue-empty').hidden = queue.size > 0;
    byId('clear').disabled = queue.size === 0;
  }

  function releasePlayer() {
    activePlayer = '';
    byId('player').textContent = 'Henüz seçilmedi.';
    byId('release').disabled = true;
    byId('answer').textContent = '';
  }

  function receiveChat(data) {
    const user = data?.uniqueId ?? data?.user?.uniqueId ?? data?.user?.displayId;
    const comment = data?.comment ?? data?.content;
    if (typeof user !== 'string' || !/^[\w.]{1,32}$/.test(user) || typeof comment !== 'string') return false;
    const handle = user.toLowerCase();
    const command = comment.trim().toLocaleUpperCase('tr-TR');
    if (command === 'KATIL' || command === 'KATİL') {
      if (handle !== activePlayer && !queue.has(handle) && queue.size < 50) {
        queue.set(handle, handle);
        renderQueue();
      }
    } else if (handle === activePlayer && /^[ABCD]$/.test(command)) {
      const accepted = frame.contentWindow?.ArenaMilyonerCanli?.choose(command);
      if (accepted) byId('answer').textContent = '@' + handle + ' · ' + command + ' işaretlendi.';
    }
    return true;
  }

  function setConnected(connecting) {
    byId('connect').disabled = connecting;
    byId('disconnect').disabled = !connecting;
    byId('demo').hidden = connecting;
  }

  byId('connect').onclick = () => {
    if (socket) return;
    releasePlayer();
    queue.clear();
    renderQueue();
    sawChat = false;
    setConnected(true);
    connection.textContent = 'TikFinity’ye bağlanılıyor…';
    let client;
    try {
      client = new WebSocket('ws://localhost:21213/');
    } catch {
      setConnected(false);
      connection.textContent = 'Tarayıcı yerel bağlantıyı açamadı. Paneli güncel Chrome’da aç.';
      return;
    }
    socket = client;
    client.onopen = () => {
      if (socket === client) connection.textContent = 'TikFinity bağlı. TikTok’tan ilk yorum bekleniyor.';
    };
    client.onmessage = event => {
      if (socket !== client || typeof event.data !== 'string' || event.data.length > 65536) return;
      let message;
      try { message = JSON.parse(event.data); } catch { return; }
      if (message?.event === 'chat' && receiveChat(message.data) && !sawChat) {
        sawChat = true;
        connection.textContent = 'TikTok yorumu alındı. Sohbet bağlantısı çalışıyor.';
      }
    };
    client.onclose = () => {
      if (socket !== client) return;
      socket = null;
      setConnected(false);
      connection.textContent = 'Bağlantı kapandı. TikFinity Desktop’u, yayın bağlantısını ve tarayıcının yerel ağ iznini kontrol et.';
    };
  };

  byId('disconnect').onclick = () => {
    const client = socket;
    socket = null;
    client?.close();
    setConnected(false);
    connection.textContent = 'Bağlantı kesildi.';
  };
  byId('release').onclick = releasePlayer;
  byId('clear').onclick = () => { queue.clear(); renderQueue(); };
  byId('demo-join').onclick = () => {
    if (!socket) receiveChat({ ...demoPlayer, comment: 'katıl' });
  };
  byId('demo-answers').onclick = event => {
    const letter = event.target.closest('[data-letter]')?.dataset.letter;
    if (!socket && letter) receiveChat({ ...demoPlayer, comment: letter });
  };
})();
