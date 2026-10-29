/* Native project links; progressive status filtering for the publication list. */
(() => {
  'use strict';
  const gallery = document.getElementById('publications');
  if (!gallery) return;
  const buttons = [...gallery.querySelectorAll('[data-publication-filter]')];
  const groups = [...gallery.querySelectorAll('[data-publication-group]')];
  const announcement = gallery.querySelector('#publicationAnnouncement');
  buttons.forEach(button => button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const filter = button.dataset.publicationFilter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    groups.forEach(group => {
      group.hidden = filter !== 'all' && group.dataset.publicationGroup !== filter;
      if (!group.hidden) {
        const rows = group.querySelectorAll('.pub-row');
        count += rows.length;
        rows.forEach(row => row.classList.add('is-visible'));
      }
    });
    const label = filter === 'all' ? 'all research' : button.childNodes[0].textContent.trim().toLowerCase();
    announcement.textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}: ${label}.`;
    window.dispatchEvent(new Event('resize'));
  }));
  gallery.querySelector('.pub-filters').hidden = false;
})();
