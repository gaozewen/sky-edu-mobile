import { gql } from '@apollo/client'

export const GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories {
    getProductCategories {
      code
      message
      data {
        key
        title
      }
    }
  }
`

export const GET_PRODUCTS_FOR_H5 = gql`
  query getProductsForH5($pageInfo: PageInfoDTO!, $category: String, $name: String) {
    getProductsForH5(pageInfo: $pageInfo, category: $category, name: $name) {
      code
      message
      data {
        id
        name
        desc
        category
        status
        stock
        limitBuyNumber
        coverUrl
        bannerUrl
        originalPrice
        preferentialPrice
        store {
          id
          name
        }
      }
      pageInfo {
        pageNum
        pageSize
        total
      }
    }
  }
`
