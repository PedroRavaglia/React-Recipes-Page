import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, HashRouter  } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={"/React-Recipes-Page"}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
