import { useLazyQuery } from '@apollo/client'

import { GET_STORE } from '@/graphql/store'
import { IStore, TStoreQuery } from '@/types'

/**
 * 获取门店信息
 * @returns {TStoreQuery}
 */
export const useGetStoreService = () => {
  const [getStore, { loading, data }] = useLazyQuery<TStoreQuery>(GET_STORE)

  return {
    getStore,
    loading,
    data: data?.getStore.data as IStore,
  }
}
