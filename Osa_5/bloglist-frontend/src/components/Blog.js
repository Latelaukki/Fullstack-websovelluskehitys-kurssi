import React, { useState } from 'react'

const Blog = ({ blog, createNewLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  console.log(blog.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showIfUser = { display: user.username === blog.user.username ? '' : 'none' }

  const addLike = () => {
    createNewLike({
      userId: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes : blog.likes + 1
    })
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}<button onClick={() => setVisible(!visible)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}<button onClick={() => setVisible(!visible)}>hide</button>
        <br/>
        {blog.url}
        <br/>
        likes: {blog.likes} <button onClick={() => addLike()}>like</button>
        <br/>
        {blog.user.username}
        <br/>
        <button onClick={removeBlog} value={blog.title} style={showIfUser}>remove</button>
      </div>
    </div>
  )
}

export default Blog