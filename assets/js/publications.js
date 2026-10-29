/* Progressive enhancement confined to the publication gallery. */
(() => {
  'use strict';
  const gallery = document.getElementById('publications');
  if (!gallery) return;
  const controls = gallery.querySelector('.pub-filters');
  const buttons = [...gallery.querySelectorAll('[data-publication-filter]')];
  const groups = [...gallery.querySelectorAll('[data-publication-group]')];
  const tiles = [...gallery.querySelectorAll('.pub-tile')];
  const announcement = gallery.querySelector('#publicationAnnouncement');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const pendingFrames = new Map();
  const entrances = new Set();

  function clearDepth(tile) {
    if (pendingFrames.has(tile)) cancelAnimationFrame(pendingFrames.get(tile));
    pendingFrames.delete(tile);
    tile.classList.remove('is-tilting');
    ['--pub-tilt-x', '--pub-tilt-y', '--pub-light-x', '--pub-light-y'].forEach(property => tile.style.removeProperty(property));
  }

  function stopMotion() {
    tiles.forEach(clearDepth);
    entrances.forEach(animation => animation.cancel());
    entrances.clear();
  }

  function revealGroup(group) {
    // The original scroll-reveal observer remains in charge of first entry.
    // Filtered-in tiles are visible immediately, even without observer support.
    group.querySelectorAll('.pub-tile').forEach(tile => tile.classList.add('is-visible'));
    if (reduced.matches || typeof group.animate !== 'function') return;
    const animation = group.animate(
      [{ opacity:0, transform:'translateY(10px)' }, { opacity:1, transform:'translateY(0)' }],
      { duration:360, easing:'cubic-bezier(.22,1,.36,1)' }
    );
    entrances.add(animation);
    const remove = () => entrances.delete(animation);
    animation.addEventListener('finish', remove, { once:true });
    animation.addEventListener('cancel', remove, { once:true });
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    stopMotion();
    const filter = button.dataset.publicationFilter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let visibleCount = 0;
    groups.forEach(group => {
      group.hidden = filter !== 'all' && group.dataset.publicationGroup !== filter;
      if (!group.hidden) {
        visibleCount += group.querySelectorAll('.pub-tile').length;
        revealGroup(group);
      }
    });
    const label = filter === 'all' ? 'all research' : button.childNodes[0].textContent.trim().toLowerCase();
    announcement.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}: ${label}.`;
    // Keep the existing reading progress and sidebar section positions current.
    window.dispatchEvent(new Event('resize'));
  }));

  tiles.forEach(tile => {
    tile.addEventListener('pointermove', event => {
      if (reduced.matches || !fine.matches || event.pointerType === 'touch') return;
      if (pendingFrames.has(tile)) cancelAnimationFrame(pendingFrames.get(tile));
      const { clientX, clientY } = event;
      pendingFrames.set(tile, requestAnimationFrame(() => {
        pendingFrames.delete(tile);
        if (reduced.matches || !fine.matches || document.hidden) return;
        const bounds = tile.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height));
        tile.classList.add('is-tilting');
        tile.style.setProperty('--pub-tilt-x', `${((.5 - y) * 4).toFixed(2)}deg`);
        tile.style.setProperty('--pub-tilt-y', `${((x - .5) * 5).toFixed(2)}deg`);
        tile.style.setProperty('--pub-light-x', `${(x * 100).toFixed(1)}%`);
        tile.style.setProperty('--pub-light-y', `${(y * 100).toFixed(1)}%`);
      }));
    }, { passive:true });
    tile.addEventListener('pointerleave', () => clearDepth(tile));
    tile.addEventListener('pointercancel', () => clearDepth(tile));
  });

  reduced.addEventListener('change', stopMotion);
  fine.addEventListener('change', stopMotion);
  window.addEventListener('blur', stopMotion);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopMotion(); });

  // No JavaScript: all three research sections and their links remain available.
  controls.hidden = false;
  if (!('IntersectionObserver' in window)) tiles.forEach(tile => tile.classList.add('is-visible'));
})();
