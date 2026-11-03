(() => {
  'use strict';
  const c = window.ARENA_ANALYTICS_CONFIG || {};
  const ready = /^G-[A-Z0-9]{5,20}$/.test(c.measurementId || '');
  document.getElementById('setupStatus').textContent = ready ? 'Ölçüm yapılandırılmış. Raporların görünmesi için ziyaretçilerden veri gelmesi gerekir.' : 'Kurulum henüz tamamlanmadı. Google Analytics ölçüm kimliği bağlandıktan sonra yeni ziyaretler ölçülebilir.';
  if (/^\d+$/.test(c.propertyId || '')) document.getElementById('openReports').href = 'https://analytics.google.com/analytics/web/#/p' + c.propertyId + '/reports/intelligenthome';
  const key = 'arena-analytics-exclude-v1';
  const status = document.getElementById('excludeStatus');
  function show() { try { status.textContent = localStorage.getItem(key) === 'yes' ? 'Bu tarayıcı ölçümden hariç tutuluyor.' : 'Bu tarayıcı, izin verilirse ölçüme dahil edilir.'; } catch (_) { status.textContent = 'Tarayıcı tercihleri saklanamıyor.'; } }
  document.getElementById('exclude').onclick = () => { try { localStorage.setItem(key, 'yes'); } catch (_) {} show(); };
  document.getElementById('include').onclick = () => { try { localStorage.removeItem(key); } catch (_) {} show(); };
  show();
})();
