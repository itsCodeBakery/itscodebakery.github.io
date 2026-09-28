/* Native links work without JavaScript; this progressively adds figure inspection. */
(()=>{
 'use strict';
 const progress=document.querySelector('.project-progress');
 const nav=[...document.querySelectorAll('.project-nav a')];
 const sections=nav.map(a=>document.getElementById(a.hash.slice(1)));
 let frame=0;
 function update(){
  frame=0;const total=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(total>0?Math.max(0,Math.min(100,scrollY/total*100)):0)+'%';
  let current=0;sections.forEach((s,i)=>{if(s.getBoundingClientRect().top<=innerHeight*.36)current=i});
  nav.forEach((a,i)=>i===current?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));
 }
 function queue(){if(!frame)frame=requestAnimationFrame(update)}
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});addEventListener('load',queue);update();
 const dialog=document.querySelector('.figure-dialog');
 if(!dialog||typeof dialog.showModal!=='function')return;
 const image=dialog.querySelector('img');
 const caption=dialog.querySelector('.dialog-caption p');
 const original=dialog.querySelector('.dialog-caption a');
 let trigger=null,overflow='';
 document.querySelectorAll('.figure-open').forEach(a=>a.addEventListener('click',e=>{
  if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;
  e.preventDefault();trigger=a;
  image.src=a.href;image.alt=a.querySelector('img').alt;caption.textContent=a.dataset.caption||'';original.href=a.href;
  overflow=document.body.style.overflow;document.body.style.overflow='hidden';
  dialog.showModal();dialog.scrollTop=0;
 }));
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
 dialog.addEventListener('close',()=>{document.body.style.overflow=overflow;trigger?.focus({preventScroll:true})});
})();
