import { Space, Tag } from 'antd-mobile'
import { BankcardOutline } from 'antd-mobile-icons'
import dayjs from 'dayjs'

import { DAY_FORMAT } from '@/constants'
import { CardType } from '@/enum'
import { ICardRecord } from '@/types'

import styles from './index.module.scss'

interface IProps {
  data: ICardRecord
}
/**
 * 消费卡记录卡片
 */
const CardRecordCard = ({ data }: IProps) => {
  // 是次卡
  const isTimeCard = data.card.type === CardType.TIME

  return (
    <div className={styles.container}>
      <Space justify="between" align="center" className={styles.top}>
        <span>
          <BankcardOutline />
          <span className={styles.name}>{data.card.name}</span>
        </span>

        {isTimeCard ? (
          <Tag color="warning" fill="outline">
            次数卡(余{data.remainTime})
          </Tag>
        ) : (
          <Tag color="primary" fill="outline">
            时长卡
          </Tag>
        )}
      </Space>

      <Space justify="between" align="center" className={styles.bottom}>
        <span>{data.store.name}</span>
        <span>有效期至：{dayjs(data.endTime).format(DAY_FORMAT)}</span>
      </Space>
    </div>
  )
}

export default CardRecordCard
