import { Link } from "react-router-dom"
import CategoryCard from "./CategoryCard"
import Navbar from "./Navbar";
import { GiKnifeFork } from '../../node_modules/react-icons/gi';
import { BsFlag } from '../../node_modules/react-icons/bs';
import ReactCountryFlag from "react-country-flag"

export default function Home({ state, dispatch }) {
  const countries_init = [
    'US', 'GB', 'CA', 'CN', 'HR', 'NL', 'EG', 'FR', 'GR',
    'IN', 'IE', 'IT', 'JM', 'JP', 'KE', 'MY', 'MX', 'MA',
    'PL', 'PT', 'RU', 'ES', 'TH', 'TN', 'TR', 'UY', 'VN'
  ];

  const areas = [];
  if (state.areas) {
    for (let i=0; i<27; i++) {
      areas.push([countries_init[i], state.areas[i]])
    }
  }

  return (
    <div className='home'>
      <Navbar {...{state, dispatch, page_return: false }} />

      <h4 className="mb-4">Recommended</h4>

      <div className='carousel-container mb-2'>
        <div id="recommended-carousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
          {
            state.recommendedRecipes.length != 0 ?
              state.recommendedRecipes.map((recipe, i) => (
                <div className={i==0 ? "carousel-item active c-item" : "carousel-item c-item"} key={i}>
                  <Link to={`/${recipe.idMeal}`}>
                    <img src={recipe.strMealThumb} className="d-block w-100 c-img" />
                  </Link>

                  <div className="carousel-caption mt-4">
                    <Link to={`/${recipe.idMeal}`}>
                      <h5 style={{color: 'black'}}>{recipe.strMeal}</h5>
                    </Link>

                    <div className="container">
                      <div className="row">
                        <div className="col-1">
                        </div>

                        <div className="c-item-info col-4">
                          <p style={{fontSize: '25px', color: '#02ca83'}}><BsFlag /></p>
                          <p style={{marginLeft: '10px', marginTop: '8px'}}>{`${recipe.strArea}`}</p>
                        </div>

                        <div className="c-item-info col-2">
                          <p style={{marginTop: '8px'}}>|</p>
                        </div>

                        <div className="c-item-info col-4">
                          <p style={{fontSize: '25px', color: '#02ca83'}}><GiKnifeFork /></p>
                          <p style={{marginLeft: '10px', marginTop: '8px'}}>{`${recipe.strCategory}`}</p>
                        </div>

                        <div className="col-1">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              :
              <div className="carousel-placeholder">
              </div>
          }
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#recommended-carousel" data-bs-slide="prev">
            <div className="carousel-arrow-container">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </div>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#recommended-carousel" data-bs-slide="next">
            <div className="carousel-arrow-container">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </div>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <h4 className="mb-4">Categories</h4>

      <div className="categories-container mb-5">
        {
          state.categories ?
            state.categories.map((category, i) => (
              <CategoryCard category={category} key={i} />
            ))
            : 
            <></>
        }
      </div>

      <h4 className="mb-4">Countries</h4>

      <div className="areas-container mb-5">
        {
          areas.map((area, i) => (
            <Link to={`/${area[1]}`} key={i}>
              <ReactCountryFlag
                countryCode={area[0]}
                className="flag"
                svg
                style={{
                  width: '100%',
                  height: '100%',
                }}
                title={area[1]}
              />
            </Link>
          ))
        }
      </div>

    </div>
  )
}