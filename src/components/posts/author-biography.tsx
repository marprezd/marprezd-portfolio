import { useTranslations } from 'next-intl'
import React from 'react'
import CldImage from '../cld-image'

function AuthorBiography() {
  const t = useTranslations('site')

  return (
    <div>
      <div className="flex gap-x-5 sm:gap-x-8">
        <CldImage
          className="mt-2 size-8 shrink-0 rounded-full"
          alt="MP"
          width={32}
          height={32}
          sizes="100vw"
          src="profile_uezzbj.jpg"
          crop={{
            width: 32,
            height: 32,
            type: 'fill',
          }}
          quality={75}
        />
        <div className="grow">
          <h2 className="text-3xl font-light">
            {t('posts.author.label')}
          </h2>
          {t.rich('posts.author.summary', {
            p: chunks => <p className="mt-1 text-default-700">{chunks}</p>,
            span: chunks => <span className="font-semibold">{chunks}</span>,
          })}
        </div>
      </div>
    </div>
  )
}

export default AuthorBiography
