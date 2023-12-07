import { createBrowserRouter } from 'react-router-dom'

import SkyMobileLayout from '@/layouts/SkyMobileLayout'
import UserInfoLayout from '@/layouts/StudentInfoLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import My from '@/pages/My'
import Register from '@/pages/Register'

// PN: pathname
export const PN = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  MY: '/my',
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
      {
        path: '/',
        element: <SkyMobileLayout />,
        children: [
          {
            path: PN.HOME,
            element: <Home />,
          },
          {
            path: PN.MY,
            element: <My />,
          },
        ],
      },
    ],
  },
])

export const isLoginOrRegisterRouter = (pathname: string) => {
  return [PN.LOGIN, PN.REGISTER].includes(pathname)
}

// 是底部 TabBar 导航路由
export const isTabBarRouter = (pathname: string) => {
  return [PN.HOME, PN.MY].includes(pathname)
}

export default router
