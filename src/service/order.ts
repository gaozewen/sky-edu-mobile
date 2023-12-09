import { useLazyQuery, useMutation } from '@apollo/client'

import { GET_WX_PAY_CONFIG, MOCK_WX_PAY } from '@/graphql/order'
import { TWxPayMutation, TWxPayQuery } from '@/types'

export const useGetWxPayConfigService = () => {
  const [get, { loading }] = useLazyQuery<TWxPayQuery>(GET_WX_PAY_CONFIG)

  const getWxPayConfig = async (
    productId: string,
    quantity: number,
    amount: number
  ) => {
    const res = await get({
      variables: {
        productId,
        quantity,
        amount,
      },
    })
    return res?.data?.getWxPayConfig.data || {}
  }

  return {
    getWxPayConfig,
    loading,
  }
}

export const useMockWxPayService = () => {
  const [pay, { loading }] = useMutation<TWxPayMutation>(MOCK_WX_PAY)

  const mockWxPay = async (productId: string, quantity: number, amount: number) => {
    const res = await pay({
      variables: {
        productId,
        quantity,
        amount,
      },
    })
    return res?.data?.mockWxPay || { code: '', message: '支付失败' }
  }

  return {
    mockWxPay,
    loading,
  }
}
