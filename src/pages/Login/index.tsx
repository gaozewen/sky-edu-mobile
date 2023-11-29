import { Button, Form, Input } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { IMG } from '@/constants/image'
import { PN } from '@/router'

import styles from './index.module.scss'

/**
 * 登录页
 */
const Login = () => {
  const [visible, setVisible] = useState(false)

  const onLogin = () => {}

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={IMG.LOGO} alt="" />
      </div>
      <Form
        layout="horizontal"
        onFinish={onLogin}
        footer={
          <Button
            className={styles['submit-button']}
            // loading={loading}
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
            {
              pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
              message: '有且只能包含小写字母和数字，长度大于 6，小于 10',
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
            {
              pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
              message: '有且只能包含小写字母和数字，长度大于 6',
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
        <Link to={PN.REGISTER} className={styles.link}>
          注册
        </Link>
      </div>
    </div>
  )
}

export default Login
