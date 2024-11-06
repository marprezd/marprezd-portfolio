import type { Post } from '#site/content'
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { slug } from 'github-slugger'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  }
  catch (error) {
    console.error(error)

    return false
  }

  return true
}

// sort posts
export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date)
      return -1
    if (a.date < b.date)
      return 1

    return 0
  })
}

// slugify
export function slugify(content: string) {
  return slug(content)
}

// capitalize first letter
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {}

  posts.forEach((post) => {
    if (post.published) {
      post.tags?.forEach((tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1
      })
    }
  })

  return tags
}

export function getAllCategories(posts: Array<Post>) {
  const categories: Record<string, number> = {}

  posts.forEach((post) => {
    if (post.published) {
      post.categories?.forEach((category) => {
        categories[category] = (categories[category] ?? 0) + 1
      })
    }
  })

  return categories
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function sortCategoriesByCount(categories: Record<string, number>) {
  return Object.keys(categories).sort((a, b) => categories[b] - categories[a])
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags)
      return false
    const slugifiedTags = post.tags.map(tag => slug(tag))

    return slugifiedTags.includes(tag)
  })
}

export function getPostsByCategorySlug(posts: Array<Post>, category: string) {
  return posts.filter((post) => {
    if (!post.categories)
      return false
    const slugifiedCategories = post.categories.map(category => slug(category))

    return slugifiedCategories.includes(category)
  })
}
