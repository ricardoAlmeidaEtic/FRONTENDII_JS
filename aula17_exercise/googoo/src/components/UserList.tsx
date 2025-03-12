import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUsers } from '../redux/usersSlice'
import type { AppDispatch, RootState } from '../redux/store' // Create this if missing

// Define user type if not existing
type User = {
  id: string | number;
  name: string;
  // Add other properties as needed
}

const UserList = () => {
  // Type the dispatch for async thunks
  const dispatch = useDispatch<AppDispatch>()
  
  // Properly type the useSelector hooks
  const users = useSelector((state: RootState) => state.users.users)
  const status = useSelector((state: RootState) => state.users.status)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (status === 'loading') return <p>A carregar...</p>
  if (status === 'failed') return <p>Erro ao carregar utilizadores.</p>

  return (
    <ul>
      {users.map((user: User) => ( // Add type to user
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export default UserList