import { useLazyQuery, useMutation } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { CANCEL_ORDER_COURSE, GET_SCHEDULE_RECORDS } from '@/graphql/schedule-record'
import { TScheduleRecordMutation, TScheduleRecordQuery } from '@/types'
import SkyToast from '@/utils/skyToast'

export const useGetScheduleRecordsService = () => {
  const [get, { loading, data }] =
    useLazyQuery<TScheduleRecordQuery>(GET_SCHEDULE_RECORDS)
  const onGetScheduleRecords = async (params: {
    current?: number
    pageSize?: number
  }) => {
    const isShowLoading = params.current && params.current > 1
    if (isShowLoading) {
      SkyToast.loading()
    }

    const res = await get({
      variables: {
        pageInfo: {
          pageNum: params.current || 1,
          pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
        },
      },
      onCompleted: () => {
        if (isShowLoading) {
          SkyToast.close()
        }
      },
    })
    return res?.data?.getScheduleRecords.data || []
  }

  return {
    onGetScheduleRecords,
    loading,
    total: data?.getScheduleRecords.pageInfo.total || 0,
  }
}

export const useCancelOrderCourseService = () => {
  const [run, { loading }] = useMutation<TScheduleRecordMutation>(CANCEL_ORDER_COURSE)
  const cancelOrderCourse = async (scheduleRecordId: string) => {
    const res = await run({
      variables: {
        scheduleRecordId,
      },
    })

    return res.data?.cancelOrderCourse
  }

  return {
    cancelOrderCourse,
    loading,
  }
}
