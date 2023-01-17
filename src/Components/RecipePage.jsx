import { Link } from "react-router-dom"
import Navbar from "./Navbar";
import RecipeCard from "./RecipeCard";
import { GiKnifeFork } from '../../node_modules/react-icons/gi';
import { BsFlag } from '../../node_modules/react-icons/bs';
import { useMemo } from 'react';
import { FaBookmark, FaRegBookmark } from '../../node_modules/react-icons/fa';
import { ACTIONS } from '../App'

export default function RecipePage({ recipe, state, dispatch }) {
  let ingredients = [];
  let ingredient = recipe['strIngredient1'];
  let measure = recipe['strMeasure1'];
  let i = 2;
  while(ingredient) {
    ingredients.push([measure, ingredient]);
    ingredient = recipe['strIngredient' + i.toString()];
    measure = recipe['strMeasure' + i.toString()];
    i++;
  }

  let all_related_recipes = useMemo(() => {
    return state.recipes.filter(el => 
      (el.strCategory == recipe.strCategory || el.strArea == recipe.strArea) && el.idMeal != recipe.idMeal
    ).sort(() => 0.5 - Math.random());
  }, [recipe]);

  let related_recipes = [];
  let partial_related_recipes = [];

  for (let i=0; i<all_related_recipes.length; i++) {
    if (related_recipes.length < 3) {
      if (partial_related_recipes.length < 3) {
        partial_related_recipes.push(all_related_recipes[i]);
        i == all_related_recipes.length - 1 ? related_recipes.push(partial_related_recipes) : null;
      }

      else {
        related_recipes.push(partial_related_recipes);
        partial_related_recipes = [];
      }
    }
    else {
      break;
    }
  }

  const carousel_classes = [
    'col-xs-12 col-md-6 col-lg-4',
    'col-md-6 col-lg-4 d-none d-md-block',
    'col-lg-4 d-none d-lg-block'
  ];

  let videoSrc;
  if (recipe.strYoutube) {
    videoSrc = 'https://www.youtube.com/embed/' + recipe.strYoutube.split('=')[1];
  }

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

  const save_btn_style = {fontSize: '57', position: 'absolute', right: '5px', top: '5px',  zIndex: '9'};

  return (
    <div className='recipe-container'>
      <Navbar {...{state, dispatch, page_return: true }} />

      <div className='recipe-header mb-4'>
        <h1>{recipe.strMeal}</h1>
      </div>
      
      <div style={{transform: 'scale(1)'}}>
        <div className='info-container mb-5'>
          <div className='recipe-page-img-div'>
            <img src={recipe.strMealThumb} className='recipe-page-img' />
          </div>

          <div className='test container'>
            <div className='recipe-types'>
              <div className='recipe-type first-recipe-type'>
                <GiKnifeFork className="icon" />

                <Link to={`/${recipe.strCategory}`}>
                  <p className="ms-3">{recipe.strCategory}</p>
                </Link>
              </div>

              <div className='recipe-type'>
                <BsFlag className="icon" />

                <Link to={`/${recipe.strArea}`}>
                  <p className="ms-3">{recipe.strArea}</p>
                </Link>
              </div>
            </div>
          </div>

          <button className='save-recipe-page' onClick={() => saveRecipe()}>
            {
              s ? 
                <FaBookmark style={save_btn_style} />
                :
                <FaRegBookmark style={save_btn_style} />
            }
            <svg width="100%" height="100%">
              <polyline 
                points="10,10 48,10 48,55 26,45 10,55"
                fill="white"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="recipe-info mt-4">
        <h2 className='mb-4'>Ingredients</h2>
        <ul>
          {ingredients.map((d, i) => 
            <li key={i}>
              <p><b>{d[0]!=" " ? `${d[0]} |` : ''}</b> {d[1]}</p>
            </li>
          )}
        </ul>

        <h2 className='mb-4 mt-5'>Instructions</h2>
        <div className='mb-5'>
          <p style={{whiteSpace: 'pre-line'}}>
            {recipe.strInstructions}
          </p>
        </div>
      </div>

      {
        videoSrc ?
        <div className="video-container mb-5">
          <iframe 
            src={videoSrc}
            className="video"
            allowFullScreen
          >
          </iframe>
        </div>
        :
        <></>
      }

      <h2 className='mb-4'>See More</h2>

      <div className='see-more-carousel-container mb-5'>
        <div id="see-more-carousel" className="see-more-carousel carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {
              related_recipes ?
                related_recipes.map((c_item, i) => (
                  <div className={i==0 ? "carousel-item active see-more-item" : "carousel-item see-more-item"} key={i}> 
                    <div className="row align-items-center">
                      {
                        c_item.map((r, j) => (
                          <div className={carousel_classes[j%3]} key={j} style={{marginTop: "0px"}}>
                            <RecipeCard {...{recipe: r, state, dispatch, dispatch}} />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
                :
                <></>
            }
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#see-more-carousel" data-bs-slide="prev">
            <div className="carousel-arrow-container left-arrow">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </div>
            <span className="visually-hidden">Previous</span>
          </button>

          <button className="carousel-control-next right-arrow" type="button" data-bs-target="#see-more-carousel" data-bs-slide="next">
            <div className="carousel-arrow-container right-arrow">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </div>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

    </div>
  );
}