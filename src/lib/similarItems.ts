import type { Post } from '#site/content'

// similer products
function similerItems(currentItem: Post, allItems: Post[], slug: string): Post[] {
  let tags: string[] = []
  let categories: string[] = []

  // set categories
  if (currentItem.categories.length > 0) {
    categories = currentItem.categories
  }

  // set tags
  if (currentItem.tags.length > 0) {
    tags = currentItem.tags
  }

  // filter by categories
  const filterByCategories = allItems.filter((item: any) =>
    categories.find(category => item.categories.includes(category)),
  )

  // filter by tags
  const filterByTags = allItems.filter((item: any) =>
    tags.find(tag => item.tags.includes(tag)),
  )

  // merged after filter
  const mergedItems = [...new Set([...filterByCategories, ...filterByTags])]

  // filter by slug
  const filterBySlug = mergedItems.filter(product => product.slug !== slug)

  return filterBySlug
}

export default similerItems
