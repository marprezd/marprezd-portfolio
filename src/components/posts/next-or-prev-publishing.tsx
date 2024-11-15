import type { Post } from '#site/content'
import type { Locale } from '@/i18n/routing'
import { Card, CardBody } from '@nextui-org/card'
import { IconArrowBackUp, IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React from 'react'

interface NextOrPrevPublishingPros {
  params: { locale: Locale }
  next: { slug: string, title: string }
  prev: { slug: string, title: string }
}

export default function NextOrPrevPublishing({
  next,
  prev,
  params: { locale },
}: NextOrPrevPublishingPros) {
  const t = useTranslations('site')

  return (
    <section className="border-y border-gray-300 bg-default-50 dark:border-gray-700">
      <div className="container mx-auto max-w-5xl py-8">
        {(next || prev) && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {prev && prev.slug && (
              <Card className="border-1 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
                <CardBody>
                  <Link href={`/${locale}/${prev.slug}`}>
                    <div className="flex flex-row items-center">
                      <IconArrowLeft className="-mt-1 mr-2" />
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                        {t('posts.prev')}
                      </h2>
                    </div>
                    <div className="text-primary hover:opacity-80">
                      {prev.title}
                    </div>
                  </Link>
                </CardBody>
              </Card>
            )}
            <Card className="border-1 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
              <CardBody>
                <Link className="text-center" href={`/${locale}/blog`}>
                  <div className="flex flex-row items-center justify-center">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                      {t('posts.index')}
                    </h2>
                    <IconArrowBackUp className="-mt-1 ml-2" />
                  </div>
                  <div className="text-primary hover:opacity-80">
                    {t('posts.allPosts')}
                  </div>
                </Link>
              </CardBody>
            </Card>
            {next && next.slug && (
              <Card className="border-1 border-default-400 bg-white dark:bg-gray-900">
                <CardBody>
                  <Link href={`/${locale}/${next.slug}`}>
                    <div className="flex flex-row items-center justify-end">
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                        {t('posts.next')}
                      </h2>
                      <IconArrowRight className="-mt-1 ml-2" />
                    </div>
                    <div className="text-right text-primary hover:opacity-80">
                      {next.title}
                    </div>
                  </Link>
                </CardBody>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
