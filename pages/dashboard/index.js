import LayoutDashboard from '../../components/dashboard/layouts/LayoutDashboard'
import UserContextProvider from '../../context/userContext'

export default function Dashboard() {
  return (
    <UserContextProvider>
      <LayoutDashboard />
    </UserContextProvider>
  )
}
