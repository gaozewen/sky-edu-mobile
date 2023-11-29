import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd-mobile'
import { Link } from 'react-router-dom'

import { SUCCESS } from '@/constants/code'
import { IMG } from '@/constants/image'
import { STUDENT_REGISTER } from '@/graphql/student'
import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'
import SkyToast from '@/utils/skyToast'

import styles from './index.module.scss'

interface IValue {
  account: string
  password: string
}

/**
 * 注册页
 */
const Register = () => {
  const [form] = Form.useForm()
  const [studentRegister, { loading }] = useMutation(STUDENT_REGISTER)
  const { goTo } = useGoTo()

  const onRegister = async (value: IValue) => {
    const { account, password } = value
    try {
      const res = await studentRegister({
        variables: {
          params: {
            account,
            password,
          },
        },
      })
      const { code, message } = res.data.studentRegister
      if (code === SUCCESS) {
        SkyToast.success('注册成功，请登录')
        setTimeout(() => {
          goTo({ pathname: PN.LOGIN, replace: true })
        }, 1000)
        return
      }
      SkyToast.error(message)
    } catch (error) {
      SkyToast.error('服务器忙，请稍后再试')
      console.error('studentRegister:', error)
    }
  }

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
            loading={loading}
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
              type: 'string',
              max: 10,
              message: ' 用户名长度需小于 10 位',
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
              type: 'string',
              min: 6,
              message: '密码长度需大于 6 位',
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
              type: 'string',
              min: 6,
              message: '密码长度需大于 6 位',
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
