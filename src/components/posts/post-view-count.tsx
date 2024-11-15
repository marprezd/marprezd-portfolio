import type { FC } from 'react'
import { fetchAllViewCounts, fetchAndIncrementViewCount } from '@/lib/supabase/view-counts/getViewCounts'
import { useTranslations } from 'next-intl'
import { cache } from 'react'

interface PostViewProps {
  slug: string
}

interface PostViewCountProps {
  count: number
}

const ViewCount: FC<PostViewCountProps> = ({ count }) => {
  const t = useTranslations('site')

  return (
    <div className="flex flex-col items-center justify-center">
      <dt className="mb-2 text-3xl font-extrabold md:text-4xl">{count}</dt>
      <dd className="font-semibold">
        {count === 1 ? t('posts.view') : t('posts.views')}
      </dd>
    </div>
  )
}

export const PostViewCount: FC<PostViewProps> = ({ slug }) => {
  const viewCount = fetchAndIncrementViewCount(slug)
  const count = viewCount ?? 0

  return <ViewCount count={count} />
}

const cachedFetchAllViewCounts = cache(fetchAllViewCounts)

interface PostListItemViewCountProps {
  slug: string
}

export const PostListItemViewCount: FC<PostListItemViewCountProps> = ({
  slug,
}) => {
  const viewCounts: any = cachedFetchAllViewCounts()
  const count = viewCounts[slug] ?? 0

  return <ViewCount count={count} />
}
