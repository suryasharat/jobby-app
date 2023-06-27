import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isSubmitFail: false, errorMsg: ''}

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = error => {
    this.setState({isSubmitFail: true, errorMsg: error})
  }

  submitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, isSubmitFail, errorMsg} = this.state

    return (
      <div className="login-bg">
        <form onSubmit={this.submitLogin} className="form-container">
          <img
            alt="website logo"
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <input
            placeholder="Username"
            onChange={this.changeUsername}
            value={username}
            className="login-input"
            type="text"
            id="username"
          />
          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <input
            placeholder="Password"
            className="login-input"
            onChange={this.changePassword}
            value={password}
            type="password"
            id="password"
          />
          <button className="login-button" type="submit">
            Login
          </button>
          {isSubmitFail && <p className="error-msg">{`*${errorMsg}`}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
