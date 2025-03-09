import crypto from 'node:crypto'
import redis from '@/lib/redis'
import { getTranslations } from 'next-intl/server'
import { headers } from 'next/headers'

interface ShowViewsProps {
  view: string
}

async function recordViewCount(slug: string) {
  const headersList = await headers()
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

async function ShowViews({ view }: ShowViewsProps) {
  const { views } = await recordViewCount(view)
  const t = await getTranslations('app')

  return (
    <>
      {views}
      {' '}
      {views === 1 ? t('blog.view') : t('blog.views')}
    </>
  )
}

export default ShowViews
