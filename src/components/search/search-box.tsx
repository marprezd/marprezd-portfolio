'use client'

import { Input } from '@nextui-org/input'
import { Kbd } from '@nextui-org/kbd'
import { NavbarItem } from '@nextui-org/navbar'
import { useTranslations } from 'next-intl'
import React from 'react'

function Loading() {
  return null
}

export default function SearchBox() {
  const t = useTranslations('site')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Loading />
  }

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: [
          'bg-white dark:bg-palettes-primary-30',
          'dark:focus-within:!bg-palettes-primary-40/50',
          'focus-within:!bg-default-200/50',
        ],
        input: [
          'text-sm',
          'placeholder:text-default-600',
        ],
      }}
      endContent={(
        <Kbd className="hidden bg-gray-200 text-default-800 dark:bg-palettes-primary-40 md:inline-block" keys={['command']}>
          K
        </Kbd>
      )}
      labelPlacement="outside"
      placeholder={t('header.search.placeholder')}
      type="search"
    />
  )

  return (
    <NavbarItem className="animate-fade animate-delay-1000 animate-duration-500 animate-once">
      {searchInput}
    </NavbarItem>
  )
}
