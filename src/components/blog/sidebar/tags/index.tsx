import { posts } from '#site/content'
import Animation from '@/components/animation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getAllTags, sortTagsByCount } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import TagCloud from './tag-cloud'

export default function Tags() {
  const locale = useLocale()
  const filteredPosts = posts.filter(post => post.language === locale)

  const tags = getAllTags(filteredPosts)
  const sortedTags: string[] = sortTagsByCount(tags)
  const t = useTranslations('app')

  return (
    <Animation>
      <Card>
        <CardHeader>
          <CardTitle>
            {t('blog.tags.label')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-2">
            {sortedTags.map(tag => (
              <TagCloud key={tag} count={tags[tag]} tag={tag} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </Animation>
  )
}
