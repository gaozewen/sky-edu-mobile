import { IAppStore } from '@/types'
import { connectFactory, useContextFactory } from '@/utils/contextFactory'

const KEY = 'app'
const DEFAULT_VALUE: IAppStore = {
  user: { id: '', avatar: '', tel: '', nickname: '', wxOpenid: '' },
  refetchUser: () => {},
  home: {},
}

export const connectAppStore = connectFactory(KEY, DEFAULT_VALUE)
export const useAppStoreContext = () => useContextFactory<IAppStore>(KEY)
