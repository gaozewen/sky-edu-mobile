import {
  Button,
  Card,
  ErrorBlock,
  Grid,
  Image,
  InfiniteScroll,
  Modal,
  PullToRefresh,
  Space,
  Steps,
  Tag,
} from 'antd-mobile'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

import { DAY_FORMAT, SCHEDULE_RECORD_STATUS } from '@/constants'
import { SUCCESS } from '@/constants/code'
import { ScheduleRecordStatus } from '@/enum'
import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'
import {
  useCancelOrderCourseService,
  useGetScheduleRecordsService,
} from '@/service/schedule-record'
import { IScheduleRecord } from '@/types'
import { ImgUtils } from '@/utils'
import SkyToast from '@/utils/skyToast'

import styles from './index.module.scss'

const { Step } = Steps
/**
 * 我的课程表
 */
const MySchedule = () => {
  const { onGetScheduleRecords, total, loading } = useGetScheduleRecordsService()
  const { cancelOrderCourse, loading: cancelLoading } = useCancelOrderCourseService()
  const currentRef = useRef(1)
  const [data, setData] = useState<IScheduleRecord[]>([])
  const { goTo } = useGoTo()

  const hasMore = data.length < total

  const getCards = async () => {
    const cardRecord = await onGetScheduleRecords({
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

  // 取消预约的课程表记录，必须是未开始的课程才能取消
  const onCancelOrder = async (scheduleRecordId: string) => {
    const isConfirm = await Modal.confirm({
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px' }}>确认取消预约么?</div>
          <div style={{ marginTop: '8px', color: 'red' }}>取消后将无法再次预约!</div>
        </div>
      ),
    })
    if (isConfirm) {
      try {
        const res = await cancelOrderCourse(scheduleRecordId)
        if (res?.code === SUCCESS) {
          SkyToast.success(res.message || '取消成功')
          setData(val =>
            val.map(i => ({
              ...i,
              status:
                i.id === scheduleRecordId ? ScheduleRecordStatus.CANCEL : i.status,
            }))
          )
          return
        }
        SkyToast.show(res?.message || '取消失败')
      } catch (error) {
        SkyToast.show('取消失败')
        console.error('【cancelOrderCourse】Error:', error)
      }
    }
  }

  if (loading) return null

  if (!data || data.length === 0) {
    return <ErrorBlock status="empty" style={{ marginTop: '18vh' }} />
  }

  return (
    <div className={styles.container}>
      <PullToRefresh onRefresh={onRefresh}>
        <Steps direction="vertical">
          {data?.map(sr => (
            <Step
              key={sr.id}
              icon={
                <img
                  src={ImgUtils.getThumb({
                    url: sr.store.logo,
                    w: 100,
                    h: 100,
                    isAvatar: true,
                  })}
                  alt="logo"
                  className={styles.logo}
                  onClick={() => goTo({ pathname: `${PN.STORE}/${sr.store.id}` })}
                />
              }
              title={
                <Space justify="between" block>
                  <span>
                    {dayjs(sr.schedule.schoolDay).format(DAY_FORMAT)}
                    &nbsp;
                    {sr.schedule.startTime}-{sr.schedule.endTime}
                  </span>
                  <Tag color={SCHEDULE_RECORD_STATUS[sr.status].color}>
                    {SCHEDULE_RECORD_STATUS[sr.status].label}
                  </Tag>
                </Space>
              }
              description={
                <Card>
                  <Grid columns={13} gap={10}>
                    <Grid.Item span={4}>
                      <Image
                        src={ImgUtils.getThumb({
                          url: sr.course.coverUrl,
                          w: 200,
                          h: 100,
                        })}
                        alt="课程封面"
                      />
                    </Grid.Item>
                    <Grid.Item span={6}>
                      <div className={styles['store-name']}>{sr.course.name}</div>
                      <div className={styles.teacher}>
                        老师：{sr.schedule.teacher.nickname}
                      </div>
                    </Grid.Item>
                    <Grid.Item span={3}>
                      {sr.status === ScheduleRecordStatus.PENDING && (
                        <Button
                          loading={cancelLoading}
                          fill="none"
                          color="primary"
                          onClick={() => {
                            onCancelOrder(sr.id)
                          }}
                        >
                          取消
                        </Button>
                      )}
                    </Grid.Item>
                  </Grid>
                </Card>
              }
            ></Step>
          ))}
        </Steps>
      </PullToRefresh>

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} style={{ marginTop: 18 }} />
    </div>
  )
}

export default MySchedule
