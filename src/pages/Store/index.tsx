import { ErrorBlock } from 'antd-mobile'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Hr from '@/components/Hr'
import { useGetStoreService } from '@/service/store'

import BaseInfo from './components/BaseInfo'
import DescInfo from './components/DescInfo'
import RecommendProducts from './components/RecommendProducts'
import styles from './index.module.scss'

/**
 * 门店详情页
 */
const Store = () => {
  const { id } = useParams()
  const { getStore, data, loading } = useGetStoreService()
  useEffect(() => {
    getStore({
      variables: {
        id,
      },
    })
  }, [])

  if (loading) return null

  if (!data) {
    return <ErrorBlock status="empty" style={{ marginTop: '18vh' }} />
  }

  return (
    <div className={styles.container}>
      <BaseInfo data={data} />
      <Hr />
      <DescInfo data={data} />
      <Hr />
      <RecommendProducts storeId={data.id} />
    </div>
  )
}

export default Store
