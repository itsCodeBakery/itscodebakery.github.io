/* Pointer depth belongs only to the opening scene. Native scrolling is retained. */
(()=>{
 'use strict';
 const stage=document.getElementById('top');
 const top=stage.querySelector('.hero-name-top');
 const bottom=stage.querySelector('.hero-name-bottom');
 for(const el of [top,bottom])el.addEventListener('animationend',()=>el.style.animation='none',{once:true});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 let tx=0,ty=0,x=0,y=0,frame=0;
 function tick(){
  frame=0;if(reduced.matches||document.hidden)return;
  x+=(tx-x)*.065;y+=(ty-y)*.065;
  top.style.transform=`translate3d(${-x*11}px,${-y*7}px,0)`;
  bottom.style.transform=`translate3d(${x*15}px,${y*7}px,0)`;
  if(Math.abs(tx-x)+Math.abs(ty-y)>.002)frame=requestAnimationFrame(tick);
 }
 function queue(){if(!frame)frame=requestAnimationFrame(tick)}
 stage.addEventListener('pointermove',e=>{
  if(reduced.matches||!fine.matches)return;
  tx=(e.clientX/innerWidth-.5)*2;ty=(e.clientY/innerHeight-.5)*2;queue();
 },{passive:true});
 stage.addEventListener('pointerenter',()=>document.querySelector('.cursor-orb')?.classList.add('on-hero'));
 stage.addEventListener('pointerleave',()=>{tx=ty=0;queue();document.querySelector('.cursor-orb')?.classList.remove('on-hero')});
 reduced.addEventListener('change',()=>{tx=ty=x=y=0;top.style.transform='';bottom.style.transform=''});
})();
