import { Outlet } from 'react-router-dom'
import Footer from '../Footer'

import Navigation from '../Navigation'

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout