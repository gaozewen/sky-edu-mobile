import { Toast } from 'antd-mobile'

const SkyToast = {
  success: (content: string) => {
    Toast.show({
      content,
      icon: 'success',
    })
  },
  error: (content: string) => {
    Toast.show({
      content,
      icon: 'fail',
    })
  },
}

export default SkyToast
