import View from './View.js';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addShowWindowHandler();
    this._addCloseWindowHandler();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  //private opens add recipe window
  _addShowWindowHandler() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  //private closes add recipe window
  _addCloseWindowHandler() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  //public to pass function to controller and will get called in model to post data to API
  addUploadHandler(callback) {
    this._parentElement.addEventListener('submit', function (ev) {
      ev.preventDefault();
      //1. Takes all of the data from form and puts it into an array
      const dataArr = [...new FormData(this)];
      //2. Converts the array into a recipe object
      const data = Object.fromEntries(dataArr);
      callback(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
