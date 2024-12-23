import { getBookList } from '@/lib/getBooks'
import { getTranslations } from 'next-intl/server'
import BookCard from './book-card'

async function Books() {
  const [books, t] = await Promise.all([
    getBookList(),
    getTranslations('site'),
  ])

  return (
    <div>
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <h2 className="text-3xl font-bold leading-tight text-default-800">
          {t('books.title')}
        </h2>
        <p className="text-center text-xs font-medium uppercase text-default-700">
          {t('books.description')}
        </p>
      </div>
      <div className="text-center lg:text-left">
        <span className="inline-block h-1 w-40 rounded-full bg-red-500" />
        <span className="ml-1 inline-block h-1 w-3 rounded-full bg-red-500" />
        <span className="ml-1 inline-block size-1 rounded-full bg-red-500" />
      </div>
      <div className="flex flex-col items-center justify-center pt-10">
        <BookCard books={books} />
      </div>
    </div>
  )
}

export default Books
