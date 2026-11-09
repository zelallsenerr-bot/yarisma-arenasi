/* Play one contiguous 30-second interval with its original Turkish audio. */
(function(root){'use strict';
function attach(video,clip,opts={}){
 const base=Math.max(0,Number(clip.mediaStart578)||0),length=30;
 let at=Math.max(0,Math.min(29.7,Number(opts.at)||0)),ready=false,dead=false,done=false,wanted=false,slowTimer;
 const valid=()=>!dead&&video.isConnected!==false;
 const time=()=>ready?Math.max(0,Math.min(length,video.currentTime-base)):at;
 function clearSlow(){clearTimeout(slowTimer);slowTimer=undefined}
 function watchSlow(){
  if(!opts.onSlow||!valid()||!wanted||slowTimer!==undefined)return;
  slowTimer=setTimeout(()=>{slowTimer=undefined;if(valid()&&wanted)opts.onSlow()},8000);
 }
 function pause(){wanted=false;clearSlow();video.pause()}
 function retry(){
  if(!valid())return;
  ready=false;done=false;clearSlow();video.load();play();
 }
 function run(){if(!valid()||!ready||!wanted||opts.paused?.())return;video.playbackRate=1;video.play().then(()=>{if(!valid()||opts.paused?.())video.pause();else opts.onBlocked?.(false)}).catch(()=>{if(valid())opts.onBlocked?.(true)})}
 function play(from){if(!valid())return;if(video.error){retry();return;}if(Number.isFinite(from)){at=Math.max(0,Math.min(29.7,from));done=false;if(ready)video.currentTime=base+at;}wanted=true;watchSlow();if(ready){if(video.currentTime<base-.05||video.currentTime>=base+length-.05){video.currentTime=base+at;done=false;}run()}}
 function metadata(){if(!valid())return;if(!Number.isFinite(video.duration)||video.duration<base+29.8){opts.onError?.();return}ready=true;video.currentTime=base+at;run()}
 function update(){if(!valid()||!ready||done)return;if(video.currentTime<base-.1)return;if(time()>at){clearSlow();opts.onProgress?.()}at=time();opts.onTime?.(at);if(at>=29.95){done=true;pause();opts.onEnd?.(30)}}
 function seeking(){if(!ready||!valid())return;if(video.currentTime<base-.1)video.currentTime=base;else if(video.currentTime>base+length+.1)video.currentTime=base+length;}
 function error(){clearSlow();if(valid())opts.onError?.()}
 function ended(){if(time()>=29.8)update();else error()}
 const listeners=[['loadedmetadata',metadata],['timeupdate',update],['ended',ended],['seeking',seeking],['error',error],['waiting',watchSlow]];
 for(const [event,handler] of listeners)video.addEventListener(event,handler);
 if(video.readyState>=1)metadata();
 return {play,pause,retry,get time(){return time()},destroy(){dead=true;pause();for(const [event,handler] of listeners)video.removeEventListener(event,handler)}};

}
root.FamilyMedia578={attach};
})(globalThis);
