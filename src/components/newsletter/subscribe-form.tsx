'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

declare global {
  interface Window {
    CustomSubstackWidget: any
  }
}

function SubscribeForm() {
  const t = useTranslations()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const formColorPrimary = resolvedTheme === 'light' ? '#0e7490' : '#a5f3fc'
  const formColorInput = resolvedTheme === 'light' ? '#fafafa' : '#0a0a0a'
  const formColorEmail = resolvedTheme === 'light' ? '#001F25' : '#A2EEFF'
  const formColorText = resolvedTheme === 'light' ? '#FFFFFF' : '#020617'

  useEffect(() => {
    setMounted(true)

    // Define the SubscribeForm on the window object
    window.CustomSubstackWidget = {
      substackUrl: 'marprezd.substack.com',
      placeholder: 'example@gmail.com',
      buttonText: `${t('site.newsletter.cta-btn')}`,
      theme: 'custom',
      colors: {
        primary: `${formColorPrimary}`,
        input: `${formColorInput}`,
        email: `${formColorEmail}`,
        text: `${formColorText}`,
      },
    }

    // Create a new script element
    const script = document.createElement('script')

    // Set the source of the script to the Substack widget script
    script.src = 'https://substackapi.com/widget.js'
    script.async = true

    // Append the script to the body
    document.body.appendChild(script)

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script)
    }
  }, [formColorEmail, formColorInput, formColorPrimary, formColorText, t])

  if (!mounted) {
    return null
  }

  return (
    <div id="custom-substack-embed" />
  )
}

export default SubscribeForm
