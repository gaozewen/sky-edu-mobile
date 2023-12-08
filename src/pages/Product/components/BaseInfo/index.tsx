import { Grid, Image } from 'antd-mobile'

import Hr from '@/components/Hr'
import { IProduct } from '@/types'

import styles from './index.module.scss'

interface IProps {
  data: IProduct
}

/**
 *  商品基本信息组件
 */
const BaseInfo = ({ data }: IProps) => {
  return (
    <>
      <div className={styles.container}>
        <Image src={data.bannerUrl} alt="商品 Banner" className={styles.banner} />
        <div className={styles.name}>{data.name}</div>
        <div className={styles.desc}>{data.desc}</div>
      </div>
      <Hr />
      <Grid columns={12} className={styles.count}>
        <Grid.Item span={4}>{`剩余库存：${data.curStock}`}</Grid.Item>
        <Grid.Item span={4}>{`每人限购：${data.limitBuyNumber}`}</Grid.Item>
        <Grid.Item span={4}>{`已售：${data.sellNumber}`}</Grid.Item>
      </Grid>
    </>
  )
}

export default BaseInfo
