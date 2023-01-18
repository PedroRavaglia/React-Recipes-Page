import { useState, useEffect, useRef, useReducer } from 'react'
import './sass/style.scss'
import Home from './Components/Home'
import RecipePage from './Components/RecipePage';
import CategoryPage from './Components/CaterogyPage';
import SearchPage from './Components/SearchPage';
import AreaPage from './Components/AreaPage';
import SavedRecipes from './Components/SavedRecipes';
import { fetchByLetters, fetchCategories, fetchAreas, fetchRecommended } from './fetchFunctions'
import { Routes, Route, Router,
  createBrowserRouter, RouterProvider, HashRouter
 } from "react-router-dom";

export const ACTIONS = {
  FILTER: 'filter',
  QUERY: 'query',
  SEARCH: 'search',
  FETCH_CATEGORIES: 'fetch-categories',
  FETCH_AREAS: 'fetch-areas',
  FETCH_RECIPES: 'fetch-recipes',
  FETCH_RECOMMENDED: 'fetch-recomended',
  SAVE_RECIPE: 'save-recipe',
  REMOVE_RECIPE: 'remove-recipe'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.QUERY:
      return {
        ...state,
        query: payload
      }

    case ACTIONS.FILTER:
      return {
        ...state,
        filteredRecipes: state.recipes.filter(recipe => {
          return recipe.strMeal.toLowerCase().includes(payload.toLocaleLowerCase())
        })
      }

    case ACTIONS.FETCH_RECIPES:
      const new_recipes = payload.filter(recipe => {
        if (!state.removedRecipes.includes(recipe.idMeal)) {
          if (recipe.idMeal == '53063')
            recipe.strArea = 'Uruguayan';
          return true;
        }
        else
          return false;
      })

      return {
        ...state,
        recipes: state.recipes.concat(new_recipes),
        filteredRecipes: state.query ? state.filteredRecipes : state.recipes
      }

    case ACTIONS.FETCH_CATEGORIES:
      return {
        ...state,
        categories: payload
      }

    case ACTIONS.FETCH_AREAS:
      const areas = payload.reduce((accumulator, currentValue) => {
        currentValue.strArea == 'Unknown' ? accumulator.push('Uruguayan') : accumulator.push(currentValue.strArea);
        return accumulator;
      }, []);
      
      return {
        ...state,
        areas
      }

    case ACTIONS.FETCH_RECOMMENDED:
      return {
        ...state,
        recommendedRecipes: [...state.recommendedRecipes, payload]
      }
      
    case ACTIONS.SAVE_RECIPE:
      return {
        ...state,
        savedRecipes: [...state.savedRecipes, payload]
      }

    case ACTIONS.REMOVE_RECIPE:
      const del_ind = state.savedRecipes.findIndex(recipe => recipe.idMeal == payload.idMeal);
      let new_savedRecipes = state.savedRecipes;
      if (del_ind > -1)
        new_savedRecipes.splice(del_ind, 1);

      return {
        ...state,
        savedRecipes: new_savedRecipes
      }
    }
}


function App() {
  const [recipesPerPage] = useState(12);
  const effectCalled = useRef([false, false]);

  const [state, dispatch] = useReducer(reducer, { 
    recipes: [], 
    categories: [], 
    areas: [],
    query: '',
    filteredRecipes: [],
    recipesPerPage: 12,
    recommendedIds: ['52982', '53034', '52808', '52915'],
    recommendedRecipes: [],
    removedRecipes: ['52885', '52779', '52780'],
    savedRecipes: []
  });
  
  let letters = []
  for(let i=0; i<26; i++)
    letters.push(String.fromCharCode(97 + i));

  useEffect(() => {
    if(!effectCalled.current[0]) {
      effectCalled.current[0] = true;
      fetchCategories(dispatch);
      fetchAreas(dispatch);
      fetchRecommended(state.recommendedIds, dispatch);
      fetchByLetters(letters, dispatch);
    }
  }, []);

  let router_array = [
    {
      path: "/",
      element: <Home {...{state, dispatch}} />,
    },
    {
      path: "recipes",
      element: <SearchPage {...{state, dispatch}} />,
    },
    {
      path: "saved",
      element: <SavedRecipes {...{state, dispatch}} />,
    },
  ];

  // if (state.recipes)
  //   state.recipes.map((recipe, i) => {
  //     router_array.push({
  //       path: `${recipe.idMeal}`,
  //       element: <RecipePage {...{recipe, state, dispatch, recipes: state.recipes}} />
  //     })
  //   })

  // if (state.categories)
  //   state.categories.map((category, i) => {
  //     router_array.push({
  //       path: `${category.strCategory}`,
  //       element: <CategoryPage {...{category, recipesPerPage, state, dispatch}} />
  //     })
  //   })

  // if (state.areas)
  //   state.areas.map((area, i) => {
  //     router_array.push({
  //       path: `${area}`,
  //       element: <AreaPage {...{area, recipesPerPage, state, dispatch}} />
  //     })
  //   })

  // const router = createBrowserRouter(router_array, { basename: "/React-Recipes-Page" });

  return (
    <div className="App">
      <Routes>
        <Route 
          exact
          path="/" 
          element={<Home {...{state, dispatch}} />}
        >
        </Route>

        <Route 
          path="/recipes"
          element={<SearchPage {...{state, dispatch}} />}
        >
        </Route>

        <Route 
          path="/saved"
          element={<SavedRecipes {...{state, dispatch}} />}
        >
        </Route>

        {
          state.recipes ?
            state.recipes.map((recipe, i) => {
              return (
                <Route 
                  path={`/${recipe.idMeal}`}
                  element={<RecipePage {...{recipe, state, dispatch, recipes: state.recipes}} />}
                  key={i}
                >
                </Route>
              )
            })
            :
            <></>
        }

        {
          state.categories ?
            state.categories.map((category, i) => {
              return (
                <Route 
                  path={`/${category.strCategory}`} 
                  element={<CategoryPage {...{category, recipesPerPage, state, dispatch}} />} 
                  key={i}
                >
                </Route>
              )
            })
            :
            <></>
        }

        {
          state.areas ?
            state.areas.map((area, i) => {
              return (
                <Route 
                  path={`/${area}`} 
                  element={<AreaPage {...{area, recipesPerPage, state, dispatch}} />} 
                  key={i}
                >
                </Route>
              )
            })
            :
            <></>
        }
      </Routes>
    </div>
  )
}

export default App
