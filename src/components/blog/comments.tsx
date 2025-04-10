'use client'

import { giscus } from '@/lib/giscus'
import GiscusComponent from '@giscus/react'
import { IconMessage } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import React, { useState } from 'react'
import Animation from '../animation'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'

const themeMapping = {
  light: 'light',
  dark: 'dark',
}

interface GiscusProps {
  eager?: boolean
}

export default function Comments({ eager = false }: GiscusProps) {
  const t = useTranslations('app')
  const { resolvedTheme } = useTheme()
  const [shown, setShown] = useState(eager)
  const theme = themeMapping[resolvedTheme as keyof typeof themeMapping]
  const locale = useLocale()

  return (
    <Animation>
      <Card className="bg-transparent shadow-none border-none">
        <CardHeader>
          <div className="flex items-center gap-x-5 sm:gap-x-8">
            <div className="flex justify-center items-center bg-tertiary mt-2 rounded-full size-14 text-tertiary-foreground shrink-0">
              <IconMessage className="size-6 shrink-0" />
            </div>
            <div className="grow">
              <p className="font-medium">
                {t('blog.tabs.content.comments.first-line')}
              </p>
              <p className="font-light text-sm">
                {t('blog.tabs.content.comments.second-line')}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full text-center" id="comment">
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
                    category={giscus.category}
                    categoryId={giscus.categoryId}
                    emitMetadata="1"
                    inputPosition="top"
                    lang={locale}
                    loading="lazy"
                    mapping="pathname"
                    reactionsEnabled="1"
                    repo={giscus.repo}
                    repoId={giscus.repoId}
                    theme={theme}
                  />
                )
              : (
                  <Button
                    variant="outline"
                    onClick={() => setShown(true)}
                  >
                    <IconMessage />
                    {t('blog.tabs.content.comments.load-comments')}
                  </Button>
                )}
          </div>
        </CardContent>

      </Card>
    </Animation>
  )
}
