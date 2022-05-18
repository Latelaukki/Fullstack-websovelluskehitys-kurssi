import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { handleAddComment } from '../reducers/blogReducer'

const CommentForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  const addComment = (event) => {
    event.preventDefault()
    dispatch(
      handleAddComment(blog, {
        content: content,
      })
    )
    setContent('')
  }

  return (
    <form onSubmit={addComment}>
      <div>
        <p />
        <input
          id="content"
          type="text"
          value={content}
          name="Content"
          onChange={({ target }) => setContent(target.value)}
        />
        <button type="submit" id="comment-button">
          add comment
        </button>
      </div>
    </form>
  )
}
export default CommentForm
