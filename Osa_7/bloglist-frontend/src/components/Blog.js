import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography, Button } from '@mui/material'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const Blog = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const user = useSelector((state) => state.user)

  if (!blog) {
    return null
  }

  const showIfUser = {
    display: user.username === blog.user.username ? '' : 'none',
  }

  const addLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = (blog) => {
    dispatch(deleteBlog(blog))
  }

  return (
    <div>
      <Typography variant="h5">
        {blog.title} by {blog.author}
      </Typography>
      <p />
      <Typography variant="h6">
        <a href={`${blog.url}`}>{blog.url}</a>
      </Typography>
      <Typography variant="string">
        {blog.likes} likes{' '}
        <Button
          variant="contained"
          size="small"
          sx={{ my: 2 }}
          onClick={() => addLike(blog)}
        >
          like
        </Button>
      </Typography>
      <Typography variant="h6">added by {blog.user.name}</Typography>
      <br />
      <Button
        variant="outlined"
        onClick={() => removeBlog(blog)}
        value={blog.title}
        style={showIfUser}
      >
        remove
      </Button>
      <CommentForm />
      <Typography variant="h6" sx={{ my: 2 }}>
        Comments
      </Typography>
      {blog.comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </div>
  )
}

export default Blog
