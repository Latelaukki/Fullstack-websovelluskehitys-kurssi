import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { handleLogOut } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const logOut = () => {
    dispatch(handleLogOut())
  }

  const style = {
    background: 'lightgrey',
  }

  const padding = {
    padding: 5,
  }

  return (
    <div style={style}>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <>
          <em>{user.name} logged in </em>
          <button onClick={logOut}>logout</button>
        </>
      ) : (
        <Link to="/login">login</Link>
      )}
    </div>
  )
}
export default Navigation
