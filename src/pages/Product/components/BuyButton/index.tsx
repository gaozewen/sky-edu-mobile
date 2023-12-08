import { Grid } from 'antd-mobile'
import { PhoneFill } from 'antd-mobile-icons'

import { IProduct } from '@/types'

import styles from './index.module.scss'

interface IProps {
  data: IProduct
}

/**
 *  购买组件
 */
const BuyButton = ({ data }: IProps) => {
  return (
    <div className={styles.container}>
      <Grid columns={20}>
        <Grid.Item span={8}>
          <span className={styles.price}>¥{data.preferentialPrice}</span>
          <span className={styles['old-price']}>¥{data.originalPrice}</span>
        </Grid.Item>
        <Grid.Item span={4}>
          <a href={`tel:${data.store.tel}`}>
            <PhoneFill className={styles['icon-phone']} />
          </a>
        </Grid.Item>
        <Grid.Item span={8} className={styles.btn}>
          立即抢购
        </Grid.Item>
      </Grid>
    </div>
  )
}

export default BuyButton
