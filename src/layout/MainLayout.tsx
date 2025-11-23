import React from 'react'
import MenuAppBar from '@/components/common/MenuAppBar'
import AppBottomNavigation from '@/components/common/AppBottomNavigation'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <MenuAppBar />
        {children}
        <AppBottomNavigation />
    </>
  )
}

export default MainLayout