/* eslint-disable regexp/no-unused-capturing-group */
'use client'
import { useEffect, useState } from 'react'

function useDeviceDetection() {
  const [device, setDevice] = useState('')

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/.test(userAgent)
      const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/.test(userAgent)

      if (isMobile)
        setDevice('Mobile')
      else if (isTablet)
        setDevice('Tablet')
      else
        setDevice('Desktop')
    }

    handleDeviceDetection()
    window.addEventListener('resize', handleDeviceDetection)

    return () => {
      window.removeEventListener('resize', handleDeviceDetection)
    }
  }, [])

  return device
}

export default useDeviceDetection
