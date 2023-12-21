import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { isLoginOrRegisterRouter, isNeedLoginRouter, PN } from '@/router'

import { useAppStoreContext } from './useAppStore'
import { useGoTo } from './useGoTo'

// 根据不同情况处理当前页面路由的自动跳转
const useAutoNavigate = (loadingUserData: boolean) => {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const { store } = useAppStoreContext()
  const { user } = store
  const { goTo } = useGoTo()

  useEffect(() => {
    // 还在加载用户数据则不处理
    if (loadingUserData) return

    // 已登陆
    if (user.id) {
      // 如果当前路由是登录页时，跳转 orgUrl 页，否则跳转主页
      if (isLoginOrRegisterRouter(pathname)) {
        const orgUrlPathname = params.get('orgUrl')
        goTo({ pathname: orgUrlPathname || PN.HOME })
        return
      }
      // 非登录页，不做任何处理
      return
    }

    // 未登录
    // 如果当前路由需要登录，则自动跳转登录页
    if (isNeedLoginRouter(pathname)) {
      goTo({
        pathname: PN.LOGIN,
        search: `orgUrl=${pathname}`,
        replace: true,
      })
      return
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUserData, user.tel, pathname])
}

export default useAutoNavigate
