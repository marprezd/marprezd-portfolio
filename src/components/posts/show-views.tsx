import crypto from 'node:crypto'
import redis from '@/lib/redis'
import { headers } from 'next/headers'
import { getTranslations } from 'next-intl/server'

interface ShowViewsProps {
  slug: string
}

async function recordViewCount(slug: string) {
  const headersList = headers()
  const forwardedFor = headersList.get('x-forwarded-for')
  const realIp = headersList.get('x-real-ip')

  const ipSource = forwardedFor || realIp || 'localhost'

  const ip = ipSource.split(',')[0].trim()

  const hashedIp = crypto.createHash('sha256').update(ip).digest('hex')

  const viewKey = ['pageviews', 'blogs', slug].join(':')
  const ipViewKey = ['ip', hashedIp, 'views', slug].join(':')

  const hasViewed = await redis.get(ipViewKey)

  let viewCount: number

  if (!hasViewed) {
    const pipeline = redis.pipeline()
    pipeline.incr(viewKey)
    pipeline.set(ipViewKey, '1')
    await pipeline.exec()

    viewCount = (await redis.get<number>(viewKey)) ?? 0
    return { message: 'View Added', status: 202, views: viewCount }
  }
  else {
    viewCount = (await redis.get<number>(viewKey)) ?? 0
    return { message: 'Already viewed', status: 200, views: viewCount }
  }
}

async function ShowViews({ slug }: ShowViewsProps) {
  const { views } = await recordViewCount(slug)
  const t = await getTranslations('site')

  return (
    <div className="flex flex-col items-center justify-center">
      <dt className="mb-2 text-3xl font-extrabold md:text-4xl">
        {views}
      </dt>
      <dd className="font-semibold">
        {views === 1 ? t('posts.view') : t('posts.views')}
      </dd>
    </div>
  )
}

export default ShowViews
