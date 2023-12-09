import { useEffect, useState } from 'react'

import styles from './index.module.scss'

/**
 *  我的消费卡
 */
const MyCard = () => {
  const [state, setState] = useState()
  useEffect(() => {
    console.log(state, setState)
  }, [])
  return <div className={styles.container}>sss</div>
}

export default MyCard
