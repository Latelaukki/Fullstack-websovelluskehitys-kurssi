import { useDispatch, useSelector } from 'react-redux'

import Notification from './Notification'
import { handleLogOut } from '../reducers/userReducer'

const Footer = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const logOut = () => {
    dispatch(handleLogOut())
  }

  return (
    <>
      <h2>Blogs</h2>
      <Notification />
      {user.name} is logged in <button onClick={logOut}>logout</button>
    </>
  )
}
export default Footer
