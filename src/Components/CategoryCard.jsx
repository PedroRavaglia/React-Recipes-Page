import { Link } from "react-router-dom"

export default function CategoryCard({ category }) {
  return (
    <div className="category-card">
        <Link to={`/${category.strCategory}`}>
          <div 
            className='category-img'
            style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 50%, rgba(0, 0, 0, 0.4) 80%), url('${category.strCategoryThumb}')`}}
          >
          </div>
        </Link>
        <div className="centered">
          <Link to={`/${category.strCategory}`}>
            <h5 className="" style={{color: 'white'}}>{category.strCategory}</h5>
          </Link>
        </div>
    </div>
  );
}