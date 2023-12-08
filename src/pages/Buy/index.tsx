import { Button, Grid, Image, Stepper } from 'antd-mobile'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Hr from '@/components/Hr'
import { useStudentContext } from '@/hooks/useStudentHooks'
import { useGetProductService } from '@/service/product'

import styles from './index.module.scss'

/**
 *  购买页
 */
const Buy = () => {
  const { id = '' } = useParams()
  const { data } = useGetProductService(id)
  const [count, setCount] = useState<number>(1)
  const { store } = useStudentContext()
  console.log('gzw===>data', data)

  const onSubmit = () => {}

  if (!data) return null

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
          <Button className={styles.submit} onClick={onSubmit} shape="rectangular">
            提交订单
          </Button>
        </Grid.Item>
      </Grid>
    </div>
  )
}

export default Buy
