import { Button, ErrorBlock } from 'antd-mobile'
import { useEffect } from 'react'

import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'

/**
 * 404 页
 */
const NotFound = () => {
  const { goTo } = useGoTo()
  useEffect(() => {
    document.body.style.background = 'var(--adm-color-background)'
  }, [])
  return (
    <ErrorBlock
      fullPage
      status="empty"
      description={
        <Button
          onClick={() => goTo({ pathname: PN.HOME })}
          color="primary"
          size="mini"
          style={{ marginTop: '18px' }}
        >
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
