import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      state = state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
      return state
    },
    removeBlog(state, action) {
      const removedBlog = action.payload
      state = state.filter((blog) => blog.id !== state.indexOf(removedBlog))
      return state
    },
  },
})

export const { addBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(addBlog(newBlog))
      dispatch(
        setNotification(
          `${newBlog.title} by ${newBlog.author} added`,
          'success'
        )
      )
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error'))
    }
  }
}

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const changedBlog = { ...blogObject, likes: blogObject.likes + 1 }
      const updatedBlog = await blogService.update(changedBlog.id, changedBlog)
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error'))
    }
  }
}

export const handleAddComment = (blogObject, commentObject) => {
  return async (dispatch) => {
    try {
      const changedBlog = await blogService.createComment(
        blogObject.id,
        commentObject
      )
      dispatch(updateBlog(changedBlog))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error'))
    }
  }
}

export const deleteBlog = (blogObject) => {
  return async (dispatch) => {
    if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        const removedBlog = await blogService.remove(blogObject.id)
        dispatch(removeBlog(removedBlog))
        dispatch(setNotification(`${blogObject.title} deleted`, 'success'))
      } catch (error) {
        dispatch(setNotification(error.response.data.error, 'error'))
      }
    }
  }
}

export default blogSlice.reducer
