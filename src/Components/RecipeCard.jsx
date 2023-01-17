import { Link } from "react-router-dom"
import { FaBookmark, FaRegBookmark } from '../../node_modules/react-icons/fa';
import { ACTIONS } from '../App'

export default function RecipeCard({ recipe, state, dispatch }) {
  let category = state.recipes ? 
    state.recipes.find(curr_recipe => {
      if (curr_recipe.idMeal == recipe.idMeal) {
        return curr_recipe;
      }
    })
    : 
    '';

  let s = false;
  
  if (state.savedRecipes)
    for (const curr_recipe of state.savedRecipes) {
      if (curr_recipe.idMeal == recipe.idMeal) {
        s = true;
        break;
      }
    }

  function saveRecipe() {
    if (!s) {
      dispatch({ type: ACTIONS.SAVE_RECIPE, payload: recipe});
    }
    else {
      dispatch({ type: ACTIONS.REMOVE_RECIPE, payload: recipe});
    }
  }
  
  if (category)
    return (
      <div className="recipe-card">
        <div className="recipe-card-img-div img-placeholder" style={{position: 'relative'}}>
            <button className='mark-div' onClick={() => saveRecipe()}>
              {
                s ? 
                  <FaBookmark style={{fontSize: '32'}} />
                  :
                  <FaRegBookmark style={{fontSize: '32'}} />
              }
            </button>

            <Link to={`/${recipe.idMeal}`} onClick={() => window.scrollTo({top: 0, left: 0})}>
              <img 
                src={recipe.strMealThumb} 
                key={recipe.idMeal}
                className='recipe-card-img'
              />
            </Link>
        </div>

        <div className="card-meta">
          <Link to={`/${category.strCategory}`}>
            <p className="dish-category">{category ? category.strCategory : ''}</p>
          </Link>
          <Link to={`/${category.strArea}`}>
            <p className="dish-area">{category ? category.strArea : ''}</p>
          </Link>
        </div>
        <Link to={`/${recipe.idMeal}`} onClick={() => window.scrollTo({top: 0, left: 0})}>
          <h5>{recipe.strMeal}</h5>
        </Link>
      </div>
    );  
}