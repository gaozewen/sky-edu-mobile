import { useLazyQuery } from '@apollo/client'

import { GET_WX_PAY_CONFIG } from '@/graphql/order'
import { TWxPayQuery } from '@/types'

export const useGetWxPayConfigService = () => {
  const [get, { loading }] = useLazyQuery<TWxPayQuery>(GET_WX_PAY_CONFIG)

  const getWxPayConfig = async (productId: string, amount: number) => {
    const res = await get({
      variables: {
        productId,
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
