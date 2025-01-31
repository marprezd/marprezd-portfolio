import { AppSidebar } from '@/layouts/components/app-sidebar'
import { ThemeProvider } from '@/layouts/components/theme-provider'
import { Separator } from '@/layouts/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/layouts/components/ui/sidebar'
import { Toaster } from '@/layouts/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { clsx } from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { type ReactNode, Suspense } from 'react'
import Breadcrumbs from './breadcrumbs'
import { ModeToggle } from './mode-toogle'
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
          'selection:bg-green-200 selection:text-green-900 dark:selection:bg-gray-900 dark:selection:text-gray-200',
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
                <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 rounded-t-lg border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                <div className="flex flex-1 flex-col gap-4 overflow-auto p-4 pt-0 [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-thumb]:bg-slate-500
  [&::-webkit-scrollbar-track]:bg-gray-100
  dark:[&::-webkit-scrollbar-track]:bg-slate-700
  [&::-webkit-scrollbar]:w-2"
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
