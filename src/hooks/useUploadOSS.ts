import { useQuery } from '@apollo/client'
import { nanoid } from 'nanoid'

import { GET_UPLOAD_TOKEN } from '@/graphql/oss'

export const useUploadOSS = () => {
  // 获取 uploadToken
  const { data } = useQuery(GET_UPLOAD_TOKEN)

  const uploadHandler = async (file: File) => {
    const { getUploadToken = {} } = data || {}
    const { uploadToken = '' } = getUploadToken || {}
    const formData = new FormData()
    formData.append('token', uploadToken)
    formData.append('key', `images/${nanoid()}`)
    formData.append('accept', 'application/json') // 根据需求设置 accept 头部
    formData.append('file', file)

    try {
      const res = await fetch('https://up-cn-east-2.qiniup.com', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const { key } = await res.json()
        const url = `${import.meta.env.VITE_CDN_HOST}/${key}`
        return { url }
      }

      console.error('Upload failed:', res.statusText)
      return { url: '' }
    } catch (error) {
      console.error('Error during upload:', error)
      return { url: '' }
    }
  }

  return { uploadHandler }
}
