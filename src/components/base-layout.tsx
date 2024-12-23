import type { ReactNode } from 'react'
import { Providers } from '@/app/[locale]/providers'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Newsletter from '@/components/newsletter'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { clsx } from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { getLangDir } from 'rtl-detect'

const inter = Inter({
  display: 'swap',
  variable: '--font-inter-variable',
  subsets: ['latin'],
})

const geistMono = localFont({
  src: '../app/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

interface Props {
  children: ReactNode
  locale: string
}

export default async function BaseLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
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
          // openSans.variable,
          inter.variable,
          geistMono.variable,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'system', enableColorScheme: true, enableSystem: true, children }}>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <div className="grow">
              {children}
              <Newsletter />
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
