import Navbar from "./Navbar";
import RecipeCard from "./RecipeCard";

export default function SavedRecipes({ state, dispatch }) {
	
	return (
		<div className='search-container'>
			<Navbar {...{state, dispatch, page_return: true, saved: true }} />
			
			{
				state.savedRecipes.length == 0 ?
					<h1>There Are No Saved Recipes</h1>
					:
					<div>
						<h1 className="mb-4">Saved Recipes</h1>
						<div className="recipes-container mb-5" >
						{state.savedRecipes.map((recipe, i) => <RecipeCard {...{recipe, state, dispatch}} key={i} />)}
						</div>
					</div>
			}
		</div>
	);
}