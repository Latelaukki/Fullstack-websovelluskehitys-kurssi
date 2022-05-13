import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Footer from './components/Footer'
import FrontPage from './components/FrontPage'
import UsersList from './components/UsersList'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setLoggedUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  return (
    <>
      <Footer />
      <Routes>
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </>
  )
}

export default App
