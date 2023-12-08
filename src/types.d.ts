export interface IStudent {
  id: string
  tel: string
  nickname: string
  avatar: string
  refetchHandler: () => void
  currentOrg?: string
}

export interface IPageInfo {
  pageNum: number
  pageSize: number
  total: number
}

export type IResult = {
  code: number | undefined
  message: string | undefined
}

export interface IProductCategory {
  key: string
  title: string
}

export interface IMedia {
  id: string
  url: string
  remark: string
}

export interface IStore {
  id: string
  frontImgs?: IMedia[]
  roomImgs?: IMedia[]
  otherImgs?: IMedia[]
  name: string
  logo: string
  tags?: string
  description?: string
  address?: string
  tel?: string
  longitude?: string
  latitude?: string
  identityCardBackImg: string
  identityCardFrontImg: string
  businessLicense: string
}

export interface IProduct {
  id: string
  name: string
  desc: string
  distance?: string
  status: ProductStatus
  category: string
  stock: number
  curStock?: number
  sellNumber?: number
  limitBuyNumber: number
  coverUrl: string
  bannerUrl: string
  originalPrice: number
  preferentialPrice: number
  store: IStore
}

export type TProductQuery = {
  getProductCategories: {
    __typename?: 'ProductResultsVO'
    data: IProductCategory[]
    code: number
    message: string
  }
  getProductsForH5: {
    __typename?: 'ProductResultsVO'
    data: IProduct[]
    pageInfo: IPageInfo
  }
}

export type TStoreQuery = {
  getStore: {
    __typename?: 'StoreResultVO'
    data: IStore
    code: number
    message: string
  }
}
