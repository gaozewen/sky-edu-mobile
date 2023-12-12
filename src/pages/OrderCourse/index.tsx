import { DotLoading, ErrorBlock, Space, Steps } from 'antd-mobile'

import { useGetCanOrderedCoursesGroupByStoreService } from '@/service/schedule'
import { ImgUtils } from '@/utils'

import CourseList from './components/CourseList'
import styles from './index.module.scss'

const { Step } = Steps

/**
 *  预约课程
 */
const OrderCourse = () => {
  const { data, loading } = useGetCanOrderedCoursesGroupByStoreService()
  if (loading)
    return (
      <Space justify="center">
        <DotLoading color="primary" />
      </Space>
    )
  if (!data || data.length === 0) {
    return <ErrorBlock status="empty" style={{ marginTop: '18vh' }} />
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
            description={store.courses ? <CourseList data={store.courses} /> : null}
          />
        ))}
      </Steps>
    </div>
  )
}

export default OrderCourse
