import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

const User = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((user) => user.id === id)

  const blogs = useSelector((state) => state.blogs)
  const userBlogs = blogs.filter((blog) => blog.user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant="h4">{user.name}</Typography>
      <p />
      <Typography variant="h5" mb={1}>
        Added blogs
      </Typography>
      <List>
        {userBlogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default User
