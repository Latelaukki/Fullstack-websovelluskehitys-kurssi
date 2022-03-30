import React, { useState } from 'react'

const Blog = ({ blog, createNewLike, removeBlog, user }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [label, setLabel] = useState('view')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showIfUser = {
    display: user.username === blog.user.username ? '' : 'none',
  }

  const changeView = () => {
    setShowInfo(!showInfo)
    label === 'hide' ? setLabel('view') : setLabel('hide')
  }

  const addLike = () => {
    createNewLike({
      userId: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    })
  }

  return (
    <div style={blogStyle} data-testid="blog">
      {blog.title} {blog.author}
      <button onClick={changeView} id="info-button">
        {label}
      </button>
      {showInfo && (
        <div>
          {blog.url}
          <br />
          likes: {blog.likes} <button onClick={() => addLike()}>like</button>
          <br />
          {blog.user.name}
          <br />
          <button onClick={removeBlog} value={blog.title} style={showIfUser}>
            remove
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog
