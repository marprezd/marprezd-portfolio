'use client'

import { Input } from '@nextui-org/input'
import { Kbd } from '@nextui-org/kbd'
import { NavbarItem } from '@nextui-org/navbar'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function SearchBox() {
  const t = useTranslations('site')

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: [
          'bg-white dark:bg-gray-700',
          'dark:focus-within:!bg-gray-700/50',
          'focus-within:!bg-default-200/50',
        ],
        input: [
          'text-sm',
          'placeholder:text-default-600',
        ],
      }}
      endContent={(
        <Kbd className="hidden bg-gray-200 text-default-800 dark:bg-gray-700 dark:text-gray-50 md:inline-block" keys={['command']}>
          K
        </Kbd>
      )}
      labelPlacement="outside"
      placeholder={t('header.search.placeholder')}
      type="search"
    />
  )

  return (
    <NavbarItem className="animate-fade animate-delay-1000 animate-duration-1000 animate-once animate-ease-in">
      {searchInput}
    </NavbarItem>
  )
}
