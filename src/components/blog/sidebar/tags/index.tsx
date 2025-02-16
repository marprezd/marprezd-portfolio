import { posts } from '#site/content'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getAllTags, sortTagsByCount } from '@/lib/utils'
import { motion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'
import TagCloud from './tag-cloud'

export default function Tags() {
  const locale = useLocale()
  const filteredPosts = posts.filter(post => post.language === locale)

  const tags = getAllTags(filteredPosts)
  const sortedTags: string[] = sortTagsByCount(tags)
  const t = useTranslations('app')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 2, ease: 'easeOut', delay: 0.7, type: 'tween' }}
    >
      <Card className="border-1 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
        <CardHeader>
          <CardTitle>
            {t('blog.tags.label')}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <ul className="flex flex-wrap gap-2">
            {sortedTags.map(tag => (
              <TagCloud key={tag} count={tags[tag]} tag={tag} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
