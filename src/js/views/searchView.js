class SearchView {
  _parentElement = document.querySelector('.search');
  _searchInput = document.querySelector('.search__field');

  //public method to get query from search input
  getSearchQuery() {
    const query = this._searchInput.value;
    this._clearInput();
    return query;
  }

  //private method to clear input
  _clearInput() {
    this._searchInput.value = '';
  }

  //public method when search button is clicked
  onSearch(callback) {
    this._parentElement.addEventListener('submit', ev => {
      ev.preventDefault();
      callback();
    });
  }
}

export default new SearchView();
