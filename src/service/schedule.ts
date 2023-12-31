import { useLazyQuery, useMutation, useQuery } from '@apollo/client'

import {
  GET_CAN_ORDERED_COURSES_GROUP_BY_STORE,
  GET_SCHEDULES_FOR_NEXT_7_DAYS_BY_COURSE,
  ORDER_COURSE,
} from '@/graphql/schedule'
import { TScheduleMutation, TScheduleQuery } from '@/types'

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

// 获取当前课程在未来 7 天，可预约的课程表
export const useGetSchedulesForNext7DaysByCourseService = () => {
  const [get, { loading, data }] = useLazyQuery<TScheduleQuery>(
    GET_SCHEDULES_FOR_NEXT_7_DAYS_BY_COURSE
  )

  const getSchedulesForNext7DaysByCourse = (courseId: string) => {
    get({
      variables: {
        courseId,
      },
    })
  }

  return {
    loading,
    data: data?.getSchedulesForNext7DaysByCourse.data,
    getSchedulesForNext7DaysByCourse,
  }
}

export const useOrderCourseService = () => {
  const [run, { loading }] = useMutation<TScheduleMutation>(ORDER_COURSE)
  const orderCourse = async (scheduleId: string, cardRecordId: string) => {
    const res = await run({
      variables: {
        scheduleId,
        cardRecordId,
      },
    })

    return res.data?.orderCourse
  }

  return {
    orderCourse,
    loading,
  }
}
