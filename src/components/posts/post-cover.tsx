'use client'

import { humanize, slugify } from '@/lib/utils'
import { Chip } from '@nextui-org/chip'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import CldImage from '../cld-image'

interface PostCoverProps {
  url: string
  author: string
  creditLink: string
  hostName: string
  title: string
  categories: string[]
}

function PostCover({
  url,
  author,
  creditLink,
  hostName,
  title,
  categories,
}: PostCoverProps) {
  const t = useTranslations('site')
  const locale = useLocale()
  const { ref, inView } = useInView()

  return (
    <div className="relative" ref={ref}>
      <figure className={inView ? 'animate-fade animate-delay-500 animate-duration-500 animate-once animate-ease-in' : 'opacity-0'}>
        <CldImage
          priority
          className="w-full rounded-xl shadow-md"
          alt={title}
          width={550}
          height={309}
          sizes="100vw"
          src={url}
          crop={{
            width: 550,
            height: 309,
            type: 'fill',
            aspectRatio: '16:9',
          }}
          quality={75}
        />
        <figcaption className="mt-1 text-center text-xs text-neutral-600 dark:text-neutral-400">
          <Link href={creditLink}>
            {t('posts.image.credit', { photographer: author, host: hostName })}
          </Link>
        </figcaption>
        <div className="absolute left-3 top-4 z-10">
          <div className="inline-flex flex-wrap gap-2">
            {categories?.map((category: string) => (
              <div key={category}>
                <Link
                  href={`/${locale}/blog/categories/${slugify(category)}`}
                >
                  <Chip color="secondary" radius="md">
                    {humanize(category)}
                  </Chip>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </figure>
    </div>
  )
}

export default PostCover
