import { useSelector } from 'react-redux'
import User from './User'

const UsersList = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          <tr>
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default UsersList
