/* Native, dependency-free interactions. No wheel hijacking or CDN dependencies. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const body = document.body;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const mobile = matchMedia('(max-width: 880px)');
  const hero = $('#top');
  const sidebar = $('#sidebar');
  const menu = $('#menuButton');
  const backdrop = $('.menu-backdrop');
  const progress = $('#readingProgress');
  const nav = $('.nav');
  const navLinks = $$('.nav a');
  const track = $('.nav-track');
  const sections = navLinks.map(link => $(link.hash)).filter(Boolean);
  let menuOpen = false;
  let restoreOverflow = '';
  let scrollFrame = 0;
  let active = navLinks[0];
  let sectionTops = [];
  const setSidebarAccess = () => {
    const unavailable = mobile.matches ? !menuOpen : !body.classList.contains('reading');
    sidebar.inert = unavailable;
    sidebar.setAttribute('aria-hidden', String(unavailable));
  };
  function setMenu(open, focusReturn = true) {
    menuOpen = open;
    body.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) { restoreOverflow = body.style.overflow; body.style.overflow = 'hidden'; }
    else body.style.overflow = restoreOverflow;
    setSidebarAccess();
    if (open) (active || navLinks[0]).focus({preventScroll: true});
    else if (focusReturn) menu.focus({preventScroll: true});
  }
  menu.addEventListener('click', () => setMenu(!menuOpen));
  backdrop.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', event => {
    if (!menuOpen) return;
    if (event.key === 'Escape') { setMenu(false); return; }
    if (event.key === 'Tab') {
      const items = [menu, ...$$('a,button', sidebar)];
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  mobile.addEventListener('change', () => { if (menuOpen) setMenu(false, false); setSidebarAccess(); measure(); });
  navLinks.forEach((link, i) => link.dataset.index = String(i).padStart(2, '0'));
  function highlight(link) {
    if (!link) return;
    track.style.height = link.offsetHeight + 'px';
    track.style.transform = `translateY(${link.offsetTop}px)`;
    track.classList.add('visible');
  }
  function setActive(link) {
    active = link;
    navLinks.forEach(item => {
      const selected = item === link;
      item.classList.toggle('active', selected);
      if (selected) item.setAttribute('aria-current', 'location'); else item.removeAttribute('aria-current');
    });
    highlight(link);
  }
  navLinks.forEach(link => {
    link.addEventListener('pointerenter', () => highlight(link));
    link.addEventListener('focus', () => highlight(link));
  });
  nav.addEventListener('pointerleave', () => highlight(active));
  nav.addEventListener('focusout', () => highlight(active));
  $$('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = $(link.hash);
    if (!target) return;
    event.preventDefault();
    if (menuOpen) setMenu(false, false);
    history.pushState(null, '', link.hash);
    target.scrollIntoView({behavior: reduced.matches ? 'instant' : 'smooth', block: 'start'});
    if (event.detail === 0) {
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll:true});
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), {once:true});
    }
  }));
  function measure() {
    sectionTops = sections.map(section => ({section, top: section.getBoundingClientRect().top + scrollY}));
    updateScroll();
  }
  function updateScroll() {
    scrollFrame = 0;
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = (max > 0 ? Math.min(y / max * 100, 100) : 0) + '%';
    body.classList.toggle('reading', y > hero.offsetHeight - innerHeight * .35);
    setSidebarAccess();
    let current = sections[0];
    for (const item of sectionTops) if (item.top <= y + innerHeight * .32) current = item.section;
    const link = navLinks.find(item => item.hash === '#' + current.id);
    if (link !== active) setActive(link);
    if (!reduced.matches && !mobile.matches && y < hero.offsetHeight) {
      $('.intro-copy').style.transform = `translateY(${-y * .085}px)`;
      $('.intro-copy').style.opacity = String(Math.max(.1, 1 - y / hero.offsetHeight * .9));
    }
  }
  addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }, {passive:true});
  addEventListener('resize', measure, {passive:true});
  addEventListener('load', measure);
  addEventListener('hashchange', updateScroll);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe($('.content'));
  const reveals = $$('.content section, .publication, .timeline-item, .news li');
  function setMotion() {
    body.classList.toggle('motion-on', !reduced.matches);
    if (reduced.matches) {
      $('.intro-copy').style.transform = '';
      $('.intro-copy').style.opacity = '';
      reveals.forEach(item => item.classList.add('is-visible'));
    }
  }
  setMotion(); reduced.addEventListener('change', setMotion);
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), {threshold: .04, rootMargin:'0px 0px -22px 0px'});
    reveals.forEach((item, i) => {
      item.classList.add('reveal-item');
      item.style.setProperty('--reveal-delay', item.matches('section') ? '0ms' : Math.min(i % 3 * 55, 110) + 'ms');
      revealObserver.observe(item);
    });
  }
  const filters = $$('.filter');
  const publications = $$('.publication');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
    publications.forEach(item => {
      item.hidden = button.dataset.filter !== 'all' && item.dataset.status !== button.dataset.filter;
      if (!item.hidden) {
        item.classList.add('is-visible');
        if (!reduced.matches) item.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}], {duration:420,easing:'cubic-bezier(.22,1,.36,1)'});
      }
    });
    measure();
  }));
  $('#year').textContent = new Date().getFullYear();
  setActive(active); measure();
  // Keep the native cursor, adding only an unobtrusive, inert follower.
  const orb = document.createElement('div'); orb.className = 'cursor-orb'; orb.setAttribute('aria-hidden','true'); body.append(orb);
  let x=-100,y=-100,tx=-100,ty=-100,frame=0;
  function follow() {
    frame=0;
    if (reduced.matches || !fine.matches || document.hidden) { orb.classList.remove('visible'); return; }
    x+=(tx-x)*.19; y+=(ty-y)*.19;
    orb.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
    if (Math.abs(tx-x)+Math.abs(ty-y)>.15) frame=requestAnimationFrame(follow);
  }
  document.addEventListener('pointermove', event => {
    if (!fine.matches || reduced.matches || event.pointerType==='touch') return;
    tx=event.clientX;ty=event.clientY;
    orb.classList.add('visible');orb.classList.toggle('focus',Boolean(event.target.closest('a,button')));
    if(!frame)frame=requestAnimationFrame(follow);
  },{passive:true});
  document.addEventListener('pointerleave',()=>orb.classList.remove('visible'));
  document.addEventListener('pointerdown',()=>orb.classList.add('pressed'),{passive:true});
  document.addEventListener('pointerup',()=>orb.classList.remove('pressed'),{passive:true});
  addEventListener('blur',()=>orb.classList.remove('visible'));
  $$('.magnetic').forEach(button => {
    button.addEventListener('pointermove',event=>{
      if(reduced.matches||!fine.matches)return;
      const r=button.getBoundingClientRect();
      button.style.transform=`translate(${(event.clientX-r.left-r.width/2)*.075}px,${(event.clientY-r.top-r.height/2)*.1}px)`;
    });
    button.addEventListener('pointerleave',()=>button.style.transform='');
  });
})();
