import { Tabs } from 'antd-mobile'

import { useGetProductCategoriesService } from '@/service/product'

import styles from './index.module.scss'

interface IProps {
  onChange: (key: string) => void
}

/**
 *  商品品类选择器
 */
const CateSelector = ({ onChange }: IProps) => {
  const { data, loading } = useGetProductCategoriesService()
  if (loading) return null
  return (
    <Tabs className={styles.tabs} onChange={onChange} defaultActiveKey={data[0]?.key}>
      {data?.map(c => <Tabs.Tab key={c.key} title={c.title} />)}
    </Tabs>
  )
}

export default CateSelector
