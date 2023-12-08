import { Card, ErrorBlock, Grid, Image } from 'antd-mobile'

import { useGetProductsByStoreIdService } from '@/service/product'

import styles from './index.module.scss'

interface IProps {
  storeId: string
}

/**
 *  推荐商品
 */
const RecommendProducts = ({ storeId }: IProps) => {
  const { data } = useGetProductsByStoreIdService(storeId)

  return (
    <Card title="推荐课程" className={styles.container}>
      {!data && (
        <ErrorBlock
          status="empty"
          style={{ padding: '20px 0 40px' }}
          title="没有推荐的课程"
          description=""
        />
      )}
      {(data || []).map(p => (
        <Grid key={p.id} columns={12} className={styles.product}>
          <Grid.Item span={2}>
            <Image src={p.coverUrl} alt="商品图片" className={styles.cover} />
          </Grid.Item>

          <Grid.Item span={8} className={styles.content}>
            <div className={styles.name}>{p.name}</div>
            <div className={styles.desc}>
              <span className={styles.text}>{p.desc}</span>
              <span className={styles['sell-number']}>
                已售&nbsp;{p.sellNumber || 0}
              </span>
            </div>
          </Grid.Item>

          <Grid.Item span={2}>
            <div className={styles.price}>¥ {p.preferentialPrice}</div>
            <div className={styles['old-price']}>¥ {p.originalPrice}</div>
          </Grid.Item>
        </Grid>
      ))}
    </Card>
  )
}

export default RecommendProducts
