import { createBrowserRouter, matchPath, useLocation } from 'react-router-dom'

import SkyMobileLayout from '@/layouts/SkyMobileLayout'
import UserInfoLayout from '@/layouts/StudentInfoLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import My from '@/pages/My'
import Register from '@/pages/Register'
import Store from '@/pages/Store'

// PN: pathname
export const PN = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  MY: '/my',
  STORE: '/store',
}

const ALL_ROUTE = {
  [PN.LOGIN]: {
    path: '/login',
    name: '登录',
  },
  [PN.REGISTER]: {
    path: '/register',
    name: '注册',
  },
  [PN.HOME]: {
    path: '/',
    name: '精品课程',
  },
  [PN.MY]: {
    path: '/my',
    name: '我的',
  },
  [PN.STORE]: {
    path: '/store/:id',
    name: '门店详情',
  },
}

export const useMatchedRoute = () => {
  const location = useLocation()
  const { pathname } = location
  const route = Object.values(ALL_ROUTE).find(r => matchPath(r.path, pathname))

  return route || { path: '', name: '' }
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
          {
            path: `${PN.STORE}/:id`,
            element: <Store />,
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
