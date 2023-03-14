
import {useState } from 'react'
import UserContextProvider from '../../../context/userContext'



import DashboardHeader from '../common/DashboardHeader'
import DashboardSidebar from '../common/DashboardSidebar'

export default function LayoutDashboard({children}) {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  return (
    <>
    <UserContextProvider>
      <div className="flex h-screen">
        {/* Narrow sidebar */}
        <DashboardSidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
            {/* Imagen de perfil, perfil y sign out */}
          <DashboardHeader mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

          {/* Main content */}
          {children}
          
        </div>
      </div>
      </UserContextProvider>
    </>
  )
}
