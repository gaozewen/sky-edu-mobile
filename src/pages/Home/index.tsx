import { SearchBar } from 'antd-mobile'

import CateSelector from './components/CateSelector'
import ProductList from './components/ProductList'
import styles from './index.module.scss'

/**
 * 精品课程
 */
const Home = () => {
  const onSearch = () => {}
  const onChange = (key: string) => {}

  return (
    <div className={styles.container}>
      <SearchBar placeholder="搜索课程试试" onSearch={onSearch} />
      <CateSelector onChange={onChange} />
      <ProductList />
    </div>
  )
}

export default Home
