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
          }
        }
      }
    }
  }
`
