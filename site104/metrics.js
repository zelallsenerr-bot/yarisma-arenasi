(() => {
  'use strict';
  if (window.ArenaMetrics) return;

  const config = window.ARENA_METRICS_CONFIG || {};
  const configured = config.collectionEnabled === true
    && /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(config.supabaseUrl || '')
    && /^(sb_publishable_|eyJ)/.test(config.publishableKey || '');
  const supportedHost = ['yarismaatolyesi.com', 'www.yarismaatolyesi.com'].includes(location.hostname);
  const isAdmin = location.pathname === '/yonetici.html';
  const webview = /;\s*wv\)|\bVersion\/\d.*Chrome\/.*Mobile Safari\//i.test(navigator.userAgent || '');
  const blocked = () => !supportedHost || navigator.doNotTrack === '1'
    || navigator.globalPrivacyControl === true || (webview && !config.collectInWebView);
  const browserKey = 'arena-visit-browser-v2';
  const excludedKey = 'arena-visit-excluded-v2';
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  function getOrCreateBrowserId() {
    const saved = localStorage.getItem(browserKey);
    if (uuid.test(saved || '')) return saved;
    const id = crypto.randomUUID();
    localStorage.setItem(browserKey, id);
    return id;
  }

  async function browserId() {
    try {
      if (navigator.locks) return await navigator.locks.request(browserKey, getOrCreateBrowserId);
      return getOrCreateBrowserId();
    } catch (_) {
      // A browser that cannot persist a key must not count on every load.
      return null;
    }
  }

  async function rpc(name, body, token) {
    const headers = { apikey: config.publishableKey, 'Content-Type': 'application/json' };
    if (token) headers.Authorization = 'Bearer ' + token;
    else if (config.publishableKey.startsWith('eyJ')) headers.Authorization = 'Bearer ' + config.publishableKey;
    const response = await fetch(config.supabaseUrl + '/rest/v1/rpc/' + name, {
      method: 'POST', headers, body: JSON.stringify(body), credentials: 'omit',
      cache: 'no-store', referrerPolicy: 'no-referrer', keepalive: true
    });
    return response.ok;
  }

  async function recordVisit() {
    if (!configured || blocked()) return;
    const id = await browserId();
    if (!id) return;
    try {
      if (localStorage.getItem(excludedKey) === id) return;
      await rpc('arena_record_browser_visit', { p_browser_id: id });
    } catch (_) {}
  }

  async function excludeAdminBrowser(token) {
    if (!isAdmin || !configured || !supportedHost || !token) return false;
    const id = await browserId();
    if (!id) return false;
    try {
      if (!await rpc('arena_exclude_browser', { p_browser_id: id }, token)) return false;
      localStorage.setItem(excludedKey, id);
      return true;
    } catch (_) { return false; }
  }

  let current = null;
  function gameLoaded(candidate) {
    const game = (window.ARENA_GAMES || []).find(g => g.id === candidate?.id);
    if (!game || current === game.id) return;
    current = game.id;
    if (configured && !blocked()) rpc('arena_record_count', { p_kind: 'game_open', p_game_id: game.id }).catch(() => {});
  }

  window.ArenaMetrics = Object.freeze({ gameLoaded, excludeAdminBrowser,
    leave() { current = null; }, get configured() { return configured; } });
  if (!isAdmin) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', recordVisit, { once: true });
    else recordVisit();
  }
})();
