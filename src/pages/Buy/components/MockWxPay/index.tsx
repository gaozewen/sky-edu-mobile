import { NumberKeyboard, PasscodeInput, Popup } from 'antd-mobile'
import { useState } from 'react'

import { SUCCESS } from '@/constants/code'
import { useAppStoreContext } from '@/hooks/useAppStore'
import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'
import { useMockWxPayService } from '@/service/order'
import { IPayResult } from '@/types'
import SkyToast from '@/utils/skyToast'

import styles from './index.module.scss'

interface IProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

/**
 * 模拟微信支付
 */
const MockWxPay = ({ visible, setVisible }: IProps) => {
  const { store } = useAppStoreContext()
  const { payResult = {} } = store
  const { productId, quantity, price } = payResult as IPayResult

  const { mockWxPay } = useMockWxPayService()
  const { goTo } = useGoTo()
  const [value, setValue] = useState('')

  const onChange = async (val: string) => {
    setValue(val)
    if (val.length > 5) {
      try {
        const { code, message } = await mockWxPay(productId, quantity, price * 100)
        if (code === SUCCESS) {
          SkyToast.success(message)
          setTimeout(() => {
            goTo({ pathname: PN.PAY_SUCCESS })
          }, 1000)
          return
        }
        SkyToast.error(message)
        setTimeout(() => {
          goTo({ pathname: PN.PAY_FAIL })
        }, 1000)
      } catch (error) {
        console.error('【mockWxPay】Error:', error)
        setVisible(false)
        setValue('')
      }
    }
  }
  return (
    <Popup
      visible={visible}
      onMaskClick={() => setVisible(false)}
      bodyStyle={{
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      <div className={styles.container}>
        <div className={styles.title}>请输入支付密码</div>
        <div className={styles.desc}>天空支付服务平台</div>
        <div className={styles.amount}>¥{price}</div>
        {visible && (
          <PasscodeInput
            value={value}
            seperated
            onChange={onChange}
            keyboard={<NumberKeyboard />}
          />
        )}
      </div>
    </Popup>
  )
}

export default MockWxPay
