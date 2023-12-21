import { SearchBar } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'

import { useAppStoreContext } from '@/hooks/useAppStore'
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
  const [category, setCategory] = useState('all')
  const { store, setStore } = useAppStoreContext()
  const { onGetProducts, loading, total } = useGetProductsService()
  const currentRef = useRef(1)
  const isFirstRender = useRef(true)
  const { home } = store
  const data: IProduct[] = home[category] || []

  const hasMore = data.length < total

  // 搜索内容改变时初始化列表数据
  useEffect(() => {
    if (!isFirstRender.current) {
      init(true)
    }
  }, [name])

  // home[category] 不存在，即还未被赋值时，初始化列表数据
  useEffect(() => {
    if (!isFirstRender.current) {
      if (!home[category]) {
        init()
      }
    }
  }, [category])

  // 进入页面初始化
  useEffect(() => {
    init(true)
    // 一定要按顺序将空依赖 effect 放在最后
    isFirstRender.current = false
  }, [])

  const getProducts = async () => {
    const products = await onGetProducts({
      name,
      category: category === 'all' ? '' : category,
      current: currentRef.current,
    })
    return products || []
  }

  const init = async (isClearOtherCategoryData?: boolean) => {
    currentRef.current = 1
    const products = await getProducts()
    setStore({
      home: isClearOtherCategoryData
        ? {
            // 在 name 改变时清空 home store 中其他类型的列表数据, 以便于在切换 tab 时能 init 数据
            [category]: products,
          }
        : {
            ...home,
            [category]: products,
          },
    })
  }

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
    setStore({
      home: {
        ...home,
        [category]: [...data, ...append],
      },
    })
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
