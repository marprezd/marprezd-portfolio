import type { ParsedContent } from '@nuxt/content'

export interface Post extends ParsedContent {
  title: string
  date: string
}

export interface SortedPostItem {
  year: string
  posts: Post[]
}

export interface SortedPosts {
  [key: string]: SortedPostItem
}
