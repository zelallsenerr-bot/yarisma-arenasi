(() => {
  'use strict';
  const config = window.ARENA_ANALYTICS_CONFIG || {};
  const id = String(config.measurementId || '');
  const hosts = ['yarismaatolyesi.com', 'www.yarismaatolyesi.com'];
  const consentKey = 'arena-analytics-consent-v1';
  const excludeKey = 'arena-analytics-exclude-v1';
  const read = key => { try { return localStorage.getItem(key); } catch (_) { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch (_) {} };
  const webView = /;\s*wv\)|\bVersion\/\d.*Chrome\/.*Mobile Safari\//i.test(navigator.userAgent || '');
  const configured = /^G-[A-Z0-9]{5,20}$/.test(id) && hosts.includes(location.hostname);
  const blocked = () => read(excludeKey) === 'yes' || navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || (webView && !config.collectInWebView);
  let enabled = false, loaded = false, current = null, activeSince = null, elapsed = 0, panel;
  const catalog = () => window.ARENA_GAMES || [];
  const gameFrom = candidate => catalog().find(g => g.id === candidate?.id);
  const page = game => ({
    page_title: game ? game.name : 'Yarışma Arenası — Ana sayfa',
    page_location: location.origin + (game ? '/oyun/' + encodeURIComponent(game.id) : '/'),
    page_referrer: safeReferrer()
  });
  function safeReferrer() { try { return document.referrer ? new URL(document.referrer).origin + '/' : ''; } catch (_) { return ''; } }
  function event(name, data) {
    if (!enabled || blocked()) return;
    window.gtag('event', name, { ...page(current), ...data, send_to: id });
  }
  function tick() {
    const now = performance.now();
    if (activeSince !== null) elapsed += Math.max(0, now - activeSince);
    activeSince = enabled && current && !document.hidden ? now : null;
  }
  function flush() {
    tick();
    if (elapsed >= 1000 && current) event('game_engagement', { game_id: current.id, game_name: current.name, game_category: current.category, active_seconds: Math.floor(elapsed / 1000) });
    elapsed = 0;
  }
  function gameLoaded(candidate) {
    const game = gameFrom(candidate);
    if (!game || current?.id === game.id) return;
    flush(); current = game; elapsed = 0; activeSince = enabled && !document.hidden ? performance.now() : null;
    if (enabled) { event('page_view', page(game)); event('game_open', { game_id: game.id, game_name: game.name, game_category: game.category }); }
  }
  function leave(toHome = true) {
    const hadGame = current !== null;
    flush(); current = null; activeSince = null;
    if (hadGame && enabled && toHome) event('page_view', page(null));
  }
  function enable() {
    if (!configured || blocked() || read(consentKey) !== 'yes' || enabled) return;
    enabled = true;
    if (!loaded) {
      window['ga-disable-' + id] = false;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      window.gtag('js', new Date());
      window.gtag('config', id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 7776000, cookie_update: false, ...page(current) });
      const script = document.createElement('script'); script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      script.referrerPolicy = 'origin'; document.head.appendChild(script); loaded = true;
    }
    event('page_view', page(current));
    if (current) event('game_open', { game_id: current.id, game_name: current.name, game_category: current.category });
    elapsed = 0; activeSince = current && !document.hidden ? performance.now() : null;
  }
  function clearAnalyticsCookies() {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', '; domain=' + location.hostname, '; domain=.yarismaatolyesi.com']) document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax';
    }
  }
  function consent(value) {
    if (value !== 'yes' && value !== 'no') return;
    write(consentKey, value);
    if (panel) panel.hidden = true;
    if (value === 'yes') enable();
    else {
      enabled = false; activeSince = null; elapsed = 0;
      window['ga-disable-' + id] = true;
      clearAnalyticsCookies();
      if (loaded) location.reload();
    }
  }
  function preferences() {
    if (!configured || blocked()) return;
    if (!panel) {
      const style = document.createElement('style');
      style.textContent = '#arenaAnalyticsConsent{position:fixed;bottom:90px;left:16px;right:16px;max-width:560px;margin:auto;padding:22px;background:#19112f;color:#fff;border:1px solid #b89b60;border-radius:18px;z-index:100000;box-shadow:0 12px 60px #000b;font:16px/1.5 system-ui}#arenaAnalyticsConsent[hidden]{display:none}#arenaAnalyticsConsent p{margin:8px 0 16px}#arenaAnalyticsConsent a{color:#e9c879}#arenaAnalyticsConsent button{border:1px solid #d5b068;border-radius:9px;padding:10px 16px;margin:4px;background:#35224c;color:#fff;font:inherit;cursor:pointer}';
      document.head.appendChild(style);
      panel = document.createElement('section'); panel.id = 'arenaAnalyticsConsent'; panel.setAttribute('aria-label', 'İsteğe bağlı kullanım istatistikleri');
      const heading = document.createElement('strong'); heading.textContent = 'Kullanım istatistikleri'; panel.appendChild(heading);
      const p = document.createElement('p'); p.textContent = 'Hangi oyunların ilgi gördüğünü anlamak için Google Analytics kullanmamıza izin verir misin? Tercihin oyunlara erişimini etkilemez. Raporlar ziyaretçilere gösterilmez.'; panel.appendChild(p);
      const more = document.createElement('a'); more.href = 'privacy.html#istatistik'; more.textContent = 'Gizlilik bilgisi'; panel.appendChild(more);
      const buttons = document.createElement('div');
      for (const [label, value] of [['İzin verme', 'no'], ['İzin ver', 'yes']]) { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.addEventListener('click', () => consent(value)); buttons.appendChild(b); }
      panel.appendChild(buttons); document.body.appendChild(panel);
    }
    panel.hidden = false;
  }
  window.ArenaAnalytics = Object.freeze({ gameLoaded, leave, preferences, consent, get configured() { return configured; } });
  document.addEventListener('visibilitychange', () => { flush(); activeSince = enabled && current && !document.hidden ? performance.now() : null; });
  window.addEventListener('pagehide', () => { flush(); activeSince = null; });
  window.addEventListener('pageshow', () => { activeSince = enabled && current && !document.hidden ? performance.now() : null; });
  window.addEventListener('storage', e => { if ((e.key === consentKey && e.newValue !== 'yes') || (e.key === excludeKey && e.newValue === 'yes')) { enabled = false; window['ga-disable-' + id] = true; location.reload(); } });
  setInterval(flush, 60000);
  function ready() {
    const trigger = document.getElementById('analyticsPreferences');
    if (trigger) { trigger.hidden = !configured || blocked(); trigger.addEventListener('click', preferences); }
    if (!configured || blocked()) return;
    if (read(consentKey) === 'yes') enable(); else if (read(consentKey) !== 'no') preferences();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
