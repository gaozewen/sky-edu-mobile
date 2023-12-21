import { ResultPage } from 'antd-mobile'
import { AlipayCircleFill } from 'antd-mobile-icons'

import { IS_MOCK_PAY } from '@/constants'
import { useAppStoreContext } from '@/hooks/useAppStore'
import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'

/**
 * 支付失败页
 */
const PayFail = () => {
  const { goTo } = useGoTo()
  const { store } = useAppStoreContext()
  const { payResult } = store
  const { price, storeName, rePay } = payResult || {}
  return (
    <ResultPage
      status="error"
      title={<div style={{ fontSize: 15 }}>支付失败</div>}
      description={
        <>
          <span style={{ fontSize: 32, color: '#fff', marginRight: 8 }}>¥</span>
          <span style={{ fontSize: 48, color: '#fff' }}>{price}</span>
        </>
      }
      icon={<AlipayCircleFill />}
      details={[
        {
          label: storeName,
          value: `¥ ${price}`,
          bold: true,
        },
      ]}
      primaryButtonText="重新支付"
      onPrimaryButtonClick={() => {
        if (IS_MOCK_PAY) {
          goTo({ pathname: PN.PAY_SUCCESS })
          return
        }
        if (rePay && typeof rePay === 'function') {
          rePay()
        }
      }}
    />
  )
}

export default PayFail
