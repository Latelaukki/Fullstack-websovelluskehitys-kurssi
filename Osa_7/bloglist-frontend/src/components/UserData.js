import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserData = ({ user }) => {
  if (!user) {
    return null
  }
  let count = 0
  const blogs = useSelector((state) => state.blogs)
  blogs.forEach((blog) => (blog.user.id === user.id ? (count += 1) : count))

  return (
    <>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{count}</td>
    </>
  )
}
export default UserData
