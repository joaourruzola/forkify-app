import icons from 'url:../../img/icons.svg';
// import { Fraction } from 'fractional';
import fracty from 'fracty';
import View from './view.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could no find that recipe. Please try another one';
  _message = '';

  constructor() {
    super();
    this._addHandlerBack();
  }

  // Phones/tablet: the recipe sits below the results list, so bring it into view
  _scrollIntoViewOnSmallScreens() {
    if (window.matchMedia('(max-width: 899px)').matches)
      this._parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderSpinner() {
    super.renderSpinner();
    this._scrollIntoViewOnSmallScreens();
  }

  render(data, render = true) {
    const markup = super.render(data, render);
    if (render && data) this._scrollIntoViewOnSmallScreens();
    return markup;
  }

  // Phones/tablet: the "Results" button jumps back up to the list
  _addHandlerBack() {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target.closest('.recipe__back')) return;
      document
        .querySelector('.search-results')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--increase-servings');
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
        <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
        </svg>
    <div class="recipe__quantity">${
      ing.quantity ? fracty(ing.quantity).toString() : ''
    }</div>
        <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
        </div>
    </li>
    `;
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <button class="recipe__back" type="button">
            <svg>
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Results</span>
        </button>
        <h1 class="recipe__title">
        <span>${this._data.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings" aria-label="Fewer servings" data-update-to="${
              this._data.servings - 1
            }">
            <svg>
                <use href="${icons}#icon-minus-circle"></use>
            </svg>
            </button>
            <button class="btn--tiny btn--increase-servings" aria-label="More servings" data-update-to="${
              this._data.servings + 1
            }">
            <svg>
                <use href="${icons}#icon-plus-circle"></use>
            </svg>
            </button>
        </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
        </div>
        <button class="btn--round btn--bookmark" aria-label="Bookmark this recipe">
        <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
        </button>
    </div>

    <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </ul>
    </div>

    <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
        </p>
        <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
        rel="noopener"
        >
        <span>Directions</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </a>
    </div>
    `;
  }
}

export default new RecipeView();
