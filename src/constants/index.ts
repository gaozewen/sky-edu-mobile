import { ScheduleRecordStatus, Week } from '@/enum'

export const DEFAULT_PAGE_SIZE = 10
export const IS_MOCK_PAY = true
export const DAY_FORMAT = 'YYYY-MM-DD'
export const WEEK = {
  [Week.Monday]: '周一',
  [Week.Tuesday]: '周二',
  [Week.Wednesday]: '周三',
  [Week.Thursday]: '周四',
  [Week.Friday]: '周五',
  [Week.Saturday]: '周六',
  [Week.Sunday]: '周日',
}
export const SCHEDULE_RECORD_STATUS = {
  [ScheduleRecordStatus.PENDING]: {
    color: 'primary',
    label: '未开始',
  },
  [ScheduleRecordStatus.DOING]: {
    color: 'success',
    label: '上课中',
  },
  [ScheduleRecordStatus.DONE]: {
    color: 'default',
    label: '下课了',
  },
  [ScheduleRecordStatus.COMMENTED]: {
    color: 'warning',
    label: '已评价',
  },
  [ScheduleRecordStatus.CANCEL]: {
    color: 'danger',
    label: '已取消',
  },
}
