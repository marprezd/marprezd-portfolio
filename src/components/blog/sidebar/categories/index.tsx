import { posts } from '#site/content'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getAllCategories, sortCategoriesByCount } from '@/lib/utils'
import { motion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import CategoryCloud from './category-cloud'

export default function Categories() {
  const locale = useLocale()
  const filteredPosts = posts.filter(post => post.language === locale)

  const categories = getAllCategories(filteredPosts)
  const sortedCategories: string[] = sortCategoriesByCount(categories)
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
            {t('blog.categories.label')}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <ul className="flex flex-wrap gap-2">
            {sortedCategories.map(category => (
              <CategoryCloud key={category} count={categories[category]} category={category} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
