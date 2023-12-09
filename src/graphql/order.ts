import { gql } from '@apollo/client'

export const GET_WX_PAY_CONFIG = gql`
  query getWxPayConfig($productId: String!, $quantity: Int!, $amount: Int!) {
    getWxPayConfig(productId: $productId, quantity: $quantity, amount: $amount) {
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

export const MOCK_WX_PAY = gql`
  mutation mockWxPay($productId: String!, $quantity: Int!, $amount: Int!) {
    mockWxPay(productId: $productId, quantity: $quantity, amount: $amount) {
      code
      message
    }
  }
`
