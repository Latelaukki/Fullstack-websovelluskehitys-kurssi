import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

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
      <h1>
        {blog.title} {blog.author}
      </h1>
      <p />
      <a href={`${blog.url}`}>{blog.url}</a>
      <br />
      {blog.likes} likes <button onClick={() => addLike(blog)}>like</button>
      <br />
      added by {blog.user.name}
      <br />
      <button
        onClick={() => removeBlog(blog)}
        value={blog.title}
        style={showIfUser}
      >
        remove
      </button>
    </div>
  )
}

export default Blog
