(() => {
  const toggle = document.querySelector('#themeToggle');
  const search = document.querySelector('#searchInput');
  const buttons = [...document.querySelectorAll('.filter-button')];
  const rows = [...document.querySelectorAll('.article-row')];
  const emptyState = document.querySelector('#emptyState');
  let activeCategory = 'all';

  const applyTheme = (dark) => {
    document.body.classList.toggle('dark', dark);
    if (toggle) toggle.textContent = dark ? '◑' : '◐';
  };
  applyTheme(localStorage.getItem('blog-theme') === 'dark');
  toggle?.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark');
    applyTheme(dark);
    localStorage.setItem('blog-theme', dark ? 'dark' : 'light');
  });

  const filterRows = () => {
    const query = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    rows.forEach((row) => {
      const matchesCategory = activeCategory === 'all' || row.dataset.category === activeCategory;
      const matchesQuery = !query || row.dataset.title.toLowerCase().includes(query);
      row.hidden = !(matchesCategory && matchesQuery);
      if (!row.hidden) visible += 1;
    });
    if (emptyState) emptyState.hidden = visible > 0;
  };
  search?.addEventListener('input', filterRows);
  buttons.forEach((button) => button.addEventListener('click', () => {
    activeCategory = button.dataset.filter || 'all';
    buttons.forEach((item) => item.classList.toggle('active', item === button));
    filterRows();
  }));
})();
