import { Grid } from 'antd-mobile'
import { useEffect } from 'react'

import { useGetProductsService } from '@/service/product'

import ProductCard from '../ProductCard'
import styles from './index.module.scss'

/**
 *  商品列表
 */
const ProductList = () => {
  const { onGetProducts, data } = useGetProductsService()
  useEffect(() => {
    onGetProducts({})
  }, [])
  return (
    <div className={styles.container}>
      <Grid columns={2} gap={10}>
        {data.map(p => (
          <Grid.Item key={p.id}>
            <ProductCard data={p} />
          </Grid.Item>
        ))}
      </Grid>
    </div>
  )
}

export default ProductList
