import { useRef } from 'react'

/**
 * 获取最新值的 ref
 * @param fn
 */
const useLatest = <T>(value: T) => {
  const ref = useRef(value)
  ref.current = value
  return ref
}

export default useLatest
