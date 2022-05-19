import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

import { Button, TextField, Box } from '@mui/material'

const NewBlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      })
    )
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div data-testid="blog-form">
      {/*       <h2>create new</h2> */}
      <form onSubmit={addBlog}>
        <Box m={1}>
          <div>
            <TextField
              label="title"
              value={newTitle}
              name="title"
              onChange={({ target }) => setNewTitle(target.value)}
              id="title"
              size="small"
            />
          </div>
          <div>
            <TextField
              label="author"
              value={newAuthor}
              name="author"
              onChange={({ target }) => setNewAuthor(target.value)}
              id="author"
              size="small"
            />
          </div>
          <div>
            <TextField
              label="url"
              value={newUrl}
              name="url"
              onChange={({ target }) => setNewUrl(target.value)}
              id="url"
              size="small"
            />
          </div>
        </Box>
        <Button
          type="submit"
          variant="contained"
          id="create-button"
          sx={{ mt: 1 }}
        >
          create
        </Button>
      </form>
    </div>
  )
}
export default NewBlogForm
