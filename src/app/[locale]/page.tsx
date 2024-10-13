import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('site')

  return (
    <div className="flex items-center justify-center px-2 py-10">
      <h1 className="text-center text-4xl font-light">{t('under-construction')}</h1>
    </div>
  )
}
