import { Space, Tag } from 'antd-mobile'
import { BankcardOutline } from 'antd-mobile-icons'
import cs from 'classnames'
import dayjs from 'dayjs'

import { DAY_FORMAT } from '@/constants'
import { CardRecordStatus, CardType } from '@/enum'
import { ICardRecord } from '@/types'

import styles from './index.module.scss'

interface IProps {
  data: ICardRecord
}

/**
 * 消费卡记录卡片
 */
const CardRecordCard = ({ data }: IProps) => {
  // 是否是次数卡
  const isTimeCard = data.card.type === CardType.TIME
  return (
    <div
      className={cs({
        [styles.container]: true,
        [styles.expired]: data.status === CardRecordStatus.EXPIRED,
        [styles.depleted]: data.status === CardRecordStatus.DEPLETED,
      })}
    >
      <Space justify="between" align="start" className={styles.top}>
        <div className={styles.left}>
          <BankcardOutline />
          <div className={styles.name}>{data.card.name}</div>
        </div>

        {isTimeCard ? (
          <Tag color="#fff" fill="outline">
            次数卡(余{data.remainTime})
          </Tag>
        ) : (
          <Tag color="#fff" fill="outline">
            时长卡
          </Tag>
        )}
      </Space>

      <Space justify="between" align="center" className={styles.bottom}>
        <div className={styles['store-name']}>{data.store.name}</div>
        <div>有效期至：{dayjs(data.endTime).format(DAY_FORMAT)}</div>
      </Space>
    </div>
  )
}

export default CardRecordCard
