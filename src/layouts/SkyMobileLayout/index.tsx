import { Outlet } from 'react-router-dom'

import SkyNavBar from './components/SkyNavBar'
import SkyTabBar from './components/SkyTabBar'

/**
 * 天空教育学员端页面统一 Layout
 */
const SkyMobileLayout = () => {
  return (
    <>
      <SkyNavBar />
      <Outlet />
      <SkyTabBar />
    </>
  )
}

export default SkyMobileLayout
