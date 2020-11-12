// This controller module is used to interact with the model(business logic) and recipeView(user interface)
// Keeps the code modular

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js'; //put js on end
import { MODAL_CLOSE_SECS } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    //1. Get id of recipe after hash in the search bar
    const id = window.location.hash.slice(1);
    // console.log(id);
    //2. Guard clause if there is no id
    if (!id) return;

    //3. Render Loader while data is being fetched
    recipeView.renderSpinner();

    //4. Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //5. Updating bookmarks
    bookmarksView.update(model.state.bookmarks);

    //6. Make API request to server to fetch recipe
    await model.loadRecipe(id);

    //7. Render recipe to UI
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErrorMessage();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    //0. Render spinner
    resultsView.renderSpinner();
    // console.log(resultsView);
    //1. Get query from input
    const query = searchView.getSearchQuery();
    //2. Guard clause for no query
    if (!query) return;
    //3. Wait for API response
    await model.loadSearchResults(query);
    //4. Render results
    resultsView.render(model.getSearchResultsPage());
    //5. Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    // console.log(err);
  }
};

const controlPagination = function (page) {
  //1. Render results for new page
  resultsView.render(model.getSearchResultsPage(page));
  //2. Render pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //1. Update the recipe servings in state
  model.updateServings(newServings);
  //2. Update the UI
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1. Add/ remove bookmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  //2. Update recipe view
  recipeView.update(model.state.recipe);

  //3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //0. Render loading spinner
    addRecipeView.renderSpinner();
    //1. Upload new recipe data
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);

    //2. Render new recipe
    recipeView.render(model.state.recipe);

    //3. Render success message
    addRecipeView.renderMessage();

    //4. Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //5. Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //6. Close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SECS * 1000);
  } catch (err) {
    console.error(err, '😈😈😈');
    addRecipeView.renderErrorMessage(err.message);
  }
};

const init = function () {
  bookmarksView.addRenderHandler(controlBookmarks);
  recipeView.addRenderHandler(controlRecipe);
  recipeView.addUpdateServingsHandler(controlServings);
  recipeView.addBookmarkHandler(controlAddBookmark);
  searchView.onSearch(controlSearchResults);
  paginationView.onPaginationButtonClick(controlPagination);
  addRecipeView.addUploadHandler(controlAddRecipe);
};
init();
