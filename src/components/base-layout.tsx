import type { ReactNode } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { clsx } from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Suspense } from 'react'
import Breadcrumbs from './breadcrumbs'
import { ModeToggle } from './mode-toggle'
import UserAccount from './user-account'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-variable',
  weight: 'variable',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: 'variable',
})

interface Props {
  children: ReactNode
  locale: string
}

export default async function BaseLayout({
  children,
  locale,
}: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html
      className="h-full scroll-smooth"
      lang={locale}
      suppressHydrationWarning
    >
      <body className={
        clsx(
          inter.variable,
          jetbrainsMono.variable,
          'flex h-full flex-col font-sans antialiased',
          'selection:bg-green-200 selection:text-green-900 dark:selection:bg-cyan-900 dark:selection:text-cyan-200',
        )
      }
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 rounded-t-lg border-b bg-background px-4">
                  <div className="flex flex-1 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumbs />
                  </div>
                  <div className="ml-auto flex flex-row items-center space-x-2 px-3">
                    <Suspense fallback={null}>
                      <ModeToggle />
                      <UserAccount />
                    </Suspense>
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0
    [&::-webkit-scrollbar-thumb]:bg-cyan-300
    dark:[&::-webkit-scrollbar-thumb]:bg-teal-500
    [&::-webkit-scrollbar-track]:bg-cyan-100
    dark:[&::-webkit-scrollbar-track]:bg-teal-700 [&::-webkit-scrollbar]:w-2"
                >
                  {children}
                </div>
              </SidebarInset>
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
