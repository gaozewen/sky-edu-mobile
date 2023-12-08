import { Grid, Image, Swiper } from 'antd-mobile'
import { CheckShieldOutline, EnvironmentOutline, PhoneFill } from 'antd-mobile-icons'

import { IStore } from '@/types'

import styles from './index.module.scss'

interface IProps {
  data: IStore
}

/**
 *  门店基本信息组件
 */
const BaseInfo = ({ data }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={data.logo} alt="logo" className={styles.logo} />
        {data.name}
      </div>

      <div className={styles.tags}>
        {data.tags?.split(',').map(tag => (
          <span key={tag} className={styles['tag-item']}>
            <CheckShieldOutline />
            <span className={styles.tag}>{tag}</span>
          </span>
        ))}
      </div>

      <div className={styles.swiper}>
        <Swiper loop autoplay>
          {[...(data.frontImgs || []), ...(data.roomImgs || [])].map(i => (
            <Swiper.Item key={i.id}>
              <Image src={i.url} alt="门店图片" fit="contain" />
            </Swiper.Item>
          ))}
        </Swiper>
      </div>

      <div className={styles.address}>
        <Grid columns={24}>
          <Grid.Item span={20} className={styles.left}>
            <EnvironmentOutline className={styles['icon-location']} />
            <a
              href={`http://api.map.baidu.com/marker?location=${data.latitude},${data.longitude}&title=${data.address}&output=html&content=${data.name}`}
            >
              <span className={styles.text}>{data.address}</span>
            </a>
          </Grid.Item>
          <Grid.Item span={4}>
            <a href={`tel:${data.tel}`}>
              <PhoneFill className={styles['icon-phone']} />
            </a>
          </Grid.Item>
        </Grid>
      </div>
    </div>
  )
}

export default BaseInfo
