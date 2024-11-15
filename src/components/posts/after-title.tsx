'use client'

import { server } from '@/lib/serverUrl'
import { Button } from '@nextui-org/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown'
import { Tooltip } from '@nextui-org/tooltip'
import { IconBallpen, IconBrandPocket, IconRefresh, IconSelector } from '@tabler/icons-react'
import { useFormatter, useLocale, useTranslations } from 'next-intl'
import React from 'react'

interface PostPublishingProps {
  date: string
  updated: string
  otherLanguages: any[]
  slug: string
  title: string
}

export default function AfterTitle({
  date,
  updated,
  otherLanguages,
  slug,
  title,
}: PostPublishingProps) {
  const t = useTranslations('site')
  const format = useFormatter()
  const dateTime = new Date(date)
  const updateDateTime = new Date(updated!)
  const locale = useLocale()

  return (
    <div className="my-2 flex flex-col items-start gap-2 sm:flex-row md:items-center">
      <Button size="sm" color="default" variant="light" startContent={<IconBallpen size={16} />}>
        {t('posts.author.writer-by')}
        {date && (
          <time dateTime={date}>
            {format.dateTime(dateTime, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        )}
      </Button>
      {updated && (
        <Tooltip content={`${t('posts.updated')}`} showArrow>
          <Button size="sm" color="success" variant="flat" startContent={<IconRefresh size={16} />}>
            <time dateTime={updated}>
              {format.dateTime(updateDateTime, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </Button>
        </Tooltip>
      )}
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button size="sm" color="default" variant="light" endContent={<IconSelector className="size-4" />}>
            {t('posts.more-details')}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label={t('posts.more-details')} variant="flat">
          <DropdownSection title={t('posts.available_in')} showDivider>
            {otherLanguages.map((obj) => {
              return (
                <DropdownItem key={obj.name} href={`/${obj.code}/blog/${obj.slug}`}>
                  {obj.name}
                </DropdownItem>
              )
            })}
          </DropdownSection>
          <DropdownSection title={t('posts.save-to-read-later')}>
            <DropdownItem
              key="pocket"
              href={`https://getpocket.com/save?${server}/${locale}/${slug}&${title}`}
              startContent={<IconBrandPocket className="size-5" />}
            >
              {t('posts.pocket')}
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
