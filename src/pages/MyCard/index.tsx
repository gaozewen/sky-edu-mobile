import { useEffect, useRef, useState } from 'react'

import { useGetCardRecordsService } from '@/service/card-record'
import { ICardRecord } from '@/types'

import CardRecordList from './components/CardRecordList'
import styles from './index.module.scss'

/**
 *  我的消费卡
 */
const MyCard = () => {
  const { onGetCardRecords, loading, total } = useGetCardRecordsService()
  const currentRef = useRef(1)
  const [data, setData] = useState<ICardRecord[]>([])

  const hasMore = data.length < total

  const getCards = async () => {
    const cardRecord = await onGetCardRecords({
      current: currentRef.current,
    })
    return cardRecord || []
  }

  const init = async () => {
    currentRef.current = 1
    const cardRecord = await getCards()
    setData(cardRecord)
  }

  useEffect(() => {
    init()
  }, [])

  const onRefresh = async () => {
    init()
  }

  const loadMore = async () => {
    currentRef.current += 1
    const append = await getCards()
    setData(val => [...val, ...append])
  }
  return (
    <div className={styles.container}>
      <CardRecordList
        data={data}
        loading={loading}
        onRefresh={onRefresh}
        loadMore={loadMore}
        hasMore={hasMore}
      />
    </div>
  )
}

export default MyCard
