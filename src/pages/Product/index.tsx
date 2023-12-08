import { ErrorBlock } from 'antd-mobile'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import Hr from '@/components/Hr'
import { useGetProductService } from '@/service/product'
import { ICourse } from '@/types'

import BaseInfo from './components/BaseInfo'
import BuyButton from './components/BuyButton'
import CourseInfo from './components/CourseInfo'
import styles from './index.module.scss'

/**
 * 商品(课程[包含所有消费卡])详情页
 */
const Product = () => {
  const { id = '' } = useParams()
  const { data, loading } = useGetProductService(id)

  const courses = useMemo(() => {
    const keyCourseObj: Record<string, ICourse> = {}
    data?.cards.forEach(card => {
      const prevCourseObj = keyCourseObj[card.course.id]
      keyCourseObj[card.course.id] = {
        ...card.course,
        cardName: prevCourseObj ? `${prevCourseObj.cardName}/${card.name}` : card.name,
      }
    })
    return Object.values(keyCourseObj)
  }, [data?.cards])

  if (loading) return null

  if (!data) {
    return <ErrorBlock status="empty" style={{ marginTop: '18vh' }} />
  }

  return (
    <div className={styles.container}>
      <BaseInfo data={data} />
      <Hr />
      <CourseInfo data={courses} />
      <BuyButton data={data} />
    </div>
  )
}

export default Product
