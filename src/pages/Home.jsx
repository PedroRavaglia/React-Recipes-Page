import { recipesData } from '../recipesData'
import RecipeComponent from '../RecipeComponent'

export default function Home() {
    return (
        <div className="home-container">
            {recipesData.map((recipe, i) => {
                return (
                    <RecipeComponent recipeData={recipe} key={i} />
                )
            })}
        </div>
    )
}