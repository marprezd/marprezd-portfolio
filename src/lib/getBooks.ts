import type { Books } from '@/types'
import { server } from './serverUrl'

export async function getBookList() {
  const bookListResponse = await fetch(
    `${server}/api/books`,
    {
      next: { revalidate: 60 * 60 * 24 },
    },
  )

  if (!bookListResponse.ok) {
    return []
  }

  return (await bookListResponse.json()) as Books[]
}
