import type { Locale } from '@/i18n/routing'
// import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

export default async function IndexPage({
  params,
}: {
  params: Promise<{
    locale: Locale
  }>
}) {
  const locale = (await params).locale
  // Enable static rendering
  setRequestLocale(locale)

  return (
    <div>
      <p className="max-w-[590px]">
        home page test
      </p>
      <code>
        print('doc')
      </code>
    </div>
  )
}
