import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const Login = (event) => {
    event.preventDefault()
    dispatch(
      handleLogin({
        username: username,
        password: password,
      })
    )
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={Login}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  )
}
export default LoginForm
