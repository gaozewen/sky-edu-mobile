import { useEffect, useState } from 'react'

import styles from './index.module.scss'

/**
 *  预约课程
 */
const OrderCourse = () => {
  const [state, setState] = useState()
  useEffect(() => {
    console.log(state, setState)
  }, [])
  return <div className={styles.container}>sss</div>
}

export default OrderCourse
