import { Link } from '@nextui-org/link'
import { IconCreativeCommons, IconCreativeCommonsBy } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

export default function Copyright() {
  const t = useTranslations('site')

  return (
    <>

      {t.rich('footer.license', {
        p: chunks => (
          <p>
            <code>
              {new Date().getFullYear()}
              { ' - '}
              @marprezd.
            </code>
            {' '}
            {chunks}
          </p>
        ),
        span: chunks => <span className="mx-0.5 inline-flex text-xs font-semibold">{chunks}</span>,
      })}
    </>
  )
}
