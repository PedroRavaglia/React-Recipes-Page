import { ACTIONS } from './App'

export const fetchByLetters = (letters, dispatch) => {
    const getMealsUrl = letter => `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;

    const promises = [];

    for (let letter of letters) {
      const url = getMealsUrl(letter);
      promises.push(fetch(url).then(res => res.json()))
    }

    Promise.all(promises)
    .then(data => {
      for (let curr of data) {
        if (curr.meals) {
          dispatch({ type: ACTIONS.FETCH_RECIPES, payload: curr.meals})
        }
      }
    })
}

export const fetchCategories = (dispatch) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  fetch(url)
  .then(res => res.json())
  .then(data => dispatch({ type: ACTIONS.FETCH_CATEGORIES, payload: data.categories }))
}

export const fetchAreas = (dispatch) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  fetch(url)
  .then(res => res.json())
  .then(data => dispatch({ type: ACTIONS.FETCH_AREAS, payload: data.meals }));
}

export const fetchRecommended = (ids, dispatch) => {
  const getIdMealUrl = id => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  for (let id of ids) {
    const url = getIdMealUrl(id);
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch({ type: ACTIONS.FETCH_RECOMMENDED, payload: data.meals[0] }))
  }
}