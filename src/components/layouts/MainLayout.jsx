import '../../styles/app.scss'
import { Outlet } from 'react-router-dom'

import Navigation from '../Navigation'

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default MainLayout