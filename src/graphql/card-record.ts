import { gql } from '@apollo/client'

export const GET_CARD_RECORDS_FOR_H5 = gql`
  query getCardRecordsForH5($pageInfo: PageInfoDTO!) {
    getCardRecordsForH5(pageInfo: $pageInfo) {
      code
      message
      pageInfo {
        total
        pageNum
        pageSize
      }
      data {
        id
        startTime
        endTime
        buyTime
        remainTime
        status
        card {
          id
          name
          type
          validateDay
        }
        store {
          id
          name
        }
      }
    }
  }
`
