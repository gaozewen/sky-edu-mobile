import { gql } from '@apollo/client'

export const GET_SCHEDULE_RECORDS = gql`
  query getScheduleRecords($pageInfo: PageInfoDTO!) {
    getScheduleRecords(pageInfo: $pageInfo) {
      code
      message
      pageInfo {
        total
        pageNum
        pageSize
      }
      data {
        id
        status
        schedule {
          schoolDay
          startTime
          endTime
          teacher {
            id
            nickname
            avatar
          }
        }
        course {
          id
          name
          coverUrl
        }
        store {
          id
          name
          logo
        }
      }
    }
  }
`

export const CANCEL_ORDER_COURSE = gql`
  mutation cancelOrderCourse($scheduleRecordId: String!) {
    cancelOrderCourse(scheduleRecordId: $scheduleRecordId) {
      code
      message
    }
  }
`
