import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useTitle = (title: string) => {
  const location = useLocation()
  const { pathname } = location
  useEffect(() => {
    document.title = title || '天空教育'
  }, [pathname])
}
