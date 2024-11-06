import { posts } from '#site/content'
import { getAllTags, sortTagsByCount } from '@/lib/utils'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { useLocale, useTranslations } from 'next-intl'
import TagCloud from './tag-cloud'

export default function Tags() {
  const locale = useLocale()
  const filteredPosts = posts.filter(post => post.language === locale)

  const tags = getAllTags(filteredPosts)
  const sortedTags: string[] = sortTagsByCount(tags)
  const t = useTranslations('site')

  return (
    <Card className="border-1 border-default-300 bg-white dark:bg-gray-900">
      <CardHeader>
        <h2 className="text-xl font-bold tracking-tight">
          {t('posts.tags.label')}
        </h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <ul className="flex flex-wrap gap-2">
          {sortedTags.map(tag => (
            <TagCloud key={tag} count={tags[tag]} tag={tag} />
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}
