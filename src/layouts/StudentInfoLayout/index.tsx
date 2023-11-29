import { Outlet } from 'react-router-dom'

import { connectStudent, useLoadStudentData } from '@/hooks/useStudentHooks'

/**
 * 包裹所有页面，统一加载用户信息
 */
const StudentInfo = () => {
  useLoadStudentData()
  return <Outlet />
}
const StudentInfoLayout = connectStudent(StudentInfo)
export default StudentInfoLayout
