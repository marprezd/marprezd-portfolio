import type { Post } from '#site/content'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { slug } from 'github-slugger'
import { marked } from 'marked'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// slugify
export function slugify(content: string) {
  return slug(content)
}

// markdownify
export function markdownify(content: string, div?: boolean) {
  const markdownContent: any = div
    ? marked.parse(content)
    : marked.parseInline(content)
  return { __html: markdownContent }
}

// humanize
export function humanize(content: string) {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => {
      return m.toUpperCase()
    })
}

// titleify
export function titleify(content: string) {
  const humanized = humanize(content)
  return humanized
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// plainify
export function plainify(content: string) {
  const parseMarkdown: any = marked.parse(content)
  const filterBrackets = parseMarkdown.replace(/<[^>]+(>|$)/gm, '')
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/g, '')
  const stripHTML = htmlEntityDecoder(filterSpaces)
  return stripHTML
}

// strip entities for plainify
function htmlEntityDecoder(htmlWithEntities: string): string {
  const entityList: { [key: string]: string } = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': '\'',
  }
  const htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity]
    },
  )
  return htmlWithoutEntities
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

// capitalize first letter
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// get all tags from post.
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

// sort tags.
export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

// get post by tag slug.
export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags)
      return false
    const slugifiedTags = post.tags.map(tag => slug(tag))

    return slugifiedTags.includes(tag)
  })
}

// get all categories from post.
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

// sort categories.
export function sortCategoriesByCount(categories: Record<string, number>) {
  return Object.keys(categories).sort((a, b) => categories[b] - categories[a])
}

// get post by category slug.
export function getPostsByCategorySlug(posts: Array<Post>, category: string) {
  return posts.filter((post) => {
    if (!post.categories)
      return false
    const slugifiedCategories = post.categories.map(category => slug(category))

    return slugifiedCategories.includes(category)
  })
}

// detect if an array is not empty.
export function isArrayNotEmpty<T>(arr: T[] | undefined): arr is T[] {
  if (Array.isArray(arr) && arr.length > 0)
    return true

  return false
}
