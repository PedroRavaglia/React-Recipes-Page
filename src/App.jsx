import { Route, Routes, Router, Link } from "react-router-dom"
import Home from './pages/Home'
import RecipePage from './pages/RecipePage'
import { recipesData } from './recipesData'

function App() {

  return (
    <div className="App">
      <nav className="navbar mb-5 py-4">
          <div className="container-fluid">
            {/* <Link to='/React-Recipes-Page' className="logo navbar-brand ms-4"> */}
            <Link to='/' className="logo navbar-brand ms-4">
              Recipes
            </Link>
          </div>
      </nav>

      <Routes>
        {/* <Route path="/React-Recipes-Page/" element={<Home />}></Route> */}
        <Route path="/" element={<Home />}></Route>
        {recipesData.map((recipeData, i) => {
          return (
            <Route 
              path={`/${recipeData.page_name}`} 
              // path={`/React-Recipes-Page/${recipeData.page_name}`} 
              element={<RecipePage recipesData={recipeData} />} 
              key={i}
            >
            </Route>
          )
        })}
      </Routes>

      <div className="bottom">
      </div>
    </div>
  )
}

export default App
