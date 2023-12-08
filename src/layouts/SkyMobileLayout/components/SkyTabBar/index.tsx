import { TabBar } from 'antd-mobile'
import { AppOutline, UserOutline } from 'antd-mobile-icons'

import { useGoTo } from '@/hooks/useGoTo'
import { isNoTabBar, PN, useMatchedRoute } from '@/router'

import styles from './index.module.scss'

/**
 * 底部 TabBar
 */
const SkyTabBar = () => {
  const route = useMatchedRoute()
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
  if (isNoTabBar(route)) return null

  return (
    <div className={styles.container}>
      <TabBar
        safeArea
        activeKey={route.key}
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
