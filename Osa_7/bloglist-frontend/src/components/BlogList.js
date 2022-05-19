import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { useRef } from 'react'

import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'

import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <Typography variant="h4">Blogs</Typography>
      <Togglable label="new blog" ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id} data-testid="blog">
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default BlogList
