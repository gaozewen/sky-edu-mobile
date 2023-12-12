import { useQuery } from '@apollo/client'

import { GET_CAN_ORDERED_COURSES_GROUP_BY_STORE } from '@/graphql/schedule'
import { TScheduleQuery } from '@/types'

// 获取我可以预约的课程
export const useGetCanOrderedCoursesGroupByStoreService = () => {
  const { loading, data } = useQuery<TScheduleQuery>(
    GET_CAN_ORDERED_COURSES_GROUP_BY_STORE
  )

  return {
    loading,
    data: data?.getCanOrderedCoursesGroupByStore.data,
  }
}
