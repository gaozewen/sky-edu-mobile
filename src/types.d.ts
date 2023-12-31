import { CardRecordStatus, ScheduleRecordStatus, Week } from './enum'

interface IPayResult {
  quantity: number
  productId: string
  price: number
  storeName: string
  productName: string
  productDesc: string
  rePay?: () => void
}

export interface IAppStore {
  user: IStudent
  refetchUser: () => void
  payResult?: IPayResult
  home: {
    // 用于存放首页每个 tab 的数据
    // "frontend": {...}
    [key: string]: {
      products: IProduct[]
      total: number
    }
  }
}

export interface IStudent {
  id: string
  tel: string
  nickname: string
  avatar: string
  wxOpenid: string
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
  courses?: ICourse[]
}

export interface IOrderTime {
  id: string
  startTime: string
  endTime: string
}

export interface IWeekOrderTime {
  week: Week
  orderTimes: IOrderTime[]
}

export interface ICourse {
  id: string
  coverUrl: string // 课程封面图
  name: string // 标题
  desc?: string
  group?: string // 适龄人群
  baseAbility?: string
  limitNumber: number // 限制人数
  duration: number // 持续时长
  reserveInfo?: string
  refundInfo?: string
  otherInfo?: string
  // 持续一周的可预约时间
  weeklyOrderTimes: IWeekOrderTime[]
  // 课程关联的所有消费卡名称，是前端去重拼接的
  cardName?: string
  teachers?: ITeacher[]
}

export interface ICard {
  id: string
  name?: string
  type?: string
  time?: number
  validateDay?: number
  course: ICourse
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
  cards: ICard[]
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
  getProductsByStoreIdForH5: {
    __typename?: 'ProductResultsVO'
    data: IProduct[]
  }
  getProduct: {
    __typename?: 'ProductResultVO'
    data: IProduct
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

export interface IWxPayConfig {
  appId: string
  timeStamp: string
  nonceStr: string
  package: string
  signType: string
  paySign: string
}

export type TWxPayQuery = {
  getWxPayConfig: {
    __typename?: 'WxPayConfigResultVO'
    data: IWxPayConfig
    code: number
    message: string
  }
}

export type TWxPayMutation = {
  mockWxPay?: {
    __typename?: 'ResultVO'
    code: number
    message: string
  }
}

export interface ICardRecord {
  id: string
  startTime: string
  endTime: string
  buyTime: string
  remainTime: number
  status: CardRecordStatus
  card: ICard
  store: IStore
}

export type TCardRecordQuery = {
  getCardRecordsForH5: {
    __typename?: 'getCardRecordsForH5'
    pageInfo: IPageInfo
    data: ICardRecord[]
    code: number
    message: string
  }
  getValidCardRecordsByCourse: {
    pageInfo: IPageInfo
    data: ICardRecord[]
    code: number
    message: string
  }
}

export interface ITeacher {
  id: string
  account: string
  password: string
  tel: string
  avatar: string
  nickname: string
  store: IStore
}

export interface ISchedule {
  id: string
  startTime: string
  endTime: string
  schoolDay: string
  limitNumber: number
  course: ICourse
  store: IStore
  teacher: ITeacher
}

export type TScheduleQuery = {
  getCanOrderedCoursesGroupByStore: {
    pageInfo: IPageInfo
    data: IStore[]
    code: number
    message: string
  }
  getSchedulesForNext7DaysByCourse: {
    pageInfo: IPageInfo
    data: ISchedule[]
    code: number
    message: string
  }
}

export type TScheduleMutation = {
  orderCourse: {
    code: number
    message: string
  }
}

export interface IScheduleRecord {
  id: string
  status: ScheduleRecordStatus
  student: IStudent
  cardRecord: ICardRecord
  schedule: ISchedule
  course: ICourse
  store: IStore
}

export type TScheduleRecordQuery = {
  getScheduleRecords: {
    pageInfo: IPageInfo
    data: IScheduleRecord[]
    code: number
    message: string
  }
}

export type TScheduleRecordMutation = {
  cancelOrderCourse: {
    code: number
    message: string
  }
}
