import { posts } from '#site/content'
import { getAllCategories, sortCategoriesByCount } from '@/lib/utils'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import CategoryCloud from './category-cloud'

export default function Categories() {
  const locale = useLocale()
  const filteredPosts = posts.filter(post => post.language === locale)

  const categories = getAllCategories(filteredPosts)
  const sortedCategories: string[] = sortCategoriesByCount(categories)
  const t = useTranslations('site')

  return (
    <Card className="border-1 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
      <CardHeader>
        <h2 className="text-xl font-bold tracking-tight">
          {t('posts.categories.label')}
        </h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <ul className="flex flex-wrap gap-2">
          {sortedCategories.map(category => (
            <CategoryCloud key={category} count={categories[category]} category={category} />
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}
