import { useSelector } from 'react-redux'
import {
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material'
import UserData from './UserData'

const UsersList = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <Typography variant="h4">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="center">Blogs created</TableCell>
            </TableRow>
            {users.map((user) => (
              <TableRow key={user.id}>
                <UserData user={user} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default UsersList
