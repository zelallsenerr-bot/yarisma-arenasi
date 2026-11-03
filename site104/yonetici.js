(() => {
 'use strict';
 const c=window.ARENA_METRICS_CONFIG||{},key='arena-admin-session-v1',$=id=>document.getElementById(id);
 let token='',expires=0,loadNumber=0;
 const configured=/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(c.supabaseUrl||'')&&/^(sb_publishable_|eyJ)/.test(c.publishableKey||'');
 const say=text=>{$('message').textContent=text};
 function clearSession(){token='';expires=0;try{sessionStorage.removeItem(key)}catch(_){}$('dashboard').hidden=true;$('loginPanel').hidden=false;$('games').replaceChildren();$('daily').replaceChildren();$('reports575').replaceChildren();$('reportsStatus575').textContent='';for(const id of ['visitors','visits','opens','minutes'])$(id).textContent='—';loadNumber++}
 function storeSession(t,exp){token=t;expires=exp;try{sessionStorage.setItem(key,JSON.stringify({token:t,expires:exp}))}catch(_){}}
 function callback(){
  const h=new URLSearchParams(location.hash.slice(1));
  if(h.has('access_token')||h.has('error')||h.has('refresh_token')){
   history.replaceState(null,'',location.pathname);
   if(h.get('error')){say('Giriş bağlantısı geçersiz veya süresi dolmuş. Yeni bağlantı iste.');return}
   const t=h.get('access_token'),type=h.get('token_type'),ttl=Number(h.get('expires_in'));
   if(t&&/^[-A-Za-z0-9_]+\.[-A-Za-z0-9_]+\.[-A-Za-z0-9_]+$/.test(t)&&type==='bearer'&&Number.isFinite(ttl)&&ttl>0)storeSession(t,Date.now()+Math.min(ttl,3600)*1000);
   // Refresh tokens are deliberately not retained in browser storage.
  }
  if(!token)try{const s=JSON.parse(sessionStorage.getItem(key)||'null');if(s&&s.expires>Date.now()&&typeof s.token==='string'){token=s.token;expires=s.expires}}catch(_){}
 }
 async function request(path,body,auth=false){
  const headers={apikey:c.publishableKey,'Content-Type':'application/json'};
  if(auth)headers.Authorization='Bearer '+token;
  const res=await fetch(c.supabaseUrl+path,{method:'POST',headers,body:JSON.stringify(body),credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'});
  if(!res.ok){const error=new Error('request');error.status=res.status;throw error}
  if(res.status===204)return null;return res.json();
 }
 const number=n=>new Intl.NumberFormat('tr-TR',{maximumFractionDigits:0}).format(Number(n)||0);
 function render(data){
  if(!data||!data.summary||!Array.isArray(data.games)||!Array.isArray(data.daily))throw new Error('Invalid report');
  const s=data.summary;$('visitors').textContent=number(s.played_games);$('visits').textContent=number(s.visits);$('opens').textContent=number(s.game_opens);$('minutes').textContent='—';
  $('periodText').textContent='Son '+data.days+' gün · Türkiye saati';$('empty').hidden=Number(s.visits)>0||Number(s.game_opens)>0;
  const max=Math.max(1,...data.daily.map(x=>Number(x.visits)||0));$('daily').replaceChildren();
  for(const row of data.daily){const div=document.createElement('div');div.className='day';const date=document.createElement('span');date.textContent=String(row.day).slice(5).split('-').reverse().join('.');const bar=document.createElement('b');bar.style.width=(100*(Number(row.visits)||0)/max)+'%';const count=document.createElement('span');count.textContent=number(row.visits);div.append(date,bar,count);$('daily').appendChild(div)}
  $('games').replaceChildren();
  for(const game of data.games){const tr=document.createElement('tr'),name=document.createElement('td');name.textContent=String(game.name);const category=document.createElement('small');category.textContent=String(game.category);name.appendChild(category);tr.appendChild(name);for(const value of [game.opens]){const td=document.createElement('td');td.textContent=number(value);tr.appendChild(td)}$('games').appendChild(tr)}
 }
 async function loadReports575(seq){try{const rows=await request('/rest/v1/rpc/arena_read_reports',{},true);if(seq!==loadNumber)return;if(!Array.isArray(rows))throw Error();const host=$('reports575');host.replaceChildren();$('reportsStatus575').textContent=rows.length?rows.length+' bildirim':'Henüz gönderilmiş bildirim yok.';for(const row of rows){const item=document.createElement('article');item.className='report575';const title=document.createElement('h4'),note=document.createElement('p'),meta=document.createElement('small'),label=document.createElement('label'),select=document.createElement('select');title.textContent=row.game_name+' · '+({question:'Soru / cevap',visual:'Görüntü',flow:'Oyun akışı',other:'Diğer'}[row.kind]||row.kind);note.textContent=row.note;meta.textContent=new Date(row.received_at).toLocaleString('tr-TR')+(row.question_id?' · Soru: '+row.question_id:'');label.textContent='Durum ';for(const [value,text]of [['new','Yeni'],['reviewed','İncelendi'],['resolved','Çözüldü']]){const opt=document.createElement('option');opt.value=value;opt.textContent=text;select.append(opt)}select.value=row.status;select.onchange=async()=>{select.disabled=true;try{await request('/rest/v1/rpc/arena_set_report_status',{p_id:row.id,p_status:select.value},true);if(seq!==loadNumber)return;$('reportsStatus575').textContent='Bildirim durumu güncellendi.'}catch(e){select.value=row.status;$('reportsStatus575').textContent='Durum kaydedilemedi. Tekrar dene.'}finally{select.disabled=false}};label.append(select);item.append(title,meta,note,label);host.append(item)}}catch(e){if(seq===loadNumber)$('reportsStatus575').textContent='Bildirimler yüklenemedi. Yenile düğmesiyle tekrar dene.'}}
 async function load(){
  if(!configured)return;if(!token||expires<=Date.now()){clearSession();say('Devam etmek için e-postanla giriş yap.');return}
  const seq=++loadNumber;$('refresh').disabled=true;$('range').disabled=true;say('İstatistikler yükleniyor…');
  try{const data=await request('/rest/v1/rpc/arena_read_counts',{p_days:Number($('range').value)},true);if(seq!==loadNumber)return;render(data);await loadReports575(seq);if(seq!==loadNumber)return;$('loginPanel').hidden=true;$('dashboard').hidden=false;say('Rapor güncellendi. Yalnızca yetkili yönetici hesabına gösterilir.')}
  catch(e){if(seq!==loadNumber)return;clearSession();say(e.status===401?'Oturum süresi doldu. Yeni giriş bağlantısı iste.':e.status===403?'Bu hesap raporları görmeye yetkili değil.':'Rapor alınamadı. Bağlantıyı kontrol edip yeniden giriş yap.')}
  finally{$('refresh').disabled=false;$('range').disabled=false}
 }
 $('loginForm').addEventListener('submit',async e=>{
  e.preventDefault();if(!configured)return;
  const email=$('email').value.trim(),password=$('password').value;
  if(!$('email').checkValidity()||!password)return;
  $('loginButton').disabled=true;say('Giriş yapılıyor…');
  try{
   const data=await request('/auth/v1/token?grant_type=password',{email,password});
   if(!data.access_token||!Number.isFinite(Number(data.expires_in)))throw new Error('Invalid session');
   storeSession(data.access_token,Date.now()+Math.min(Number(data.expires_in),3600)*1000);
   $('password').value='';await load();
  }catch(e){say(e.status===400||e.status===401?'E-posta veya yönetici şifresi hatalı.':e.status===429?'Çok sayıda giriş denemesi yapıldı. Güvenlik için bir süre bekle.':'Giriş yapılamadı. Bağlantını kontrol et.')}
  finally{$('password').value='';$('loginButton').disabled=false}
 });
 $('emailLogin').onclick=async()=>{
  if(!configured||!$('email').checkValidity()){$('email').reportValidity();return}
  $('emailLogin').disabled=true;say('Giriş bağlantısı isteniyor…');
  try{await request('/auth/v1/otp?redirect_to='+encodeURIComponent(location.origin+'/yonetici.html'),{email:$('email').value.trim(),create_user:false});say('Adres yetkili hesapta kayıtlıysa bağlantı gönderildi. E-posta ve spam klasörünü kontrol et.')}
  catch(e){say(e.status===429?'E-posta gönderim kotası doldu. Şifreyle giriş yapabilir veya kota yenilenince tekrar deneyebilirsin.':'Giriş e-postası gönderilemedi.')}
  finally{setTimeout(()=>{$('emailLogin').disabled=false},60000)}
 };
 $('setPasswordForm').addEventListener('submit',async e=>{
  e.preventDefault();const a=$('newPassword'),b=$('repeatPassword'),status=$('passwordStatus');
  if(a.value.length<12||a.value!==b.value){status.textContent='En az 12 karakter kullan ve iki alana aynı şifreyi yaz.';return}
  if(!token||expires<=Date.now()){status.textContent='Önce yönetici hesabına giriş yapmalısın.';return}
  $('setPasswordButton').disabled=true;status.textContent='Şifre kaydediliyor…';
  try{
   const res=await fetch(c.supabaseUrl+'/auth/v1/user',{method:'PUT',headers:{apikey:c.publishableKey,Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({password:a.value}),credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'});
   if(!res.ok)throw new Error('Password update failed');
   status.textContent='Yeni yönetici şifren kaydedildi. Sonraki girişlerde bu şifreyi kullanabilirsin.';
  }catch(_){status.textContent='Şifre kaydedilemedi. Oturumun dolmuş veya yeniden doğrulama gerekmiş olabilir. Yeni bir şifre belirleme bağlantısıyla tekrar dene.'}
  finally{a.value='';b.value='';$('setPasswordButton').disabled=false}
 });
 $('recoverPassword').onclick=async()=>{
  if(!configured||!$('email').checkValidity()){$('email').reportValidity();return}
  $('recoverPassword').disabled=true;
  try{await request('/auth/v1/recover?redirect_to='+encodeURIComponent(location.origin+'/yonetici.html'),{email:$('email').value.trim()});say('Adres kayıtlıysa şifre belirleme bağlantısı gönderildi. E-postadan açıp panelde yeni şifreni belirle.')}
  catch(e){say(e.status===429?'Supabase e-posta kotası henüz yenilenmedi. Doğrulama bağlantısıyla açtığın sekmede oturumun açıksa oradaki Şifre belirle alanını kullan. Oturum yoksa kota yenilenene kadar yeni bağlantı gönderilemez.':'Şifre belirleme e-postası gönderilemedi.')}
  finally{setTimeout(()=>{$('recoverPassword').disabled=false},60000)}
 };
 $('refresh').onclick=load;$('range').onchange=load;
 $('logout').onclick=async()=>{const t=token;clearSession();say('Çıkış yapıldı.');if(t)try{await fetch(c.supabaseUrl+'/auth/v1/logout',{method:'POST',headers:{apikey:c.publishableKey,Authorization:'Bearer '+t},credentials:'omit',referrerPolicy:'no-referrer'})}catch(_){}};
 callback();
 if(!configured){$('loginButton').disabled=true;say('Yönetici paneli hazır; veritabanı bağlantısı henüz tamamlanmadığı için giriş ve ölçüm kapalı.')}else if(token)load();
})();
