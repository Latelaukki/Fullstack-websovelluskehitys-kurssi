import { useSelector } from 'react-redux'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  let count = 0
  const blogs = useSelector((state) => state.blogs)
  blogs.forEach((blog) => (blog.user.id === user.id ? (count += 1) : count))

  return (
    <>
      <td>{user.name}</td>
      <td>{count}</td>
    </>
  )
}
export default User
