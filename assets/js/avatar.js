/* Local Canvas 2D animation; no WebGL, GPU shader, image warping, or CDN. */
(()=>{
 'use strict';
 const image=document.getElementById('avatarImage');
 const canvas=document.getElementById('avatarCanvas');
 const rig=document.getElementById('avatarRig');
 const hero=document.getElementById('top');
 const hint=document.getElementById('avatarHint');
 const renderer=window.ShayanAvatarRenderer;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(pointer: fine)');
 const ctx=canvas.getContext('2d',{alpha:true});
 if(!ctx||!renderer)return;
 let ready=false,visible=true,frame=0,tx=0,ty=0,x=0,y=0;
 let last=0;
 function draw(){renderer.draw(ctx,image,x,y)}
 function start(){
  if(ready||!image.naturalWidth)return;
  try{
   draw();ready=true;rig.classList.add('ready');
   hint.textContent=fine.matches&&!reduced.matches?'Move your cursor.':'Meet Shayan.';
  }catch(_){rig.classList.remove('ready')}
 }
 function tick(time){
  frame=0;
  if(!ready||!visible||document.hidden||reduced.matches)return;
  const dt=Math.min(time-last||16.67,40);last=time;
  const ease=1-Math.exp(-dt/80);
  x+=(tx-x)*ease;y+=(ty-y)*ease;
  draw();
  // Subtle posture response; pupil motion remains independent of it.
  rig.style.transform=`rotateY(${x*1.7}deg) rotateX(${-y*.7}deg) rotateZ(${x*.3}deg)`;
  if(Math.abs(tx-x)+Math.abs(ty-y)>.002)frame=requestAnimationFrame(tick);
 }
 function schedule(){if(!frame&&ready&&visible&&!reduced.matches&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick)}}
 document.addEventListener('pointermove',event=>{
  if(!visible||reduced.matches||!fine.matches||event.pointerType==='touch')return;
  const r=canvas.getBoundingClientRect();
  const scale=Math.min(r.width/1086,r.height/1448);
  const left=r.left+(r.width-1086*scale)/2;
  const top=r.top+(r.height-1448*scale)/2;
  const faceX=left+546*scale,faceY=top+320*scale;
  tx=Math.tanh((event.clientX-faceX)/Math.max(130,innerWidth*.30));
  ty=Math.tanh((event.clientY-faceY)/Math.max(140,innerHeight*.36));
  schedule();
 },{passive:true});
 function reset(){tx=ty=0;schedule()}
 document.addEventListener('pointerleave',reset);addEventListener('blur',reset);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)reset()});
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule()},{threshold:0}).observe(hero);
 reduced.addEventListener('change',()=>{
  tx=ty=x=y=0;rig.style.transform='';if(ready)draw();
  hint.textContent=fine.matches&&!reduced.matches?'Move your cursor.':'Meet Shayan.';
 });
 if(image.complete&&image.naturalWidth)start();else image.addEventListener('load',start,{once:true});
})();
