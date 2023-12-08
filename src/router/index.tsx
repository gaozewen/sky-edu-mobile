import { createBrowserRouter, matchPath, useLocation } from 'react-router-dom'

import SkyMobileLayout from '@/layouts/SkyMobileLayout'
import UserInfoLayout from '@/layouts/StudentInfoLayout'
import Buy from '@/pages/Buy'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import My from '@/pages/My'
import Product from '@/pages/Product'
import Register from '@/pages/Register'
import Store from '@/pages/Store'

// PN: pathname
export const PN = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  MY: '/my',
  STORE: '/store',
  PRODUCT: '/product',
  BUY: '/buy',
}

type AllRouteValueType = {
  key: string
  path: string
  name: string
}

type AllRouteType = {
  [key: string]: AllRouteValueType
}

const ALL_ROUTE: AllRouteType = {
  [PN.LOGIN]: {
    key: PN.LOGIN,
    path: '/login',
    name: '登录',
  },
  [PN.REGISTER]: {
    key: PN.REGISTER,
    path: '/register',
    name: '注册',
  },
  [PN.HOME]: {
    key: PN.HOME,
    path: '/',
    name: '精品课程',
  },
  [PN.MY]: {
    key: PN.MY,
    path: '/my',
    name: '我的',
  },
  [PN.STORE]: {
    key: PN.STORE,
    path: '/store/:id',
    name: '门店详情',
  },
  [PN.PRODUCT]: {
    key: PN.PRODUCT,
    path: '/product/:id',
    name: '课程详情',
  },
  [PN.BUY]: {
    key: PN.BUY,
    path: '/buy/:id',
    name: '购买信息',
  },
}

export const useMatchedRoute = () => {
  const location = useLocation()
  const { pathname } = location
  const route = Object.values(ALL_ROUTE).find(r => matchPath(r.path, pathname))

  return route || { path: '', name: '', key: '' }
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
          {
            path: `${PN.PRODUCT}/:id`,
            element: <Product />,
          },
          {
            path: `${PN.BUY}/:id`,
            element: <Buy />,
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

// 当前路由是否不需要底部 TabBar
export const isNoTabBar = (route: AllRouteValueType) => {
  return [PN.LOGIN, PN.REGISTER, PN.STORE, PN.PRODUCT, PN.BUY].includes(route.key)
}

export default router
