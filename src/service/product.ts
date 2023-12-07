import { useLazyQuery, useQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { GET_PRODUCT_CATEGORIES, GET_PRODUCTS_FOR_H5 } from '@/graphql/product'
import { TProductQuery } from '@/types'
import SkyToast from '@/utils/skyToast'

export const useGetProductCategoriesService = () => {
  const { loading, data } = useQuery<TProductQuery>(GET_PRODUCT_CATEGORIES)

  return {
    data: data?.getProductCategories.data || [],
    loading,
  }
}

export const useGetProductsService = () => {
  const [getProducts, { loading, data }] =
    useLazyQuery<TProductQuery>(GET_PRODUCTS_FOR_H5)

  const onGetProducts = async (params: {
    name?: string
    category?: string
    current?: number
    pageSize?: number
  }) => {
    SkyToast.loading()
    const res = await getProducts({
      variables: {
        name: params.name,
        category: params.category,
        pageInfo: {
          pageNum: params.current || 1,
          pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
        },
      },
    })
    SkyToast.close()
    return res?.data?.getProductsForH5.data || []
  }

  return {
    onGetProducts,
    loading,
    total: data?.getProductsForH5.pageInfo.total || 0,
  }
}
