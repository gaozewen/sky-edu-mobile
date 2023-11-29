import { createBrowserRouter } from 'react-router-dom'

import UserInfoLayout from '@/layouts/StudentInfoLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// PN: pathname
export const PN = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserInfoLayout />,
    children: [
      {
        path: PN.LOGIN,
        element: <Login />,
      },
      {
        path: PN.REGISTER,
        element: <Register />,
      },
    ],
  },
])

export const isLoginRouterOrRegister = (pathname: string) => {
  return [PN.LOGIN, PN.REGISTER].includes(pathname)
}

export default router
