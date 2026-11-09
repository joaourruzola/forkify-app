import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it.';
  _message = '';
  _panel = document.querySelector('.bookmarks');
  _btn = document.querySelector('.nav__btn--bookmarks');

  constructor() {
    super();
    this._addHandlerTogglePanel();
  }

  // Click / tap to open (hover does not exist on touch screens)
  _setOpen(open) {
    this._panel.classList.toggle('bookmarks--open', open);
    this._btn.setAttribute('aria-expanded', String(open));
  }

  _addHandlerTogglePanel() {
    this._btn.addEventListener('click', () =>
      this._setOpen(!this._panel.classList.contains('bookmarks--open'))
    );

    document.addEventListener('click', e => {
      if (e.target.closest('.preview__link') && this._panel.contains(e.target))
        return this._setOpen(false);
      if (!this._btn.parentElement.contains(e.target)) this._setOpen(false);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this._setOpen(false);
    });
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
