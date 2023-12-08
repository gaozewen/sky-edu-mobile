import Hr from '@/components/Hr'
import { ICourse } from '@/types'

import styles from './index.module.scss'

interface IProps {
  data: ICourse[]
}

/**
 *  课程信息组件
 */
const CourseInfo = ({ data }: IProps) => {
  if (!data || data.length === 0) return null

  return (
    <>
      {data?.map(c => (
        <div key={c.id} className={styles.container}>
          <div className={styles['card-name']}>{c.cardName}</div>
          <div className={styles.desc}>{c.desc}</div>
          <Hr />
          <div className={styles.title}>预约信息</div>
          <div className={styles.desc}>{c.reserveInfo}</div>
          <Hr />
          <div className={styles.title}>退款信息</div>
          <div className={styles.desc}>{c.refundInfo}</div>
          {!!c.otherInfo && (
            <>
              <Hr />
              <div className={styles.title}>其他信息</div>
              <div className={styles.desc}>{c.otherInfo}</div>
            </>
          )}
        </div>
      ))}
      <div className={styles.bottom}></div>
    </>
  )
}

export default CourseInfo
