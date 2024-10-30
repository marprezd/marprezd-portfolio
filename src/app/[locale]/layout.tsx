import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import TopWaveSvg from '@/components/waves/top-wave-svg'
import { server } from '@/lib/serverUrl'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import clsx from 'clsx'
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { getLangDir } from 'rtl-detect'
import { Providers } from './providers'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

interface Props {
  children: ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'site' })

  return {
    metadataBase: new URL(`${server}`),
    title: {
      default: t('metadata.homepage.title'),
      template: `Mario Pérez | %s`,
    },
    description: t('metadata.homepage.description'),
    generator: t('metadata.homepage.generator'),
    applicationName: t('metadata.homepage.generator'),
    referrer: 'origin-when-cross-origin',
    keywords: [
      'mario perez',
      'software developer',
      'python',
      'nextjs',
      'api design',
      'user interface',
      'machine learning',
      'software engineering',
      'web app',
      'ai',
    ],
    authors: [
      {
        name: 'Mario Pérez',
        url: `${server}`,
      },
    ],
    creator: 'Mario Pérez',
    publisher: 'Mario Pérez',
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    icons: {
      icon: [
        {
          url: '/favicon.ico',
        },
        new URL('/favicon.ico', server).href,
        {
          url: '/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: '/apple-touch-icon.png',
        },
      ],
      other: [
        {
          rel: 'android-chrome-192x192',
          url: '/android-chrome-192x192.png',
        },
        {
          rel: 'android-chrome-512x512',
          url: '/android-chrome-512x512.png',
        },
      ],
    },
    openGraph: {
      title: t('metadata.homepage.title'),
      description: t('metadata.homepage.description'),
      url: `${server}`,
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
      title: t('metadata.homepage.title'),
      description: t('metadata.homepage.description'),
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
      canonical: `${server}`,
      languages: {
        es: `${server}/es`,
        tr: `${server}/tr`,
      },
      types: {
        'application/rss+xml': `${server}/feed.xml`,
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

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  // i18n. Enables static rendering for all pages
  unstable_setRequestLocale(locale)

  // Right-to-left languages support
  const direction = getLangDir(locale)

  return (
    <html
      lang={locale}
      className="scroll-smooth"
      suppressHydrationWarning
      dir={direction}
    >
      <body
        className={clsx(
          'flex flex-col text-pretty bg-background font-sans font-normal text-foreground antialiased',
          'selection:bg-palettes-primary-90 selection:text-palettes-primary-50 dark:selection:bg-palettes-primary-50 dark:selection:text-palettes-primary-90',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'system', enableColorScheme: true, enableSystem: true, children }}>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <div className="grow">
              <TopWaveSvg />
              {children}
            </div>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
