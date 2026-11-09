// Light / dark theme switch (same data-theme pattern as CiberGuard and the portfolio)
class ThemeView {
  _root = document.documentElement;
  _btn = document.querySelector('.theme-toggle');
  _meta = document.querySelector('meta[name="theme-color"]');

  render(theme) {
    const light = theme === 'light';
    this._root.dataset.theme = theme;
    this._btn.setAttribute('aria-pressed', String(light));
    this._btn.setAttribute('title', light ? 'Dark theme' : 'Light theme');
    if (this._meta) this._meta.content = light ? '#f8fafc' : '#070b14';
  }

  addHandlerToggle(handler) {
    this._btn.addEventListener('click', handler);
  }
}

export default new ThemeView();
