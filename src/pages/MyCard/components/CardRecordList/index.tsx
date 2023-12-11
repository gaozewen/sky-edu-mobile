import { ErrorBlock, InfiniteScroll, PullToRefresh } from 'antd-mobile'

import { ICardRecord } from '@/types'

import CardRecordCard from '../CardRecordCard'
import styles from './index.module.scss'

interface IProps {
  data: ICardRecord[]
  loading: boolean
  onRefresh: () => Promise<any>
  loadMore: () => Promise<any>
  hasMore: boolean
}

/**
 *  消费卡记录列表
 */
const CardRecordList = ({ data, loading, onRefresh, loadMore, hasMore }: IProps) => {
  if (loading) return null

  if (!data || data.length === 0) {
    return <ErrorBlock status="empty" style={{ marginTop: '18vh' }} />
  }

  return (
    <div className={styles.container}>
      <PullToRefresh onRefresh={onRefresh}>
        {data.map(p => (
          <CardRecordCard key={p.id} data={p} />
        ))}
      </PullToRefresh>

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} style={{ marginTop: 18 }} />
    </div>
  )
}

export default CardRecordList
