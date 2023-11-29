import { SafeArea } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { useLocation } from 'react-router-dom'

import { useGoTo } from '@/hooks/useGoTo'
import { isNotNeedSkyNavBarBack, PN } from '@/router'

import styles from './index.module.scss'

/**
 * 顶部 NavBar
 */
const SkyNavBar = () => {
  const location = useLocation()
  const { pathname } = location
  const { goBack } = useGoTo()
  const TITLES = {
    [PN.HOME]: '精品课程',
    [PN.MY]: '我的',
  }

  return (
    <>
      <div className={styles['safe-area']}>
        <SafeArea position="top" />
      </div>
      <div className={styles.container}>
        {!isNotNeedSkyNavBarBack(pathname) && (
          <LeftOutline className={styles.back} onClick={goBack} />
        )}

        <div className={styles.title}>{TITLES[pathname]}</div>
      </div>
    </>
  )
}

export default SkyNavBar
