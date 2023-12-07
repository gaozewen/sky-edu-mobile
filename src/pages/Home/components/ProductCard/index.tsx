import { Image } from 'antd-mobile'
import { useEffect, useState } from 'react'

import { IProduct } from '@/types'

import styles from './index.module.scss'

interface IProps {
  data: IProduct
}

/**
 *  商品卡片
 */
const ProductCard = ({ data }: IProps) => {
  const [state, setState] = useState()
  useEffect(() => {
    console.log(state, setState)
  }, [])
  return (
    <div className={styles.container}>
      <Image className={styles.cover} src={data.coverUrl} />
      <div className={styles.info}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.store}>
          <span className={styles['store-name']}>{data.store.name}</span>
          <span className={styles.distance}>{data.distance || '未知'}</span>
        </div>
        <div className={styles.price}>
          <span className={styles['preferential-price']}>
            ¥{data.preferentialPrice}
          </span>
          <span className={styles['original-price']}>¥{data.originalPrice}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
