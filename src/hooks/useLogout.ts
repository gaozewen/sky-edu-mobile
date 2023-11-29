import { removeToken } from '@/utils/userToken'

import { useStudentContext } from './useStudentHooks'

export const useLogout = () => {
  const { store: studentStore } = useStudentContext()

  const onLogout = () => {
    removeToken()
    studentStore.refetchHandler()
  }

  return { onLogout }
}
