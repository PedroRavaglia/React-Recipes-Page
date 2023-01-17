import { useState, useRef } from 'react'
import RecipeCard from "./RecipeCard";
import Pagination from "./Pagination";
import Navbar from "./Navbar";

export default function SearchPage({ state, dispatch }) {
    const [currentPage, setCurrentPage] = useState(1);
    const currentPageRef = useRef(null);

    const indexOfLastRecipe = currentPage * state.recipesPerPage;
		const indexOfFirstRecipe = indexOfLastRecipe - state.recipesPerPage;
		const currentRecipes = state.filteredRecipes ? state.filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) : null;
    const totalRecipes = state.filteredRecipes ? state.filteredRecipes.length : 0;
    const pageCount = Math.ceil(totalRecipes / state.recipesPerPage);

    return (
      <div className='search-container'>
        <Navbar {...{state, dispatch, page_return: true }} />

        {
          
          state.filteredRecipes.length == 0 && state.query ? 
            <h2 className='mt-3'>{`No results for "${state.query}"`}</h2>
            :
            <></>
        }

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

        {
          state.filteredRecipes.length == 0 ? 
            <></>
            :
            <Pagination {...{currentPage, setCurrentPage, currentPageRef, pageCount}} />
        }
      </div>
    )
}