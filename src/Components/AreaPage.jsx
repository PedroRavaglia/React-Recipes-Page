import { useState, useEffect, useRef } from 'react'
import RecipeCard from "./RecipeCard";
import Navbar from "./Navbar";
import Pagination from "./Pagination";

export default function AreaPage({ area, recipesPerPage, state, dispatch }) {
  const [areaRecipes, setAreaRecipes] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(null);

  useEffect(() => {
    const fetchRecipesArea = () => {
      let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
      url += area == 'Uruguayan' ? 'Unknown' : area;
      fetch(url)
      .then(res => res.json())
      .then(data => setAreaRecipes(data.meals.filter(recipe => !state.removedRecipes.includes(recipe.idMeal))))
    }

    fetchRecipesArea();
  }, []);

  const indexOfLastRecipe = currentPage * state.recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - state.recipesPerPage;
  const currentRecipes = areaRecipes ? areaRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) : null;
  const totalRecipes = areaRecipes ? areaRecipes.length : 0;
  const pageCount = Math.ceil(totalRecipes / state.recipesPerPage);

  return (
    <div className='search-container'>
      <Navbar {...{state, dispatch, page_return: true }} />

      <div className='category-header mb-4'>
        <h1>{`All ${area} Recipes`}</h1>
      </div>

      <div 
        className="recipes-container mb-5" 
        ref={currentPageRef}
        onAnimationEnd={() => {
          if (currentPageRef.current) {
            currentPageRef.current.style.animation = "";
          }
        }}  
      >
        {
          currentRecipes ? 
            currentRecipes.map((recipe, i) => (<RecipeCard {...{recipe, state, dispatch}} key={i} />))
            :
            <></>
        }
      </div>

      <Pagination {...{currentPage, setCurrentPage, currentPageRef, pageCount}} />
    </div>
  )
}