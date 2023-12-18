import { SearchBar } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'

import { useGetProductsService } from '@/service/product'
import { IProduct } from '@/types'

import CateSelector from './components/CateSelector'
import ProductList from './components/ProductList'
import styles from './index.module.scss'

/**
 * 精品课程
 */
const Home = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const { onGetProducts, loading, total } = useGetProductsService()
  const currentRef = useRef(1)
  const [data, setData] = useState<IProduct[]>([])

  const hasMore = data.length < total

  const getProducts = async () => {
    const products = await onGetProducts({
      name,
      category: category === 'all' ? '' : category,
      current: currentRef.current,
    })
    return products || []
  }

  const init = async () => {
    currentRef.current = 1
    const products = await getProducts()
    setData(products)
  }

  useEffect(() => {
    init()
  }, [name, category])

  const onSearch = (val: string) => {
    setName(val)
  }
  const onChange = (key: string) => {
    setCategory(key)
  }

  const onRefresh = async () => {
    init()
  }

  const loadMore = async () => {
    currentRef.current += 1
    const append = await getProducts()
    setData(val => [...val, ...append])
  }

  return (
    <>
      <div className={styles.container}>
        <SearchBar
          placeholder="搜索课程试试"
          onSearch={onSearch}
          onClear={() => onSearch('')}
        />
        <CateSelector onChange={onChange} />
      </div>
      <ProductList
        data={data}
        loading={loading}
        onRefresh={onRefresh}
        loadMore={loadMore}
        hasMore={hasMore}
      />
    </>
  )
}

export default Home
