import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

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
      <h1>{user.name}</h1>
      <p />
      <h2>added blogs</h2>
      {userBlogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}

export default User
