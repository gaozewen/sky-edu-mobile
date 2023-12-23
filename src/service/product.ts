import { useLazyQuery, useQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import {
  GET_PRODUCT,
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCTS_BY_STORE_ID_FOR_H5,
  GET_PRODUCTS_FOR_H5,
} from '@/graphql/product'
import { IProduct, TProductQuery } from '@/types'
import SkyToast from '@/utils/skyToast'

export const useGetProductCategoriesService = () => {
  const { loading, data } = useQuery<TProductQuery>(GET_PRODUCT_CATEGORIES)

  return {
    data: data?.getProductCategories.data || [],
    loading,
  }
}

// 获取用户当前定位
const getPosition = () =>
  new Promise<{ longitude: number; latitude: number }>(resolve => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { longitude, latitude } = pos.coords
        resolve({ longitude, latitude })
      },
      err => {
        console.error('【getPosition】Error:', err)
        resolve({ longitude: 0, latitude: 0 })
      },
      {
        timeout: 3000,
        maximumAge: 1000 * 60, // 1 分钟内获取过就不再重新获取
      }
    )
  })

export const useGetProductsService = () => {
  const [getProducts] = useLazyQuery<TProductQuery>(GET_PRODUCTS_FOR_H5)

  const onGetProducts = async (params: {
    name?: string
    category?: string
    current?: number
    pageSize?: number
  }): Promise<{ products: IProduct[]; total: number }> => {
    SkyToast.loading()
    const { longitude, latitude } = await getPosition()
    const res = await getProducts({
      variables: {
        name: params.name,
        category: params.category,
        pageInfo: {
          pageNum: params.current || 1,
          pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
        },
        longitude,
        latitude,
      },
      onCompleted: async () => {
        SkyToast.close()
      },
    })

    return {
      products: res?.data?.getProductsForH5.data || [],
      total: res?.data?.getProductsForH5.pageInfo.total || 0,
    }
  }

  return {
    onGetProducts,
  }
}

export const useGetProductsByStoreIdService = (storeId: string) => {
  const { data } = useQuery<TProductQuery>(GET_PRODUCTS_BY_STORE_ID_FOR_H5, {
    variables: {
      storeId,
    },
  })

  return {
    data: data?.getProductsByStoreIdForH5.data,
  }
}

export const useGetProductService = (id: string) => {
  const { data, loading } = useQuery<TProductQuery>(GET_PRODUCT, {
    variables: {
      id,
    },
  })

  return {
    loading,
    data: data?.getProduct.data,
  }
}
