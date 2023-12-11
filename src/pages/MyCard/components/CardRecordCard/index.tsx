import { Space, Tag } from 'antd-mobile'
import { BankcardOutline } from 'antd-mobile-icons'
import cs from 'classnames'
import dayjs from 'dayjs'

import { DAY_FORMAT } from '@/constants'
import { CardRecordStatus, CardType } from '@/enum'
import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'
import { ICardRecord } from '@/types'

import styles from './index.module.scss'

interface IProps {
  data: ICardRecord
}

/**
 * 消费卡记录卡片
 */
const CardRecordCard = ({ data }: IProps) => {
  const { goTo } = useGoTo()
  // 是否是次数卡
  const isTimeCard = data.card.type === CardType.TIME
  return (
    <div
      className={cs({
        [styles.container]: true,
        [styles.expired]: data.status === CardRecordStatus.EXPIRED,
        [styles.depleted]: data.status === CardRecordStatus.DEPLETED,
      })}
      onClick={() => goTo({ pathname: `${PN.PRODUCT}/${data.id}` })}
    >
      <Space justify="between" align="center" className={styles.top}>
        <span>
          <BankcardOutline />
          <span className={styles.name}>{data.card.name}</span>
        </span>

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
        <span>{data.store.name}</span>
        <span>有效期至：{dayjs(data.endTime).format(DAY_FORMAT)}</span>
      </Space>
    </div>
  )
}

export default CardRecordCard
