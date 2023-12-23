import { createBrowserRouter, matchPath, useLocation } from 'react-router-dom'

import SkyMobileLayout from '@/layouts/SkyMobileLayout'
import UserInfoLayout from '@/layouts/StudentInfoLayout'
import Buy from '@/pages/Buy'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import My from '@/pages/My'
import MyCard from '@/pages/MyCard'
import MySchedule from '@/pages/MySchedule'
import NotFound from '@/pages/NotFound'
import OrderCourse from '@/pages/OrderCourse'
import PayFail from '@/pages/PayFail'
import PaySuccess from '@/pages/PaySuccess'
import Product from '@/pages/Product'
import Profile from '@/pages/Profile'
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
  PAY_SUCCESS: '/pay-success',
  PAY_FAIL: '/pay-fail',
  PROFILE: '/profile',
  ORDER_COURSE: '/order-course',
  MY_SCHEDULE: '/my-schedule',
  MY_CARD: '/my-card',
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
  [PN.PAY_SUCCESS]: {
    key: PN.PAY_SUCCESS,
    path: '/pay-success',
    name: '支付成功',
  },
  [PN.PAY_FAIL]: {
    key: PN.PAY_FAIL,
    path: '/pay-fail',
    name: '支付失败',
  },
  [PN.PROFILE]: {
    key: PN.PROFILE,
    path: '/profile',
    name: '个人信息',
  },
  [PN.ORDER_COURSE]: {
    key: PN.ORDER_COURSE,
    path: '/order-course',
    name: '预约课程',
  },
  [PN.MY_SCHEDULE]: {
    key: PN.MY_SCHEDULE,
    path: '/my-schedule',
    name: '我的课程表',
  },
  [PN.MY_CARD]: {
    key: PN.MY_CARD,
    path: '/my-card',
    name: '我的消费卡',
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
          {
            path: PN.PROFILE,
            element: <Profile />,
          },
          {
            path: PN.ORDER_COURSE,
            element: <OrderCourse />,
          },
          {
            path: PN.MY_SCHEDULE,
            element: <MySchedule />,
          },
          {
            path: PN.MY_CARD,
            element: <MyCard />,
          },
        ],
      },
      {
        path: PN.PAY_SUCCESS,
        element: <PaySuccess />,
      },
      {
        path: PN.PAY_FAIL,
        element: <PayFail />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export const isLoginOrRegisterRouter = (pathname: string) => {
  return [PN.LOGIN, PN.REGISTER].includes(pathname)
}

// 是否是需要登录的路由
export const isNeedLoginRouter = (pathname: string) => {
  return [
    PN.BUY,
    PN.PAY_SUCCESS,
    PN.PAY_FAIL,
    PN.PROFILE,
    PN.ORDER_COURSE,
    PN.MY_SCHEDULE,
    PN.MY_CARD,
  ].includes(`/${pathname.split('/')[1]}`)
}

// 是底部 TabBar 导航路由
export const isTabBarRouter = (pathname: string) => {
  return [PN.HOME, PN.MY].includes(pathname)
}

// 当前路由是否不需要底部 TabBar
export const isNoTabBar = (route: AllRouteValueType) => {
  return [
    PN.LOGIN,
    PN.REGISTER,
    PN.STORE,
    PN.PRODUCT,
    PN.BUY,
    PN.PAY_SUCCESS,
    PN.PAY_FAIL,
    PN.PROFILE,
    PN.ORDER_COURSE,
    PN.MY_SCHEDULE,
    PN.MY_CARD,
  ].includes(route.key)
}

export default router
