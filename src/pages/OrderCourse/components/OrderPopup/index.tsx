import { Button, Divider, Popup, Selector, Tabs } from 'antd-mobile'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import { WEEK } from '@/constants'
import { SUCCESS } from '@/constants/code'
import { Week } from '@/enum'
import { useGetValidCardRecordsByCourseService } from '@/service/card-record'
import {
  useGetSchedulesForNext7DaysByCourseService,
  useOrderCourseService,
} from '@/service/schedule'
import SkyToast from '@/utils/skyToast'

import CardRecordCard from '../CardRecordCard'
import styles from './index.module.scss'

interface IProps {
  show: boolean
  setShow: (isShow: boolean) => void
  id: string
}
/**
 * 预约弹窗
 * 可以选择课程表和消费卡记录
 */
const OrderPopup = ({ show, setShow, id }: IProps) => {
  const { getSchedulesForNext7DaysByCourse, data } =
    useGetSchedulesForNext7DaysByCourseService()
  const { getValidCardRecordsByCourse, data: cardRecords } =
    useGetValidCardRecordsByCourseService()
  const { orderCourse, loading } = useOrderCourseService()
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([])
  const [selectedCardRecords, setSelectedCardRecords] = useState<string[]>([])

  const onClose = () => {
    setSelectedSchedules([])
    setSelectedCardRecords([])
    setShow(false)
  }

  useEffect(() => {
    if (show && id) {
      getSchedulesForNext7DaysByCourse(id)
      getValidCardRecordsByCourse(id)
    }
  }, [show, id])

  const weeks = useMemo(() => {
    const result = []
    // 循环出未来的七天，按照周一周二...
    for (let i = 1; i < 8; i++) {
      const day = dayjs().add(i, 'day')
      const week = WEEK[day.format('dddd') as Week]
      // 获取同一天的课表
      const schedules = data?.filter(s => day.isSame(s.schoolDay, 'day'))
      const orderTimes = schedules?.map(s => ({
        label: `${s.startTime.slice(0, 5)}-${s.endTime.slice(0, 5)}`,
        value: s.id,
      }))

      result.push({
        weekLabel: week,
        weekValue: day.format('dddd'),
        orderTimes,
      })
    }
    return result
  }, [data])

  const cards = useMemo(
    () =>
      cardRecords?.map(cr => ({
        label: <CardRecordCard data={cr} />,
        value: cr.id,
      })),
    [cardRecords]
  )

  const onOrderCourse = async () => {
    if (selectedSchedules.length === 0 || selectedCardRecords.length === 0) {
      SkyToast.show('请选择预约时间和消费卡')
      return
    }
    try {
      const res = await orderCourse(selectedSchedules[0], selectedCardRecords[0])
      if (res?.code === SUCCESS) {
        SkyToast.success(res?.message || '预约成功')
        onClose()
        return
      }
      SkyToast.show(res?.message || '预约失败')
    } catch (error) {
      SkyToast.show('预约失败，服务器忙请稍后再试')
      console.error('【orderCourse】Error:', error)
    }
  }

  if (!data) return null

  return (
    <Popup
      visible={show}
      onMaskClick={onClose}
      onClose={onClose}
      bodyStyle={{ height: '48vh', overflowY: 'scroll' }}
      position="bottom"
      showCloseButton
    >
      <div className={styles.container}>
        <Divider>请选择预约时间</Divider>
        <Tabs>
          {weeks.map(w => (
            <Tabs.Tab key={w.weekValue} title={w.weekLabel}>
              <Selector
                columns={3}
                options={w.orderTimes || []}
                onChange={(arr: string[]) => {
                  setSelectedSchedules(arr)
                }}
                value={selectedSchedules}
              />
            </Tabs.Tab>
          ))}
        </Tabs>

        <Divider>请选择消费卡</Divider>
        <Selector
          columns={1}
          options={cards || []}
          onChange={(arr: string[]) => {
            setSelectedCardRecords(arr)
          }}
          value={selectedCardRecords}
        />

        <Divider />
        <Button
          loading={loading}
          color="primary"
          className={styles.btn}
          onClick={onOrderCourse}
        >
          立即预约
        </Button>
      </div>
    </Popup>
  )
}

export default OrderPopup
