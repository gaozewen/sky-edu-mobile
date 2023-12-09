import { useEffect, useState } from 'react'

import styles from './index.module.scss'

/**
 * 我的课程表
 */
const MyCourse = () => {
  const [state, setState] = useState()
  useEffect(() => {
    console.log(state, setState)
  }, [])
  return <div className={styles.container}>sss</div>
}

export default MyCourse
