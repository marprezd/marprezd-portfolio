import type { Post } from '#site/content'
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
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
