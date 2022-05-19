import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { TextField, Button } from '@mui/material'

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
        <TextField
          label="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        login
      </Button>
    </form>
  )
}
export default LoginForm
