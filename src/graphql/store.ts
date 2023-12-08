import { gql } from '@apollo/client'

export const GET_STORE = gql`
  query getStore($id: String!) {
    getStore(id: $id) {
      code
      message
      data {
        id
        logo
        name
        tags
        tel
        longitude
        latitude
        address
        description
        businessLicense
        identityCardFrontImg
        identityCardBackImg
        frontImgs {
          id
          url
          remark
        }
        roomImgs {
          id
          url
          remark
        }
        otherImgs {
          id
          url
          remark
        }
      }
    }
  }
`
