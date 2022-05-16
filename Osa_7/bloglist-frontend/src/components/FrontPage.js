import React, { useRef } from 'react'

import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

const FrontPage = () => {
  const blogFormRef = useRef()

  return (
    <>
      <Togglable label="new blog" ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <p />
    </>
  )
}

export default FrontPage
