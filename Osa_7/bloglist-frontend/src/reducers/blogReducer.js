import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const blogSlice = createSlice ({
  name: 'blog',
  initialState,
  reducers {
    addBlog (state, action) => {
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
  }
})

export default blogSlice.reducer
