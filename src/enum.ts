export enum Week {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export enum CardType {
  TIME = 'time', // 次数卡
  DURATION = 'duration', // 时长卡
}

// 学生购买的消费卡记录状态
export enum CardRecordStatus {
  VALID = 'VALID', // 有效
  EXPIRED = 'EXPIRED', // 过期
  DEPLETED = 'DEPLETED', // 耗尽
}
