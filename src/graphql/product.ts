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
  query getProductsForH5(
    $pageInfo: PageInfoDTO!
    $longitude: Float!
    $latitude: Float!
    $category: String
    $name: String
  ) {
    getProductsForH5(
      pageInfo: $pageInfo
      longitude: $longitude
      latitude: $latitude
      category: $category
      name: $name
    ) {
      code
      message
      data {
        id
        name
        desc
        distance
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
