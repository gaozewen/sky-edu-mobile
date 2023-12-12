import { Grid, Image, List } from 'antd-mobile'
import {
  BankcardOutline,
  FaceRecognitionOutline,
  UnorderedListOutline,
} from 'antd-mobile-icons'

import { useGoTo } from '@/hooks/useGoTo'
import { useLogout } from '@/hooks/useLogout'
import { useStudentContext } from '@/hooks/useStudentHooks'
import { PN } from '@/router'
import { ImgUtils } from '@/utils'

import styles from './index.module.scss'

/**
 * 我的
 */
const My = () => {
  const { store } = useStudentContext()
  const { goTo } = useGoTo()
  const { onLogout } = useLogout()

  return (
    <div className={styles.container}>
      <Grid columns={10} className={styles.card}>
        <Grid.Item span={3}>
          <Image
            className={styles.avatar}
            src={ImgUtils.getThumb({
              url: store.avatar,
              w: 200,
              h: 200,
              isAvatar: true,
            })}
            alt="用户头像"
          />
        </Grid.Item>
        <Grid.Item span={7}>
          <div className={styles.name}>{store.nickname || '天空学员'}</div>
          <div
            className={styles['to-edit']}
            onClick={() => goTo({ pathname: PN.PROFILE })}
          >
            编辑资料
          </div>
        </Grid.Item>
      </Grid>
      <List className={styles.list}>
        <List.Item
          prefix={<FaceRecognitionOutline />}
          onClick={() => goTo({ pathname: PN.ORDER_COURSE })}
        >
          预约课程
        </List.Item>
        <List.Item
          prefix={<UnorderedListOutline />}
          onClick={() => goTo({ pathname: PN.MY_COURSE })}
        >
          我的课程表
        </List.Item>
        <List.Item
          prefix={<BankcardOutline />}
          onClick={() => goTo({ pathname: PN.MY_CARD })}
        >
          我的消费卡
        </List.Item>
      </List>

      <a onClick={onLogout} className={styles.logout}>
        退出登录
      </a>
    </div>
  )
}

export default My
