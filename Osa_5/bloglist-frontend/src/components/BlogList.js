import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, createNewLike, removeBlog, user }) => {
  BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    createNewLike: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  blogs = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

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
