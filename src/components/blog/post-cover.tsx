import { humanize, slugify } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Animation from '../animation'
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
  const t = useTranslations('app')
  const locale = useLocale()

  return (
    <Animation>
      <div className="relative">
        <figure>
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
              {t('blog.image.credit', { photographer: author, host: hostName })}
            </Link>
          </figcaption>
          <div className="absolute left-3 top-4 z-10">
            <div className="inline-flex flex-wrap gap-2">
              {categories?.map((category: string) => (
                <div key={category}>
                  <Link
                    href={`/${locale}/blog/categories/${slugify(category)}`}
                  >
                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800 dark:bg-red-800 dark:text-white">
                      {humanize(category)}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </figure>
      </div>
    </Animation>
  )
}

export default PostCover
