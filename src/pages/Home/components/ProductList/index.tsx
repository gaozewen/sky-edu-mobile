import { ErrorBlock, Grid, PullToRefresh } from 'antd-mobile'

import { IProduct } from '@/types'

import ProductCard from '../ProductCard'
import styles from './index.module.scss'

interface IProps {
  data: IProduct[]
  loading: boolean
  onRefresh: () => Promise<any>
}

/**
 *  商品列表
 */
const ProductList = ({ data, loading, onRefresh }: IProps) => {
  if (!loading && (!data || data.length === 0)) {
    return <ErrorBlock status="empty" style={{ marginTop: '18vh' }} />
  }

  return (
    <div className={styles.container}>
      <PullToRefresh onRefresh={onRefresh}>
        <Grid columns={2} gap={10}>
          {data.map(p => (
            <Grid.Item key={p.id}>
              <ProductCard data={p} />
            </Grid.Item>
          ))}
        </Grid>
      </PullToRefresh>
    </div>
  )
}

export default ProductList
