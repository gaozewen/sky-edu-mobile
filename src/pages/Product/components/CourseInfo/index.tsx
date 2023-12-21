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
          <pre className={styles.desc}>{c.desc}</pre>
          <Hr />
          <div className={styles.title}>预约信息</div>
          <pre className={styles.desc}>{c.reserveInfo}</pre>
          <Hr />
          <div className={styles.title}>退款信息</div>
          <pre className={styles.desc}>{c.refundInfo}</pre>
          {!!c.otherInfo && (
            <>
              <Hr />
              <div className={styles.title}>其他信息</div>
              <pre className={styles.desc}>{c.otherInfo}</pre>
            </>
          )}
        </div>
      ))}
      <div className={styles.bottom}></div>
    </>
  )
}

export default CourseInfo
