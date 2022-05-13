import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import BlogList from './BlogList'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

const FrontPage = () => {
  const blogFormRef = useRef()

  const user = useSelector((state) => state.user)

  return (
    <>
      <Togglable label="new blog" ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <p />
      <BlogList user={user} />
    </>
  )
}

export default FrontPage
