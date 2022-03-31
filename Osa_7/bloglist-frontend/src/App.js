import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(
          setNotification(
            `${returnedBlog.title} by ${returnedBlog.author} added`,
            'success'
          )
        )
      })
      .catch((error) => {
        dispatch(setNotification(error.response.data.error, 'error'))
      })
  }

  const createNewLike = (blogObject) => {
    const blogToUpdate = blogs.find((blog) => blog.title === blogObject.title)
    const id = blogToUpdate.id
    blogService
      .update(id, blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
      })
      .catch((error) => {
        dispatch(setNotification(error.response.data.error, 'error'))
      })
  }

  const removeBlog = (event) => {
    const blogToDelete = blogs.find((blog) => blog.title === event.target.value)
    if (
      window.confirm(`Remove ${blogToDelete.title} by ${blogToDelete.author}?`)
    ) {
      blogService
        .remove(blogToDelete.id)
        .then((returnedBlog) => {
          setBlogs(
            blogs.filter((blog) => blog.id !== blogs.indexOf(returnedBlog))
          )
          dispatch(setNotification(`${blogToDelete.title} deleted`, 'success'))
        })
        .catch((error) => {
          dispatch(setNotification(error.response.data.error, 'error'))
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error'))
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} is logged in <button onClick={handleLogOut}>logout</button>
      <p />
      <Togglable label="new blog" ref={blogFormRef}>
        <NewBlogForm createNewBlog={addBlog} blogFormRef={blogFormRef} />
      </Togglable>
      <p />
      <BlogList
        blogs={blogs}
        createNewLike={createNewLike}
        removeBlog={removeBlog}
        user={user}
      />
    </div>
  )
}

export default App
