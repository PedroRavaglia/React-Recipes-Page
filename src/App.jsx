import { Route, Routes, Link } from "react-router-dom"
import Home from './pages/Home'
import RecipePage from './pages/RecipePage'
import { recipesData } from './recipesData'

function App() {

  return (
    <div className="App">
      <nav className="navbar mb-5 py-4">
          <div className="container-fluid">
            <Link to='/' className="logo navbar-brand ms-4">
              Recipes
            </Link>
          </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        {recipesData.map((recipeData, i) => {
          return (
            <Route 
              path={`/${recipeData.page_name}`} 
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
