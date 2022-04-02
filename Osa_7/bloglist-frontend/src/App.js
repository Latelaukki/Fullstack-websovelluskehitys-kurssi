import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/userReducer'
import { handleLogOut } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setLoggedUser())
  }, [dispatch])

  const logOut = () => {
    dispatch(handleLogOut())
  }

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
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} is logged in <button onClick={logOut}>logout</button>
      <p />
      <Togglable label="new blog" ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <p />
      <BlogList user={user} />
    </div>
  )
}

export default App
