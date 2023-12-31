import { Card, ResultPage } from 'antd-mobile'
import { AlipayCircleFill } from 'antd-mobile-icons'

import { useAppStoreContext } from '@/hooks/useAppStore'
import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'

/**
 * 支付成功页
 */
const PaySuccess = () => {
  const { goTo } = useGoTo()
  const { store } = useAppStoreContext()
  const { payResult } = store
  const { price, storeName, productName, productDesc } = payResult || {}
  return (
    <ResultPage
      status="success"
      title={<div style={{ fontSize: 15 }}>支付成功</div>}
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
      primaryButtonText="返回首页"
      onPrimaryButtonClick={() => {
        goTo({ pathname: PN.HOME })
      }}
    >
      <Card title={productName}>
        <pre style={{ lineHeight: '20px' }}>{productDesc}</pre>
      </Card>
    </ResultPage>
  )
}

export default PaySuccess
