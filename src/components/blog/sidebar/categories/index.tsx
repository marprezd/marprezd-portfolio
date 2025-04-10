import { posts } from '#site/content'
import Animation from '@/components/animation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getAllCategories, sortCategoriesByCount } from '@/lib/utils'
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
    <Animation>
      <Card>
        <CardHeader>
          <CardTitle>
            {t('blog.categories.label')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-2">
            {sortedCategories.map(category => (
              <CategoryCloud key={category} count={categories[category]} category={category} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </Animation>
  )
}
