import { useLazyQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import {
  GET_CARD_RECORDS_FOR_H5,
  GET_VALID_CARD_RECORDS_BY_COURSE,
} from '@/graphql/card-record'
import { TCardRecordQuery } from '@/types'
import SkyToast from '@/utils/skyToast'

export const useGetCardRecordsService = () => {
  const [getCardRecords, { loading, data }] = useLazyQuery<TCardRecordQuery>(
    GET_CARD_RECORDS_FOR_H5
  )
  const onGetCardRecords = async (params: { current?: number; pageSize?: number }) => {
    const isShowLoading = params.current && params.current > 1
    if (isShowLoading) {
      SkyToast.loading()
    }

    const res = await getCardRecords({
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
    return res?.data?.getCardRecordsForH5.data || []
  }

  return {
    onGetCardRecords,
    loading,
    total: data?.getCardRecordsForH5.pageInfo.total || 0,
  }
}

// 获取当前学生某个课程可用的消费卡记录
export const useGetValidCardRecordsByCourseService = () => {
  const [get, { loading, data }] = useLazyQuery<TCardRecordQuery>(
    GET_VALID_CARD_RECORDS_BY_COURSE
  )
  const getValidCardRecordsByCourse = async (courseId: string) => {
    await get({
      variables: {
        courseId,
      },
    })
  }

  return {
    getValidCardRecordsByCourse,
    loading,
    data: data?.getValidCardRecordsByCourse.data,
    total: data?.getValidCardRecordsByCourse.pageInfo.total || 0,
  }
}
