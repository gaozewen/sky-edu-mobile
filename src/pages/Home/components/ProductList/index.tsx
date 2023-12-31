import { ErrorBlock, Grid, InfiniteScroll, PullToRefresh } from 'antd-mobile'

import { IProduct } from '@/types'

import ProductCard from '../ProductCard'
import styles from './index.module.scss'

interface IProps {
  data: IProduct[]
  onRefresh: () => Promise<any>
  loadMore: () => Promise<any>
  hasMore: boolean
}

/**
 *  商品列表
 */
const ProductList = ({ data, onRefresh, loadMore, hasMore }: IProps) => {
  if (!data || data.length === 0) {
    return <ErrorBlock status="empty" style={{ marginTop: '18vh' }} />
  }

  return (
    <div className={styles.container}>
      <PullToRefresh onRefresh={onRefresh}>
        <Grid columns={2} gap={8}>
          {data.map(p => (
            <Grid.Item key={p.id}>
              <ProductCard data={p} />
            </Grid.Item>
          ))}
        </Grid>
      </PullToRefresh>

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} style={{ marginTop: 18 }} />
    </div>
  )
}

export default ProductList
