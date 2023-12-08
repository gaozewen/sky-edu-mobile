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

export const GET_PRODUCTS_BY_STORE_ID_FOR_H5 = gql`
  query getProductsByStoreIdForH5($storeId: String!) {
    getProductsByStoreIdForH5(storeId: $storeId) {
      code
      message
      data {
        id
        name
        desc
        coverUrl
        sellNumber
        originalPrice
        preferentialPrice
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    getProduct(id: $id) {
      code
      message
      data {
        id
        name
        desc
        category
        status
        stock
        curStock
        limitBuyNumber
        sellNumber
        coverUrl
        bannerUrl
        originalPrice
        preferentialPrice
        store {
          id
          name
          tel
          logo
        }
        cards {
          id
          name
          type
          time
          validateDay
          course {
            id
            name
            desc
            group
            baseAbility
            limitNumber
            duration
            reserveInfo
            refundInfo
            otherInfo
            weeklyOrderTimes {
              week
              orderTimes {
                id
                startTime
                endTime
              }
            }
          }
        }
      }
    }
  }
`
