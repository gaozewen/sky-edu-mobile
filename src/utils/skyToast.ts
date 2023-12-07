import { Toast } from 'antd-mobile'
import { ToastHandler } from 'antd-mobile/es/components/toast'

let currentToast: ToastHandler
const SkyToast = {
  success: (content: string) => {
    currentToast = Toast.show({
      content,
      icon: 'success',
    })
  },
  error: (content: string) => {
    currentToast = Toast.show({
      content,
      icon: 'fail',
    })
  },
  loading: (content?: string) => {
    currentToast = Toast.show({
      content: content || '加载中...',
      icon: 'loading',
    })
  },
  close: () => {
    if (currentToast) currentToast.close()
  },
  clear: () => {
    Toast.clear()
  },
}

export default SkyToast
