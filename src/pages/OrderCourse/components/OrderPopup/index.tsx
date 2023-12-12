import { Button, Divider, Popup, Selector, Tabs } from 'antd-mobile'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import { WEEK } from '@/constants'
import { Week } from '@/enum'
import { useGetValidCardRecordsByCourseService } from '@/service/card-record'
import { useGetSchedulesForNext7DaysByCourseService } from '@/service/schedule'

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
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([])
  const [selectedCardRecords, setSelectedCardRecords] = useState<string[]>([])

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

  if (!data) return null

  return (
    <Popup
      visible={show}
      onMaskClick={() => setShow(false)}
      onClose={() => setShow(false)}
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
                multiple
                columns={3}
                options={w.orderTimes || []}
                onChange={(arr: string[], append) => {
                  console.log('gzw===>arr', arr)
                  console.log('gzw===>append', append)
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
          onChange={(arr: string[], append) => {
            console.log('gzw===>arr', arr)
            console.log('gzw===>append', append)
            setSelectedCardRecords(arr)
          }}
          value={selectedCardRecords}
        />

        <Divider />
        <Button color="primary" className={styles.btn}>
          立即预约
        </Button>
      </div>
    </Popup>
  )
}

export default OrderPopup
