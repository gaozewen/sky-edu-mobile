import { Image } from 'antd-mobile'

import { IStore } from '@/types'

import styles from './index.module.scss'

interface IProps {
  data: IStore
}

/**
 *  门店描述信息组件
 */
const DescInfo = ({ data }: IProps) => {
  return (
    <div className={styles.container}>
      {data.description}
      <div className={styles.imgs}>
        {data?.otherImgs?.map(i => <Image key={i.id} src={i.url} alt="其他图片" />)}
      </div>
    </div>
  )
}

export default DescInfo
