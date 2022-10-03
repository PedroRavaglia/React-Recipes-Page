import { Link } from 'react-router-dom'

export default function RecipeComponent({ recipeData, imgWidth }) {
    return (
        <div className="card recipe-container">
            <Link to={`/${recipeData.page_name}`}>
                <img src={recipeData.img_src} className='home card-img-top' />
            </Link>
            <div className='card-body'>
                <Link to={`/${recipeData.page_name}`}>
                    <h3 className="card-title">{recipeData.name}</h3>
                </Link>
                <p className='card-text'>{recipeData.description}</p>
            </div>
        </div>
    );
}