import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { SUCCESS } from '@/constants/code'
import { IMG } from '@/constants/image'
import { STUDENT_LOGIN } from '@/graphql/student'
import { useAppStoreContext } from '@/hooks/useAppStore'
import { PN } from '@/router'
import { ImgUtils } from '@/utils'
import SkyToast from '@/utils/skyToast'
import { setToken } from '@/utils/userToken'

import styles from './index.module.scss'

interface IValue {
  account: string
  password: string
}

/**
 * 登录页
 */
const Login = () => {
  const [visible, setVisible] = useState(false)
  const [studentLogin, { loading, client }] = useMutation(STUDENT_LOGIN)
  const { store: studentStore } = useAppStoreContext()

  const onLogin = async (value: IValue) => {
    const { account, password } = value
    try {
      const res = await studentLogin({
        variables: {
          params: {
            account,
            password,
          },
        },
      })
      const { code, message, data: token } = res.data.studentLogin
      if (code === SUCCESS) {
        await client.clearStore()
        setToken(token, true)
        // 更新用户信息 (为了解决跳转页面后 GET_STUDENT_BY_JWT 接口不触发的问题)
        // 原因是：由于 StudentInfoLayout 是所有页面的 layout，所以当登录成功跳转其他页面后
        // StudentInfoLayout 组件不会重新渲染，所以也不会加载获取用户信息的请求
        // 所以需要们手动触发
        studentStore.refetchUser()
        // 路由跳转交由 useAutoNavigate 统一控制
        SkyToast.success(message)
        return
      }
      SkyToast.error(message)
    } catch (error) {
      SkyToast.error('服务器忙，请稍后再试')
      console.error('【studentLogin】Error:', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img
          src={ImgUtils.getThumb({
            url: IMG.LOGO,
            w: 229,
            h: 184,
          })}
          alt=""
        />
      </div>
      <Form
        layout="horizontal"
        onFinish={onLogin}
        footer={
          <Button
            className={styles['submit-button']}
            loading={loading}
            block
            type="submit"
            color="primary"
            size="large"
            shape="rounded"
          >
            登录
          </Button>
        }
      >
        <Form.Item
          label="用户名"
          name="account"
          rules={[
            {
              required: true,
              message: '用户名不能为空',
            },
          ]}
        >
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
          ]}
          extra={
            <div className={styles.eye}>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
          }
        >
          <Input
            placeholder="请输入密码"
            clearable
            type={visible ? 'text' : 'password'}
          />
        </Form.Item>
      </Form>

      <div className={styles.bottom}>
        没有账号？去
        <Link to={`${PN.REGISTER}${location.search}`} className={styles.link}>
          注册
        </Link>
      </div>
    </div>
  )
}

export default Login
