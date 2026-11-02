/* Authentic presenter photographs; display only, never advances a game or changes its clock. */
(()=>{'use strict';
const data=window.ArenaPresentersData210||{},id=document.body?.dataset.game||location.pathname.split('/games/')[1]?.split('/')[0],cfg=data[id];
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let serial=0;
const labels={standing:'Sunucu',seated:'Sunucu',table:'Sunucu',field:'Oyun sunucusu',jury:'Şef jürisi',control:'Kontrol odası',backstage:'Sahne arkası sunucusu',duo:'Sunucular',moderator:'Oyun sunucusu',native:'Sunucu',driver:'Sunucu · sürücü'};
function svg(key=id,opts={}){const c=typeof key==='object'?key:data[key];if(!c?.asset||!c.name)return '';const pose=!c.outline&&window.ArenaStudio211?.bodySVG(c.name,c.mode==='seated'?'seated':'standing');if(pose)return pose;const [w,h]=c.size||data[id].size,rect=opts.portrait?portraitCrop(c):c.crop,clip='presenter210-'+(++serial),outline=!opts.portrait&&c.outline;
return '<svg class="presenter-photo210" viewBox="'+rect.join(' ')+'" preserveAspectRatio="xMidYMid meet" role="img" aria-label="'+escape(c.name)+'"><title>'+escape(c.name)+'</title>'+(outline?'<defs><clipPath id="'+clip+'"><polygon points="'+outline.map(p=>p.join(',')).join(' ')+'"/></clipPath></defs>':'')+'<image href="../../'+escape(c.asset)+'" width="'+w+'" height="'+h+'"'+(outline?' clip-path="url(#'+clip+')"':'')+'/></svg>';}
function portraitCrop(c){if(c.faceCrop)return c.faceCrop;return c.crop;}
function figure(key=id,compact=false){const c=data[key];if(!c?.verified)return '';return '<figure class="presenter-figure210 '+(compact?'compact210':'')+'" data-presenter210="'+key+'" data-pose210="'+c.mode+'">'+svg(key)+'<figcaption>'+escape(c.name)+'</figcaption></figure>';}
function scene(key=id){const c=data[key];if(!c?.verified||c.native)return '';let visual=figure(key),desk=['seated','table','jury','control'].includes(c.mode);if(c.secondary){const s=c.secondary;visual+= '<figure class="presenter-figure210 secondary210">'+svg({...s,size:s.size,crop:s.crop})+'<figcaption>'+escape(s.name)+' · moderasyon</figcaption></figure>';}
return '<section class="presenter-stage210" data-presenter-stage210="'+key+'" data-role210="'+c.mode+'" aria-label="'+escape(c.programme)+' sunucusu"><div class="presenter-setting210 '+(desk?'with-desk210':'')+'">'+visual+(desk?'<div class="presenter-desk210" aria-hidden="true"></div>':'')+'</div><div class="presenter-caption210"><small>'+escape(labels[c.mode]||'Sunucu')+'</small><strong>'+escape(c.name)+'</strong><span>'+escape(c.programme)+'</span></div></section>';}
window.ArenaPresenters210={data,get:key=>data[key||id],svg,figure,scene};
if(!cfg)return;
function install(){
 const app=document.getElementById('app');if(!app)return;
 // Hook only explicit presenter descriptors; a contestant never changes identity by name matching.
 for(const library of [window.People37,window.People35])if(library&&!library.presenter210){library.presenter210=true;for(const method of ['face','standing'])if(typeof library[method]==='function'){const original=library[method];library[method]=function(p={},i){if((p.host===true||p.presenter===true||p.id==='host')&&cfg.verified)return figure(id,true);return original.call(this,p,i);};}}
 // The conversation uses the same verified host identity as the stage.
 if(window.ArenaHostChatData199?.[id]&&cfg.name)window.ArenaHostChatData199[id].host=cfg.secondary?'Öykü Serter ve Jess Molho':cfg.name;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
