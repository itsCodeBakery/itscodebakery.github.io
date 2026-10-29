/* Lightweight depth on the paper figure; research content and links stay native. */
(() => {
  'use strict';
  const scene = document.querySelector('.research-depth-scene');
  if (!scene) return;
  const rig = scene.querySelector('.research-depth-rig');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let frame = 0;
  function reset() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    scene.classList.remove('is-interacting');
    scene.style.removeProperty('--depth-x');
    scene.style.removeProperty('--depth-y');
  }
  rig.addEventListener('animationend', () => { rig.style.animation = 'none'; }, { once:true });
  scene.addEventListener('pointermove', event => {
    if (reduced.matches || !fine.matches || event.pointerType === 'touch') return;
    if (frame) cancelAnimationFrame(frame);
    const { clientX, clientY } = event;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (reduced.matches || !fine.matches || document.hidden) return;
      const r = scene.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      const y = Math.max(0, Math.min(1, (clientY - r.top) / r.height));
      scene.classList.add('is-interacting');
      scene.style.setProperty('--depth-x', `${(4 + (.5-y)*9).toFixed(2)}deg`);
      scene.style.setProperty('--depth-y', `${(-11 + (x-.5)*15).toFixed(2)}deg`);
    });
  }, { passive:true });
  scene.addEventListener('pointerleave', reset);
  scene.addEventListener('pointercancel', reset);
  fine.addEventListener('change', reset);
  reduced.addEventListener('change', reset);
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  const sections = [...document.querySelectorAll('.project-section, .figure-section')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    }), { threshold:.04, rootMargin:'0px 0px -15px 0px' });
    sections.forEach(section => { section.classList.add('portfolio-reveal'); observer.observe(section); });
    document.body.classList.add('portfolio-motion');
  }
})();
