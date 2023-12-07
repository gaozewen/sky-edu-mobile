import { TabBar } from 'antd-mobile'
import { AppOutline, UserOutline } from 'antd-mobile-icons'
import { useLocation } from 'react-router-dom'

import { useGoTo } from '@/hooks/useGoTo'
import { isLoginOrRegisterRouter, PN } from '@/router'

import styles from './index.module.scss'

/**
 * 底部 TabBar
 */
const SkyTabBar = () => {
  const location = useLocation()
  const { pathname } = location
  const { goTo } = useGoTo()
  const tabs = [
    {
      key: PN.HOME,
      title: '课程',
      icon: <AppOutline />,
    },
    {
      key: PN.MY,
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  // 特定路由不需要底部 TabBar
  if (isLoginOrRegisterRouter(pathname)) return null

  return (
    <div className={styles.container}>
      <TabBar
        safeArea
        activeKey={pathname}
        onChange={value =>
          goTo({
            pathname: value,
            replace: true,
          })
        }
      >
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}

export default SkyTabBar
