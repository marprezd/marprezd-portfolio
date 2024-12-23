'use client'

import { giscusConfigs } from '@/lib/giscusConfigs'
import GiscusComponent from '@giscus/react'
import { Button } from '@nextui-org/button'
import { IconMessage } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import React, { useState } from 'react'

const themeMapping = {
  light: 'light',
  dark: 'dark_dimmed',
}

interface GiscusProps {
  eager?: boolean
}

export default function Comments({ eager = false }: GiscusProps) {
  const t = useTranslations('site')
  const { resolvedTheme } = useTheme()
  const [shown, setShown] = useState(eager)
  const theme = themeMapping[resolvedTheme as keyof typeof themeMapping]
  const locale = useLocale()

  return (
    <div>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center">
        <h2 className="text-3xl font-bold">
          {t('posts.comments.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{t('posts.comments.sub-title')}</p>
        <div className="mt-6 w-full text-center" id="comment">
          <Head>
            {Object.values(themeMapping).map(theme => (
              <link
                key={theme}
                as="style"
                crossOrigin="anonymous"
                href={`https://giscus.app/themes/${theme}.css`}
                rel="prefetch"
                type="text/css"
              />
            ))}
          </Head>
          {shown
            ? (
                <GiscusComponent
                  category={giscusConfigs.category}
                  categoryId={giscusConfigs.categoryId}
                  emitMetadata="1"
                  inputPosition="top"
                  lang={locale}
                  loading="lazy"
                  mapping="pathname"
                  reactionsEnabled="1"
                  repo={giscusConfigs.repo}
                  repoId={giscusConfigs.repoId}
                  theme={theme}
                />
              )
            : (
                <Button
                  className="lg:mb-0"
                  color="primary"
                  radius="full"
                  startContent={<IconMessage />}
                  variant="solid"
                  onPress={() => setShown(true)}
                >
                  {t('posts.load-comments')}
                </Button>
              )}
        </div>
      </div>
    </div>
  )
}
