import { gql } from '@apollo/client'

export const GET_WX_PAY_CONFIG = gql`
  query getWxPayConfig($productId: String!, $amount: Int!) {
    getWxPayConfig(productId: $productId, amount: $amount) {
      code
      message
      data {
        appId
        timeStamp
        nonceStr
        package
        signType
        paySign
      }
    }
  }
`
