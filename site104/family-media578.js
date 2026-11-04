/* Play one contiguous 30-second interval with its original Turkish audio. */
(function(root){'use strict';
function attach(video,clip,opts={}){
 const base=Math.max(0,Number(clip.mediaStart578)||0),length=30;
 let at=Math.max(0,Math.min(29.7,Number(opts.at)||0)),ready=false,dead=false,done=false,wanted=false;
 const valid=()=>!dead&&video.isConnected!==false;
 const time=()=>ready?Math.max(0,Math.min(length,video.currentTime-base)):at;
 function pause(){wanted=false;video.pause()}
 function run(){if(!valid()||!ready||!wanted||opts.paused?.())return;video.playbackRate=1;video.play().then(()=>{if(!valid()||opts.paused?.())video.pause();else opts.onBlocked?.(false)}).catch(()=>{if(valid())opts.onBlocked?.(true)})}
 function play(from){if(!valid())return;if(video.error){ready=false;done=false;video.load();}if(Number.isFinite(from)){at=Math.max(0,Math.min(29.7,from));done=false;if(ready)video.currentTime=base+at;}wanted=true;if(ready){if(video.currentTime<base-.05||video.currentTime>=base+length-.05){video.currentTime=base+at;done=false;}run()}}
 function metadata(){if(!valid())return;if(!Number.isFinite(video.duration)||video.duration<base+29.8){opts.onError?.();return}ready=true;video.currentTime=base+at;run()}
 function update(){if(!valid()||!ready||done)return;if(video.currentTime<base-.1)return;at=time();opts.onTime?.(at);if(at>=29.95){done=true;wanted=false;video.pause();opts.onEnd?.(30)}}
 function seeking(){if(!ready||!valid())return;if(video.currentTime<base-.1)video.currentTime=base;else if(video.currentTime>base+length+.1)video.currentTime=base+length;}
 function error(){if(valid())opts.onError?.()}
 function ended(){if(time()>=29.8)update();else error()}
 video.addEventListener('loadedmetadata',metadata);video.addEventListener('timeupdate',update);video.addEventListener('ended',ended);video.addEventListener('seeking',seeking);video.addEventListener('error',error);
 if(video.readyState>=1)metadata();
 return {play,pause,get time(){return time()},destroy(){dead=true;video.pause();for(const [n,f] of [['loadedmetadata',metadata],['timeupdate',update],['ended',ended],['seeking',seeking],['error',error]])video.removeEventListener(n,f)}};
}
root.FamilyMedia578={attach};
})(globalThis);
