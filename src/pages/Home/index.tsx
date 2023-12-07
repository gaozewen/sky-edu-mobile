import { SearchBar } from 'antd-mobile'
import { useEffect, useState } from 'react'

import { useGetProductsService } from '@/service/product'

import CateSelector from './components/CateSelector'
import ProductList from './components/ProductList'
import styles from './index.module.scss'

/**
 * 精品课程
 */
const Home = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const { onGetProducts, data, loading } = useGetProductsService()

  const init = () => {
    onGetProducts({ name, category: category === 'all' ? '' : category })
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

  return (
    <div className={styles.container}>
      <SearchBar placeholder="搜索课程试试" onSearch={onSearch} />
      <CateSelector onChange={onChange} />
      <ProductList data={data} loading={loading} onRefresh={onRefresh} />
    </div>
  )
}

export default Home
