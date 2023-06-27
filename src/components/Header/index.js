import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <div className="header-text">
        <Link to="/">
          <button className="header-logo-button" type="button">
            <img
              alt="website logo"
              className="header-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </button>
        </Link>
        <ul className="header-list-container">
          <Link to="/" className="header-list-item">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="header-list-item">
            <li>Jobs</li>
          </Link>
        </ul>
        <button className="header-logout-button" onClick={logout} type="button">
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
