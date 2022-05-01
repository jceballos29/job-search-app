import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'


const Home = lazy(() => import('../pages/Home'))
const Register = lazy(() => import('../pages/Register'))
const SignIn = lazy(() => import('../pages/SignIn'))


const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <SignIn />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
]

const AppRoutes = () => useRoutes(routes)

export default AppRoutes;