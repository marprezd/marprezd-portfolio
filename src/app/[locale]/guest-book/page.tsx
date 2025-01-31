import type { Locale } from '@/i18n/routing'
import { host } from '@/config'
import { SignIn, SignUp } from '@/layouts/components/account-login-buttons'
import DefaultHero from '@/layouts/components/default-hero'
import DefaultLoadingSkeleton from '@/layouts/components/default-loading-skeleton'
import GbForm from '@/layouts/components/guest-book/guestbook-form'
import GuestbookUserList from '@/layouts/components/guest-book/guestbook-user-list'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/layouts/components/ui/card'
import { auth } from 'auth'
import { getTranslations } from 'next-intl/server'
import React, { Suspense } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const locale = (await params).locale
  const t = await getTranslations({ locale, namespace: 'app' })
  return {
    metadataBase: new URL(`${host}`),
    title: t('metadata.guest-book.title'),
    description: t('metadata.guest-book.description'),
    openGraph: {
      title: t('metadata.guest-book.title'),
      description: t('metadata.guest-book.description'),
      url: '/en/guest-book',
      type: 'website',
      siteName: t('metadata.homepage.title'),
      images: [
        {
          url: '/images/og-image.png',
          alt: 'Mario Pérez',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@marprezd',
      creator: '@marprezd',
      title: t('metadata.guest-book.title'),
      description: t('metadata.guest-book.description'),
      images: [
        {
          url: '/images/og-image.png',
          alt: 'Mario Pérez',
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: '/en/guest-book',
      languages: {
        es: '/es/libro-de-visitas',
        en: '/en/guest-book',
      },
      types: {
        'application/rss+xml': `/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        'index': true,
        'follow': true,
        'noimageindex': true,
        'max-video-preview': -1,
        'max-image-preview': 'standard',
        'max-snippet': -1,
      },
    },
  }
}

export default async function Page() {
  const t = await getTranslations('app')
  return (
    <div className="space-y-8">
      <Suspense fallback={<DefaultLoadingSkeleton />}>
        <DefaultHero
          title={t('guest-book.title')}
          description={t('guest-book.description')}
        />
      </Suspense>
      <Suspense fallback={<DefaultLoadingSkeleton />}>
        <GuestBookForm />
      </Suspense>
      <GuestbookUserList />
    </div>
  )
}

async function GuestBookForm() {
  // Get the user session
  const session = await auth()
  const t = await getTranslations('app')
  return session
    ? (
        <div>
          <GbForm />
        </div>
      )
    : (
        <div className="flex w-full items-center justify-center">
          <div className="mx-auto max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase">{t('guest-book.not-user.card.title')}</CardTitle>
                <CardDescription>
                  {t('guest-book.not-user.card.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>{t('guest-book.not-user.card.content')}</p>
                <SignIn />
              </CardContent>
              <CardFooter>
                <SignUp />
              </CardFooter>
            </Card>
          </div>
        </div>
      )
}
