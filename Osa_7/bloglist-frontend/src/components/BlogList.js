import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { useRef } from 'react'

import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <Togglable label="new blog" ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <p />
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle} data-testid="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}
export default BlogList
