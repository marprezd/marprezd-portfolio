import { useTranslations } from 'next-intl'
import React from 'react'
import Animation from '../animation'
import CldImage from '../cld-image'
import { Card, CardContent, CardHeader } from '../ui/card'

function PostAuthor() {
  const t = useTranslations('app')

  return (
    <Animation>
      <Card className="bg-transparent shadow-none border-none">
        <CardHeader>
          <div className="flex items-center gap-x-5 sm:gap-x-8">
            <CldImage
              className="rounded-full size-14 shrink-0"
              alt="MP"
              width={56}
              height={56}
              sizes="100vw"
              src="profile_uezzbj.jpg"
              crop={{
                width: 56,
                height: 56,
                type: 'fill',
              }}
              quality={75}
            />
            <div className="grow">
              <p className="font-medium">
                {t('blog.tabs.content.author.first-line')}
              </p>
              <p className="font-light text-sm">
                {t('blog.tabs.content.author.second-line')}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-gray-700 dark:text-gray-400 text-sm">
          {t.rich('blog.tabs.content.author.summary', {
            p: chunks => <p>{chunks}</p>,
            span: chunks => <span className="font-semibold">{chunks}</span>,
          })}
        </CardContent>
      </Card>
    </Animation>
  )
}

export default PostAuthor
