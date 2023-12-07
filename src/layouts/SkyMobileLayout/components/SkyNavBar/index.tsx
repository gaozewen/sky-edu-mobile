import { SafeArea } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import cs from 'classnames'
import { useLocation } from 'react-router-dom'

import { useGoTo } from '@/hooks/useGoTo'
import { isTabBarRouter, PN } from '@/router'

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

  const isTabBarRouterBoolean = isTabBarRouter(pathname)

  return (
    <div
      className={cs({
        [styles.container]: true,
        [styles.large]: isTabBarRouterBoolean,
      })}
    >
      <SafeArea position="top" />
      {!isTabBarRouterBoolean && (
        <LeftOutline className={styles.back} onClick={goBack} />
      )}

      <div className={styles.title}>{TITLES[pathname]}</div>
    </div>
  )
}

export default SkyNavBar
