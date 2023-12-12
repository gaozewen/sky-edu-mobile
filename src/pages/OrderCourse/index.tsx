import { DotLoading, ErrorBlock, Space, Steps } from 'antd-mobile'
import { useState } from 'react'

import { useGetCanOrderedCoursesGroupByStoreService } from '@/service/schedule'
import { ImgUtils } from '@/utils'

import CourseList from './components/CourseList'
import OrderPopup from './components/OrderPopup'
import styles from './index.module.scss'

const { Step } = Steps

/**
 *  预约课程
 */
const OrderCourse = () => {
  const { data, loading } = useGetCanOrderedCoursesGroupByStoreService()
  const [show, setShow] = useState(false)
  const [curCourseId, setCourseId] = useState('')
  if (loading)
    return (
      <Space justify="center">
        <DotLoading color="primary" />
      </Space>
    )
  if (!data || data.length === 0) {
    return <ErrorBlock status="empty" style={{ marginTop: '18vh' }} />
  }

  const onOrder = (courseId: string) => {
    setCourseId(courseId)
    setShow(true)
  }

  return (
    <div className={styles.container}>
      <Steps direction="vertical">
        {data?.map(store => (
          <Step
            key={store.id}
            icon={
              <img
                className={styles.logo}
                src={ImgUtils.getThumb({
                  url: store.logo,
                  w: 36,
                  h: 36,
                  isAvatar: true,
                })}
                alt="门店 LOGO"
              />
            }
            title={store.name}
            description={
              store.courses ? (
                <CourseList onOrder={onOrder} data={store.courses} />
              ) : null
            }
          />
        ))}
      </Steps>
      <OrderPopup id={curCourseId} show={show} setShow={setShow} />
    </div>
  )
}

export default OrderCourse
