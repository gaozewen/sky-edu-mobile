import { Outlet } from 'react-router-dom'

import { connectAppStore } from '@/hooks/useAppStore'
import { useLoadStudentData } from '@/hooks/useLoadStudentData'
import { useTitle } from '@/hooks/useTitle'
import { useMatchedRoute } from '@/router'

/**
 * 包裹所有页面，统一加载用户信息
 */
const StudentInfo = () => {
  useLoadStudentData()
  const route = useMatchedRoute()
  useTitle(route.name)
  return <Outlet />
}
const StudentInfoLayout = connectAppStore(StudentInfo)
export default StudentInfoLayout
