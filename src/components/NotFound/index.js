import './index.css'

const NotFound = () => (
  <div className="not-container">
    <img
      alt="not found"
      className="not-image"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
    />
    <h1 className="not-header">Page Not Found</h1>
    <p className="not-para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
