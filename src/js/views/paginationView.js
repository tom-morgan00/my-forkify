import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  //public method is called in controller with callback to go to the new page
  onPaginationButtonClick(callback) {
    this._parentElement.addEventListener('click', ev => {
      const btn = ev.target.closest('.btn--inline');
      //1. guard clause incase no button
      if (!btn) return;
      //2. gets the page number from the button dataset attribute -> + converts to number
      const goToPage = +btn.dataset.goto;
      //3. controlPagination is called in controller with page number
      callback(goToPage);
    });
  }

  _generateMarkup() {
    const page = this._data.page;
    const numResults = this._data.results.length;
    const resPerPage = this._data.resultsPerPage;
    const numPages = Math.ceil(numResults / resPerPage);
    // console.log(numResults, resPerPage, numPages);
    // Page 1, and there are other pages
    if (page === 1 && numPages > 1) {
      return `
        <button data-goto="${
          page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // Page 1 and no other pages
    if (page === 1 && numPages === 1) {
      return '';
    }
    // Page 2 with next and previous pages
    if (page > 1 && numPages > page) {
      return `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
        <button data-goto="${
          page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // On the last page
    if (page > 1 && page === numPages) {
      return `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
      `;
    }
  }
}

export default new paginationView();
