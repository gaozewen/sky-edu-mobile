import { ErrorBlock } from 'antd-mobile'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useGetStoreService } from '@/service/store'

import BaseInfo from './components/BaseInfo'
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
    </div>
  )
}

export default Store
