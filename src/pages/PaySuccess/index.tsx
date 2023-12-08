import { Card, ResultPage } from 'antd-mobile'
import { AlipayCircleFill } from 'antd-mobile-icons'

import { useGoTo } from '@/hooks/useGoTo'
import { useStudentContext } from '@/hooks/useStudentHooks'
import { PN } from '@/router'

/**
 * 支付成功页
 */
const PaySuccess = () => {
  const { goTo } = useGoTo()
  const { store } = useStudentContext()
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
      <Card title={productName}>{productDesc}</Card>
    </ResultPage>
  )
}

export default PaySuccess
