import { useTranslations } from 'next-intl'

export default function NotFoundPage() {
  const t = useTranslations('app')

  return (
    <div>
      <p className="max-w-[460px]">{t('not-found-page.description')}</p>
    </div>
  )
}
