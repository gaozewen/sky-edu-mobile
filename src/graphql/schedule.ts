import { gql } from '@apollo/client'

export const GET_CAN_ORDERED_COURSES_GROUP_BY_STORE = gql`
  query getCanOrderedCoursesGroupByStore {
    getCanOrderedCoursesGroupByStore {
      code
      message
      data {
        id
        logo
        name
        courses {
          id
          coverUrl
          name
          weeklyOrderTimes {
            week
            orderTimes {
              id
              startTime
              endTime
            }
          }
          teachers {
            id
            nickname
            avatar
          }
        }
      }
    }
  }
`

export const GET_SCHEDULES_FOR_NEXT_7_DAYS_BY_COURSE = gql`
  query getSchedulesForNext7DaysByCourse($courseId: String!) {
    getSchedulesForNext7DaysByCourse(courseId: $courseId) {
      code
      message
      data {
        id
        schoolDay
        startTime
        endTime
      }
      pageInfo {
        total
      }
    }
  }
`

export const ORDER_COURSE = gql`
  mutation orderCourse($scheduleId: String!, $cardRecordId: String!) {
    orderCourse(scheduleId: $scheduleId, cardRecordId: $cardRecordId) {
      code
      message
    }
  }
`
