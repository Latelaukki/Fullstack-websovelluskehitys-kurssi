import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Footer from './components/Footer'
import UsersList from './components/UsersList'
import User from './components/User'
import BlogList from './components/BlogList'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setLoggedUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector((state) => state.user)

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
        <Route path="/blogs/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </>
  )
}

export default App
