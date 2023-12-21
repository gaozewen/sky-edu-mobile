import { useQuery } from '@apollo/client'

import { GET_STUDENT_BY_JWT } from '@/graphql/student'
import { IStudent } from '@/types'

import { useAppStoreContext } from './useAppStore'
import useAutoNavigate from './useAutoNavigate'

export const useLoadStudentData = () => {
  const { resetStore } = useAppStoreContext()

  const { loading, refetch } = useQuery<{ getStudentByJWT: IStudent }>(
    GET_STUDENT_BY_JWT,
    {
      // 需要加上这个参数，onCompleted 和 onError 才会在每次 refetch 时确保触发
      notifyOnNetworkStatusChange: true,
      onCompleted: data => {
        const student = data.getStudentByJWT
        // 已登录
        if (student) {
          // 将用户信息存入 userContext 的 store 中
          resetStore({ user: student, refetchUser: refetch })
          // 当前在登录页面，直接跳到首页
          // 路由跳转交由 useAutoNavigate 统一控制
          return
        }
        resetStore({ refetchUser: refetch })
        // 路由跳转交由 useAutoNavigate 统一控制
      },
      onError: () => {
        // 获取用户信息失败( JWT 失效)
        resetStore({ refetchUser: refetch })
        // 路由跳转交由 useAutoNavigate 统一控制
      },
    }
  )

  useAutoNavigate(loading)
}
