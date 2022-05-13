import { useSelector } from 'react-redux'
import UserData from './UserData'

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
          {users.map((user) => (
            <tr key={user.id}>
              <UserData user={user} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default UsersList
