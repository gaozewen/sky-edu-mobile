import { useMutation } from '@apollo/client'
import { Button, Form, ImageUploader, Input } from 'antd-mobile'
import { useEffect } from 'react'

import { COMMIT_STUDENT } from '@/graphql/student'
import { useAppStoreContext } from '@/hooks/useAppStore'
import { useGoTo } from '@/hooks/useGoTo'
import { useUploadOSS } from '@/hooks/useUploadOSS'
import { IStudent } from '@/types'
import SkyToast from '@/utils/skyToast'

import styles from './index.module.scss'

/**
 * 用户画像（个人信息页）
 */
const Profile = () => {
  const { uploadHandler } = useUploadOSS()
  const [commitStudent] = useMutation(COMMIT_STUDENT)
  const [form] = Form.useForm()
  const { store } = useAppStoreContext()
  const { user } = store
  const { goBack } = useGoTo()

  useEffect(() => {
    if (!user.tel) return
    form.setFieldsValue({
      tel: user.tel,
      nickname: user.nickname,
      avatar: [
        {
          url: user.avatar,
        },
      ],
    })
  }, [store])

  const onCommitStudent = async (v: IStudent & { avatar: [{ url: string }] }) => {
    try {
      const res = await commitStudent({
        variables: {
          params: {
            ...v,
            avatar: v.avatar[0]?.url,
          },
        },
      })
      const { code, message } = res.data.commitStudent
      if (code === 200) {
        SkyToast.success(message)
        // 更新用户数据
        setTimeout(() => {
          store.refetchUser()
          goBack()
        }, 1000)
        return
      }
      SkyToast.error(message)
    } catch (error) {
      SkyToast.error('服务器忙，请稍后再试')
      console.error('【commitStudent】Error:', error)
    }
  }

  return (
    <div className={styles.container}>
      <Form
        form={form}
        className={styles.form}
        onFinish={onCommitStudent}
        footer={
          <Button block type="submit" color="primary" size="large" shape="rounded">
            提交
          </Button>
        }
      >
        <Form.Header>请提交个人信息，都是必填的</Form.Header>
        <Form.Item
          name="avatar"
          label="头像"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ImageUploader maxCount={1} upload={uploadHandler} />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="昵称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tel"
          label="手机号"
          rules={[
            {
              required: true,
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误！',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Profile
