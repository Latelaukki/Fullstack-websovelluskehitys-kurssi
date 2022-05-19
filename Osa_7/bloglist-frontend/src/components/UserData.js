import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TableCell } from '@mui/material'

const UserData = ({ user }) => {
  if (!user) {
    return null
  }
  let count = 0
  const blogs = useSelector((state) => state.blogs)
  blogs.forEach((blog) => (blog.user.id === user.id ? (count += 1) : count))

  return (
    <>
      <TableCell align="left" data-testid="blog">
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </TableCell>
      <TableCell align="center">{count}</TableCell>
    </>
  )
}
export default UserData
