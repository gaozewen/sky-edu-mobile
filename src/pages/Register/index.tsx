import { Button, Form, Input } from 'antd-mobile'
import { Link } from 'react-router-dom'

import { IMG } from '@/constants/image'
import { PN } from '@/router'

import styles from './index.module.scss'

/**
 * 注册页
 */
const Register = () => {
  const [form] = Form.useForm()

  const onRegister = () => {}
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={IMG.LOGO} alt="" />
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onRegister}
        footer={
          <Button
            // loading={loading}
            className={styles['submit-button']}
            block
            type="submit"
            color="primary"
            size="large"
            shape="rounded"
          >
            注册
          </Button>
        }
      >
        <Form.Item
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
          label="用户名"
          name="account"
        >
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item
          label="输入密码"
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
        >
          <Input placeholder="请输入密码" clearable type="password" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
            {
              pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
              message: '有且只能包含小写字母和数字，长度大于 6',
            },
            {
              validator: (_, value) => {
                const password = form.getFieldValue('password')
                if (password === value) {
                  return Promise.resolve()
                }
                return Promise.reject()
              },
              message: '两次输入的密码需要一致',
            },
          ]}
          label="确认密码"
          name="passwordConfirm"
        >
          <Input placeholder="请再次输入密码" clearable type="password" />
        </Form.Item>
      </Form>

      <div className={styles.bottom}>
        有账号？去
        <Link to={PN.LOGIN} className={styles.link}>
          登录
        </Link>
      </div>
    </div>
  )
}

export default Register
