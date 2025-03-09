import { useTranslations } from 'next-intl'
import React from 'react'
import Animation from '../animation'
import CldImage from '../cld-image'
import { Card, CardContent, CardHeader } from '../ui/card'

function PostAuthor() {
  const t = useTranslations('app')

  return (
    <Animation>
      <Card className="border-none shadow-none">
        <CardHeader>
          <div className="flex items-center gap-x-5 sm:gap-x-8">
            <CldImage
              className="size-8 shrink-0 rounded-full"
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
              <p className="font-medium">
                {t('blog.tabs.content.author.first-line')}
              </p>
              <p className="text-sm font-light">
                {t('blog.tabs.content.author.second-line')}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-gray-700 dark:text-gray-400">
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
