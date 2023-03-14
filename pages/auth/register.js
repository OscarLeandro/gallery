
import LayoutRegister from '../../components/auth/layouts/LayoutRegister'
import UserContextProvider from '../../context/userContext'

export default function Register() {
  return (
    <UserContextProvider>

    <LayoutRegister />
    </UserContextProvider>
  )
}

