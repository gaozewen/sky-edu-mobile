import { Button, Grid, Image, Stepper } from 'antd-mobile'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Hr from '@/components/Hr'
import { useStudentContext } from '@/hooks/useStudentHooks'
import { useGetWxPayConfigService } from '@/service/order'
import { useGetProductService } from '@/service/product'

import styles from './index.module.scss'

const WeixinJSBridge = (window as any).WeixinJSBridge

/**
 *  购买页
 */
const Buy = () => {
  const { id = '' } = useParams()
  const { data } = useGetProductService(id)
  const [count, setCount] = useState<number>(1)
  const { store } = useStudentContext()
  const { getWxPayConfig } = useGetWxPayConfigService()

  if (!data) return null

  const onWxPay = async () => {
    if (typeof WeixinJSBridge !== 'undefined') {
      const wxPayConfig = await getWxPayConfig(
        data.id,
        data.preferentialPrice * count * 100
      )

      WeixinJSBridge.invoke('getBrandWCPayRequest', wxPayConfig, function (res: any) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        }
      })
    }
  }

  const onBuyHandler = () => {
    // openid 不存在
    if (!store.wxOpenid) {
      window.location.href = `${import.meta.env.VITE_API_URL}/wx/login?userId=${
        store.id
      }&url=${window.location.href}`
      return
    }
    // openid 存在，进行微信支付流程
    onWxPay()
  }

  return (
    <div className={styles.container}>
      <div className={styles.store}>
        <Image src={data?.store.logo} className={styles.logo} />
        <div className={styles.name}>{data?.store.name}</div>
      </div>
      <Hr />
      <div className={styles.title}>{data?.name}</div>
      <div className={styles.desc}>{data?.desc}</div>
      <Hr />
      <div className={styles.count}>
        购买数量
        <Stepper
          className={styles.stepper}
          value={count}
          onChange={val => {
            setCount(val)
          }}
        />
      </div>
      <div className={styles.price}>
        小计：¥
        {data?.preferentialPrice * count}
        <span className={styles['old-price']}>¥{data?.originalPrice * count}</span>
      </div>
      <Hr />
      <div className={styles.user}>
        <span className={styles['tel-label']}>手机号</span>
        <span className={styles.tel}>{store.tel}</span>
      </div>
      <Grid columns={2} className={styles['buy-container']}>
        <Grid.Item span={1}>
          <span className={styles['buy-price']}>¥{data.preferentialPrice * count}</span>
          <span className={styles['buy-old-price']}>¥{data.originalPrice * count}</span>
        </Grid.Item>
        <Grid.Item span={1}>
          <Button className={styles.submit} onClick={onBuyHandler} shape="rectangular">
            {store.wxOpenid ? '提交订单' : '去微信授权'}
          </Button>
        </Grid.Item>
      </Grid>
    </div>
  )
}

export default Buy
