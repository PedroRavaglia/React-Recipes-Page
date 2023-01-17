import { useState, useEffect, useRef } from 'react'
import RecipeCard from "./RecipeCard";
import Navbar from "./Navbar";
import Pagination from "./Pagination";

export default function CategoryPage({ category, recipesPerPage, state, dispatch }) {
  const [catRecipes, setCatRecipes] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(null);

  useEffect(() => {
    const fetchRecipesCategory = () => {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
      fetch(url)
      .then(res => res.json())
      .then(data => setCatRecipes(data.meals.filter(recipe => recipe.idMeal != '52885')))
    }

    fetchRecipesCategory();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = catRecipes ? catRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) : null;
  const totalRecipes = catRecipes ? catRecipes.length : 0;
  const pageCount = Math.ceil(totalRecipes / state.recipesPerPage);

  return (
    <div className='search-container'>
      <Navbar {...{state, dispatch, page_return: true }} />

      <div className='category-header mb-4'>
        <h1>{`All ${category.strCategory} Recipes`}</h1>
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