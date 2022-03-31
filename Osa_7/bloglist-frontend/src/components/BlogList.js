import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ createNewLike, removeBlog, user }) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          createNewLike={createNewLike}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}
export default BlogList
