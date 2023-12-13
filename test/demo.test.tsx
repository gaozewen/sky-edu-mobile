import { act, fireEvent, render, renderHook, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { IMG } from '@/constants/image'
import useRequest from '@/hooks/useRequest'
import SkyTabBar from '@/layouts/SkyMobileLayout/components/SkyTabBar'
import { ImgUtils } from '@/utils'

describe('测试', () => {
  it('utils 测试', () => {
    let res = ImgUtils.getThumb({ url: '', w: 100, h: 100 })
    expect(res).toBe(`${IMG.LOGO_TEXT}?imageView2/1/w/100/h/100`)

    res = ImgUtils.getThumb({ url: '', w: 100, h: 100, isAvatar: true })
    expect(res).toBe(`${IMG.AVATAR_DEFAULT}?imageView2/1/w/100/h/100`)

    res = ImgUtils.getThumb({ url: 'xxx', w: 100, h: 100 })
    expect(res).toBe('xxx?imageView2/1/w/100/h/100')

    res = ImgUtils.getThumb({ url: 'xxx', w: 100, h: 100, isAvatar: true })
    expect(res).toBe('xxx?imageView2/1/w/100/h/100')
  })

  it('Hooks 测试', async () => {
    // 构造环境
    const service = () =>
      new Promise(resolve => {
        resolve(true)
      })
    // 调用被测试对象

    const { result: hookResult } = renderHook(() => useRequest(service))

    await waitFor(() => {
      hookResult.current.run()
    })

    // 断言
    expect(hookResult.current.data).toBe(true)
  })

  it('组件测试', async () => {
    // 构造环境
    const dom = (
      <MemoryRouter>
        <SkyTabBar />
      </MemoryRouter>
    )
    // 调用被测试对象
    const { getByText } = render(dom)

    const myButton = getByText('我的')

    // 解决点击按钮后触发的 setState 等异步过程
    act(() => {
      fireEvent.click(myButton)
    })

    const cn = myButton.parentElement?.className

    // 断言
    expect(cn).toContain('adm-tab-bar-item-active')
  })
})
