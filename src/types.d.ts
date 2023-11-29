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
