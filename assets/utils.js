document.addEventListener('DOMContentLoaded', () => {
  const tabs   = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(
    document.querySelectorAll('[role="tabpanel"], .pane')
  );

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1) update aria‑selected
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');

      // 2) hide all panels
      panels.forEach(p => {
        p.classList.remove('active');
        p.removeAttribute('data-active');
      });

      // 3) figure out the target selector:
      //    either data‑target="#pane" or aria‑controls="pane"
      const targetSel = tab.dataset.target
        ? tab.dataset.target
        : `#${tab.getAttribute('aria-controls')}`;

      const panel = document.querySelector(targetSel);
      if (panel) {
        panel.classList.add('active');
        panel.setAttribute('data-active', '');
      }
    });
  });

  // optional: arrow‑key nav for any tablist
  document.querySelectorAll('[role="tablist"]').forEach(list => {
    list.addEventListener('keydown', e => {
      const listTabs = Array.from(list.querySelectorAll('[role="tab"]'));
      const idx = listTabs.indexOf(document.activeElement);
      if (idx < 0) return;

      if (e.key === 'ArrowRight')
        listTabs[(idx + 1) % listTabs.length].focus();
      if (e.key === 'ArrowLeft')
        listTabs[(idx + listTabs.length - 1) % listTabs.length].focus();
    });
  });
});

