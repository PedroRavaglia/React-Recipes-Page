import { Link, useNavigate } from "react-router-dom"
import { ACTIONS } from '../App'
import { IoIosArrowBack } from '../../node_modules/react-icons/io';
import { FaBookmark, FaRegBookmark } from '../../node_modules/react-icons/fa';

export default function Navbar({ state, dispatch, page_return, saved=false }) {
    const navigate = useNavigate();

    return (
      <div className="header mb-4 mt-4">
        <div style={{display: 'flex'}}>
          {
            page_return ?
              <Link to='/'>
                <IoIosArrowBack className='arrow me-1' size={28} />
              </Link>
              :
              <></>
          }
          <h1 className='mb-2'>Recipes</h1>
          <Link to="/saved" style={{margin: 'auto 18px auto auto', fontSize: '32'}}>
            {
              saved ?
                <FaBookmark style={{fontSize: '32'}} />
                :
                <FaRegBookmark style={{fontSize: '32'}} />
            }
          </Link>
        </div>

        <h5 className='sub-title mb-3' style={{fontWeight: 'normal'}}>Easy recipes to cook at home</h5>
        <form className="d-flex" role="search"
          onSubmit={e => {
              e.preventDefault();
              dispatch({ type: ACTIONS.QUERY, payload: e.target.search.value})
              dispatch({ type: ACTIONS.FILTER, payload: e.target.search.value})
              navigate('/recipes');
            }}
        >
        <input 
          className="form-control" 
          type="search" 
          id="search"
          placeholder="Search" 
          aria-label="Search"
        />
        </form>
      </div>
    )
}