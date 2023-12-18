import { Image } from 'antd-mobile'

import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'
import { IProduct } from '@/types'
import { ImgUtils } from '@/utils'

import styles from './index.module.scss'

interface IProps {
  data: IProduct
}

/**
 *  商品卡片
 */
const ProductCard = ({ data }: IProps) => {
  const { goTo } = useGoTo()
  return (
    <div
      className={styles.container}
      onClick={() => goTo({ pathname: `${PN.PRODUCT}/${data.id}` })}
    >
      <Image
        lazy
        className={styles.cover}
        src={ImgUtils.getThumb({
          url: data.coverUrl,
          w: 320,
          h: 180,
        })}
        alt="商品封面图"
      />
      <div className={styles.info}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.store}>
          <span
            className={styles['store-name']}
            onClick={e => {
              e.stopPropagation()
              goTo({ pathname: `${PN.STORE}/${data.store.id}` })
            }}
          >
            {data.store.name}
          </span>
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
