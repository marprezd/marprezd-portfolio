import type { Locale } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import Animation from '../animation'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'

interface NextOrPrevPostPros {
  params: { locale: Locale }
  next: { slug: string, title: string }
  prev: { slug: string, title: string }
}

export default function NextOrPrevPost({
  next,
  prev,
  params: { locale },
}: NextOrPrevPostPros) {
  const t = useTranslations('app')

  return (
    <Animation>
      {(next || prev) && (
        <div className="flex flex-col gap-3 lg:flex-row">
          {prev && prev.slug && (
            <Link href={`/${locale}/${prev.slug}`} className="w-full hover:opacity-80">
              <Card className="border-muted/200 dark:border-muted/700 border bg-muted/50">
                <CardHeader>
                  <CardDescription>
                    <div className="flex flex-row items-center">
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                        {t('blog.prev')}
                      </h2>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="line-clamp-1 text-sm text-primary">
                    {prev.title}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
          <Link className="w-full hover:opacity-80" href={`/${locale}/blog`}>
            <Card className="border-muted/200 dark:border-muted/700 border bg-muted/50">
              <CardHeader>
                <CardDescription>
                  <div className="flex flex-row items-center justify-center">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                      {t('blog.index')}
                    </h2>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-sm text-primary ">
                  {t('blog.allPosts')}
                </div>
              </CardContent>
            </Card>
          </Link>
          {next && next.slug && (
            <Link href={`/${locale}/${next.slug}`} className="w-full hover:opacity-80">
              <Card className="border-muted/200 dark:border-muted/700 border bg-muted/50">
                <CardHeader>
                  <CardDescription>
                    <div className="flex flex-row items-center">
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                        {t('blog.next')}
                      </h2>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="line-clamp-1 text-sm text-primary hover:opacity-80">
                    {next.title}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
      )}
    </Animation>
  )
}
