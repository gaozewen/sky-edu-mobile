import { removeToken } from '@/utils/userToken'

import { useAppStoreContext } from './useAppStore'

export const useLogout = () => {
  const { store: studentStore } = useAppStoreContext()

  const onLogout = () => {
    removeToken()
    studentStore.refetchUser()
  }

  return { onLogout }
}
